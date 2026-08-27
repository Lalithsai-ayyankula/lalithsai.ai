import React from 'react';
import { candidateProfile } from '../data/resumeData';
import { BorderGlow } from '../components/BorderGlow';
import { Mail, Phone, MapPin, Github, Linkedin, FileText, Zap, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';

interface Props {
  onOpenResume: () => void;
  onOpenRecruiter: () => void;
}

export const ContactSection: React.FC<Props> = ({ onOpenResume, onOpenRecruiter }) => {
  return (
    <section id="contact" className="py-20 md:py-28 lg:py-32 border-t border-slate-800/80 bg-slate-950 relative overflow-hidden">
      {/* Subtle Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main CTA Card wrapped with BorderGlow */}
        <BorderGlow
          edgeSensitivity={32}
          glowColor="190 90 60"
          backgroundColor="#090d16"
          borderRadius={28}
          glowRadius={45}
          glowIntensity={1.2}
          coneSpread={28}
          animated={true}
          colors={['#06b6d4', '#6366f1', '#38bdf8']}
          className="w-full"
        >
          <div className="p-8 sm:p-12 lg:p-16 text-center backdrop-blur-xl">
            <div className="flex flex-col items-center mb-6">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-3">
                07 // DIRECT CONTACT & COLLABORATION
              </span>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>OPEN FOR FULL-TIME ROLES IN HYDERABAD</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight mb-4 leading-tight">
              BUILD THE NEXT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                INTELLIGENT SYSTEM.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-sans max-w-2xl mx-auto mb-8 leading-relaxed">
              Actively seeking full-time AI/ML Engineering & ML Systems roles. Let's discuss building resilient LLM/RAG pipelines, speech processing architectures, and high-impact machine learning products.
            </p>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-3.5 mb-10">
              <a
                id="contact-email-cta-btn"
                href={`mailto:${candidateProfile.email}`}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all font-display hover:scale-[1.02]"
              >
                <Mail className="w-4 h-4" />
                <span>SEND AN EMAIL</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                id="contact-view-resume-btn"
                onClick={onOpenResume}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-sm transition-all"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>VIEW FULL RESUME</span>
              </button>

              <button
                id="contact-recruiter-btn"
                onClick={onOpenRecruiter}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-500/40 font-mono text-xs transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>RECRUITER MODE (60s)</span>
              </button>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 max-w-3xl mx-auto text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase">DIRECT EMAIL</span>
                <a
                  href={`mailto:${candidateProfile.email}`}
                  className="text-white hover:text-cyan-300 font-semibold transition-colors mt-0.5 block truncate"
                >
                  {candidateProfile.email}
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase">DIRECT PHONE</span>
                <a
                  href={`tel:${candidateProfile.phone.replace(/\s+/g, '')}`}
                  className="text-white hover:text-cyan-300 font-semibold transition-colors mt-0.5 block"
                >
                  {candidateProfile.phone}
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase">PRIMARY LOCATION</span>
                <span className="text-emerald-400 font-semibold block mt-0.5">
                  Hyderabad / Kakinada
                </span>
              </div>
            </div>
          </div>
        </BorderGlow>

        {/* Footer info */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} AYYANKULA LALITH SAI KUMAR</span>
            <span>•</span>
            <span className="text-slate-400">INTELLIGENCE ENGINE PORTFOLIO</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={candidateProfile.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href={candidateProfile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${candidateProfile.email}`}
              className="hover:text-cyan-400 transition-colors"
            >
              Email
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
