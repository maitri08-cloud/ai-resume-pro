import { ResumeData, ResumeScore, ScoreFeedback } from '@/types/resume';

// ATS-friendly keywords by category
const atsKeywords = {
  action: ['achieved', 'built', 'created', 'delivered', 'designed', 'developed', 'enhanced', 'established', 'generated', 'implemented', 'improved', 'increased', 'led', 'managed', 'optimized', 'reduced', 'resolved', 'streamlined', 'transformed'],
  technical: ['agile', 'api', 'aws', 'ci/cd', 'cloud', 'database', 'deployment', 'docker', 'git', 'kubernetes', 'microservices', 'performance', 'scalable', 'testing', 'typescript'],
  soft: ['collaboration', 'communication', 'leadership', 'mentoring', 'problem-solving', 'teamwork'],
};

export const scoreResume = (resume: ResumeData): ResumeScore => {
  const completeness = scoreCompleteness(resume);
  const skillsRelevance = scoreSkills(resume);
  const experienceQuality = scoreExperience(resume);
  const keywordOptimization = scoreKeywords(resume);

  const total = Math.round(
    completeness * 0.25 +
    skillsRelevance * 0.25 +
    experienceQuality * 0.3 +
    keywordOptimization * 0.2
  );

  const feedback = generateFeedback(resume, { completeness, skillsRelevance, experienceQuality, keywordOptimization });

  return { total, completeness, skillsRelevance, experienceQuality, keywordOptimization, feedback };
};

function scoreCompleteness(r: ResumeData): number {
  let score = 0;
  const checks = [
    r.personalDetails.fullName, r.personalDetails.email, r.personalDetails.phone,
    r.personalDetails.summary, r.personalDetails.linkedin || r.personalDetails.github,
    r.education.length > 0, r.experience.length > 0, r.skills.length > 0,
    r.projects.length > 0, r.achievements.length > 0,
  ];
  checks.forEach(c => { if (c) score += 10; });
  return score;
}

function scoreSkills(r: ResumeData): number {
  if (r.skills.length === 0) return 0;
  let score = Math.min(r.skills.length * 8, 60);
  // Bonus for categorized/diverse skills
  const allText = r.skills.join(' ').toLowerCase();
  const techMatch = atsKeywords.technical.filter(k => allText.includes(k)).length;
  score += Math.min(techMatch * 10, 40);
  return Math.min(score, 100);
}

function scoreExperience(r: ResumeData): number {
  if (r.experience.length === 0) return 0;
  let score = Math.min(r.experience.length * 15, 30);
  const allBullets = r.experience.flatMap(e => e.bullets).join(' ').toLowerCase();
  // Check for action verbs
  const actionCount = atsKeywords.action.filter(v => allBullets.includes(v)).length;
  score += Math.min(actionCount * 5, 40);
  // Check for quantifiable results (numbers/percentages)
  const hasNumbers = (allBullets.match(/\d+%?/g) || []).length;
  score += Math.min(hasNumbers * 5, 30);
  return Math.min(score, 100);
}

function scoreKeywords(r: ResumeData): number {
  const allText = [
    r.personalDetails.summary,
    ...r.experience.flatMap(e => e.bullets),
    ...r.projects.flatMap(p => p.bullets),
    ...r.skills,
  ].join(' ').toLowerCase();

  const allKeywords = [...atsKeywords.action, ...atsKeywords.technical, ...atsKeywords.soft];
  const matched = allKeywords.filter(k => allText.includes(k)).length;
  return Math.min(Math.round((matched / allKeywords.length) * 100), 100);
}

function generateFeedback(r: ResumeData, scores: { completeness: number; skillsRelevance: number; experienceQuality: number; keywordOptimization: number }): ScoreFeedback {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  if (scores.completeness >= 80) strengths.push('Resume is well-filled with all major sections');
  else {
    weaknesses.push('Some sections are incomplete');
    if (!r.personalDetails.summary) suggestions.push('Add a professional summary');
    if (r.education.length === 0) suggestions.push('Add your education details');
    if (r.projects.length === 0) suggestions.push('Add projects to showcase your work');
    if (r.achievements.length === 0) suggestions.push('Add certifications or achievements');
  }

  if (scores.skillsRelevance >= 70) strengths.push('Good variety of relevant skills');
  else {
    weaknesses.push('Skills section needs more relevant keywords');
    suggestions.push('Add technical skills relevant to your target role');
  }

  if (scores.experienceQuality >= 70) strengths.push('Experience bullets use strong action verbs');
  else {
    weaknesses.push('Experience descriptions could be stronger');
    suggestions.push('Start bullet points with action verbs (e.g., "Developed", "Led", "Optimized")');
    suggestions.push('Include quantifiable achievements with numbers and percentages');
  }

  if (scores.keywordOptimization >= 60) strengths.push('Good ATS keyword optimization');
  else {
    weaknesses.push('Resume may not pass ATS keyword filters');
    suggestions.push('Include industry-standard keywords in your descriptions');
  }

  return { strengths, weaknesses, suggestions };
}
