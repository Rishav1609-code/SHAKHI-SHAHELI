import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, HelpCircle, FileText } from 'lucide-react';

export const PoliciesPage: React.FC = () => {
  const location = useLocation();

  const getInitialTab = () => {
    if (location.pathname.includes('return')) return 'returns';
    if (location.pathname.includes('privacy')) return 'privacy';
    if (location.pathname.includes('terms')) return 'terms';
    if (location.pathname.includes('faq')) return 'faq';
    return 'shipping';
  };

  const [activeTab, setActiveTab] = useState<string>(getInitialTab());

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-[#E8E1D5] pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
          Customer Care & Transparency
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-medium">
          Policies & Frequently Asked Questions
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8E1D5] gap-6 text-xs font-semibold uppercase tracking-wider overflow-x-auto pb-2">
        {[
          { id: 'shipping', label: 'Shipping & Delivery' },
          { id: 'returns', label: 'Returns & Craft Care' },
          { id: 'faq', label: 'Frequently Asked Questions' },
          { id: 'privacy', label: 'Privacy Policy' },
          { id: 'terms', label: 'Terms of Service' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`pb-2 whitespace-nowrap transition-colors relative ${
              activeTab === t.id ? 'text-[#8C3A27]' : 'text-[#5C564E] hover:text-[#1E1B18]'
            }`}
          >
            {t.label}
            {activeTab === t.id && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8C3A27]" />}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-[#E8E1D5] p-6 sm:p-10 text-xs sm:text-sm text-[#5C564E] leading-relaxed space-y-6">
        {activeTab === 'shipping' && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-[#1E1B18] font-medium">Insured Craft Transit Policy</h3>
            <p>
              Each piece originates in rural workshops across Madhubani, Muzaffarpur, Bhagalpur, and Nalanda. After initial quality inspection at our Patna facilitation center, items are packaged in shock-resistant wooden and recycled honeycomb materials to ensure fragile natural fibers arrive in immaculate condition.
            </p>
            <div className="p-4 bg-[#FAF7F2] border border-[#E8E1D5] space-y-2">
              <strong className="text-[#1E1B18] block">Standard Delivery Timelines:</strong>
              <p>• Ready-to-ship cataloged pieces: 4 to 7 business days across metro cities in India.</p>
              <p>• Made-to-order bespoke or customized pieces: 14 to 21 business days (allowing master makers necessary curing and handwork time).</p>
              <p>• Free shipping applies automatically to all domestic orders over ₹3,000.</p>
            </div>
            <p>
              International shipping is dispatched via DHL Express with full transit insurance. Customs duties vary by country of destination.
            </p>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-[#1E1B18] font-medium">Authenticity & Exchange Guidelines</h3>
            <p>
              Because our pieces are handcrafted using natural, sun-cured plant fibers and handspun yarns, slight organic variations in weave tension, reed tone, and block alignment are natural hallmarks of authentic human craftsmanship—not defects.
            </p>
            <div className="p-4 bg-[#FAF7F2] border border-[#E8E1D5] space-y-2">
              <strong className="text-[#1E1B18] block">7-Day Transit Guarantee:</strong>
              <p>• If an item arrives structurally compromised or damaged in transit, notify us within 7 days of delivery with an unboxing photograph.</p>
              <p>• We will promptly arrange a pickup and provide either a replacement crafted by the same maker or a full refund.</p>
              <p>• Direct artisan payments are never clawed back for transit damages; Sakhi–Saheli absorbs operational risks directly.</p>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-[#1E1B18] font-medium">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="border-b border-[#E8E1D5] pb-3">
                <h4 className="font-serif text-base text-[#1E1B18] font-medium">Are these products 100% handmade?</h4>
                <p className="mt-1">Yes. No powerlooms, industrial injection molds, or synthetic screen-printing are used. Every piece is sculpted, woven, or embroidered by rural women artisans in Bihar.</p>
              </div>
              <div className="border-b border-[#E8E1D5] pb-3">
                <h4 className="font-serif text-base text-[#1E1B18] font-medium">How do the artisans receive payment?</h4>
                <p className="mt-1">Over 65% of customer retail proceeds are routed directly into the artisans’ independent bank accounts. Sakhis receive 50% advance before starting work, ensuring complete financial dignity.</p>
              </div>
              <div className="border-b border-[#E8E1D5] pb-3">
                <h4 className="font-serif text-base text-[#1E1B18] font-medium">Can I request custom dimensions or corporate gifting?</h4>
                <p className="mt-1">Yes! We frequently design custom collections for residences, boutique hotels, and corporate events. Contact our team via the B2B inquiry form or write to patna.atelier@sakhisaheli.org.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-[#1E1B18] font-medium">Patron Privacy Policy</h3>
            <p>
              Sakhi–Saheli strictly respects your privacy. We collect customer information (name, address, telephone, email) exclusively for processing insured courier delivery and order fulfillment. We never monetize, sell, or disclose your personal data to third-party advertising brokers.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-[#1E1B18] font-medium">Terms of Cultural Service</h3>
            <p>
              All craft intellectual property, traditional motifs, and photographic storytelling featured on Sakhi–Saheli belong to the respective artisan collectives of Bihar and Sakhi–Saheli Section 8 Foundation. Unauthorized commercial reproduction of our artisans’ copyrighted designs is prohibited.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
