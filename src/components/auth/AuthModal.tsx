import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, User, Shield, Sparkles, LogOut, Package, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, currentUser, loginAs, logout, setCurrentUser, showNotification } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (isRegister) {
      const newUser = {
        id: `user-${Date.now()}`,
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        phone,
        role: 'customer' as const,
        addresses: [],
        wishlist: [],
        isActive: true,
        createdAt: new Date().toISOString()
      };
      setCurrentUser(newUser);
      showNotification(`Welcome to Sakhi–Saheli, ${newUser.name}!`, 'success');
    } else {
      // Login check
      if (email.includes('admin')) {
        loginAs('admin');
      } else if (email.includes('artisan')) {
        loginAs('artisan');
      } else {
        loginAs('customer');
      }
    }
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsAuthOpen(false)}
        />

        <div className="relative w-full max-w-md bg-[#FAF7F2] border border-[#E8E1D5] shadow-2xl p-6 sm:p-8 z-10">
          <button
            onClick={() => setIsAuthOpen(false)}
            className="absolute top-4 right-4 text-[#5C564E] hover:text-[#1E1B18] p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* If already logged in */}
          {currentUser ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#8C3A27] text-white flex items-center justify-center font-serif text-xl font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#1E1B18]">{currentUser.name}</h3>
                  <p className="text-xs text-[#5C564E]">{currentUser.email}</p>
                  <span className="inline-block mt-1 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#EFE8DC] text-[#8C3A27]">
                    Role: {currentUser.role}
                  </span>
                </div>
              </div>

              {/* Account Quick Links */}
              <div className="border-t border-[#E8E1D5] pt-4 space-y-2 text-xs">
                <Link
                  to="/account"
                  onClick={() => setIsAuthOpen(false)}
                  className="flex items-center gap-2 p-2.5 bg-white border border-[#E8E1D5] hover:border-[#8C3A27] text-[#1E1B18] transition-colors"
                >
                  <Package className="w-4 h-4 text-[#8C3A27]" />
                  <span>My Orders & Delivery Tracking</span>
                </Link>

                <Link
                  to="/account?tab=wishlist"
                  onClick={() => setIsAuthOpen(false)}
                  className="flex items-center gap-2 p-2.5 bg-white border border-[#E8E1D5] hover:border-[#8C3A27] text-[#1E1B18] transition-colors"
                >
                  <Heart className="w-4 h-4 text-[#8C3A27]" />
                  <span>Saved Craft Pieces (Wishlist)</span>
                </Link>

                {currentUser.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsAuthOpen(false)}
                    className="flex items-center gap-2 p-2.5 bg-[#8C3A27]/10 border border-[#8C3A27]/30 hover:border-[#8C3A27] text-[#8C3A27] font-medium transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Curator & Admin Portal</span>
                  </Link>
                )}
              </div>

              {/* Quick Switch Persona for Testing */}
              <div className="border-t border-[#E8E1D5] pt-4">
                <div className="text-[11px] uppercase tracking-wider text-[#5C564E] font-semibold mb-2">
                  Demo Evaluator Switcher:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => loginAs('customer')}
                    className={`py-1.5 px-2 text-[11px] border text-center transition-colors ${
                      currentUser.role === 'customer'
                        ? 'border-[#8C3A27] bg-[#8C3A27] text-white font-medium'
                        : 'border-[#E8E1D5] bg-white text-[#1E1B18]'
                    }`}
                  >
                    Customer
                  </button>
                  <button
                    onClick={() => loginAs('artisan')}
                    className={`py-1.5 px-2 text-[11px] border text-center transition-colors ${
                      currentUser.role === 'artisan'
                        ? 'border-[#8C3A27] bg-[#8C3A27] text-white font-medium'
                        : 'border-[#E8E1D5] bg-white text-[#1E1B18]'
                    }`}
                  >
                    Artisan
                  </button>
                  <button
                    onClick={() => loginAs('admin')}
                    className={`py-1.5 px-2 text-[11px] border text-center transition-colors ${
                      currentUser.role === 'admin'
                        ? 'border-[#8C3A27] bg-[#8C3A27] text-white font-medium'
                        : 'border-[#E8E1D5] bg-white text-[#1E1B18]'
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    logout();
                    setIsAuthOpen(false);
                  }}
                  className="w-full py-2 text-center text-xs text-[#786F64] hover:text-[#8C3A27] transition-colors flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl font-medium text-[#1E1B18]">
                  {isRegister ? 'Join Sakhi–Saheli' : 'Welcome Back'}
                </h3>
                <p className="text-xs text-[#5C564E] mt-1">
                  Connect directly with master women artisans of Bihar
                </p>
              </div>

              {/* Quick Persona Buttons */}
              <div className="mb-6 p-3 bg-[#EFE8DC]/60 border border-[#E8E1D5] text-xs">
                <div className="text-[10px] uppercase tracking-wider text-[#8C3A27] font-semibold mb-2">
                  One-Click Demo Personas:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      loginAs('customer');
                      setIsAuthOpen(false);
                    }}
                    className="py-1.5 px-1 bg-white border border-[#E8E1D5] hover:border-[#8C3A27] text-[11px] text-[#1E1B18] transition-colors"
                  >
                    Customer
                  </button>
                  <button
                    onClick={() => {
                      loginAs('artisan');
                      setIsAuthOpen(false);
                    }}
                    className="py-1.5 px-1 bg-white border border-[#E8E1D5] hover:border-[#8C3A27] text-[11px] text-[#1E1B18] transition-colors"
                  >
                    Sakhi Artisan
                  </button>
                  <button
                    onClick={() => {
                      loginAs('admin');
                      setIsAuthOpen(false);
                    }}
                    className="py-1.5 px-1 bg-white border border-[#E8E1D5] hover:border-[#8C3A27] text-[11px] text-[#1E1B18] transition-colors"
                  >
                    Curator Admin
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {isRegister && (
                  <div>
                    <label className="block text-xs font-medium text-[#1E1B18] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Priya Narayanan"
                      className="w-full bg-white border border-[#E8E1D5] px-3 py-2 text-xs text-[#1E1B18] focus:border-[#8C3A27] focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-[#1E1B18] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-white border border-[#E8E1D5] px-3 py-2 text-xs text-[#1E1B18] focus:border-[#8C3A27] focus:outline-none"
                  />
                </div>

                {isRegister && (
                  <div>
                    <label className="block text-xs font-medium text-[#1E1B18] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98450 12345"
                      className="w-full bg-white border border-[#E8E1D5] px-3 py-2 text-xs text-[#1E1B18] focus:border-[#8C3A27] focus:outline-none"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 mt-2 bg-[#8C3A27] hover:bg-[#A34A35] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  {isRegister ? 'Create Account' : 'Sign In'}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-xs text-[#5C564E] hover:text-[#8C3A27] underline"
                >
                  {isRegister ? 'Already have an account? Sign In' : 'New to Sakhi–Saheli? Create an account'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
