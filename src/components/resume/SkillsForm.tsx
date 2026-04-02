import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Plus, X } from 'lucide-react';

interface Props {
  data: string[];
  onChange: (data: string[]) => void;
}

const SkillsForm = ({ data, onChange }: Props) => {
  const [input, setInput] = useState('');

  const addSkill = () => {
    const skill = input.trim();
    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    }
  };

  const remove = (skill: string) => {
    onChange(data.filter(s => s !== skill));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Code className="h-5 w-5 text-primary" />
        Skills
      </h3>
      <div className="space-y-2">
        <Label>Add skills (press Enter or comma to add)</Label>
        <div className="flex gap-2">
          <Input
            placeholder="e.g., React, Python, AWS..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button variant="outline" onClick={addSkill}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.map(skill => (
          <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm flex items-center gap-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            {skill}
            <button onClick={() => remove(skill)} className="hover:text-destructive">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      {data.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">No skills added yet.</p>
      )}
    </div>
  );
};

export default SkillsForm;
