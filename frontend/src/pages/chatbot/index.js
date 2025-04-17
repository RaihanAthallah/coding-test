import ChatMessage from "../../components/ChatMessage";
import { useChatbot, useSessionID } from "../../hooks/chatbotHooks";

export default function ChatbotPage() {
  const { sessionID, loading: sessionLoading, error } = useSessionID(); // Replace with your session ID retrieval logic
  const { input, messages, loading, handleInputChange, handleKeyDown, sendMessage } = useChatbot(sessionID);

  if (sessionLoading) return <div className="p-4 text-center">Loading session...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-950 dark:bg-gray-950 text-black dark:text-white flex flex-col items-center px-4 pt-10">
      <h1 className="text-3xl font-bold text-cyan-600 mb-6">💬 Chat with our AI</h1>

      <div className="w-full max-w-2xl flex-1 space-y-4 overflow-y-auto mb-4 p-4 bg-gray-900 dark:bg-gray-900 rounded-lg shadow-inner">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg.text} isUser={msg.isUser} />
        ))}
        {loading && (
          <ChatMessage
            message={
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" />
              </span>
            }
            isUser={false}
          />
        )}
      </div>

      <div className="w-full max-w-2xl flex gap-2 mb-4 sticky bottom-0 ">
        <input
          className="flex-1 border border-cyan-700 rounded-full px-4 py-2 text-white bg-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage} disabled={loading} className="px-4 py-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Send
        </button>
      </div>
    </div>
  );
}
