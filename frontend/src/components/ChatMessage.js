export default function ChatMessage({ message, isUser }) {
  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${isUser ? "bg-blue-800 text-white" : "bg-gray-600 text-white dark:bg-gray-700 dark:text-white"}`}>{message}</div>
    </div>
  );
}
