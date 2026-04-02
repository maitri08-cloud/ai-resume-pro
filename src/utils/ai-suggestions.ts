import { ResumeData, AISuggestion } from '@/types/resume';

// Mock AI suggestions (no API key needed)
const actionVerbs = ['Spearheaded', 'Architected', 'Engineered', 'Orchestrated', 'Pioneered', 'Streamlined', 'Revolutionized', 'Cultivated', 'Championed', 'Accelerated'];

const roleSkills: Record<string, string[]> = {
  'software engineer': ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Git', 'CI/CD', 'REST APIs', 'GraphQL', 'Agile', 'System Design'],
  'full stack developer': ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'TypeScript', 'Docker', 'AWS', 'Git'],
  'frontend developer': ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'CSS-in-JS', 'Webpack', 'Testing Library', 'Accessibility', 'Performance Optimization', 'Figma'],
  'backend developer': ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Microservices', 'REST APIs', 'GraphQL', 'CI/CD'],
  'data scientist': ['Python', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'SQL', 'Machine Learning', 'Deep Learning', 'Statistics', 'Data Visualization', 'Jupyter'],
  'product manager': ['Agile', 'Scrum', 'Jira', 'A/B Testing', 'User Research', 'Roadmapping', 'Stakeholder Management', 'Data Analysis', 'PRDs', 'OKRs'],
  'devops engineer': ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'CI/CD', 'Jenkins', 'Ansible', 'Monitoring', 'Linux', 'Networking', 'Security'],
};

export const improveBullet = (bullet: string): string => {
  if (!bullet.trim()) return bullet;
  const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
  // Remove leading weak verbs
  const cleaned = bullet.replace(/^(worked on|helped with|was responsible for|did|made|handled)\s+/i, '');
  return `${verb} ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}`;
};

export const suggestSkillsForRole = (role: string, currentSkills: string[]): string[] => {
  const key = role.toLowerCase();
  const matchedRole = Object.keys(roleSkills).find(r => key.includes(r) || r.includes(key));
  const suggested = matchedRole ? roleSkills[matchedRole] : roleSkills['software engineer'];
  return suggested.filter(s => !currentSkills.map(cs => cs.toLowerCase()).includes(s.toLowerCase()));
};

export const generateAISuggestions = async (resume: ResumeData): Promise<AISuggestion[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const suggestions: AISuggestion[] = [];

  // Improve experience bullets
  resume.experience.forEach(exp => {
    exp.bullets.forEach((bullet, i) => {
      if (bullet.trim() && !bullet.match(/^(Spearheaded|Architected|Engineered|Orchestrated|Pioneered)/)) {
        suggestions.push({
          section: `${exp.company} - Bullet ${i + 1}`,
          original: bullet,
          improved: improveBullet(bullet),
          type: 'bullet',
        });
      }
    });
  });

  // Suggest skills
  const missingSkills = suggestSkillsForRole(resume.targetRole || 'software engineer', resume.skills);
  if (missingSkills.length > 0) {
    suggestions.push({
      section: 'Skills',
      original: `Current: ${resume.skills.join(', ') || 'None'}`,
      improved: `Add: ${missingSkills.slice(0, 5).join(', ')}`,
      type: 'skill',
    });
  }

  // General feedback
  if (!resume.personalDetails.summary) {
    suggestions.push({
      section: 'Summary',
      original: 'No summary provided',
      improved: `Results-driven ${resume.targetRole || 'professional'} with expertise in ${resume.skills.slice(0, 3).join(', ') || 'software development'}. Proven track record of delivering high-quality solutions and driving impactful outcomes.`,
      type: 'general',
    });
  }

  return suggestions;
};

export const getJobOptimization = async (resume: ResumeData, targetRole: string): Promise<{
  suggestedSkills: string[];
  keywords: string[];
  improvements: string[];
}> => {
  await new Promise(resolve => setTimeout(resolve, 1200));

  const suggestedSkills = suggestSkillsForRole(targetRole, resume.skills);

  const keywords = [
    'cross-functional collaboration', 'scalable architecture', 'performance optimization',
    'agile methodology', 'continuous integration', 'test-driven development',
    'stakeholder management', 'data-driven decisions', 'technical leadership',
  ];

  const improvements = [
    `Tailor your summary to mention "${targetRole}" specifically`,
    'Quantify achievements with metrics (%, $, time saved)',
    `Include ${targetRole}-specific tools and frameworks`,
    'Use industry-standard terminology for ATS compatibility',
    'Add relevant certifications for the role',
  ];

  return { suggestedSkills: suggestedSkills.slice(0, 8), keywords: keywords.slice(0, 6), improvements };
};
