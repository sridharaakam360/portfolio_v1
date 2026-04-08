import { useState, useEffect, useRef, FormEvent } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { initRAG, retrieveContext } from "../lib/rag";
import { chatWithGroq } from "../lib/groq";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! I am Gowtham's AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Model loading state for transformers.js
  const [isModelReady, setIsModelReady] = useState(false);
  const [modelProgress, setModelProgress] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize RAG Model
  useEffect(() => {
    let isMounted = true;
    const initialize = async () => {
      try {
        await initRAG((num) => {
          if (isMounted) setModelProgress(Math.round(num));
        });
        if (isMounted) setIsModelReady(true);
      } catch (error) {
        console.error("Error initializing RAG:", error);
      }
    };
    initialize();
    return () => { isMounted = false; };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !isModelReady) return;

    const userQuery = input.trim();
    setInput("");
    
    // Add User Message
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: userQuery };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 1. Retrieve Context from Knowledge Base
      const context = await retrieveContext(userQuery, 3);
      
      // 2. Format Chat History (excluding the current user message)
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      
      // 3. Query Groq API
      const response = await chatWithGroq(userQuery, context, history);
      
      // Add Assistant Message
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: response },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "Oops! Something went wrong retrieving the answer." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-50 animate-in slide-in-from-bottom border border-white/10"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 lg:bottom-10 lg:right-10 w-[95vw] md:w-[400px] h-[600px] max-h-[85vh] bg-background border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-8 fade-in fade-out">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-zinc-50 dark:bg-zinc-900 border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--google-blue))] text-white flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Gowtham's AI</h3>
                {!isModelReady ? (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Loader2 size={10} className="animate-spin" /> Load engine {modelProgress}%
                  </p>
                ) : (
                  <p className="text-xs text-[hsl(var(--google-green))] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--google-green))] inline-block" /> Online
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50 dark:bg-zinc-950/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.role === "user"
                      ? "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                      : "bg-[hsl(var(--google-blue))] text-white"
                  }`}
                >
                  {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-tr-sm"
                      : "bg-white border text-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200 rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-[hsl(var(--google-blue))] text-white">
                  <Bot size={16} />
                </div>
                <div className="px-5 py-3 rounded-2xl bg-white border dark:bg-zinc-900 dark:border-zinc-800 rounded-tl-sm flex items-center gap-1.5 focus:outline-none">
                  <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t bg-white dark:bg-zinc-950 border-border">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 rounded-full pl-4 pr-1 py-1 focus-within:ring-2 ring-zinc-500 transition-all"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isModelReady ? "Ask me anything..." : "Waking up AI model..."}
                disabled={isLoading || !isModelReady}
                className="flex-1 bg-transparent border-none outline-none text-[15px] placeholder:text-muted-foreground py-2 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading || !isModelReady}
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 disabled:opacity-50 text-white flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Send size={16} className="ml-[-2px] mt-[1px]" />
              </button>
            </form>
            <div className="text-center mt-2">
              <span className="text-[10px] text-zinc-400 font-medium tracking-wide">
                Retrieval-Augmented Generation / Groq Engine
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
