import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { CraftImage } from '../common/CraftImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useApp();
  const isSaved = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col bg-white border border-[#E8E1D5] hover:border-[#8C3A27]/40 transition-all duration-300">
      {/* Image Container with 4:3 ratio */}
      <div className="relative overflow-hidden bg-[#F5EFE6]">
        <Link to={`/product/${product.slug}`} className="block">
          <CraftImage
            src={product.images[0]}
            alt={product.name}
            aspectRatio="4:3"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Quiet Kicker Tag if Bestseller or New */}
        {(product.bestseller || product.newArrival) && (
          <div className="absolute top-3 left-3 bg-[#1E1B18]/85 text-white text-[10px] tracking-widest uppercase px-2 py-0.5 pointer-events-none">
            {product.bestseller ? 'Bestseller' : 'New Arrival'}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isSaved
              ? 'bg-[#8C3A27] text-white shadow-sm'
              : 'bg-white/80 hover:bg-white text-[#1E1B18] backdrop-blur-xs'
          }`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 py-2 bg-white/95 hover:bg-white text-[#1E1B18] text-[11px] font-medium tracking-wide uppercase shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#5C564E]" />
            <span>Quick View</span>
          </button>
          <button
            onClick={() => addToCart(product, 1)}
            className="py-2 px-3 bg-[#8C3A27] hover:bg-[#A34A35] text-white text-[11px] font-medium shadow-sm transition-colors"
            aria-label="Quick add to bag"
            title="Quick add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Metadata: Craft & Artisan (Clean unboxed text) */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#5C564E]">
            <Link
              to={`/crafts/${product.craftSlug}`}
              className="hover:text-[#8C3A27] transition-colors truncate"
            >
              {product.craft}
            </Link>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <Link
              to={`/artisans/${product.artisanId}`}
              className="hover:text-[#8C3A27] transition-colors truncate"
            >
              {product.artisanName}
            </Link>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.slug}`}
            className="block mt-1 font-serif text-base text-[#1E1B18] group-hover:text-[#8C3A27] transition-colors line-clamp-1 font-medium"
          >
            {product.name}
          </Link>
        </div>

        {/* Price & Action */}
        <div className="pt-2 flex items-baseline justify-between border-t border-[#E8E1D5]/60">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-[#1E1B18] tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#786F64] line-through tabular-nums">
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Mobile Quick Add */}
          <button
            onClick={() => addToCart(product, 1)}
            className="sm:hidden text-xs text-[#8C3A27] font-medium flex items-center gap-1 hover:underline"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
