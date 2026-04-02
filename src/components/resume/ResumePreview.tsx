import { ResumeData } from '@/types/resume';
import TemplateClassic from './TemplateClassic';
import TemplateModern from './TemplateModern';

interface Props {
  resume: ResumeData;
}

const ResumePreview = ({ resume }: Props) => {
  const Template = resume.templateId === 'modern' ? TemplateModern : TemplateClassic;

  return (
    <div className="overflow-auto max-h-[calc(100vh-180px)] border border-border rounded-xl bg-muted/30 p-4">
      <div className="transform scale-[0.55] origin-top-left w-[816px]" style={{ marginBottom: '-45%' }}>
        <div id="resume-preview">
          <Template resume={resume} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
