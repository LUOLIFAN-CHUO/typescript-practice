import { ArrowUpRight } from 'lucide-react';
import { projectHref, type Project } from '@/data/projects';
import { ProjectVisual } from './ProjectVisual';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card glass-card flex h-full flex-col overflow-hidden">
      <a href={projectHref(project.id)} aria-label={`${project.title}の詳細を見る`} className="block"><ProjectVisual project={project} /></a>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="eyebrow !text-[10px]">{project.eyebrow}</p>
        <h3 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white"><a href={projectHref(project.id)}>{project.title}</a></h3>
        <p className="mt-4 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">{project.stack.slice(0, 4).map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-white/10"><span className="text-xs text-slate-500 dark:text-slate-400">{project.role}</span><a href={projectHref(project.id)} className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-bold text-blue-700 hover:text-blue-900 dark:text-teal-300 dark:hover:text-teal-100">詳しく見る<ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </div>
    </article>
  );
}
