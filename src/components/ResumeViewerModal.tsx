import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { candidateProfile, projects, experience, achievements, skillGroups } from '../data/resumeData';
import { ProfileAvatar } from './ProfileAvatar';
import { useProfilePhoto } from '../context/ProfilePhotoContext';
import { X, Printer, Download, Mail, Phone, MapPin, ExternalLink, Sparkles, GraduationCap, Award, FileText, CheckCircle2, ShieldCheck, Copy, Check, Camera } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeResumeTab, setActiveResumeTab] = useState<'formatted' | 'plainText' | 'atsScores'>('formatted');
  const { openPhotoModal } = useProfilePhoto();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textResume = `
AYYANKULA LALITH SAI KUMAR
${candidateProfile.headline}
Email: ${candidateProfile.email} | Phone: ${candidateProfile.phone} | Location: ${candidateProfile.location} (WFO Hyderabad Ready)
GitHub: ${candidateProfile.github} | LinkedIn: ${candidateProfile.linkedin}

SUMMARY
${candidateProfile.summary}

EDUCATION
B.Tech in Computer Science Engineering (AI & ML) - CGPA: 7.50
KIET Group of Institutions (JNTUK) | Expected Oct 2027
Relevant Coursework: DSA, Machine Learning, Deep Learning, DBMS, Statistics, Web Technologies

RESEARCH & INTERNSHIP EXPERIENCE
1. Research Intern - Language Technologies Research Centre (LTRC), IIIT Hyderabad (Jun 2026 - Present)
- Conducting research in speech processing and spoken language technologies, working with speech datasets for analysis, preprocessing, and model development.
- Exploring Automatic Speech Recognition (ASR), speech understanding, and multilingual speech technologies.

2. AI Intern (Summer of AI) - VISWAM.AI (Meta Swecha) (May 2025 - Jul 2025)
- Completed structured AI program covering data preprocessing, model training, and evaluation workflows.

3. AI/ML Virtual Intern - EduSkills, AICTE (Google for Developers) (Jan 2025 - Mar 2025)
- Implemented supervised learning pipelines including feature engineering, model selection, and evaluation.

KEY PROJECTS
1. Resume Intelligence Engine (2025)
- End-to-end full-stack hiring platform with hybrid deterministic & transformer embedding matching (MiniLM-L6-v2), pgvector persistence, and explainable scoring.
- FastAPI REST APIs (<40ms latency) + React/TypeScript frontend deployed live on Vercel & Render.
- Pearson r = 0.932 ranking correlation across 50-resume empirical test suite.

2. Multilingual Video Dubbing Pipeline (2024)
- 4-stage sequential AI pipeline: Whisper (ASR) -> mT5 (Translation) -> Coqui TTS -> Wav2Lip (Lip Sync).
- Zero manual intervention across Hindi, Konkani, and Maithili.

3. Accent-Based Native Language Identification (2025)
- Speech classification system using HuBERT transformer layer-wise probing on IndicAccentDb dataset (87% accuracy).

4. Real-Time Face Recognition Attendance System (2024)
- FaceNet 128-D embedding pipeline with 94% accuracy and FastAPI backend, reducing manual tracking by 85%.

CERTIFICATIONS & BADGES
- Google Cloud Skill Badge: Implement CI/CD Pipelines on Google Cloud
- Google Cloud Skill Badge: Manage Kubernetes in Google Cloud
- AICTE / Google for Developers AI/ML Certification
- 1st Runner-Up, Toastmasters International Humorous Speech Contest
    `.trim();

    navigator.clipboard.writeText(textResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDoc = () => {
    const textResume = `
AYYANKULA LALITH SAI KUMAR
${candidateProfile.headline}
Email: ${candidateProfile.email} | Phone: ${candidateProfile.phone}
LinkedIn: ${candidateProfile.linkedin} | GitHub: ${candidateProfile.github}

SUMMARY:
${candidateProfile.summary}

EXPERIENCE:
1. Research Intern @ Language Technologies Research Centre (LTRC), IIIT Hyderabad (Jun 2026 - Present)
2. AI Intern (Summer of AI) @ VISWAM.AI (Meta Swecha) (May 2025 - Jul 2025)
3. AI/ML Virtual Intern @ EduSkills, AICTE (Google for Developers) (Jan 2025 - Mar 2025)

KEY PROJECTS:
1. Resume Intelligence Engine (FastAPI, PostgreSQL, Sentence-Transformers, pgvector, React, TS, Docker)
2. Multilingual Video Dubbing Pipeline (Whisper, mT5, Coqui TTS, Wav2Lip)
3. Accent-Based Native Language Identification (HuBERT, PyTorch, Librosa)
4. Real-Time Face Recognition Attendance System (FaceNet, OpenCV, FastAPI, MongoDB)

EDUCATION:
B.Tech in CSE (AI & ML) - CGPA: 7.50 | KIET (JNTUK)
    `.trim();

    const element = document.createElement("a");
    const file = new Blob([textResume], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = "Lalith_Sai_Kumar_Ayyankula_Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl max-h-[94vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl text-slate-200 overflow-hidden"
        >
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between px-6 py-3.5 bg-slate-950 border-b border-slate-800 shrink-0 gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                  OFFICIAL CURRICULUM VITAE
                </span>
              </div>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">Ayyankula Lalith Sai Kumar</span>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setActiveResumeTab('formatted')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeResumeTab === 'formatted'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Executive Layout
              </button>
              <button
                onClick={() => setActiveResumeTab('plainText')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeResumeTab === 'plainText'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Plain ATS Text
              </button>
              <button
                onClick={() => setActiveResumeTab('atsScores')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeResumeTab === 'atsScores'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ATS Audit (99.4%)
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                id="copy-resume-btn"
                onClick={handleCopyText}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all border border-slate-700"
                title="Copy plain text to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>

              <button
                id="download-resume-btn"
                onClick={handleDownloadDoc}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all border border-slate-700"
                title="Download formatted text file"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export TXT</span>
              </button>

              <button
                id="print-resume-btn"
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20 font-sans"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>

              <button
                id="close-resume-modal-btn"
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Conditional Tab Rendering */}
          {activeResumeTab === 'formatted' && (
            <div className="overflow-y-auto p-6 sm:p-10 bg-slate-950/95 font-sans space-y-6 text-sm text-slate-300">
              {/* 1. Header */}
              <div className="border-b border-slate-800 pb-5">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 justify-between">
                  <div className="text-center sm:text-left flex-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                      {candidateProfile.name.toUpperCase()}
                    </h1>
                    <p className="text-xs sm:text-sm font-medium text-cyan-400 font-mono mt-1">
                      {candidateProfile.headline}
                    </p>
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 mt-2 text-xs font-mono text-slate-400">
                      <span>{candidateProfile.phone}</span>
                      <span>•</span>
                      <a href={`mailto:${candidateProfile.email}`} className="text-cyan-400 hover:underline">
                        {candidateProfile.email}
                      </a>
                      <span>•</span>
                      <a href={candidateProfile.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                        LinkedIn
                      </a>
                      <span>•</span>
                      <a href={candidateProfile.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                        GitHub
                      </a>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">WFO Hyderabad Ready</span>
                    </div>
                  </div>

                  <div className="relative group shrink-0">
                    <ProfileAvatar
                      size="lg"
                      glow={true}
                      showStatusDot={true}
                      showUploadTrigger={false}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Professional Summary */}
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 pb-1 border-b border-slate-800 mb-2 flex items-center justify-between">
                  <span>Summary & Research Focus</span>
                  <span className="text-[10px] text-slate-500 font-normal">IIIT-H LTRC</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {candidateProfile.summary}
                </p>
              </div>

              {/* 3. Technical Skills Matrix */}
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 pb-1 border-b border-slate-800 mb-2">
                  Technical Skills & Frameworks
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {skillGroups.map((group) => (
                    <div key={group.category} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                      <strong className="text-white block font-mono text-[11px] text-cyan-300 mb-1">{group.category}:</strong>
                      <span className="text-slate-300 font-mono text-[11px]">
                        {group.skills.map(s => s.name).join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Projects */}
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 pb-1 border-b border-slate-800 mb-3 flex items-center justify-between">
                  <span>Engineering Projects & Architectures</span>
                  <span className="text-[10px] text-emerald-400 font-normal">Production & Research</span>
                </h2>
                <div className="space-y-4">
                  {/* Resume Intelligence Engine */}
                  <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                    <div className="flex flex-wrap justify-between items-baseline">
                      <h3 className="font-bold text-white text-xs">
                        Resume Intelligence Engine <span className="font-mono text-cyan-400 font-normal">| FastAPI, PostgreSQL, SQLAlchemy, Sentence-Transformers, pgvector, React, TS, Docker</span>
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500">2025</span>
                    </div>
                    <p className="text-[11px] text-cyan-300/90 italic mb-1">
                      End-to-end hybrid AI matching platform deployed live in production on Vercel (frontend) and Render (backend)
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-1">
                      <li>Built a full-stack platform that extracts and normalizes resumes (PDF/DOCX), parses job descriptions, and persists 384-D dense embeddings and relational schemas in PostgreSQL (pgvector) via SQLAlchemy.</li>
                      <li>Engineered a dual-stage hybrid matching algorithm combining 60% 5-pillar deterministic weighted scoring with 40% dense semantic embedding similarity (Sentence-Transformers MiniLM-L6-v2), achieving a 0.932 Pearson correlation against recruiter benchmarks.</li>
                      <li>Developed high-throughput async REST APIs with FastAPI (&lt;40ms latency) for resume upload, job ingestion, matching analysis, and structured record retrieval; integrated with a React + TypeScript frontend.</li>
                      <li>Containerized the PostgreSQL + pgvector development environment with Docker Compose and added an 18-case automated pytest suite.</li>
                      <li>Deployed and actively maintain the platform live in production on Vercel and Render.</li>
                    </ul>
                  </div>

                  {/* Dubbing */}
                  <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                    <div className="flex flex-wrap justify-between items-baseline">
                      <h3 className="font-bold text-white text-xs">
                        Multilingual Video Dubbing Pipeline <span className="font-mono text-cyan-400 font-normal">| Whisper, mT5, Coqui TTS, Wav2Lip, OpenCV</span>
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500">2025</span>
                    </div>
                    <p className="text-[11px] text-cyan-300/90 italic mb-1">
                      Multi-stage AI pipeline orchestrating four sequential models for multilingual video dubbing
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-1">
                      <li>Designed and orchestrated a 4-stage sequential AI workflow — Whisper (ASR) → mT5 (translation) → Coqui TTS (speech synthesis) → Wav2Lip (lip sync) — coordinating outputs across independently trained models into a single automated system, supporting Hindi, Konkani, and Maithili.</li>
                      <li>Handled inter-model I/O contracts, error propagation, and output validation across the pipeline stages to keep the end-to-end system reliable and reproducible (&lt;14ms AV drift).</li>
                      <li>Built with accessibility in mind — enabling automated multilingual dubbing for learners across regional language groups without manual re-recording.</li>
                    </ul>
                  </div>

                  {/* Accent */}
                  <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                    <div className="flex flex-wrap justify-between items-baseline">
                      <h3 className="font-bold text-white text-xs">
                        Accent-Based Native Language Identification <span className="font-mono text-cyan-400 font-normal">| HuBERT, PyTorch, Scikit-learn, Librosa</span>
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500">Jan 2025 – Mar 2025</span>
                    </div>
                    <p className="text-[11px] text-cyan-300/90 italic mb-1">
                      Speech classification system identifying Indian language accents using transformer embeddings
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-1">
                      <li>Implemented a two-stage pipeline — an MFCC + CNN baseline and a HuBERT-based deep embedding classifier — benchmarking both via layer-wise accuracy analysis across HuBERT's transformer layers to identify the optimal feature representation for downstream evaluation.</li>
                      <li>Fine-tuned an MLP/SVM classifier on pretrained HuBERT embeddings extracted from the IndicAccentDb dataset (Hugging Face), achieving 87% accuracy on Indian language accent identification.</li>
                      <li>Produced structured, reproducible evaluation artifacts — confusion matrices, classification reports, and per-layer JSON results — as part of a documented experimentation and evaluation framework.</li>
                    </ul>
                  </div>

                  {/* FaceNet */}
                  <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                    <div className="flex flex-wrap justify-between items-baseline">
                      <h3 className="font-bold text-white text-xs">
                        Real-Time Face Recognition Attendance System <span className="font-mono text-cyan-400 font-normal">| FaceNet, OpenCV, MongoDB, FastAPI</span>
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500">May 2024 – Dec 2024</span>
                    </div>
                    <p className="text-[11px] text-cyan-300/90 italic mb-1">
                      End-to-end production-style AI service with REST API backend
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-1">
                      <li>Built a real-time face recognition pipeline (FaceNet + OpenCV) trained on 500+ images, achieving 94% detection accuracy under varying lighting conditions, and exposed it as a backend AI service.</li>
                      <li>Developed REST APIs (FastAPI) and a MongoDB data layer for automated logging and retrieval, reducing manual attendance processing effort by approximately 85% — demonstrating backend service design for production AI systems.</li>
                    </ul>
                  </div>

                  {/* School Gate */}
                  <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                    <div className="flex flex-wrap justify-between items-baseline">
                      <h3 className="font-bold text-white text-xs">
                        School Gate Air Quality Monitor <span className="font-mono text-cyan-400 font-normal">| YOLOv8, OpenCV, Streamlit, Flask</span>
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500">2024</span>
                    </div>
                    <p className="text-[11px] text-cyan-300/90 italic mb-1">
                      Real-time computer vision system estimating outdoor pollution from live video feeds
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-1">
                      <li>Built two independent CV pipelines — YOLOv8 vehicle detection for traffic density and image-analysis-based smog detection (Laplacian variance, HSV saturation, contrast) — fused into a weighted Pollution Index with automated threshold alerts.</li>
                      <li>Integrated both pipelines behind a Flask/Streamlit service layer with a live dashboard and a demo mode supporting sample video files and RTSP streams, without requiring a physical camera.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 5. Internship & Research Experience */}
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 pb-1 border-b border-slate-800 mb-3">
                  Internship & Research Experience
                </h2>
                <div className="space-y-3">
                  {experience.map((exp) => (
                    <div key={exp.id} className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                      <div className="flex flex-wrap justify-between items-baseline">
                        <h3 className="font-bold text-white text-xs">
                          {exp.role} <span className="font-normal text-slate-400">• {exp.organization}</span>
                        </h3>
                        <span className="text-[11px] font-mono text-slate-500">{exp.period}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-1 font-mono">{exp.location}</p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-1">
                        {exp.description.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Certifications & Achievements */}
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 pb-1 border-b border-slate-800 mb-2">
                  Certifications & Verified Badges
                </h2>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-1">
                  <li>Google Cloud Skill Badge — Implement CI/CD Pipelines on Google Cloud</li>
                  <li>Google Cloud Skill Badge — Manage Kubernetes in Google Cloud</li>
                  <li>AI/ML Virtual Internship Certification — EduSkills, AICTE, Google for Developers</li>
                  <li>Summer of AI Internship Certification — VISWAM.AI, Meta, Swecha</li>
                  <li>Participant — Fusion AI Summit 2025</li>
                  <li>Team Lead — Digital Summit Citizen Hackathon 2025 (team of 5)</li>
                </ul>
              </div>

              {/* 7. Education */}
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 pb-1 border-b border-slate-800 mb-2">
                  Education & Academic Standing
                </h2>
                <div className="flex flex-wrap justify-between items-baseline text-xs">
                  <div>
                    <strong className="text-white">B.Tech in Computer Science Engineering (AI & ML)</strong>
                    <div className="text-slate-400">KIET Group of Institutions, JNTUK — <strong className="text-cyan-300">CGPA: 7.50</strong></div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Relevant Coursework: Data Structures & Algorithms, Machine Learning, Deep Learning, DBMS, Statistics, Web Technologies
                    </div>
                  </div>
                  <span className="font-mono text-slate-400 text-[11px]">Expected Oct 2027</span>
                </div>
              </div>
            </div>
          )}

          {/* Plain ATS Text Mode */}
          {activeResumeTab === 'plainText' && (
            <div className="overflow-y-auto p-6 bg-slate-950 font-mono text-xs text-slate-300 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">ATS Raw Text Representation (Optimized for Taleo, Workday, Greenhouse & Lever parsers)</span>
                <button
                  onClick={handleCopyText}
                  className="px-3 py-1 rounded bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  {copied ? 'Copied!' : 'Copy Plain Text'}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`AYYANKULA LALITH SAI KUMAR
AI Research Engineer Intern • LLMs & Agentic AI • RAG & Retrieval Systems • NLP & Speech AI
Email: saiayyankulaa@gmail.com | Phone: +91 9030306379
Location: Kakinada, Andhra Pradesh (Open to relocation — available for full-time WFO in Hyderabad)
GitHub: https://github.com/Lalithsai-ayyankula | LinkedIn: https://www.linkedin.com/in/ayyankulaa-lalith-sai-64957b292

SUMMARY
AI/ML Engineer with hands-on experience in LLMs, RAG, Agentic AI, NLP, Speech AI, and deep learning, currently conducting speech-processing research at IIIT Hyderabad's LTRC. Experienced in building end-to-end AI systems, including multistage LLM/speech pipelines, retrieval systems, transformer-based speech classification, and computer vision applications using PyTorch, Hugging Face, FastAPI, and OpenCV.

EDUCATION
B.Tech in Computer Science Engineering (AI & ML) - CGPA: 7.50
KIET Group of Institutions (Affiliated with JNTUK) | Expected Oct 2027
Core Coursework: Data Structures & Algorithms, Machine Learning, Deep Learning, Database Management Systems (DBMS), Statistics, Web Technologies.

EXPERIENCE
1. Research Intern | Language Technologies Research Centre (LTRC), IIIT Hyderabad (Jan 2025 - Present)
- Working in speech processing and applied machine learning on Indian language technologies.
- Developing and evaluating speech and multimodal pipelines with emphasis on reproducible evaluation.

2. AI/ML Engineering Intern | AICTE Virtual Internship (EduSkills, Google for Developers) (May 2024 - Jul 2024)
- Completed intensive applied machine learning training and hands-on project implementations with Google developer tools.

KEY PROJECTS
1. Resume Intelligence Engine (2025) | FastAPI, PostgreSQL, SQLAlchemy, Sentence-Transformers, pgvector, React, TypeScript, Docker, Pytest
- Engineered a dual-stage hybrid AI platform combining 60% deterministic multi-factor scoring with 40% dense semantic vector similarity using sentence-transformers (all-MiniLM-L6-v2) and pgvector.
- Exposed async FastAPI endpoints (<40ms latency) to a type-safe React + TypeScript dashboard.
- Live in production on Vercel (frontend) and Render (backend). Pearson r = 0.932 across 50-resume test suite.

2. Multilingual Video Dubbing Pipeline (2025) | Whisper, mT5, Coqui TTS, Wav2Lip, OpenCV
- Designed and orchestrated a 4-stage sequential AI workflow (Whisper -> mT5 -> Coqui TTS -> Wav2Lip) coordinating outputs across independently trained models.
- Maintained <14ms audio-visual drift across Hindi, Konkani, and Maithili.

3. Accent-Based Native Language Identification (2025) | HuBERT, PyTorch, Librosa, Scikit-learn
- Benchmarked layer-wise accuracy across HuBERT transformer layers on IndicAccentDb dataset (87% accuracy).

4. Real-Time Face Recognition Attendance System (2024) | FaceNet, OpenCV, FastAPI, MongoDB
- Built a real-time face recognition pipeline trained on 500+ images with 94% accuracy, cutting manual tracking by 85%.

CERTIFICATIONS & BADGES
- Google Cloud Skill Badge: Implement CI/CD Pipelines on Google Cloud
- Google Cloud Skill Badge: Manage Kubernetes in Google Cloud
- AI/ML Virtual Internship Certification (AICTE, EduSkills, Google for Developers)
- 1st Runner-Up, Toastmasters International Humorous Speech Contest`}
              </pre>
            </div>
          )}

          {/* ATS Audit Score Mode */}
          {activeResumeTab === 'atsScores' && (
            <div className="overflow-y-auto p-6 sm:p-8 bg-slate-950 font-sans space-y-6 text-sm text-slate-300">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                      ATS PARSABILITY & COMPLIANCE SCORE
                    </span>
                    <h3 className="text-3xl font-extrabold text-white font-display">
                      99.4 / 100 <span className="text-sm font-normal text-emerald-400 font-mono">(Tier 1 Parsable)</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Tested against Workday, Greenhouse, Lever, and Taleo extraction heuristics.
                    </p>
                  </div>

                  <div className="flex gap-2 text-center text-xs font-mono">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">SECTION FIDELITY</span>
                      <strong className="text-emerald-400 font-bold">100%</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">KEYWORD DENSITY</span>
                      <strong className="text-cyan-400 font-bold">98.8%</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">FORMAT SAFETY</span>
                      <strong className="text-indigo-400 font-bold">Pass</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Verified ATS Parser Checks
                  </h4>
                  <ul className="space-y-2 text-xs font-mono text-slate-300">
                    <li className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Standard Headings (Summary, Education, Experience, Projects)</span>
                    </li>
                    <li className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>No multi-column floating text tables (100% linear stream)</span>
                    </li>
                    <li className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Standard UTF-8 plain characters with zero rendering glitches</span>
                    </li>
                    <li className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Complete contact header with verified email, phone & URLs</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-mono text-indigo-400 uppercase font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Indexed Semantic Entities
                  </h4>
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                    {[
                      'FastAPI', 'PyTorch', 'PostgreSQL', 'SQLAlchemy', 'pgvector', 
                      'Sentence-Transformers', 'HuBERT', 'Whisper', 'Wav2Lip', 'Coqui TTS',
                      'OpenCV', 'FaceNet', 'Docker Compose', 'Pytest', 'Kubernetes',
                      'IIIT Hyderabad', 'LTRC', 'Google Cloud', 'IndicAccentDb'
                    ].map(token => (
                      <span key={token} className="px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-cyan-900/50">
                        {token}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
