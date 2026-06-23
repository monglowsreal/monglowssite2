import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { lang } = useLanguage();

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { 
          role: 'assistant', 
          content: lang === 'en' 
            ? "Hello! I'm Tahir's AI assistant. Feel free to ask me anything about his work, experience, or background!"
            : "Merhaba! Ben Tahir'in yapay zeka asistanıyım. Tahir'in işleri, tecrübesi veya geçmişi hakkında bana her şeyi sorabilirsiniz!" 
        }
      ]);
    }
  }, [isOpen, lang, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Send to our Vercel Serverless Function
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: lang === 'en' ? "System error. The AI module is currently offline." : "Sistem hatası. Yapay zeka modülü şu an çevrimdışı (API Key eksik olabilir)." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: lang === 'en' ? "Network error. Cannot reach servers." : "Ağ hatası. Sunuculara ulaşılamıyor." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-accent text-background shadow-lg shadow-accent/20 hover:scale-110 transition-transform duration-300 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-[90vw] max-w-[400px] h-[500px] max-h-[80vh] bg-[#0A0A14] border border-ghost/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-graphite/50 border-b border-ghost/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="font-sans font-bold text-ghost text-sm">Tahir AI Assistant</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></div>
                <span className="text-[10px] text-ghost/50 font-mono">ONLINE</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-ghost/50 hover:text-ghost hover:bg-ghost/10 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === 'user' 
                  ? 'bg-accent text-background rounded-tr-sm' 
                  : 'bg-graphite/50 text-ghost/90 border border-ghost/5 rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-graphite/50 border border-ghost/5 rounded-2xl rounded-tl-sm px-4 py-3">
                <Loader2 size={16} className="text-accent animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-graphite/30 border-t border-ghost/10 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === 'en' ? "Ask something..." : "Bir şeyler sorun..."}
            className="flex-1 bg-transparent border-none outline-none text-sm text-ghost placeholder:text-ghost/30 px-2"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 bg-accent text-background rounded-xl disabled:opacity-50 disabled:hover:scale-100 hover:scale-105 transition-transform"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
}
