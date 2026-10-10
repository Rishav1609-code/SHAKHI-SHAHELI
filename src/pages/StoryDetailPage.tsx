import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, User, Share2 } from 'lucide-react';
import { STORIES_DATA, PRODUCTS_DATA } from '../data/seedData';
import { CraftImage } from '../components/common/CraftImage';

export const StoryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const story = STORIES_DATA.find(s => s.slug === slug || s.id === slug) || STORIES_DATA[0];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#5C564E] flex items-center gap-2">
        <Link to="/" className="hover:text-[#1E1B18]">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/stories" className="hover:text-[#1E1B18]">Stories</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1E1B18] font-medium truncate max-w-xs">{story.title}</span>
      </nav>

      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3A27]">
          {story.category} · {story.readTime}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1E1B18] font-normal tracking-tight leading-tight">
          {story.title}
        </h1>
        <div className="text-xs text-[#786F64] pt-2 flex items-center justify-center gap-4">
          <span>By {story.author}</span>
          <span aria-hidden="true">·</span>
          <span>Published {story.publishedAt}</span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="border border-[#E8E1D5] bg-white overflow-hidden">
        <CraftImage
          src={story.coverImage}
          alt={story.title}
          aspectRatio="16:9"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Editorial Prose Content */}
      <div className="prose prose-stone max-w-none text-[#2B2622] text-sm sm:text-base leading-relaxed space-y-6">
        {story.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="font-sans leading-loose text-[#3C362F]">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Links to Artisan & Crafts if referenced */}
      <div className="p-6 bg-[#FAF7F2] border border-[#E8E1D5] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#8C3A27] font-semibold block">
            Craft Provenance
          </span>
          <span className="font-serif text-lg text-[#1E1B18]">
            Explore pieces related to this journal entry
          </span>
        </div>
        <div className="flex gap-3">
          {story.artisanSlug && (
            <Link
              to={`/artisans/${story.artisanSlug}`}
              className="px-4 py-2 border border-[#1E1B18] hover:bg-[#1E1B18] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Meet the Sakhi
            </Link>
          )}
          {story.craftSlug && (
            <Link
              to={`/crafts/${story.craftSlug}`}
              className="px-4 py-2 bg-[#8C3A27] hover:bg-[#A34A35] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Explore Craft
            </Link>
          )}
        </div>
      </div>

      <div className="pt-8 border-t border-[#E8E1D5] flex justify-between">
        <Link
          to="/stories"
          className="text-xs font-semibold uppercase tracking-wider text-[#5C564E] hover:text-[#1E1B18] flex items-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Stories</span>
        </Link>
        <Link
          to="/shop"
          className="text-xs font-semibold uppercase tracking-wider text-[#8C3A27] hover:underline flex items-center gap-2"
        >
          <span>Explore Collection</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
