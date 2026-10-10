import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Heart, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CraftImage } from '../common/CraftImage';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useApp();

  if (!quickViewProduct) return null;

  const isSaved = isInWishlist(quickViewProduct.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setQuickViewProduct(null)}
        />

        <div className="relative w-full max-w-3xl bg-[#FAF7F2] border border-[#E8E1D5] shadow-2xl p-6 sm:p-8 z-10">
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 text-[#5C564E] hover:text-[#1E1B18] p-1"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gallery Left */}
            <div className="space-y-3">
              <div className="border border-[#E8E1D5] bg-white overflow-hidden">
                <CraftImage
                  src={quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  aspectRatio="4:3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-[#EFE8DC]/50 border border-[#E8E1D5] text-xs text-[#5C564E] space-y-1">
                <div className="flex items-center gap-1.5 text-[#1E1B18] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#8C3A27]" />
                  <span>{quickViewProduct.handmadeTime}</span>
                </div>
                <p className="text-[11px] text-[#786F64]">
                  Master crafted by {quickViewProduct.artisanName} in {quickViewProduct.artisanVillage}.
                </p>
              </div>
            </div>

            {/* Details Right */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs text-[#8C3A27] font-semibold tracking-wider uppercase mb-1">
                  {quickViewProduct.craft}
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#1E1B18]">
                  {quickViewProduct.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-xl font-bold tabular-nums text-[#1E1B18]">
                    ₹{quickViewProduct.price.toLocaleString('en-IN')}
                  </span>
                  {quickViewProduct.compareAtPrice && (
                    <span className="text-sm text-[#786F64] line-through tabular-nums">
                      ₹{quickViewProduct.compareAtPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-xs text-[#5C564E] leading-relaxed">
                  {quickViewProduct.shortDescription}
                </p>

                {/* Specs */}
                <div className="mt-5 border-t border-[#E8E1D5] pt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#5C564E]">Materials:</span>
                    <span className="font-medium text-[#1E1B18]">{quickViewProduct.materials.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C564E]">Dimensions:</span>
                    <span className="font-medium text-[#1E1B18]">{quickViewProduct.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C564E]">Direct Maker:</span>
                    <span className="font-medium text-[#8C3A27]">{quickViewProduct.artisanName}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-[#E8E1D5]">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, 1);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-3 bg-[#8C3A27] hover:bg-[#A34A35] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3 border transition-colors ${
                      isSaved
                        ? 'bg-[#8C3A27] text-white border-[#8C3A27]'
                        : 'border-[#E8E1D5] bg-white text-[#1E1B18] hover:border-[#8C3A27]'
                    }`}
                    aria-label="Save piece"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <Link
                  to={`/product/${quickViewProduct.slug}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="block text-center text-xs text-[#5C564E] hover:text-[#8C3A27] font-medium py-1"
                >
                  View Full Craft Story & Provenance →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
