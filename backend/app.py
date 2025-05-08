from flask import Flask, jsonify
from flask_cors import CORS
import os
from routes.chat import chat_bp
from routes.faq import faq_bp
from routes.reminders import reminders_bp
from routes.chronic import chronic_bp
from models import user, reminder, chronic
from services.nlp import answer_question
from extensions import db, jwt, socketio
from flask_socketio import emit

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