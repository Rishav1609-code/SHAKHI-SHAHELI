import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid, X } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS_DATA, CRAFTS_DATA, CATEGORIES_DATA, ARTISANS_DATA } from '../data/seedData';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [selectedCraft, setSelectedCraft] = useState<string>(searchParams.get('craft') || 'all');
  const [selectedArtisan, setSelectedArtisan] = useState<string>(searchParams.get('artisan') || 'all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  // Sync with searchParams on load
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const crf = searchParams.get('craft');
    if (crf) setSelectedCraft(crf);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let list: Product[] = [...PRODUCTS_DATA];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.craft.toLowerCase().includes(q) ||
          p.artisanName.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      list = list.filter(p => p.categorySlug === selectedCategory);
    }

    if (selectedCraft !== 'all') {
      list = list.filter(p => p.craftSlug === selectedCraft);
    }

    if (selectedArtisan !== 'all') {
      list = list.filter(p => p.artisanId === selectedArtisan);
    }

    if (priceRange === 'under-2500') {
      list = list.filter(p => p.price < 2500);
    } else if (priceRange === '2500-5000') {
      list = list.filter(p => p.price >= 2500 && p.price <= 5000);
    } else if (priceRange === 'above-5000') {
      list = list.filter(p => p.price > 5000);
    }

    if (sortBy === 'price-low-high') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // newest
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  }, [searchQuery, selectedCategory, selectedCraft, selectedArtisan, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCraft('all');
    setSelectedArtisan('all');
    setPriceRange('all');
    setSearchQuery('');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedCraft !== 'all' ||
    selectedArtisan !== 'all' ||
    priceRange !== 'all' ||
    searchQuery !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Editorial Page Header */}
      <div className="border-b border-[#E8E1D5] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
          The Bihar Atelier
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1E1B18] font-normal tracking-tight">
          The Collection
        </h1>
        <p className="text-sm sm:text-base text-[#5C564E] max-w-2xl leading-relaxed">
          Handmade pieces rooted in the ecology and traditions of Bihar, designed for contemporary living. Direct fair compensation for master women makers.
        </p>
      </div>

      {/* Filter & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E8E1D5]">
        {/* Left: Mobile Filter trigger & Product Count */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 py-2 px-3 border border-[#E8E1D5] text-xs font-medium text-[#1E1B18] bg-white"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C3A27]" />
            <span>Filters</span>
          </button>

          <span className="text-xs text-[#5C564E]">
            Showing <span className="font-medium text-[#1E1B18] tabular-nums">{filteredProducts.length}</span> pieces
          </span>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#8C3A27] hover:underline font-medium"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Right: Search, Sort and Grid Toggle */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search in collection..."
              className="w-40 sm:w-56 bg-white border border-[#E8E1D5] px-3 py-1.5 text-xs text-[#1E1B18] placeholder-[#786F64] focus:outline-none focus:border-[#8C3A27]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1.5 text-xs text-[#786F64]"
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Select */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-white border border-[#E8E1D5] px-3 py-1.5 text-xs text-[#1E1B18] focus:outline-none focus:border-[#8C3A27]"
          >
            <option value="newest">Sort: Newest Editions</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* Grid Toggle on Desktop */}
          <div className="hidden lg:flex items-center border border-[#E8E1D5] bg-white">
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 text-xs ${gridCols === 3 ? 'bg-[#EFE8DC] text-[#1E1B18]' : 'text-[#786F64]'}`}
              title="3 Columns"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-1.5 text-xs ${gridCols === 4 ? 'bg-[#EFE8DC] text-[#1E1B18]' : 'text-[#786F64]'}`}
              title="4 Columns"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block lg:col-span-3 space-y-8 pr-6 border-r border-[#E8E1D5]">
          {/* Category Filter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18]">
              Category
            </h4>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`block w-full text-left py-1 transition-colors ${
                  selectedCategory === 'all' ? 'text-[#8C3A27] font-semibold' : 'text-[#5C564E] hover:text-[#1E1B18]'
                }`}
              >
                All Categories
              </button>
              {CATEGORIES_DATA.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`block w-full text-left py-1 transition-colors ${
                    selectedCategory === c.slug ? 'text-[#8C3A27] font-semibold' : 'text-[#5C564E] hover:text-[#1E1B18]'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Craft Filter */}
          <div className="space-y-3 pt-4 border-t border-[#E8E1D5]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18]">
              Traditional Craft
            </h4>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setSelectedCraft('all')}
                className={`block w-full text-left py-1 transition-colors ${
                  selectedCraft === 'all' ? 'text-[#8C3A27] font-semibold' : 'text-[#5C564E] hover:text-[#1E1B18]'
                }`}
              >
                All Crafts
              </button>
              {CRAFTS_DATA.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCraft(c.slug)}
                  className={`block w-full text-left py-1 transition-colors ${
                    selectedCraft === c.slug ? 'text-[#8C3A27] font-semibold' : 'text-[#5C564E] hover:text-[#1E1B18]'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Artisan Filter */}
          <div className="space-y-3 pt-4 border-t border-[#E8E1D5]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18]">
              Master Maker (Sakhi)
            </h4>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setSelectedArtisan('all')}
                className={`block w-full text-left py-1 transition-colors ${
                  selectedArtisan === 'all' ? 'text-[#8C3A27] font-semibold' : 'text-[#5C564E] hover:text-[#1E1B18]'
                }`}
              >
                All Sakhis
              </button>
              {ARTISANS_DATA.map(a => (
                <button
                  key={a.id}
                  onClick={() => setSelectedArtisan(a.id)}
                  className={`block w-full text-left py-1 transition-colors ${
                    selectedArtisan === a.id ? 'text-[#8C3A27] font-semibold' : 'text-[#5C564E] hover:text-[#1E1B18]'
                  }`}
                >
                  {a.name} ({a.village})
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3 pt-4 border-t border-[#E8E1D5]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18]">
              Price
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { label: 'All Prices', val: 'all' },
                { label: 'Under ₹2,500', val: 'under-2500' },
                { label: '₹2,500 – ₹5,000', val: '2500-5000' },
                { label: 'Above ₹5,000', val: 'above-5000' }
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => setPriceRange(opt.val)}
                  className={`block w-full text-left py-1 transition-colors ${
                    priceRange === opt.val ? 'text-[#8C3A27] font-semibold' : 'text-[#5C564E] hover:text-[#1E1B18]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className={`lg:col-span-9 ${gridCols === 3 ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-6`}>
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-20 space-y-4">
              <p className="font-serif text-2xl text-[#1E1B18]">No pieces match your selected filters</p>
              <p className="text-xs text-[#5C564E] max-w-sm mx-auto">
                Try broadening your criteria or reset filters to view our full collection of handmade Bihar craft.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#8C3A27] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#A34A35] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-[#FAF7F2] p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5]">
                <h3 className="font-serif text-lg font-medium text-[#1E1B18]">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-[#5C564E]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2 text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#1E1B18] block">Category</span>
                <button
                  onClick={() => { setSelectedCategory('all'); setIsMobileFilterOpen(false); }}
                  className={`block py-1 ${selectedCategory === 'all' ? 'text-[#8C3A27] font-semibold' : 'text-[#5C564E]'}`}
                >
                  All Categories
                </button>
                {CATEGORIES_DATA.map(c => (
                  <button
                    key={c.id}
                    onClick={() => { setSelectedCategory(c.slug); setIsMobileFilterOpen(false); }}
                    className={`block py-1 ${selectedCategory === c.slug ? 'text-[#8C3A27] font-semibold' : 'text-[#5C564E]'}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              {/* Crafts */}
              <div className="space-y-2 text-xs pt-4 border-t border-[#E8E1D5]">
                <span className="font-semibold uppercase tracking-wider text-[#1E1B18] block">Craft</span>
                <button
                  onClick={() => { setSelectedCraft('all'); setIsMobileFilterOpen(false); }}
                  className={`block py-1 ${selectedCraft === 'all' ? 'text-[#8C3A27] font-semibold' : 'text-[#5C564E]'}`}
                >
                  All Crafts
                </button>
                {CRAFTS_DATA.map(c => (
                  <button
                    key={c.id}
                    onClick={() => { setSelectedCraft(c.slug); setIsMobileFilterOpen(false); }}
                    className={`block py-1 ${selectedCraft === c.slug ? 'text-[#8C3A27] font-semibold' : 'text-[#5C564E]'}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => { resetFilters(); setIsMobileFilterOpen(false); }}
                  className="w-full py-2 bg-[#8C3A27] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Apply & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
