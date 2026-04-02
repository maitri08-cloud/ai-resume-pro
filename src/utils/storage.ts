import { ResumeData } from '@/types/resume';

const STORAGE_KEY = 'resume_builder_resumes';

export const getResumes = (): ResumeData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveResume = (resume: ResumeData): void => {
  const resumes = getResumes();
  const index = resumes.findIndex(r => r.id === resume.id);
  const updated = { ...resume, updatedAt: new Date().toISOString() };
  if (index >= 0) {
    resumes[index] = updated;
  } else {
    resumes.push(updated);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
};

export const deleteResume = (id: string): void => {
  const resumes = getResumes().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
};

export const getResumeById = (id: string): ResumeData | undefined => {
  return getResumes().find(r => r.id === id);
};
