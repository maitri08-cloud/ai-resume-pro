import { ResumeScore } from '@/types/resume';
import { TrendingUp, AlertTriangle, Lightbulb, CheckCircle } from 'lucide-react';

interface Props {
  score: ResumeScore;
}

const ScoreRing = ({ value, size = 120 }: { value: number; size?: number }) => {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 80 ? 'hsl(142 71% 45%)' : value >= 50 ? 'hsl(38 92% 50%)' : 'hsl(0 72% 51%)';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="hsl(222 30% 16%)" strokeWidth="8" fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth="8" fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" className="score-ring"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <span className="text-[10px] text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
};

const ScoreBar = ({ label, value }: { label: string; value: number }) => {
  const color = value >= 80 ? 'bg-green-500' : value >= 50 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-medium">{value}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-1000 ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};

const ScorePanel = ({ score }: Props) => {
  return (
    <div className="glass-card p-5 space-y-5 animate-fade-in">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        Resume Score
      </h3>

      <div className="flex justify-center">
        <ScoreRing value={score.total} />
      </div>

      <div className="space-y-3">
        <ScoreBar label="Completeness" value={score.completeness} />
        <ScoreBar label="Skills Relevance" value={score.skillsRelevance} />
        <ScoreBar label="Experience Quality" value={score.experienceQuality} />
        <ScoreBar label="ATS Keywords" value={score.keywordOptimization} />
      </div>

      {/* Feedback */}
      {score.feedback.strengths.length > 0 && (
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-foreground flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5 text-green-500" /> Strengths
          </h4>
          {score.feedback.strengths.map((s, i) => (
            <p key={i} className="text-xs text-muted-foreground pl-5">• {s}</p>
          ))}
        </div>
      )}

      {score.feedback.weaknesses.length > 0 && (
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-foreground flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5 text-yellow-500" /> Weak Areas
          </h4>
          {score.feedback.weaknesses.map((w, i) => (
            <p key={i} className="text-xs text-muted-foreground pl-5">• {w}</p>
          ))}
        </div>
      )}

      {score.feedback.suggestions.length > 0 && (
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-foreground flex items-center gap-1">
            <Lightbulb className="h-3.5 w-3.5 text-primary" /> Suggestions
          </h4>
          {score.feedback.suggestions.map((s, i) => (
            <p key={i} className="text-xs text-muted-foreground pl-5">• {s}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScorePanel;
