import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User as UserIcon, Menu, X, Shield, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { cartCount, setIsCartOpen, setIsSearchOpen, setIsAuthOpen, currentUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Our Sakhis', href: '/artisans' },
    { label: 'Crafts', href: '/crafts' },
    { label: 'Stories', href: '/stories' },
    { label: 'Exhibitions', href: '/exhibitions' },
    { label: 'About', href: '/about' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1D5]">
      {/* Slim Promotional Trust Bar */}
      {!bannerDismissed && (
        <div className="bg-[#201D1A] text-[#FAF7F2] text-[11px] font-medium tracking-wide py-1.5 px-4 flex items-center justify-between">
          <div className="mx-auto flex items-center gap-3">
            <span>Direct artisan price sovereignty</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>Free insured shipping across India on orders over ₹3,000</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="text-[#DFAB5E]">Hunar Se Bazaar Tak</span>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            className="text-stone-400 hover:text-white text-xs px-1"
            aria-label="Dismiss banner"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Navigation: 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single element in display serif) */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1E1B18] hover:text-[#8C3A27] transition-colors"
          >
            Sakhi–Saheli
          </Link>
        </div>

        {/* Zone 2: 4-6 Clean Text Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C564E]">
          {navLinks.map(link => {
            const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`transition-colors whitespace-nowrap hover:text-[#1E1B18] relative py-1 ${
                  isActive ? 'text-[#8C3A27] font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#8C3A27]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#5C564E] hover:text-[#1E1B18] transition-colors"
            aria-label="Search collection and crafts"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* User Account Button */}
          <button
            onClick={() => setIsAuthOpen(true)}
            className="p-2 text-[#5C564E] hover:text-[#1E1B18] transition-colors relative flex items-center gap-1.5"
            aria-label="Account details"
          >
            <UserIcon className="w-5 h-5" />
            {currentUser && (
              <span className="hidden xl:inline text-xs font-medium text-[#1E1B18] max-w-[90px] truncate">
                {currentUser.name.split(' ')[0]}
              </span>
            )}
            {currentUser?.role === 'admin' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#8C3A27]" title="Admin logged in" />
            )}
          </button>

          {/* Cart Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-[#EFE8DC]/80 hover:bg-[#EFE8DC] text-[#1E1B18] transition-colors text-xs font-medium"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-[#8C3A27]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-semibold">({cartCount})</span>
          </button>

          {/* Admin link shortcut if logged in as admin */}
          {currentUser?.role === 'admin' && (
            <Link
              to="/admin"
              className="hidden lg:flex items-center gap-1 text-xs text-[#8C3A27] hover:underline font-medium border-l border-[#E8E1D5] pl-3"
            >
              <Shield className="w-3.5 h-3.5" />
              Portal
            </Link>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1E1B18] md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E1D5] bg-[#FAF7F2] px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif text-[#1E1B18] hover:text-[#8C3A27] py-1 border-b border-[#E8E1D5]/60"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-between text-xs text-[#5C564E]">
            <Link
              to="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#1E1B18] font-medium"
            >
              My Account
            </Link>
            <Link
              to="/our-approach"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#1E1B18] font-medium"
            >
              Our Approach
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#1E1B18] font-medium"
            >
              B2B / Gifting
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
