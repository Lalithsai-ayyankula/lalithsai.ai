import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Volume2, Mic, Languages, Video, CheckCircle2, ChevronRight, Sparkles, Activity } from 'lucide-react';

interface LanguageOption {
  code: string;
  name: string;
  native: string;
  sampleInput: string;
  translated: string;
  speechDuration: string;
}

const LANGUAGES: LanguageOption[] = [
  {
    code: 'hi',
    name: 'Hindi',
    native: 'हिन्दी',
    sampleInput: "Welcome to this physics lecture on electromagnetic wave propagation and Maxwell's equations.",
    translated: "विद्युत चुम्बकीय तरंग प्रसार और मैक्सवेल के समीकरणों पर इस भौतिकी व्याख्यान में आपका स्वागत है।",
    speechDuration: "3.4s"
  },
  {
    code: 'kok',
    name: 'Konkani',
    native: 'कोंकणी',
    sampleInput: "Welcome to this physics lecture on electromagnetic wave propagation and Maxwell's equations.",
    translated: "इलेक्ट्रोमॅग्नेटिक ल्हारां आनी मॅक्सवेलाच्या समीकरणांचेर ह्या भौतिकशास्त्र व्याख्यानांत तुमकां येवकार.",
    speechDuration: "3.8s"
  },
  {
    code: 'mai',
    name: 'Maithili',
    native: 'मैथिली',
    sampleInput: "Welcome to this physics lecture on electromagnetic wave propagation and Maxwell's equations.",
    translated: "विद्युत चुम्बकीय तरंग प्रसार आ मैक्सवेलक समीकरण पर एहि भौतिकी व्याख्यान मे अहाँक स्वागत अछि।",
    speechDuration: "3.6s"
  }
];

export const DubbingPipelineSimulator: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<LanguageOption>(LANGUAGES[0]);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [waveformBars, setWaveformBars] = useState<number[]>([]);

  // Generate dynamic waveform bars
  useEffect(() => {
    const bars = Array.from({ length: 28 }, () => Math.floor(Math.random() * 80) + 15);
    setWaveformBars(bars);
  }, [activeStage, isRunning]);

  const stages = [
    {
      id: 1,
      name: "Whisper ASR",
      title: "Speech Recognition",
      model: "OpenAI Whisper-Large-v3",
      icon: Mic,
      tag: "16kHz Audio → Tokens",
      status: activeStage === 1 ? "Transcribing acoustic tokens..." : completedStages.includes(1) ? "Transcribed (100%)" : "Idle",
      details: "Raw 16kHz lecture audio stream chunked into 30s mel-spectrogram windows. Extracts timestamped token segments with English phoneme recognition."
    },
    {
      id: 2,
      name: "mT5 Translation",
      title: "Neural Translation",
      model: "Google mT5-Base Multilingual",
      icon: Languages,
      tag: "EN Text → Indic Tokens",
      status: activeStage === 2 ? `Translating into ${selectedLang.name}...` : completedStages.includes(2) ? `Translated to ${selectedLang.name}` : "Waiting",
      details: `Seq-to-seq cross-lingual translation preserving scientific terminology and pedagogical cadence for ${selectedLang.name} (${selectedLang.native}).`
    },
    {
      id: 3,
      name: "Coqui TTS",
      title: "Acoustic Speech Synthesis",
      model: "Coqui Neural Voice Synthesizer",
      icon: Volume2,
      tag: "Text → 24kHz Acoustic Wave",
      status: activeStage === 3 ? "Synthesizing regional voice..." : completedStages.includes(3) ? "Audio Rendered" : "Waiting",
      details: "Converts translated target tokens into high-fidelity synthetic regional speech waveform matching original speaker pitch and educational pacing."
    },
    {
      id: 4,
      name: "Wav2Lip Lip Sync",
      title: "Visual Facial Synthesis",
      model: "Wav2Lip GAN Discriminator",
      icon: Video,
      tag: "Video Frames + Audio → Synced MP4",
      status: activeStage === 4 ? "Morphing mouth landmark frames..." : completedStages.includes(4) ? "Pipeline Complete" : "Waiting",
      details: "Generates photorealistic speaker mouth and jaw deformation synchronized to millisecond audio phonemes without distorting upper facial expressions."
    }
  ];

  const handleRunPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStage(1);
    setCompletedStages([]);

    // Stage 1: Whisper
    setTimeout(() => {
      setCompletedStages([1]);
      setActiveStage(2);

      // Stage 2: mT5
      setTimeout(() => {
        setCompletedStages([1, 2]);
        setActiveStage(3);

        // Stage 3: Coqui TTS
        setTimeout(() => {
          setCompletedStages([1, 2, 3]);
          setActiveStage(4);

          // Stage 4: Wav2Lip
          setTimeout(() => {
            setCompletedStages([1, 2, 3, 4]);
            setActiveStage(0);
            setIsRunning(false);
          }, 1400);
        }, 1300);
      }, 1200);
    }, 1100);
  };

  const handleReset = () => {
    setIsRunning(false);
    setActiveStage(0);
    setCompletedStages([]);
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900/90 border border-cyan-500/20 p-5 md:p-7 shadow-2xl backdrop-blur-xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Multi-Model Orchestration Simulator</span>
          </div>
          <h4 className="text-xl md:text-2xl font-bold text-white font-display">
            Multilingual Video Dubbing Engine
          </h4>
        </div>

        {/* Target Language Selectors */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 pl-2 pr-1 hidden sm:inline font-mono">Target:</span>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              id={`lang-btn-${lang.code}`}
              disabled={isRunning}
              onClick={() => {
                setSelectedLang(lang);
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedLang.code === lang.code
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {lang.name} <span className="opacity-75 font-normal">({lang.native})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4-Stage Visual Pipeline Workflow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-6">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isActive = activeStage === stage.id;
          const isDone = completedStages.includes(stage.id);

          return (
            <div
              key={stage.id}
              id={`pipeline-stage-${stage.id}`}
              className={`relative rounded-xl p-4 transition-all duration-300 border ${
                isActive
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/50'
                  : isDone
                  ? 'bg-slate-950/70 border-emerald-500/40'
                  : 'bg-slate-950/40 border-slate-800/80 opacity-70'
              }`}
            >
              {/* Stage Number & Icon */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 animate-pulse'
                        : isDone
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300">0{stage.id}</span>
                </div>

                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isActive ? (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-600">IDLE</span>
                )}
              </div>

              <h5 className="font-bold text-sm text-white mb-0.5">{stage.name}</h5>
              <p className="text-[11px] text-cyan-400 font-mono mb-2">{stage.model}</p>
              
              <div className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                {stage.details}
              </div>

              {/* Status Pill */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-500">STATE:</span>
                <span
                  className={
                    isActive
                      ? 'text-cyan-300 font-semibold'
                      : isDone
                      ? 'text-emerald-400 font-semibold'
                      : 'text-slate-500'
                  }
                >
                  {isDone ? 'COMPLETE' : isActive ? 'PROCESSING' : 'PENDING'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Pipeline Execution Feed & Data Inspect */}
      <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800/70">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono text-slate-300 font-semibold uppercase">
              Live Inter-Model Data Stream & Verification
            </span>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex items-center gap-2">
            <button
              id="run-dubbing-pipeline-btn"
              onClick={handleRunPipeline}
              disabled={isRunning}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isRunning
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/20'
              }`}
            >
              {isRunning ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                  Orchestrating 4 Models...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Execute Full Pipeline
                </>
              )}
            </button>

            <button
              id="reset-dubbing-pipeline-btn"
              onClick={handleReset}
              disabled={isRunning}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition-colors"
              title="Reset Simulator"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Stage Outputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* Source Audio Input & Transcription */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
              <span>INPUT SPEECH STREAM (English)</span>
              <span className="text-cyan-400 text-[10px]">WAV • 16,000 Hz</span>
            </div>
            <p className="text-slate-200 font-sans text-xs bg-slate-950 p-2.5 rounded border border-slate-800/80 mb-2 leading-relaxed">
              "{selectedLang.sampleInput}"
            </p>
            {/* Audio Waveform Simulator */}
            <div className="flex items-end gap-1 h-8 px-2 py-1 bg-slate-950 rounded border border-slate-800/60 overflow-hidden">
              {waveformBars.map((height, idx) => (
                <div
                  key={idx}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isRunning
                      ? 'bg-cyan-400'
                      : completedStages.length > 0
                      ? 'bg-emerald-400'
                      : 'bg-slate-700'
                  }`}
                  style={{ height: `${isRunning ? height : Math.max(15, height * 0.4)}%` }}
                />
              ))}
            </div>
          </div>

          {/* Translated Regional Output & Synced Video Output */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
              <span>SYNTHESIZED {selectedLang.name.toUpperCase()} OUTPUT</span>
              <span className="text-indigo-400 text-[10px]">
                {completedStages.includes(4) ? 'LIP-SYNCED MP4' : 'PIPELINE TARGET'}
              </span>
            </div>
            <p className="text-cyan-200 font-sans text-xs bg-slate-950 p-2.5 rounded border border-cyan-900/40 mb-2 leading-relaxed">
              "{selectedLang.translated}"
            </p>
            
            {/* Technical I/O Contract Details */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 bg-slate-950 p-2 rounded border border-slate-800/60">
              <span>Target Duration: <strong className="text-white">{selectedLang.speechDuration}</strong></span>
              <span className="text-slate-600">•</span>
              <span>Lip Sync Drift: <strong className="text-emerald-400">&lt; 14ms</strong></span>
              <span className="text-slate-600">•</span>
              <span>Validation: <strong className="text-cyan-400">Strict Schema</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
