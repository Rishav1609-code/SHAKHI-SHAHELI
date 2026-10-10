import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Award, CheckCircle } from 'lucide-react';
import { ARTISANS_DATA, CRAFTS_DATA } from '../data/seedData';
import { CraftImage } from '../components/common/CraftImage';

export const ArtisansPage: React.FC = () => {
  const [selectedCraft, setSelectedCraft] = useState<string>('all');

  const filteredArtisans = selectedCraft === 'all'
    ? ARTISANS_DATA
    : ARTISANS_DATA.filter(a => a.craft.toLowerCase().includes(selectedCraft.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Editorial Header */}
      <div className="border-b border-[#E8E1D5] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
          The Living Heritage
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1E1B18] font-normal tracking-tight">
          Meet Our Sakhis
        </h1>
        <p className="text-sm sm:text-base text-[#5C564E] max-w-2xl leading-relaxed">
          The master women makers, designers, and cultural custodians of Bihar. Here, artisans are partners and price-setters, carrying forward centuries of living wisdom with dignity and pride.
        </p>
      </div>

      {/* Filter by Craft */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <button
          onClick={() => setSelectedCraft('all')}
          className={`px-4 py-2 border transition-colors whitespace-nowrap ${
            selectedCraft === 'all'
              ? 'bg-[#8C3A27] text-white border-[#8C3A27] font-medium'
              : 'bg-white text-[#1E1B18] border-[#E8E1D5] hover:border-[#8C3A27]'
          }`}
        >
          All Sakhis ({ARTISANS_DATA.length})
        </button>
        {CRAFTS_DATA.map(craft => (
          <button
            key={craft.id}
            onClick={() => setSelectedCraft(craft.name)}
            className={`px-4 py-2 border transition-colors whitespace-nowrap ${
              selectedCraft === craft.name
                ? 'bg-[#8C3A27] text-white border-[#8C3A27] font-medium'
                : 'bg-white text-[#1E1B18] border-[#E8E1D5] hover:border-[#8C3A27]'
            }`}
          >
            {craft.name}
          </button>
        ))}
      </div>

      {/* Artisans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtisans.map(artisan => (
          <div
            key={artisan.id}
            className="group bg-white border border-[#E8E1D5] hover:border-[#8C3A27]/40 transition-colors flex flex-col justify-between"
          >
            <div>
              {/* Portrait */}
              <div className="overflow-hidden bg-[#F5EFE6]">
                <CraftImage
                  src={artisan.profileImage}
                  alt={artisan.name}
                  aspectRatio="4:3"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8C3A27] font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {artisan.village}, {artisan.district}
                  </span>
                  <span className="text-[#5C564E] font-normal">{artisan.yearsOfExperience} Yrs Practice</span>
                </div>

                <h3 className="font-serif text-2xl text-[#1E1B18] font-medium group-hover:text-[#8C3A27] transition-colors">
                  {artisan.name}
                </h3>

                <p className="text-xs text-[#8C3A27] font-medium">
                  {artisan.craft}
                </p>

                <p className="text-xs text-[#5C564E] leading-relaxed line-clamp-3">
                  {artisan.biography}
                </p>

                {artisan.quote && (
                  <blockquote className="text-xs italic text-[#786F64] border-l-2 border-[#E8E1D5] pl-3 py-0.5 mt-2">
                    “{artisan.quote}”
                  </blockquote>
                )}
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                to={`/artisans/${artisan.id}`}
                className="w-full py-2.5 bg-[#FAF7F2] hover:bg-[#8C3A27] hover:text-white text-[#1E1B18] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border border-[#E8E1D5]"
              >
                <span>Read Story & View Works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Cultural Context / The Bihar Craft Map Section */}
      <div className="bg-[#EFE8DC]/50 border border-[#E8E1D5] p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3A27]">
            Geographic Provenance
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1B18]">
            The Craft Geography of Bihar
          </h2>
          <p className="text-xs sm:text-sm text-[#5C564E] leading-relaxed">
            Northern Bihar’s unique floodplains and centuries of agrarian domesticity shaped distinct craft clusters. Every district nurtures its own vernacular mastery:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-xs">
          <div className="p-3 bg-white border border-[#E8E1D5]">
            <span className="font-serif text-sm font-semibold text-[#1E1B18] block">Madhubani</span>
            <span className="text-[11px] text-[#8C3A27]">Sikki Grass & Mithila Art</span>
          </div>
          <div className="p-3 bg-white border border-[#E8E1D5]">
            <span className="font-serif text-sm font-semibold text-[#1E1B18] block">Muzaffarpur</span>
            <span className="text-[11px] text-[#8C3A27]">Sujuni Narrative Quilts</span>
          </div>
          <div className="p-3 bg-white border border-[#E8E1D5]">
            <span className="font-serif text-sm font-semibold text-[#1E1B18] block">Bhagalpur</span>
            <span className="text-[11px] text-[#8C3A27]">Wild Forest Tussar Silk</span>
          </div>
          <div className="p-3 bg-white border border-[#E8E1D5]">
            <span className="font-serif text-sm font-semibold text-[#1E1B18] block">Patna / Barh</span>
            <span className="text-[11px] text-[#8C3A27]">Khatwa Cutwork Appliqué</span>
          </div>
          <div className="p-3 bg-white border border-[#E8E1D5]">
            <span className="font-serif text-sm font-semibold text-[#1E1B18] block">Nalanda</span>
            <span className="text-[11px] text-[#8C3A27]">52-Motif Bawan Buti</span>
          </div>
          <div className="p-3 bg-white border border-[#E8E1D5]">
            <span className="font-serif text-sm font-semibold text-[#1E1B18] block">Sitamarhi</span>
            <span className="text-[11px] text-[#8C3A27]">Wetland Grass Coiling</span>
          </div>
        </div>
      </div>
    </div>
  );
};
