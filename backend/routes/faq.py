from flask import Blueprint, jsonify
from data.faq_data import faq_data

faq_bp = Blueprint('faq', __name__)

@faq_bp.route('/api/faq', methods=['GET'])
def get_faq():
    return jsonify(faq_data) 