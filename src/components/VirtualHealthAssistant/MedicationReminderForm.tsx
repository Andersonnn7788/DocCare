import React, { useState } from "react";

export function MedicationReminderForm() {
  const [medication, setMedication] = useState("");
  const [time, setTime] = useState("");
  const [reminders, setReminders] = useState<{medication: string, time: string}[]>([]);

  const addReminder = () => {
    if (!medication || !time) return;
    setReminders([...reminders, { medication, time }]);
    setMedication("");
    setTime("");
  };

  return (
    <div>
      <div className="mb-2">
        <input
          className="border rounded px-2 py-1 mr-2"
          placeholder="Medication"
          value={medication}
          onChange={e => setMedication(e.target.value)}
        />
        <input
          className="border rounded px-2 py-1 mr-2"
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
        <button className="bg-violet-600 text-white px-3 py-1 rounded" onClick={addReminder}>
          Add
        </button>
      </div>
      <ul className="text-sm">
        {reminders.map((r, i) => (
          <li key={i} className="mb-1">{r.medication} at {r.time}</li>
        ))}
      </ul>
    </div>
  );
} 