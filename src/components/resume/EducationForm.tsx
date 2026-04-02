import { Education } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { v4 as uuid } from 'uuid';

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const EducationForm = ({ data, onChange }: Props) => {
  const add = () => {
    onChange([...data, { id: uuid(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', description: '' }]);
  };

  const update = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const remove = (id: string) => {
    onChange(data.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Education
        </h3>
        <Button variant="outline" size="sm" onClick={add}>
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>
      {data.map((edu) => (
        <div key={edu.id} className="glass-card p-4 space-y-3">
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => remove(edu.id)} className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Institution</Label>
              <Input placeholder="MIT" value={edu.institution} onChange={e => update(edu.id, 'institution', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Degree</Label>
              <Input placeholder="Bachelor of Science" value={edu.degree} onChange={e => update(edu.id, 'degree', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Field of Study</Label>
              <Input placeholder="Computer Science" value={edu.field} onChange={e => update(edu.id, 'field', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>GPA</Label>
              <Input placeholder="3.8/4.0" value={edu.gpa} onChange={e => update(edu.id, 'gpa', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Start Date</Label>
              <Input type="month" value={edu.startDate} onChange={e => update(edu.id, 'startDate', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>End Date</Label>
              <Input type="month" value={edu.endDate} onChange={e => update(edu.id, 'endDate', e.target.value)} />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea placeholder="Relevant coursework, honors..." rows={2} value={edu.description} onChange={e => update(edu.id, 'description', e.target.value)} />
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">No education entries yet. Click "Add" to get started.</p>
      )}
    </div>
  );
};

export default EducationForm;
