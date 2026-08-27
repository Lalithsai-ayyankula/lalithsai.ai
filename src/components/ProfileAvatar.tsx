import React, { useState } from 'react';
import { useProfilePhoto } from '../context/ProfilePhotoContext';
import { candidateProfile } from '../data/resumeData';

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'portrait' | 'hero' | 'hero-lg';
  showStatusDot?: boolean;
  showUploadTrigger?: boolean;
  glow?: boolean;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

const sizeClasses = {
  xs: 'w-7 h-7 rounded-lg text-xs',
  sm: 'w-9 h-9 rounded-xl text-xs',
  md: 'w-12 h-12 rounded-xl text-sm',
  lg: 'w-16 h-16 rounded-2xl text-base',
  xl: 'w-24 h-24 rounded-2xl text-xl',
  '2xl': 'w-32 h-32 sm:w-36 sm:h-36 rounded-3xl text-2xl',
  portrait: 'w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-3xl text-3xl shadow-2xl',
  hero: 'w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-3xl text-3xl shadow-2xl',
  'hero-lg': 'w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-3xl text-4xl shadow-2xl',
};

export const ProfileAvatar: React.FC<Props> = ({
  size = 'md',
  showStatusDot = true,
  glow = false,
  className = '',
  onClick,
}) => {
  const { photoUrl } = useProfilePhoto();
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  const isClickable = Boolean(onClick);

  const glowClass = glow
    ? 'ring-2 ring-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.4)]'
    : 'border border-slate-700/80 hover:border-cyan-500/60';

  return (
    <div
      onClick={isClickable ? handleClick : undefined}
      className={`relative inline-block select-none transition-all duration-300 ${
        isClickable ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''
      } ${className}`}
      title={candidateProfile.name}
    >
      {/* Outer container */}
      <div
        className={`${sizeClasses[size]} overflow-hidden bg-slate-950 flex items-center justify-center relative ${glowClass} shadow-xl backdrop-blur-sm group`}
      >
        {/* Shimmer loading backdrop */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 animate-pulse" />
        )}

        {photoUrl && !hasError ? (
          <img
            src={photoUrl}
            alt={candidateProfile.name}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setHasError(true);
              setIsLoaded(true);
            }}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } group-hover:scale-105`}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center font-display font-black text-cyan-300 tracking-wider">
            <span>{candidateProfile.avatarFallback || 'LK'}</span>
            <span className="text-[9px] font-mono font-normal text-slate-400 mt-0.5">AI/ML</span>
          </div>
        )}

        {/* Subtle internal vignette for cinematic portrait depth */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-[inherit]" />
      </div>

      {/* Online Status Dot */}
      {showStatusDot && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse ${
            size === 'xs' || size === 'sm'
              ? 'w-2.5 h-2.5'
              : size === 'md'
              ? 'w-3.5 h-3.5'
              : 'w-4 h-4 ring-3'
          }`}
          title="Active Researcher • Available for WFO Hyderabad"
        />
      )}
    </div>
  );
};
