import React from 'react';
import { CATEGORIES } from '../data/products';
import { CategoryId } from '../types';
import { KolamBorderDivider, KolamCorner, LotusKolam } from './kolam/KolamPatterns';
import {
  Flame,
  Flower2,
  Frame,
  Sparkles,
  Leaf,
  Trees,
  Compass,
  Sparkle,
  Gift,
  Boxes,
} from 'lucide-react';

interface ShopCategoriesProps {
  selectedCategoryId: CategoryId | 'all';
  onSelectCategory: (id: CategoryId | 'all') => void;
}

export const ShopCategories: React.FC<ShopCategoriesProps> = ({
  selectedCategoryId,
  onSelectCategory,
}) => {
  // Map category icons
  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'vases-pottery':
        return <Boxes size={22} className="text-[#D4AF37]" />;
      case 'lamps-lighting':
        return <Flame size={22} className="text-[#D4AF37]" />;
      case 'floral-decor':
        return <Flower2 size={22} className="text-[#D4AF37]" />;
      case 'wall-art':
        return <Frame size={22} className="text-[#D4AF37]" />;
      case 'candles':
        return <Sparkles size={22} className="text-[#D4AF37]" />;
      case 'plants-planters':
        return <Leaf size={22} className="text-[#D4AF37]" />;
      case 'wooden-crafts':
        return <Trees size={22} className="text-[#D4AF37]" />;
      case 'traditional-decor':
        return <Compass size={22} className="text-[#D4AF37]" />;
      case 'table-decor':
        return <Sparkle size={22} className="text-[#D4AF37]" />;
      case 'gift-decor':
        return <Gift size={22} className="text-[#D4AF37]" />;
      default:
        return <LotusKolam size={22} color="#D4AF37" />;
    }
  };

  return (
    <section id="categories" className="relative py-16 md:py-20 bg-[#1a040b] border-b border-[#D4AF37]/20">
      
      {/* Kolam Divider at Top */}
      <KolamBorderDivider opacity={0.35} color="#FFFFFF" className="mb-4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2">
            Curated Expressions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-light">
            Shop by Category
          </h2>
          <p className="mt-3 text-sm text-[#D8C7B5] font-light">
            Each category honors the artisanal metallurgy, woodworking, and ceramic lineages of South India.
          </p>

          {/* Quick "Show All" toggle button */}
          <div className="mt-5 flex justify-center">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all cursor-pointer ${
                selectedCategoryId === 'all'
                  ? 'bg-[#FAF8F5] text-[#1f050d] font-semibold shadow-md'
                  : 'bg-[#290812] text-[#E8DFD5] border border-[#D4AF37]/30 hover:border-[#D4AF37]'
              }`}
            >
              All Categories (160+ items)
            </button>
          </div>
        </div>

        {/* 10 Category Cards Grid with Dark Maroon Backgrounds & White Kolam Borders */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategoryId === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`group relative text-left p-5 rounded transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'bg-[#3b0d1b] border-2 border-[#D4AF37] shadow-xl transform -translate-y-1'
                    : 'bg-[#260710] hover:bg-[#320a17] border border-[#FFFFFF]/25 hover:border-[#D4AF37]/70 hover:-translate-y-0.5'
                }`}
              >
                {/* White Kolam decorative corner inside each card */}
                <KolamCorner
                  position="top-right"
                  size={42}
                  opacity={isSelected ? 0.8 : 0.4}
                  color="#FFFFFF"
                  className="absolute top-1 right-1"
                />

                {/* Subtle Kolam watermark behind card */}
                <div className="absolute -bottom-6 -right-6 pointer-events-none select-none opacity-10 group-hover:opacity-20 transition-opacity">
                  <LotusKolam size={90} color="#FFFFFF" />
                </div>

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded border border-[#D4AF37]/40 bg-[#1f050d] flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                      {getCategoryIcon(category.id)}
                    </div>
                    <span className="text-[11px] font-sans text-[#D4AF37]/90 font-medium">
                      {category.count} items
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg text-[#FAF8F5] group-hover:text-[#E6CA65] transition-colors font-medium">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#D8C7B5]/80 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-4 mt-2 border-t border-[#FFFFFF]/10 flex items-center justify-between text-[11px] text-[#FAF8F5]/70">
                  <span className="italic">{category.highlightTag}</span>
                  <span className="text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
