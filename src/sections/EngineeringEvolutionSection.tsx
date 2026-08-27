import React from 'react';
import { experience } from '../data/resumeData';
import { BorderGlow } from '../components/BorderGlow';
import { Building2, Calendar, MapPin, CheckCircle2, Sparkles, Terminal } from 'lucide-react';

export const EngineeringEvolutionSection: React.FC = () => {
  return (
    <section id="evolution" className="py-16 md:py-24 lg:py-28 border-t border-slate-800/80 bg-slate-950/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
              05 // RESEARCH & EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              ENGINEERING EVOLUTION
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md font-sans">
            From foundational supervised ML to dedicated speech-processing research at IIIT Hyderabad's LTRC.
          </p>
        </div>

        {/* Cinematic Experience Timeline */}
        <div className="space-y-6">
          {experience.map((exp, idx) => {
            return (
              <BorderGlow
                key={exp.id}
                edgeSensitivity={30}
                glowColor={exp.isCurrent ? "190 90 60" : "220 70 55"}
                backgroundColor="#090d16"
                borderRadius={18}
                glowRadius={36}
                glowIntensity={exp.isCurrent ? 1.0 : 0.8}
                coneSpread={26}
                colors={
                  exp.isCurrent
                    ? ['#06b6d4', '#10b981', '#38bdf8']
                    : ['#64748b', '#38bdf8', '#818cf8']
                }
                className="w-full"
              >
                <div
                  id={`exp-card-${exp.id}`}
                  className="p-6 sm:p-8 backdrop-blur-xl"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            exp.isCurrent
                              ? 'bg-cyan-500 text-slate-950 shadow-sm'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {exp.type.toUpperCase()}
                        </span>
                        {exp.isCurrent && (
                          <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            CURRENT ROLE
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold text-cyan-300/90 font-sans mt-0.5">
                        {exp.organization}
                      </div>
                    </div>

                    {/* Period & Location */}
                    <div className="text-left lg:text-right font-mono text-xs text-slate-400 space-y-1">
                      <div className="flex items-center lg:justify-end gap-1.5 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center lg:justify-end gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Contributions List */}
                  <div className="py-4">
                    <ul className="space-y-2">
                      {exp.description.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Associated Technologies */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-mono text-slate-500 mr-1">Skills & Tools:</span>
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded bg-slate-950 text-slate-300 text-xs font-mono border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
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
