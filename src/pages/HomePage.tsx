import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, Shield, ChevronRight } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { CraftImage } from '../components/common/CraftImage';
import { PRODUCTS_DATA, ARTISANS_DATA, CRAFTS_DATA, EXHIBITIONS_DATA, STORIES_DATA } from '../data/seedData';

export const HomePage: React.FC = () => {
  const featuredProducts = PRODUCTS_DATA.slice(0, 4);
  const featuredArtisans = ARTISANS_DATA.slice(0, 3);
  const featuredCrafts = CRAFTS_DATA.slice(0, 4);
  const spotlightArtisan = ARTISANS_DATA[0]; // Devi Devi

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center bg-[#F5EFE6] border-b border-[#E8E1D5] overflow-hidden">
        {/* Cinematic Backdrop Pattern & Split visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Text Left */}
            <div className="lg:col-span-7 space-y-6 lg:pr-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8C3A27]">
                <span>Hunar Se Bazaar Tak</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#5C564E] font-normal">Living Heritage of Bihar</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#1E1B18] leading-[1.08] tracking-tight">
                From Her Hands <br />
                <span className="italic font-normal text-[#8C3A27]">to Your Home.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#5C564E] max-w-xl font-normal leading-relaxed">
                Contemporary living pieces rooted in the craft, culture and stories of Bihar — sculpted, woven and embroidered by master women who carry these living traditions forward.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/shop"
                  className="px-8 py-3.5 bg-[#8C3A27] hover:bg-[#A34A35] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 text-center flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Explore the Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/artisans"
                  className="px-8 py-3.5 bg-transparent border border-[#1E1B18]/30 hover:border-[#1E1B18] text-[#1E1B18] text-xs font-semibold uppercase tracking-wider transition-all duration-200 text-center"
                >
                  Meet Our Sakhis
                </Link>
              </div>

              {/* Quiet Craft Provenance markers */}
              <div className="pt-6 border-t border-[#E8E1D5] flex items-center gap-6 text-xs text-[#5C564E]">
                <div>
                  <span className="font-serif text-lg text-[#1E1B18] block leading-none">GI Tagged</span>
                  <span className="text-[11px] text-[#786F64]">Geographical Authenticity</span>
                </div>
                <div className="w-[1px] h-6 bg-[#E8E1D5]" />
                <div>
                  <span className="font-serif text-lg text-[#1E1B18] block leading-none">100% Fair</span>
                  <span className="text-[11px] text-[#786F64]">Direct Maker Sovereignty</span>
                </div>
                <div className="w-[1px] h-6 bg-[#E8E1D5]" />
                <div>
                  <span className="font-serif text-lg text-[#1E1B18] block leading-none">6 Clusters</span>
                  <span className="text-[11px] text-[#786F64]">Across Northern Bihar</span>
                </div>
              </div>
            </div>

            {/* Visual Right */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Image */}
                <div className="border border-[#E8E1D5] bg-white p-2 sm:p-3 shadow-xl">
                  <CraftImage
                    src="https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80"
                    alt="Master artisan weaving golden Sikki grass"
                    aspectRatio="4:3"
                    className="w-full h-full object-cover"
                  />
                  <div className="pt-3 pb-1 px-1 flex items-baseline justify-between text-xs">
                    <span className="font-serif italic text-[#1E1B18]">Devi Devi, Ranti Village</span>
                    <span className="text-[#8C3A27] font-medium text-[11px]">Sikki Grass Atelier</span>
                  </div>
                </div>

                {/* Overlaid secondary detail card */}
                <div className="absolute -bottom-6 -left-6 hidden sm:block bg-white border border-[#E8E1D5] p-3 shadow-lg max-w-[210px]">
                  <div className="text-[10px] uppercase tracking-wider text-[#8C3A27] font-semibold">Featured Craft</div>
                  <div className="font-serif text-sm text-[#1E1B18] mt-0.5">Sculptural Golden Reed</div>
                  <div className="text-[11px] text-[#5C564E] mt-1">Sun-cured wetland fiber woven with iron Takua needles.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE IDEA / MANIFESTO */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#8C3A27]">
          SAKHI–SAHELI
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1E1B18] tracking-tight">
          Hunar Se Bazaar Tak.
        </h2>
        <div className="w-12 h-[1px] bg-[#8C3A27] mx-auto my-4" />
        <p className="text-base sm:text-xl text-[#5C564E] leading-relaxed max-w-3xl mx-auto font-normal">
          Sakhi–Saheli is not a charity. We represent skilled makers, designers, and entrepreneurs from rural Bihar. By uniting ancestral craft techniques with contemporary design development and direct global access, we bridge the village courtyard with the world’s most refined living spaces.
        </p>
        <div className="pt-4">
          <Link
            to="/our-approach"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C3A27] hover:text-[#A34A35] transition-colors border-b border-[#8C3A27] pb-1"
          >
            <span>Discover Our Approach</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 3. FEATURED COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E1D5] pb-5">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
              Curated Edition
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal mt-1">
              Made by Hand. Designed for Today.
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18] hover:text-[#8C3A27] transition-colors flex items-center gap-1"
          >
            <span>View All Pieces</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-column product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. MEET THE SAKHIS */}
      <section className="bg-[#EFE8DC]/40 border-y border-[#E8E1D5] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
                The Living Hands
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal mt-1">
                Meet the Women Behind the Craft.
              </h2>
            </div>
            <Link
              to="/artisans"
              className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18] hover:text-[#8C3A27] transition-colors flex items-center gap-1"
            >
              <span>Meet All Sakhis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Editorial 3-artisan showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtisans.map(artisan => (
              <div
                key={artisan.id}
                className="bg-white border border-[#E8E1D5] p-5 flex flex-col justify-between group hover:border-[#8C3A27]/40 transition-colors"
              >
                <div>
                  <div className="overflow-hidden mb-4 bg-[#F5EFE6]">
                    <CraftImage
                      src={artisan.profileImage}
                      alt={artisan.name}
                      aspectRatio="3:4"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-[11px] text-[#8C3A27] font-semibold uppercase tracking-wider">
                    {artisan.village}, {artisan.district}
                  </div>
                  <h3 className="font-serif text-xl text-[#1E1B18] font-medium mt-1">
                    {artisan.name}
                  </h3>
                  <div className="text-xs text-[#5C564E] font-medium mt-0.5">
                    {artisan.craft} · {artisan.yearsOfExperience} Years Mastery
                  </div>
                  <p className="text-xs text-[#5C564E] leading-relaxed mt-3 line-clamp-3">
                    {artisan.biography}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E8E1D5]">
                  <Link
                    to={`/artisans/${artisan.id}`}
                    className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18] group-hover:text-[#8C3A27] flex items-center justify-between transition-colors"
                  >
                    <span>Read Her Story & Works</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CRAFTS OF BIHAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E1D5] pb-5">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
              Ecology & Materiality
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal mt-1">
              Rooted in Bihar.
            </h2>
          </div>
          <Link
            to="/crafts"
            className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18] hover:text-[#8C3A27] transition-colors flex items-center gap-1"
          >
            <span>Explore All 6 Crafts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCrafts.map(craft => (
            <Link
              key={craft.id}
              to={`/crafts/${craft.slug}`}
              className="group block bg-white border border-[#E8E1D5] overflow-hidden hover:border-[#8C3A27]/40 transition-colors"
            >
              <div className="overflow-hidden bg-[#F5EFE6]">
                <CraftImage
                  src={craft.images[0]}
                  alt={craft.name}
                  aspectRatio="4:3"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[11px] text-[#8C3A27] uppercase tracking-wider font-semibold block">
                  {craft.region.split(',')[0]}
                </span>
                <h3 className="font-serif text-lg text-[#1E1B18] font-medium group-hover:text-[#8C3A27] transition-colors">
                  {craft.name}
                </h3>
                <p className="text-xs text-[#5C564E] line-clamp-2 leading-relaxed">
                  {craft.shortDescription}
                </p>
                <div className="pt-2 text-xs font-medium text-[#1E1B18] flex items-center gap-1">
                  <span>Explore Heritage</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#8C3A27]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. FROM TRADITION TO TODAY (Core Differentiator) */}
      <section className="bg-[#1E1B18] text-[#EFE8DC] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#DFAB5E] font-semibold">
              Design Evolution
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
              From Sacred Tradition to Contemporary Living.
            </h2>
            <p className="text-sm sm:text-base text-[#A89F91] leading-relaxed">
              We do not preserve craft by locking it behind museum glass. We preserve craft by making it functional, beautiful, and desirable in modern spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 bg-[#2B2622] border border-[#443D36] space-y-4">
              <span className="font-serif text-2xl text-[#DFAB5E]">01</span>
              <h3 className="font-serif text-xl text-white font-medium">Ancestral Technique</h3>
              <p className="text-xs text-[#A89F91] leading-relaxed">
                Centuries-old knowledge: harvesting wild monsoon Sikki reeds, hand-reeling Tussar cocoons, drawing fine Kachni lines without rulers, or ripple-quilting soft cotton khadi.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-[#2B2622] border border-[#443D36] space-y-4">
              <span className="font-serif text-2xl text-[#DFAB5E]">02</span>
              <h3 className="font-serif text-xl text-white font-medium">Design Development</h3>
              <p className="text-xs text-[#A89F91] leading-relaxed">
                Co-creation workshops with contemporary architects and product designers: refining scale, exploring muted botanical dyes, improving load-bearing geometry, and engineering electrical collars.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-[#2B2622] border border-[#443D36] space-y-4">
              <span className="font-serif text-2xl text-[#DFAB5E]">03</span>
              <h3 className="font-serif text-xl text-white font-medium">Contemporary Pieces</h3>
              <p className="text-xs text-[#A89F91] leading-relaxed">
                Sculptural pendant lamps, minimal monochrome art panels, handspun raw silk stoles, and heirloom throws designed for homes in Mumbai, London, Tokyo, and New York.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OUR APPROACH (4 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
            The Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal">
            Our Four-Step Approach.
          </h2>
          <p className="text-xs text-[#5C564E]">
            How we partner with rural women makers to build long-term economic independence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-[#E8E1D5] space-y-3">
            <div className="text-xs font-semibold text-[#8C3A27] tracking-widest uppercase">01 — Discover</div>
            <h3 className="font-serif text-lg text-[#1E1B18] font-medium">Listen to the Makers</h3>
            <p className="text-xs text-[#5C564E] leading-relaxed">
              We travel to village clusters in Madhubani, Muzaffarpur, and Nalanda, mapping existing hand skills and domestic rhythms without imposing outside dogma.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E8E1D5] space-y-3">
            <div className="text-xs font-semibold text-[#8C3A27] tracking-widest uppercase">02 — Develop</div>
            <h3 className="font-serif text-lg text-[#1E1B18] font-medium">Co-Design Prototypes</h3>
            <p className="text-xs text-[#5C564E] leading-relaxed">
              We experiment together on raw materials, azo-free pigments, dimensions, and ergonomic usability suited for urban contemporary residences.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E8E1D5] space-y-3">
            <div className="text-xs font-semibold text-[#8C3A27] tracking-widest uppercase">03 — Create</div>
            <h3 className="font-serif text-lg text-[#1E1B18] font-medium">Direct Atelier Making</h3>
            <p className="text-xs text-[#5C564E] leading-relaxed">
              Artisans work from their own village courtyards on their own schedule. Prices are set directly by the artisans with immediate advance compensation.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E8E1D5] space-y-3">
            <div className="text-xs font-semibold text-[#8C3A27] tracking-widest uppercase">04 — Connect</div>
            <h3 className="font-serif text-lg text-[#1E1B18] font-medium">Global Market Access</h3>
            <p className="text-xs text-[#5C564E] leading-relaxed">
              We bring their works to curated e-commerce, international design exhibitions, museum shops, and ethical corporate gifting collections.
            </p>
          </div>
        </div>
      </section>

      {/* 8. ARTISAN SPOTLIGHT STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] border border-[#E8E1D5] p-6 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <CraftImage
                src={spotlightArtisan.coverImage}
                alt={spotlightArtisan.name}
                aspectRatio="4:3"
                className="w-full h-full object-cover shadow-sm"
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3A27]">
                Master Voice · {spotlightArtisan.village}, {spotlightArtisan.district}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal leading-snug">
                “Every Piece Carries a Story.”
              </h2>
              <blockquote className="font-serif italic text-lg sm:text-xl text-[#5C564E] leading-relaxed border-l-2 border-[#8C3A27] pl-4">
                {spotlightArtisan.story}
              </blockquote>
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="font-medium text-sm text-[#1E1B18] block">{spotlightArtisan.name}</span>
                  <span className="text-xs text-[#5C564E]">{spotlightArtisan.craft} · 28 Years Practice</span>
                </div>
                <Link
                  to={`/artisans/${spotlightArtisan.id}`}
                  className="px-5 py-2.5 bg-[#8C3A27] hover:bg-[#A34A35] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Explore Her Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. EXHIBITIONS & POP-UPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E1D5] pb-5">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
              Physical Galleries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal mt-1">
              From the Village to the Exhibition Floor.
            </h2>
          </div>
          <Link
            to="/exhibitions"
            className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18] hover:text-[#8C3A27] transition-colors flex items-center gap-1"
          >
            <span>All Exhibitions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXHIBITIONS_DATA.slice(0, 2).map(exh => (
            <div key={exh.id} className="bg-white border border-[#E8E1D5] p-6 space-y-4">
              <div className="overflow-hidden bg-[#F5EFE6]">
                <CraftImage
                  src={exh.coverImage}
                  alt={exh.title}
                  aspectRatio="16:9"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#8C3A27] font-semibold uppercase tracking-wider">
                <span>{exh.location}</span>
                <span>{exh.date}</span>
              </div>
              <h3 className="font-serif text-xl text-[#1E1B18] font-medium">
                {exh.title}
              </h3>
              <p className="text-xs text-[#5C564E] leading-relaxed line-clamp-2">
                {exh.description}
              </p>
              <div className="pt-2 text-xs text-[#5C564E]">
                <span className="font-medium text-[#1E1B18]">Venue:</span> {exh.venue}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. CORPORATE & BULK GIFTING B2B */}
      <section className="bg-[#EFE8DC]/60 border-t border-[#E8E1D5] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
                B2B & Curated Gifting
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#1E1B18] font-normal leading-tight">
                Meaningful Gifting, Made by Her.
              </h2>
              <p className="text-sm text-[#5C564E] leading-relaxed max-w-xl">
                Elevate your corporate events, festive gifting, and weddings with bespoke craft boxes and living art pieces. Each gift directly sustains artisan clusters and includes custom branding, artist certificates, and sustainable packaging.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-[#1E1B18]">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#8C3A27]" /> Custom Monograms
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#8C3A27]" /> Pan-India & Global Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#8C3A27]" /> GST Invoicing & Compliance
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <Link
                to="/contact?type=corporate"
                className="px-8 py-4 bg-[#1E1B18] hover:bg-[#332D28] text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>Start a Gifting Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
