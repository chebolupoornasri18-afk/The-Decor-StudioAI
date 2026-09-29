import React, { useState } from 'react';
import { LotusKolam } from './kolam/KolamPatterns';
import { ShoppingBag, Heart, Sparkles, Menu, X, Compass, MessageSquare } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  aiPlanCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAIPlan: () => void;
  onOpenChatbot?: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  aiPlanCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAIPlan,
  onOpenChatbot,
  onNavigateToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Shop Catalog', id: 'catalog' },
    { label: 'Categories', id: 'categories' },
    { label: 'AI Stylist', id: 'ai-stylist' },
    { label: 'Curated Collections', id: 'collections' },
    { label: 'Inspiration', id: 'inspiration' },
  ];

  const handleNavClick = (id: string) => {
    onNavigateToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1f050d]/95 backdrop-blur-md border-b border-[#D4AF37]/20 transition-all duration-200">
      {/* Delicate top kolam hairline */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      {/* Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav) - Zone 3 (Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark with lotus kolam symbol */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none"
            aria-label="The Decor Studio Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-[#2b0814] group-hover:border-[#D4AF37] transition-colors">
              <LotusKolam size={26} color="#FFFFFF" opacity={0.95} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#FAF8F5] uppercase group-hover:text-[#E6CA65] transition-colors">
                The Decor Studio
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/80 font-sans hidden sm:block">
                South Indian Luxury Decor
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-sm font-medium tracking-wide text-[#FAF8F5]/80 hover:text-[#E6CA65] transition-colors relative py-1 focus-visible:outline-none after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Vercel AI Chatbot Button */}
          {onOpenChatbot && (
            <button
              onClick={onOpenChatbot}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-serif font-medium text-[#FAF8F5] bg-[#290812] border border-[#D4AF37]/60 hover:border-[#D4AF37] hover:bg-[#380b19] transition-all whitespace-nowrap cursor-pointer shadow-sm group"
              title="Chat with The Decor Studio AI (the-decor-studio-ai-rlo9.vercel.app)"
            >
              <LotusKolam size={15} color="#D4AF37" className="group-hover:rotate-45 transition-transform duration-300" />
              <span className="hidden sm:inline">AI Chatbot</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>
          )}

          {/* AI Stylist Fast-Track Button */}
          <button
            onClick={() => handleNavClick('ai-stylist')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#FAF8F5] bg-[#3a0d1b] border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-[#4a1224] transition-all whitespace-nowrap cursor-pointer"
            title="Open AI Decor Assistant"
          >
            <Sparkles size={13} className="text-[#D4AF37]" />
            <span>AI Space Stylist</span>
          </button>

          {/* AI Plan Drawer Trigger (if items exist) */}
          {aiPlanCount > 0 && (
            <button
              onClick={onOpenAIPlan}
              className="relative p-2 rounded-md text-[#D4AF37] hover:bg-[#350c18] transition-colors focus-visible:outline-none"
              title="View AI Decor Plan"
              aria-label="View AI Decor Plan"
            >
              <Compass size={20} />
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#1f050d] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {aiPlanCount}
              </span>
            </button>
          )}

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 rounded-md text-[#FAF8F5]/80 hover:text-[#FAF8F5] hover:bg-[#350c18] transition-colors focus-visible:outline-none cursor-pointer"
            aria-label="View Wishlist"
            title="Wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#9E4738] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3 py-2 rounded-md text-[#1f050d] bg-[#FAF8F5] hover:bg-[#EDE4D8] border border-[#D4AF37] transition-all cursor-pointer font-medium text-xs focus-visible:outline-none shadow-sm"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag size={17} className="text-[#1f050d]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-[#290812] text-[#FAF8F5] text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#FAF8F5] hover:text-[#D4AF37] transition-colors focus-visible:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#24060e] border-b border-[#D4AF37]/30 px-6 py-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
            Navigation
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left py-2 text-base font-serif text-[#FAF8F5] hover:text-[#D4AF37] border-b border-[#FAF8F5]/10"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 space-y-2">
            {onOpenChatbot && (
              <button
                onClick={() => {
                  onOpenChatbot();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-[#2b0814] border border-[#D4AF37] text-[#FAF8F5] text-sm font-serif"
              >
                <LotusKolam size={18} color="#D4AF37" />
                <span>Open AI Chatbot (Vercel)</span>
              </button>
            )}
            <button
              onClick={() => handleNavClick('ai-stylist')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-[#FAF8F5] text-[#1f050d] text-sm font-medium"
            >
              <Sparkles size={16} className="text-[#997A23]" />
              <span>Design My Space with AI</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
