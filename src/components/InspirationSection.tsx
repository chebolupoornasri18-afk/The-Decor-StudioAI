import React, { useState } from 'react';
import { INSPIRATION_STYLES } from '../data/collections';
import { PRODUCTS } from '../data/products';
import { Product, InspirationStyle } from '../types';
import { Sparkles, Palette, CheckCircle2, ArrowRight } from 'lucide-react';
import { KolamBorderDivider, KolamCorner, LotusKolam } from './kolam/KolamPatterns';

interface InspirationSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const InspirationSection: React.FC<InspirationSectionProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedStyleId, setSelectedStyleId] = useState<string>('traditional');

  const activeStyle = INSPIRATION_STYLES.find((s) => s.id === selectedStyleId) || INSPIRATION_STYLES[0];
  const matchedProducts = PRODUCTS.filter((p) => activeStyle.suggestedProductIds.includes(p.id));

  return (
    <section id="inspiration" className="py-20 md:py-24 bg-[#1a040b] border-b border-[#D4AF37]/25 relative">
      
      <KolamBorderDivider opacity={0.35} color="#FFFFFF" className="mb-6" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title as requested */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            Spatial Moodboards
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-light">
            Find Your Decor Story.
          </h2>
          <p className="text-sm text-[#D8C7B5] font-light font-body">
            Choose an aesthetic philosophy to reveal how our master artisans and AI design curate your personal sanctuary.
          </p>
        </div>

        {/* 9 Style Options as requested */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {INSPIRATION_STYLES.map((style) => {
            const isSelected = selectedStyleId === style.id;

            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyleId(style.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-serif tracking-wider transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#FAF8F5] text-[#1f050d] font-bold border-[#D4AF37] shadow-lg scale-105'
                    : 'bg-[#290812] text-[#E8DFD5] border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#350c18]'
                }`}
              >
                {style.name}
              </button>
            );
          })}
        </div>

        {/* Dynamic Story Card for Selected Style */}
        <div className="relative rounded-lg bg-[#24060e] border border-[#D4AF37]/40 p-6 sm:p-10 shadow-2xl overflow-hidden">
          
          <KolamCorner position="top-left" size={70} opacity={0.4} color="#FFFFFF" className="absolute top-2 left-2 pointer-events-none" />
          <KolamCorner position="bottom-right" size={70} opacity={0.4} color="#FFFFFF" className="absolute bottom-2 right-2 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Story Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1b040a] border border-[#D4AF37]/40 text-xs text-[#D4AF37]">
                <Sparkles size={13} />
                <span>AI Storytelling Narrative</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-light">
                {activeStyle.name} Aesthetic
              </h3>

              <p className="font-serif italic text-base text-[#E6CA65]">
                "{activeStyle.tagline}"
              </p>

              <p className="text-sm text-[#D8C7B5] leading-relaxed font-body">
                {activeStyle.description}
              </p>

              <div className="p-4 rounded bg-[#1c040a] border border-[#D4AF37]/20 text-xs space-y-1.5">
                <span className="text-[#D4AF37] uppercase tracking-wider font-semibold block">
                  Curator's Placement Rule:
                </span>
                <p className="text-[#E8DFD5] italic">
                  {activeStyle.heroNote}
                </p>
              </div>

              {/* Key Design Elements */}
              <div className="pt-2 space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#FAF8F5]/80 font-semibold block">
                  Defining Material Elements:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeStyle.keyElements.map((el, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-[#2f0915] border border-[#D4AF37]/30 text-[11px] text-[#FAF8F5]"
                    >
                      {el}
                    </span>
                  ))}
                </div>
              </div>

              {/* Color harmony */}
              <div className="pt-2 space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#FAF8F5]/80 font-semibold block">
                  Harmonious Tones:
                </span>
                <div className="flex items-center gap-3">
                  {activeStyle.colorPalette.map((col, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="text-[11px] text-[#D8C7B5]">{col.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Matched Product Grid */}
            <div className="lg:col-span-6 space-y-4">
              <h4 className="font-serif text-lg text-[#FAF8F5] font-medium flex items-center justify-between">
                <span>Personalized Decor Matches ({matchedProducts.length})</span>
                <span className="text-xs text-[#D4AF37] font-sans">Ready to Collect</span>
              </h4>

              <div className="space-y-3">
                {matchedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="p-3.5 rounded bg-[#FAF8F5] text-[#1f050d] border border-[#D4AF37]/60 flex items-center justify-between gap-4 group hover:-translate-y-0.5 transition-all shadow-md cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded object-cover border border-[#D4AF37]/30 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#9E4738] font-semibold block">
                        {product.categoryId.replace('-', ' & ')}
                      </span>
                      <h5 className="font-serif text-sm font-semibold text-[#1f050d] group-hover:text-[#9E4738] truncate transition-colors">
                        {product.name}
                      </h5>
                      <span className="font-serif text-sm font-bold text-[#1f050d] tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="px-3 py-1.5 rounded bg-[#290812] hover:bg-[#3d0d1c] text-[#FAF8F5] text-xs font-serif font-semibold tracking-wider transition-colors shrink-0"
                    >
                      Collect
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
