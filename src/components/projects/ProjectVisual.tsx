import { ArrowDown, BookOpen, Building2, Cloud, Database, FileText, MessageSquare, ShieldCheck } from 'lucide-react';
import type { Project } from '@/data/projects';
import { assetUrl } from '@/lib/utils';

export function ProjectVisual({ project }: { project: Project }) {
  const resident = project.visual === 'resident';
  if (project.coverImage) {
    return (
      <div className="project-screenshot relative bg-slate-100 px-3 pb-3 pt-10 dark:bg-slate-800">
        <span className="absolute left-4 top-3 text-[10px] font-semibold tracking-widest text-slate-500 dark:text-slate-300">SCREENSHOT / 実際の画面</span>
        <img src={assetUrl(project.coverImage.src)} alt={project.coverImage.alt} className="h-60 w-full rounded-lg object-contain" loading="lazy" />
      </div>
    );
  }
  if (!project.visual) {
    return <div className="project-visual project-visual-cloud"><div className="flex flex-col items-center gap-4"><FileText size={40} aria-hidden="true" /><span className="text-lg font-bold">{project.title}</span></div></div>;
  }
  return (
    <div className={`project-visual ${resident ? 'project-visual-resident' : 'project-visual-cloud'}`} role="img" aria-label={`${project.title}の機能概念図（実画面ではありません）`}>
      <span className="project-visual-caption">CONCEPT / 機能イメージ</span>
      {resident ? (
        <div className="portal-concept" aria-hidden="true">
          <div className="portal-concept-bar"><Building2 size={14} /><span>入居者サポート</span><span className="ml-auto text-[10px] font-normal">Manual · AI · Support</span></div>
          <div className="portal-concept-body">
            <div><p className="text-xs text-slate-500">知りたいことを、すぐに。</p><p className="mt-2 text-lg font-bold leading-snug">マニュアルを<br />質問できる入口に。</p><div className="mt-4 space-y-2"><div className="portal-concept-row"><BookOpen size={13} />利用ガイド</div><div className="portal-concept-row"><ShieldCheck size={13} />連絡先・サポート</div></div></div>
            <div className="portal-concept-answer"><MessageSquare size={18} /><p className="mt-3 text-xs font-bold">AI の回答</p><div className="my-3 space-y-1.5"><span /><span /><span className="!w-2/3" /></div><div className="flex items-center gap-2 border-t border-teal-100 pt-3 text-[10px]"><FileText size={13} />根拠のページを確認</div></div>
          </div>
        </div>
      ) : (
        <div className="cloud-concept" aria-hidden="true"><div className="cloud-concept-node"><Cloud size={20} />Portfolio UI<span>S3 / CloudFront</span></div><ArrowDown className="mx-auto my-3 h-5 w-5 opacity-50" /><div className="grid grid-cols-2 gap-3"><div className="cloud-concept-node"><MessageSquare size={19} />AI Assistant<span>Lambda / Bedrock</span></div><div className="cloud-concept-node"><Database size={19} />Visitor Counter<span>Lambda / DynamoDB</span></div></div></div>
      )}
    </div>
  );
}
