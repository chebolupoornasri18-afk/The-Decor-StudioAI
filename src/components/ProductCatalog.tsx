import React, { useState, useMemo } from 'react';
import { Product, CategoryId } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { KolamBorderDivider, LotusKolam } from './kolam/KolamPatterns';

interface ProductCatalogProps {
  selectedCategoryId: CategoryId | 'all';
  onSelectCategory: (id: CategoryId | 'all') => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddToAIPlan: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedCategoryId,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onAddToAIPlan,
  onQuickView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(6000);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategoryId !== 'all' && item.categoryId !== selectedCategoryId) {
        return false;
      }
      // Price filter
      if (item.price > maxPrice) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesOrigin = item.origin.toLowerCase().includes(query);
        const matchesMaterials = item.materials.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesOrigin && !matchesMaterials) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategoryId, maxPrice, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-16 md:py-24 bg-[#1f050d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#D4AF37]/25">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              <LotusKolam size={15} color="#D4AF37" />
              <span>Heritage Gallery</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-light">
              The Curated Collection
            </h2>
            <p className="text-sm text-[#D8C7B5] font-light max-w-xl">
              Hand-finished artifacts in deep maroon, aged temple brass, and organic ceramics designed to last generations.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37]/70" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brass, urli, teak..."
                className="w-full sm:w-64 pl-9 pr-4 py-2 rounded bg-[#290812] border border-[#D4AF37]/40 text-sm text-[#FAF8F5] placeholder-[#D8C7B5]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#FAF8F5]/60 hover:text-white"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto appearance-none pl-3.5 pr-8 py-2 rounded bg-[#290812] border border-[#D4AF37]/40 text-xs text-[#FAF8F5] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                <option value="featured">Sort: Featured Collection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ArrowUpDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
            </div>
          </div>
        </div>

        {/* Filter Bar with active category tabs and budget slider */}
        <div className="py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
            <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold shrink-0">
              Filter:
            </span>
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-1 rounded text-xs transition-colors shrink-0 cursor-pointer ${
                selectedCategoryId === 'all'
                  ? 'bg-[#FAF8F5] text-[#1f050d] font-semibold'
                  : 'bg-[#290812] text-[#D8C7B5] hover:text-[#FAF8F5]'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => onSelectCategory('lamps-lighting')}
              className={`px-3 py-1 rounded text-xs transition-colors shrink-0 cursor-pointer ${
                selectedCategoryId === 'lamps-lighting'
                  ? 'bg-[#FAF8F5] text-[#1f050d] font-semibold'
                  : 'bg-[#290812] text-[#D8C7B5] hover:text-[#FAF8F5]'
              }`}
            >
              Lamps & Lighting
            </button>
            <button
              onClick={() => onSelectCategory('floral-decor')}
              className={`px-3 py-1 rounded text-xs transition-colors shrink-0 cursor-pointer ${
                selectedCategoryId === 'floral-decor'
                  ? 'bg-[#FAF8F5] text-[#1f050d] font-semibold'
                  : 'bg-[#290812] text-[#D8C7B5] hover:text-[#FAF8F5]'
              }`}
            >
              Floral & Urlis
            </button>
            <button
              onClick={() => onSelectCategory('wall-art')}
              className={`px-3 py-1 rounded text-xs transition-colors shrink-0 cursor-pointer ${
                selectedCategoryId === 'wall-art'
                  ? 'bg-[#FAF8F5] text-[#1f050d] font-semibold'
                  : 'bg-[#290812] text-[#D8C7B5] hover:text-[#FAF8F5]'
              }`}
            >
              Wall Art
            </button>
            <button
              onClick={() => onSelectCategory('candles')}
              className={`px-3 py-1 rounded text-xs transition-colors shrink-0 cursor-pointer ${
                selectedCategoryId === 'candles'
                  ? 'bg-[#FAF8F5] text-[#1f050d] font-semibold'
                  : 'bg-[#290812] text-[#D8C7B5] hover:text-[#FAF8F5]'
              }`}
            >
              Candles & Aromatics
            </button>
            <button
              onClick={() => onSelectCategory('wooden-crafts')}
              className={`px-3 py-1 rounded text-xs transition-colors shrink-0 cursor-pointer ${
                selectedCategoryId === 'wooden-crafts'
                  ? 'bg-[#FAF8F5] text-[#1f050d] font-semibold'
                  : 'bg-[#290812] text-[#D8C7B5] hover:text-[#FAF8F5]'
              }`}
            >
              Wooden Crafts
            </button>
          </div>

          {/* Quick Price Ceiling */}
          <div className="flex items-center gap-3 shrink-0 text-xs text-[#D8C7B5]">
            <SlidersHorizontal size={14} className="text-[#D4AF37]" />
            <span>Max: ₹{maxPrice.toLocaleString('en-IN')}</span>
            <input
              type="range"
              min="1000"
              max="6000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-[#D4AF37] w-24 sm:w-32 cursor-pointer"
            />
          </div>
        </div>

        {/* Product Cards Grid - 3 cols on desktop with ivory/cream cards on dark maroon background */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onAddToAIPlan={onAddToAIPlan}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <LotusKolam size={48} color="#D4AF37" className="mx-auto opacity-70" />
            <h3 className="font-serif text-2xl text-[#FAF8F5]">No matching pieces found</h3>
            <p className="text-sm text-[#D8C7B5] font-light">
              We couldn’t find items matching your search or price filter. Try broadening your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
                setMaxPrice(6000);
              }}
              className="px-5 py-2 rounded bg-[#FAF8F5] text-[#1f050d] text-xs font-serif font-semibold tracking-wider hover:bg-[#EDE4D8] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
