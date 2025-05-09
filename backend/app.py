from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from routes.chat import chat_bp
from routes.faq import faq_bp
from routes.reminders import reminders_bp
from routes.chronic import chronic_bp
from models import user, reminder, chronic
from services.nlp import answer_question
from services.gpt import ask_gpt
from extensions import db, jwt, socketio
from flask_socketio import emit
import re

app = Flask(__name__)
CORS(app)

# Config
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/health_assistant')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'super-secret-key')

db.init_app(app)
jwt.init_app(app)
socketio.init_app(app)

@app.route('/')
def index():
    return jsonify({"message": "Virtual Health Assistant Backend Running"})

# --- AI Diagnosis Endpoint ---
@app.route('/api/diagnosis', methods=['POST'])
def ai_diagnosis():
    data = request.get_json()
    symptoms = data.get('symptoms', '')
    language = data.get('language', 'en')
    try:
        # Pass language to ask_gpt for proper language-specific responses
        result = ask_gpt(symptoms, language=language)
        
        # Improved section extraction that's more robust to different languages
        def extract_section(text, section):
            # Match section until next section header or end of string
            pattern = rf"{section}:(.*?)(?:\n[A-Z][a-zA-Z ]+:|$)"
            match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
            if match:
                return match.group(1).strip()
            return None
            
        # Extract all sections
        possible_conditions = extract_section(result, "Potential Conditions")
        red_flags = extract_section(result, "Red Flags")
        additional_notes = extract_section(result, "Additional Notes for Doctor")
        
        # Extract urgency score using a more robust regex pattern
        urgency_score_match = re.search(r"Urgency Score:\s*(\d+)", result, re.IGNORECASE)
        if urgency_score_match:
            urgency_level = int(urgency_score_match.group(1))
            urgency_level = max(1, min(urgency_level, 10))  # Clamp between 1 and 10
        else:
            # Try a more flexible pattern if the first one fails
            urgency_score_match = re.search(r"(?:urgency|priority|severity).*?(\d+)[/\s]*(?:10)?", result, re.IGNORECASE)
            if urgency_score_match:
                urgency_level = int(urgency_score_match.group(1))
                urgency_level = max(1, min(urgency_level, 10))
            else:
                urgency_level = 5  # Default if no score found
            
        # Ensure Additional Notes is properly populated and in English
        if not additional_notes or additional_notes.strip() == "":
            # If no additional notes, create a simple English summary
            additional_notes = "No clinical summary available. Please obtain more information from the patient."
        else:
            # Clean any first-person language
            lines = additional_notes.split('\n')
            filtered = [
                line for line in lines
                if not re.search(r"I'm sorry|I recommend|I'm here to support|Take care|your health and well-being|feel free to ask", line, re.IGNORECASE)
            ]
            additional_notes = '\n'.join(filtered).strip()
            if not additional_notes:
                additional_notes = "Clinical summary unavailable in appropriate format."
        
        # Process possibleConditions to ensure it's properly formatted
        conditions_list = []
        if possible_conditions:
            # Split by bullet points or numbered lists and clean up
            raw_conditions = re.split(r'\n-|\n\d+\.', possible_conditions)
            for cond in raw_conditions:
                if cond and cond.strip():
                    # Clean up and standardize format
                    clean_cond = cond.strip()
                    conditions_list.append({"condition": clean_cond, "confidence": 1.0})
        
        # If no conditions found, use the whole text as fallback
        if not conditions_list:
            conditions_list = [{"condition": possible_conditions or "Insufficient information to determine conditions", "confidence": 1.0}]
            
        return jsonify({
            "translatedSymptoms": None,
            "possibleConditions": conditions_list,
            "urgencyLevel": urgency_level,
            "notes": additional_notes
        })
    except Exception as e:
        print(f"Error in AI diagnosis: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Register all blueprints
app.register_blueprint(chat_bp)
app.register_blueprint(faq_bp)
app.register_blueprint(reminders_bp)
app.register_blueprint(chronic_bp)

@app.cli.command("create-db")
def create_db():
    with app.app_context():
        db.create_all()
        print("Database tables created.")

@socketio.on('chat_message')
def handle_chat_message(data):
    answer = answer_question(data.get('message', ''))
    emit('chat_response', {'answer': answer})

if __name__ == '__main__':
    socketio.run(app, debug=True) 