import { Achievement } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Award, Plus, Trash2 } from 'lucide-react';
import { v4 as uuid } from 'uuid';

interface Props {
  data: Achievement[];
  onChange: (data: Achievement[]) => void;
}

const AchievementsForm = ({ data, onChange }: Props) => {
  const add = () => {
    onChange([...data, { id: uuid(), title: '', description: '', date: '' }]);
  };

  const update = (id: string, field: keyof Achievement, value: string) => {
    onChange(data.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const remove = (id: string) => onChange(data.filter(a => a.id !== id));

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Achievements & Certifications
        </h3>
        <Button variant="outline" size="sm" onClick={add}>
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>
      {data.map((ach) => (
        <div key={ach.id} className="glass-card p-4 space-y-3">
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => remove(ach.id)} className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input placeholder="AWS Certified Developer" value={ach.title} onChange={e => update(ach.id, 'title', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Date</Label>
              <Input type="month" value={ach.date} onChange={e => update(ach.id, 'date', e.target.value)} />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea placeholder="Brief description..." rows={2} value={ach.description} onChange={e => update(ach.id, 'description', e.target.value)} />
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">No achievements yet.</p>
      )}
    </div>
  );
};

export default AchievementsForm;
