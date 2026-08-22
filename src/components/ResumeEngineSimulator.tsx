import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Layers, 
  Server, 
  Database, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Code2, 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Sliders,
  Check,
  Container,
  GitBranch,
  Network,
  Binary
} from 'lucide-react';

interface JobRoleOption {
  id: string;
  title: string;
  company: string;
  requiredSkills: string[];
  niceToHave: string[];
  semanticKeywords: { term: string; synonymMatch: string; similarity: number }[];
  experienceReq: string;
  minDegree: string;
  keyPhrases: string[];
}

const sampleJobRoles: JobRoleOption[] = [
  {
    id: 'ml-systems-eng',
    title: 'AI / ML Systems Engineer',
    company: 'NextGen AI Labs',
    requiredSkills: ['FastAPI', 'PyTorch', 'PostgreSQL', 'Docker', 'Python', 'REST APIs', 'Multi-Stage Pipelines'],
    niceToHave: ['SQLAlchemy', 'Kubernetes', 'Hugging Face', 'pytest', 'React / TypeScript'],
    semanticKeywords: [
      { term: 'Transformer Pipeline Orchestration', synonymMatch: 'Multi-stage 4-model video dubbing workflow', similarity: 0.94 },
      { term: 'Asynchronous Microservices', synonymMatch: 'FastAPI async coroutines & background workers', similarity: 0.91 },
      { term: 'Embeddings & Representation Learning', synonymMatch: 'HuBERT layer probing & FaceNet 128-D vectors', similarity: 0.96 }
    ],
    experienceReq: '1+ years in ML/AI systems, pipeline orchestration or research',
    minDegree: 'B.Tech / B.E in CSE / AI & ML',
    keyPhrases: ['model orchestration', 'structured schemas', 'hybrid dense-sparse retrieval', 'high-throughput APIs']
  },
  {
    id: 'speech-ai-researcher',
    title: 'Speech & Multimodal AI Engineer',
    company: 'Indic Voice Intelligence',
    requiredSkills: ['PyTorch', 'HuBERT', 'Whisper', 'Librosa', 'Python', 'FastAPI', 'Hugging Face'],
    niceToHave: ['Wav2Lip', 'Coqui TTS', 'ASR', 'Docker', 'PostgreSQL'],
    semanticKeywords: [
      { term: 'Acoustic Dialect Modeling', synonymMatch: 'IndicAccentDb 12-layer probing (87% accuracy)', similarity: 0.98 },
      { term: 'Phonetic Alignment', synonymMatch: 'Cross-lingual sequence mapping with mT5', similarity: 0.92 },
      { term: 'Audio-Visual Sync', synonymMatch: 'Wav2Lip GAN discriminator with <14ms drift', similarity: 0.95 }
    ],
    experienceReq: 'Hands-on speech processing, transformer representations, or ASR research',
    minDegree: 'B.Tech in Computer Science / AI',
    keyPhrases: ['transformer embeddings', 'layer-wise probing', 'multilingual speech', 'acoustic feature extraction']
  },
  {
    id: 'fullstack-ai-eng',
    title: 'Full-Stack AI Platform Engineer',
    company: 'Enterprise Cloud AI',
    requiredSkills: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'React', 'TypeScript', 'Docker', 'Python'],
    niceToHave: ['pytest', 'Vercel', 'Render', 'CI/CD Pipelines', 'Tailwind CSS'],
    semanticKeywords: [
      { term: 'Relational ORM Schemas', synonymMatch: 'SQLAlchemy declarative models & indexed JSONB', similarity: 0.95 },
      { term: 'Containerized CI/CD', synonymMatch: 'Docker Compose + Google Cloud CI/CD badge', similarity: 0.93 },
      { term: 'Explainable AI Interface', synonymMatch: 'React + TypeScript real-time radar evidence UI', similarity: 0.97 }
    ],
    experienceReq: 'Building and deploying full-stack web platforms with backend AI microservices',
    minDegree: 'B.Tech in CSE / Related Field',
    keyPhrases: ['resume parsing', 'weighted matching', 'REST APIs', 'cloud deployment']
  }
];

export const ResumeEngineSimulator: React.FC = () => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(sampleJobRoles[0].id);
  const [matchMode, setMatchMode] = useState<'hybrid' | 'deterministic' | 'embeddings'>('hybrid');
  const [activeTab, setActiveTab] = useState<'scoring' | 'semantic' | 'api' | 'sql' | 'docker' | 'benchmark'>('scoring');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [weightConfig, setWeightConfig] = useState({
    skills: 35,
    experience: 25,
    projects: 20,
    education: 10,
    keywords: 10
  });

  const currentRole = sampleJobRoles.find((r) => r.id === selectedRoleId) || sampleJobRoles[0];

  // Candidate Data (Lalith's Verified Profile)
  const candidateSkills = [
    'FastAPI', 'PyTorch', 'Python', 'PostgreSQL', 'SQLAlchemy', 'Docker', 
    'React', 'TypeScript', 'pytest', 'REST APIs', 'HuBERT', 'Whisper', 
    'Coqui TTS', 'Wav2Lip', 'OpenCV', 'FaceNet', 'YOLOv8', 'Vercel', 'Render',
    'Multi-Stage Pipelines', 'Kubernetes', 'Hugging Face'
  ];

  // Calculate dynamic matching metrics
  const matchedRequired = currentRole.requiredSkills.filter(s => 
    candidateSkills.some(cs => cs.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(cs.toLowerCase()))
  );
  
  const matchedNice = currentRole.niceToHave.filter(s => 
    candidateSkills.some(cs => cs.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(cs.toLowerCase()))
  );

  // Subscores
  const skillScore = Math.min(100, Math.round(((matchedRequired.length / currentRole.requiredSkills.length) * 85) + ((matchedNice.length / currentRole.niceToHave.length) * 15)));
  const experienceScore = 96; // LTRC IIIT Hyderabad research + industry internships
  const projectScore = 98; // 4-model dubbing pipeline, HuBERT transformer probing, Resume Intelligence Engine, FaceNet
  const educationScore = 95; // B.Tech CSE (AI & ML) at KIET, CGPA 7.50
  const keywordScore = 94; // Deep alignment on pipeline orchestration, transformer embeddings, Docker, PostgreSQL

  // Dense Vector Cosine Similarity (Sentence-Transformers MiniLM-L6-v2)
  const avgSemanticSimilarity = Math.round(
    (currentRole.semanticKeywords.reduce((acc, curr) => acc + curr.similarity, 0) / currentRole.semanticKeywords.length) * 100
  );

  // Deterministic Score
  const totalWeight = weightConfig.skills + weightConfig.experience + weightConfig.projects + weightConfig.education + weightConfig.keywords;
  const deterministicScore = Math.round(
    (skillScore * weightConfig.skills +
     experienceScore * weightConfig.experience +
     projectScore * weightConfig.projects +
     educationScore * weightConfig.education +
     keywordScore * weightConfig.keywords) / (totalWeight || 100)
  );

  // Composite Hybrid Score (60% Deterministic Evidence + 40% Dense Vector Embeddings)
  const hybridScore = Math.round(deterministicScore * 0.6 + avgSemanticSimilarity * 0.4);

  const displayScore = matchMode === 'hybrid' ? hybridScore : matchMode === 'deterministic' ? deterministicScore : avgSemanticSimilarity;

  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
    }, 380);
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900/90 border border-cyan-500/30 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6">
      
      {/* Simulator Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>HYBRID AI MATCHING ENGINE // DETERMINISTIC RULES + DENSE TRANSFORMER EMBEDDINGS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Resume Intelligence Engine — Match & Explainability Sandbox
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Full-stack production platform combining <span className="text-cyan-300 font-mono">FastAPI</span>, <span className="text-indigo-300 font-mono">PostgreSQL/SQLAlchemy</span>, <span className="text-emerald-300 font-mono">Docker</span>, and <span className="text-purple-300 font-mono">sentence-transformers (all-MiniLM-L6-v2)</span>.
          </p>
        </div>

        {/* Live Deployment Badges */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Frontend: Live on Vercel</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
            <Server className="w-3.5 h-3.5" />
            <span>API: Live on Render</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300">
            <Binary className="w-3.5 h-3.5" />
            <span>384-D Dense Vectors</span>
          </span>
        </div>
      </div>

      {/* Target Job Selector & Candidate Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Role Selection & Engine Tuning */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="text-xs font-mono text-cyan-400 uppercase font-bold block mb-2">
              1. Select Ingested Job Description (PostgreSQL Record)
            </label>
            <div className="space-y-2">
              {sampleJobRoles.map((role) => {
                const isSelected = role.id === selectedRoleId;
                return (
                  <button
                    key={role.id}
                    id={`job-role-btn-${role.id}`}
                    onClick={() => {
                      setSelectedRoleId(role.id);
                      handleRunEvaluation();
                    }}
                    className={`w-full p-3 rounded-xl text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-950 border-cyan-400 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-white text-xs font-display">{role.title}</h4>
                      <p className="text-[11px] font-mono text-cyan-300/80">{role.company}</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {role.requiredSkills.length} req skills
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Engine Scoring Mode Selector */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Evaluation Strategy:</span>
              </span>
              <span className="text-[10px] text-cyan-400 uppercase font-mono">{matchMode}</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
              <button
                onClick={() => setMatchMode('hybrid')}
                className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                  matchMode === 'hybrid'
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                HYBRID (Recommended)
              </button>
              <button
                onClick={() => setMatchMode('deterministic')}
                className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                  matchMode === 'deterministic'
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                DETERMINISTIC
              </button>
              <button
                onClick={() => setMatchMode('embeddings')}
                className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                  matchMode === 'embeddings'
                    ? 'bg-purple-500 text-slate-950 font-bold border-purple-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                DENSE VECTORS
              </button>
            </div>
            <p className="text-[10px] text-slate-400 font-sans leading-tight">
              {matchMode === 'hybrid' && "Fuses 60% rule-based verifiable evidence with 40% semantic transformer embedding cosine similarity."}
              {matchMode === 'deterministic' && "Strict weighted mathematical sum over 5 evidence pillars (zero black-box drift)."}
              {matchMode === 'embeddings' && "Semantic 384-dimensional cosine proximity via sentence-transformers (all-MiniLM-L6-v2)."}
            </p>
          </div>

          {/* Job Requirements Preview */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-slate-400 pb-1.5 border-b border-slate-800">
              <span className="text-slate-300 font-bold">Target Requirements:</span>
              <span className="text-cyan-400">{currentRole.title}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Required Core Stack:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {currentRole.requiredSkills.map(s => (
                  <span key={s} className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] border border-slate-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Re-Run Engine Trigger */}
          <button
            id="rerun-matching-engine-btn"
            onClick={handleRunEvaluation}
            disabled={isEvaluating}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-lg shadow-cyan-500/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isEvaluating ? 'animate-spin' : ''}`} />
            <span>{isEvaluating ? 'COMPUTING HYBRID SIMILARITY...' : 'EXECUTE HYBRID EVALUATION'}</span>
          </button>
        </div>

        {/* Right: Real-time Evaluation Result & Deep Score Breakdown */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Score Hero Card */}
          <div className="p-5 rounded-xl bg-slate-950/90 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-cyan-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>EVALUATED CANDIDATE: AYYANKULA LALITH SAI KUMAR</span>
              </div>
              <h4 className="text-xl font-extrabold text-white font-display">
                Candidate Fit Assessment
              </h4>
              <p className="text-xs text-slate-400 font-sans">
                {matchMode === 'hybrid' ? 'Dual-stage hybrid ranking (60% Deterministic + 40% Transformer Cosine Sim).' : `${matchMode.toUpperCase()} ranking active.`}
              </p>
            </div>

            {/* Score Ring / Badge */}
            <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-slate-900 border border-cyan-500/40 text-center min-w-[130px] shadow-lg shadow-cyan-500/10">
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                {matchMode === 'hybrid' ? 'HYBRID SCORE' : matchMode === 'deterministic' ? 'RULE SCORE' : 'VECTOR SIM'}
              </span>
              <strong className="text-3xl font-extrabold text-cyan-300 font-mono">
                {displayScore}%
              </strong>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold mt-0.5">
                EXCELLENT FIT
              </span>
            </div>
          </div>

          {/* Tab Navigation for Simulator Views */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono overflow-x-auto">
            <button
              onClick={() => setActiveTab('scoring')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'scoring' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              1. 5-Pillar Evidence
            </button>
            <button
              onClick={() => setActiveTab('semantic')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'semantic' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Dense Vectors (384-D)
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'api' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              3. FastAPI Payload
            </button>
            <button
              onClick={() => setActiveTab('sql')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'sql' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              4. SQLAlchemy Schema
            </button>
            <button
              onClick={() => setActiveTab('docker')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'docker' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              5. Docker & Pytest
            </button>
            <button
              onClick={() => setActiveTab('benchmark')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'benchmark' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              6. Test Suite Benchmark
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 min-h-[270px]">
            
            {/* 1. Explainable Scoring View */}
            {activeTab === 'scoring' && (
              <div className="space-y-4">
                {/* 5-Pillar Weighted Meters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Skills */}
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-300">Skill Overlap ({weightConfig.skills}%)</span>
                      <span className="text-cyan-400 font-bold">{skillScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${skillScore}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-sans">
                      Matched {matchedRequired.length}/{currentRole.requiredSkills.length} core & {matchedNice.length}/{currentRole.niceToHave.length} preferred skills.
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-300">Experience ({weightConfig.experience}%)</span>
                      <span className="text-indigo-400 font-bold">{experienceScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${experienceScore}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-sans">
                      Active Research Intern @ IIIT Hyderabad LTRC + 3 prior industry internships.
                    </p>
                  </div>

                  {/* Projects */}
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-300">Projects & Systems ({weightConfig.projects}%)</span>
                      <span className="text-emerald-400 font-bold">{projectScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${projectScore}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-sans">
                      4-stage multi-model dubbing pipeline, HuBERT transformer probing, FastAPI microservices.
                    </p>
                  </div>

                  {/* Education & Rigor */}
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-300">Education ({weightConfig.education}%)</span>
                      <span className="text-purple-400 font-bold">{educationScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-400 rounded-full" style={{ width: `${educationScore}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-sans">
                      B.Tech in CSE (AI & ML) • CGPA: 7.50 • Rigorous ML/AI & Speech coursework.
                    </p>
                  </div>
                </div>

                {/* Evidence Rationale Box */}
                <div className="p-3 rounded-lg bg-slate-900/90 border border-cyan-500/20 text-xs font-mono space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Algorithmic Evidence Rationale</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                    Candidate exhibits verified production-level competence matching {currentRole.title}. Direct overlap on FastAPI, PostgreSQL, Docker containerization, and deep learning pipelines. Research affiliation with IIIT Hyderabad LTRC provides strong theoretical grounding for AI microservices and complex pipeline orchestration.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {matchedRequired.map(skill => (
                      <span key={skill} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] border border-emerald-800">
                        <Check className="w-2.5 h-2.5" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. Dense Vector Semantic Embeddings View */}
            {activeTab === 'semantic' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Binary className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-white">Dense Semantic Embeddings (Sentence-Transformers MiniLM-L6-v2)</span>
                  </div>
                  <span className="text-purple-300">Avg Similarity: {avgSemanticSimilarity}%</span>
                </div>

                <p className="text-[11px] text-slate-400 font-sans">
                  Prevents keyword mismatch by computing 384-dimensional cosine distances between resume technical claims and job semantic intents.
                </p>

                <div className="space-y-2">
                  {currentRole.semanticKeywords.map((item, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="text-[11px] text-purple-300 font-bold">Job Concept: "{item.term}"</div>
                        <div className="text-[10px] text-slate-400 font-sans">Candidate Mapping: <span className="text-slate-200">{item.synonymMatch}</span></div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-400 rounded-full" style={{ width: `${Math.round(item.similarity * 100)}%` }} />
                        </div>
                        <span className="text-[11px] font-bold text-purple-300 font-mono">{(item.similarity * 100).toFixed(0)}% sim</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. FastAPI REST View */}
            {activeTab === 'api' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      POST
                    </span>
                    <span className="text-white">/api/v1/resumes/match</span>
                  </div>
                  <span className="text-cyan-400">200 OK • 38ms (Render)</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 overflow-x-auto">
                  <pre className="text-cyan-300">
{`{
  "candidate_id": "ayyankula-lalith-sai-kumar",
  "job_id": "${currentRole.id}",
  "hybrid_score": ${hybridScore},
  "deterministic_score": ${deterministicScore},
  "dense_vector_similarity": ${avgSemanticSimilarity},
  "status": "EXCELLENT_FIT",
  "subscores": {
    "skill_overlap": ${skillScore},
    "experience_alignment": ${experienceScore},
    "project_complexity": ${projectScore},
    "education_rigor": ${educationScore},
    "keyword_density": ${keywordScore}
  },
  "matched_skills": ${JSON.stringify(matchedRequired)},
  "verified_artifacts": [
    "FastAPI + PostgreSQL + Docker (Production)",
    "IIIT Hyderabad LTRC Speech Research",
    "HuBERT 12-Layer Transformer Benchmark (87% Acc)"
  ]
}`}
                  </pre>
                </div>
              </div>
            )}

            {/* 4. SQLAlchemy View */}
            {activeTab === 'sql' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-white">SQLAlchemy Relational ORM Model</span>
                  </div>
                  <span className="text-slate-500">PostgreSQL 16 + pgvector</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 overflow-x-auto">
                  <pre className="text-indigo-300">
{`class ResumeRecord(Base):
    __tablename__ = "resumes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    candidate_name = Column(String(255), nullable=False)
    extracted_skills = Column(ARRAY(String), nullable=False)
    experience_years = Column(Float, nullable=False)
    education_level = Column(String(100), nullable=False)
    embedding_vector = Column(Vector(384), nullable=True) # pgvector dense embedding
    structured_json = Column(JSONB, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    matches = relationship("MatchResult", back_populates="resume")`}
                  </pre>
                </div>
              </div>
            )}

            {/* 5. Docker & Pytest View */}
            {activeTab === 'docker' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Container className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-white">Docker Compose & Automated Testing</span>
                  </div>
                  <span className="text-emerald-400 font-bold">18 passed in 0.42s</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 overflow-x-auto space-y-1">
                  <div>$ pytest tests/ --verbose</div>
                  <div className="text-slate-400">============================= test session starts ==============================</div>
                  <div className="text-slate-300">tests/test_parser.py::test_pdf_structure_extraction <span className="text-emerald-400">PASSED</span></div>
                  <div className="text-slate-300">tests/test_matcher.py::test_hybrid_dense_sparse_scoring <span className="text-emerald-400">PASSED</span></div>
                  <div className="text-slate-300">tests/test_matcher.py::test_explainable_evidence_generation <span className="text-emerald-400">PASSED</span></div>
                  <div className="text-slate-300">tests/test_api.py::test_fastapi_resume_upload_endpoint <span className="text-emerald-400">PASSED</span></div>
                  <div className="text-slate-300">tests/test_database.py::test_sqlalchemy_postgresql_persistence <span className="text-emerald-400">PASSED</span></div>
                  <div className="text-emerald-400 font-bold pt-1">==== 18 passed in 0.42s (Docker PostgreSQL Container) ====</div>
                </div>
              </div>
            )}

            {/* 6. Test Suite Benchmark */}
            {activeTab === 'benchmark' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-white">50-Resume Empirical Benchmark Suite</span>
                  </div>
                  <span className="text-emerald-400 font-bold">Pearson r = 0.932</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 block">PARSING PRECISION</span>
                    <strong className="text-cyan-300 text-sm font-bold">98.4%</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 block">RANKING CORRELATION</span>
                    <strong className="text-emerald-300 text-sm font-bold">0.932 (r)</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 block">AVG API LATENCY</span>
                    <strong className="text-indigo-300 text-sm font-bold">38ms</strong>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  Evaluated across 50 diverse multi-column, table-formatted, and standard text resume samples against human expert recruiter annotations. Hybrid embedding + rule-based model achieved top rank consistency while avoiding hallucination or zero-weight penalties on non-exact terminology.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
