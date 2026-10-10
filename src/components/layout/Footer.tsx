import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showNotification } = useApp();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setSubscribed(true);
      showNotification('Thank you for joining our community.', 'success');
      setEmail('');
    } catch {
      setSubscribed(true);
      showNotification('Thank you for joining our community.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1E1B18] text-[#EFE8DC] pt-16 pb-12 border-t border-[#332D28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#332D28]">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl text-white font-medium">
              Sakhi–Saheli
            </h3>
            <p className="text-sm text-[#A89F91] leading-relaxed max-w-md">
              A contemporary digital design house connecting rural women artisans from Bihar with modern homes. Not charity—craftsmanship, dignity, and economic sovereignty.
            </p>
            <div className="pt-2 text-xs text-[#C78D3B] font-medium tracking-wider uppercase">
              Hunar Se Bazaar Tak · From Her Hands to Your Home
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="max-w-md lg:ml-auto w-full">
              <h4 className="font-serif text-lg text-white mb-2">
                Stories, Crafts & Seasonal Drops
              </h4>
              <p className="text-xs text-[#A89F91] mb-4">
                Receive occasional dispatches from our village ateliers, craft histories, and early invitations to exhibitions.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm text-[#C78D3B] py-2">
                  <Check className="w-4 h-4" />
                  <span>You are subscribed to the Sakhi–Saheli journal.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-[#2B2622] border border-[#443D36] text-white placeholder-[#786F64] text-xs px-4 py-2.5 rounded-none focus:outline-none focus:border-[#C78D3B]"
                  />
                  <button
                    type="submit"
                    className="bg-[#8C3A27] hover:bg-[#A34A35] text-white px-5 py-2.5 text-xs font-medium tracking-wide transition-colors flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs text-[#A89F91]">
          {/* Shop */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm text-white uppercase tracking-wider">Collection</h5>
            <ul className="space-y-2">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Pieces</Link></li>
              <li><Link to="/shop?category=living-decor" className="hover:text-white transition-colors">Living & Decor</Link></li>
              <li><Link to="/shop?category=textiles-furnishings" className="hover:text-white transition-colors">Textiles & Throws</Link></li>
              <li><Link to="/shop?category=art-wall-panels" className="hover:text-white transition-colors">Art & Wall Panels</Link></li>
              <li><Link to="/shop?category=dining-entertaining" className="hover:text-white transition-colors">Dining & Entertaining</Link></li>
              <li><Link to="/shop?bestseller=true" className="hover:text-white transition-colors">Bestsellers</Link></li>
            </ul>
          </div>

          {/* Discover */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm text-white uppercase tracking-wider">Discover</h5>
            <ul className="space-y-2">
              <li><Link to="/artisans" className="hover:text-white transition-colors">Our Sakhis (Artisans)</Link></li>
              <li><Link to="/crafts" className="hover:text-white transition-colors">Crafts of Bihar</Link></li>
              <li><Link to="/crafts/sikki-grass" className="hover:text-white transition-colors">Sikki Grass Weaving</Link></li>
              <li><Link to="/crafts/sujuni-embroidery" className="hover:text-white transition-colors">Sujuni Needlework</Link></li>
              <li><Link to="/stories" className="hover:text-white transition-colors">Editorial Stories</Link></li>
              <li><Link to="/exhibitions" className="hover:text-white transition-colors">Exhibitions & Fairs</Link></li>
            </ul>
          </div>

          {/* About & B2B */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm text-white uppercase tracking-wider">Collaborations</h5>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Philosophy</Link></li>
              <li><Link to="/our-approach" className="hover:text-white transition-colors">Our 4-Step Approach</Link></li>
              <li><Link to="/contact?type=corporate" className="hover:text-white transition-colors">Corporate & Festive Gifting</Link></li>
              <li><Link to="/contact?type=retailer" className="hover:text-white transition-colors">B2B & Retail Partnerships</Link></li>
              <li><Link to="/contact?type=artisan" className="hover:text-white transition-colors">Artisan Collective Inquiries</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Ateliers & Contact</Link></li>
            </ul>
          </div>

          {/* Support & Policies */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm text-white uppercase tracking-wider">Customer Care</h5>
            <ul className="space-y-2">
              <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/return-policy" className="hover:text-white transition-colors">Returns & Craft Care</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Track Your Order</Link></li>
            </ul>
          </div>
        </div>

        {/* Quiet Bottom Bar */}
        <div className="pt-8 border-t border-[#332D28] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#786F64] gap-4">
          <div>
            © {new Date().getFullYear()} Sakhi–Saheli Craft Initiative. All rights reserved. Registered under Section 8, Bihar, India.
          </div>
          <div className="flex items-center gap-4">
            <span>Patna · Madhubani · Muzaffarpur · New Delhi</span>
            <span aria-hidden="true">·</span>
            <Link to="/admin" className="hover:text-[#A89F91]">Curator Console</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
