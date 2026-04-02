import { useState } from 'react';
import { ResumeData, AISuggestion } from '@/types/resume';
import { generateAISuggestions, getJobOptimization } from '@/utils/ai-suggestions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, Target, ArrowRight, Check } from 'lucide-react';

interface Props {
  resume: ResumeData;
  onApplySuggestion?: (suggestion: AISuggestion) => void;
  onAddSkills?: (skills: string[]) => void;
  onUpdateTargetRole?: (role: string) => void;
}

const AISuggestionsPanel = ({ resume, onApplySuggestion, onAddSkills, onUpdateTargetRole }: Props) => {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [jobLoading, setJobLoading] = useState(false);
  const [jobResult, setJobResult] = useState<{ suggestedSkills: string[]; keywords: string[]; improvements: string[] } | null>(null);
  const [targetRole, setTargetRole] = useState(resume.targetRole || '');
  const [applied, setApplied] = useState<Set<number>>(new Set());

  const handleGenerate = async () => {
    setLoading(true);
    setSuggestions([]);
    setApplied(new Set());
    try {
      const result = await generateAISuggestions(resume);
      setSuggestions(result);
    } finally {
      setLoading(false);
    }
  };

  const handleJobOptimize = async () => {
    if (!targetRole.trim()) return;
    setJobLoading(true);
    setJobResult(null);
    onUpdateTargetRole?.(targetRole);
    try {
      const result = await getJobOptimization(resume, targetRole);
      setJobResult(result);
    } finally {
      setJobLoading(false);
    }
  };

  const applySuggestion = (suggestion: AISuggestion, index: number) => {
    onApplySuggestion?.(suggestion);
    setApplied(prev => new Set(prev).add(index));
  };

  return (
    <div className="space-y-5">
      {/* AI Suggestions */}
      <div className="glass-card p-5 space-y-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            AI Suggestions
          </h3>
          <Button onClick={handleGenerate} disabled={loading} size="sm" className="gradient-primary text-primary-foreground">
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Sparkles className="h-4 w-4 mr-1" />}
            {loading ? 'Analyzing...' : 'Improve with AI'}
          </Button>
        </div>

        {suggestions.length > 0 && (
          <div className="space-y-3">
            {suggestions.map((s, i) => (
              <div key={i} className="bg-muted/50 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">{s.section}</Badge>
                  <Badge variant="secondary" className="text-[10px] capitalize">{s.type}</Badge>
                </div>
                {s.type === 'bullet' && (
                  <>
                    <div className="text-xs text-muted-foreground line-through">{s.original}</div>
                    <div className="text-xs text-foreground flex items-start gap-1">
                      <ArrowRight className="h-3 w-3 text-accent shrink-0 mt-0.5" />
                      {s.improved}
                    </div>
                  </>
                )}
                {s.type !== 'bullet' && (
                  <div className="text-xs text-foreground">{s.improved}</div>
                )}
                {onApplySuggestion && !applied.has(i) && (
                  <Button variant="ghost" size="sm" className="text-xs text-accent" onClick={() => applySuggestion(s, i)}>
                    Apply suggestion
                  </Button>
                )}
                {applied.has(i) && (
                  <span className="text-xs text-green-500 flex items-center gap-1"><Check className="h-3 w-3" /> Applied</span>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && suggestions.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-3">Click "Improve with AI" to get personalized suggestions</p>
        )}
      </div>

      {/* Job Role Optimization */}
      <div className="glass-card p-5 space-y-4 animate-fade-in">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Job Role Optimization
        </h3>
        <div className="flex gap-2">
          <div className="flex-1 space-y-1">
            <Label className="text-xs">Target Role</Label>
            <Input placeholder="e.g., Software Engineer" value={targetRole} onChange={e => setTargetRole(e.target.value)} />
          </div>
          <Button onClick={handleJobOptimize} disabled={jobLoading || !targetRole.trim()} className="self-end">
            {jobLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Optimize'}
          </Button>
        </div>

        {jobResult && (
          <div className="space-y-4">
            {jobResult.suggestedSkills.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2">Suggested Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {jobResult.suggestedSkills.map(s => (
                    <Badge key={s} variant="outline" className="text-[10px] cursor-pointer hover:bg-primary/10" onClick={() => onAddSkills?.([s])}>
                      + {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {jobResult.keywords.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2">Keywords to Include</h4>
                <div className="flex flex-wrap gap-1.5">
                  {jobResult.keywords.map(k => (
                    <Badge key={k} variant="secondary" className="text-[10px]">{k}</Badge>
                  ))}
                </div>
              </div>
            )}

            {jobResult.improvements.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2">Improvements</h4>
                {jobResult.improvements.map((imp, i) => (
                  <p key={i} className="text-xs text-muted-foreground pl-3">• {imp}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestionsPanel;
