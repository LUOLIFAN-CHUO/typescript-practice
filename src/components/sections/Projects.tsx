import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Projects() {
  return (
    <section id="projects" className="section-shell !pt-8 sm:!pt-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="project-section-heading"><SectionHeading eyebrow="Selected work" title="プロジェクト" description="つくったものと、その背景にある課題や設計の工夫。" /></div>
        <a href="#/projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-700 dark:text-teal-300">すべてのプロジェクト<ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
      <div className="grid gap-6 md:grid-cols-2">{projects.filter((project) => project.featured).slice(0, 4).map((project) => <ProjectCard project={project} key={project.id} />)}</div>
    </section>
  );
}
