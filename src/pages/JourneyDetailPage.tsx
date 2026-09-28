import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { JourneyExperience } from '@/data/journey';
import { assetUrl } from '@/lib/utils';

interface JourneyDetailPageProps {
  item: JourneyExperience;
}

export function JourneyDetailPage({ item }: JourneyDetailPageProps) {
  return (
    <section className="section-shell min-h-[70vh] pt-16 lg:pt-24" aria-labelledby="journey-detail-title">
      <a href="#about" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900 dark:text-teal-300 dark:hover:text-teal-100">
        <ArrowLeft className="h-4 w-4" /> タイムラインへ戻る
      </a>
      <div className="mt-12 max-w-3xl">
        <p className="eyebrow">{item.date} · {item.label}</p>
        <h1 id="journey-detail-title" className="mt-2 text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">{item.title}</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">{item.detail}</p>
        <div className="mt-10 border-t border-slate-200 pt-7 dark:border-white/15">
          <h2 className="text-sm font-bold tracking-widest text-blue-700 dark:text-teal-300">{item.upcoming ? '取り組む内容' : '取り組んだこと'}</h2>
          <ul className="mt-5 space-y-3">
            {item.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-slate-700 dark:text-slate-200"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />{point}</li>
            ))}
          </ul>
        </div>
        {item.deliverables && item.deliverables.length > 0 && (
          <div className="mt-10 border-t border-slate-200 pt-7 dark:border-white/15">
            <h2 className="text-sm font-bold tracking-widest text-blue-700 dark:text-teal-300">成果物</h2>
            <div className="mt-6 space-y-9">
              {item.deliverables.map((deliverable) => (
                <article key={deliverable.title}>
                  <h3 className="text-2xl font-bold text-slate-950 dark:text-white">{deliverable.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{deliverable.description}</p>
                  {deliverable.contribution && <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300"><strong className="text-slate-900 dark:text-white">担当：</strong>{deliverable.contribution}</p>}
                  {deliverable.technologies && <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{deliverable.technologies.join(' · ')}</p>}
                  {deliverable.image && <img src={assetUrl(deliverable.image)} alt={deliverable.imageAlt ?? deliverable.title} className="mt-5 max-h-80 w-full rounded-2xl object-cover" />}
                  {deliverable.links && (
                    <div className="mt-4 flex flex-wrap gap-5">
                      {deliverable.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:text-blue-900 dark:text-teal-300 dark:hover:text-teal-100">{link.label}<ArrowUpRight className="h-4 w-4" /></a>)}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
        {item.id === 'aws' && (
          <a href="#experience" className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 dark:text-teal-300 dark:hover:text-teal-100">
            写真と経験の紹介を見る <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </section>
  );
}
