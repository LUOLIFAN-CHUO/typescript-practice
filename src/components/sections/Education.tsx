import { Award, CalendarDays, GraduationCap } from 'lucide-react';
import { certifications, education } from '@/data/education';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Education() {
  return (
    <section id="education" className="section-shell">
      <SectionHeading eyebrow="Education & credentials" title="学歴・資格" description="大学での専門分野と、クラウドエンジニアに向けた資格取得計画です。" />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        {education.map((item) => (
          <article key={item.school} className="glass-card p-7 sm:p-9">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-purple-300"><GraduationCap /></div>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-300">University</p>
            <h3 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{item.school}</h3>
            <p className="mt-3 font-semibold leading-7 text-slate-700 dark:text-slate-200">{item.degree}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><CalendarDays className="h-4 w-4" /> {item.duration}</p>
            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">{item.description}</p>
          </article>
        ))}

        <div className="glass-card p-7 sm:p-9">
          <div className="mb-7 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-300/10 dark:text-amber-300"><Award /></div>
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-300">Credentials</p><h3 className="text-xl font-black text-slate-950 dark:text-white">資格・認定</h3></div>
          </div>
          <ul className="space-y-3">
            {certifications.map((item) => (
              <li key={item.name} className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-100">{item.name}</span>
                <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-300/10 dark:text-amber-200">{item.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
