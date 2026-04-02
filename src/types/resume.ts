export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
  bullets: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface ResumeData {
  id: string;
  title: string;
  templateId: string;
  personalDetails: PersonalDetails;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: string[];
  achievements: Achievement[];
  targetRole: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeScore {
  total: number;
  completeness: number;
  skillsRelevance: number;
  experienceQuality: number;
  keywordOptimization: number;
  feedback: ScoreFeedback;
}

export interface ScoreFeedback {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface AISuggestion {
  section: string;
  original: string;
  improved: string;
  type: 'bullet' | 'skill' | 'keyword' | 'general';
}

export const emptyPersonalDetails: PersonalDetails = {
  fullName: '',
  email: '',
  phone: '',
  linkedin: '',
  github: '',
  website: '',
  summary: '',
};

export const createEmptyResume = (id: string): ResumeData => ({
  id,
  title: 'Untitled Resume',
  templateId: 'classic',
  personalDetails: { ...emptyPersonalDetails },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  achievements: [],
  targetRole: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
