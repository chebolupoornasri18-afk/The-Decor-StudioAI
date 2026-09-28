import React from 'react';
import { Product } from '../types';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { LotusKolam, KolamCorner } from './kolam/KolamPatterns';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#1f050d] text-[#FAF8F5] border-l border-[#D4AF37]/40 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          
          <KolamCorner position="top-right" size={60} opacity={0.4} color="#FFFFFF" className="absolute top-2 right-2 pointer-events-none" />

          {/* Header */}
          <div className="p-6 border-b border-[#D4AF37]/25 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#290812] border border-[#D4AF37]/40 flex items-center justify-center">
                <Heart size={18} className="text-[#D4AF37]" fill="#D4AF37" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#FAF8F5] font-semibold">Your Wishlist</h3>
                <p className="text-xs text-[#D8C7B5]">
                  Saved treasures ({wishlistProducts.length})
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#290812] text-[#FAF8F5]/80 hover:text-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <LotusKolam size={54} color="#D4AF37" className="mx-auto opacity-50" />
                <h4 className="font-serif text-xl text-[#FAF8F5]">Wishlist is Empty</h4>
                <p className="text-xs text-[#D8C7B5] max-w-xs mx-auto font-light leading-relaxed">
                  Click the heart icon on any piece to save your favorite South Indian brassware, pottery, or wall art.
                </p>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3.5 rounded bg-[#290812] border border-[#D4AF37]/30 flex items-center justify-between gap-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded object-cover border border-[#D4AF37]/30 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif text-sm font-semibold text-[#FAF8F5] truncate">
                      {product.name}
                    </h5>
                    <span className="font-serif text-sm font-bold text-[#FAF8F5] tabular-nums block">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onMoveToCart(product)}
                      className="px-2.5 py-1.5 rounded bg-[#FAF8F5] text-[#1f050d] text-xs font-serif font-semibold hover:bg-[#EDE4D8] transition-colors flex items-center gap-1"
                      title="Move to Bag"
                    >
                      <ShoppingBag size={12} />
                      <span>Add</span>
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="p-1.5 text-[#9E4738] hover:text-rose-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
