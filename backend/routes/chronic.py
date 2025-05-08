from flask import Blueprint, request, jsonify
from extensions import db
from models.chronic import ChronicCondition

chronic_bp = Blueprint('chronic', __name__)

@chronic_bp.route('/api/chronic', methods=['GET'])
def get_chronic():
    user_id = request.args.get('user_id')
    conditions = ChronicCondition.query.filter_by(user_id=user_id).all()
    return jsonify([
        {'id': c.id, 'condition': c.condition, 'notes': c.notes}
        for c in conditions
    ])

@chronic_bp.route('/api/chronic', methods=['POST'])
def add_chronic():
    data = request.get_json()
    chronic = ChronicCondition(
        user_id=data['user_id'],
        condition=data['condition'],
        notes=data.get('notes', '')
    )
    db.session.add(chronic)
    db.session.commit()
    return jsonify({'id': chronic.id}), 201

@chronic_bp.route('/api/chronic/<int:chronic_id>', methods=['PUT'])
def update_chronic(chronic_id):
    data = request.get_json()
    chronic = ChronicCondition.query.get_or_404(chronic_id)
    if 'notes' in data:
        chronic.notes = data['notes']
    db.session.commit()
    return jsonify({'success': True}) 