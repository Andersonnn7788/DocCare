import React from "react";

export function QnADisplay() {
  const qna = [
    { q: "What should I do if I miss a dose?", a: "Take it as soon as you remember, but skip if it's almost time for your next dose." },
    { q: "Can I take ibuprofen with my medication?", a: "Consult your doctor before combining medications." },
    { q: "How do I manage my blood pressure?", a: "Monitor regularly, take medication as prescribed, and maintain a healthy lifestyle." }
  ];
  return (
    <div>
      <ul className="space-y-2">
        {qna.map((item, i) => (
          <li key={i}>
            <div className="font-semibold text-violet-700">Q: {item.q}</div>
            <div className="ml-2 text-gray-700">A: {item.a}</div>
          </li>
        ))}
      </ul>
    </div>
  );
} 