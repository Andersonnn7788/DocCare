from flask import Blueprint, request, jsonify
from services.gpt import ask_gpt
from services.virtual_health_assistant import ask_virtual_health_assistant

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    answer = ask_gpt(user_message)
    return jsonify({"answer": answer})

@chat_bp.route('/api/virtual-assistant', methods=['POST'])
def virtual_assistant():
    data = request.get_json()
    user_message = data.get('message', '')
    language = data.get('language')
    answer = ask_virtual_health_assistant(user_message, language_hint=language)
    return jsonify({"answer": answer}) 