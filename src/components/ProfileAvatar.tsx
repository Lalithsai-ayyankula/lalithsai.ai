import React, { useState } from 'react';
import { useProfilePhoto } from '../context/ProfilePhotoContext';
import { candidateProfile } from '../data/resumeData';
import { Camera, User, Sparkles } from 'lucide-react';

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'portrait' | 'hero' | 'hero-lg';
  showStatusDot?: boolean;
  showUploadTrigger?: boolean;
  glow?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  xs: 'w-7 h-7 rounded-lg text-xs',
  sm: 'w-9 h-9 rounded-xl text-xs',
  md: 'w-12 h-12 rounded-xl text-sm',
  lg: 'w-16 h-16 rounded-2xl text-base',
  xl: 'w-24 h-24 rounded-2xl text-xl',
  '2xl': 'w-32 h-32 sm:w-36 sm:h-36 rounded-3xl text-2xl',
  portrait: 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-3xl text-3xl shadow-2xl',
  hero: 'w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-3xl text-3xl shadow-2xl',
  'hero-lg': 'w-44 h-44 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-3xl text-4xl shadow-2xl',
};

const iconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
  '2xl': 'w-8 h-8',
  portrait: 'w-9 h-9',
  hero: 'w-10 h-10',
  'hero-lg': 'w-12 h-12',
};

export const ProfileAvatar: React.FC<Props> = ({
  size = 'md',
  showStatusDot = true,
  showUploadTrigger = false,
  glow = false,
  className = '',
  onClick,
}) => {
  const { photoUrl, openPhotoModal } = useProfilePhoto();
  const [hasError, setHasError] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  const glowClass = glow
    ? 'ring-2 ring-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.35)]'
    : 'border border-slate-700/80 hover:border-cyan-500/50';

  return (
    <div
      onClick={onClick ? handleClick : undefined}
      className={`relative inline-block select-none transition-transform duration-300 ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''} ${className}`}
    >
      {/* Outer container */}
      <div
        className={`${sizeClasses[size]} overflow-hidden bg-slate-900 flex items-center justify-center relative ${glowClass}`}
      >
        {photoUrl && !hasError ? (
          <img
            src={photoUrl}
            alt={candidateProfile.name}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-950 via-slate-900 to-indigo-950 flex items-center justify-center font-display font-black text-cyan-300">
            {candidateProfile.avatarFallback || 'LK'}
          </div>
        )}

        {/* Hover overlay with Camera trigger */}
        {showUploadTrigger && (
          <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1 backdrop-blur-[2px] text-cyan-300">
            <Camera className={iconSizes[size]} />
            {(size === 'lg' || size === 'xl' || size === '2xl') && (
              <span className="text-[10px] font-mono tracking-wider uppercase font-semibold text-slate-200">
                Update
              </span>
            )}
          </div>
        )}
      </div>

      {/* Online Status Dot */}
      {showStatusDot && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse ${
            size === 'xs' || size === 'sm'
              ? 'w-2.5 h-2.5'
              : size === 'md'
              ? 'w-3.5 h-3.5'
              : 'w-4 h-4'
          }`}
          title="Available for WFO Hyderabad"
        />
      )}
    </div>
  );
};
