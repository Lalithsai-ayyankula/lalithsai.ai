import React, { useState } from 'react';
import { Sparkles, FileText, Cpu, ArrowRight, Activity, Database, CheckCircle2, ShieldCheck, Zap, Layers, Binary, Sliders } from 'lucide-react';
import { ResumeIntelligence3DCanvas } from '../three/ResumeIntelligence3DCanvas';

export const SignaturePipelineSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3); // Default to matching core

  const pipelineStages = [
    {
      num: "01",
      name: "Document Ingestion & Parsing",
      tech: "PDF/DOCX Normalizer + Pydantic v2",
      role: "Inflow Vector Node",
      desc: "Extracts unstructured multi-column candidate resumes and complex job specifications, converting them into typed Pydantic data schemas with automated schema sanitation and section boundary isolation.",
      metric: "Sub-25ms Extraction",
      type: "Inflow",
      color: "text-sky-400",
      border: "border-sky-500/40",
      bg: "bg-sky-950/20"
    },
    {
      num: "02",
      name: "384-D Dense Embedding Stream",
      tech: "Sentence-Transformers (MiniLM-L6-v2)",
      role: "Inflow Semantic Node",
      desc: "Generates high-dimensional 384-dimensional dense semantic vectors representing contextual candidate experiences and technical capabilities, bypassing exact lexical mismatch.",
      metric: "384-Dim Dense Tensors",
      type: "Inflow",
      color: "text-indigo-400",
      border: "border-indigo-500/40",
      bg: "bg-indigo-950/20"
    },
    {
      num: "03",
      name: "Dual-Stage Matching Core",
      tech: "60% Deterministic + 40% Semantic Cosine",
      role: "Central Processing Core",
      desc: "The central intelligence engine fuses deterministic rule scoring (Skills 35%, Exp 25%, Proj 20%, Edu 10%, Keywords 10%) with dense cosine similarity into a unified, mathematically calibrated alignment score.",
      metric: "Pearson r = 0.932 Benchmark",
      type: "Core Engine",
      color: "text-cyan-400",
      border: "border-cyan-400",
      bg: "bg-cyan-950/30"
    },
    {
      num: "04",
      name: "Explainable Evidence Outflow",
      tech: "FastAPI Async (<40ms API)",
      role: "Structured Outflow Node",
      desc: "Transforms match calculations into structured, auditable evidence trees — mapping category subscores, missing competencies, dense synonym overlap, and recruiter justification logs.",
      metric: "<40ms REST Endpoint",
      type: "Outflow",
      color: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-950/20"
    },
    {
      num: "05",
      name: "pgvector & Relational Persistence",
      tech: "PostgreSQL 16 + SQLAlchemy ORM",
      role: "Structured Outflow Node",
      desc: "Persists candidate profiles, JSONB structured resume schemas, and indexed 384-D vector embeddings into PostgreSQL with pgvector for low-latency similarity queries across talent pools.",
      metric: "Indexed HNSW Vector Store",
      type: "Outflow",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-950/20"
    }
  ];

  return (
    <section id="signature-pipeline-section" className="py-16 md:py-24 lg:py-28 border-t border-slate-800/80 bg-slate-950/60 relative overflow-hidden">
      {/* Anchor Target for #signature */}
      <span id="signature" className="absolute -top-24" />

      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>02 // SIGNATURE ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              DOCUMENT INFLOW → MATCHING CORE → STRUCTURED EVIDENCE
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md font-sans leading-relaxed">
            Interactive 3D particle visualization of the <strong className="text-cyan-300 font-mono font-medium">Resume Intelligence Engine</strong>: unstructured documents flow into the central hybrid matching core and branch into auditable scoring outputs.
          </p>
        </div>

        {/* 3D Particle-Based Visualization Canvas */}
        <div className="mb-10 shadow-2xl shadow-cyan-950/30">
          <ResumeIntelligence3DCanvas activePhase={activeStep} interactive={true} />
        </div>

        {/* Interactive Architecture Stepper */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
          {pipelineStages.map((stage, idx) => {
            const isSelected = activeStep === idx + 1;

            return (
              <button
                key={stage.num}
                id={`signature-stage-${stage.num}`}
                onClick={() => setActiveStep(idx + 1)}
                className={`p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-400/50 scale-[1.02]'
                    : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-cyan-400">
                      PHASE {stage.num}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                        stage.type === 'Inflow'
                          ? 'bg-sky-950 text-sky-400 border border-sky-800'
                          : stage.type === 'Core Engine'
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-extrabold'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}
                    >
                      {stage.type}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm font-display mb-1">
                    {stage.name}
                  </h4>
                  <p className="text-[11px] font-mono text-cyan-300/80 mb-2">
                    {stage.tech}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span>{stage.metric}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Deep Dive Inspector */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Activity className="w-4 h-4" />
                <span>PHASE 0{activeStep} ARCHITECTURAL SPECIFICATION</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                {pipelineStages[activeStep - 1].name}
              </h3>
              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                {pipelineStages[activeStep - 1].desc}
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300">
                  Component: {pipelineStages[activeStep - 1].tech}
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300">
                  Target Metric: {pipelineStages[activeStep - 1].metric}
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-indigo-300">
                  Node Role: {pipelineStages[activeStep - 1].role}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-5 rounded-xl bg-slate-950/90 border border-cyan-500/20 font-mono text-xs text-slate-400 space-y-3">
              <div className="text-cyan-300 font-bold text-xs uppercase flex items-center justify-between pb-2 border-b border-slate-800">
                <span>Matching Engine Contract</span>
                <span className="text-emerald-400 font-normal">Production Verified</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Pipeline Flow:</span>
                <span className="text-white font-semibold">
                  {activeStep <= 2 ? 'Inflow → Core' : activeStep === 3 ? 'Core Fusion' : 'Core → Outflow'}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Latency / Overhead:</span>
                <span className="text-emerald-400 font-semibold">&lt;40ms End-to-End</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Test Suite Coverage:</span>
                <span className="text-cyan-300 font-semibold">18 Pytests • Pearson r = 0.932</span>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-cyan-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Auditable & Deterministic Explainability Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
