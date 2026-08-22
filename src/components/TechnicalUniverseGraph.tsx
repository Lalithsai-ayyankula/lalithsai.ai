import React, { useState } from 'react';
import { skillGroups } from '../data/resumeData';
import { Sparkles, Network, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';

export const TechnicalUniverseGraph: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(skillGroups[0].category);
  const [hoveredSkill, setHoveredSkill] = useState<{
    name: string;
    context: string;
    level: string;
    relatedTo?: string[];
  } | null>(null);

  const activeGroup = skillGroups.find((g) => g.category === selectedCategory) || skillGroups[0];

  return (
    <div className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 p-6 md:p-8 backdrop-blur-xl">
      {/* Category Selection Tabs */}
      <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-800">
        {skillGroups.map((group) => {
          const isSelected = selectedCategory === group.category;
          return (
            <button
              key={group.category}
              id={`skill-cat-${group.category.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
              onClick={() => {
                setSelectedCategory(group.category);
                setHoveredSkill(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all duration-200 ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              {group.category}
            </button>
          );
        })}
      </div>

      {/* Category Overview */}
      <div className="py-4 flex items-center justify-between">
        <p className="text-sm text-slate-400 font-sans">
          {activeGroup.description}
        </p>
        <span className="text-xs font-mono text-cyan-400 hidden sm:inline">
          {activeGroup.skills.length} Technical Disciplines
        </span>
      </div>

      {/* Grid of Interactive Skill Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 my-4">
        {activeGroup.skills.map((skill) => {
          const isHovered = hoveredSkill?.name === skill.name;

          return (
            <div
              key={skill.name}
              id={`skill-node-${skill.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
              onMouseEnter={() => setHoveredSkill(skill)}
              className={`p-4 rounded-xl transition-all duration-200 cursor-pointer border ${
                isHovered
                  ? 'bg-cyan-950/40 border-cyan-400/80 shadow-lg shadow-cyan-500/10 -translate-y-0.5'
                  : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-bold text-white font-display tracking-tight">{skill.name}</h5>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                    skill.level === 'Core'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}
                >
                  {skill.level}
                </span>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                {skill.context}
              </p>

              {skill.relatedTo && skill.relatedTo.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-900 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono text-slate-500">Connected:</span>
                  {skill.relatedTo.map((rel) => (
                    <span
                      key={rel}
                      className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] font-mono border border-slate-800"
                    >
                      {rel}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Context Bar */}
      <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-500 gap-2">
        <span className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          Verified across production repositories, research at IIIT-H LTRC, and Google Cloud credentials.
        </span>
        <span className="text-slate-400">
          Hover node to inspect relational dependencies
        </span>
      </div>
    </div>
  );
};
