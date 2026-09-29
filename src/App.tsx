import React, { useState } from 'react';
import { Product, CategoryId, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShopCategories } from './components/ShopCategories';
import { ProductCatalog } from './components/ProductCatalog';
import { AIDecorAssistant } from './components/AIDecorAssistant';
import { CuratedCollectionsSection } from './components/CuratedCollectionsSection';
import { InspirationSection } from './components/InspirationSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AIDecorPlanDrawer } from './components/AIDecorPlanDrawer';
import { DecorStudioChatbot } from './components/DecorStudioChatbot';
import { Footer } from './components/Footer';
import { Check, Sparkles } from 'lucide-react';

export default function App() {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Mayil Nilavilakku
      quantity: 1,
    },
    {
      product: PRODUCTS[1], // Padmam Lotus Urli
      quantity: 1,
    },
  ]);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'carved-wooden-jharokha',
    'mysore-sandalwood-candle',
  ]);

  // AI Decor Plan custom saved products
  const [aiPlanProducts, setAIPlanProducts] = useState<Product[]>([
    PRODUCTS[1], // Lotus Urli
    PRODUCTS[5], // Sandalwood candle
  ]);

  // Active Category filter
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | 'all'>('all');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAIPlanOpen, setIsAIPlanOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Transient Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const handleAddMultipleToCart = (productsToAdd: Product[]) => {
    setCart((prev) => {
      const updated = [...prev];
      productsToAdd.forEach((prod) => {
        const idx = updated.findIndex((i) => i.product.id === prod.id);
        if (idx >= 0) {
          updated[idx].quantity += 1;
        } else {
          updated.push({ product: prod, quantity: 1 });
        }
      });
      return updated;
    });
    showToast(`Added ${productsToAdd.length} AI ensemble pieces to your bag.`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed "${product.name}" from wishlist.`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist.`);
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product);
    handleRemoveFromWishlist(product.id);
  };

  // AI Plan operations
  const handleAddToAIPlan = (product: Product) => {
    setAIPlanProducts((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        showToast(`"${product.name}" is already in your AI Decor Plan.`);
        return prev;
      }
      showToast(`Added "${product.name}" to your AI Decor Plan.`);
      return [...prev, product];
    });
  };

  const handleRemoveFromAIPlan = (productId: string) => {
    setAIPlanProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleTransferAllPlanToCart = () => {
    handleAddMultipleToCart(aiPlanProducts);
    setIsCartOpen(true);
  };

  // Navigation helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#1f050d] text-[#FAF8F5] flex flex-col font-body selection:bg-[#D4AF37]/30 selection:text-[#FAF8F5]">
      
      {/* Top Navigation */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        aiPlanCount={aiPlanProducts.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAIPlan={() => setIsAIPlanOpen(true)}
        onOpenChatbot={() => setIsChatbotOpen(true)}
        onNavigateToSection={scrollToSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section with Large White Kolam & South Indian Interior */}
        <Hero
          onShopClick={() => scrollToSection('catalog')}
          onAIClick={() => scrollToSection('ai-stylist')}
        />

        {/* 2. Shop Categories with dark-maroon cards & white kolam borders */}
        <ShopCategories
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={(id) => {
            setSelectedCategoryId(id);
            scrollToSection('catalog');
          }}
        />

        {/* 3. Product Catalog with Ivory/Cream Cards & Gold Borders */}
        <ProductCatalog
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onAddToAIPlan={handleAddToAIPlan}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* 4. AI Decor Assistant: "Let AI Style Your Space" */}
        <AIDecorAssistant
          onAddMultipleToCart={handleAddMultipleToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 5. AI Curated Collections: "Curated by AI. Inspired by Tradition." */}
        <CuratedCollectionsSection
          onSelectProduct={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* 6. Inspiration Section: "Find Your Decor Story." */}
        <InspirationSection
          onSelectProduct={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Footer with Deep Maroon & Grand Kolam Backdrop */}
      <Footer
        onNavigateToSection={scrollToSection}
        onOpenChatbot={() => setIsChatbotOpen(true)}
      />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveWishlistToCart}
      />

      <AIDecorPlanDrawer
        isOpen={isAIPlanOpen}
        onClose={() => setIsAIPlanOpen(false)}
        planProducts={aiPlanProducts}
        onRemoveFromPlan={handleRemoveFromAIPlan}
        onAddAllToCart={handleTransferAllPlanToCart}
        onOpenStylist={() => scrollToSection('ai-stylist')}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={() => {
          setCart([]);
        }}
      />

      <ProductDetailModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onAddToAIPlan={handleAddToAIPlan}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
      />

      {/* The Decor Studio AI Chatbot (the-decor-studio-ai-rlo9.vercel.app) */}
      <DecorStudioChatbot
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        onAddToCart={handleAddToCart}
        onAddToAIPlan={handleAddToAIPlan}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 px-4 py-3 rounded bg-[#FAF8F5] text-[#1f050d] border border-[#D4AF37] shadow-2xl flex items-center gap-2.5 text-xs font-serif font-medium tracking-wide animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Sparkles size={14} className="text-[#997A23] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
