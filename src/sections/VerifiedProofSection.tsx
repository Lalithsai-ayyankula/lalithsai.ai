import React from 'react';
import { achievements } from '../data/resumeData';
import { BorderGlow } from '../components/BorderGlow';
import { Award, Cloud, Trophy, Users, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export const VerifiedProofSection: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Cloud Badge':
        return Cloud;
      case 'Award / Contest':
        return Trophy;
      case 'Hackathon':
        return Trophy;
      case 'Leadership':
        return Users;
      default:
        return Award;
    }
  };

  return (
    <section id="proof" className="py-16 md:py-24 lg:py-28 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
              06 // CREDENTIALS & ACHIEVEMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              VERIFIED PROOF & LEADERSHIP
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md font-sans">
            Documented credentials spanning Google Cloud infrastructure badges, competitive hackathons, and public communication leadership.
          </p>
        </div>

        {/* Credentials Grid with BorderGlow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((item, idx) => {
            const Icon = getIcon(item.type);

            return (
              <BorderGlow
                key={item.id}
                edgeSensitivity={30}
                glowColor={
                  item.type === 'Cloud Badge' ? "200 85 60" :
                  item.type === 'Hackathon' ? "160 85 55" :
                  "260 80 65"
                }
                backgroundColor="#090d16"
                borderRadius={16}
                glowRadius={32}
                glowIntensity={0.85}
                coneSpread={24}
                colors={
                  item.type === 'Cloud Badge' ? ['#0284c7', '#38bdf8', '#6366f1'] :
                  item.type === 'Hackathon' ? ['#10b981', '#06b6d4', '#22d3ee'] :
                  ['#8b5cf6', '#d946ef', '#38bdf8']
                }
                className="h-full"
              >
                <div
                  id={`achievement-card-${item.id}`}
                  className="p-5 flex flex-col justify-between h-full group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-950 text-cyan-300 border border-slate-800">
                        {item.type}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-sm font-display mb-1">
                      {item.title}
                    </h4>
                    <div className="text-xs font-mono text-cyan-400 mb-2">
                      {item.issuer} {item.date && `• ${item.date}`}
                    </div>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED RECORD</span>
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
