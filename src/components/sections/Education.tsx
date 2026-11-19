import { useState } from 'react';
import { Award, CalendarDays, FileText, GraduationCap, Trophy } from 'lucide-react';
import { paizaRankAward } from '@/data/awards';
import { certifications, education } from '@/data/education';
import { assetUrl } from '@/lib/utils';
import { ImageDialog } from '@/components/ui/ImageDialog';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Education() {
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <section id="education" className="section-shell">
      <SectionHeading eyebrow="Education, credentials & awards" title="学歴・資格・受賞" description="大学での専門分野、資格取得計画と、プログラミング学習の成果です。" />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        {education.map((item) => (
          <article key={item.school} className="glass-card p-5 sm:p-9">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-purple-300"><GraduationCap /></div>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-300">University</p>
            <h3 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{item.school}</h3>
            <p className="mt-3 font-semibold leading-7 text-slate-700 dark:text-slate-200">{item.degree}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><CalendarDays className="h-4 w-4" /> {item.duration}</p>
            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">{item.description}</p>
          </article>
        ))}

        <div className="glass-card p-5 sm:p-9">
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
      <article className="glass-card mt-6 grid gap-7 p-5 sm:grid-cols-[11rem_1fr] sm:items-center sm:p-9" aria-labelledby="paiza-award-title">
        <button type="button" onClick={() => setShowCertificate(true)} aria-label="paizaランク賞の表彰状を拡大する" className="group mx-auto w-full max-w-44 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
          <img src={assetUrl(paizaRankAward.image)} alt={paizaRankAward.imageAlt} width={1061} height={1500} loading="lazy" className="w-full rounded-xl shadow-md transition group-hover:scale-[1.02]" />
          <span className="mt-3 block text-sm font-semibold text-slate-600 dark:text-slate-300">表彰状を拡大</span>
        </button>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3 text-amber-700 dark:text-amber-300">
            <Trophy className="h-5 w-5" aria-hidden="true" />
            <p className="text-sm font-bold">受賞歴 · {paizaRankAward.year}</p>
          </div>
          <h3 id="paiza-award-title" className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{paizaRankAward.title}</h3>
          <p className="mt-2 text-xl font-bold text-teal-700 dark:text-teal-300">{paizaRankAward.prize} 受賞</p>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{paizaRankAward.organizer}</p>
          <p className="mt-4 leading-7 text-slate-700 dark:text-slate-200">{paizaRankAward.description}</p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">選考基準：{paizaRankAward.criteria}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a href={assetUrl(paizaRankAward.certificate)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800 dark:bg-teal-300 dark:text-slate-950 dark:hover:bg-teal-200"><FileText className="h-4 w-4" aria-hidden="true" />表彰状を見る（PDF）</a>
            <a href={paizaRankAward.officialUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-700 underline underline-offset-4 dark:text-blue-300">主催者の公式案内</a>
          </div>
        </div>
      </article>
      {showCertificate && <ImageDialog src={paizaRankAward.image} alt={paizaRankAward.imageAlt} onClose={() => setShowCertificate(false)} />}
    </section>
  );
}
