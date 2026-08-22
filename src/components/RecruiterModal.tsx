import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { candidateProfile, projects, experience } from '../data/resumeData';
import { ProfileAvatar } from './ProfileAvatar';
import { useProfilePhoto } from '../context/ProfilePhotoContext';
import { X, Mail, Phone, MapPin, Download, ExternalLink, Github, Linkedin, CheckCircle2, Sparkles, Building2, GraduationCap, Camera } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenFullResume: () => void;
}

export const RecruiterModal: React.FC<Props> = ({ isOpen, onClose, onOpenFullResume }) => {
  const { openPhotoModal } = useProfilePhoto();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-cyan-500/30 p-6 md:p-8 shadow-2xl text-slate-200"
        >
          {/* Close button */}
          <button
            id="close-recruiter-modal"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Banner with Profile Avatar */}
          <div className="border-b border-slate-800 pb-5 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recruiter 60-Second Executive Summary</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
              <div className="relative group shrink-0">
                <ProfileAvatar
                  size="xl"
                  glow={true}
                  showStatusDot={true}
                  showUploadTrigger={false}
                />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {candidateProfile.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-cyan-300 mt-1">
                  {candidateProfile.headline}
                </p>
              </div>
            </div>

            {/* Quick Contact Chips */}
            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-mono">
              <a
                href={`mailto:${candidateProfile.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                {candidateProfile.email}
              </a>
              <a
                href={`tel:${candidateProfile.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                {candidateProfile.phone}
              </a>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                <MapPin className="w-3.5 h-3.5" />
                <span>Hyderabad WFO Ready (Full-time)</span>
              </div>
            </div>
          </div>

          {/* Top 3 Verified Strengths */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-mono text-cyan-400 uppercase block mb-1">01. Current Research</span>
              <h5 className="font-bold text-white text-sm font-display">IIIT Hyderabad (LTRC)</h5>
              <p className="text-xs text-slate-400 mt-1">
                Speech processing, transformer-based classification (HuBERT 87% acc), ASR, and multilingual speech understanding.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-mono text-indigo-400 uppercase block mb-1">02. LLMs & Agentic AI</span>
              <h5 className="font-bold text-white text-sm font-display">RAG & Multistage Pipelines</h5>
              <p className="text-xs text-slate-400 mt-1">
                Dense vector retrieval (pgvector, sentence-transformers), multi-model pipelines (Whisper → mT5 → TTS → Wav2Lip).
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">03. Production AI APIs</span>
              <h5 className="font-bold text-white text-sm font-display">FastAPI, PyTorch & CV</h5>
              <p className="text-xs text-slate-400 mt-1">
                High-throughput async APIs (&lt;40ms), OpenCV biometric verification (FaceNet 94%), and automated evaluation suites.
              </p>
            </div>
          </div>

          {/* Top 3 Product Highlights */}
          <div className="mb-6">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 font-display">
              Key Engineering Projects
            </h4>
            <div className="space-y-3">
              {projects.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-white text-sm font-display">{p.title}</h5>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                        {p.highlightMetric}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-sans line-clamp-1">{p.solution}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.technologies.slice(0, 5).map((t) => (
                        <span key={t} className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Actions */}
          <div className="pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs text-slate-400 font-mono">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>B.Tech in CSE (AI & ML) • KIET (JNTUK) • CGPA 7.50 • Expected Oct 2027</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                id="recruiter-open-full-resume-btn"
                onClick={() => {
                  onClose();
                  onOpenFullResume();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20"
              >
                <Download className="w-3.5 h-3.5" />
                View Full Formatted Resume
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
