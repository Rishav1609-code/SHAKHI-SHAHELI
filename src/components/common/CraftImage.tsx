import React, { useState } from 'react';

interface CraftImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: '16:9' | '4:3' | '3:4' | '1:1';
  craftType?: 'sikki' | 'sujuni' | 'mithila' | 'khatwa' | 'silk' | 'loom' | 'general';
  containerClassName?: string;
}

export const CraftImage: React.FC<CraftImageProps> = ({
  src,
  alt,
  aspectRatio = '4:3',
  craftType = 'general',
  containerClassName = '',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '3:4': 'aspect-[3/4]',
    '1:1': 'aspect-square'
  }[aspectRatio];

  // Visual styled fallback with artisan-inspired motifs
  const renderFallback = () => {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-[#F5EFE6] border border-[#E8E1D5]`}>
        <div className="w-12 h-12 rounded-full border border-[#8C3A27]/20 flex items-center justify-center mb-3 bg-[#FAF7F2] text-[#8C3A27]">
          <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </div>
        <p className="font-serif text-sm text-[#1E1B18] font-medium tracking-wide max-w-[200px] line-clamp-2">
          {alt}
        </p>
        <span className="text-[11px] text-[#8C3A27] tracking-wider uppercase mt-1">
          Handmade in Bihar
        </span>
      </div>
    );
  };

  return (
    <div className={`relative overflow-hidden ${aspectClass} ${containerClassName} bg-[#F5EFE6]`}>
      {!hasError ? (
        <>
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            {...props}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-[#EFE8DC] animate-pulse" />
          )}
        </>
      ) : (
        renderFallback()
      )}
    </div>
  );
};
