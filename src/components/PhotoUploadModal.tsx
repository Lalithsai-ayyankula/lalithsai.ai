import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useProfilePhoto } from '../context/ProfilePhotoContext';
import { candidateProfile } from '../data/resumeData';
import {
  X,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  Check,
  RotateCcw,
  Sparkles,
  User,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const PRESET_AVATARS = [
  {
    name: 'GitHub Profile',
    url: 'https://github.com/Lalithsai-ayyankula.png',
    label: 'GitHub Official'
  },
  {
    name: 'Research Minimalist',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    label: 'Studio Editorial'
  },
  {
    name: 'Neural Tech',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    label: 'Executive Tech'
  },
  {
    name: 'Cybernetic AI',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    label: 'Engineer Focus'
  }
];

export const PhotoUploadModal: React.FC = () => {
  const { photoUrl, updatePhoto, resetPhoto, isPhotoModalOpen, closePhotoModal } = useProfilePhoto();
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [urlInput, setUrlInput] = useState(photoUrl);
  const [previewUrl, setPreviewUrl] = useState(photoUrl);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync preview if modal opens
  React.useEffect(() => {
    if (isPhotoModalOpen) {
      setPreviewUrl(photoUrl);
      setUrlInput(photoUrl);
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [isPhotoModalOpen, photoUrl]);

  if (!isPhotoModalOpen) return null;

  // Process and compress image file to Base64
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    // Limit raw file size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Image file is too large. Please select an image under 10MB.');
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) return;

      // Use an offscreen canvas to scale and optimize the image (max 600x600 for sharp avatars without wasting memory)
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
          setPreviewUrl(optimizedDataUrl);
          setSuccessMessage('Image loaded successfully! Click "Save Photo" to apply.');
        } else {
          setPreviewUrl(result);
        }
      };
      img.onerror = () => {
        setErrorMessage('Failed to decode image file. Please try another image.');
      };
      img.src = result;
    };

    reader.onerror = () => {
      setErrorMessage('Error reading file. Please try again.');
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) {
      setErrorMessage('Please enter a valid image URL.');
      return;
    }
    setPreviewUrl(urlInput.trim());
    setErrorMessage(null);
    setSuccessMessage('URL updated in preview. Click "Save Photo" to apply.');
  };

  const handleSave = () => {
    if (!previewUrl) {
      setErrorMessage('Please select or upload an image first.');
      return;
    }
    updatePhoto(previewUrl);
    setSuccessMessage('Profile photo updated successfully across your portfolio!');
    setTimeout(() => {
      closePhotoModal();
    }, 600);
  };

  const handleReset = () => {
    resetPhoto();
    const defaultUrl = candidateProfile.photoUrl || 'https://github.com/Lalithsai-ayyankula.png';
    setPreviewUrl(defaultUrl);
    setUrlInput(defaultUrl);
    setSuccessMessage('Reset to default GitHub photo.');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-cyan-500/30 p-6 shadow-2xl text-slate-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Portfolio Profile Photo
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Customize the photo displayed across hero, bio & resume
                </p>
              </div>
            </div>

            <button
              onClick={closePhotoModal}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Live Preview Card */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-slate-950/90 border border-slate-800 mb-5">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.25)] bg-slate-900 flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to initials if broken
                    (e.target as HTMLImageElement).src = 'https://github.com/Lalithsai-ayyankula.png';
                  }}
                />
              </div>
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-400 text-[10px] font-mono text-cyan-300 shadow">
                LIVE
              </span>
            </div>

            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <div className="text-sm font-bold text-white font-display">
                {candidateProfile.name}
              </div>
              <div className="text-xs font-mono text-cyan-300">
                AI Research Engineer Intern
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>IIIT Hyderabad LTRC • Hyderabad WFO</span>
              </div>
            </div>
          </div>

          {/* Method Tabs */}
          <div className="flex border-b border-slate-800 mb-4 text-xs font-mono">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-all ${
                activeTab === 'upload'
                  ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Local Photo</span>
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-all ${
                activeTab === 'url'
                  ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Image URL</span>
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-all ${
                activeTab === 'presets'
                  ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sample Presets</span>
            </button>
          </div>

          {/* Tab 1: Local File Upload */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200'
                    : 'border-slate-700/80 hover:border-cyan-500/50 bg-slate-950/50 hover:bg-slate-950/80'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/webp, image/svg+xml"
                  className="hidden"
                />
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 mb-3">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-sm font-semibold text-white mb-1">
                  Click to browse or drag & drop your photo
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  Supports PNG, JPG, JPEG, or WebP up to 10MB
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: URL Input */}
          {activeTab === 'url' && (
            <div className="space-y-3">
              <label className="text-xs font-mono text-slate-300 block">
                Paste direct Image Link / Avatar URL:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/my-photo.jpg"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs font-semibold border border-slate-700 transition-colors"
                >
                  Preview
                </button>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Tip: You can use your GitHub avatar (e.g. https://github.com/Lalithsai-ayyankula.png) or any hosted image.
              </p>
            </div>
          )}

          {/* Tab 3: Presets */}
          {activeTab === 'presets' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PRESET_AVATARS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setPreviewUrl(preset.url);
                    setUrlInput(preset.url);
                    setSuccessMessage(`Selected ${preset.name}`);
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-2 group ${
                    previewUrl === preset.url
                      ? 'bg-cyan-950/40 border-cyan-400 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-700 group-hover:scale-105 transition-transform">
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-[11px] font-semibold text-white truncate w-full">
                    {preset.name}
                  </div>
                  <span className="text-[9px] font-mono text-cyan-400">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Error / Success Feedback */}
          {errorMessage && (
            <div className="mt-4 p-3 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mt-4 p-3 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Action Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-mono transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closePhotoModal}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs font-display shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
              >
                <Check className="w-4 h-4" />
                <span>Save Photo</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
