import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, BookOpen, Expand, ExternalLink, Github } from 'lucide-react';
import { projects, projectHref, type Project } from '@/data/projects';
import { ProjectVisual } from '@/components/projects/ProjectVisual';
import { ImageDialog } from '@/components/ui/ImageDialog';
import { assetUrl } from '@/lib/utils';

export function ProjectDetailPage({ project }: { project: Project }) {
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string } | null>(null);
  const other = projects.find((item) => item.id !== project.id);
  return (
    <article className="section-shell !pt-8 sm:!pt-14" aria-labelledby="project-detail-title">
      <a href="#/projects" className="project-back"><ArrowLeft size={16} aria-hidden="true" />プロジェクト一覧に戻る</a>
      <header className="mb-9 mt-9 max-w-3xl"><p className="eyebrow">{project.eyebrow}</p><h1 id="project-detail-title" className="text-3xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">{project.title}</h1><p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">{project.description}</p><p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{project.role}</p><div className="mt-5 flex flex-wrap gap-2">{project.stack.map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
        {(project.liveLink || project.repositoryLink || project.articleLink) && <div className="mt-7 flex flex-wrap gap-5">{project.liveLink && <a className="project-back" href={project.liveLink} target="_blank" rel="noreferrer"><ExternalLink size={16} aria-hidden="true" />Live site</a>}{project.repositoryLink && <a className="project-back" href={project.repositoryLink} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" />GitHub</a>}{project.articleLink && <a className="project-back" href={project.articleLink} target="_blank" rel="noreferrer"><BookOpen size={16} aria-hidden="true" />Qiita</a>}</div>}
      </header>
      <figure>
        <div className="project-detail-visual overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10">
          {project.coverImage ? (
            <button type="button" className="block w-full text-left" aria-label={`${project.coverImage.alt}を拡大する`} onClick={() => setExpandedImage(project.coverImage!)}><ProjectVisual project={project} /></button>
          ) : <ProjectVisual project={project} />}
        </div>
        {project.coverImage?.caption && <figcaption className="mt-4 max-w-4xl text-sm leading-7 text-slate-500 dark:text-slate-400">{project.coverImage.caption}</figcaption>}
      </figure>
      <div className="mt-12 grid gap-10 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-14">
        <aside className="hidden lg:block"><div className="sticky top-28 space-y-4 text-xs text-slate-500 dark:text-slate-400"><p>01 / 概要</p><p>02 / 主な機能</p><p>03 / 設計の工夫</p></div></aside>
        <div className="min-w-0 space-y-12">
          <section><p className="eyebrow">01 / Overview</p><h2 className="project-detail-heading">どんな課題に取り組んだか。</h2><p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{project.overview}</p></section>
          {project.interactionFlow && (
            <section aria-labelledby="interaction-flow-title">
              <p className="eyebrow">AI chat & urgency assessment</p>
              <h2 id="interaction-flow-title" className="project-detail-heading">質問に応じて、AI の動きを変える。</h2>
              <div className="mt-6 space-y-5">
                {project.interactionFlow.map((flow) => (
                  <article key={flow.title} className="glass-card p-6">
                    <h3 className="font-bold text-slate-950 dark:text-white">{flow.title}</h3>
                    <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3" aria-label={flow.title}>
                      {flow.steps.map((step, index) => <li key={step} className="flex items-center gap-2 text-xs"><span className="rounded-lg bg-teal-50 px-3 py-2 font-semibold text-teal-900 dark:bg-teal-300/10 dark:text-teal-100">{step}</span>{index < flow.steps.length - 1 && <span aria-hidden="true" className="text-slate-400">→</span>}</li>)}
                    </ol>
                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{flow.description}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
          {project.gallery && project.gallery.length > 0 && (
            <section aria-label="プロジェクトの画像">
              <h2 className="project-detail-heading">画面・構成図で見るプロジェクト</h2>
              <div className="mt-6 space-y-9">
                {project.gallery.map((image) => (
                  <figure key={image.src}>
                    <button type="button" onClick={() => setExpandedImage(image)} aria-label={`${image.alt}を拡大する`} className={`glass-card group relative block w-full overflow-hidden p-2 ${image.portrait ? 'mx-auto max-w-sm' : ''}`}>
                      <img src={assetUrl(image.src)} alt={image.alt} className={`${image.portrait ? 'max-h-[42rem]' : 'max-h-96'} w-full rounded-2xl object-contain`} loading="lazy" />
                      <span className="absolute bottom-4 right-4 rounded-full bg-slate-950/80 p-2 text-white"><Expand size={18} aria-hidden="true" /></span>
                    </button>
                    <figcaption className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">{image.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}
          <section><p className="eyebrow">02 / Features</p><h2 className="project-detail-heading">機能から見る、取り組み。</h2><div className="mt-6 space-y-4">{project.features.map((feature) => <div className="glass-card p-6 sm:p-7" key={feature.title}><h3 className="text-lg font-bold text-slate-950 dark:text-white">{feature.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p></div>)}</div></section>
          <section><p className="eyebrow">03 / Decisions</p><h2 className="project-detail-heading">なぜ、この構成にしたのか。</h2><div className="mt-6 divide-y divide-slate-200 dark:divide-white/10">{project.decisions.map((decision) => <div className="py-5 first:pt-0" key={decision.title}><h3 className="font-bold text-slate-950 dark:text-white">{decision.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{decision.description}</p></div>)}</div></section>
          {project.publicationNote && <p className="border-l-2 border-teal-600 bg-teal-50/80 p-5 text-sm leading-7 text-slate-600 dark:border-teal-300 dark:bg-teal-300/5 dark:text-slate-300">{project.publicationNote}</p>}
          {project.journeyId && <a className="project-back" href={`#/journey/${project.journeyId}`}>関連する経歴を見る<ArrowUpRight size={16} aria-hidden="true" /></a>}
        </div>
      </div>
      <footer className="mt-14 flex flex-wrap justify-between gap-4 border-t border-slate-200 pt-7 dark:border-white/10"><a href="#/projects" className="project-back"><ArrowLeft size={16} aria-hidden="true" />一覧に戻る</a>{other && <a href={projectHref(other.id)} className="project-back">{other.title}<ArrowUpRight size={16} aria-hidden="true" /></a>}</footer>
      {expandedImage && <ImageDialog src={expandedImage.src} alt={expandedImage.alt} onClose={() => setExpandedImage(null)} />}
    </article>
  );
}
