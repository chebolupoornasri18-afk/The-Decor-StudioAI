import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { LotusKolam, KolamCorner } from './kolam/KolamPatterns';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 1999;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 250;
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'KOLAM15') {
      setAppliedDiscount(15);
      setCouponError(null);
    } else if (code === 'STUDIO10') {
      setAppliedDiscount(10);
      setCouponError(null);
    } else {
      setCouponError('Invalid code. Try "KOLAM15" for 15% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#1f050d] text-[#FAF8F5] border-l border-[#D4AF37]/40 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          
          <KolamCorner position="top-right" size={60} opacity={0.4} color="#FFFFFF" className="absolute top-2 right-2 pointer-events-none" />

          {/* Header */}
          <div className="p-6 border-b border-[#D4AF37]/25 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#290812] border border-[#D4AF37]/40 flex items-center justify-center">
                <LotusKolam size={18} color="#D4AF37" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#FAF8F5] font-semibold">Your Shopping Bag</h3>
                <p className="text-xs text-[#D8C7B5]/80 font-mono tabular-nums">
                  {items.reduce((acc, i) => acc + i.quantity, 0)} handcrafted pieces
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#290812] text-[#FAF8F5]/80 hover:text-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-6 py-3 bg-[#260710] border-b border-[#D4AF37]/20 text-xs space-y-1.5">
            <div className="flex justify-between text-[#D8C7B5]">
              <span>{isFreeShipping ? '✨ Free Pan-India Delivery Unlocked' : `Add ₹${(freeShippingThreshold - subtotal).toLocaleString('en-IN')} for Free Shipping`}</span>
              <span className="text-[#D4AF37] font-semibold">{isFreeShipping ? 'FREE' : '₹250'}</span>
            </div>
            <div className="w-full bg-[#160308] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#D4AF37] to-[#E6CA65] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <LotusKolam size={54} color="#D4AF37" className="mx-auto opacity-50" />
                <h4 className="font-serif text-xl text-[#FAF8F5]">Your Bag is Empty</h4>
                <p className="text-xs text-[#D8C7B5] max-w-xs mx-auto font-light">
                  Explore our curated South Indian brass lamps, lotus urlis, and temple jharokha wall panels.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded bg-[#FAF8F5] text-[#1f050d] font-serif text-xs font-semibold tracking-wider hover:bg-[#EDE4D8] transition-colors cursor-pointer"
                >
                  DISCOVER COLLECTION
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded bg-[#290812] border border-[#D4AF37]/30 flex items-center gap-3.5"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded object-cover border border-[#D4AF37]/30 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif text-sm font-semibold text-[#FAF8F5] truncate">
                      {item.product.name}
                    </h5>
                    <p className="text-[11px] text-[#D8C7B5]/80 font-mono tabular-nums">
                      ₹{item.product.price.toLocaleString('en-IN')} each
                    </p>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2.5 mt-2">
                      <div className="flex items-center border border-[#D4AF37]/40 rounded bg-[#1f050d]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#FAF8F5]/80 hover:text-white"
                          title="Decrease"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-mono font-semibold text-[#FAF8F5] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#FAF8F5]/80 hover:text-white"
                          title="Increase"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#9E4738] hover:text-rose-400 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-serif text-base font-bold text-[#FAF8F5] tabular-nums">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Module */}
          {items.length > 0 && (
            <div className="p-6 bg-[#260710] border-t border-[#D4AF37]/30 space-y-4">
              
              {/* Coupon Code Input */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo code (e.g. KOLAM15)"
                      className="w-full pl-8 pr-3 py-1.5 rounded bg-[#1c040a] border border-[#D4AF37]/30 text-xs text-[#FAF8F5] uppercase placeholder-[#D8C7B5]/40 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <button
                    onClick={applyCoupon}
                    className="px-3.5 py-1.5 rounded bg-[#350c18] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-xs font-serif text-[#FAF8F5] cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount > 0 && (
                  <p className="text-[11px] text-emerald-400 font-sans">
                    ✓ {appliedDiscount}% Kolam discount applied!
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-300 font-sans">{couponError}</p>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-[#D8C7B5] pt-2 border-t border-[#D4AF37]/15">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#FAF8F5]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span className="font-mono tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Shipping</span>
                  <span className="font-mono tabular-nums text-[#FAF8F5]">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#FAF8F5] pt-2 border-t border-[#D4AF37]/20">
                  <span>Total</span>
                  <span className="tabular-nums text-[#FAF8F5]">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded bg-[#FAF8F5] hover:bg-[#EDE4D8] text-[#1f050d] font-serif font-bold text-sm tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight size={16} className="text-[#1f050d]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#D8C7B5]/70">
                <ShieldCheck size={14} className="text-[#D4AF37]" />
                <span>Pan-India Safe Transit & Authentic Craft Guarantee</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
