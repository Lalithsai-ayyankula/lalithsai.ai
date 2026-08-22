import React from 'react';
import { candidateProfile } from '../data/resumeData';
import { ProfileAvatar } from '../components/ProfileAvatar';
import { Cpu, Layers, Sparkles, Server, GraduationCap, Terminal } from 'lucide-react';

export const IdentitySection: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Cpu,
    Layers,
    Sparkles,
    Server,
  };

  return (
    <section id="identity" className="py-16 md:py-24 lg:py-28 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
              01 // THE ENGINEER BEHIND THE SYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              TECHNICAL IDENTITY & PHILOSOPHY
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md font-sans">
            Moving beyond standalone models to resilient, interconnected AI architectures designed for real-world reliability.
          </p>
        </div>

        {/* Top Profile Spotlight + Narrative & Research Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          {/* Research Matrix & Lab Affiliation Card */}
          <div className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/30 p-6 backdrop-blur-xl flex flex-col justify-between relative group shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <ProfileAvatar size="sm" showStatusDot={false} showUploadTrigger={false} />
                  <div>
                    <h3 className="text-sm font-bold text-white font-display">
                      {candidateProfile.name}
                    </h3>
                    <p className="text-[11px] font-mono text-cyan-400">
                      AI/ML Engineer & Researcher
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LTRC Lab</span>
                </div>
              </div>

              <div className="mt-5 space-y-3.5 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <span className="text-slate-500 text-[10px] block uppercase tracking-wider mb-1">Affiliation</span>
                  <span className="text-slate-200 font-semibold">Language Technologies Research Centre (LTRC), IIIT Hyderabad</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <span className="text-slate-500 text-[10px] block uppercase tracking-wider mb-1">Core Focus</span>
                  <span className="text-cyan-300 font-semibold">LLMs • RAG • Agentic AI • Speech AI • CV</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <span className="text-slate-500 text-[10px] block uppercase tracking-wider mb-1">Work Mode</span>
                  <span className="text-emerald-300 font-semibold">Full-Time On-Site Hyderabad (Immediate)</span>
                </div>
              </div>
            </div>

            <div className="w-full mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>B.Tech CSE: <strong className="text-white">7.50 CGPA</strong></span>
              <span className="text-cyan-400 font-semibold">Oct 2027 Grad</span>
            </div>
          </div>

          {/* Main Positioning Card */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-4">
                <Terminal className="w-4 h-4" />
                <span>CORE ARCHITECTURAL PERSPECTIVE</span>
              </div>

              <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed mb-6">
                Specialized in translating cutting-edge ML models into <strong className="text-cyan-300 font-medium">end-to-end production AI systems</strong>. From multistage LLM and speech pipelines to dense retrieval systems (RAG), transformer-based speech classification, and real-time computer vision, the focus is on rigorous model evaluation, pipeline orchestration, and resilient API development for real-world impact.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span>Active Research:</span>
                <span className="text-cyan-400 font-bold">Speech AI & ASR (IIIT-H LTRC)</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Core Stack:</span>
                <span className="text-indigo-400 font-bold">PyTorch • Hugging Face • FastAPI • OpenCV</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Availability:</span>
                <span className="text-emerald-400 font-bold">Full-Time On-Site Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Education & Academic Rigor Card */}
          <div className="lg:col-span-3 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-3">
                <GraduationCap className="w-4 h-4" />
                <span>FOUNDATIONAL ACADEMICS</span>
              </div>

              <h3 className="text-lg font-bold text-white font-display">
                {candidateProfile.education.degree}
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1">
                {candidateProfile.education.institution} ({candidateProfile.education.affiliate})
              </p>

              <div className="flex items-center gap-2 my-3">
                <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold">
                  CGPA: {candidateProfile.education.cgpa}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {candidateProfile.education.expectedGraduation}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 block mb-1.5">Core Coursework:</span>
              <div className="flex flex-wrap gap-1">
                {candidateProfile.education.coursework.map((course) => (
                  <span
                    key={course}
                    className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 text-[10px] font-mono border border-slate-800"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Differentiator Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {candidateProfile.coreDifferentiators.map((diff, idx) => {
            const Icon = iconMap[diff.icon] || Cpu;

            return (
              <div
                key={diff.title}
                id={`diff-card-${idx}`}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 group-hover:border-cyan-500/50 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base font-display mb-2">
                    {diff.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {diff.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 text-[10px] font-mono text-slate-500">
                  PILLAR 0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
