import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CraftImage } from '../common/CraftImage';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    setIsCheckoutOpen
  } = useApp();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 3000;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E8E1D5] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8E1D5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl font-medium text-[#1E1B18]">
                Your Craft Bag
              </h2>
              <span className="text-xs text-[#5C564E] tabular-nums">
                ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#5C564E] hover:text-[#1E1B18] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-6 py-3 bg-[#EFE8DC]/50 border-b border-[#E8E1D5] text-xs text-[#5C564E]">
            {remainingForFreeShipping > 0 ? (
              <p>
                Add <span className="font-semibold text-[#8C3A27] tabular-nums">₹{remainingForFreeShipping.toLocaleString('en-IN')}</span> more for free insured shipping.
              </p>
            ) : (
              <p className="text-[#8C3A27] font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>You’ve unlocked free insured shipping across India!</span>
              </p>
            )}
            <div className="w-full bg-[#E8E1D5] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#8C3A27] h-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#E8E1D5]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                <p className="font-serif text-lg text-[#1E1B18]">Your bag is empty</p>
                <p className="text-xs text-[#5C564E] max-w-xs">
                  Discover contemporary living pieces and textiles handcrafted by Bihar’s master women artisans.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-[#8C3A27] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#A34A35] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.productId} className="py-4 flex gap-4">
                  <div className="w-20 h-24 shrink-0 rounded-xs overflow-hidden border border-[#E8E1D5]">
                    <CraftImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      aspectRatio="3:4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-medium text-[#1E1B18] line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-[#786F64] hover:text-[#8C3A27] p-1"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#5C564E] mt-0.5">
                        <span>By {item.product.artisanName}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{item.product.craft}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E8E1D5] bg-white rounded-xs">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                          className="p-1 text-[#5C564E] hover:text-[#1E1B18]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs tabular-nums text-[#1E1B18] font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                          className="p-1 text-[#5C564E] hover:text-[#1E1B18]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-semibold tabular-nums text-[#1E1B18]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8E1D5] bg-white space-y-3">
              <div className="flex justify-between text-xs text-[#5C564E]">
                <span>Estimated Subtotal</span>
                <span className="font-semibold text-sm tabular-nums text-[#1E1B18]">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-[#786F64]">
                Taxes included. Insured craft packaging and artisan certification enclosed with every order.
              </p>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 bg-[#8C3A27] hover:bg-[#A34A35] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2 text-center text-xs text-[#5C564E] hover:text-[#1E1B18] transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
