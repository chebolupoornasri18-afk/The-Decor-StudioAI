import React, { useState } from 'react';
import { CURATED_COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';
import { Product, CuratedCollection } from '../types';
import { KolamBorderDivider, KolamCorner, LotusKolam } from './kolam/KolamPatterns';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

interface CuratedCollectionsSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const CuratedCollectionsSection: React.FC<CuratedCollectionsSectionProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>(CURATED_COLLECTIONS[0].id);

  const activeCollection = CURATED_COLLECTIONS.find((c) => c.id === selectedCollectionId) || CURATED_COLLECTIONS[0];
  const collectionProducts = PRODUCTS.filter((p) => activeCollection.productIds.includes(p.id));

  return (
    <section id="collections" className="py-20 md:py-24 bg-[#1f050d] relative overflow-hidden border-b border-[#D4AF37]/25">
      
      {/* Kolam Divider at Top */}
      <KolamBorderDivider opacity={0.35} color="#FFFFFF" className="mb-6" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header as requested */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            Bespoke Capsules
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-light">
            Curated by AI. Inspired by Tradition.
          </h2>
          <p className="text-sm text-[#D8C7B5] font-light font-body">
            Five signature styling palettes harmonizing South Indian heritage art with modern spatial proportion.
          </p>
        </div>

        {/* 5 Collections Selector with White Kolam-inspired Borders */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {CURATED_COLLECTIONS.map((col) => {
            const isSelected = selectedCollectionId === col.id;

            return (
              <button
                key={col.id}
                onClick={() => setSelectedCollectionId(col.id)}
                className={`group relative p-4 rounded text-left transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                  isSelected
                    ? 'bg-[#350c18] border-[#D4AF37] shadow-lg scale-[1.02]'
                    : 'bg-[#24060e] border-[#FAF8F5]/20 hover:border-[#D4AF37]/60 hover:bg-[#2b0813]'
                }`}
              >
                {/* Subtle Kolam corner for selected */}
                {isSelected && (
                  <KolamCorner position="top-right" size={32} opacity={0.8} color="#FFFFFF" className="absolute top-1 right-1" />
                )}

                <div className="space-y-1">
                  <h3 className="font-serif text-base font-semibold text-[#FAF8F5] group-hover:text-[#E6CA65] transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-[11px] text-[#D8C7B5]/80 line-clamp-2">
                    {col.subtitle}
                  </p>
                </div>

                {/* Color swatches */}
                <div className="flex items-center gap-1 mt-3 pt-2 border-t border-[#FAF8F5]/10">
                  {col.palette.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Collection Spotlight with White Kolam border */}
        <div className="relative rounded-lg bg-[#260710] border-2 border-[#D4AF37]/40 p-6 sm:p-8 shadow-2xl overflow-hidden">
          
          {/* Decorative Kolam Corners on the spotlight card */}
          <KolamCorner position="top-left" size={70} opacity={0.5} color="#FFFFFF" className="absolute top-2 left-2 pointer-events-none" />
          <KolamCorner position="bottom-right" size={70} opacity={0.5} color="#FFFFFF" className="absolute bottom-2 right-2 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left description */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#1f050d] border border-[#D4AF37]/40 text-xs text-[#D4AF37]">
                <LotusKolam size={14} color="#D4AF37" />
                <span>Featured Capsule</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-light">
                {activeCollection.name}
              </h3>

              <p className="text-sm text-[#E8DFD5] leading-relaxed font-body">
                {activeCollection.description}
              </p>

              <div className="space-y-1.5 pt-2">
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                  Harmonizing Palette:
                </span>
                <div className="flex items-center gap-2">
                  {activeCollection.palette.map((color, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div
                        className="w-5 h-5 rounded-full border border-white/30 shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-[10px] text-[#D8C7B5] font-mono">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Products Showcase in this collection */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {collectionProducts.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="p-3.5 rounded bg-[#FAF8F5] text-[#1f050d] border border-[#D4AF37]/50 flex items-center justify-between gap-3 group hover:-translate-y-0.5 transition-all shadow-md cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded object-cover border border-[#D4AF37]/30 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-semibold text-[#1f050d] group-hover:text-[#9E4738] truncate transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#6B5A52] truncate">
                        {product.materials.split(',')[0]}
                      </p>
                      <span className="font-serif text-sm font-bold text-[#1f050d] tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="p-2 rounded bg-[#290812] hover:bg-[#3d0d1c] text-[#FAF8F5] transition-colors shrink-0"
                      title="Quick Add"
                      aria-label="Add to cart"
                    >
                      <ArrowRight size={14} className="text-[#D4AF37]" />
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
