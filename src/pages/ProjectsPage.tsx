import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { projects, projectCategories } from '@/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';

export function ProjectsPage() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]['id']>('all');
  const visible = projects.filter((project) => category === 'all' || project.category === category);
  return (
    <section className="section-shell min-h-[70vh] !pt-8 sm:!pt-14" aria-labelledby="projects-page-title">
      <a href="#projects" className="project-back"><ArrowLeft size={16} aria-hidden="true" />履歴書に戻る</a>
      <div className="mt-9"><p className="eyebrow">Project archive</p><h1 id="projects-page-title" className="text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">プロジェクト</h1><p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">クラウド、AI、Web。実際につくったものと、そこで考えたこと。</p></div>
      <div className="mb-8 mt-8 flex flex-wrap gap-2" role="group" aria-label="プロジェクトの分野">
        {projectCategories.map((item) => {
          const count = projects.filter((project) => item.id === 'all' || project.category === item.id).length;
          return <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => setCategory(item.id)} className={`min-h-11 rounded-full border px-5 py-2 text-sm font-semibold transition ${category === item.id ? 'border-slate-950 bg-slate-950 text-white dark:border-teal-300 dark:bg-teal-300 dark:text-slate-950' : 'border-slate-300 bg-white/60 text-slate-600 hover:border-blue-400 dark:border-white/15 dark:bg-white/5 dark:text-slate-300'}`}>{item.label}<span className="ml-2 opacity-60">{count}</span></button>;
        })}
      </div>
      <p className="sr-only" role="status">{visible.length} 件のプロジェクト</p>
      <div className="grid gap-6 md:grid-cols-2">{visible.map((project) => <ProjectCard project={project} key={project.id} />)}</div>
      {visible.length === 0 && <p className="glass-card p-8 text-slate-600 dark:text-slate-300">この分野のプロジェクトはまだありません。</p>}
    </section>
  );
}
