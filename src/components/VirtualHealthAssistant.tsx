import React, { useState } from "react";
import { ChatWindow } from "./VirtualHealthAssistant/ChatWindow";
import { MedicationReminderForm } from "./VirtualHealthAssistant/MedicationReminderForm";
import { QnADisplay } from "./VirtualHealthAssistant/QnADisplay";
import { ChronicConditionSupport } from "./VirtualHealthAssistant/ChronicConditionSupport";
import { NotificationAlert } from "./VirtualHealthAssistant/NotificationAlert";

export default function VirtualHealthAssistant() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [unread, setUnread] = useState(false);

  return (
    <div>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-50 rounded-full p-4 shadow-lg transition bg-transparent"
        onClick={() => { setOpen(!open); setUnread(false); }}
      >
        <span className="relative">
         <img src="/robot-assistant.png" alt="Virtual Health Assistant" className="w-20 h-20" />
          {unread && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2 py-0.5">!</span>
          )}
        </span>
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 max-w-full bg-white rounded-lg shadow-2xl z-50 flex flex-col">
          <div className="flex justify-between items-center p-3 border-b">
            <span className="font-bold text-lg">Virtual Health Assistant</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700">&times;</button>
          </div>
          <div className="flex border-b">
            <button className={`flex-1 p-2 ${activeTab === 'chat' ? 'bg-violet-100' : ''}`} onClick={() => setActiveTab('chat')}>Chat</button>
            <button className={`flex-1 p-2 ${activeTab === 'reminder' ? 'bg-violet-100' : ''}`} onClick={() => setActiveTab('reminder')}>Medication</button>
            <button className={`flex-1 p-2 ${activeTab === 'qna' ? 'bg-violet-100' : ''}`} onClick={() => setActiveTab('qna')}>Q&A</button>
            <button className={`flex-1 p-2 ${activeTab === 'chronic' ? 'bg-violet-100' : ''}`} onClick={() => setActiveTab('chronic')}>Chronic</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3" style={{ minHeight: 300 }}>
            {activeTab === "chat" && <ChatWindow setUnread={setUnread} />}
            {activeTab === "reminder" && <MedicationReminderForm />}
            {activeTab === "qna" && <QnADisplay />}
            {activeTab === "chronic" && <ChronicConditionSupport />}
          </div>
          <NotificationAlert />
        </div>
      )}
    </div>
  );
} 