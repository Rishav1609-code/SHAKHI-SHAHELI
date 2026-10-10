import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Shield } from 'lucide-react';
import { CRAFTS_DATA } from '../data/seedData';
import { CraftImage } from '../components/common/CraftImage';

export const CraftsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Editorial Header */}
      <div className="border-b border-[#E8E1D5] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
          Living Material Traditions
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1E1B18] font-normal tracking-tight">
          Crafts of Bihar
        </h1>
        <p className="text-sm sm:text-base text-[#5C564E] max-w-2xl leading-relaxed">
          The artisanal disciplines of Bihar are inextricably linked to its rivers, seasonal floods, forest flora, and women’s storytelling. Discover the 6 verified living crafts safeguarded by our sakhis.
        </p>
      </div>

      {/* Craft Cards List */}
      <div className="space-y-16">
        {CRAFTS_DATA.map((craft, idx) => (
          <div
            key={craft.id}
            className="border border-[#E8E1D5] bg-white p-6 sm:p-10 lg:p-12 hover:border-[#8C3A27]/40 transition-colors"
          >
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
              idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
            }`}>
              {/* Image */}
              <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:col-start-8' : ''}`}>
                <div className="overflow-hidden border border-[#E8E1D5] bg-[#F5EFE6]">
                  <CraftImage
                    src={craft.images[0]}
                    alt={craft.name}
                    aspectRatio="4:3"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className={`lg:col-span-7 space-y-5 ${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8C3A27]">
                    {craft.region}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal">
                    {craft.name}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-[#5C564E] leading-relaxed">
                  {craft.description}
                </p>

                {/* Materials & Process snapshot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="p-3 bg-[#FAF7F2] border border-[#E8E1D5]">
                    <span className="font-semibold text-[#1E1B18] block mb-1">Key Materials:</span>
                    <span className="text-[#5C564E]">{craft.materials.slice(0, 3).join(', ')}</span>
                  </div>
                  <div className="p-3 bg-[#FAF7F2] border border-[#E8E1D5]">
                    <span className="font-semibold text-[#1E1B18] block mb-1">Making Process:</span>
                    <span className="text-[#5C564E]">{craft.process[0].title} → {craft.process[1].title}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/crafts/${craft.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#8C3A27] hover:bg-[#A34A35] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <span>Explore Craft Provenance & Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
