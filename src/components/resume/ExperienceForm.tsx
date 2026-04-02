import { Experience } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Briefcase, Plus, Trash2, X } from 'lucide-react';
import { v4 as uuid } from 'uuid';

interface Props {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const ExperienceForm = ({ data, onChange }: Props) => {
  const add = () => {
    onChange([...data, { id: uuid(), company: '', position: '', location: '', startDate: '', endDate: '', current: false, bullets: [''] }]);
  };

  const update = (id: string, field: keyof Experience, value: any) => {
    onChange(data.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const updateBullet = (id: string, idx: number, value: string) => {
    onChange(data.map(e => {
      if (e.id !== id) return e;
      const bullets = [...e.bullets];
      bullets[idx] = value;
      return { ...e, bullets };
    }));
  };

  const addBullet = (id: string) => {
    onChange(data.map(e => e.id === id ? { ...e, bullets: [...e.bullets, ''] } : e));
  };

  const removeBullet = (id: string, idx: number) => {
    onChange(data.map(e => {
      if (e.id !== id) return e;
      return { ...e, bullets: e.bullets.filter((_, i) => i !== idx) };
    }));
  };

  const remove = (id: string) => onChange(data.filter(e => e.id !== id));

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Experience
        </h3>
        <Button variant="outline" size="sm" onClick={add}>
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>
      {data.map((exp) => (
        <div key={exp.id} className="glass-card p-4 space-y-3">
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => remove(exp.id)} className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Company</Label>
              <Input placeholder="Google" value={exp.company} onChange={e => update(exp.id, 'company', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Position</Label>
              <Input placeholder="Senior Software Engineer" value={exp.position} onChange={e => update(exp.id, 'position', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Location</Label>
              <Input placeholder="San Francisco, CA" value={exp.location} onChange={e => update(exp.id, 'location', e.target.value)} />
            </div>
            <div className="flex items-end gap-4">
              <div className="space-y-1 flex-1">
                <Label>Start Date</Label>
                <Input type="month" value={exp.startDate} onChange={e => update(exp.id, 'startDate', e.target.value)} />
              </div>
              <div className="space-y-1 flex-1">
                <Label>End Date</Label>
                <Input type="month" value={exp.endDate} disabled={exp.current} onChange={e => update(exp.id, 'endDate', e.target.value)} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={exp.current} onCheckedChange={v => update(exp.id, 'current', !!v)} />
            <Label className="text-sm">Currently working here</Label>
          </div>
          <div className="space-y-2">
            <Label>Bullet Points</Label>
            {exp.bullets.map((b, i) => (
              <div key={i} className="flex gap-2">
                <Input placeholder="Describe your achievement..." value={b} onChange={e => updateBullet(exp.id, i, e.target.value)} />
                {exp.bullets.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => removeBullet(exp.id, i)} className="shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="ghost" size="sm" onClick={() => addBullet(exp.id)}>
              <Plus className="h-3 w-3 mr-1" /> Add bullet
            </Button>
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">No experience entries yet.</p>
      )}
    </div>
  );
};

export default ExperienceForm;
