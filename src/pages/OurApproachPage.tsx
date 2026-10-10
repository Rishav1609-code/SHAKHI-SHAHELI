import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, DollarSign, Layers } from 'lucide-react';

export const OurApproachPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4 border-b border-[#E8E1D5] pb-8">
        <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
          Design Methodology
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1E1B18] font-normal tracking-tight">
          Our Four-Step Approach
        </h1>
        <p className="text-base sm:text-lg text-[#5C564E] leading-relaxed">
          How Sakhi–Saheli collaborates with rural women artisans from Bihar to transform vernacular skills into globally competitive design objects.
        </p>
      </div>

      {/* 4 Steps in Detail */}
      <div className="space-y-12">
        {/* Step 1 */}
        <div className="p-8 sm:p-12 bg-white border border-[#E8E1D5] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3">
            <span className="font-serif text-5xl font-light text-[#8C3A27]">01</span>
            <span className="block text-xs uppercase tracking-widest text-[#5C564E] font-semibold mt-1">Phase One</span>
            <h3 className="font-serif text-2xl text-[#1E1B18] font-medium mt-1">Discover</h3>
          </div>
          <div className="lg:col-span-9 space-y-3 text-xs sm:text-sm text-[#5C564E] leading-relaxed">
            <p>
              We listen first. We spend weeks in village courtyards in Ranti, Jitwarpur, Bhusra, and Nepura, mapping existing hand skills, seasonal agricultural cycles, and domestic workloads.
            </p>
            <p>
              We do not force women into urban factory shifts. Instead, we structure production around their natural daily rhythms—working in breezy shaded verandas after morning household duties.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#1E1B18] font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#8C3A27]" /> Skill mapping & inventory</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#8C3A27]" /> Indigenous raw material audit</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#8C3A27]" /> Community consensus & trust</span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-8 sm:p-12 bg-white border border-[#E8E1D5] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3">
            <span className="font-serif text-5xl font-light text-[#8C3A27]">02</span>
            <span className="block text-xs uppercase tracking-widest text-[#5C564E] font-semibold mt-1">Phase Two</span>
            <h3 className="font-serif text-2xl text-[#1E1B18] font-medium mt-1">Develop</h3>
          </div>
          <div className="lg:col-span-9 space-y-3 text-xs sm:text-sm text-[#5C564E] leading-relaxed">
            <p>
              Design co-creation workshops: Product designers from premier institutes (NID, NIFT) collaborate directly with master craftswomen.
            </p>
            <p>
              Together, we adapt forms to modern living: enlarging a ritual Sikki grass betel-nut box into a dining sourdough bread basket or sculptural luminaire shade; calibrating Sujuni running-stitches onto neutral organic khadi cushions; developing certified CE/UL brass fittings for lighting.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#1E1B18] font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#8C3A27]" /> 1:1 prototyping & mockups</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#8C3A27]" /> Colorfastness & structural testing</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#8C3A27]" /> Ergonomic urban adaptability</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-8 sm:p-12 bg-white border border-[#E8E1D5] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3">
            <span className="font-serif text-5xl font-light text-[#8C3A27]">03</span>
            <span className="block text-xs uppercase tracking-widest text-[#5C564E] font-semibold mt-1">Phase Three</span>
            <h3 className="font-serif text-2xl text-[#1E1B18] font-medium mt-1">Create</h3>
          </div>
          <div className="lg:col-span-9 space-y-3 text-xs sm:text-sm text-[#5C564E] leading-relaxed">
            <p>
              Artisans hand-make each piece in their villages. We supply premium base materials (organic GOTS khadi, wild harvested Sikki, certified non-violent Tussar silk yarn) upfront so no woman carries financial debt.
            </p>
            <p>
              Women are paid 50% advance upon commencement, and the remaining 50% upon quality handoff—never having to wait months for customer sales.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#1E1B18] font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#8C3A27]" /> Direct bank account transfers</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#8C3A27]" /> Zero artisan debt burden</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#8C3A27]" /> Quality grading by senior sakhis</span>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="p-8 sm:p-12 bg-white border border-[#E8E1D5] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3">
            <span className="font-serif text-5xl font-light text-[#8C3A27]">04</span>
            <span className="block text-xs uppercase tracking-widest text-[#5C564E] font-semibold mt-1">Phase Four</span>
            <h3 className="font-serif text-2xl text-[#1E1B18] font-medium mt-1">Connect</h3>
          </div>
          <div className="lg:col-span-9 space-y-3 text-xs sm:text-sm text-[#5C564E] leading-relaxed">
            <p>
              We provide the missing link: premium branding, museum curation, professional product photography, climate-conscious insured packaging, and access to national and international markets.
            </p>
            <p>
              From India Habitat Centre in New Delhi to boutique interior architects in Mumbai and global collectors, we champion Bihar craft at the highest level.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#1E1B18] font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#8C3A27]" /> Curated digital marketplace</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#8C3A27]" /> Design fairs & gallery exhibitions</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#8C3A27]" /> Custom B2B & corporate gifting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Pricing Breakdown */}
      <div className="p-8 sm:p-12 bg-[#FAF7F2] border border-[#E8E1D5] space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
            Radical Transparency
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1B18]">
            Where Does Your Money Go?
          </h2>
          <p className="text-xs text-[#5C564E]">
            We operate as a fair craft enterprise. Here is the approximate allocation of every ₹100 spent on Sakhi–Saheli:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-5 bg-white border border-[#E8E1D5] space-y-1">
            <span className="font-serif text-3xl font-bold text-[#8C3A27] tabular-nums">52%</span>
            <h4 className="font-semibold text-[#1E1B18]">Artisan Labor & Time</h4>
            <p className="text-[#5C564E] text-[11px]">Direct compensation set and earned by the craftswoman.</p>
          </div>

          <div className="p-5 bg-white border border-[#E8E1D5] space-y-1">
            <span className="font-serif text-3xl font-bold text-[#8C3A27] tabular-nums">18%</span>
            <h4 className="font-semibold text-[#1E1B18]">Raw Materials</h4>
            <p className="text-[#5C564E] text-[11px]">Wild Sikki, organic khadi, natural plant dyes, and brass fittings.</p>
          </div>

          <div className="p-5 bg-white border border-[#E8E1D5] space-y-1">
            <span className="font-serif text-3xl font-bold text-[#8C3A27] tabular-nums">16%</span>
            <h4 className="font-semibold text-[#1E1B18]">Logistics & Packaging</h4>
            <p className="text-[#5C564E] text-[11px]">Village pickup, insured transit, and wooden-reinforced packaging.</p>
          </div>

          <div className="p-5 bg-white border border-[#E8E1D5] space-y-1">
            <span className="font-serif text-3xl font-bold text-[#8C3A27] tabular-nums">14%</span>
            <h4 className="font-semibold text-[#1E1B18]">Reinvestment & Design</h4>
            <p className="text-[#5C564E] text-[11px]">Exhibitions, prototype workshops, digital platform maintenance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
