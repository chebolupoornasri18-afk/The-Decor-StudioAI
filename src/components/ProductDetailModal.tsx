import React from 'react';
import { Product } from '../types';
import { X, Star, ShoppingBag, Sparkles, Heart, MapPin, Sparkle, ShieldCheck, Ruler, Layers } from 'lucide-react';
import { KolamCorner, LotusKolam } from './kolam/KolamPatterns';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onAddToAIPlan: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToAIPlan,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#1f050d] rounded-lg border border-[#D4AF37]/50 shadow-2xl overflow-hidden my-auto text-[#FAF8F5]">
        
        {/* Kolam Corners */}
        <KolamCorner position="top-left" size={60} opacity={0.6} color="#FFFFFF" className="absolute top-2 left-2 pointer-events-none" />
        <KolamCorner position="bottom-right" size={60} opacity={0.6} color="#FFFFFF" className="absolute bottom-2 right-2 pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#290812] border border-[#D4AF37]/40 text-[#FAF8F5] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Image with Kolam Framing */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-[#D4AF37]/40 bg-[#290812]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#1f050d]/80 backdrop-blur-sm px-2.5 py-1 rounded text-xs text-[#D4AF37] border border-[#D4AF37]/40 flex items-center gap-1.5">
                <LotusKolam size={14} color="#D4AF37" />
                <span>Handcrafted Heritage</span>
              </div>
            </div>

            {/* Stylist Tip Box */}
            <div className="p-3.5 rounded bg-[#2b0814] border border-[#D4AF37]/30 text-xs space-y-1">
              <p className="text-[#D4AF37] font-semibold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Sparkle size={13} />
                <span>Interior Stylist Note</span>
              </p>
              <p className="text-[#D8C7B5] leading-relaxed italic">
                "{product.stylingTip}"
              </p>
            </div>
          </div>

          {/* Right Column: Information, Specs & Actions */}
          <div className="flex flex-col justify-between space-y-5">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
                <MapPin size={13} />
                <span className="tracking-wider uppercase font-semibold">{product.origin}</span>
                <span>&bull;</span>
                <span className="text-emerald-400">In Stock</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-light leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 text-sm text-[#D8C7B5]">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  <Star size={15} fill="#D4AF37" />
                  <span className="font-semibold text-[#FAF8F5] tabular-nums">{product.rating}</span>
                </div>
                <span>&bull;</span>
                <span>{product.reviewCount} collector reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif text-3xl font-bold text-[#FAF8F5] tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#D8C7B5]/60 line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-[#D4AF37] font-sans px-2 py-0.5 rounded bg-[#350c18] border border-[#D4AF37]/30">
                  Taxes Included
                </span>
              </div>

              {/* Craft Story */}
              <p className="text-xs sm:text-sm text-[#E8DFD5] leading-relaxed font-body">
                {product.detailedStory}
              </p>

              {/* Materials & Dimensions Specs */}
              <div className="pt-2 border-t border-[#D4AF37]/20 space-y-2 text-xs text-[#D8C7B5]">
                <div className="flex items-start gap-2">
                  <Layers size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#FAF8F5] font-medium">Materials: </span>
                    {product.materials}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Ruler size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#FAF8F5] font-medium">Dimensions: </span>
                    {product.dimensions}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#FAF8F5] font-medium">Guarantee: </span>
                    Authentic South Indian artisanal certification included.
                  </div>
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className="pt-3 border-t border-[#D4AF37]/25 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="py-3 px-4 rounded bg-[#FAF8F5] hover:bg-[#EDE4D8] text-[#1f050d] font-serif text-sm font-semibold tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag size={16} className="text-[#1f050d]" />
                  <span>ADD TO CART</span>
                </button>

                <button
                  onClick={() => {
                    onAddToAIPlan(product);
                    onClose();
                  }}
                  className="py-3 px-4 rounded bg-[#350c18] hover:bg-[#451020] text-[#FAF8F5] border border-[#D4AF37]/60 hover:border-[#D4AF37] font-serif text-sm font-medium tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={15} className="text-[#D4AF37]" />
                  <span>ADD TO AI PLAN</span>
                </button>
              </div>

              <button
                onClick={() => onToggleWishlist(product)}
                className="w-full py-2 text-xs text-[#D8C7B5] hover:text-[#FAF8F5] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Heart size={14} fill={isWishlisted ? '#D4AF37' : 'none'} className={isWishlisted ? 'text-[#D4AF37]' : ''} />
                <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
