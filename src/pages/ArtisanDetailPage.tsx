import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Award, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { ARTISANS_DATA, PRODUCTS_DATA, CRAFTS_DATA } from '../data/seedData';
import { CraftImage } from '../components/common/CraftImage';
import { ProductCard } from '../components/product/ProductCard';

export const ArtisanDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const artisan = ARTISANS_DATA.find(a => a.slug === slug || a.id === slug) || ARTISANS_DATA[0];
  const craft = CRAFTS_DATA.find(c => c.name.toLowerCase().includes(artisan.craft.toLowerCase()) || artisan.craft.toLowerCase().includes(c.name.toLowerCase())) || CRAFTS_DATA[0];
  const artisanProducts = PRODUCTS_DATA.filter(p => p.artisanId === artisan.id || p.artisanName === artisan.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#5C564E] flex items-center gap-2">
        <Link to="/" className="hover:text-[#1E1B18]">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/artisans" className="hover:text-[#1E1B18]">Our Sakhis</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1E1B18] font-medium">{artisan.name}</span>
      </nav>

      {/* Hero Profile Block */}
      <div className="border border-[#E8E1D5] bg-white p-6 sm:p-12 lg:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Portrait Left */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden border border-[#E8E1D5] bg-[#F5EFE6]">
              <CraftImage
                src={artisan.profileImage}
                alt={artisan.name}
                aspectRatio="3:4"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details Right */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8C3A27] font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{artisan.village}, {artisan.district}, Bihar</span>
                <span aria-hidden="true">·</span>
                <span>{artisan.yearsOfExperience} Years Master Practice</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl text-[#1E1B18] font-normal mt-2">
                {artisan.name}
              </h1>

              <div className="mt-2 text-sm text-[#8C3A27] font-medium">
                Master Practitioner: {artisan.craft}
              </div>
            </div>

            <p className="text-sm text-[#5C564E] leading-relaxed">
              {artisan.biography}
            </p>

            {/* Blockquote */}
            {artisan.story && (
              <blockquote className="font-serif italic text-base sm:text-lg text-[#1E1B18] border-l-2 border-[#8C3A27] pl-4 py-1 leading-relaxed">
                “{artisan.story}”
              </blockquote>
            )}

            {/* Skills */}
            <div className="pt-4 border-t border-[#E8E1D5] space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18] block">
                Technical Disciplines & Mastery
              </span>
              <div className="flex flex-wrap gap-2">
                {artisan.skills.map(s => (
                  <span
                    key={s}
                    className="text-xs px-3 py-1 bg-[#FAF7F2] border border-[#E8E1D5] text-[#5C564E]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link
                to={`/crafts/${craft.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C3A27] hover:underline"
              >
                <span>Learn more about {artisan.craft} →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Her Collection */}
      <div className="space-y-8">
        <div className="flex items-baseline justify-between border-b border-[#E8E1D5] pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
              Pieces Made by {artisan.name}
            </span>
            <h2 className="font-serif text-3xl text-[#1E1B18] font-normal mt-1">
              Her Collection
            </h2>
          </div>
          <span className="text-xs text-[#5C564E] tabular-nums">
            {artisanProducts.length} pieces available
          </span>
        </div>

        {artisanProducts.length === 0 ? (
          <div className="text-center py-12 text-xs text-[#5C564E]">
            All current pieces crafted by {artisan.name} are currently with private patrons. New seasonal editions will be cataloged soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artisanProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
