from flask import Blueprint, request, jsonify
from services.gpt import ask_gpt

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    answer = ask_gpt(user_message)
    return jsonify({"answer": answer}) 