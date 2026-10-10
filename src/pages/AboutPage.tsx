import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import { CraftImage } from '../components/common/CraftImage';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      {/* Hero */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
          About Sakhi–Saheli
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1E1B18] font-normal tracking-tight leading-tight">
          Hunar Se Bazaar Tak. <br />
          <span className="italic text-[#8C3A27]">From Her Hands to Your Home.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#5C564E] leading-relaxed">
          Sakhi–Saheli is a contemporary digital design platform and craft house connecting rural women artisans from Bihar with modern homes around the world.
        </p>
      </div>

      {/* The Core Manifesto: Not Charity */}
      <div className="border border-[#E8E1D5] bg-white p-8 sm:p-14 space-y-8">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
            Our First Principle
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-medium">
            This is Not Charity. This is Craftsmanship.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#5C564E] leading-relaxed">
          <div className="space-y-4">
            <p>
              For decades, rural Indian artisans have been presented through a lens of paternalistic sympathy—as "poor village women" needing donations. We firmly reject this paradigm.
            </p>
            <p>
              The women of Mithila, Muzaffarpur, Bhagalpur, and Nalanda are master practitioners of living arts with millennia of heritage. They possess intellectual property, mathematical precision, botanical chemistry knowledge, and design ingenuity that industrial machines can never imitate.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              Sakhi–Saheli positions our makers as what they truly are: designers, creators, entrepreneurs, and equal partners. They set their own piece rates, receive immediate advances, and retain credit and storytelling rights on every item that leaves their courtyards.
            </p>
            <p>
              When you purchase a piece from Sakhi–Saheli, you are not making a philanthropic gesture; you are investing in an authentic, museum-grade object designed for contemporary living.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-[#FAF7F2] border border-[#E8E1D5] space-y-3">
          <span className="text-xs uppercase tracking-wider text-[#8C3A27] font-semibold block">01 · Material Honesty</span>
          <h3 className="font-serif text-xl text-[#1E1B18] font-medium">Ecological Provenance</h3>
          <p className="text-xs text-[#5C564E] leading-relaxed">
            Wild monsoon Sikki grass, unbleached handloom khadi, forest-harvested non-violent Tussar silk cocoons, and botanical dyes derived from turmeric, indigo, and madder root. Zero synthetic shortcuts.
          </p>
        </div>

        <div className="p-8 bg-[#FAF7F2] border border-[#E8E1D5] space-y-3">
          <span className="text-xs uppercase tracking-wider text-[#8C3A27] font-semibold block">02 · Design Evolution</span>
          <h3 className="font-serif text-xl text-[#1E1B18] font-medium">Relevant Contemporary Scale</h3>
          <p className="text-xs text-[#5C564E] leading-relaxed">
            We collaborate on forms, proportions, and hardware so that traditional skills translate seamlessly into modern interior luminaires, minimalist tableware, and architectural linens.
          </p>
        </div>

        <div className="p-8 bg-[#FAF7F2] border border-[#E8E1D5] space-y-3">
          <span className="text-xs uppercase tracking-wider text-[#8C3A27] font-semibold block">03 · Economic Sovereignty</span>
          <h3 className="font-serif text-xl text-[#1E1B18] font-medium">Fair & Transparent Compensation</h3>
          <p className="text-xs text-[#5C564E] leading-relaxed">
            Over 65% of customer price flows directly to the artisan and local collective materials fund, paid directly into women’s bank accounts before products are shipped.
          </p>
        </div>
      </div>

      {/* Ateliers & Field Presence */}
      <div className="p-8 sm:p-12 bg-[#1E1B18] text-[#EFE8DC] space-y-6">
        <div className="max-w-xl space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#DFAB5E] font-semibold">
            On the Ground
          </span>
          <h2 className="font-serif text-3xl text-white font-normal">
            Ateliers in Bihar & Design Studio in New Delhi
          </h2>
          <p className="text-xs text-[#A89F91] leading-relaxed">
            We operate craft facilitation centers in Madhubani, Muzaffarpur, and Patna, working directly with self-help groups (SHGs) and master awardees.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link
            to="/artisans"
            className="px-6 py-3 bg-[#8C3A27] hover:bg-[#A34A35] text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
          >
            <span>Meet Our Sakhis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/our-approach"
            className="px-6 py-3 bg-transparent border border-white/20 hover:border-white text-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Our 4-Step Methodology
          </Link>
        </div>
      </div>
    </div>
  );
};
