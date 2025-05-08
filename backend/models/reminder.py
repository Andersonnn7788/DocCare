from extensions import db
from sqlalchemy import func

class MedicationReminder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    medication = db.Column(db.String(120), nullable=False)
    dosage = db.Column(db.String(64), nullable=True)
    frequency = db.Column(db.String(64), nullable=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=True)
    times = db.Column(db.ARRAY(db.String), nullable=True)  # e.g., ["08:00", "20:00"]
    taken_times = db.Column(db.ARRAY(db.String), nullable=True)  # times taken
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now()) 