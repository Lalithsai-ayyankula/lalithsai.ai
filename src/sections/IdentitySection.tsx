import React from 'react';
import { candidateProfile } from '../data/resumeData';
import { ProfileAvatar } from '../components/ProfileAvatar';
import { BorderGlow } from '../components/BorderGlow';
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
          <div className="lg:col-span-4 flex">
            <BorderGlow
              edgeSensitivity={35}
              glowColor="190 90 60"
              backgroundColor="#090d16"
              borderRadius={16}
              glowRadius={36}
              glowIntensity={1.1}
              coneSpread={26}
              colors={['#06b6d4', '#6366f1', '#22d3ee']}
              className="w-full"
            >
              <div className="p-6 backdrop-blur-xl flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <ProfileAvatar
                        size="sm"
                        showStatusDot={true}
                      />
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
            </BorderGlow>
          </div>

          {/* Main Positioning Card */}
          <div className="lg:col-span-5 flex">
            <BorderGlow
              edgeSensitivity={30}
              glowColor="220 80 60"
              backgroundColor="#090d16"
              borderRadius={16}
              glowRadius={36}
              glowIntensity={1.0}
              coneSpread={26}
              colors={['#38bdf8', '#818cf8', '#06b6d4']}
              className="w-full"
            >
              <div className="p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between h-full">
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
            </BorderGlow>
          </div>

          {/* Education & Academic Rigor Card */}
          <div className="lg:col-span-3 flex">
            <BorderGlow
              edgeSensitivity={30}
              glowColor="260 80 65"
              backgroundColor="#090d16"
              borderRadius={16}
              glowRadius={34}
              glowIntensity={0.9}
              coneSpread={26}
              colors={['#818cf8', '#c084fc', '#38bdf8']}
              className="w-full"
            >
              <div className="p-6 backdrop-blur-xl flex flex-col justify-between h-full">
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
            </BorderGlow>
          </div>
        </div>

        {/* 4 Differentiator Cards with BorderGlow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {candidateProfile.coreDifferentiators.map((diff, idx) => {
            const Icon = iconMap[diff.icon] || Cpu;

            return (
              <BorderGlow
                key={diff.title}
                edgeSensitivity={32}
                glowColor={idx % 2 === 0 ? "190 85 60" : "250 85 65"}
                backgroundColor="#090d16"
                borderRadius={16}
                glowRadius={30}
                glowIntensity={0.85}
                coneSpread={24}
                colors={
                  idx === 0 ? ['#06b6d4', '#3b82f6', '#22d3ee'] :
                  idx === 1 ? ['#6366f1', '#a855f7', '#38bdf8'] :
                  idx === 2 ? ['#10b981', '#06b6d4', '#34d399'] :
                  ['#f59e0b', '#ef4444', '#ec4899']
                }
                className="h-full"
              >
                <div
                  id={`diff-card-${idx}`}
                  className="p-5 flex flex-col justify-between h-full group"
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
              </BorderGlow>
            );
          })}
        </div>

      </div>
    </section>
  );
};
