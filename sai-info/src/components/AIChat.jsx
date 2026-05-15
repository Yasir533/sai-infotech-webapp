import React, { useState } from "react";

export default function AIChat() {

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "Hello 👋 Welcome to SAI INFOTECH.",
    },
  ]);

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

  return (

    <div>

      {/* CHAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 text-white text-2xl shadow-2xl z-50"
      >
        💬
      </button>

      {/* CHAT BOX */}
      {open && (

        <div className="fixed bottom-24 right-6 w-96 h-[550px] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-50">

          {/* HEADER */}
          <div className="bg-blue-600 p-5 text-white font-bold text-lg">
            SAI INFOTECH AI Assistant
          </div>

          {/* CHAT AREA */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">

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
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.text}
                </div>

              </div>
            ))}

          </div>

          {/* INPUT */}
          <div className="p-4 border-t border-slate-700 flex gap-3">

            <input
              type="text"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Ask something..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 px-5 rounded-xl text-white font-semibold"
            >
              Send
            </button>

          </div>

        </div>
      )}

    </div>
  );
}