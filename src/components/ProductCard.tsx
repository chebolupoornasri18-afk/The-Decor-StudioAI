import React from 'react';
import { Product } from '../types';
import { Heart, ShoppingBag, Sparkles, Star, Eye } from 'lucide-react';
import { LotusKolam } from './kolam/KolamPatterns';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddToAIPlan: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onAddToAIPlan,
  onQuickView,
}) => {
  return (
    <div className="group relative rounded-md bg-[#FAF8F5] text-[#1f050d] border border-[#D4AF37]/50 hover:border-[#D4AF37] shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1">
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE1D5]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle dark maroon scrim overlay on hover */}
        <div className="absolute inset-0 bg-[#1f050d]/20 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Wishlist Button in Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
            isWishlisted
              ? 'bg-[#9E4738] text-white'
              : 'bg-white/80 hover:bg-white text-[#290812]'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded bg-[#1f050d]/90 hover:bg-[#1f050d] text-[#FAF8F5] text-xs font-serif opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap"
        >
          <Eye size={13} className="text-[#D4AF37]" />
          <span>Quick View</span>
        </button>

        {/* Bestseller / Artisan Badge (clean text metadata, not pill slop) */}
        {product.isBestseller && (
          <div className="absolute top-2.5 left-2.5 bg-[#290812] text-[#D4AF37] text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded border border-[#D4AF37]/40">
            Heirloom Choice
          </div>
        )}
      </div>

      {/* Card Body - Crisp Ivory Surface */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#FAF8F5]">
        
        <div className="space-y-1.5">
          {/* Rating and Origin - quiet unboxed text */}
          <div className="flex items-center justify-between text-xs text-[#6B5A52]">
            <div className="flex items-center gap-1 font-medium">
              <Star size={13} className="text-[#D4AF37] fill-[#D4AF37]" />
              <span className="tabular-nums font-semibold text-[#1f050d]">{product.rating}</span>
              <span className="text-[#8C7A70]">({product.reviewCount})</span>
            </div>
            <span className="truncate max-w-[120px] text-[11px] uppercase tracking-wider text-[#8C7A70]">
              {product.origin.split(',')[0]}
            </span>
          </div>

          {/* Product Name */}
          <h4
            onClick={() => onQuickView(product)}
            className="font-serif text-lg font-semibold text-[#1f050d] hover:text-[#9E4738] transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h4>

          {/* Description */}
          <p className="text-xs text-[#52443E] line-clamp-2 leading-relaxed font-body">
            {product.description}
          </p>
        </div>

        {/* Price Row */}
        <div className="pt-2 border-t border-[#E8DFD5] flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-bold text-[#1f050d] tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#8C7A70] line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-[11px] text-emerald-800 font-medium">
            Ready to Dispatch
          </span>
        </div>

        {/* Dual Actions: Add to Cart & Add to AI Decor Plan as requested */}
        <div className="pt-2 flex flex-col gap-2">
          {/* Add to Cart */}
          <button
            onClick={() => onAddToCart(product)}
            className="w-full py-2.5 px-3 rounded bg-[#290812] hover:bg-[#3d0d1c] text-[#FAF8F5] text-xs font-serif font-semibold tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <ShoppingBag size={14} className="text-[#D4AF37]" />
            <span>ADD TO CART</span>
          </button>

          {/* Add to AI Decor Plan */}
          <button
            onClick={() => onAddToAIPlan(product)}
            className="w-full py-2 px-3 rounded bg-transparent hover:bg-[#FAF0E6] text-[#290812] border border-[#290812]/30 hover:border-[#290812] text-xs font-serif font-medium tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles size={13} className="text-[#997A23]" />
            <span>Add to AI Decor Plan</span>
          </button>
        </div>

      </div>

    </div>
  );
};
