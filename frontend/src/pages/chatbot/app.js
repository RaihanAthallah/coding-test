// pages/chatbot/app.js
import { useState, useEffect } from "react";

export function useSessionID() {
  const [sessionID, setSessionID] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionID = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/ai/generate-session", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        setSessionID(data.session_id || "No session ID generated");
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch session ID");
      } finally {
        setLoading(false);
      }
    };

    fetchSessionID();
  }, []);

  return { sessionID, loading, error };
}

export function useChatbot(session_id) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    console.log("Session ID:", session_id);

    try {
      const res = await fetch("http://localhost:8000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: session_id, question: input }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { text: data?.answer || "No response from bot", isUser: false }]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [...prev, { text: "Something went wrong.", isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return {
    input,
    messages,
    loading,
    handleInputChange,
    handleKeyDown,
    sendMessage,
  };
}
