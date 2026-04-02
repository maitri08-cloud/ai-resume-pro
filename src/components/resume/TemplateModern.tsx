import { ResumeData } from '@/types/resume';

interface Props {
  resume: ResumeData;
}

const TemplateModern = ({ resume }: Props) => {
  const { personalDetails: p, education, experience, projects, skills, achievements } = resume;

  return (
    <div className="bg-white text-gray-900 min-h-[1056px] w-full max-w-[816px] mx-auto text-[11px] leading-relaxed font-sans flex">
      {/* Sidebar */}
      <div className="w-[220px] bg-slate-800 text-white p-5 shrink-0">
        <div className="mb-6">
          <h1 className="text-lg font-bold leading-tight">{p.fullName || 'Your Name'}</h1>
          {resume.targetRole && <p className="text-slate-300 text-[10px] mt-1">{resume.targetRole}</p>}
        </div>

        {/* Contact */}
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Contact</h2>
          <div className="space-y-1.5 text-[10px]">
            {p.email && <div className="text-slate-200">{p.email}</div>}
            {p.phone && <div className="text-slate-200">{p.phone}</div>}
            {p.linkedin && <div className="text-slate-200">{p.linkedin}</div>}
            {p.github && <div className="text-slate-200">{p.github}</div>}
            {p.website && <div className="text-slate-200">{p.website}</div>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-1">
              {skills.map(s => (
                <span key={s} className="px-2 py-0.5 bg-slate-700 rounded text-[9px] text-slate-200">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-2">
                <div className="font-semibold text-[10px]">{edu.degree}</div>
                <div className="text-slate-300 text-[9px]">{edu.field}</div>
                <div className="text-slate-300 text-[9px]">{edu.institution}</div>
                <div className="text-slate-400 text-[9px]">{edu.startDate} – {edu.endDate}</div>
                {edu.gpa && <div className="text-slate-400 text-[9px]">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Achievements</h2>
            {achievements.map(a => (
              <div key={a.id} className="mb-1.5">
                <div className="font-semibold text-[10px]">{a.title}</div>
                {a.date && <div className="text-slate-400 text-[9px]">{a.date}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Summary */}
        {p.summary && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 pb-1 border-b-2 border-blue-500">Profile</h2>
            <p className="text-gray-700">{p.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 pb-1 border-b-2 border-blue-500">Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-800">{exp.position}</span>
                    {exp.company && <span className="text-blue-600"> | {exp.company}</span>}
                  </div>
                  <span className="text-gray-400 text-[10px] shrink-0 ml-2">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.location && <div className="text-gray-400 text-[10px]">{exp.location}</div>}
                <ul className="list-disc ml-4 mt-1 space-y-0.5">
                  {exp.bullets.filter(b => b.trim()).map((b, i) => (
                    <li key={i} className="text-gray-700">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 pb-1 border-b-2 border-blue-500">Projects</h2>
            {projects.map(proj => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-800">{proj.name}</span>
                  {proj.link && <span className="text-blue-500 text-[10px]">{proj.link}</span>}
                </div>
                {proj.description && <p className="text-gray-600">{proj.description}</p>}
                {proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.technologies.map(t => (
                      <span key={t} className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[9px]">{t}</span>
                    ))}
                  </div>
                )}
                <ul className="list-disc ml-4 mt-1 space-y-0.5">
                  {proj.bullets.filter(b => b.trim()).map((b, i) => (
                    <li key={i} className="text-gray-700">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateModern;
