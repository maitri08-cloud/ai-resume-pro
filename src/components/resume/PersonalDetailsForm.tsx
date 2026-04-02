import { PersonalDetails } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, Linkedin, Github, Globe } from 'lucide-react';

interface Props {
  data: PersonalDetails;
  onChange: (data: PersonalDetails) => void;
}

const PersonalDetailsForm = ({ data, onChange }: Props) => {
  const update = (field: keyof PersonalDetails, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        Personal Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="John Doe" value={data.fullName} onChange={e => update('fullName', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="email" className="pl-10" placeholder="john@example.com" value={data.email} onChange={e => update('email', e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="phone" className="pl-10" placeholder="+1 234 567 8900" value={data.phone} onChange={e => update('phone', e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <div className="relative">
            <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="linkedin" className="pl-10" placeholder="linkedin.com/in/johndoe" value={data.linkedin} onChange={e => update('linkedin', e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <div className="relative">
            <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="github" className="pl-10" placeholder="github.com/johndoe" value={data.github} onChange={e => update('github', e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="website" className="pl-10" placeholder="johndoe.dev" value={data.website} onChange={e => update('website', e.target.value)} />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea id="summary" placeholder="A brief summary of your professional background..." rows={3} value={data.summary} onChange={e => update('summary', e.target.value)} />
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
