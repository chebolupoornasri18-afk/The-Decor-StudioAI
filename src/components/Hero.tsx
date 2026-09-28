import React from 'react';
import { CircularMandalaKolam, KolamCorner, LotusKolam } from './kolam/KolamPatterns';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Sparkle } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onAIClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onAIClick }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#1f050d] py-12 md:py-20 lg:py-24 border-b border-[#D4AF37]/20">
      
      {/* Grand White Kolam extending from the top-right corner as specified */}
      <div className="absolute -top-24 -right-24 md:-top-16 md:-right-16 pointer-events-none select-none z-0">
        <CircularMandalaKolam
          size={520}
          color="#FFFFFF"
          opacity={0.16}
          strokeWidth={1.2}
          className="animate-subtle-float"
        />
      </div>

      {/* Subtle secondary kolam in bottom-left */}
      <div className="absolute -bottom-28 -left-28 pointer-events-none select-none z-0">
        <CircularMandalaKolam
          size={420}
          color="#FFFFFF"
          opacity={0.12}
          strokeWidth={1}
        />
      </div>

      {/* Corner kolam accents */}
      <KolamCorner position="top-left" size={90} opacity={0.35} color="#FFFFFF" className="absolute top-4 left-4" />
      <KolamCorner position="bottom-right" size={90} opacity={0.35} color="#FFFFFF" className="absolute bottom-4 right-4" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Story, Headings & Action CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Brand Kicker / Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded border border-[#D4AF37]/40 bg-[#290812]">
              <LotusKolam size={18} color="#D4AF37" opacity={1} strokeWidth={1.4} />
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                South Indian Heritage · Modern Luxury
              </span>
            </div>

            {/* Main Heading: “Where Every Corner Tells a Story.” */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#FAF8F5] leading-[1.12] tracking-tight">
              Where Every Corner <br />
              <span className="font-normal italic text-[#FAF8F5] underline decoration-[#D4AF37]/50 underline-offset-8">
                Tells a Story.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#E8DFD5] max-w-xl font-body font-light leading-relaxed">
              Discover timeless pieces that bring beauty, warmth and character into your space. 
              Handcrafted bell-metal brass, burnished riverbed pottery, and architectural teakwood 
              curated for contemplative living.
            </p>

            {/* Dual CTAs as requested */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              {/* SHOP THE COLLECTION */}
              <button
                onClick={onShopClick}
                className="px-8 py-3.5 rounded bg-[#FAF8F5] hover:bg-[#EDE4D8] text-[#1f050d] font-serif text-base font-semibold tracking-wider transition-all duration-200 border border-[#D4AF37] shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>SHOP THE COLLECTION</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1 text-[#1f050d]" />
              </button>

              {/* DESIGN MY SPACE WITH AI ✨ */}
              <button
                onClick={onAIClick}
                className="px-7 py-3.5 rounded bg-[#350c18] hover:bg-[#451020] text-[#FAF8F5] font-serif text-base font-medium tracking-wide transition-all duration-200 border border-[#D4AF37]/60 hover:border-[#D4AF37] shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={16} className="text-[#D4AF37]" />
                <span>DESIGN MY SPACE WITH AI ✨</span>
              </button>
            </div>

            {/* Quiet trust markers */}
            <div className="pt-6 border-t border-[#D4AF37]/15 grid grid-cols-3 gap-4 text-[#D8C7B5]">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-semibold text-[#FAF8F5] tabular-nums">100%</p>
                <p className="text-xs tracking-wide text-[#FAF8F5]/70">Master Artisans</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-semibold text-[#FAF8F5] tabular-nums">400+</p>
                <p className="text-xs tracking-wide text-[#FAF8F5]/70">Curated Decor Pieces</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-semibold text-[#FAF8F5] tabular-nums">Pan-India</p>
                <p className="text-xs tracking-wide text-[#FAF8F5]/70">Insured Delivery</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Imagery with Kolam Frames and Room Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative kolam border matting */}
              <div className="absolute -inset-3 rounded-lg border border-[#D4AF37]/35 pointer-events-none" />
              
              {/* Corner Kolams on Image Frame */}
              <KolamCorner position="top-left" size={60} opacity={0.7} color="#FFFFFF" className="absolute -top-3 -left-3 z-20" />
              <KolamCorner position="bottom-right" size={60} opacity={0.7} color="#FFFFFF" className="absolute -bottom-3 -right-3 z-20" />

              {/* Main Room Showcase Image */}
              <div className="relative rounded-md overflow-hidden shadow-2xl border border-[#FAF8F5]/10 bg-[#290812]">
                <img
                  src="/src/assets/images/hero_luxury_indian_room_1790614637897.jpg"
                  alt="Luxurious South Indian living room with antique brass lamps, glazed pottery, carved wood and warm lighting"
                  className="w-full h-[360px] sm:h-[440px] object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle scrim for rich luxury depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f050d] via-transparent to-transparent opacity-60" />

                {/* Floating Architectural Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded bg-[#1f050d]/90 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-sans font-medium">The Living Sanctum</p>
                    <p className="font-serif text-sm text-[#FAF8F5] italic">Nachiarkoil Brass &bull; Teak Console &bull; White Padmam</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#290812] border border-[#D4AF37]/30 text-[11px] text-[#FAF8F5]">
                    <Sparkle size={12} className="text-[#D4AF37]" />
                    <span>AI Curated</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
