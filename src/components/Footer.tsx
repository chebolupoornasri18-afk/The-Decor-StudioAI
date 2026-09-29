import React, { useState } from 'react';
import { CircularMandalaKolam, KolamBorderDivider, LotusKolam } from './kolam/KolamPatterns';
import { ArrowRight, CheckCircle2, Heart, Mail } from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenChatbot?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection, onOpenChatbot }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="relative bg-[#160308] text-[#FAF8F5] pt-16 pb-12 overflow-hidden border-t border-[#D4AF37]/30">
      
      {/* Large subtle white Kolam pattern in footer as requested */}
      <div className="absolute -bottom-36 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0">
        <CircularMandalaKolam
          size={600}
          color="#FFFFFF"
          opacity={0.09}
          strokeWidth={1}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Kolam Divider */}
        <KolamBorderDivider opacity={0.4} color="#FFFFFF" className="mb-2" />

        {/* Brand Display as requested */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#D4AF37]/50 bg-[#290812] mx-auto shadow-md">
            <LotusKolam size={30} color="#FFFFFF" opacity={1} strokeWidth={1.4} />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-widest uppercase text-[#FAF8F5]">
            The Decor Studio
          </h2>

          <p className="font-serif italic text-lg sm:text-xl text-[#FAF8F5]/90">
            “Where Every Corner Tells a Story.”
          </p>

          <p className="text-xs sm:text-sm text-[#D8C7B5] font-light max-w-lg mx-auto leading-relaxed pt-1">
            Bridging centuries of South Indian temple casting, woodcarving, and terracotta traditions 
            with modern architectural sanctuary styling.
          </p>
        </div>

        {/* Navigation Row as requested */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium tracking-wide text-[#E8DFD5] border-t border-b border-[#D4AF37]/20 py-4">
          <button
            onClick={() => onNavigateToSection('hero')}
            className="hover:text-[#E6CA65] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="text-[#D4AF37]/40">&bull;</span>
          <button
            onClick={() => onNavigateToSection('catalog')}
            className="hover:text-[#E6CA65] transition-colors cursor-pointer"
          >
            Shop
          </button>
          <span className="text-[#D4AF37]/40">&bull;</span>
          <button
            onClick={() => onNavigateToSection('collections')}
            className="hover:text-[#E6CA65] transition-colors cursor-pointer"
          >
            Collections
          </button>
          <span className="text-[#D4AF37]/40">&bull;</span>
          <button
            onClick={() => onNavigateToSection('ai-stylist')}
            className="hover:text-[#E6CA65] transition-colors cursor-pointer"
          >
            AI Decor Assistant
          </button>
          <span className="text-[#D4AF37]/40">&bull;</span>
          {onOpenChatbot && (
            <>
              <button
                onClick={onOpenChatbot}
                className="text-[#D4AF37] hover:text-[#E6CA65] transition-colors cursor-pointer flex items-center gap-1 font-serif"
              >
                <span>AI Chatbot</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </button>
              <span className="text-[#D4AF37]/40">&bull;</span>
            </>
          )}
          <button
            onClick={() => onNavigateToSection('inspiration')}
            className="hover:text-[#E6CA65] transition-colors cursor-pointer"
          >
            Inspiration
          </button>
          <span className="text-[#D4AF37]/40">&bull;</span>
          <button
            onClick={() => onNavigateToSection('categories')}
            className="hover:text-[#E6CA65] transition-colors cursor-pointer"
          >
            Categories
          </button>
          <span className="text-[#D4AF37]/40">&bull;</span>
          <a
            href="mailto:curator@thedecorstudio.in"
            className="hover:text-[#E6CA65] transition-colors cursor-pointer"
          >
            Contact
          </a>
        </div>

        {/* Newsletter & Heritage Studio Statement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
          
          <div className="space-y-2">
            <h4 className="font-serif text-lg text-[#FAF8F5]">The Kolam Chronicle</h4>
            <p className="text-xs text-[#D8C7B5] max-w-md font-light leading-relaxed">
              Receive monthly essays on South Indian architectural heritage, seasonal floral urli pairings, 
              and private releases of our master artisan editions.
            </p>
          </div>

          <div>
            {subscribed ? (
              <div className="p-3 rounded bg-[#290812] border border-[#D4AF37]/40 text-xs text-[#FAF8F5] flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#D4AF37]" />
                <span>You have been enrolled into our private collector circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37]/70" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-9 pr-3 py-2.5 rounded bg-[#24060e] border border-[#D4AF37]/35 text-xs text-[#FAF8F5] placeholder-[#D8C7B5]/40 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded bg-[#FAF8F5] hover:bg-[#EDE4D8] text-[#1f050d] font-serif text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  JOIN
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-8 border-t border-[#D4AF37]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8C7B5]/70">
          <p>
            &copy; {new Date().getFullYear()} The Decor Studio. All rights reserved. Handcrafted across Tamil Nadu, Kerala, and Karnataka.
          </p>

          <p className="flex items-center gap-1.5">
            <span>Made with devotion &bull; Dedicated to Indian craft lineages</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
