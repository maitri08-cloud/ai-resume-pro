import { ResumeData } from '@/types/resume';

interface Props {
  resume: ResumeData;
}

const TemplateClassic = ({ resume }: Props) => {
  const { personalDetails: p, education, experience, projects, skills, achievements } = resume;

  return (
    <div className="bg-white text-gray-900 p-8 min-h-[1056px] w-full max-w-[816px] mx-auto text-[11px] leading-relaxed font-[serif]">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-3 mb-4">
        <h1 className="text-2xl font-bold tracking-wide text-gray-900">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-3 mt-1 text-gray-600 text-[10px]">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {p.linkedin && <span>• {p.linkedin}</span>}
          {p.github && <span>• {p.github}</span>}
          {p.website && <span>• {p.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {p.summary && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2 text-gray-800">Summary</h2>
          <p className="text-gray-700">{p.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2 text-gray-800">Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold">{exp.position}</span>
                  {exp.company && <span className="text-gray-600"> — {exp.company}</span>}
                </div>
                <span className="text-gray-500 text-[10px] shrink-0 ml-2">
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              {exp.location && <div className="text-gray-500 text-[10px]">{exp.location}</div>}
              <ul className="list-disc ml-4 mt-1 space-y-0.5">
                {exp.bullets.filter(b => b.trim()).map((b, i) => (
                  <li key={i} className="text-gray-700">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2 text-gray-800">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold">{edu.degree} in {edu.field}</span>
                  <span className="text-gray-600"> — {edu.institution}</span>
                </div>
                <span className="text-gray-500 text-[10px] shrink-0 ml-2">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              {edu.gpa && <div className="text-gray-500 text-[10px]">GPA: {edu.gpa}</div>}
              {edu.description && <p className="text-gray-600 mt-0.5">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2 text-gray-800">Projects</h2>
          {projects.map(proj => (
            <div key={proj.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className="font-bold">{proj.name}</span>
                {proj.link && <span className="text-blue-700 text-[10px]">{proj.link}</span>}
              </div>
              {proj.description && <p className="text-gray-600">{proj.description}</p>}
              {proj.technologies.length > 0 && (
                <div className="text-gray-500 text-[10px] italic">{proj.technologies.join(', ')}</div>
              )}
              <ul className="list-disc ml-4 mt-0.5 space-y-0.5">
                {proj.bullets.filter(b => b.trim()).map((b, i) => (
                  <li key={i} className="text-gray-700">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2 text-gray-800">Skills</h2>
          <p className="text-gray-700">{skills.join(' • ')}</p>
        </div>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2 text-gray-800">Achievements & Certifications</h2>
          {achievements.map(a => (
            <div key={a.id} className="mb-1">
              <div className="flex justify-between">
                <span className="font-bold">{a.title}</span>
                {a.date && <span className="text-gray-500 text-[10px]">{a.date}</span>}
              </div>
              {a.description && <p className="text-gray-600">{a.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateClassic;
