import React, { useState, useRef, useEffect } from "react";

export default function AIChat() {

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "Hello 👋 Welcome to SAI INFOTECH.",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, open]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);

    try {

      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await response.json();

      const botMessage = {
        sender: "bot",
        text: data.reply,
      };

      setChat((prev) => [...prev, botMessage]);

    } catch (error) {

      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Server Error",
        },
      ]);
    }

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (

    <div>

      {/* CHAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl shadow-2xl z-50 transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.862 9.862 0 01-4-.83L3 20l1.34-3.66A7.97 7.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* CHAT BOX */}

      {open && (

        <div className="fixed bottom-24 right-6 w-96 h-[550px] bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-50">

          {/* HEADER */}
          <div className="flex items-center justify-between p-4 bg-opacity-60 bg-black/30 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">🤖</div>
              <div>
                <div className="text-white font-semibold">SAI INFOTECH</div>
                <div className="text-xs text-slate-400">AI Assistant</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setOpen(false)} className="text-slate-300 hover:text-white p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* CHAT AREA */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">

            {chat.map((msg, index) => (

              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>

                <div className={`max-w-[80%] px-4 py-3 rounded-2xl shadow ${msg.sender === "user" ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white" : "bg-slate-800 text-slate-200"}`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>

              </div>
            ))}

            <div ref={messagesEndRef} />

          </div>

          {/* INPUT */}
          <div className="p-4 border-t border-slate-700 flex gap-3 bg-gradient-to-t from-transparent to-black/20">

            <textarea
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something... (Enter to send, Shift+Enter for newline)"
              className="flex-1 resize-none bg-transparent border border-slate-700 rounded-xl px-4 py-3 text-white outline-none placeholder:text-slate-400"
            />

            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 px-5 rounded-xl text-white font-semibold shadow-md hover:brightness-95"
            >
              Send
            </button>

          </div>

        </div>
      )}

    </div>
  );
}