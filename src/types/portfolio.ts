export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  domain: 'Speech & Multimodal' | 'Speech AI & NLP' | 'Full-Stack AI & Cloud' | 'Computer Vision & Cloud' | 'Computer Vision & IoT';
  highlightMetric: string;
  technologies: string[];
  problem: string;
  solution: string;
  systemArchitecture: {
    steps: {
      name: string;
      role: string;
      tech: string;
      io: string;
    }[];
  };
  results: string[];
  keyArtifacts: string[];
  githubUrl?: string;
  demoType: 'dubbing_simulator' | 'hubert_layers' | 'facenet_service' | 'air_quality' | 'resume_engine';
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  type: 'Research' | 'Internship' | 'Virtual Internship';
  description: string[];
  skills: string[];
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: {
    name: string;
    context: string;
    level: 'Core' | 'Advanced' | 'Proficient';
    relatedTo?: string[];
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  type: 'Cloud Badge' | 'Award / Contest' | 'Certification' | 'Hackathon' | 'Leadership';
  date?: string;
  description: string;
}

export interface CandidateProfile {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  relocationStatus: string;
  github: string;
  linkedin: string;
  photoUrl?: string;
  avatarFallback?: string;
  education: {
    degree: string;
    institution: string;
    affiliate: string;
    cgpa: string;
    expectedGraduation: string;
    coursework: string[];
  };
  summary: string;
  coreDifferentiators: {
    title: string;
    description: string;
    icon: string;
  }[];
}
