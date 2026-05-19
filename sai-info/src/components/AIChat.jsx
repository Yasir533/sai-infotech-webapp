import React, { useState, useRef, useEffect } from "react";

export default function AIChat() {

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([
    {
      sender: "bot",
      text:
        "Hello 👋\n\nI’m the SAI INFOTECH Virtual Assistant Chatbot.\n\nI can help you with:\n• IT Services\n• Data Recovery\n• CCTV Solutions\n• Networking\n• Cloud Services\n• Laptop & Server Support\n\nHow can I assist you today?",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
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
          text:
            "Unable to connect to server.\n\nPlease contact:\n📞 83103 38544\n📞 99459 81999\n☎ Office: 76769 52139",
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
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl shadow-2xl z-50 transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
      >
        🤖
      </button>

      {/* CHAT BOX */}
      {open && (

        <div className="fixed bottom-20 right-4 w-[340px] h-[500px] bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-50">

          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/30 border-b border-slate-700">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                🤖
              </div>

              <div>
                <div className="text-white font-semibold text-[13px]">
                  SAI INFOTECH
                </div>

                <div className="text-[10px] text-green-400">
                  Virtual Assistant Chatbot
                </div>
              </div>

            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white text-lg"
            >
              ✕
            </button>

          </div>

          {/* CHAT AREA */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">

            {chat.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl shadow whitespace-pre-wrap text-[13px] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.text}
                </div>

              </div>

            ))}

            <div ref={messagesEndRef} />

          </div>

          {/* QUICK QUESTIONS */}
          <div className="px-3 py-2 flex flex-wrap gap-2 border-t border-slate-700 bg-black/10">

            {[
              "Services",
              "Data Recovery",
              "CCTV",
              "Networking",
              "Contact",
            ].map((item) => (

              <button
                key={item}
                onClick={() => setMessage(item)}
                className="text-[10px] px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              >
                {item}
              </button>

            ))}

          </div>

          {/* INPUT */}
          <div className="p-3 border-t border-slate-700 flex gap-2 bg-gradient-to-t from-transparent to-black/20">

            <textarea
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about services..."
              className="flex-1 resize-none bg-transparent border border-slate-700 rounded-xl px-3 py-2 text-[13px] text-white outline-none placeholder:text-slate-400"
            />

            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 rounded-xl text-white text-sm font-semibold shadow-md hover:brightness-95"
            >
              Send
            </button>

          </div>

        </div>
      )}

    </div>
  );
}