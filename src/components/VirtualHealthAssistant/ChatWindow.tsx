import React, { useState } from "react";
import axios from "axios";
import { franc } from 'franc-min';

export function ChatWindow({ setUnread }: { setUnread: (v: boolean) => void }) {
  const [messages, setMessages] = useState([
    { from: "assistant", text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    setLoading(true);
    try {
      // Use franc-min to detect the language of the user's input
      const francLang = franc(input);
      let userLang = 'en';
      if (francLang === 'cmn') userLang = 'zh';
      else if (francLang === 'msa') userLang = 'ms';
      else if (francLang === 'eng') userLang = 'en';
      else if (francLang === 'tam') userLang = 'ta';
      else if (francLang === 'spa') userLang = 'es';
      else if (francLang === 'fra') userLang = 'fr';
      else if (francLang === 'deu') userLang = 'de';
      else if (navigator.language) userLang = navigator.language.split('-')[0];
      const res = await axios.post("http://localhost:5000/api/virtual-assistant", { message: input, language: userLang });
      setMessages(msgs => [...msgs, { from: "assistant", text: res.data.answer }]);
      setUnread(true);
    } catch (err) {
      setMessages(msgs => [...msgs, { from: "assistant", text: "Sorry, I couldn't reach the AI service." }]);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-2 max-h-48 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-1 ${msg.from === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-3 py-1 rounded-lg ${msg.from === "user" ? "bg-violet-200" : "bg-gray-100"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border rounded-l px-2 py-1"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button className="bg-violet-600 text-white px-4 rounded-r" onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
} 