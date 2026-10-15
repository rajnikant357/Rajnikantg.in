import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Loader2 } from 'lucide-react';
import { getChatResponse } from '../services/chatService';
import { ChatMessage } from '../types';
import { useAdminData } from '../src/context/AdminDataContext';

export const StickyNoteChat: React.FC = () => {
  const { data } = useAdminData();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Paper Pots, Rajnikant's AI assistant. Scribble a question below!" }
  ]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Intelligent scroll handler:
  // - When user asks a question: scroll to bottom so the user's question and writing indicator are visible.
  // - When model responds: scroll so the question and the start of the response are visible from the top,
  //   preventing the response from getting pushed down to the bottom and cut off.
  useEffect(() => {
    if (!isOpen) return;

    const lastIdx = messages.length - 1;
    const lastMsg = messages[lastIdx];
    if (!lastMsg) return;

    const timer = setTimeout(() => {
      const container = messagesContainerRef.current;
      if (!container) return;

      if (lastMsg.role === 'user') {
        // User asked something -> scroll to bottom to see question & loading state
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (lastMsg.role === 'model') {
        if (messages.length <= 1) {
          // Initial greeting message: show from top
          container.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Locate the user's question that prompted this answer
        const userIdx = lastIdx - 1;
        const userEl = userIdx >= 0 ? messageElementsRef.current[userIdx] : null;
        const modelEl = messageElementsRef.current[lastIdx];

        if (userEl && modelEl) {
          const userTop = userEl.offsetTop - container.offsetTop;
          const userHeight = userEl.offsetHeight;

          // If user question is of standard height, scroll so question + top of response are in view
          if (userHeight < 120) {
            container.scrollTo({
              top: Math.max(0, userTop - 8),
              behavior: 'smooth'
            });
          } else {
            // If user question is very tall, align to start of model answer
            const modelTop = modelEl.offsetTop - container.offsetTop;
            container.scrollTo({
              top: Math.max(0, modelTop - 8),
              behavior: 'smooth'
            });
          }
        } else if (modelEl) {
          const modelTop = modelEl.offsetTop - container.offsetTop;
          container.scrollTo({
            top: Math.max(0, modelTop - 8),
            behavior: 'smooth'
          });
        }
      }
    }, 60);

    return () => clearTimeout(timer);
  }, [messages, isOpen, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Simulate thinking delay for natural feel
    const delay = 600 + Math.random() * 600;

    setTimeout(async () => {
      try {
        const responseText = await getChatResponse(userMsg.text, data.chatIntents, data.chatKnowledge);
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
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transform hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer"
        aria-label="Open Chat"
      >
        <div className="relative group">
           <div className="absolute inset-0 bg-yellow-400 rotate-3 rounded shadow-md group-hover:rotate-6 transition-transform"></div>
           <div className="relative bg-yellow-200 text-yellow-900 p-3 sm:p-4 rounded shadow-lg border border-yellow-300 font-hand text-lg sm:text-xl font-bold flex items-center gap-2">
             <MessageCircle size={22} className="text-yellow-800" />
             <span>Paper Pots 🪴</span>
           </div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-[420px] font-hand">
      {/* Sticky Note Visuals */}
      <div className="relative bg-yellow-200 shadow-[0_12px_30px_rgba(0,0,0,0.25)] rounded-sm p-4 transform -rotate-1 border-t-2 border-yellow-100">
        {/* Tape Effect */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-amber-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm tape-serrated pointer-events-none"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-3 border-b-2 border-yellow-300 pb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-yellow-900 font-marker">Paper Pots 🪴</h3>
            <span className="text-xs bg-yellow-300/80 text-yellow-950 px-1.5 py-0.5 rounded border border-yellow-400 font-hand font-bold tracking-wider">
              AI ASSISTANT
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
            title="Close Chat"
            aria-label="Close Chat"
            className="flex items-center justify-center p-1 sm:p-1.5 border-[2px] sm:border-[2.5px] border-slate-600 text-slate-700 hover:bg-white bg-white/90 shadow-sm transform -rotate-2 hover:rotate-0 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <X size={18} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Messages Area — taller, high contrast, clean scrollbar */}
        <div 
          ref={messagesContainerRef}
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#d97706 transparent' }}
          className="h-80 sm:h-96 max-h-[55vh] overflow-y-auto pr-2 mb-3 space-y-3.5 scroll-smooth"
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              ref={el => { messageElementsRef.current[idx] = el; }}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              {/* Role badge */}
              <div 
                className={`flex items-center gap-1 mb-1 text-xs font-marker select-none ${
                  msg.role === 'user' ? 'text-sky-900/80 pr-1' : 'text-amber-900/80 pl-1'
                }`}
              >
                {msg.role === 'user' ? (
                  <>
                    <span>You</span>
                    <span>✍️</span>
                  </>
                ) : (
                  <>
                    <span>🪴 Paper Pots</span>
                  </>
                )}
              </div>

              {/* Chat Bubble Card */}
              <div 
                className={`max-w-[88%] rounded-sm text-lg sm:text-xl leading-relaxed transition-all duration-200 ${
                  msg.role === 'user' 
                    ? 'bg-sky-100/95 text-slate-900 border border-sky-300 shadow-[1px_2px_5px_rgba(0,0,0,0.08)] px-3.5 py-2 rotate-0.5 hover:rotate-0' 
                    : msg.isError
                      ? 'bg-red-50 text-red-900 border border-red-300 shadow-sm px-3.5 py-2.5 -rotate-0.5'
                      : 'bg-white text-slate-900 border border-amber-200 shadow-[2px_3px_8px_rgba(0,0,0,0.12)] px-3.5 py-2.5 -rotate-0.5 hover:rotate-0'
                }`}
              >
                {renderMessage(msg.text, data.contact)}
              </div>
            </div>
          ))}

          {/* Real-time scribbling loader */}
          {loading && (
             <div className="flex flex-col items-start animate-in fade-in duration-200">
               <div className="flex items-center gap-1 mb-1 text-xs font-marker text-amber-900/80 pl-1 select-none">
                 <span>🪴 Paper Pots</span>
               </div>
               <div className="bg-white/95 text-slate-800 border border-amber-200 shadow-sm px-3.5 py-2 rounded-sm -rotate-0.5 flex items-center gap-2 text-lg">
                 <Loader2 className="animate-spin text-amber-700 shrink-0" size={18} />
                 <span className="text-amber-950/80 italic font-medium">Scribbling an answer...</span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} className="h-1" />
        </div>

        {/* Input Area */}
        <div className="relative pt-1 border-t border-yellow-300/60">
          <input 
            ref={inputRef}
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Scribble a question..."
            className="w-full bg-yellow-100/80 border-b-2 border-yellow-400 focus:border-yellow-600 outline-none px-2.5 py-1.5 text-xl placeholder-yellow-800/50 text-yellow-950 pr-10 rounded-none transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute right-1 bottom-2 text-yellow-800 hover:text-yellow-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all p-1 cursor-pointer hover:scale-110 active:scale-95"
            title="Send scribbled message"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper to render URLs within text strings
function renderLineWithLinks(line: string) {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  const parts = line.split(urlRegex);
  if (parts.length === 1) return line;

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      const href = part.startsWith('www.') ? `https://${part}` : part;
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:text-blue-800 font-bold underline decoration-wavy underline-offset-2 break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

// Helper to render message text with clickable contact links and proper line height
function renderMessage(text: string, contact: any) {
  const lines = text.split(/\r?\n/);
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        const trimmed = line.trim();

        // Phone: call - +91 7084202503
        const callMatch = trimmed.match(/^call\s*-\s*(.+)$/i);
        if (callMatch) {
          const label = callMatch[0].replace(/call\s*-\s*/i, 'call - ');
          return (
            <div key={i}>
              <a 
                href={`tel:${contact?.phone || ''}`} 
                className="font-bold text-blue-600 hover:text-blue-800 underline decoration-wavy underline-offset-2" 
                target="_blank" 
                rel="noreferrer"
              >
                {label}
              </a>
            </div>
          );
        }

        // Email: mail - ...
        const mailMatch = trimmed.match(/^mail\s*-\s*(.+)$/i);
        if (mailMatch) {
          const label = mailMatch[0].replace(/mail\s*-\s*/i, 'mail - ');
          return (
            <div key={i}>
              <a 
                href={`mailto:${contact?.email || ''}`} 
                className="font-bold text-blue-600 hover:text-blue-800 underline decoration-wavy underline-offset-2" 
                target="_blank" 
                rel="noreferrer"
              >
                {label}
              </a>
            </div>
          );
        }

        // LinkedIn: linkedin - ...
        const linkedinMatch = trimmed.match(/^linkedin\s*-\s*(.+)$/i);
        if (linkedinMatch) {
          const label = linkedinMatch[0].replace(/linkedin\s*-\s*/i, 'linkedin - ');
          return (
            <div key={i}>
              <a 
                href={contact?.linkedin || ''} 
                className="font-bold text-blue-600 hover:text-blue-800 underline decoration-wavy underline-offset-2" 
                target="_blank" 
                rel="noreferrer"
              >
                {label}
              </a>
            </div>
          );
        }

        // Twitter / X: x - ...
        const twitterMatch = trimmed.match(/^(x\/twitter|x|twitter)\s*-\s*(.+)$/i);
        if (twitterMatch) {
          const label = trimmed.replace(/^(x\/twitter|x|twitter)\s*-\s*/i, 'X/twitter - ');
          return (
            <div key={i}>
              <a 
                href={contact?.twitter || ''} 
                className="font-bold text-blue-600 hover:text-blue-800 underline decoration-wavy underline-offset-2" 
                target="_blank" 
                rel="noreferrer"
              >
                {label}
              </a>
            </div>
          );
        }

        // Preserve paragraph spacing for blank lines
        if (trimmed === '') {
          return <div key={i} className="h-2" />;
        }

        // Default line rendering with auto-link detection
        return (
          <div key={i} className="whitespace-pre-line leading-relaxed">
            {renderLineWithLinks(line)}
          </div>
        );
      })}
    </div>
  );
}