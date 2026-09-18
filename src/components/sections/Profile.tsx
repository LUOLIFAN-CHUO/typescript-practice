import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { profile } from '@/data/about';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Profile() {
  return (
    <section id="profile" className="section-shell">
      <SectionHeading eyebrow="About me" title="自己PRとキャリア目標" description="課題に向き合う姿勢と、これから伸ばしていきたい技術領域です。" />
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <article className="glass-card p-7 sm:p-9">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
            <Sparkles />
          </div>
          <h3 className="text-2xl font-black text-slate-950 dark:text-white">{profile.strengthTitle}</h3>
          <p className="mt-4 text-lg font-semibold leading-8 text-blue-700 dark:text-teal-200">{profile.strengthLead}</p>
          <div className="mt-6 space-y-4 leading-8 text-slate-600 dark:text-slate-300">
            {profile.strengthParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </article>

        <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 to-cyan-600 p-7 text-white shadow-2xl shadow-blue-600/20 sm:p-9">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[24px] border-white/10" />
          <Compass className="h-12 w-12 text-teal-200" />
          <p className="mt-10 text-xs font-bold uppercase tracking-[0.22em] text-blue-100">Career goal</p>
          <h3 className="mt-3 text-2xl font-black leading-tight">{profile.careerTitle}</h3>
          <p className="mt-5 leading-8 text-blue-50">{profile.careerText}</p>
          <a href="#contact" className="mt-8 inline-flex items-center gap-2 font-bold text-teal-200 hover:text-white">一緒に働く <ArrowUpRight className="h-4 w-4" /></a>
        </article>
      </div>
    </section>
  );
}
