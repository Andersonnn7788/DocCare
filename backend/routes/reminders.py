from flask import Blueprint, request, jsonify
from extensions import db
from models.reminder import MedicationReminder
from datetime import date

reminders_bp = Blueprint('reminders', __name__)

@reminders_bp.route('/api/reminders', methods=['GET'])
def list_reminders():
    user_id = request.args.get('user_id')
    reminders = MedicationReminder.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': r.id,
        'medication': r.medication,
        'dosage': r.dosage,
        'frequency': r.frequency,
        'start_date': r.start_date,
        'end_date': r.end_date,
        'times': r.times,
        'taken_times': r.taken_times
    } for r in reminders])

@reminders_bp.route('/api/reminders', methods=['POST'])
def add_reminder():
    data = request.get_json()
    reminder = MedicationReminder(
        user_id=data['user_id'],
        medication=data['medication'],
        dosage=data.get('dosage'),
        frequency=data.get('frequency'),
        start_date=date.fromisoformat(data['start_date']),
        end_date=date.fromisoformat(data['end_date']) if data.get('end_date') else None,
        times=data.get('times', []),
        taken_times=[]
    )
    db.session.add(reminder)
    db.session.commit()
    return jsonify({'id': reminder.id}), 201

@reminders_bp.route('/api/reminders/<int:reminder_id>', methods=['PUT'])
def update_reminder(reminder_id):
    data = request.get_json()
    reminder = MedicationReminder.query.get_or_404(reminder_id)
    for field in ['medication', 'dosage', 'frequency', 'start_date', 'end_date', 'times']:
        if field in data:
            setattr(reminder, field, data[field])
    db.session.commit()
    return jsonify({'success': True})

@reminders_bp.route('/api/reminders/<int:reminder_id>', methods=['DELETE'])
def delete_reminder(reminder_id):
    reminder = MedicationReminder.query.get_or_404(reminder_id)
    db.session.delete(reminder)
    db.session.commit()
    return jsonify({'success': True})

@reminders_bp.route('/api/reminders/<int:reminder_id>/mark-taken', methods=['POST'])
def mark_taken(reminder_id):
    reminder = MedicationReminder.query.get_or_404(reminder_id)
    time = request.json.get('time')
    if reminder.taken_times is None:
        reminder.taken_times = []
    reminder.taken_times.append(time)
    db.session.commit()
    return jsonify({'success': True})

@reminders_bp.route('/api/reminders/<int:reminder_id>/snooze', methods=['POST'])
def snooze_reminder(reminder_id):
    # For now, just acknowledge the snooze
    return jsonify({'success': True, 'message': 'Reminder snoozed'}) 