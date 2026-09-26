import { ArrowDown, ArrowUpRight, Cloud, Mail, MapPin, Newspaper } from 'lucide-react';
import { about } from '@/data/about';
import { site } from '@/data/site';
import { assetUrl } from '@/lib/utils';
import { VisitorCounter } from '@/components/VisitorCounter';

export function About() {
  return (
    <section id="about" className="section-shell pt-16 lg:pt-24">
      <div className="mx-auto grid max-w-4xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="min-w-0">
          <div className="eyebrow"><Cloud className="h-4 w-4" /> Build · Learn · Improve</div>
          <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-slate-500 dark:text-slate-400">{about.romanizedName}</p>
          <h1 className="text-5xl font-black leading-[1.06] tracking-[-0.05em] text-slate-950 dark:text-white sm:text-6xl">
            {about.name}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">{about.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {about.focus.map((item) => <span key={item} className="tag">{item}</span>)}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-teal-300">
              プロジェクトを見る <ArrowDown className="h-4 w-4" />
            </a>
            <a href="#/trends" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 px-5 py-3 font-bold text-white shadow-xl shadow-blue-500/20 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-teal-600">
              <Newspaper className="h-4 w-4" /> 最近のIT業界トレンドを見る <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 font-semibold text-slate-700 transition hover:text-blue-700 dark:text-slate-200 dark:hover:text-teal-200">
              <Mail className="h-4 w-4" /> お問い合わせ
            </a>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {about.location}</span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-64 lg:mr-0">
          <div className="glass-card overflow-hidden p-2">
            <div className="relative overflow-hidden rounded-[1.25rem]">
              <img src={assetUrl(about.heroImage)} alt="プロフィール写真" className="h-72 w-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-300">Live on AWS</p>
                <VisitorCounter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
