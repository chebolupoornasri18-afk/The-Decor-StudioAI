import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { LotusKolam, KolamCorner } from './kolam/KolamPatterns';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ExternalLink,
  Maximize2,
  Minimize2,
  RefreshCw,
  ShoppingBag,
  Plus,
  Compass,
  ArrowRight,
  Bot,
  Sparkle,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedProductIds?: string[];
}

interface DecorStudioChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  onAddToCart: (product: Product) => void;
  onAddToAIPlan: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const CHATBOT_URL = 'https://the-decor-studio-ai-rlo9.vercel.app';

export const DecorStudioChatbot: React.FC<DecorStudioChatbotProps> = ({
  isOpen,
  onToggle,
  onAddToCart,
  onAddToAIPlan,
  onQuickView,
}) => {
  const [activeTab, setActiveTab] = useState<'vercel' | 'chat'>('vercel');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [hasNewBadge, setHasNewBadge] = useState<boolean>(true);

  // Chat message history for direct conversational mode
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Vanakkam! Welcome to The Decor Studio AI Stylist (the-decor-studio-ai-rlo9.vercel.app). Tell me your room, aesthetic mood, or budget, and I will recommend authentic South Indian brassware, urlis, and heritage decor for your sanctum.',
      timestamp: 'Just now',
      suggestedProductIds: ['brass-kuthu-vilakku', 'ceramic-lotus-urli'],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  const handleRefreshIframe = () => {
    setIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend || isSending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsSending(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();
      const matchedIds: string[] = [];
      if (data.suggestedItems && Array.isArray(data.suggestedItems)) {
        data.suggestedItems.forEach((item: any) => {
          if (item.id) matchedIds.push(item.id);
        });
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'I would be honored to assist you with traditional South Indian interior decor.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedProductIds: matchedIds.length > 0 ? matchedIds : undefined,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: 'In South Indian homes, creating harmony begins with authentic bell-metal brass lamps and floating lotus urlis to bring sacred warmth and serenity.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedProductIds: ['brass-kuthu-vilakku', 'ceramic-lotus-urli'],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const QUICK_QUESTIONS = [
    'Traditional brass lamps under ₹3,500',
    'How to style a lotus urli with floating candles?',
    'Pooja room sanctum decor ideas',
    'What pieces suit a Chettinad living room?',
  ];

  return (
    <>
      {/* Floating Chatbot Launcher Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Floating invitation pill when closed */}
        {!isOpen && (
          <div
            onClick={onToggle}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#290812]/95 border border-[#D4AF37]/50 text-xs font-serif text-[#FAF8F5] shadow-2xl backdrop-blur-md cursor-pointer hover:border-[#D4AF37] hover:bg-[#380b19] transition-all group"
          >
            <LotusKolam size={16} color="#D4AF37" className="animate-subtle-float" />
            <span className="tracking-wide">AI Decor Chatbot</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        )}

        <button
          onClick={() => {
            setHasNewBadge(false);
            onToggle();
          }}
          className={`relative p-3.5 sm:p-4 rounded-full shadow-2xl border-2 transition-all duration-300 flex items-center justify-center cursor-pointer group focus-visible:outline-none ${
            isOpen
              ? 'bg-[#1f050d] border-[#D4AF37] text-[#FAF8F5]'
              : 'bg-[#290812] hover:bg-[#380b19] border-[#D4AF37] text-[#FAF8F5] hover:scale-105'
          }`}
          aria-label={isOpen ? 'Close AI Chatbot' : 'Open AI Chatbot'}
          title="The Decor Studio AI Chatbot (the-decor-studio-ai-rlo9.vercel.app)"
        >
          {isOpen ? (
            <X size={24} className="text-[#D4AF37]" />
          ) : (
            <div className="relative">
              <LotusKolam size={26} color="#FFFFFF" strokeWidth={1.4} />
              <Sparkles size={13} className="absolute -top-1 -right-1 text-[#D4AF37]" />
            </div>
          )}

          {/* New badge pulse */}
          {!isOpen && hasNewBadge && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border border-[#1f050d]" />
            </span>
          )}
        </button>
      </div>

      {/* Floating Chatbot Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 shadow-2xl bg-[#1f050d] text-[#FAF8F5] border border-[#D4AF37]/50 rounded-xl overflow-hidden flex flex-col ${
            isExpanded
              ? 'inset-3 sm:inset-6 md:inset-10'
              : 'bottom-22 right-4 sm:right-6 w-[94vw] sm:w-[480px] md:w-[520px] h-[82vh] max-h-[720px]'
          }`}
        >
          {/* Kolam Corner Accents */}
          <KolamCorner position="top-left" size={54} opacity={0.4} color="#FFFFFF" className="absolute top-1 left-1 pointer-events-none z-20" />
          <KolamCorner position="bottom-right" size={54} opacity={0.4} color="#FFFFFF" className="absolute bottom-1 right-1 pointer-events-none z-20" />

          {/* Top Bar Header */}
          <div className="p-3.5 sm:p-4 bg-[#260710] border-b border-[#D4AF37]/30 flex items-center justify-between z-10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1b040a] border border-[#D4AF37]/50 flex items-center justify-center">
                <LotusKolam size={18} color="#D4AF37" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm sm:text-base font-semibold text-[#FAF8F5] tracking-wide">
                    The Decor Studio AI
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <a
                  href={CHATBOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-[#D4AF37]/90 hover:text-[#E6CA65] flex items-center gap-1 font-mono truncate max-w-[240px] sm:max-w-xs transition-colors"
                  title="the-decor-studio-ai-rlo9.vercel.app"
                >
                  <span>the-decor-studio-ai-rlo9.vercel.app</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1 text-[#FAF8F5]/80">
              <a
                href={CHATBOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded hover:bg-[#350c18] hover:text-[#D4AF37] transition-colors"
                title="Open in new window"
              >
                <ExternalLink size={15} />
              </a>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded hover:bg-[#350c18] hover:text-[#D4AF37] transition-colors cursor-pointer hidden sm:block"
                title={isExpanded ? 'Collapse' : 'Maximize'}
              >
                {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>

              <button
                onClick={onToggle}
                className="p-1.5 rounded hover:bg-[#350c18] hover:text-[#D4AF37] transition-colors cursor-pointer"
                title="Close Chatbot"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Mode Tabs Switcher */}
          <div className="px-4 py-2 bg-[#20050d] border-b border-[#D4AF37]/20 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('vercel')}
                className={`px-3 py-1 rounded text-xs font-serif tracking-wider transition-all cursor-pointer border ${
                  activeTab === 'vercel'
                    ? 'bg-[#FAF8F5] text-[#1f050d] font-bold border-[#D4AF37] shadow-sm'
                    : 'bg-[#290812] text-[#D8C7B5] border-[#D4AF37]/30 hover:border-[#D4AF37]'
                }`}
              >
                Vercel Live Chatbot
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`px-3 py-1 rounded text-xs font-serif tracking-wider transition-all cursor-pointer border ${
                  activeTab === 'chat'
                    ? 'bg-[#FAF8F5] text-[#1f050d] font-bold border-[#D4AF37] shadow-sm'
                    : 'bg-[#290812] text-[#D8C7B5] border-[#D4AF37]/30 hover:border-[#D4AF37]'
                }`}
              >
                Studio Concierge
              </button>
            </div>

            {activeTab === 'vercel' && (
              <button
                onClick={handleRefreshIframe}
                className="p-1 text-[#D4AF37] hover:text-[#FAF8F5] transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                title="Refresh chatbot frame"
              >
                <RefreshCw size={12} className={iframeLoading ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">Reload</span>
              </button>
            )}
          </div>

          {/* Tab 1: Vercel Live Chatbot Iframe Embed */}
          {activeTab === 'vercel' && (
            <div className="relative flex-1 w-full bg-[#160308] overflow-hidden flex flex-col">
              {iframeLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#1f050d]/90 backdrop-blur-sm space-y-3">
                  <LotusKolam size={42} color="#D4AF37" className="animate-spin" />
                  <p className="text-xs font-serif text-[#FAF8F5] tracking-wide">
                    Loading The Decor Studio AI from Vercel...
                  </p>
                  <p className="text-[11px] text-[#D8C7B5]/60 font-mono">
                    the-decor-studio-ai-rlo9.vercel.app
                  </p>
                </div>
              )}

              <iframe
                key={iframeKey}
                ref={iframeRef}
                src={CHATBOT_URL}
                title="The Decor Studio AI Chatbot"
                className="w-full h-full border-0 flex-1"
                allow="clipboard-write; microphone"
                onLoad={() => setIframeLoading(false)}
              />

              {/* Status bar footer */}
              <div className="px-3.5 py-1.5 bg-[#1b040a] border-t border-[#D4AF37]/20 flex items-center justify-between text-[11px] text-[#D8C7B5]">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span className="truncate">Source: the-decor-studio-ai-rlo9.vercel.app</span>
                </div>
                <a
                  href={CHATBOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline text-[10px] shrink-0 font-medium ml-2"
                >
                  Open Fullscreen &rarr;
                </a>
              </div>
            </div>
          )}

          {/* Tab 2: Studio Concierge Conversational Chat */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col bg-[#1c040a] overflow-hidden">
              
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    } space-y-1`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-[#D8C7B5]/60 px-1">
                      <span>{msg.sender === 'user' ? 'You' : 'The Decor Studio AI'}</span>
                      <span>&bull;</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#FAF8F5] text-[#1f050d] font-medium shadow-md'
                          : 'bg-[#290812] text-[#FAF8F5] border border-[#D4AF37]/30 shadow-md font-body'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>

                    {/* Product Recommendation Cards (if returned) */}
                    {msg.suggestedProductIds && msg.suggestedProductIds.length > 0 && (
                      <div className="pt-2 w-full max-w-[90%] space-y-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold block">
                          Recommended Studio Pieces:
                        </span>

                        <div className="grid grid-cols-1 gap-2">
                          {msg.suggestedProductIds.map((pid) => {
                            const prod = PRODUCTS.find((p) => p.id === pid);
                            if (!prod) return null;

                            return (
                              <div
                                key={prod.id}
                                className="p-2.5 rounded bg-[#FAF8F5] text-[#1f050d] border border-[#D4AF37]/60 flex items-center justify-between gap-3 shadow-md"
                              >
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  className="w-12 h-12 rounded object-cover border border-[#D4AF37]/30 shrink-0"
                                  referrerPolicy="no-referrer"
                                />

                                <div className="flex-1 min-w-0">
                                  <h5
                                    onClick={() => onQuickView(prod)}
                                    className="font-serif text-xs font-bold text-[#1f050d] truncate hover:text-[#9E4738] cursor-pointer"
                                  >
                                    {prod.name}
                                  </h5>
                                  <span className="font-serif text-xs font-bold text-[#1f050d] tabular-nums">
                                    ₹{prod.price.toLocaleString('en-IN')}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    onClick={() => onAddToCart(prod)}
                                    className="p-1.5 rounded bg-[#290812] hover:bg-[#3d0d1c] text-[#FAF8F5] transition-colors"
                                    title="Add to Bag"
                                  >
                                    <ShoppingBag size={13} className="text-[#D4AF37]" />
                                  </button>
                                  <button
                                    onClick={() => onAddToAIPlan(prod)}
                                    className="p-1.5 rounded bg-[#FAF0E6] text-[#290812] hover:bg-white border border-[#290812]/20 transition-colors"
                                    title="Add to AI Plan"
                                  >
                                    <Plus size={13} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isSending && (
                  <div className="flex items-center gap-2 text-xs text-[#D4AF37] italic p-2 bg-[#290812]/70 rounded border border-[#D4AF37]/20 w-fit">
                    <LotusKolam size={14} color="#D4AF37" className="animate-spin" />
                    <span>Curating traditional aesthetic recommendations...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions Chips */}
              <div className="p-2.5 bg-[#22060e] border-t border-[#D4AF37]/20 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold shrink-0">
                  Ask:
                </span>
                {QUICK_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="px-2.5 py-1 rounded bg-[#1b040a] hover:bg-[#350c18] border border-[#D4AF37]/30 text-[11px] text-[#FAF8F5] whitespace-nowrap cursor-pointer transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-[#1f050d] border-t border-[#D4AF37]/30 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about rooms, brass lamps, urlis, or budget..."
                  className="flex-1 px-3.5 py-2.5 rounded bg-[#290812] border border-[#D4AF37]/40 text-xs text-[#FAF8F5] placeholder-[#D8C7B5]/40 focus:outline-none focus:border-[#D4AF37]"
                />

                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isSending}
                  className="p-2.5 rounded bg-[#FAF8F5] hover:bg-[#EDE4D8] text-[#1f050d] transition-colors disabled:opacity-40 cursor-pointer shadow-md"
                  aria-label="Send message"
                >
                  <Send size={15} className="text-[#1f050d]" />
                </button>
              </form>

            </div>
          )}

        </div>
      )}
    </>
  );
};
