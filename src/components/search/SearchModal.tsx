import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS_DATA, ARTISANS_DATA, CRAFTS_DATA, STORIES_DATA } from '../../data/seedData';
import { CraftImage } from '../common/CraftImage';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedProducts = q
    ? PRODUCTS_DATA.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.craft.toLowerCase().includes(q) ||
          p.artisanName.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const matchedArtisans = q
    ? ARTISANS_DATA.filter(
        a =>
          a.name.toLowerCase().includes(q) ||
          a.craft.toLowerCase().includes(q) ||
          a.village.toLowerCase().includes(q) ||
          a.district.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchedCrafts = q
    ? CRAFTS_DATA.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q)
      ).slice(0, 2)
    : [];

  const matchedStories = q
    ? STORIES_DATA.filter(
        s =>
          s.title.toLowerCase().includes(q) ||
          s.excerpt.toLowerCase().includes(q)
      ).slice(0, 2)
    : [];

  const handleSelect = (url: string) => {
    setIsSearchOpen(false);
    navigate(url);
  };

  const quickSearches = ['Sikki Grass', 'Sujuni Cushion', 'Mithila Monochrome', 'Devi Devi', 'Bhagalpuri Silk', 'Living & Decor'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-start justify-center p-4 pt-16 sm:pt-24">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsSearchOpen(false)}
        />

        <div className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#E8E1D5] shadow-2xl overflow-hidden z-10">
          {/* Input Header */}
          <div className="p-4 sm:p-5 border-b border-[#E8E1D5] flex items-center gap-3 bg-white">
            <Search className="w-5 h-5 text-[#8C3A27] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products, Bihar crafts, sakhis, or stories..."
              className="flex-1 bg-transparent text-sm sm:text-base text-[#1E1B18] placeholder-[#786F64] focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#5C564E] hover:text-[#1E1B18] px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 text-[#5C564E] hover:text-[#1E1B18]"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions when empty */}
          {!query && (
            <div className="p-6 space-y-4">
              <div className="text-xs uppercase tracking-wider text-[#5C564E] font-medium">
                Curated Suggestions
              </div>
              <div className="flex flex-wrap gap-2">
                {quickSearches.map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs px-3 py-1.5 bg-white border border-[#E8E1D5] hover:border-[#8C3A27] text-[#1E1B18] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto divide-y divide-[#E8E1D5]">
              {matchedProducts.length === 0 &&
                matchedArtisans.length === 0 &&
                matchedCrafts.length === 0 &&
                matchedStories.length === 0 && (
                  <div className="text-center py-8 text-xs text-[#5C564E]">
                    No matches found for “{query}”. Try searching for “Sikki”, “Sujuni”, “Devi Devi”, or “Silk”.
                  </div>
                )}

              {/* Products Section */}
              {matchedProducts.length > 0 && (
                <div className="space-y-3 pt-2 first:pt-0">
                  <div className="text-[11px] uppercase tracking-wider text-[#8C3A27] font-semibold">
                    Products ({matchedProducts.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchedProducts.map(prod => (
                      <div
                        key={prod.id}
                        onClick={() => handleSelect(`/product/${prod.slug}`)}
                        className="flex gap-3 p-2 bg-white border border-[#E8E1D5] hover:border-[#8C3A27] cursor-pointer transition-colors"
                      >
                        <div className="w-14 h-16 shrink-0 overflow-hidden">
                          <CraftImage
                            src={prod.images[0]}
                            alt={prod.name}
                            aspectRatio="3:4"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-medium text-[#1E1B18] truncate">
                            {prod.name}
                          </h5>
                          <p className="text-[11px] text-[#5C564E] truncate">
                            {prod.craft} · {prod.artisanName}
                          </p>
                          <span className="text-xs font-semibold tabular-nums text-[#1E1B18] mt-1 block">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Artisans Section */}
              {matchedArtisans.length > 0 && (
                <div className="space-y-3 pt-4">
                  <div className="text-[11px] uppercase tracking-wider text-[#8C3A27] font-semibold">
                    Sakhis & Makers ({matchedArtisans.length})
                  </div>
                  <div className="space-y-2">
                    {matchedArtisans.map(art => (
                      <div
                        key={art.id}
                        onClick={() => handleSelect(`/artisans/${art.id}`)}
                        className="flex items-center justify-between p-2.5 bg-white border border-[#E8E1D5] hover:border-[#8C3A27] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#E8E1D5]">
                            <CraftImage
                              src={art.profileImage}
                              alt={art.name}
                              aspectRatio="1:1"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-xs font-medium text-[#1E1B18] block">{art.name}</span>
                            <span className="text-[11px] text-[#5C564E]">{art.village}, {art.district} · {art.craft}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#786F64]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Crafts Section */}
              {matchedCrafts.length > 0 && (
                <div className="space-y-3 pt-4">
                  <div className="text-[11px] uppercase tracking-wider text-[#8C3A27] font-semibold">
                    Bihar Living Crafts
                  </div>
                  <div className="space-y-2">
                    {matchedCrafts.map(c => (
                      <div
                        key={c.id}
                        onClick={() => handleSelect(`/crafts/${c.slug}`)}
                        className="p-3 bg-white border border-[#E8E1D5] hover:border-[#8C3A27] cursor-pointer transition-colors"
                      >
                        <div className="text-xs font-medium text-[#1E1B18]">{c.name}</div>
                        <div className="text-[11px] text-[#5C564E] line-clamp-1 mt-0.5">{c.shortDescription}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stories Section */}
              {matchedStories.length > 0 && (
                <div className="space-y-3 pt-4">
                  <div className="text-[11px] uppercase tracking-wider text-[#8C3A27] font-semibold">
                    Editorial Stories
                  </div>
                  <div className="space-y-2">
                    {matchedStories.map(s => (
                      <div
                        key={s.id}
                        onClick={() => handleSelect(`/stories/${s.slug}`)}
                        className="p-3 bg-white border border-[#E8E1D5] hover:border-[#8C3A27] cursor-pointer transition-colors"
                      >
                        <div className="text-xs font-medium text-[#1E1B18]">{s.title}</div>
                        <div className="text-[11px] text-[#5C564E] mt-0.5">{s.readTime} · {s.category}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
