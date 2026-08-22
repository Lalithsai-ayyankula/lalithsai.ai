import React from 'react';
import { TechnicalUniverseGraph } from '../components/TechnicalUniverseGraph';

export const TechnicalUniverseSection: React.FC = () => {
  return (
    <section id="universe" className="py-16 md:py-24 lg:py-28 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
              04 // TECHNICAL UNIVERSE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              CLUSTERS & ARCHITECTURAL STACK
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md font-sans">
            Every technology in this stack represents hands-on implementation across models, data pipelines, and production backend services.
          </p>
        </div>

        {/* Clustered Graph Component */}
        <TechnicalUniverseGraph />
      </div>
    </section>
  );
};
