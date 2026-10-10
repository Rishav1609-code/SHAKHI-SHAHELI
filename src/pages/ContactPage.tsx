import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, CheckCircle, Send, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialType = (searchParams.get('type') as any) || 'customer';

  const { showNotification } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState<string>(initialType);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message, type })
      });
      setSubmitted(true);
      showNotification('Your inquiry has been received. Our team will connect with you within 24 hours.', 'success');
    } catch {
      setSubmitted(true);
      showNotification('Your inquiry has been received. Our team will connect with you within 24 hours.', 'success');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="border-b border-[#E8E1D5] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
          Connect With Us
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1E1B18] font-normal tracking-tight">
          Ateliers & Inquiries
        </h1>
        <p className="text-sm sm:text-base text-[#5C564E] max-w-2xl leading-relaxed">
          Whether you are a customer, an architect seeking custom commissions, an organization planning bespoke gifting, or a craft collective in Bihar—we welcome your note.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info Left */}
        <div className="lg:col-span-5 space-y-8">
          {/* Atelier Cards */}
          <div className="p-6 bg-white border border-[#E8E1D5] space-y-4 text-xs text-[#5C564E]">
            <span className="text-[11px] uppercase tracking-wider text-[#8C3A27] font-semibold block">
              Bihar Central Atelier
            </span>
            <div className="space-y-1 text-[#1E1B18]">
              <h4 className="font-serif text-lg font-medium">Sakhi–Saheli Craft Center</h4>
              <p>Plot 14, Bailey Road Industrial Area, Patna, Bihar 800001</p>
            </div>
            <div className="pt-2 border-t border-[#E8E1D5] space-y-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8C3A27]" />
                <span>+91 612 254 9912 / +91 94312 88776</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8C3A27]" />
                <span>patna.atelier@sakhisaheli.org</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-[#E8E1D5] space-y-4 text-xs text-[#5C564E]">
            <span className="text-[11px] uppercase tracking-wider text-[#8C3A27] font-semibold block">
              New Delhi Design & Curation Studio
            </span>
            <div className="space-y-1 text-[#1E1B18]">
              <h4 className="font-serif text-lg font-medium">Curatorial Office</h4>
              <p>Studio 204, Shahpur Jat Design Village, New Delhi 110049</p>
            </div>
            <div className="pt-2 border-t border-[#E8E1D5] space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8C3A27]" />
                <span>delhi.studio@sakhisaheli.org</span>
              </div>
            </div>
          </div>

          {/* Corporate note */}
          <div className="p-6 bg-[#EFE8DC]/60 border border-[#E8E1D5] space-y-2 text-xs text-[#5C564E]">
            <div className="flex items-center gap-2 text-[#1E1B18] font-medium">
              <Shield className="w-4 h-4 text-[#8C3A27]" />
              <span>Corporate & Bulk Gifting Timeline</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              For festive orders over 100 units, we recommend a 3-week lead time to allow our master artisans in Madhubani and Muzaffarpur to hand-weave and pack your pieces.
            </p>
          </div>
        </div>

        {/* Inquiry Form Right */}
        <div className="lg:col-span-7 bg-white border border-[#E8E1D5] p-6 sm:p-10">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#8C3A27]/10 flex items-center justify-center text-[#8C3A27]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-[#1E1B18] font-medium">Inquiry Dispatched</h3>
              <p className="text-xs text-[#5C564E] max-w-md mx-auto leading-relaxed">
                Thank you, {name}. Your message has been routed to our curation team and relevant artisan collective in Bihar. We will respond promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 border border-[#1E1B18] text-xs font-semibold uppercase tracking-wider hover:bg-[#1E1B18] hover:text-white transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-serif text-2xl text-[#1E1B18] font-medium pb-2 border-b border-[#E8E1D5]">
                Send an Inquiry
              </h3>

              <div>
                <label className="block text-[#1E1B18] font-medium mb-1.5">
                  Nature of Inquiry *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'customer', label: 'Customer Order' },
                    { id: 'corporate', label: 'Corporate Gifting' },
                    { id: 'retailer', label: 'B2B / Retailer' },
                    { id: 'exhibition', label: 'Exhibitions & Press' },
                    { id: 'artisan', label: 'Artisan Collective' },
                    { id: 'collaboration', label: 'Design Collab' }
                  ].map(t => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setType(t.id)}
                      className={`p-2 text-[11px] border text-left transition-colors ${
                        type === t.id
                          ? 'border-[#8C3A27] bg-[#8C3A27] text-white font-medium'
                          : 'border-[#E8E1D5] bg-[#FAF7F2] text-[#1E1B18] hover:border-[#8C3A27]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[#1E1B18] font-medium mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Anandita Sen"
                    className="w-full bg-[#FAF7F2] border border-[#E8E1D5] px-3.5 py-2.5 text-xs text-[#1E1B18] focus:border-[#8C3A27] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#1E1B18] font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-[#FAF7F2] border border-[#E8E1D5] px-3.5 py-2.5 text-xs text-[#1E1B18] focus:border-[#8C3A27] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1E1B18] font-medium mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98000 12345"
                    className="w-full bg-[#FAF7F2] border border-[#E8E1D5] px-3.5 py-2.5 text-xs text-[#1E1B18] focus:border-[#8C3A27] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#1E1B18] font-medium mb-1">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="e.g. 200 Bespoke Sikki Gift Sets"
                    className="w-full bg-[#FAF7F2] border border-[#E8E1D5] px-3.5 py-2.5 text-xs text-[#1E1B18] focus:border-[#8C3A27] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#1E1B18] font-medium mb-1">Message Details *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Share quantity, preferred craft materials, target dates, or custom monogram requirements..."
                  className="w-full bg-[#FAF7F2] border border-[#E8E1D5] px-3.5 py-2.5 text-xs text-[#1E1B18] focus:border-[#8C3A27] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#8C3A27] hover:bg-[#A34A35] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Transmitting...' : 'Submit Inquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
