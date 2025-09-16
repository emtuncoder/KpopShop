import React, { useState } from "react";
import axios from "axios";
import { MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { faqSamples } from "../../backend/faqsamples";

const ChatPopupComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi there! Ask me about albums, delivery, or your favorite K-pop artist!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (msgText) => {
    const userMessage = msgText || input.trim();
    if (!userMessage) return;

    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:1709/api/openrouter/chat", {
        messages: newMessages,
      });

      const botReply = res.data.choices?.[0]?.message?.content || "🤖 Sorry, I didn't get that.";
      setMessages([...newMessages, { role: "assistant", content: botReply }]);
    } catch (err) {
      console.error("❌ Chat error:", err.message);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "❌ Failed to connect. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button with Bounce Animation */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={toggleChat}
          className="bg-pink-500 text-white p-4 rounded-full shadow-xl hover:bg-pink-600 transition transform hover:scale-110"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </motion.div>

      {/* Gorgeous Animated Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbox"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-white/90 backdrop-blur-md border border-gray-300 rounded-xl shadow-2xl flex flex-col overflow-hidden text-sm"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-4 py-3 font-bold text-center shadow">
              💬 Ask Me Anything
            </div>

            {/* Sample Questions */}
            <div className="px-4 py-2 bg-white/30 border-b border-gray-200 space-y-1">
              <p className="text-xs text-gray-500">💡 Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {faqSamples.slice(0, 3).map((sample, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(sample.question)}
                    className="bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs px-3 py-1 rounded-full shadow-sm transition"
                  >
                    {sample.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-3 overflow-y-auto h-80 space-y-3 bg-white/40">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`max-w-[85%] px-3 py-2 rounded-lg leading-snug whitespace-pre-line break-words ${
                    msg.role === "user"
                      ? "bg-pink-100 self-end ml-auto text-right"
                      : "bg-gray-100 self-start mr-auto"
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
              ))}
              {loading && <div className="text-xs text-gray-400">🧠 Thinking...</div>}
            </div>

            {/* Input */}
            <div className="border-t bg-white/60 px-4 py-2 flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              />
              <button
                onClick={() => sendMessage()}
                className="text-pink-500 font-semibold hover:text-pink-600 transition"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatPopupComponent;
