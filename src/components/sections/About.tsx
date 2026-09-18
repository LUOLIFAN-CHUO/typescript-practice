import { ArrowDown, Cloud, Mail, MapPin } from 'lucide-react';
import { about } from '@/data/about';
import { site } from '@/data/site';
import { assetUrl } from '@/lib/utils';
import { VisitorCounter } from '@/components/VisitorCounter';

export function About() {
  return (
    <section id="about" className="section-shell pt-16 lg:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
        <div>
          <div className="eyebrow"><Cloud className="h-4 w-4" /> Build · Learn · Improve</div>
          <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-slate-500 dark:text-slate-400">{about.romanizedName}</p>
          <h1 className="text-5xl font-black leading-[1.06] tracking-[-0.05em] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
            {about.name}
            <span className="mt-3 block bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-3xl text-transparent sm:text-4xl lg:text-5xl">{about.title}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">{about.description}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {about.focus.map((item) => <span key={item} className="tag">{item}</span>)}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-teal-300">
              プロジェクトを見る <ArrowDown className="h-4 w-4" />
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white/60 px-5 py-3 font-bold text-slate-700 transition hover:border-blue-400 hover:text-blue-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200">
              <Mail className="h-4 w-4" /> お問い合わせ
            </a>
          </div>

          <div className="mt-7 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <MapPin className="h-4 w-4" /> {about.location}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="cloud-float absolute -right-6 -top-8 z-10 grid h-24 w-24 place-items-center rounded-3xl border border-white/20 bg-gradient-to-br from-blue-600 to-teal-400 text-white shadow-2xl shadow-blue-500/25">
            <Cloud className="h-12 w-12" />
          </div>
          <div className="glass-card overflow-hidden p-3">
            <div className="relative overflow-hidden rounded-[1.25rem]">
              <img src={assetUrl(about.heroImage)} alt="東京の夜景" className="h-[29rem] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-teal-300">Live on AWS</p>
                <VisitorCounter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
