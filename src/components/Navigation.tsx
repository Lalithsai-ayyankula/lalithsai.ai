import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, FileText, Zap, Menu, X, Camera } from 'lucide-react';
import { ProfileAvatar } from './ProfileAvatar';
import { useProfilePhoto } from '../context/ProfilePhotoContext';

interface Props {
  onOpenRecruiter: () => void;
  onOpenResume: () => void;
}

export const Navigation: React.FC<Props> = ({ onOpenRecruiter, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openPhotoModal } = useProfilePhoto();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Identity", href: "#identity" },
    { label: "Signature Pipeline", href: "#signature" },
    { label: "Systems & Demos", href: "#systems" },
    { label: "Tech Universe", href: "#universe" },
    { label: "Experience", href: "#evolution" },
    { label: "Credentials", href: "#proof" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-2xl shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Mark & Status */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-900 to-indigo-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-black font-mono text-xs shadow-md shadow-cyan-500/10 group-hover:scale-105 group-hover:border-cyan-400 transition-all">
            LK
          </div>
          <div>
            <div className="text-sm font-bold text-white font-display tracking-tight flex items-center gap-1.5">
              <span>LALITH SAI KUMAR</span>
              <span className="text-cyan-400 font-mono text-xs">/ AI</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>IIIT-H LTRC RESEARCH</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-1 rounded-full text-xs font-mono text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60 transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            id="nav-recruiter-mode-btn"
            onClick={onOpenRecruiter}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono font-semibold transition-all shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
            <span>Recruiter View (60s)</span>
          </button>

          <button
            id="nav-view-resume-btn"
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20 font-sans"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV / Resume</span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={onOpenRecruiter}
            className="p-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
            title="Recruiter View"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950 border-b border-slate-800 px-6 py-5 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-mono text-slate-300 hover:text-cyan-300 py-1"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRecruiter();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              Recruiter Mode (60 Seconds)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold font-sans flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              View Formatted Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
