import React from 'react';
import { Product } from '../types';
import { X, Trash2, ShoppingBag, Sparkles, Check, ArrowRight } from 'lucide-react';
import { LotusKolam, KolamCorner } from './kolam/KolamPatterns';

interface AIDecorPlanDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  planProducts: Product[];
  onRemoveFromPlan: (productId: string) => void;
  onAddAllToCart: () => void;
  onOpenStylist: () => void;
}

export const AIDecorPlanDrawer: React.FC<AIDecorPlanDrawerProps> = ({
  isOpen,
  onClose,
  planProducts,
  onRemoveFromPlan,
  onAddAllToCart,
  onOpenStylist,
}) => {
  if (!isOpen) return null;

  const totalPlanCost = planProducts.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#1f050d] text-[#FAF8F5] border-l border-[#D4AF37]/40 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          
          <KolamCorner position="top-right" size={60} opacity={0.4} color="#FFFFFF" className="absolute top-2 right-2 pointer-events-none" />

          {/* Header */}
          <div className="p-6 border-b border-[#D4AF37]/25 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#290812] border border-[#D4AF37]/40 flex items-center justify-center">
                <Sparkles size={18} className="text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#FAF8F5] font-semibold">My AI Decor Plan</h3>
                <p className="text-xs text-[#D8C7B5]">
                  Personal interior capsule ({planProducts.length} items)
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#290812] text-[#FAF8F5]/80 hover:text-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Close AI plan"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {planProducts.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <LotusKolam size={54} color="#D4AF37" className="mx-auto opacity-50" />
                <h4 className="font-serif text-xl text-[#FAF8F5]">No Items in AI Plan</h4>
                <p className="text-xs text-[#D8C7B5] max-w-xs mx-auto font-light leading-relaxed">
                  Browse products and click "Add to AI Decor Plan" on any card, or let our AI Stylist generate an entire room ensemble.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenStylist();
                  }}
                  className="px-5 py-2.5 rounded bg-[#FAF8F5] text-[#1f050d] font-serif text-xs font-semibold tracking-wider hover:bg-[#EDE4D8] transition-colors cursor-pointer"
                >
                  OPEN AI STYLIST
                </button>
              </div>
            ) : (
              planProducts.map((product) => (
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
                    <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] block">
                      {product.categoryId}
                    </span>
                    <h5 className="font-serif text-sm font-semibold text-[#FAF8F5] truncate">
                      {product.name}
                    </h5>
                    <span className="font-serif text-sm font-bold text-[#FAF8F5] tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => onRemoveFromPlan(product.id)}
                    className="p-1.5 text-[#9E4738] hover:text-rose-400 transition-colors"
                    title="Remove from plan"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {planProducts.length > 0 && (
            <div className="p-6 bg-[#260710] border-t border-[#D4AF37]/30 space-y-3.5">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[#D8C7B5] uppercase tracking-wider">Estimated Ensemble Cost:</span>
                <span className="font-serif text-2xl font-bold text-[#FAF8F5] tabular-nums">
                  ₹{totalPlanCost.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={() => {
                  onAddAllToCart();
                  onClose();
                }}
                className="w-full py-3.5 px-4 rounded bg-[#FAF8F5] hover:bg-[#EDE4D8] text-[#1f050d] font-serif font-bold text-sm tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={16} className="text-[#1f050d]" />
                <span>TRANSFER ALL TO SHOPPING BAG</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenStylist();
                }}
                className="w-full py-2.5 text-xs text-[#D4AF37] hover:text-[#E6CA65] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles size={13} />
                <span>Refine Ensemble with AI Stylist</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
