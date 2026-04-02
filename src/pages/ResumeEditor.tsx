import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ResumeData, AISuggestion, createEmptyResume } from '@/types/resume';
import { saveResume, getResumeById } from '@/utils/storage';
import { scoreResume } from '@/utils/scoring';
import PersonalDetailsForm from '@/components/resume/PersonalDetailsForm';
import EducationForm from '@/components/resume/EducationForm';
import ExperienceForm from '@/components/resume/ExperienceForm';
import ProjectsForm from '@/components/resume/ProjectsForm';
import SkillsForm from '@/components/resume/SkillsForm';
import AchievementsForm from '@/components/resume/AchievementsForm';
import ResumePreview from '@/components/resume/ResumePreview';
import ScorePanel from '@/components/resume/ScorePanel';
import AISuggestionsPanel from '@/components/resume/AISuggestionsPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Download, Layout, User, GraduationCap, Briefcase, FolderOpen, Code, Award, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const ResumeEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const resumeRef = useRef<HTMLDivElement>(null);

  const [resume, setResume] = useState<ResumeData>(() => {
    if (id) {
      const existing = getResumeById(id);
      if (existing) return existing;
    }
    return createEmptyResume(id || crypto.randomUUID());
  });

  const [activeSection, setActiveSection] = useState('personal');
  const [rightTab, setRightTab] = useState('preview');
  const score = scoreResume(resume);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => saveResume(resume), 1000);
    return () => clearTimeout(timer);
  }, [resume]);

  const updateResume = useCallback((updates: Partial<ResumeData>) => {
    setResume(prev => ({ ...prev, ...updates }));
  }, []);

  const handleSave = () => {
    saveResume(resume);
    toast.success('Resume saved successfully!');
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;
    
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin: 0,
        filename: `${resume.personalDetails.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      html2pdf().set(opt).from(element).save();
      toast.success('PDF downloading...');
    } catch {
      toast.error('Failed to generate PDF');
    }
  };

  const handleApplySuggestion = (suggestion: AISuggestion) => {
    if (suggestion.type === 'general' && suggestion.section === 'Summary') {
      updateResume({ personalDetails: { ...resume.personalDetails, summary: suggestion.improved } });
      toast.success('Summary updated!');
    }
  };

  const handleAddSkills = (newSkills: string[]) => {
    const combined = [...new Set([...resume.skills, ...newSkills])];
    updateResume({ skills: combined });
    toast.success(`Added ${newSkills.length} skill(s)`);
  };

  const sections = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'achievements', label: 'Awards', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-4 py-3 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Input
              value={resume.title}
              onChange={e => updateResume({ title: e.target.value })}
              className="text-lg font-semibold bg-transparent border-none w-48 md:w-64 focus-visible:ring-1"
            />
          </div>
          <div className="flex items-center gap-2">
            {/* Template switcher */}
            <div className="hidden md:flex items-center gap-1 bg-muted rounded-lg p-0.5">
              <button
                onClick={() => updateResume({ templateId: 'classic' })}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${resume.templateId === 'classic' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Classic
              </button>
              <button
                onClick={() => updateResume({ templateId: 'modern' })}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${resume.templateId === 'modern' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Modern
              </button>
            </div>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
            <Button size="sm" onClick={handleDownloadPDF} className="gradient-primary text-primary-foreground">
              <Download className="h-4 w-4 mr-1" /> PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="flex max-w-[1600px] mx-auto">
        {/* Left: Form */}
        <div className="w-full lg:w-[45%] xl:w-[40%] border-r border-border p-4 overflow-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
          {/* Section Nav */}
          <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
            {sections.map(s => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${activeSection === s.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Section Content */}
          {activeSection === 'personal' && (
            <PersonalDetailsForm data={resume.personalDetails} onChange={p => updateResume({ personalDetails: p })} />
          )}
          {activeSection === 'education' && (
            <EducationForm data={resume.education} onChange={e => updateResume({ education: e })} />
          )}
          {activeSection === 'experience' && (
            <ExperienceForm data={resume.experience} onChange={e => updateResume({ experience: e })} />
          )}
          {activeSection === 'projects' && (
            <ProjectsForm data={resume.projects} onChange={p => updateResume({ projects: p })} />
          )}
          {activeSection === 'skills' && (
            <SkillsForm data={resume.skills} onChange={s => updateResume({ skills: s })} />
          )}
          {activeSection === 'achievements' && (
            <AchievementsForm data={resume.achievements} onChange={a => updateResume({ achievements: a })} />
          )}
        </div>

        {/* Right: Preview / AI */}
        <div className="hidden lg:block flex-1 p-4 overflow-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
          <Tabs value={rightTab} onValueChange={setRightTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="preview" className="flex items-center gap-1.5">
                <Layout className="h-3.5 w-3.5" /> Preview
              </TabsTrigger>
              <TabsTrigger value="score" className="flex items-center gap-1.5">
                Score ({score.total})
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> AI
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <div ref={resumeRef}>
                <ResumePreview resume={resume} />
              </div>
            </TabsContent>
            <TabsContent value="score">
              <ScorePanel score={score} />
            </TabsContent>
            <TabsContent value="ai">
              <AISuggestionsPanel
                resume={resume}
                onApplySuggestion={handleApplySuggestion}
                onAddSkills={handleAddSkills}
                onUpdateTargetRole={role => updateResume({ targetRole: role })}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
