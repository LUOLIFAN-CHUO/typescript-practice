import { ArrowDown, ArrowUpRight, Cloud, Mail, Newspaper } from 'lucide-react';
import { about } from '@/data/about';
import { site } from '@/data/site';
import { assetUrl } from '@/lib/utils';
import { VisitorCounter } from '@/components/VisitorCounter';
import { JourneyTimeline } from '@/components/sections/JourneyTimeline';

export function About() {
  return (
    <section id="about" className="section-shell pt-8 lg:pt-8">
      <div className="flex flex-col gap-6 border-b border-slate-200/80 pb-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="eyebrow"><Cloud className="h-4 w-4" /> Build · Learn · Improve</div>
          <p className="mb-2 text-sm font-semibold tracking-[0.18em] text-slate-500 dark:text-slate-400">{about.romanizedName}</p>
          <h1 className="text-4xl font-black leading-[1.08] tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl">{about.name}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">クラウドとAIの学びを、実際の開発につなげていきます。</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
            <a href="#projects" className="inline-flex items-center gap-1.5 text-blue-700 transition hover:text-blue-900 dark:text-teal-300 dark:hover:text-teal-100">プロジェクト <ArrowDown className="h-4 w-4" /></a>
            <a href="#/trends" className="inline-flex items-center gap-1.5 text-slate-600 transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-300"><Newspaper className="h-4 w-4" /> ITトレンド <ArrowUpRight className="h-4 w-4" /></a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 text-slate-600 transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-300"><Mail className="h-4 w-4" /> お問い合わせ</a>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4 sm:block">
          <img src={assetUrl(about.heroImage)} alt="ラ・リキハンのプロフィール写真" className="h-24 w-24 rounded-2xl object-cover object-center shadow-lg sm:h-28 sm:w-28" />
          <div className="sm:mt-2"><VisitorCounter /></div>
        </div>
      </div>

      <JourneyTimeline />
    </section>
  );
}
