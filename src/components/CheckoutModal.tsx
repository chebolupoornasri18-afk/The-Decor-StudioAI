import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Smartphone, Banknote, Sparkle } from 'lucide-react';
import { LotusKolam, KolamCorner } from './kolam/KolamPatterns';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    paymentMethod: 'upi',
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 1999 ? 0 : 250;
  const grandTotal = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `TDS-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      onOrderSuccess();
    }, 1000);
  };

  const handleFinish = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#1f050d] rounded-lg border border-[#D4AF37]/50 shadow-2xl overflow-hidden my-auto text-[#FAF8F5]">
        
        <KolamCorner position="top-left" size={60} opacity={0.5} color="#FFFFFF" className="absolute top-2 left-2 pointer-events-none" />
        <KolamCorner position="bottom-right" size={60} opacity={0.5} color="#FFFFFF" className="absolute bottom-2 right-2 pointer-events-none" />

        {/* Header */}
        <div className="p-6 border-b border-[#D4AF37]/25 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#290812] border border-[#D4AF37]/40 flex items-center justify-center">
              <LotusKolam size={18} color="#D4AF37" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#FAF8F5] font-semibold">
                {orderConfirmed ? 'Order Confirmation' : 'Bespoke Order Checkout'}
              </h3>
              <p className="text-xs text-[#D8C7B5]">
                {orderConfirmed ? 'Thank you for supporting traditional Indian artisans' : 'Secure Pan-India Delivery & Packaging'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#290812] text-[#FAF8F5]/80 hover:text-[#D4AF37] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>
        </div>

        {orderConfirmed ? (
          /* Confirmation Success State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#2b0814] border-2 border-[#D4AF37] mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 size={36} className="text-[#D4AF37]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Blessings & Gratitude
              </span>
              <h4 className="font-serif text-3xl text-[#FAF8F5] font-light">
                Your Heritage Order is Confirmed
              </h4>
              <p className="font-mono text-sm text-[#D4AF37] font-bold">
                Order Reference: #{orderId}
              </p>
              <p className="text-xs text-[#D8C7B5] max-w-md mx-auto leading-relaxed">
                We have received your order for {items.length} artisanal pieces. Our master craftsmen 
                are preparing each piece with auspicious packaging and insured transit.
              </p>
            </div>

            <div className="p-4 rounded bg-[#290812] border border-[#D4AF37]/30 text-xs max-w-md mx-auto text-left space-y-2">
              <div className="flex justify-between text-[#FAF8F5]">
                <span className="text-[#D8C7B5]">Recipient:</span>
                <span className="font-semibold">{formData.fullName || 'Valued Patron'}</span>
              </div>
              <div className="flex justify-between text-[#FAF8F5]">
                <span className="text-[#D8C7B5]">Estimated Delivery:</span>
                <span className="font-semibold">3 – 5 Business Days</span>
              </div>
              <div className="flex justify-between text-[#FAF8F5]">
                <span className="text-[#D8C7B5]">Amount Paid:</span>
                <span className="font-semibold tabular-nums text-[#D4AF37]">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="px-8 py-3 rounded bg-[#FAF8F5] hover:bg-[#EDE4D8] text-[#1f050d] font-serif font-bold text-sm tracking-wider transition-colors shadow-lg cursor-pointer"
            >
              CONTINUE EXPLORING THE STUDIO
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Contact & Shipping Details */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
                <Truck size={14} />
                <span>Shipping Address</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs text-[#D8C7B5] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ananya Sundaram"
                    className="w-full px-3.5 py-2 rounded bg-[#290812] border border-[#D4AF37]/30 text-xs text-[#FAF8F5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#D8C7B5] block mb-1">Phone Number (+91) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="98765 43210"
                    className="w-full px-3.5 py-2 rounded bg-[#290812] border border-[#D4AF37]/30 text-xs text-[#FAF8F5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#D8C7B5] block mb-1">Street Address / Landmark *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Apartment, Street name, Landmark"
                  className="w-full px-3.5 py-2 rounded bg-[#290812] border border-[#D4AF37]/30 text-xs text-[#FAF8F5] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-[#D8C7B5] block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Chennai"
                    className="w-full px-3 py-2 rounded bg-[#290812] border border-[#D4AF37]/30 text-xs text-[#FAF8F5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#D8C7B5] block mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#290812] border border-[#D4AF37]/30 text-xs text-[#FAF8F5] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                  >
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Other">Other States</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#D8C7B5] block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="600028"
                    className="w-full px-3 py-2 rounded bg-[#290812] border border-[#D4AF37]/30 text-xs text-[#FAF8F5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-3 pt-2 border-t border-[#D4AF37]/20">
              <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
                <CreditCard size={14} />
                <span>Payment Method</span>
              </h4>

              <div className="grid grid-cols-3 gap-2.5">
                <label
                  className={`p-3 rounded border flex flex-col items-center gap-1.5 cursor-pointer text-center transition-all ${
                    formData.paymentMethod === 'upi'
                      ? 'bg-[#3b0d1b] border-[#D4AF37] text-[#FAF8F5]'
                      : 'bg-[#290812] border-[#D4AF37]/25 text-[#D8C7B5]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    className="sr-only"
                  />
                  <Smartphone size={18} className="text-[#D4AF37]" />
                  <span className="text-xs font-semibold">UPI / QR</span>
                  <span className="text-[10px] text-[#D8C7B5]/70">GPay, PhonePe</span>
                </label>

                <label
                  className={`p-3 rounded border flex flex-col items-center gap-1.5 cursor-pointer text-center transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'bg-[#3b0d1b] border-[#D4AF37] text-[#FAF8F5]'
                      : 'bg-[#290812] border-[#D4AF37]/25 text-[#D8C7B5]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="sr-only"
                  />
                  <CreditCard size={18} className="text-[#D4AF37]" />
                  <span className="text-xs font-semibold">Cards / NetBanking</span>
                  <span className="text-[10px] text-[#D8C7B5]/70">Visa, Mastercard</span>
                </label>

                <label
                  className={`p-3 rounded border flex flex-col items-center gap-1.5 cursor-pointer text-center transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'bg-[#3b0d1b] border-[#D4AF37] text-[#FAF8F5]'
                      : 'bg-[#290812] border-[#D4AF37]/25 text-[#D8C7B5]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="sr-only"
                  />
                  <Banknote size={18} className="text-[#D4AF37]" />
                  <span className="text-xs font-semibold">Cash on Delivery</span>
                  <span className="text-[10px] text-[#D8C7B5]/70">Verified COD</span>
                </label>
              </div>
            </div>

            {/* Total and Submit */}
            <div className="pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#D8C7B5] block">Total Payable:</span>
                <span className="font-serif text-2xl font-bold text-[#FAF8F5] tabular-nums">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-7 rounded bg-[#FAF8F5] hover:bg-[#EDE4D8] text-[#1f050d] font-serif font-bold text-sm tracking-wider transition-colors shadow-lg cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'AUTHENTICATING ORDER...' : 'PLACE ORDER'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
