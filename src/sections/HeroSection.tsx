import React from 'react';
import { motion } from 'motion/react';
import { HeroIntelligenceField } from '../three/HeroIntelligenceField';
import { candidateProfile } from '../data/resumeData';
import { ProfileAvatar } from '../components/ProfileAvatar';
import {
  FileText,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  ChevronRight,
  Zap,
  Cpu,
  ShieldCheck,
  Radio,
  ArrowDown,
} from 'lucide-react';

interface Props {
  onOpenResume: () => void;
  onOpenRecruiter: () => void;
}

// Cinematic easing curve
const cinematicEase = [0.16, 1, 0.3, 1] as const;

export const HeroSection: React.FC<Props> = ({ onOpenResume, onOpenRecruiter }) => {

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] flex flex-col justify-between pt-24 sm:pt-28 pb-8 overflow-hidden bg-[#080a0f]"
    >
      {/* Sequence Phase 1: 3D Intelligence Field & Atmospheric Atmosphere Forms First */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: cinematicEase }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-20 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-radial-gradient opacity-90" />
      </motion.div>

      {/* Layer 2: 3D Computational Canvas (Smooth Entrance) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: cinematicEase }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <HeroIntelligenceField className="opacity-95" />
      </motion.div>

      {/* Sequence Phase 1b: Technical Micro-HUD Annotations in 3D Field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 hidden lg:block">
        {/* Top-Right Telemetry Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.35, ease: cinematicEase }}
          className="absolute top-32 right-8 flex flex-col items-end gap-1.5 font-mono text-[10px] text-slate-400 select-none"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 border border-cyan-500/30 backdrop-blur-md text-cyan-300 shadow-xl shadow-cyan-500/10">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span className="font-bold tracking-wider">SYS: LTRC-IIIT-H SPEECH LAB</span>
          </div>
          <span className="text-slate-500 tracking-wider">TENSOR: 384-D EMBEDDINGS • LATENCY &lt;15MS</span>
        </motion.div>

        {/* Bottom-Right Architecture Node */}
        <motion.div
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.5, ease: cinematicEase }}
          className="absolute bottom-24 right-12 flex flex-col items-end gap-1 font-mono text-[10px] text-slate-400 select-none"
        >
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-950/85 border border-slate-800 backdrop-blur-sm text-slate-300 shadow-lg">
            <Cpu className="w-3 h-3 text-indigo-400" />
            <span>PIPELINE: HuBERT → Wav2Lip → pgvector</span>
          </div>
          <span className="text-[9px] text-slate-600">INFERENCE PRECISION: FP16 ON PYTORCH</span>
        </motion.div>
      </div>

      {/* Layer 4: Foreground Hero Typography & Sequenced Personal Identity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 my-auto py-6 sm:py-10">
        <div className="max-w-4xl space-y-6 sm:space-y-7 text-left">
          
          {/* Sequence Phase 2: Professional Role & Research Tag Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: cinematicEase }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            {/* Professional Role Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-md backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold tracking-wider">AI / ML ENGINEER</span>
            </div>

            {/* Research Institution Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 border border-slate-800 text-xs font-mono text-slate-300 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>IIIT Hyderabad (LTRC)</span>
            </div>

            {/* Relocation / Work Mode */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Full-Time WFO Hyderabad Ready</span>
            </div>
          </motion.div>

          {/* Sequence Phase 3: Personal Photo & Editorial Name Anchor with Fluid Clamp Typography */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 lg:gap-10">
              {/* Profile Photo: High-Impact Portrait Module */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.26, ease: cinematicEase }}
                className="relative group shrink-0"
              >
                {/* Outer Ambient Cyan & Indigo Rim Glow */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-cyan-400/30 via-indigo-500/20 to-sky-400/30 blur-xl group-hover:blur-2xl group-hover:from-cyan-400/50 transition-all duration-300 pointer-events-none" />

                {/* Technical HUD Portrait Frame */}
                <div className="relative p-1.5 rounded-3xl bg-slate-950/90 border border-cyan-400/50 group-hover:border-cyan-300 shadow-[0_0_40px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_55px_rgba(6,182,212,0.45)] transition-all duration-300">
                  {/* Subtle Technical Corner Brackets */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400 rounded-tl-sm pointer-events-none" />
                  <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400 rounded-tr-sm pointer-events-none" />
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400 rounded-bl-sm pointer-events-none" />
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400 rounded-br-sm pointer-events-none" />

                  <ProfileAvatar
                    size="hero"
                    glow={false}
                    showStatusDot={true}
                    showUploadTrigger={false}
                    className="rounded-2xl ring-2 ring-slate-950 overflow-hidden cursor-default"
                  />
                </div>
              </motion.div>

              {/* Clamp-Based Primary Title: AYYANKULA LALITH SAI KUMAR */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16, filter: 'blur(3px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.75, delay: 0.3, ease: cinematicEase }}
                className="space-y-2 flex-1"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.3em] text-cyan-400 uppercase">
                    RESEARCH PROFILE //
                  </span>
                  <div className="h-px flex-1 max-w-[140px] bg-gradient-to-r from-cyan-500/80 via-indigo-500/50 to-transparent" />
                </div>

                <h1 className="text-[clamp(2.1rem,5.5vw,5.2rem)] font-black tracking-tight text-white font-display leading-[0.94] select-none">
                  <span className="text-cyan-400">AYYANKULA </span>
                  <br className="hidden sm:inline" />
                  <span>LALITH SAI </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
                    KUMAR
                  </span>
                </h1>

                {/* AI/ML Engineer & Speech Processing Narrative Subtitle */}
                <div className="pt-1 space-y-1">
                  <p className="text-xs sm:text-sm md:text-base font-mono text-cyan-300 font-semibold tracking-wide flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-white">AI/ML ENGINEER</span>
                    <span className="text-cyan-500">•</span>
                    <span>SPEECH-PROCESSING RESEARCH @ IIIT HYDERABAD (LTRC)</span>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 font-mono">
                    LLMs • RAG • Agentic AI • NLP • Speech AI • Deep Learning
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Sequence Phase 4: Resume-Grounded Professional Positioning & Technical Labels */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44, ease: cinematicEase }}
            className="space-y-4"
          >
            {/* Confident Brand Narrative Line */}
            <div className="flex items-center gap-2 text-sm sm:text-base font-display font-semibold text-cyan-300">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Building End-to-End Multistage LLM & Speech AI Systems for Real-World Problems.</span>
            </div>

            {/* Accurate Professional Grounded Technical Summary */}
            <p className="text-base sm:text-lg text-slate-300 font-sans max-w-2xl leading-relaxed">
              AI/ML Engineer with hands-on experience in <strong className="text-cyan-300 font-semibold">LLMs, RAG, Agentic AI, NLP, Speech AI, and deep learning</strong>, 
              currently conducting speech-processing research at <strong className="text-white font-semibold">IIIT Hyderabad’s LTRC</strong>. 
              Experienced in building end-to-end AI systems, including multistage LLM/speech pipelines, retrieval systems, transformer-based speech classification, 
              and computer vision applications using <strong className="text-indigo-300 font-semibold">PyTorch, Hugging Face, FastAPI, and OpenCV</strong>.
            </p>

            {/* Technical Specialization Micro-Labels (From Summary) */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs text-slate-300">
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-cyan-300">
                LLMs & RAG
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-indigo-300">
                Agentic AI
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-emerald-300">
                Speech AI & NLP (LTRC)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-slate-200">
                PyTorch & Hugging Face
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-purple-300">
                Computer Vision
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-sky-300">
                FastAPI APIs
              </span>
            </div>
          </motion.div>

          {/* Sequence Phase 5: High-Contrast Interactive Actions Become Active */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.56, ease: cinematicEase }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            {/* Primary Action: Explore Systems */}
            <a
              id="hero-explore-work-btn"
              href="#systems"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 hover:to-sky-300 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all font-display hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>EXPLORE SYSTEMS</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            {/* Secondary Action: View Resume */}
            <button
              id="hero-view-resume-btn"
              onClick={onOpenResume}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm transition-all shadow-lg hover:border-cyan-500/40"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>VIEW RESUME</span>
            </button>

            {/* Recruiter Quick Snapshot */}
            <button
              id="hero-recruiter-summary-btn"
              onClick={onOpenRecruiter}
              className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/70 text-indigo-200 border border-indigo-500/40 font-mono text-xs transition-all shadow-lg hover:border-indigo-400"
            >
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>RECRUITER (60s)</span>
            </button>
          </motion.div>

          {/* Sequence Phase 6: Verified Contact & Social Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.68 }}
            className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-t border-slate-800/60"
          >
            <a
              href={candidateProfile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors py-1"
            >
              <Github className="w-4 h-4 text-slate-300" />
              <span>github.com/Lalithsai-ayyankula</span>
            </a>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <a
              href={candidateProfile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors py-1"
            >
              <Linkedin className="w-4 h-4 text-cyan-400" />
              <span>LinkedIn</span>
            </a>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <a
              href={`mailto:${candidateProfile.email}`}
              className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors py-1"
            >
              <Mail className="w-4 h-4 text-slate-300" />
              <span>{candidateProfile.email}</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Telemetry & Subtle Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.75 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>GPU ACCELERATED • 3D INTELLIGENCE FIELD ACTIVE</span>
        </div>
        <a
          href="#systems"
          className="hidden sm:flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <span>EXPLORE PIPELINE ARCHITECTURE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
        </a>
      </motion.div>
    </section>
  );
};
