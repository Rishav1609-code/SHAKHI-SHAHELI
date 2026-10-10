import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MapPin, Compass, Shield } from 'lucide-react';
import { CRAFTS_DATA, ARTISANS_DATA, PRODUCTS_DATA } from '../data/seedData';
import { CraftImage } from '../components/common/CraftImage';
import { ProductCard } from '../components/product/ProductCard';

export const CraftDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const craft = CRAFTS_DATA.find(c => c.slug === slug || c.id === slug) || CRAFTS_DATA[0];
  const craftArtisans = ARTISANS_DATA.filter(a => craft.artisanIds.includes(a.id) || a.craft.toLowerCase().includes(craft.name.toLowerCase()));
  const craftProducts = PRODUCTS_DATA.filter(p => p.craftSlug === craft.slug || p.craft.toLowerCase().includes(craft.name.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      {/* Breadcrumbs */}
      <nav className="text-xs text-[#5C564E] flex items-center gap-2">
        <Link to="/" className="hover:text-[#1E1B18]">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/crafts" className="hover:text-[#1E1B18]">Crafts of Bihar</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1E1B18] font-medium">{craft.name}</span>
      </nav>

      {/* Hero Essay Block */}
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-2 text-xs text-[#8C3A27] font-semibold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>{craft.region}</span>
          <span aria-hidden="true">·</span>
          <span>GI Tag Protected Craft</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl text-[#1E1B18] font-normal tracking-tight">
          {craft.name}
        </h1>

        <p className="text-base sm:text-lg text-[#5C564E] leading-relaxed font-normal">
          {craft.description}
        </p>
      </div>

      {/* Dual Imagery Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-[#E8E1D5] bg-white overflow-hidden">
          <CraftImage
            src={craft.images[0]}
            alt={craft.name}
            aspectRatio="16:9"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="border border-[#E8E1D5] bg-white overflow-hidden">
          <CraftImage
            src={craft.images[1] || craft.images[0]}
            alt={`${craft.name} process`}
            aspectRatio="16:9"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* History & Cultural Significance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[#E8E1D5] pt-12 text-xs sm:text-sm text-[#5C564E] leading-relaxed">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl text-[#1E1B18] font-medium">Historical Provenance</h2>
          <p>{craft.history}</p>
        </div>
        <div className="space-y-4">
          <h2 className="font-serif text-2xl text-[#1E1B18] font-medium">Cultural & Environmental Significance</h2>
          <p>{craft.culturalSignificance}</p>
        </div>
      </div>

      {/* 4-Step Making Process */}
      <div className="border-t border-[#E8E1D5] pt-12 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
            The Atelier Workflow
          </span>
          <h2 className="font-serif text-3xl text-[#1E1B18] font-normal mt-1">
            The Making Process
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {craft.process.map(step => (
            <div key={step.step} className="p-6 bg-white border border-[#E8E1D5] space-y-3">
              <span className="font-serif text-2xl text-[#8C3A27] font-semibold block">{step.step}</span>
              <h3 className="font-serif text-lg text-[#1E1B18] font-medium">{step.title}</h3>
              <p className="text-xs text-[#5C564E] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Raw Materials */}
      <div className="p-6 bg-[#EFE8DC]/50 border border-[#E8E1D5] space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18] block">
          Indigenous Raw Materials & Tools
        </span>
        <div className="flex flex-wrap gap-3">
          {craft.materials.map(m => (
            <div key={m} className="px-4 py-2 bg-white border border-[#E8E1D5] text-xs font-medium text-[#1E1B18]">
              {m}
            </div>
          ))}
        </div>
      </div>

      {/* Practicing Sakhis */}
      {craftArtisans.length > 0 && (
        <div className="border-t border-[#E8E1D5] pt-12 space-y-6">
          <h2 className="font-serif text-2xl text-[#1E1B18]">Master Sakhis Practicing This Craft</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {craftArtisans.map(a => (
              <Link
                key={a.id}
                to={`/artisans/${a.id}`}
                className="flex items-center gap-4 p-4 bg-white border border-[#E8E1D5] hover:border-[#8C3A27] transition-colors"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-[#E8E1D5]">
                  <CraftImage
                    src={a.profileImage}
                    alt={a.name}
                    aspectRatio="1:1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-base font-medium text-[#1E1B18]">{a.name}</h4>
                  <span className="text-xs text-[#5C564E] block">{a.village}, {a.district}</span>
                  <span className="text-[11px] text-[#8C3A27] font-semibold">{a.yearsOfExperience} Yrs Mastery</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Collection in this Craft */}
      <div className="border-t border-[#E8E1D5] pt-12 space-y-8">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
              Available Pieces
            </span>
            <h2 className="font-serif text-3xl text-[#1E1B18] font-normal mt-1">
              Handcrafted in {craft.name}
            </h2>
          </div>
          <Link to="/shop" className="text-xs text-[#8C3A27] font-semibold hover:underline">
            View All Collection →
          </Link>
        </div>

        {craftProducts.length === 0 ? (
          <div className="text-center py-12 text-xs text-[#5C564E]">
            Pieces in this craft are currently being woven by our village ateliers. Check back for new seasonal additions.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {craftProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
