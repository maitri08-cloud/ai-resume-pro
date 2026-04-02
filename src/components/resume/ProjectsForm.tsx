import { Project } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FolderOpen, Plus, Trash2, X } from 'lucide-react';
import { v4 as uuid } from 'uuid';

interface Props {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const ProjectsForm = ({ data, onChange }: Props) => {
  const add = () => {
    onChange([...data, { id: uuid(), name: '', description: '', technologies: [], link: '', bullets: [''] }]);
  };

  const update = (id: string, field: keyof Project, value: any) => {
    onChange(data.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const updateBullet = (id: string, idx: number, value: string) => {
    onChange(data.map(p => {
      if (p.id !== id) return p;
      const bullets = [...p.bullets];
      bullets[idx] = value;
      return { ...p, bullets };
    }));
  };

  const addBullet = (id: string) => {
    onChange(data.map(p => p.id === id ? { ...p, bullets: [...p.bullets, ''] } : p));
  };

  const removeBullet = (id: string, idx: number) => {
    onChange(data.map(p => {
      if (p.id !== id) return p;
      return { ...p, bullets: p.bullets.filter((_, i) => i !== idx) };
    }));
  };

  const remove = (id: string) => onChange(data.filter(p => p.id !== id));

  const handleTechInput = (id: string, value: string) => {
    if (value.endsWith(',')) {
      const tech = value.slice(0, -1).trim();
      if (tech) {
        const proj = data.find(p => p.id === id);
        if (proj && !proj.technologies.includes(tech)) {
          update(id, 'technologies', [...proj.technologies, tech]);
        }
      }
    }
  };

  const removeTech = (id: string, tech: string) => {
    const proj = data.find(p => p.id === id);
    if (proj) update(id, 'technologies', proj.technologies.filter(t => t !== tech));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-primary" />
          Projects
        </h3>
        <Button variant="outline" size="sm" onClick={add}>
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>
      {data.map((proj) => (
        <div key={proj.id} className="glass-card p-4 space-y-3">
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => remove(proj.id)} className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Project Name</Label>
              <Input placeholder="E-commerce Platform" value={proj.name} onChange={e => update(proj.id, 'name', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Link</Label>
              <Input placeholder="https://github.com/..." value={proj.link} onChange={e => update(proj.id, 'link', e.target.value)} />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Description</Label>
            <Input placeholder="Brief project description" value={proj.description} onChange={e => update(proj.id, 'description', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Technologies (type and press comma)</Label>
            <Input placeholder="React, Node.js," onKeyUp={e => handleTechInput(proj.id, (e.target as HTMLInputElement).value)} onChange={e => handleTechInput(proj.id, e.target.value)} />
            <div className="flex flex-wrap gap-1 mt-1">
              {proj.technologies.map(t => (
                <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">
                  {t}
                  <button onClick={() => removeTech(proj.id, t)} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Key Points</Label>
            {proj.bullets.map((b, i) => (
              <div key={i} className="flex gap-2">
                <Input placeholder="Describe a key feature..." value={b} onChange={e => updateBullet(proj.id, i, e.target.value)} />
                {proj.bullets.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => removeBullet(proj.id, i)} className="shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="ghost" size="sm" onClick={() => addBullet(proj.id)}>
              <Plus className="h-3 w-3 mr-1" /> Add point
            </Button>
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">No projects yet.</p>
      )}
    </div>
  );
};

export default ProjectsForm;
