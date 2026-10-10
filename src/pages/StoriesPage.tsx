import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { STORIES_DATA } from '../data/seedData';
import { CraftImage } from '../components/common/CraftImage';

export const StoriesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['Artisan Stories', 'Craft Knowledge', 'Design', 'Bihar Heritage'];

  const filteredStories = selectedCategory === 'all'
    ? STORIES_DATA
    : STORIES_DATA.filter(s => s.category === selectedCategory);

  const heroStory = STORIES_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Editorial Header */}
      <div className="border-b border-[#E8E1D5] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
          The Cultural Journal
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1E1B18] font-normal tracking-tight">
          Stories & Living Memory
        </h1>
        <p className="text-sm sm:text-base text-[#5C564E] max-w-2xl leading-relaxed">
          Essays, field dispatches, and oral histories chronicling the women, materials, and ecosystems that shape Bihar’s craft heritage.
        </p>
      </div>

      {/* Hero Featured Story */}
      <div className="border border-[#E8E1D5] bg-white p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 overflow-hidden border border-[#E8E1D5] bg-[#F5EFE6]">
            <CraftImage
              src={heroStory.coverImage}
              alt={heroStory.title}
              aspectRatio="16:9"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#8C3A27] font-semibold uppercase tracking-wider">
              <span>{heroStory.category}</span>
              <span aria-hidden="true">·</span>
              <span>{heroStory.readTime}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1B18] font-medium leading-snug">
              {heroStory.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5C564E] leading-relaxed">
              {heroStory.excerpt}
            </p>
            <div className="pt-2 text-xs text-[#786F64]">
              <span>By {heroStory.author}</span> · <span>{heroStory.publishedAt}</span>
            </div>
            <div className="pt-2">
              <Link
                to={`/stories/${heroStory.slug}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#8C3A27] hover:bg-[#A34A35] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <span>Read Feature Essay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs border-b border-[#E8E1D5]">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 transition-colors whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'text-[#8C3A27] font-semibold border-b-2 border-[#8C3A27]'
              : 'text-[#5C564E] hover:text-[#1E1B18]'
          }`}
        >
          All Articles
        </button>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-4 py-2 transition-colors whitespace-nowrap ${
              selectedCategory === c
                ? 'text-[#8C3A27] font-semibold border-b-2 border-[#8C3A27]'
                : 'text-[#5C564E] hover:text-[#1E1B18]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredStories.map(story => (
          <Link
            key={story.id}
            to={`/stories/${story.slug}`}
            className="group block bg-white border border-[#E8E1D5] hover:border-[#8C3A27]/40 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="overflow-hidden bg-[#F5EFE6]">
                <CraftImage
                  src={story.coverImage}
                  alt={story.title}
                  aspectRatio="16:9"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#8C3A27] font-semibold uppercase tracking-wider">
                  <span>{story.category}</span>
                  <span className="text-[#786F64] font-normal">{story.readTime}</span>
                </div>
                <h3 className="font-serif text-xl text-[#1E1B18] font-medium group-hover:text-[#8C3A27] transition-colors leading-snug">
                  {story.title}
                </h3>
                <p className="text-xs text-[#5C564E] leading-relaxed line-clamp-3">
                  {story.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#E8E1D5]/60 mt-4 flex items-center justify-between text-xs text-[#1E1B18] font-medium">
              <span>Read Article</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8C3A27] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
