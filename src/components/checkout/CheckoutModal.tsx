import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Address, Order } from '../../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    placeOrder,
    currentUser
  } = useApp();

  const [step, setStep] = useState<'address' | 'payment' | 'confirmed'>('address');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultAddr: Address = currentUser?.addresses[0] || {
    id: `addr-${Date.now()}`,
    name: currentUser?.name || 'Priya Narayanan',
    phone: currentUser?.phone || '+91 98450 12345',
    street: '42, 4th Main, Defense Colony, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
    country: 'India',
    isDefault: true
  };

  const [formData, setFormData] = useState<Address>(defaultAddr);

  if (!isCheckoutOpen) return null;

  const shippingFee = cartSubtotal >= 3000 ? 0 : 250;
  const total = cartSubtotal + shippingFee;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.street || !formData.city || !formData.postalCode) {
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const order = await placeOrder(formData, paymentMethod);
      setCreatedOrder(order);
      setStep('confirmed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('address');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          onClick={handleClose}
        />

        <div className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#E8E1D5] shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D5]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8C3A27] font-semibold">
                Sakhi–Saheli Direct Atelier Checkout
              </span>
              <h2 className="font-serif text-2xl font-medium text-[#1E1B18] mt-0.5">
                {step === 'address' && '1. Shipping & Delivery Address'}
                {step === 'payment' && '2. Payment & Verification'}
                {step === 'confirmed' && 'Order Confirmed'}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="text-[#5C564E] hover:text-[#1E1B18] p-1"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step 1: Address */}
          {step === 'address' && (
            <form onSubmit={handleAddressSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1E1B18] mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#E8E1D5] px-3.5 py-2 text-xs text-[#1E1B18] focus:border-[#8C3A27] focus:outline-none"
                    placeholder="e.g. Priya Narayanan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1E1B18] mb-1">
                    Phone Number (for Courier & Tracking) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#E8E1D5] px-3.5 py-2 text-xs text-[#1E1B18] focus:border-[#8C3A27] focus:outline-none"
                    placeholder="+91 98450 12345"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1E1B18] mb-1">
                  Street Address & Apartment / Landmark *
                </label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={e => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-white border border-[#E8E1D5] px-3.5 py-2 text-xs text-[#1E1B18] focus:border-[#8C3A27] focus:outline-none"
                  placeholder="e.g. 42, 4th Main, Defense Colony"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1E1B18] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white border border-[#E8E1D5] px-3.5 py-2 text-xs text-[#1E1B18] focus:border-[#8C3A27] focus:outline-none"
                    placeholder="Bengaluru"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1E1B18] mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-white border border-[#E8E1D5] px-3.5 py-2 text-xs text-[#1E1B18] focus:border-[#8C3A27] focus:outline-none"
                    placeholder="Karnataka"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1E1B18] mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-white border border-[#E8E1D5] px-3.5 py-2 text-xs text-[#1E1B18] focus:border-[#8C3A27] focus:outline-none"
                    placeholder="560038"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-[#E8E1D5]">
                <div className="text-xs text-[#5C564E]">
                  Cart Subtotal: <span className="font-semibold tabular-nums text-[#1E1B18]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#8C3A27] hover:bg-[#A34A35] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Payment */}
          {step === 'payment' && (
            <div className="mt-6 space-y-6">
              {/* Order Summary box */}
              <div className="p-4 bg-white border border-[#E8E1D5] space-y-2 text-xs">
                <div className="flex justify-between text-[#5C564E]">
                  <span>Items ({cart.length})</span>
                  <span className="tabular-nums font-medium text-[#1E1B18]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#5C564E]">
                  <span>Insured Craft Delivery</span>
                  <span className="tabular-nums font-medium text-[#1E1B18]">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E8E1D5] flex justify-between font-semibold text-sm text-[#1E1B18]">
                  <span>Total Amount</span>
                  <span className="tabular-nums text-[#8C3A27]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#1E1B18] uppercase tracking-wider mb-3">
                  Select Payment Method
                </label>
                <div className="space-y-3">
                  <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                    paymentMethod === 'online' ? 'border-[#8C3A27] bg-[#8C3A27]/5' : 'border-[#E8E1D5] bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="mt-0.5 text-[#8C3A27] focus:ring-[#8C3A27]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#1E1B18]">
                        Instant Online Payment (UPI / Cards / Net Banking)
                      </div>
                      <p className="text-[11px] text-[#5C564E] mt-0.5">
                        Instant priority dispatch. 100% encrypted & verified. Supports GPay, PhonePe, Paytm, and all Indian bank cards.
                      </p>
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                    paymentMethod === 'cod' ? 'border-[#8C3A27] bg-[#8C3A27]/5' : 'border-[#E8E1D5] bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-0.5 text-[#8C3A27] focus:ring-[#8C3A27]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#1E1B18]">
                        Cash on Delivery (COD)
                      </div>
                      <p className="text-[11px] text-[#5C564E] mt-0.5">
                        Pay upon doorstep arrival. Phone verification SMS will be sent to {formData.phone}.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="p-3 bg-[#EFE8DC]/60 border border-[#E8E1D5] flex items-center gap-2 text-[11px] text-[#5C564E]">
                <ShieldCheck className="w-4 h-4 text-[#8C3A27] shrink-0" />
                <span>
                  Each piece is inspected at our craft center in Patna and sent with an authenticity deed signed by the artisan.
                </span>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-[#E8E1D5]">
                <button
                  type="button"
                  onClick={() => setStep('address')}
                  className="text-xs text-[#5C564E] hover:text-[#1E1B18] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Address</span>
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handlePlaceOrder}
                  className="px-6 py-2.5 bg-[#8C3A27] hover:bg-[#A34A35] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <span>{isSubmitting ? 'Confirming...' : 'Confirm Order & Pay'}</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 'confirmed' && createdOrder && (
            <div className="mt-6 text-center space-y-4 py-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#8C3A27]/10 flex items-center justify-center text-[#8C3A27]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-[#1E1B18] font-medium">
                Dhanyawaad for Supporting Bihar’s Artisans
              </h3>
              <p className="text-xs text-[#5C564E] max-w-md mx-auto leading-relaxed">
                Your order <span className="font-semibold text-[#1E1B18]">{createdOrder.orderNumber}</span> has been confirmed. Our master makers in Madhubani and Muzaffarpur have been notified and are packaging your pieces with care.
              </p>

              <div className="p-4 bg-white border border-[#E8E1D5] max-w-md mx-auto text-left text-xs space-y-2 mt-4">
                <div className="flex justify-between">
                  <span className="text-[#5C564E]">Tracking Number:</span>
                  <span className="font-mono font-medium text-[#1E1B18]">{createdOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5C564E]">Estimated Delivery:</span>
                  <span className="font-medium text-[#1E1B18]">{createdOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5C564E]">Payment Mode:</span>
                  <span className="font-medium text-[#1E1B18] uppercase">{createdOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between border-t border-[#E8E1D5] pt-2">
                  <span className="font-medium text-[#1E1B18]">Total Paid:</span>
                  <span className="font-semibold text-[#8C3A27] tabular-nums">₹{createdOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleClose}
                  className="px-8 py-2.5 bg-[#1E1B18] hover:bg-[#332D28] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Continue Exploring Collections
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
