import React, { useState } from 'react';
import { AIPlanResponse, AIPlanItem, Product } from '../types';
import { PRODUCTS } from '../data/products';
import {
  Sparkles,
  CheckCircle2,
  Sliders,
  RotateCcw,
  ShoppingBag,
  ArrowRight,
  Palette,
  Home,
  IndianRupee,
  Layers,
  Wand2,
  Send,
  HelpCircle,
} from 'lucide-react';
import { KolamBorderDivider, KolamCorner, LotusKolam } from './kolam/KolamPatterns';

interface AIDecorAssistantProps {
  onAddMultipleToCart: (products: Product[]) => void;
  onOpenCart: () => void;
}

const ROOM_OPTIONS = [
  { id: 'Living Room', label: 'Living Room', icon: '🛋️' },
  { id: 'Master Bedroom', label: 'Master Bedroom', icon: '🛏️' },
  { id: 'Pooja Sanctuary', label: 'Pooja & Mandir', icon: '🪔' },
  { id: 'Entrance Foyer', label: 'Entrance Foyer', icon: '🚪' },
  { id: 'Dining & Console', label: 'Dining & Console', icon: '🍽️' },
  { id: 'Balcony & Reading Nook', label: 'Balcony / Nook', icon: '🌿' },
];

const AESTHETIC_OPTIONS = [
  { id: 'Traditional South Indian', label: 'Traditional South Indian', desc: 'Temple brass, marigold accents & heritage' },
  { id: 'Royal Maroon & Gold', label: 'Royal Maroon & Gold', desc: 'Opulent palace tones & gilded reflections' },
  { id: 'Earth & Clay Earthen', label: 'Earth & Clay', desc: 'Terracotta, unvarnished teak & raw tranquility' },
  { id: 'Soft Serenity', label: 'Soft Serenity', desc: 'Floating lotuses, chalk ivory & sandalwood' },
  { id: 'Modern Indian Luxury', label: 'Modern Tradition', desc: 'Clean architectural lines with statement brass' },
];

const BUDGET_PRESETS = [
  { label: '₹3,500', value: 3500 },
  { label: '₹5,000', value: 5000 },
  { label: '₹8,500', value: 8500 },
  { label: '₹12,000', value: 12000 },
  { label: '₹20,000', value: 20000 },
];

const STEPS = [
  { id: 'understand', label: 'Understand' },
  { id: 'plan', label: 'Plan' },
  { id: 'search', label: 'Search' },
  { id: 'match', label: 'Match' },
  { id: 'compare', label: 'Compare' },
  { id: 'recommend', label: 'Recommend' },
  { id: 'adjust', label: 'Adjust' },
];

export const AIDecorAssistant: React.FC<AIDecorAssistantProps> = ({
  onAddMultipleToCart,
  onOpenCart,
}) => {
  const [roomType, setRoomType] = useState('Master Bedroom');
  const [aesthetic, setAesthetic] = useState('Traditional South Indian');
  const [budget, setBudget] = useState(5000);
  const [customNote, setCustomNote] = useState('');
  
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Result state
  const [result, setResult] = useState<AIPlanResponse | null>({
    collectionTitle: 'Your Traditional Bedroom Collection',
    aestheticSummary: 'A restful sanctuary uniting auspicious Nachiarkoil brass, floating lotus calm, and fragrant sandalwood aromatics scaled precisely for your bedroom.',
    designPhilosophy: 'Anchor the bedside console with gentle amber lantern light, diffuse natural Mysore sandalwood, and place floating white water blossoms for serene morning contemplation.',
    items: [
      {
        productId: 'ceramic-lotus-urli',
        name: 'Padmam Glazed Lotus Urli Bowl',
        category: 'Floral Decor',
        price: 2199,
        reason: 'Provides a tranquil water element with floating petals on your bedside table or dresser.',
        roomPlacement: 'Bedroom dresser or side console.',
        image: '/src/assets/images/product_ceramic_urli_lotus_1790614669744.jpg',
      },
      {
        productId: 'mysore-sandalwood-candle',
        name: 'Mysore Sandal & Vetiver Brass Candle',
        category: 'Candles',
        price: 899,
        reason: 'Natural sandalwood aromatics calm the mind and create gentle 45-hour evening warmth.',
        roomPlacement: 'Nightstand or reading alcove.',
        image: '/src/assets/images/product_ceramic_urli_lotus_1790614669744.jpg',
      },
      {
        productId: 'ceramic-fluted-bud-vase',
        name: 'Malabar Ivory Fluted Bud Vase',
        category: 'Vases & Pottery',
        price: 999,
        reason: 'Slender matte ivory form for solitary night-blooming jasmine or tuberose stems.',
        roomPlacement: 'Bedside pedestal shelf.',
        image: '/src/assets/images/hero_luxury_indian_room_1790614637897.jpg',
      },
    ],
    totalCost: 4097,
    budgetStatus: 'Looks beautiful and stays within your budget with ₹903 remaining.',
    stylingAdvice: 'Keep bedside lighting warm (2400K-2700K). Float 2-3 fresh jasmine flowers in the urli each evening for a soothing sensory ritual.',
    colorHarmony: [
      { name: 'Palace Maroon', hex: '#290812' },
      { name: 'Temple Antique Brass', hex: '#D4AF37' },
      { name: 'Chalk Ivory', hex: '#FAF8F5' },
      { name: 'Sandal Beige', hex: '#EAE1D5' },
    ],
    suggestedAlternative: 'You can swap the bud vase for our Athangudi Diya Tier (₹799) if you prefer terracotta warmth over glazed ivory.',
  });

  const generateDecorPlan = async (isAdjustment = false) => {
    setIsLoading(true);
    setErrorMsg(null);

    // Simulate stepping through the workflow phases
    let step = 0;
    const interval = setInterval(() => {
      step = Math.min(step + 1, 5);
      setActiveStepIndex(step);
    }, 380);

    try {
      const response = await fetch('/api/ai-decor-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomType,
          aesthetic,
          budget,
          specificPreferences: customNote,
        }),
      });

      if (!response.ok) {
        throw new Error('Stylist service temporarily busy');
      }

      const data = await response.json();
      
      // Match each returned item with product images from catalog
      if (data && data.items) {
        data.items = data.items.map((planItem: AIPlanItem) => {
          const match = PRODUCTS.find((p) => p.id === planItem.productId || p.name.toLowerCase() === planItem.name.toLowerCase());
          return {
            ...planItem,
            image: match?.image || planItem.image || '/src/assets/images/hero_luxury_indian_room_1790614637897.jpg',
          };
        });
      }

      clearInterval(interval);
      setActiveStepIndex(6); // 'Adjust' step
      setResult(data);
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setErrorMsg('Could not reach stylist service. Restoring our recommended heritage harmony.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAllToCart = () => {
    if (!result) return;
    const productsToAdd: Product[] = [];
    result.items.forEach((item) => {
      const match = PRODUCTS.find((p) => p.id === item.productId || p.name === item.name);
      if (match) {
        productsToAdd.push(match);
      }
    });

    if (productsToAdd.length > 0) {
      onAddMultipleToCart(productsToAdd);
      onOpenCart();
    }
  };

  return (
    <section id="ai-stylist" className="py-20 md:py-24 bg-[#180309] border-t border-b border-[#D4AF37]/25 relative overflow-hidden">
      
      {/* Background Kolam Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-5">
        <LotusKolam size={800} color="#FFFFFF" />
      </div>

      <KolamCorner position="top-left" size={100} opacity={0.3} color="#FFFFFF" className="absolute top-4 left-4" />
      <KolamCorner position="bottom-right" size={100} opacity={0.3} color="#FFFFFF" className="absolute bottom-4 right-4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header as requested */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#290812] border border-[#D4AF37]/40 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            <Sparkles size={13} />
            <span>Intelligent Spatial Styling</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF8F5] font-light">
            Let AI Style Your Space.
          </h2>

          <p className="text-sm sm:text-base text-[#E8DFD5] font-light font-body max-w-2xl mx-auto leading-relaxed">
            Tell us your space, your aesthetic and your budget. We’ll curate an authentic decor collection made for you.
          </p>

          {/* Workflow Sequence Indicator: Understand -> Plan -> Search -> Match -> Compare -> Recommend -> Adjust */}
          <div className="pt-6 overflow-x-auto pb-2 scrollbar-none">
            <div className="inline-flex items-center gap-1 sm:gap-2 px-4 py-2 rounded-full bg-[#24060e] border border-[#D4AF37]/30 text-xs">
              {STEPS.map((step, idx) => (
                <React.Fragment key={step.id}>
                  <div
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
                      idx === activeStepIndex
                        ? 'bg-[#D4AF37] text-[#1f050d] font-bold shadow-sm'
                        : idx < activeStepIndex
                        ? 'text-[#FAF8F5] bg-[#3a0d1b]'
                        : 'text-[#FAF8F5]/40'
                    }`}
                  >
                    {idx < activeStepIndex && <CheckCircle2 size={11} className="text-[#D4AF37]" />}
                    <span>{step.label}</span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <span className="text-[#D4AF37]/40 font-mono text-[10px]">&rarr;</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Input Matrix (5 cols) */}
          <div className="lg:col-span-5 bg-[#24060e] p-6 sm:p-7 rounded-lg border border-[#D4AF37]/40 shadow-2xl space-y-6">
            
            <div className="border-b border-[#D4AF37]/20 pb-4 flex items-center justify-between">
              <h3 className="font-serif text-xl text-[#FAF8F5] font-medium flex items-center gap-2">
                <Sliders size={18} className="text-[#D4AF37]" />
                <span>Your Space & Budget</span>
              </h3>
              <span className="text-[11px] text-[#D4AF37]/80 uppercase tracking-wider font-semibold">
                Bespoke Plan
              </span>
            </div>

            {/* 1. Choose Room */}
            <div className="space-y-2.5">
              <label className="text-xs uppercase tracking-wider text-[#FAF8F5]/80 font-medium block">
                1. Select Room / Sanctum
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ROOM_OPTIONS.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setRoomType(room.id)}
                    className={`p-2.5 rounded text-left text-xs transition-all flex items-center gap-2 cursor-pointer border ${
                      roomType === room.id
                        ? 'bg-[#3b0d1b] border-[#D4AF37] text-[#FAF8F5] font-semibold shadow-sm'
                        : 'bg-[#1b040a] border-[#FAF8F5]/10 text-[#D8C7B5] hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <span>{room.icon}</span>
                    <span className="truncate">{room.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Choose Aesthetic */}
            <div className="space-y-2.5">
              <label className="text-xs uppercase tracking-wider text-[#FAF8F5]/80 font-medium block">
                2. Select Aesthetic Mood
              </label>
              <div className="space-y-1.5">
                {AESTHETIC_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAesthetic(item.id)}
                    className={`w-full p-2.5 rounded text-left text-xs transition-all flex flex-col cursor-pointer border ${
                      aesthetic === item.id
                        ? 'bg-[#3b0d1b] border-[#D4AF37] text-[#FAF8F5] font-medium'
                        : 'bg-[#1b040a] border-[#FAF8F5]/10 text-[#D8C7B5] hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <span className="font-semibold text-[#FAF8F5]">{item.label}</span>
                    <span className="text-[11px] text-[#D8C7B5]/70">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Budget in ₹ */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#FAF8F5]/80">
                <label className="uppercase tracking-wider font-medium">
                  3. Decor Budget
                </label>
                <span className="font-serif text-lg font-bold text-[#D4AF37] tabular-nums">
                  ₹{budget.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="2500"
                max="25000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />

              {/* Presets */}
              <div className="flex items-center gap-1.5 justify-between">
                {BUDGET_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setBudget(p.value)}
                    className={`px-2.5 py-1 rounded text-[11px] font-sans transition-colors cursor-pointer border ${
                      budget === p.value
                        ? 'bg-[#D4AF37] text-[#1f050d] font-bold border-[#D4AF37]'
                        : 'bg-[#1b040a] text-[#FAF8F5]/70 border-[#FAF8F5]/10 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Custom Notes / Preferences */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#FAF8F5]/80 font-medium block">
                4. Specific Wishes (Optional)
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Include fragrant candles, avoid heavy wall hanging"
                className="w-full px-3.5 py-2 rounded bg-[#1b040a] border border-[#D4AF37]/40 text-xs text-[#FAF8F5] placeholder-[#D8C7B5]/40 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Primary Generate Button */}
            <button
              onClick={() => generateDecorPlan(false)}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded bg-[#FAF8F5] hover:bg-[#EDE4D8] text-[#1f050d] font-serif font-semibold text-sm tracking-wider transition-all duration-200 border border-[#D4AF37] shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <LotusKolam size={18} color="#1f050d" className="animate-spin" />
                  <span>AI IS STYLING YOUR SPACE...</span>
                </>
              ) : (
                <>
                  <Wand2 size={16} className="text-[#1f050d]" />
                  <span>GENERATE DECOR PLAN</span>
                </>
              )}
            </button>

            {errorMsg && (
              <p className="text-xs text-rose-300 text-center italic">{errorMsg}</p>
            )}

          </div>

          {/* Right Column: AI Output Display (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {result ? (
              <div className="bg-[#24060e] p-6 sm:p-8 rounded-lg border border-[#D4AF37]/50 shadow-2xl relative space-y-6">
                
                {/* Header of the AI Plan */}
                <div className="border-b border-[#D4AF37]/25 pb-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
                      <Sparkles size={13} />
                      <span>AI Bespoke Recommendation</span>
                    </span>
                    <span className="text-xs text-[#D8C7B5]/70 italic">
                      Target Budget: ₹{budget.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-light">
                    {result.collectionTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#D8C7B5] font-light leading-relaxed">
                    {result.aestheticSummary}
                  </p>
                </div>

                {/* Curated Items Breakdown (As requested in the user prompt) */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-[#FAF8F5]/80 font-semibold">
                    Curated Pieces for Your Room
                  </h4>

                  <div className="space-y-2.5">
                    {result.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded bg-[#1c040a] border border-[#D4AF37]/20 flex items-center justify-between gap-4 hover:border-[#D4AF37]/60 transition-colors"
                      >
                        <div className="flex items-center gap-3.5">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded object-cover border border-[#D4AF37]/30 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs uppercase tracking-wider text-[#D4AF37] text-[10px]">
                                {item.category}
                              </span>
                              <span className="text-[10px] text-[#D8C7B5]/60">&bull;</span>
                              <span className="text-[11px] text-[#D8C7B5] italic">
                                {item.roomPlacement}
                              </span>
                            </div>
                            <h5 className="font-serif text-base text-[#FAF8F5] font-medium">
                              {item.name}
                            </h5>
                            <p className="text-[11px] text-[#D8C7B5]/75 line-clamp-1">
                              {item.reason}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-serif text-base font-bold text-[#FAF8F5] tabular-nums">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total Cost & Budget Banner as requested */}
                <div className="p-4 rounded bg-[#2f0915] border border-[#D4AF37]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#D8C7B5] uppercase tracking-wider block">
                      Total Decor Investment
                    </span>
                    <span className="font-serif text-3xl font-bold text-[#FAF8F5] tabular-nums">
                      ₹{result.totalCost.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#22050e] border border-emerald-500/40 text-emerald-300 text-xs font-medium">
                      <CheckCircle2 size={13} />
                      <span>{result.budgetStatus}</span>
                    </span>
                  </div>
                </div>

                {/* Styling Advice & Color Palette Harmony */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="p-3.5 rounded bg-[#1c040a] border border-[#D4AF37]/20 space-y-1">
                    <p className="text-[#D4AF37] font-semibold flex items-center gap-1">
                      <Palette size={13} />
                      <span>Color Harmony Palette</span>
                    </p>
                    <div className="flex items-center gap-2 pt-1.5">
                      {result.colorHarmony?.map((c, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <div
                            className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: c.hex }}
                            title={`${c.name} (${c.hex})`}
                          />
                          <span className="text-[10px] text-[#D8C7B5] hidden sm:inline">{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded bg-[#1c040a] border border-[#D4AF37]/20 space-y-1">
                    <p className="text-[#D4AF37] font-semibold flex items-center gap-1">
                      <Home size={13} />
                      <span>Placement Recommendation</span>
                    </p>
                    <p className="text-[11px] text-[#D8C7B5] leading-relaxed">
                      {result.stylingAdvice}
                    </p>
                  </div>
                </div>

                {/* Action CTA: Add All to Cart */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handleAddAllToCart}
                    className="w-full sm:flex-1 py-3 px-5 rounded bg-[#FAF8F5] hover:bg-[#EDE4D8] text-[#1f050d] font-serif font-bold text-sm tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <ShoppingBag size={16} className="text-[#1f050d]" />
                    <span>ADD ALL {result.items.length} ITEMS TO BAG (₹{result.totalCost.toLocaleString('en-IN')})</span>
                  </button>

                  <button
                    onClick={() => generateDecorPlan(true)}
                    disabled={isLoading}
                    className="w-full sm:w-auto py-3 px-4 rounded bg-[#350c18] hover:bg-[#451020] text-[#FAF8F5] border border-[#D4AF37]/40 text-xs font-serif font-medium tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Generate alternative plan"
                  >
                    <RotateCcw size={14} className="text-[#D4AF37]" />
                    <span>Shuffle Combination</span>
                  </button>
                </div>

              </div>
            ) : null}
          </div>

        </div>

      </div>
    </section>
  );
};
