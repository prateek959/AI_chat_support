import { useEffect, useRef, useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const API = 'http://localhost:3030'

  const bottomRef = useRef(null);

  const generateSessionId = () =>
    "sess_" + Date.now() + "_" + Math.random().toString(36).substring(2, 8);


  useEffect(() => {
    let storedSession = localStorage.getItem("chat_session_id");

    if (!storedSession) {
      storedSession = generateSessionId();
      localStorage.setItem("chat_session_id", storedSession);
    }

    setSessionId(storedSession);
  }, []);


  useEffect(() => {
    if (!sessionId) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API}/chat/history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (Array.isArray(data.data)) {
          setMessages(data.data);
        }
      } catch (err) {
        console.error("History fetch failed", err);
      }
    };

    fetchHistory();
  }, [sessionId]);

 
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading || !sessionId) return;

    const userMsg = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          message: userMsg.text,
        }),
      });

      const data = await res.json();

      const aiMsg = {
        sender: "ai",
        text: data.reply || "Something went wrong",
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Server error. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="w-full max-w-3xl h-[90vh] bg-gray-950 rounded-2xl shadow-2xl flex flex-col overflow-hidden">

        <div className="p-4 border-b border-gray-800 text-white font-semibold text-lg">
          AI Customer Support
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm
                ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-800 text-gray-100 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-gray-400 px-4 py-2 rounded-2xl text-sm animate-pulse">
                Agent is typing...
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-gray-800 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-xl outline-none border border-gray-800 focus:border-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded-xl transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
