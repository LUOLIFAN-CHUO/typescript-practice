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
          <h2 className="text-sm font-bold tracking-widest text-blue-700 dark:text-teal-300">{item.pointsHeading ?? (item.upcoming ? '取り組む内容' : '取り組んだこと')}</h2>
          <ul className="mt-5 space-y-3">
            {item.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-slate-700 dark:text-slate-200"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />{point}</li>
            ))}
          </ul>
        </div>
        {item.program && (
          <div className="mt-10 border-t border-slate-200 pt-7 dark:border-white/15">
            <h2 className="text-sm font-bold tracking-widest text-blue-700 dark:text-teal-300">カリキュラム（予定）</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">以下はプログラムで扱う内容です。実際に制作したものや担当した範囲は、進行に合わせて追記します。</p>
            <ol className="mt-6 divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/15 dark:border-white/15">
              {item.program.sprints.map((sprint, index) => (
                <li key={sprint.title} className="grid gap-2 py-5 sm:grid-cols-[2.5rem_1fr] sm:gap-4">
                  <span className="text-lg font-black text-teal-600 dark:text-teal-300" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">{sprint.title}</h3>
                    <p className="mt-1 text-xs font-semibold tracking-wide text-blue-700 dark:text-teal-300">{sprint.context}</p>
                    <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{sprint.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <h3 className="mt-9 text-lg font-bold text-slate-950 dark:text-white">各Sprintの進め方</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">動くものを作るだけで終わらず、設計・検証・説明まで一巡します。</p>
            <ol className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {item.program.phases.map((phase, index) => (
                <li key={phase.name} className="flex items-start gap-3 text-sm leading-6">
                  <span className="shrink-0 font-bold text-teal-600 dark:text-teal-300">{index + 1}.</span>
                  <span><strong className="text-slate-950 dark:text-white">{phase.name}</strong><span className="block text-slate-600 dark:text-slate-300">{phase.description}</span></span>
                </li>
              ))}
            </ol>
          </div>
        )}
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
