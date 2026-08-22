import React, { createContext, useContext, useState, useEffect } from 'react';
import { candidateProfile } from '../data/resumeData';

interface ProfilePhotoContextType {
  photoUrl: string;
  updatePhoto: (newUrl: string) => void;
  resetPhoto: () => void;
  isPhotoModalOpen: boolean;
  openPhotoModal: () => void;
  closePhotoModal: () => void;
}

const STORAGE_KEY = 'portfolio_candidate_photo_url';

const ProfilePhotoContext = createContext<ProfilePhotoContextType | undefined>(undefined);

export const ProfilePhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved;
    } catch {
      // Ignore storage errors
    }
    return candidateProfile.photoUrl || 'https://github.com/Lalithsai-ayyankula.png';
  });

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const updatePhoto = (newUrl: string) => {
    setPhotoUrl(newUrl);
    try {
      localStorage.setItem(STORAGE_KEY, newUrl);
    } catch (e) {
      console.warn('Could not persist photo in localStorage', e);
    }
  };

  const resetPhoto = () => {
    const defaultUrl = candidateProfile.photoUrl || 'https://github.com/Lalithsai-ayyankula.png';
    setPhotoUrl(defaultUrl);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not reset photo in localStorage', e);
    }
  };

  return (
    <ProfilePhotoContext.Provider
      value={{
        photoUrl,
        updatePhoto,
        resetPhoto,
        isPhotoModalOpen,
        openPhotoModal: () => setIsPhotoModalOpen(true),
        closePhotoModal: () => setIsPhotoModalOpen(false),
      }}
    >
      {children}
    </ProfilePhotoContext.Provider>
  );
};

export const useProfilePhoto = (): ProfilePhotoContextType => {
  const context = useContext(ProfilePhotoContext);
  if (!context) {
    throw new Error('useProfilePhoto must be used within a ProfilePhotoProvider');
  }
  return context;
};
