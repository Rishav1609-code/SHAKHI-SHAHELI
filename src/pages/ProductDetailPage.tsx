import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, ShieldCheck, Clock, MapPin, Star, Plus, Minus, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS_DATA, ARTISANS_DATA, CRAFTS_DATA } from '../data/seedData';
import { CraftImage } from '../components/common/CraftImage';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, setIsCheckoutOpen, showNotification } = useApp();

  const product = PRODUCTS_DATA.find(p => p.slug === slug || p.id === slug) || PRODUCTS_DATA[0];
  const artisan = ARTISANS_DATA.find(a => a.id === product.artisanId || a.name === product.artisanName) || ARTISANS_DATA[0];
  const craft = CRAFTS_DATA.find(c => c.slug === product.craftSlug || c.name === product.craft) || CRAFTS_DATA[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Natural');
  const [activeTab, setActiveTab] = useState<'craft' | 'maker' | 'story' | 'care'>('craft');

  // Customer Reviews state
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      author: 'Aparna Sen',
      location: 'New Delhi',
      rating: 5,
      date: 'March 14, 2026',
      title: 'Transformed our dining room ambience',
      comment: 'The natural aroma and warm amber glow of this piece is unlike anything factory-made. You can feel the patience of the craftswoman in every single coil. Arrived safely in wooden crate.'
    },
    {
      id: 'rev-2',
      author: 'Vikram Joshi',
      location: 'Mumbai',
      rating: 5,
      date: 'February 28, 2026',
      title: 'Real dignity, real luxury',
      comment: 'I bought this as an anniversary gift. Having the certificate signed by the maker herself makes this a genuine collector item.'
    }
  ]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const isSaved = isInWishlist(product.id);

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    setIsCheckoutOpen(true);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;

    setReviews([
      {
        id: `rev-${Date.now()}`,
        author: newReviewAuthor,
        location: 'Patron',
        rating: newReviewRating,
        date: 'Today',
        title: newReviewTitle || 'Authentic Craft Piece',
        comment: newReviewComment
      },
      ...reviews
    ]);
    setShowReviewForm(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    showNotification('Thank you for sharing your review and supporting our artisans.', 'success');
  };

  const relatedProducts = PRODUCTS_DATA.filter(p => p.id !== product.id && (p.craftSlug === product.craftSlug || p.categorySlug === product.categorySlug)).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-20">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#5C564E] flex items-center gap-2">
        <Link to="/" className="hover:text-[#1E1B18]">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/shop" className="hover:text-[#1E1B18]">Shop</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/crafts/${product.craftSlug}`} className="hover:text-[#1E1B18]">{product.craft}</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1E1B18] font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Primary Section: Gallery Left + Contiguous Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-[#E8E1D5] bg-white overflow-hidden">
            <CraftImage
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              aspectRatio="4:3"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 border overflow-hidden transition-all ${
                    selectedImage === idx ? 'border-[#8C3A27] ring-1 ring-[#8C3A27]' : 'border-[#E8E1D5] opacity-70 hover:opacity-100'
                  }`}
                >
                  <CraftImage
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    aspectRatio="1:1"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Maker Authenticity Strip */}
          <div className="p-4 bg-[#EFE8DC]/50 border border-[#E8E1D5] flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E8E1D5]">
                <CraftImage
                  src={artisan.profileImage}
                  alt={artisan.name}
                  aspectRatio="1:1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[#1E1B18] font-medium block">Crafted by Sakhi {artisan.name}</span>
                <span className="text-[#5C564E] text-[11px]">{artisan.village}, {artisan.district} · {product.handmadeTime}</span>
              </div>
            </div>
            <Link
              to={`/artisans/${artisan.id}`}
              className="text-[#8C3A27] hover:underline font-semibold text-xs whitespace-nowrap"
            >
              Meet Sakhi →
            </Link>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8C3A27] font-semibold uppercase tracking-wider">
              <span>{product.craft}</span>
              <span aria-hidden="true">·</span>
              <span>GI Tag Provenance</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-medium mt-1 leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Maker */}
            <div className="mt-3 flex items-center gap-3 text-xs text-[#5C564E]">
              <div className="flex items-center text-[#C78D3B]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="ml-1 text-xs font-semibold tabular-nums text-[#1E1B18]">{product.rating}</span>
                <span className="ml-1 text-[#786F64]">({product.reviewCount} verified patrons)</span>
              </div>
              <span aria-hidden="true">·</span>
              <span className="text-[#1E1B18] font-medium">SKU: {product.sku}</span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3 pb-4 border-b border-[#E8E1D5]">
              <span className="text-2xl sm:text-3xl font-bold tabular-nums text-[#1E1B18]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-[#786F64] line-through tabular-nums">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-[11px] text-[#8C3A27] font-medium ml-auto">
                Direct Maker Advance Paid
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#5C564E] leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Color/Tone selector */}
          {product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18]">
                Natural Material Tone: <span className="font-normal text-[#5C564E]">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {product.colors.map(col => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-3 py-1.5 text-xs border transition-colors ${
                      selectedColor === col
                        ? 'border-[#8C3A27] bg-[#8C3A27] text-white font-medium'
                        : 'border-[#E8E1D5] bg-white text-[#1E1B18] hover:border-[#8C3A27]'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#E8E1D5] bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#5C564E] hover:text-[#1E1B18]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-semibold tabular-nums text-[#1E1B18]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[#5C564E] hover:text-[#1E1B18]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity, selectedColor)}
                className="flex-1 py-3 px-6 bg-[#8C3A27] hover:bg-[#A34A35] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 border transition-colors ${
                  isSaved
                    ? 'bg-[#8C3A27] text-white border-[#8C3A27]'
                    : 'border-[#E8E1D5] bg-white text-[#1E1B18] hover:border-[#8C3A27]'
                }`}
                aria-label="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3 bg-[#1E1B18] hover:bg-[#332D28] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Instant Buy with Direct Atelier Checkout
            </button>
          </div>

          {/* Guarantees Box */}
          <div className="p-4 bg-white border border-[#E8E1D5] space-y-2 text-xs text-[#5C564E]">
            <div className="flex items-center gap-2 text-[#1E1B18]">
              <ShieldCheck className="w-4 h-4 text-[#8C3A27]" />
              <span className="font-medium">100% Guaranteed Handmade in Bihar</span>
            </div>
            <p className="text-[11px] text-[#786F64]">
              Enclosed with every piece is an authenticity document signed by the artisan with harvest and making details.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Deep Dive Tabs: Craft / Maker / Story / Care */}
      <div className="border-t border-[#E8E1D5] pt-12 space-y-8">
        <div className="flex border-b border-[#E8E1D5] gap-8 text-sm">
          {[
            { id: 'craft', label: 'About the Craft' },
            { id: 'maker', label: 'Meet the Maker' },
            { id: 'story', label: 'Design Narrative' },
            { id: 'care', label: 'Materials & Care' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 font-serif text-lg transition-colors relative ${
                activeTab === tab.id ? 'text-[#8C3A27] font-semibold' : 'text-[#5C564E] hover:text-[#1E1B18]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8C3A27]" />
              )}
            </button>
          ))}
        </div>

        <div className="py-4">
          {activeTab === 'craft' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed text-[#5C564E]">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-[#1E1B18] font-normal">{craft.name}</h3>
                <p>{craft.description}</p>
                <div className="p-4 bg-white border border-[#E8E1D5] space-y-2">
                  <span className="font-semibold text-[#1E1B18] block">Geographical Provenance</span>
                  <p>{craft.region}</p>
                </div>
              </div>
              <div className="space-y-4">
                <span className="font-semibold text-[#1E1B18] uppercase tracking-wider block">Ancestral Tools & Process</span>
                <ul className="space-y-2">
                  {craft.process.map(p => (
                    <li key={p.step} className="p-3 bg-white border border-[#E8E1D5]">
                      <span className="font-serif font-bold text-[#8C3A27] mr-2">{p.step}.</span>
                      <strong className="text-[#1E1B18]">{p.title}:</strong> {p.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'maker' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4">
                <CraftImage
                  src={artisan.profileImage}
                  alt={artisan.name}
                  aspectRatio="3:4"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:col-span-8 space-y-4 text-xs text-[#5C564E] leading-relaxed">
                <span className="text-[11px] uppercase tracking-wider text-[#8C3A27] font-semibold">
                  Master Voice · {artisan.village}, {artisan.district}
                </span>
                <h3 className="font-serif text-3xl text-[#1E1B18] font-normal">{artisan.name}</h3>
                <p>{artisan.biography}</p>
                <blockquote className="font-serif italic text-base text-[#1E1B18] border-l-2 border-[#8C3A27] pl-4 py-1">
                  “{artisan.story}”
                </blockquote>
                <div className="pt-2">
                  <Link
                    to={`/artisans/${artisan.id}`}
                    className="inline-flex items-center gap-1 text-[#8C3A27] font-semibold hover:underline"
                  >
                    <span>View all pieces made by {artisan.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'story' && (
            <div className="max-w-3xl space-y-4 text-xs text-[#5C564E] leading-relaxed">
              <h3 className="font-serif text-2xl text-[#1E1B18] font-normal">How This Piece Was Born</h3>
              <p>{product.description}</p>
              <p>{product.story}</p>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E8E1D5]">
                <div className="p-3 bg-white border border-[#E8E1D5]">
                  <span className="text-[#786F64] block">Handmade Duration:</span>
                  <span className="font-medium text-[#1E1B18]">{product.handmadeTime}</span>
                </div>
                <div className="p-3 bg-white border border-[#E8E1D5]">
                  <span className="text-[#786F64] block">Dimensions:</span>
                  <span className="font-medium text-[#1E1B18]">{product.dimensions}</span>
                </div>
                <div className="p-3 bg-white border border-[#E8E1D5]">
                  <span className="text-[#786F64] block">Weight:</span>
                  <span className="font-medium text-[#1E1B18]">{product.weight}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="max-w-2xl space-y-4 text-xs text-[#5C564E] leading-relaxed">
              <h3 className="font-serif text-2xl text-[#1E1B18] font-normal">Materials & Preservation</h3>
              <p>
                Handmade pieces made with natural plant fibers and botanical dyes evolve with age. Follow these guidelines to preserve them for decades:
              </p>
              <div className="p-4 bg-white border border-[#E8E1D5] space-y-3">
                <span className="font-semibold text-[#1E1B18] block">Care Instructions</span>
                <p>{product.careInstructions}</p>
              </div>
              <div className="p-4 bg-white border border-[#E8E1D5] space-y-2">
                <span className="font-semibold text-[#1E1B18] block">Raw Materials Breakdown</span>
                <ul className="list-disc pl-5 space-y-1">
                  {product.materials.map(m => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Verified Reviews Section */}
      <div className="border-t border-[#E8E1D5] pt-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
              Patron Notes
            </span>
            <h2 className="font-serif text-3xl text-[#1E1B18] font-normal mt-1">
              Collector & Customer Reviews
            </h2>
          </div>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-5 py-2.5 border border-[#1E1B18] hover:bg-[#1E1B18] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            {showReviewForm ? 'Close Form' : 'Write a Review'}
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <form onSubmit={handleAddReview} className="p-6 bg-white border border-[#E8E1D5] max-w-xl space-y-4 text-xs">
            <h4 className="font-serif text-lg text-[#1E1B18] font-medium">Share your experience with this piece</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#1E1B18] font-medium mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={e => setNewReviewAuthor(e.target.value)}
                  className="w-full border border-[#E8E1D5] p-2 focus:outline-none focus:border-[#8C3A27]"
                  placeholder="e.g. Radhika Sharma"
                />
              </div>
              <div>
                <label className="block text-[#1E1B18] font-medium mb-1">Rating</label>
                <select
                  value={newReviewRating}
                  onChange={e => setNewReviewRating(Number(e.target.value))}
                  className="w-full border border-[#E8E1D5] p-2 focus:outline-none focus:border-[#8C3A27]"
                >
                  <option value={5}>5 Stars — Masterpiece</option>
                  <option value={4}>4 Stars — Very Good</option>
                  <option value={3}>3 Stars — Average</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[#1E1B18] font-medium mb-1">Review Headline</label>
              <input
                type="text"
                value={newReviewTitle}
                onChange={e => setNewReviewTitle(e.target.value)}
                className="w-full border border-[#E8E1D5] p-2 focus:outline-none focus:border-[#8C3A27]"
                placeholder="e.g. Magnificent texture and fast insured shipping"
              />
            </div>
            <div>
              <label className="block text-[#1E1B18] font-medium mb-1">Comments *</label>
              <textarea
                required
                rows={3}
                value={newReviewComment}
                onChange={e => setNewReviewComment(e.target.value)}
                className="w-full border border-[#E8E1D5] p-2 focus:outline-none focus:border-[#8C3A27]"
                placeholder="Describe the craft details, texture, and how it sits in your home..."
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-[#8C3A27] text-white font-semibold uppercase tracking-wider hover:bg-[#A34A35]"
            >
              Submit Review
            </button>
          </form>
        )}

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map(r => (
            <div key={r.id} className="p-6 bg-white border border-[#E8E1D5] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center text-[#C78D3B]">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[#786F64]">{r.date}</span>
              </div>
              <h4 className="font-serif text-base text-[#1E1B18] font-medium">{r.title}</h4>
              <p className="text-xs text-[#5C564E] leading-relaxed">{r.comment}</p>
              <div className="pt-2 text-[11px] text-[#786F64] flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#8C3A27]" />
                <span>Verified Patron: {r.author} ({r.location})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-[#E8E1D5] pt-12 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-[#1E1B18]">Complementary Craft Pieces</h2>
            <Link to="/shop" className="text-xs text-[#8C3A27] font-semibold hover:underline">
              View All Collection →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
