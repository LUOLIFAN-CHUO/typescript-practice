import { useState } from 'react';
import { ArrowUpRight, Building2, Expand, MapPin } from 'lucide-react';
import { experience } from '@/data/experience';
import { journeyExperiences } from '@/data/journey';
import { assetUrl } from '@/lib/utils';
import { ImageDialog } from '@/components/ui/ImageDialog';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Experience() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const mikke = journeyExperiences.find((item) => item.id === 'mikke');

  return (
    <section id="experience" className="section-shell">
      <SectionHeading eyebrow="Experience" title="実務経験" description="これまでの経験と、これから取り組むインターンシップです。" />
      {experience.map((item) => (
        <article key={item.organization} className="glass-card grid overflow-hidden lg:grid-cols-[0.95fr_1.05fr]">
          <button type="button" className="group relative min-h-72 overflow-hidden text-left" onClick={() => setExpandedImage(item.image)} aria-label="AWS Japan インターンシップ写真を拡大する">
            <img src={assetUrl(item.image)} alt="AWS Japan インターンシップ参加者" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            <span className="absolute bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-slate-900 shadow-lg"><Expand className="h-5 w-5" /></span>
          </button>
          <div className="p-7 sm:p-10">
            <span className="tag">{item.category}</span>
            <h3 className="mt-6 text-3xl font-black text-slate-950 dark:text-white">{item.organization}</h3>
            <p className="mt-2 text-lg font-bold text-blue-600 dark:text-teal-300">{item.role}</p>
            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">{item.description}</p>
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-2"><Building2 className="h-4 w-4" /> AWS Japan</span>
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> 東京</span>
            </div>
          </div>
        </article>
      ))}
      {mikke && (
        <a href="#/journey/mikke" className="group mt-6 flex flex-col gap-3 border-l-2 border-teal-500 px-5 py-3 transition hover:bg-teal-500/5 sm:flex-row sm:items-center sm:gap-8" aria-label="ミッケ株式会社のインターン詳細を見る">
          <span className="shrink-0 text-xs font-bold tracking-wide text-blue-700 dark:text-teal-300">2026.10.08〜<br />開始予定</span>
          <span className="min-w-0 flex-1">
            <strong className="block text-lg text-slate-950 dark:text-white">{mikke.title} <span className="text-sm font-medium text-slate-600 dark:text-slate-300">· {mikke.label}</span></strong>
            <span className="mt-1 block text-sm leading-6 text-slate-600 dark:text-slate-300">{mikke.summary}</span>
          </span>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-blue-700 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-teal-300" aria-hidden="true" />
        </a>
      )}
      {expandedImage && <ImageDialog src={expandedImage} alt="AWS Japan インターンシップ参加者" onClose={() => setExpandedImage(null)} />}
    </section>
  );
}
