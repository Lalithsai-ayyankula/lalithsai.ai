import { CandidateProfile, Project, Experience, SkillGroup, Achievement } from '../types/portfolio';

export const candidateProfile: CandidateProfile = {
  name: "Ayyankula Lalith Sai Kumar",
  headline: "AI/ML Engineer • LLMs, RAG & Agentic AI • NLP & Speech AI • Deep Learning • IIIT Hyderabad (LTRC)",
  email: "saiayyankulaa@gmail.com",
  phone: "+91 9030306379",
  location: "Kakinada, Andhra Pradesh",
  relocationStatus: "Open to relocation — available for full-time, work-from-office role in Hyderabad",
  github: "https://github.com/Lalithsai-ayyankula",
  linkedin: "https://www.linkedin.com/in/ayyankulaa-lalith-sai-64957b292",
  photoUrl: "https://github.com/Lalithsai-ayyankula.png",
  avatarFallback: "LK",
  education: {
    degree: "B.Tech in Computer Science Engineering (AI & ML)",
    institution: "KIET Group of Institutions",
    affiliate: "JNTUK",
    cgpa: "7.50",
    expectedGraduation: "Expected Oct 2027",
    coursework: [
      "Data Structures & Algorithms",
      "Machine Learning",
      "Deep Learning",
      "Database Management Systems (DBMS)",
      "Statistics",
      "Web Technologies"
    ]
  },
  summary: "AI/ML Engineer with hands-on experience in LLMs, RAG, Agentic AI, NLP, Speech AI, and deep learning, currently conducting speech-processing research at IIIT Hyderabad’s LTRC. Experienced in building end-to-end AI systems, including multistage LLM/speech pipelines, retrieval systems, transformer-based speech classification, and computer vision applications using PyTorch, Hugging Face, FastAPI, and OpenCV. Strong foundation in model evaluation, AI pipeline orchestration, and production-oriented API development, with a focus on building practical AI solutions for real-world problems.",
  coreDifferentiators: [
    {
      title: "LLMs, RAG & Agentic AI Pipelines",
      description: "Hands-on experience architecting retrieval-augmented generation systems with dense vector indexing (pgvector, sentence-transformers), multi-agent workflows, and multistage LLM/speech orchestration pipelines.",
      icon: "Cpu"
    },
    {
      title: "Speech AI & LTRC Research at IIIT-H",
      description: "Conducting speech-processing research at Language Technologies Research Centre (LTRC), IIIT Hyderabad, working on transformer-based speech classification (HuBERT 87% acc on IndicAccentDb), ASR, and speech synthesis.",
      icon: "Sparkles"
    },
    {
      title: "Production AI Systems & REST APIs",
      description: "Engineered production-grade REST API backends with FastAPI, PostgreSQL/MongoDB, and Docker, establishing sub-40ms endpoints and 85% operational efficiency improvements.",
      icon: "Server"
    },
    {
      title: "Computer Vision & Deep Learning",
      description: "Developed deep metric face verification (FaceNet 94% accuracy with OpenCV) and dual-stream atmospheric perception algorithms (YOLOv8 + spatial image filters) built on PyTorch.",
      icon: "Layers"
    }
  ]
};

export const projects: Project[] = [
  {
    id: "resume-intelligence-engine",
    title: "Resume Intelligence Engine",
    subtitle: "End-to-end full-stack hiring platform with hybrid deterministic & transformer embedding matching, pgvector persistence, and explainable scoring",
    year: "2025",
    domain: "Full-Stack AI & Cloud",
    highlightMetric: "Hybrid Dense-Sparse Matching • Pearson r = 0.932 • Live on Vercel & Render",
    technologies: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Sentence-Transformers", "pgvector", "React", "TypeScript", "Docker", "Pytest", "Vercel", "Render"],
    problem: "Candidate screening in hiring workflows often relies on brittle exact-token keyword searches that miss technical synonyms (e.g. 'K8s' vs 'Kubernetes cluster management') or opaque black-box LLM calls that hallucinate and fail to provide auditable evidence.",
    solution: "Engineered a dual-stage hybrid AI platform combining 60% deterministic multi-factor scoring (skills, experience, projects, education) with 40% dense semantic vector similarity using sentence-transformers (all-MiniLM-L6-v2) and pgvector in PostgreSQL, exposed via high-throughput async FastAPI endpoints to a type-safe React + TypeScript dashboard.",
    systemArchitecture: {
      steps: [
        {
          name: "Stage 01: Resume Ingestion & Section Normalization",
          role: "Extracts multi-column PDF/DOCX layouts into typed Pydantic schemas with fallback heuristic cleaners",
          tech: "Python PDF/DOCX Parser + Pydantic v2",
          io: "Input: Multi-format Resume & Job Text → Output: Structured JSON Schemas"
        },
        {
          name: "Stage 02: Hybrid Persistence & Dense Vector Layer",
          role: "Persists candidate profiles, relational schemas, and 384-dimensional dense semantic embeddings in PostgreSQL",
          tech: "PostgreSQL 16 + SQLAlchemy ORM + pgvector",
          io: "Input: Structured Objects → Output: Relational Records + Indexed Vector Embeddings"
        },
        {
          name: "Stage 03: Dual-Stage Hybrid Matching Engine",
          role: "Fuses deterministic weighted rule scoring (60%) with semantic cosine similarity (40%) to eliminate vocabulary mismatch",
          tech: "Sentence-Transformers (MiniLM-L6-v2) + Pytest Suite",
          io: "Input: Candidate Embeddings + Job Specs → Output: Unified Match % + Dense Similarity + Category Subscores"
        },
        {
          name: "Stage 04: Explainable Radar Evidence & Production APIs",
          role: "Exposes async REST endpoints (<40ms latency) to React + TypeScript frontend with auditable evidence logs",
          tech: "FastAPI Async + React/TS (Vercel & Render)",
          io: "Input: REST API /match Request → Output: Score Breakdown & Dense Evidence Mappings"
        }
      ]
    },
    results: [
      "Built an end-to-end full-stack platform deployed and maintained live in production — frontend on Vercel, backend/API on Render with 38ms average response time.",
      "Implemented a dual-stage hybrid matching algorithm fusing 5-pillar deterministic evidence (skills, experience, projects, education, keywords) with dense semantic embeddings (Sentence-Transformers MiniLM-L6-v2).",
      "Achieved a 0.932 Pearson correlation coefficient against expert recruiter evaluation rubrics across a 50-resume empirical benchmark test suite.",
      "Developed robust REST APIs with FastAPI for resume upload, job ingestion, matching analysis, and structured record retrieval; integrated with a React + TypeScript frontend.",
      "Containerized PostgreSQL with Docker Compose and pgvector, reinforced by an 18-test automated pytest suite covering parser edge cases, vector similarity, and API endpoints."
    ],
    keyArtifacts: [
      "FastAPI Production REST APIs with OpenAPI Documentation (Live on Render)",
      "Dual-Stage Hybrid Matching Engine (Deterministic + 384-D Vector Embeddings)",
      "50-Resume Empirical Benchmark Suite with 0.932 Pearson Ranking Correlation",
      "Containerized PostgreSQL (Docker Compose + pgvector) & Automated Pytest Suite",
      "Type-Safe Production Frontend Deployed Live on Vercel"
    ],
    githubUrl: "https://github.com/saiayyankula",
    demoType: "resume_engine"
  },
  {
    id: "automatic-dubbing-pipeline",
    title: "Automatic Multilingual Dubbing System",
    subtitle: "Multi-stage AI pipeline orchestrating four sequential models for regional educational video translation",
    year: "2024",
    domain: "Speech & Multimodal",
    highlightMetric: "4 Sequential Models (ASR → MT → TTS → LipSync)",
    technologies: ["Whisper", "mT5", "Coqui TTS", "Wav2Lip", "PyTorch", "FFmpeg", "Python"],
    problem: "Educational video content is predominantly recorded in single languages, isolating millions of Indian students across diverse linguistic backgrounds from high-quality conceptual lectures. Manual dubbing is prohibitively expensive and time-consuming.",
    solution: "Designed and orchestrated an automated 4-stage sequential AI pipeline that ingests raw lecture audio, transcribes it via Whisper, translates across Indic languages via mT5, synthesizes natural regional voice using Coqui TTS, and synchronizes speaker lip movements via Wav2Lip — supporting Hindi, Konkani, and Maithili without manual re-recording.",
    systemArchitecture: {
      steps: [
        {
          name: "Stage 01: Speech Recognition (ASR)",
          role: "Transcribes source speech stream into timestamped token sequences",
          tech: "OpenAI Whisper",
          io: "Input: Raw Audio WAV (16kHz) → Output: Segmented Timed Text"
        },
        {
          name: "Stage 02: Neural Machine Translation",
          role: "Translates transcription into target regional language with context preservation",
          tech: "Google mT5 Multilingual Transformer",
          io: "Input: Source Text Tokens → Output: Target Indic Text (Hindi/Konkani/Maithili)"
        },
        {
          name: "Stage 03: Neural Speech Synthesis (TTS)",
          role: "Generates natural acoustic speech waveforms in target accent & pitch",
          tech: "Coqui TTS",
          io: "Input: Target Translated Text → Output: Synthesized Audio Waveform"
        },
        {
          name: "Stage 04: Visual Lip Synchronization",
          role: "Morphs speaker mouth region frames to accurately sync with target synthesized audio",
          tech: "Wav2Lip GAN",
          io: "Input: Source Video Frames + Synthesized Audio → Output: Dubbed Synced MP4"
        }
      ]
    },
    results: [
      "Orchestrated 4 distinct neural models into an autonomous pipeline with zero manual intervention between stages.",
      "Engineered inter-model I/O contracts, error propagation boundaries, and output validation safeguards to guarantee pipeline reproducibility.",
      "Enabled accessible multi-dialect education across Hindi, Konkani, and Maithili linguistic cohorts."
    ],
    keyArtifacts: [
      "Pipeline Orchestration Engine with Stage Exception Recovery",
      "Inter-Model Data Schemas & Validation Contracts",
      "Multilingual Audio-Visual Dubbing Benchmark Suite"
    ],
    githubUrl: "https://github.com/saiayyankula",
    demoType: "dubbing_simulator"
  },
  {
    id: "hubert-accent-identification",
    title: "Accent-Based Native Language Identification",
    subtitle: "Speech classification system identifying Indian language accents using transformer embeddings & layer-wise analysis",
    year: "2025",
    domain: "Speech AI & NLP",
    highlightMetric: "87% Accuracy on IndicAccentDb",
    technologies: ["HuBERT", "PyTorch", "Scikit-learn", "Librosa", "Hugging Face", "IndicAccentDb", "NumPy"],
    problem: "Identifying a speaker's regional language influence from their spoken English is critical for adaptive ASR and conversational voice agents, yet subtle acoustic cues make Indian dialectal variations hard to classify with traditional spectral baselines.",
    solution: "Engineered an empirical speech classification framework comparing an MFCC + CNN baseline against deep transformer embeddings extracted from pretrained HuBERT models. Conducted rigorous layer-wise accuracy analysis across all transformer hidden layers to pinpoint the optimal linguistic representation for downstream classification.",
    systemArchitecture: {
      steps: [
        {
          name: "Stage 01: Audio Preprocessing & Feature Extraction",
          role: "Standardizes raw speech signals, computes 40-band MFCCs and extracts HuBERT hidden states",
          tech: "Librosa + Pretrained HuBERT",
          io: "Input: 16kHz Audio Samples → Output: 768-dim Layer Embeddings & MFCC Tensors"
        },
        {
          name: "Stage 02: Layer-Wise Embedding Probing",
          role: "Evaluates representations across all 12 transformer layers to identify semantic vs acoustic encoding depth",
          tech: "PyTorch Feature Probe",
          io: "Input: Layer 1-12 Hidden States → Output: Per-Layer Classification Metrics"
        },
        {
          name: "Stage 03: Downstream Classifier Fine-Tuning",
          role: "Trains optimized MLP / SVM classifiers on top-performing layer embeddings",
          tech: "Scikit-learn + PyTorch MLP",
          io: "Input: Layer 9-11 HuBERT Embeddings → Output: Native Language Accent Prediction"
        }
      ]
    },
    results: [
      "Achieved 87% classification accuracy on the IndicAccentDb benchmark on Hugging Face.",
      "Conducted layer-wise transformer probing demonstrating that intermediate-to-late transformer layers (Layers 9-11) encode optimal phonetic and dialectal variance.",
      "Produced structured, reproducible evaluation artifacts: confusion matrices, per-layer JSON metric reports, and classification evaluations."
    ],
    keyArtifacts: [
      "Layer-wise Transformer Representation Analysis Report",
      "Indic Accent Confusion Matrix & Per-Class F1 Metrics",
      "Reproducible PyTorch Benchmark Pipeline"
    ],
    githubUrl: "https://github.com/saiayyankula",
    demoType: "hubert_layers"
  },
  {
    id: "facenet-attendance-system",
    title: "Production Face Recognition & Attendance Engine",
    subtitle: "High-accuracy facial biometric verification service with production REST API backend & MongoDB layer",
    year: "2024",
    domain: "Computer Vision & Cloud",
    highlightMetric: "94% Detection Accuracy (500+ Dataset) • 85% Manual Effort Reduction",
    technologies: ["FaceNet", "OpenCV", "FastAPI", "MongoDB", "Python", "REST APIs"],
    problem: "Traditional manual institutional attendance processes are vulnerable to proxy logging, slow to tally, and suffer from high human latency in busy entryways under varying ambient lighting conditions.",
    solution: "Engineered an end-to-end production AI microservice utilizing FaceNet 128-dimensional embedding generation and OpenCV facial localization trained on 500+ images. Wrapped inside a resilient FastAPI backend with an asynchronous MongoDB persistence layer for millisecond verification and automated logging.",
    systemArchitecture: {
      steps: [
        {
          name: "Stage 01: Face Detection & Spatial Alignment",
          role: "Detects facial bounding boxes and aligns landmarks across lighting fluctuations",
          tech: "OpenCV Haar/DNN Detector",
          io: "Input: Camera Feed Frame → Output: 160x160 Normalized Face ROI"
        },
        {
          name: "Stage 02: 128-D Deep Feature Embedding",
          role: "Projects facial morphology into compact Euclidean metric space",
          tech: "FaceNet (Inception-ResNet)",
          io: "Input: Normalized Crop → Output: 128-Dimensional Vector L2-Normalized"
        },
        {
          name: "Stage 03: Cosine / Euclidean Distance Matching",
          role: "Calculates metric distance against enrolled database vectors with strict thresholding",
          tech: "NumPy Vectorized Matcher",
          io: "Input: Query Vector + Database Embeddings → Output: Identity Verification (0.6 Margin)"
        },
        {
          name: "Stage 04: Production Service & Persistence",
          role: "Asynchronous API ingestion, duplicate debounce, and automated audit logging",
          tech: "FastAPI + MongoDB",
          io: "Input: Match Event → Output: JSON Response (<120ms Latency) + Mongo Log"
        }
      ]
    },
    results: [
      "94% facial verification accuracy across varying natural and fluorescent lighting conditions.",
      "Reduced manual attendance overhead by ~85% through fully automated recognition and real-time logging.",
      "Production-ready architecture: clean OpenAPI documentation, containerized backend endpoints, and sub-120ms verification latency."
    ],
    keyArtifacts: [
      "FastAPI Production Microservice Endpoints",
      "FaceNet Metric Embedding Distance Comparator",
      "MongoDB Schema with Indexed Identity Collections"
    ],
    githubUrl: "https://github.com/saiayyankula",
    demoType: "facenet_service"
  },
  {
    id: "school-gate-air-quality-monitor",
    title: "Vision-Based Air Quality & Traffic Estimator",
    subtitle: "Dual-stream computer vision system estimating outdoor pollution levels from live video feeds",
    year: "2024",
    domain: "Computer Vision & IoT",
    highlightMetric: "Dual-Pipeline CV Fusion (YOLOv8 + Image Smog Metrics)",
    technologies: ["YOLOv8", "OpenCV", "Streamlit", "Flask", "Python", "RTSP Streaming"],
    problem: "Hardware air quality sensors are expensive to deploy and calibrate across school perimeters, leaving campuses blind to sudden localized pollution spikes caused by idling traffic during morning drop-offs.",
    solution: "Designed a multi-stream computer vision system that fuses YOLOv8 vehicle detection (estimating dynamic traffic density) with spatial image analysis (Laplacian variance for blur/smog, HSV saturation, and local contrast) to calculate a unified real-time Pollution Index with automated alert thresholds.",
    systemArchitecture: {
      steps: [
        {
          name: "Stage 01: Traffic Density Detection",
          role: "Detects and counts vehicles across perimeter choke points in real time",
          tech: "YOLOv8 Object Detection",
          io: "Input: Video Stream Frame → Output: Vehicle Bounding Boxes & Count"
        },
        {
          name: "Stage 02: Smog & Atmospheric Attenuation Analysis",
          role: "Calculates Laplacian variance for sharpness loss, HSV saturation shifts, and contrast",
          tech: "OpenCV Spatial Image Filters",
          io: "Input: Scene Region → Output: Atmospheric Haze & Sharpness Coefficient"
        },
        {
          name: "Stage 03: Weighted Fusion Engine",
          role: "Synthesizes vehicle volume and visual haze metrics into a continuous Pollution Index",
          tech: "Dynamic Weighting Algorithm",
          io: "Input: Traffic Vector + Smog Metrics → Output: Pollution Score (0-100) + Alert Trigger"
        }
      ]
    },
    results: [
      "Dual-stream fusion algorithm providing continuous pollution estimation without dedicated hardware sensors.",
      "Implemented a versatile Flask/Streamlit dashboard supporting both live RTSP feeds and synthetic demo modes.",
      "Automated threshold alert triggers when vehicle density and atmospheric haze exceed safety margins."
    ],
    keyArtifacts: [
      "Dual-Pipeline CV Fusion Engine",
      "Laplacian & HSV Atmospheric Haze Analyzer",
      "Real-time Streamlit/Flask Monitoring Dashboard"
    ],
    githubUrl: "https://github.com/saiayyankula",
    demoType: "air_quality"
  }
];

export const experience: Experience[] = [
  {
    id: "iiith-ltrc-research",
    role: "Research Intern — Speech Processing",
    organization: "Language Technologies Research Centre (LTRC), IIIT Hyderabad",
    location: "Hyderabad, India (On-site)",
    period: "June 2026 – Aug 2026",
    isCurrent: true,
    type: "Research",
    description: [
      "Conducting research in speech processing and spoken language technologies, working with speech datasets for analysis, preprocessing, and model development.",
      "Exploring Automatic Speech Recognition (ASR), speech understanding, and multilingual speech technologies, applying ML/AI techniques to real-world speech and language problems.",
      "Collaborating with researchers and mentors on speech technology projects and experiments on-site in Hyderabad."
    ],
    skills: ["Speech Processing", "ASR", "Speech Understanding", "Multilingual Speech AI", "PyTorch", "Dataset Curation", "Model Evaluation"]
  },
  {
    id: "viswam-ai-swecha",
    role: "AI Intern (Summer of AI)",
    organization: "VISWAM.AI (Meta Swecha)",
    location: "Hybrid",
    period: "May 2025 – Jul 2025",
    type: "Internship",
    description: [
      "Completed a structured AI program covering data preprocessing, model training, and evaluation workflows.",
      "Collaborated within a large developer community on AI-focused learning initiatives and model experimentation pipelines."
    ],
    skills: ["Model Training", "Data Preprocessing", "Evaluation Workflows", "Collaborative AI", "Python"]
  },
  {
    id: "eduskills-aicte-google",
    role: "AI/ML Virtual Intern",
    organization: "EduSkills, AICTE (Google for Developers)",
    location: "Virtual",
    period: "Jan 2025 – Mar 2025",
    type: "Virtual Internship",
    description: [
      "Implemented supervised learning pipelines including feature engineering, model selection, and evaluation using Decision Trees, Random Forests, and SVM.",
      "Earned certified recognition under the Google for Developers initiative."
    ],
    skills: ["Supervised Learning", "Feature Engineering", "Decision Trees", "Random Forests", "SVM", "Model Selection"]
  },
  {
    id: "edunet-foundation",
    role: "Student Intern",
    organization: "Edunet Foundation (Industry 4.0 / AI)",
    location: "Virtual",
    period: "Feb 2025 – Apr 2025",
    type: "Internship",
    description: [
      "Completed practical exposure in AI and Industry 4.0 workflows with a focus on face recognition implementations and foundational AI pipelines."
    ],
    skills: ["Industry 4.0", "Face Recognition", "AI Pipelines", "Computer Vision Basics"]
  }
];

export const skillGroups: SkillGroup[] = [
  {
    category: "LLMs, RAG & Agentic AI",
    description: "Multistage workflow orchestration, dense retrieval systems, agentic pipelines, and model evaluation",
    skills: [
      { name: "LLMs & Multistage Pipelines", context: "Coordinating multi-model workflows with strict inter-model I/O contracts", level: "Core", relatedTo: ["FastAPI", "PyTorch", "Whisper", "mT5"] },
      { name: "RAG & Dense Vector Retrieval", context: "Retrieval-augmented generation with pgvector, HNSW indexing, and sentence-transformers", level: "Core", relatedTo: ["pgvector", "PostgreSQL", "Transformers"] },
      { name: "Agentic AI & Tool Calling", context: "Autonomous agent execution loops, structured function calling, and multi-agent systems", level: "Core", relatedTo: ["LLMs", "FastAPI"] },
      { name: "Prompt Architecture & Systems", context: "Few-shot calibration, dynamic context assembly, and system instruction optimization", level: "Advanced", relatedTo: ["LLMs"] },
      { name: "Fine-Tuning & Adaptation", context: "Downstream task adaptation and transfer learning on custom domain datasets", level: "Advanced", relatedTo: ["PyTorch", "Hugging Face"] },
      { name: "Model Evaluation & Benchmarking", context: "Structured metric benchmarking (Precision, Recall, F1, Correlation, Per-layer probes)", level: "Core", relatedTo: ["Scikit-learn", "IndicAccentDb"] }
    ]
  },
  {
    category: "Speech & NLP",
    description: "Acoustic modeling, speech recognition, synthesis, and deep transformer embeddings",
    skills: [
      { name: "HuBERT", context: "Layer-wise embedding extraction & accent classification", level: "Core", relatedTo: ["PyTorch", "Librosa"] },
      { name: "Whisper", context: "End-to-end ASR transcription & timestamped token alignment", level: "Core", relatedTo: ["Coqui TTS", "Wav2Lip"] },
      { name: "mT5", context: "Multilingual text-to-text sequence translation", level: "Core", relatedTo: ["Whisper", "Coqui TTS"] },
      { name: "Coqui TTS", context: "Neural regional voice synthesis from translated tokens", level: "Core", relatedTo: ["Wav2Lip"] },
      { name: "Wav2Lip", context: "GAN-based lip-synchronization on video frames", level: "Core", relatedTo: ["OpenCV"] },
      { name: "MFCC & Librosa", context: "Spectral feature extraction & acoustic audio preprocessing", level: "Core", relatedTo: ["HuBERT", "PyTorch"] }
    ]
  },
  {
    category: "ML & Deep Learning",
    description: "Statistical modeling, deep representations, and algorithmic foundations",
    skills: [
      { name: "PyTorch", context: "Custom training loops, layer probes, MLP/CNN architectures", level: "Core", relatedTo: ["HuBERT", "Transformers"] },
      { name: "Transformer Embeddings", context: "Hidden state extraction & dimensional probing", level: "Core", relatedTo: ["HuBERT", "mT5"] },
      { name: "CNN & BiLSTM", context: "Spatial & sequential acoustic modeling baselines", level: "Advanced", relatedTo: ["PyTorch", "Librosa"] },
      { name: "Feature Engineering", context: "Acoustic & spatial descriptor normalization", level: "Core", relatedTo: ["Scikit-learn", "NumPy"] },
      { name: "Supervised Learning", context: "Decision Trees, Random Forests, SVM, MLP Classifiers", level: "Core", relatedTo: ["Scikit-learn"] },
      { name: "Data Structures & Algorithms", context: "Optimized computational algorithms & algorithmic analysis", level: "Core", relatedTo: ["Python", "Java"] }
    ]
  },
  {
    category: "Computer Vision",
    description: "Deep biometric verification, object detection, and spatial image analysis",
    skills: [
      { name: "OpenCV", context: "Real-time stream processing, face alignment, spatial filtering", level: "Core", relatedTo: ["FaceNet", "YOLOv8"] },
      { name: "FaceNet", context: "128-D Euclidean biometric embedding generation (94% acc)", level: "Core", relatedTo: ["FastAPI", "MongoDB"] },
      { name: "YOLOv8", context: "Real-time edge vehicle detection & traffic density tracking", level: "Core", relatedTo: ["Streamlit", "Flask"] },
      { name: "Image Analysis (Laplacian, HSV, Contrast)", context: "Atmospheric haze & sharpness variance estimation", level: "Core", relatedTo: ["OpenCV"] }
    ]
  },
  {
    category: "Backend & Systems",
    description: "Production API services, relational ORM persistence, and full-stack engineering",
    skills: [
      { name: "FastAPI", context: "High-concurrency async REST API services with OpenAPI docs", level: "Core", relatedTo: ["PostgreSQL", "MongoDB"] },
      { name: "PostgreSQL & SQLAlchemy", context: "Relational data modeling, migrations, ORM schemas, and query optimization", level: "Core", relatedTo: ["FastAPI", "Docker"] },
      { name: "Docker & Compose", context: "Containerized development and production services", level: "Core", relatedTo: ["FastAPI", "PostgreSQL"] },
      { name: "React & TypeScript", context: "Modern type-safe frontend UI for AI platforms and visualizers", level: "Core", relatedTo: ["FastAPI"] },
      { name: "pytest & Automated Testing", context: "Unit and integration test suites for backend APIs and matching logic", level: "Core", relatedTo: ["FastAPI", "Python"] },
      { name: "MongoDB", context: "Document persistence for biometric logs & identity records", level: "Core", relatedTo: ["FastAPI"] },
      { name: "Flask & Streamlit", context: "Microservices for vision stream inference & benchmark dashboards", level: "Advanced", relatedTo: ["YOLOv8", "OpenCV"] },
      { name: "Git & Jupyter", context: "Version control and reproducible computational notebooks", level: "Core", relatedTo: ["Python"] }
    ]
  },
  {
    category: "Cloud & Infrastructure",
    description: "Cloud CI/CD pipelines, container orchestration, production deployments, and verified badges",
    skills: [
      { name: "Vercel & Render Deployment", context: "Production hosting and maintenance for full-stack AI platforms", level: "Core", relatedTo: ["FastAPI", "React"] },
      { name: "Google Cloud CI/CD Pipelines", context: "Automated test and build pipelines (Skill Badge)", level: "Core", relatedTo: ["Git"] },
      { name: "Kubernetes on Google Cloud", context: "Container deployment & cluster orchestration (Skill Badge)", level: "Core", relatedTo: ["FastAPI"] },
      { name: "Python", context: "Primary programming language for all AI, research & backend", level: "Core", relatedTo: ["PyTorch", "FastAPI"] },
      { name: "SQL", context: "Database query engineering & relational data manipulation", level: "Core", relatedTo: ["PostgreSQL"] },
      { name: "Java", context: "Object-oriented programming & foundational data structures", level: "Proficient", relatedTo: ["DSA"] }
    ]
  }
];

export const achievements: Achievement[] = [
  {
    id: "gcp-cicd-badge",
    title: "Implement CI/CD Pipelines on Google Cloud",
    issuer: "Google Cloud Skill Badge",
    type: "Cloud Badge",
    description: "Verified hands-on competence in constructing automated continuous integration and delivery pipelines on Google Cloud Platform."
  },
  {
    id: "gcp-k8s-badge",
    title: "Manage Kubernetes in Google Cloud",
    issuer: "Google Cloud Skill Badge",
    type: "Cloud Badge",
    description: "Verified capability in deploying, configuring, and scaling containerized workloads on Google Kubernetes Engine (GKE)."
  },
  {
    id: "eduskills-google-cert",
    title: "AI/ML Virtual Internship Certification",
    issuer: "EduSkills, AICTE & Google for Developers",
    type: "Certification",
    date: "Jan 2025 – Mar 2025",
    description: "Rigorous completion of supervised ML pipelines, feature selection, and algorithmic evaluation endorsed by Google for Developers."
  },
  {
    id: "viswam-cert",
    title: "Summer of AI Internship Certification",
    issuer: "VISWAM.AI, Meta Swecha",
    type: "Certification",
    date: "May 2025 – Jul 2025",
    description: "Comprehensive program in advanced model training, dataset engineering, and open developer collaboration."
  },
  {
    id: "hackathon-team-lead",
    title: "Team Lead — Digital Summit Citizen Hackathon",
    issuer: "Digital Summit 2025",
    type: "Hackathon",
    date: "2025",
    description: "Led an engineering team of 5 to architect and pitch an innovative technology solution in a competitive hackathon environment."
  },
  {
    id: "toastmasters-runnerup",
    title: "1st Runner-Up — Humorous Speech Contest",
    issuer: "Toastmasters International",
    type: "Award / Contest",
    date: "Apr 2024 – Apr 2025",
    description: "Achieved podium finish in international speech competition; completed Leadership Development Pathways with 12+ months of meeting roles."
  },
  {
    id: "fusion-ai-summit",
    title: "Participant — Fusion AI Summit 2025",
    issuer: "Fusion AI Summit",
    type: "Leadership",
    date: "2025",
    description: "Engaged with industry leaders and AI researchers on next-generation model pipelines, agentic workflows, and emerging research."
  },
  {
    id: "tech-leads-kiet",
    title: "Member — TECH-LEADS-KIET",
    issuer: "KIET Group of Institutions",
    type: "Leadership",
    date: "Feb 2025 – Nov 2025",
    description: "Active contributor to technical initiatives, peer mentorship, and engineering workshops across campus."
  }
];
