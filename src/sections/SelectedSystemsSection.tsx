import React, { useState } from 'react';
import { projects } from '../data/resumeData';
import { ResumeEngineSimulator } from '../components/ResumeEngineSimulator';
import { DubbingPipelineSimulator } from '../components/DubbingPipelineSimulator';
import { HubertLayerBenchmark } from '../components/HubertLayerBenchmark';
import { FaceNetVisualizer } from '../components/FaceNetVisualizer';
import { VisionSmogInspector } from '../components/VisionSmogInspector';
import { Layers, ArrowRight, ExternalLink, Github, CheckCircle2, Cpu, Sparkles, Terminal, Activity } from 'lucide-react';

export const SelectedSystemsSection: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0].id);

  const currentProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const renderSimulator = (demoType: string) => {
    switch (demoType) {
      case 'resume_engine':
        return <ResumeEngineSimulator />;
      case 'dubbing_simulator':
        return <DubbingPipelineSimulator />;
      case 'hubert_layers':
        return <HubertLayerBenchmark />;
      case 'facenet_service':
        return <FaceNetVisualizer />;
      case 'air_quality':
        return <VisionSmogInspector />;
      default:
        return <ResumeEngineSimulator />;
    }
  };

  return (
    <section id="systems" className="py-16 md:py-24 lg:py-28 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
              03 // SELECTED SYSTEMS & ARCHITECTURES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              PRODUCT & RESEARCH DEMONSTRATIONS
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md font-sans">
            Every project is engineered as an interactive system case study detailing the problem, pipeline topology, and verified results.
          </p>
        </div>

        {/* Project Selector Nav Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {projects.map((project, idx) => {
            const isSelected = project.id === activeProjectId;

            return (
              <button
                key={project.id}
                id={`project-tab-${project.id}`}
                onClick={() => setActiveProjectId(project.id)}
                className={`p-4 rounded-xl text-left transition-all duration-200 border ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/40'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    SYSTEM 0{idx + 1}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        : 'bg-slate-900 text-slate-500'
                    }`}
                  >
                    {project.year}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white font-display truncate mb-1">
                  {project.title}
                </h4>
                <p className="text-xs text-slate-400 font-mono truncate">
                  {project.domain}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Project Technical Case Study Card */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 mb-8 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase mb-1">
                <span>{currentProject.domain}</span>
                <span className="text-slate-600">•</span>
                <span>{currentProject.year}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {currentProject.title}
              </h3>
              <p className="text-sm text-slate-300 font-sans mt-1">
                {currentProject.subtitle}
              </p>
            </div>

            {/* Key Metric Badge */}
            <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 text-right">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">CORE BENCHMARK</span>
              <strong className="text-cyan-300 text-sm font-mono">{currentProject.highlightMetric}</strong>
            </div>
          </div>

          {/* Problem & Solution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-xs font-mono text-rose-400 uppercase font-bold block mb-2">
                The Problem
              </span>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {currentProject.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-xs font-mono text-emerald-400 uppercase font-bold block mb-2">
                The Engineering Solution
              </span>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {currentProject.solution}
              </p>
            </div>
          </div>

          {/* Architecture Pipeline Flow Diagram */}
          <div className="mb-8">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2 font-display">
              <Terminal className="w-3.5 h-3.5" />
              <span>System Topology & Inter-Stage Contracts</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {currentProject.systemArchitecture.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-cyan-400">
                        STAGE 0{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{step.tech}</span>
                    </div>
                    <h5 className="font-bold text-white text-xs mb-1 font-display">{step.name}</h5>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-2">
                      {step.role}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-500 truncate">
                    {step.io}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Results & Key Artifacts */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-slate-800">
            <div className="md:col-span-7">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 font-display">
                Verified System Outcomes
              </h4>
              <ul className="space-y-2">
                {currentProject.results.map((res, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 font-display">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {currentProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 text-cyan-300 text-xs font-mono border border-slate-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive Simulator Section */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider font-display">
              Live System Playground: {currentProject.title}
            </h4>
          </div>
          {renderSimulator(currentProject.demoType)}
        </div>

      </div>
    </section>
  );
};
