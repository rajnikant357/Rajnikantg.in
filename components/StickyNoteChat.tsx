import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Loader2 } from 'lucide-react';
import { getChatResponse } from '../services/chatService';
import { ChatMessage } from '../types';
import { contactLinks } from '../data/chatData';

export const StickyNoteChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Paper Pots, Rajnikant's AI assistant. Scribble a question below!" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Simulate a small network/thinking delay for realism
    const delay = 600 + Math.random() * 800; // 0.6s to 1.4s

    setTimeout(async () => {
      try {
        const responseText = await getChatResponse(userMsg.text);
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      } catch (error) {
        setMessages(prev => [...prev, { role: 'model', text: "Sorry, I got a papercut. Try again.", isError: true }]);
      } finally {
        setLoading(false);
      }
    }, delay);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 transform hover:scale-110 transition-transform duration-300"
        aria-label="Open Chat"
      >
        <div className="relative group">
           <div className="absolute inset-0 bg-yellow-400 rotate-3 rounded shadow-md group-hover:rotate-6 transition-transform"></div>
           <div className="relative bg-yellow-200 text-yellow-900 p-4 rounded shadow-lg border border-yellow-300 font-hand text-xl font-bold flex items-center gap-2">
             <MessageCircle size={24} />
             <span>Paper Pots</span>
           </div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 font-hand">
      {/* Sticky Note Visuals */}
      <div className="relative bg-yellow-200 shadow-[4px_4px_10px_rgba(0,0,0,0.2)] rounded-sm p-4 transform -rotate-1 border-t border-yellow-100">
        {/* Tape Effect */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-amber-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm tape-serrated"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-yellow-300 pb-2">
          <h3 className="text-xl font-bold text-yellow-900">Paper Pots 🪴</h3>
          <button onClick={() => setIsOpen(false)} className="text-yellow-800 hover:text-red-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-64 overflow-y-auto pr-2 custom-scrollbar mb-4 space-y-3">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-2 rounded-lg text-lg leading-6 whitespace-pre-line ${
                  msg.role === 'user' 
                    ? 'bg-yellow-300 text-yellow-900 shadow-sm rotate-1' 
                    : 'bg-white/60 text-gray-800 shadow-sm -rotate-1'
                }`}
              >
                {renderMessage(msg.text)}
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-white/60 p-2 rounded-lg -rotate-1">
                 <Loader2 className="animate-spin text-yellow-700" size={20} />
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Scribble a question..."
            className="w-full bg-yellow-100 border-b-2 border-yellow-400 focus:border-yellow-600 outline-none px-2 py-1 text-xl placeholder-yellow-800/50 text-yellow-900 pr-10"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="absolute right-0 bottom-1 text-yellow-800 hover:text-yellow-950 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper to render message text with clickable contact links when patterns match
function renderMessage(text: string) {
  // If no line breaks, still handle single-line containing contact info
  const lines = text.split(/\r?\n/);
  return (
    <div>
      {lines.map((line, i) => {
        const trimmed = line.trim();
        // call - +91 7084202503
        const callMatch = trimmed.match(/^call\s*-\s*(.+)$/i);
        if (callMatch) {
          const label = callMatch[0].replace(/call\s*-\s*/i, 'call - ');
          return (
            <div key={i}>
              <a href={contactLinks.phone} className="font-bold text-blue-600 hover:underline" target="_blank" rel="noreferrer">{label}</a>
            </div>
          );
        }

        const mailMatch = trimmed.match(/^mail\s*-\s*(.+)$/i);
        if (mailMatch) {
          const label = mailMatch[0].replace(/mail\s*-\s*/i, 'mail - ');
          return (
            <div key={i}>
              <a href={contactLinks.mail} className="font-bold text-blue-600 hover:underline" target="_blank" rel="noreferrer">{label}</a>
            </div>
          );
        }

        const linkedinMatch = trimmed.match(/^linkedin\s*-\s*(.+)$/i);
        if (linkedinMatch) {
          const label = linkedinMatch[0].replace(/linkedin\s*-\s*/i, 'linkedin - ');
          return (
            <div key={i}>
              <a href={contactLinks.linkedin} className="font-bold text-blue-600 hover:underline" target="_blank" rel="noreferrer">{label}</a>
            </div>
          );
        }

        const twitterMatch = trimmed.match(/^(x\/twitter|x|twitter)\s*-\s*(.+)$/i);
        if (twitterMatch) {
          const label = trimmed.replace(/^(x\/twitter|x|twitter)\s*-\s*/i, 'X/twitter - ');
          return (
            <div key={i}>
              <a href={contactLinks.twitter} className="font-bold text-blue-600 hover:underline" target="_blank" rel="noreferrer">{label}</a>
            </div>
          );
        }

        // Default: render plain text preserving line breaks
        return (
          <div key={i} className="whitespace-pre-line">{line}</div>
        );
      })}
    </div>
  );
}