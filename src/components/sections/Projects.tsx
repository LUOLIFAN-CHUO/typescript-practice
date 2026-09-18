import { useState } from 'react';
import { BookOpen, ExternalLink, Expand, GitBranch, Workflow } from 'lucide-react';
import { projects } from '@/data/projects';
import { assetUrl } from '@/lib/utils';
import { ImageDialog } from '@/components/ui/ImageDialog';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Projects() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <section id="projects" className="section-shell">
      <SectionHeading eyebrow="Featured project" title="プロジェクト" description="設計、実装、テスト、デプロイまでを一つの流れとして構築しました。" />
      {projects.map((project) => (
        <article key={project.title} className="glass-card overflow-hidden">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <button type="button" onClick={() => setExpandedImage(project.image)} className="group relative min-h-80 overflow-hidden bg-slate-950 p-5 text-left" aria-label={`${project.title}の構成図を拡大する`}>
              <img src={assetUrl(project.image)} alt={`${project.title} AWSアーキテクチャ`} className="h-full w-full rounded-2xl object-contain transition duration-500 group-hover:scale-[1.02]" />
              <span className="absolute bottom-8 right-8 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-slate-900 shadow-lg"><Expand className="h-5 w-5" /></span>
            </button>

            <div className="p-7 sm:p-10">
              <div className="eyebrow"><Workflow className="h-4 w-4" /> {project.eyebrow}</div>
              <h3 className="text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">{project.title}</h3>
              <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">{project.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.stack.map((tech) => <span key={tech} className="tag">{tech}</span>)}
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                {project.liveLink && <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"><ExternalLink className="h-4 w-4" /> Live site</a>}
                {project.articleLink && <a href={project.articleLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 font-bold text-slate-700 transition hover:border-blue-400 hover:text-blue-700 dark:border-white/15 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200"><BookOpen className="h-4 w-4" /> Qiita</a>}
              </div>
              <div className="mt-8 flex items-center gap-2 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400"><GitBranch className="h-4 w-4" /> GitHub Actionsで継続的にデプロイ</div>
            </div>
          </div>
        </article>
      ))}
      {expandedImage && <ImageDialog src={expandedImage} alt="Cloud Resume Challenge AWSアーキテクチャ" onClose={() => setExpandedImage(null)} />}
    </section>
  );
}
