import React, { useState } from 'react';
import { Calendar, MapPin, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { EXHIBITIONS_DATA } from '../data/seedData';
import { CraftImage } from '../components/common/CraftImage';
import { useApp } from '../context/AppContext';

export const ExhibitionsPage: React.FC = () => {
  const { showNotification } = useApp();
  const [registeredId, setRegisteredId] = useState<string | null>(null);

  const handleRSVP = (exhId: string, title: string) => {
    setRegisteredId(exhId);
    showNotification(`You have been registered for invitations to "${title}".`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="border-b border-[#E8E1D5] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
          Curated Encounters
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1E1B18] font-normal tracking-tight">
          Exhibitions & Design Fairs
        </h1>
        <p className="text-sm sm:text-base text-[#5C564E] max-w-2xl leading-relaxed">
          Taking Bihar craft beyond digital screens: experience living weaving demonstrations, physical textile touch, and large-scale architectural luminaire installations at premier galleries across India.
        </p>
      </div>

      {/* Exhibitions List */}
      <div className="space-y-12">
        {EXHIBITIONS_DATA.map(exh => (
          <div
            key={exh.id}
            className="border border-[#E8E1D5] bg-white p-6 sm:p-10 lg:p-12 hover:border-[#8C3A27]/40 transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Cover Image */}
              <div className="lg:col-span-5 overflow-hidden border border-[#E8E1D5] bg-[#F5EFE6]">
                <CraftImage
                  src={exh.coverImage}
                  alt={exh.title}
                  aspectRatio="16:9"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text & Meta */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                    exh.status === 'upcoming'
                      ? 'bg-[#8C3A27] text-white'
                      : exh.status === 'ongoing'
                      ? 'bg-[#DFAB5E] text-[#1E1B18]'
                      : 'bg-[#E8E1D5] text-[#5C564E]'
                  }`}>
                    {exh.status}
                  </span>
                  <span className="text-[#8C3A27] font-semibold uppercase tracking-wider">{exh.date}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1B18] font-normal">
                  {exh.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#5C564E] leading-relaxed">
                  {exh.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5C564E] pt-2 border-t border-[#E8E1D5]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#8C3A27] shrink-0" />
                    <span><strong>Venue:</strong> {exh.venue}, {exh.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#8C3A27] shrink-0" />
                    <span><strong>Makers Attending:</strong> {exh.artisans.join(', ')}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  {exh.status === 'concluded' ? (
                    <span className="text-xs text-[#786F64] italic">Retrospective catalog available on request</span>
                  ) : registeredId === exh.id ? (
                    <span className="text-xs text-[#8C3A27] font-semibold flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" />
                      <span>RSVP Confirmed · We look forward to welcoming you</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRSVP(exh.id, exh.title)}
                      className="px-6 py-2.5 bg-[#8C3A27] hover:bg-[#A34A35] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
                    >
                      <span>Register for Private Preview</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
