import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Activity, BarChart3, Database, Award, CheckCircle2, ChevronRight, Cpu } from 'lucide-react';

interface LayerData {
  layer: number;
  accuracy: number;
  representationType: 'Acoustic / Spectral' | 'Phonetic / Formant' | 'Dialectal & Phonological' | 'Contextual / Semantic';
  f1Score: number;
  optimal: boolean;
  insight: string;
}

const LAYER_BENCHMARKS: LayerData[] = [
  { layer: 1, accuracy: 62.4, representationType: 'Acoustic / Spectral', f1Score: 0.61, optimal: false, insight: "Captures low-level spectral harmonics similar to raw spectrogram filters." },
  { layer: 2, accuracy: 65.8, representationType: 'Acoustic / Spectral', f1Score: 0.64, optimal: false, insight: "Basic pitch and pitch-contour variation encoding." },
  { layer: 3, accuracy: 69.1, representationType: 'Acoustic / Spectral', f1Score: 0.68, optimal: false, insight: "Formant transition extraction across syllable boundaries." },
  { layer: 4, accuracy: 72.3, representationType: 'Phonetic / Formant', f1Score: 0.71, optimal: false, insight: "Phonetic inventory distinctions emerge (vowel duration & retroflex consonants)." },
  { layer: 5, accuracy: 75.0, representationType: 'Phonetic / Formant', f1Score: 0.74, optimal: false, insight: "Aspirated vs non-aspirated consonant separation." },
  { layer: 6, accuracy: 77.4, representationType: 'Phonetic / Formant', f1Score: 0.76, optimal: false, insight: "Regional rhythm timing and stress pattern clustering." },
  { layer: 7, accuracy: 79.8, representationType: 'Dialectal & Phonological', f1Score: 0.79, optimal: false, insight: "Sub-syllabic dialectal phonology begins dominant clustering." },
  { layer: 8, accuracy: 82.5, representationType: 'Dialectal & Phonological', f1Score: 0.82, optimal: false, insight: "Distinct Indian language phonetic interference patterns." },
  { layer: 9, accuracy: 85.2, representationType: 'Dialectal & Phonological', f1Score: 0.85, optimal: false, insight: "Strong separation between Dravidian and Indo-Aryan accent substrates." },
  { layer: 10, accuracy: 87.0, representationType: 'Dialectal & Phonological', f1Score: 0.87, optimal: true, insight: "Peak accent identification accuracy (87.0%). Optimal feature representation for downstream MLP classifier." },
  { layer: 11, accuracy: 86.4, representationType: 'Dialectal & Phonological', f1Score: 0.86, optimal: false, insight: "High accuracy with minor semantic abstraction encroachment." },
  { layer: 12, accuracy: 81.2, representationType: 'Contextual / Semantic', f1Score: 0.80, optimal: false, insight: "Final layer generalizes toward lexical semantics, slightly reducing raw accent distinctiveness." },
];

const CONFUSION_MATRIX = [
  { accent: "Hindi Accent", hi: 89, te: 3, ta: 2, mr: 4, bn: 2 },
  { accent: "Telugu Accent", hi: 4, te: 88, ta: 5, mr: 1, bn: 2 },
  { accent: "Tamil Accent", hi: 2, te: 6, ta: 87, mr: 2, bn: 3 },
  { accent: "Marathi Accent", hi: 6, te: 2, ta: 2, mr: 86, bn: 4 },
  { accent: "Bengali Accent", hi: 3, te: 2, ta: 3, mr: 5, bn: 87 },
];

export const HubertLayerBenchmark: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<LayerData>(LAYER_BENCHMARKS[9]); // Layer 10 (87%)
  const [viewMode, setViewMode] = useState<'layers' | 'matrix'>('layers');

  return (
    <div className="w-full rounded-2xl bg-slate-900/90 border border-indigo-500/20 p-5 md:p-7 shadow-2xl backdrop-blur-xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Empirical Model Probing & Representation Analysis</span>
          </div>
          <h4 className="text-xl md:text-2xl font-bold text-white font-display">
            HuBERT 12-Layer Transformer Benchmark
          </h4>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            id="tab-hubert-layers"
            onClick={() => setViewMode('layers')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'layers'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Layer-Wise Probing
          </button>
          <button
            id="tab-hubert-matrix"
            onClick={() => setViewMode('matrix')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'matrix'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Confusion Matrix (IndicAccentDb)
          </button>
        </div>
      </div>

      {viewMode === 'layers' ? (
        <div className="mt-6">
          {/* Baseline vs HuBERT Comparison Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Baseline Model (MFCC + CNN)</span>
              <div className="text-xl font-bold text-slate-300 mt-1 font-mono">68.5% <span className="text-xs text-slate-500 font-sans">Accuracy</span></div>
              <p className="text-[11px] text-slate-500 mt-1">Struggles with cross-speaker phonetic variance</p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 relative overflow-hidden">
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-indigo-500 text-slate-950 text-[9px] font-bold uppercase">Peak Result</div>
              <span className="text-[10px] font-mono text-indigo-300 uppercase">HuBERT (Layer 10 Embeddings)</span>
              <div className="text-xl font-bold text-indigo-300 mt-1 font-mono">87.0% <span className="text-xs text-indigo-400 font-sans">Accuracy</span></div>
              <p className="text-[11px] text-indigo-200/70 mt-1">+18.5% gain over spectral baseline</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Evaluated Dataset</span>
              <div className="text-base font-bold text-slate-200 mt-1 font-mono">IndicAccentDb</div>
              <p className="text-[11px] text-slate-500 mt-1">Hugging Face multi-dialect Indian speech corpus</p>
            </div>
          </div>

          {/* Interactive Layer Bar Chart */}
          <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-slate-300 font-semibold uppercase">
                Accuracy by Transformer Layer (Click a layer to inspect representation depth)
              </span>
              <span className="text-xs font-mono text-indigo-400">
                Selected: <strong className="text-white">Layer {selectedLayer.layer} ({selectedLayer.accuracy}%)</strong>
              </span>
            </div>

            {/* Bars */}
            <div className="grid grid-cols-12 gap-1.5 sm:gap-2 items-end h-44 pt-4 pb-2 px-2 bg-slate-900/50 rounded-lg border border-slate-800/60">
              {LAYER_BENCHMARKS.map((item) => {
                const isSelected = selectedLayer.layer === item.layer;
                const heightPercent = ((item.accuracy - 50) / 40) * 100;

                return (
                  <button
                    key={item.layer}
                    id={`layer-bar-${item.layer}`}
                    onClick={() => setSelectedLayer(item)}
                    className="flex flex-col items-center justify-end h-full group focus:outline-none"
                  >
                    {/* Tooltip Accuracy on Hover/Active */}
                    <span
                      className={`text-[9px] font-mono mb-1 transition-opacity ${
                        isSelected || item.optimal
                          ? 'opacity-100 font-bold text-cyan-300'
                          : 'opacity-0 group-hover:opacity-100 text-slate-400'
                      }`}
                    >
                      {item.accuracy}%
                    </span>

                    {/* Bar visual */}
                    <div
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-t from-indigo-600 to-cyan-400 shadow-lg shadow-cyan-500/30'
                          : item.optimal
                          ? 'bg-indigo-500/80 hover:bg-indigo-400'
                          : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />

                    {/* Layer label */}
                    <span
                      className={`text-[10px] font-mono mt-2 ${
                        isSelected ? 'text-cyan-300 font-bold' : 'text-slate-500'
                      }`}
                    >
                      L{item.layer}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Layer Deep Dive Card */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-indigo-500/30">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-bold">
                    Layer {selectedLayer.layer}
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    Category: <span className="text-cyan-300 font-mono">{selectedLayer.representationType}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span>Accuracy: <strong className="text-white">{selectedLayer.accuracy}%</strong></span>
                  <span className="text-slate-600">•</span>
                  <span>F1-Score: <strong className="text-emerald-400">{selectedLayer.f1Score}</strong></span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selectedLayer.insight}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Confusion Matrix View */
        <div className="mt-6 rounded-xl bg-slate-950/80 border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-300 font-semibold uppercase">
              IndicAccentDb Normalized Classification Matrix (Layer 10 Probe)
            </span>
            <span className="text-xs font-mono text-emerald-400">Overall Accuracy: 87.0%</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-center border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="text-left py-2 px-3">Actual \ Predicted</th>
                  <th className="py-2 px-3">Hindi</th>
                  <th className="py-2 px-3">Telugu</th>
                  <th className="py-2 px-3">Tamil</th>
                  <th className="py-2 px-3">Marathi</th>
                  <th className="py-2 px-3">Bengali</th>
                </tr>
              </thead>
              <tbody>
                {CONFUSION_MATRIX.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-900/80 hover:bg-slate-900/40">
                    <td className="text-left py-2.5 px-3 font-semibold text-slate-300">{row.accent}</td>
                    {[row.hi, row.te, row.ta, row.mr, row.bn].map((val, cellIdx) => {
                      const isDiagonal = idx === cellIdx;
                      return (
                        <td key={cellIdx} className="py-2.5 px-3">
                          <span
                            className={`inline-block px-2.5 py-1 rounded ${
                              isDiagonal
                                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                                : val > 4
                                ? 'bg-slate-800/80 text-amber-300/80'
                                : 'text-slate-500'
                            }`}
                          >
                            {val}%
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Artifact: Layer-wise JSON evaluation metrics & reproducible Scikit-learn classification reports</span>
            <span className="text-indigo-400 font-mono">Precision: 0.874 • Recall: 0.870</span>
          </div>
        </div>
      )}
    </div>
  );
};
