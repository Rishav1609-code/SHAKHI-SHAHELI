import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Package, Heart, MapPin, User, LogOut, CheckCircle, Truck, Clock, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS_DATA } from '../data/seedData';
import { CraftImage } from '../components/common/CraftImage';

export const AccountPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'orders';

  const {
    currentUser,
    orders,
    wishlist,
    removeFromCart,
    addToCart,
    toggleWishlist,
    logout,
    loginAs,
    setIsAuthOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>(initialTab);

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 bg-white border border-[#E8E1D5] text-center space-y-4">
        <h2 className="font-serif text-2xl text-[#1E1B18]">Patron Account</h2>
        <p className="text-xs text-[#5C564E]">
          Sign in to view your orders, delivery tracking, and saved craft pieces.
        </p>
        <button
          onClick={() => setIsAuthOpen(true)}
          className="w-full py-2.5 bg-[#8C3A27] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#A34A35]"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const savedProducts = PRODUCTS_DATA.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Profile Header */}
      <div className="border border-[#E8E1D5] bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#8C3A27] text-white flex items-center justify-center font-serif text-2xl font-bold">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#1E1B18] font-medium">
              {currentUser.name}
            </h1>
            <p className="text-xs text-[#5C564E]">{currentUser.email} · {currentUser.phone || '+91 98450 12345'}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#EFE8DC] text-[#8C3A27]">
                Role: {currentUser.role}
              </span>
              {currentUser.role === 'admin' && (
                <Link to="/admin" className="text-xs text-[#8C3A27] underline font-medium">
                  Go to Curator Console →
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Quick Evaluator Role Switcher */}
        <div className="flex flex-col sm:items-end gap-2 text-xs">
          <span className="text-[10px] uppercase tracking-wider text-[#786F64] font-semibold">
            Switch Test Role:
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => loginAs('customer')}
              className={`px-3 py-1 border text-[11px] ${currentUser.role === 'customer' ? 'bg-[#8C3A27] text-white border-[#8C3A27]' : 'bg-[#FAF7F2] border-[#E8E1D5]'}`}
            >
              Customer
            </button>
            <button
              onClick={() => loginAs('artisan')}
              className={`px-3 py-1 border text-[11px] ${currentUser.role === 'artisan' ? 'bg-[#8C3A27] text-white border-[#8C3A27]' : 'bg-[#FAF7F2] border-[#E8E1D5]'}`}
            >
              Artisan
            </button>
            <button
              onClick={() => loginAs('admin')}
              className={`px-3 py-1 border text-[11px] ${currentUser.role === 'admin' ? 'bg-[#8C3A27] text-white border-[#8C3A27]' : 'bg-[#FAF7F2] border-[#E8E1D5]'}`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8E1D5] gap-8 text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 transition-colors relative flex items-center gap-2 ${
            activeTab === 'orders' ? 'text-[#8C3A27]' : 'text-[#5C564E] hover:text-[#1E1B18]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
          {activeTab === 'orders' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8C3A27]" />}
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 transition-colors relative flex items-center gap-2 ${
            activeTab === 'wishlist' ? 'text-[#8C3A27]' : 'text-[#5C564E] hover:text-[#1E1B18]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Pieces ({savedProducts.length})</span>
          {activeTab === 'wishlist' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8C3A27]" />}
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 transition-colors relative flex items-center gap-2 ${
            activeTab === 'addresses' ? 'text-[#8C3A27]' : 'text-[#5C564E] hover:text-[#1E1B18]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Shipping Addresses</span>
          {activeTab === 'addresses' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8C3A27]" />}
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#E8E1D5] space-y-3">
              <p className="font-serif text-lg text-[#1E1B18]">No orders found</p>
              <p className="text-xs text-[#5C564E]">You haven’t ordered any handcrafted pieces yet.</p>
              <Link
                to="/shop"
                className="inline-block mt-2 px-6 py-2 bg-[#8C3A27] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="border border-[#E8E1D5] bg-white p-6 space-y-6">
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-4 text-xs">
                  <div>
                    <span className="text-[#8C3A27] font-semibold text-[11px] uppercase tracking-wider block">
                      Order Reference
                    </span>
                    <span className="font-serif text-lg font-medium text-[#1E1B18]">{order.orderNumber}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-[#5C564E]">
                    <div>
                      <span className="block text-[#786F64]">Order Date:</span>
                      <span className="font-medium text-[#1E1B18]">{new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="block text-[#786F64]">Total Amount:</span>
                      <span className="font-semibold text-[#1E1B18] tabular-nums">₹{order.total.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="block text-[#786F64]">Status:</span>
                      <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                        order.orderStatus === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-[#EFE8DC] text-[#8C3A27]'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tracking Stepper */}
                <div className="bg-[#FAF7F2] p-4 border border-[#E8E1D5] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#1E1B18] flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#8C3A27]" />
                      <span>Insured Courier: <strong className="font-mono">{order.trackingNumber}</strong></span>
                    </span>
                    <span className="text-[#5C564E]">
                      Estimated Delivery: <strong className="text-[#1E1B18]">{order.estimatedDelivery}</strong>
                    </span>
                  </div>

                  {/* Visual Stepper */}
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] pt-2">
                    <div className="space-y-1">
                      <div className="h-1.5 bg-[#8C3A27] rounded-full" />
                      <span className="text-[#8C3A27] font-semibold">1. Confirmed</span>
                    </div>
                    <div className="space-y-1">
                      <div className={`h-1.5 rounded-full ${order.orderStatus !== 'pending' ? 'bg-[#8C3A27]' : 'bg-[#E8E1D5]'}`} />
                      <span className={order.orderStatus !== 'pending' ? 'text-[#8C3A27] font-semibold' : 'text-[#786F64]'}>
                        2. In Crafting
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className={`h-1.5 rounded-full ${order.orderStatus === 'shipped' || order.orderStatus === 'delivered' ? 'bg-[#8C3A27]' : 'bg-[#E8E1D5]'}`} />
                      <span className={order.orderStatus === 'shipped' || order.orderStatus === 'delivered' ? 'text-[#8C3A27] font-semibold' : 'text-[#786F64]'}>
                        3. Shipped
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className={`h-1.5 rounded-full ${order.orderStatus === 'delivered' ? 'bg-[#8C3A27]' : 'bg-[#E8E1D5]'}`} />
                      <span className={order.orderStatus === 'delivered' ? 'text-[#8C3A27] font-semibold' : 'text-[#786F64]'}>
                        4. Delivered
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items in order */}
                <div className="divide-y divide-[#E8E1D5]">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center gap-4">
                      <div className="w-16 h-20 shrink-0 border border-[#E8E1D5] overflow-hidden">
                        <CraftImage
                          src={item.productImage}
                          alt={item.productName}
                          aspectRatio="3:4"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <h4 className="font-serif text-base font-medium text-[#1E1B18] truncate">
                          {item.productName}
                        </h4>
                        <p className="text-[#5C564E]">
                          By {item.artisanName} · {item.craft}
                        </p>
                        <span className="text-[#786F64] text-[11px] block mt-0.5">
                          Quantity: {item.quantity} · Price: ₹{item.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-right text-xs font-semibold tabular-nums text-[#1E1B18]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div>
          {savedProducts.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#E8E1D5] space-y-3">
              <p className="font-serif text-lg text-[#1E1B18]">No saved pieces</p>
              <p className="text-xs text-[#5C564E]">Click the heart icon on any craft product to save it here.</p>
              <Link
                to="/shop"
                className="inline-block mt-2 px-6 py-2 bg-[#8C3A27] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Browse Catalog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {savedProducts.map(product => (
                <div key={product.id} className="border border-[#E8E1D5] bg-white p-4 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="overflow-hidden bg-[#F5EFE6]">
                      <CraftImage
                        src={product.images[0]}
                        alt={product.name}
                        aspectRatio="4:3"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="pt-3 text-xs">
                      <span className="text-[11px] text-[#8C3A27] font-semibold">{product.craft}</span>
                      <h4 className="font-serif text-base text-[#1E1B18] font-medium line-clamp-1">{product.name}</h4>
                      <span className="font-semibold text-sm tabular-nums text-[#1E1B18] mt-1 block">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E8E1D5] flex gap-2">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="flex-1 py-2 bg-[#8C3A27] hover:bg-[#A34A35] text-white text-xs font-semibold uppercase tracking-wider"
                    >
                      Add to Bag
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="px-3 py-2 border border-[#E8E1D5] text-xs text-[#786F64] hover:text-[#8C3A27]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Addresses */}
      {activeTab === 'addresses' && (
        <div className="max-w-xl bg-white border border-[#E8E1D5] p-6 space-y-4 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-[#E8E1D5]">
            <h3 className="font-serif text-lg text-[#1E1B18] font-medium">Primary Shipping Address</h3>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#EFE8DC] text-[#8C3A27]">
              Default
            </span>
          </div>

          <div className="space-y-1 text-[#5C564E]">
            <p className="font-semibold text-[#1E1B18] text-sm">{currentUser.name}</p>
            <p>42, 4th Main, Defense Colony, Indiranagar</p>
            <p>Bengaluru, Karnataka – 560038</p>
            <p>India · Phone: {currentUser.phone || '+91 98450 12345'}</p>
          </div>

          <p className="text-[11px] text-[#786F64] pt-2">
            Address used for insured white-glove packaging directly from Bihar craft clusters.
          </p>
        </div>
      )}
    </div>
  );
};
