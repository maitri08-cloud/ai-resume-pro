import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeData } from '@/types/resume';
import { getResumes, deleteResume } from '@/utils/storage';
import { scoreResume } from '@/utils/scoring';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Trash2, Edit, Download, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<ResumeData[]>([]);

  useEffect(() => {
    setResumes(getResumes());
  }, []);

  const handleCreate = () => {
    const id = crypto.randomUUID();
    navigate(`/editor/${id}`);
  };

  const handleDelete = (id: string) => {
    deleteResume(id);
    setResumes(getResumes());
    toast.success('Resume deleted');
  };

  const handleDownload = async (resume: ResumeData) => {
    navigate(`/editor/${resume.id}`);
    toast.info('Opening resume — click PDF to download');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FileText className="h-7 w-7 text-primary" />
              <span className="gradient-text">ResumeAI</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Build professional resumes with AI-powered insights</p>
          </div>
          <Button onClick={handleCreate} className="gradient-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            New Resume
          </Button>
        </div>
      </header>

      {/* Dashboard */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {resumes.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-muted mb-6">
              <FileText className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">No resumes yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Create your first resume and get AI-powered suggestions to make it stand out.
            </p>
            <Button onClick={handleCreate} size="lg" className="gradient-primary text-primary-foreground">
              <Sparkles className="h-5 w-5 mr-2" />
              Create Your First Resume
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map(resume => {
              const score = scoreResume(resume);
              return (
                <div key={resume.id} className="glass-card p-5 space-y-4 animate-fade-in hover:border-primary/30 transition-colors group">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{resume.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {resume.personalDetails.fullName || 'No name'} • {resume.templateId}
                      </p>
                    </div>
                    <div className={`text-xs font-bold px-2 py-1 rounded-full ${score.total >= 80 ? 'bg-green-500/10 text-green-500' : score.total >= 50 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
                      {score.total}/100
                    </div>
                  </div>

                  {/* Score bar */}
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${score.total >= 80 ? 'bg-green-500' : score.total >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${score.total}%` }}
                    />
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/editor/${resume.id}`)}>
                      <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(resume)}>
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(resume.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}

            {/* New resume card */}
            <button
              onClick={handleCreate}
              className="glass-card p-5 flex flex-col items-center justify-center gap-3 min-h-[200px] hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Create New Resume</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
