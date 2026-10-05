import { ArrowDown, ArrowUpRight, Cloud, Mail, Newspaper } from 'lucide-react';
import { about } from '@/data/about';
import { site } from '@/data/site';
import { assetUrl } from '@/lib/utils';
import { VisitorCounter } from '@/components/VisitorCounter';
import { JourneyTimeline } from '@/components/sections/JourneyTimeline';

export function About() {
  return (
    <section id="about" className="section-shell pt-5 sm:pt-8 lg:pt-8">
      <div className="about-header border-b border-slate-200/80 pb-5 dark:border-white/10 sm:pb-6">
        <div className="about-identity min-w-0">
          <div className="eyebrow"><Cloud className="h-4 w-4" /> Build · Learn · Improve</div>
          <p className="mb-2 text-sm font-semibold tracking-[0.18em] text-slate-500 dark:text-slate-400">{about.romanizedName}</p>
          <h1 className="text-3xl font-black leading-[1.08] tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl">{about.name}</h1>
        </div>

        <div className="about-summary min-w-0">
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">クラウドとAIの学びを、実際の開発につなげていきます。</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold sm:gap-x-6 sm:gap-y-3">
            <a href="#journey" className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-blue-600 px-4 text-white dark:bg-teal-300 dark:text-slate-950 sm:hidden">経歴を見る <ArrowDown className="h-4 w-4" /></a>
            <a href="#projects" className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-slate-200 px-4 text-blue-700 transition hover:text-blue-900 dark:border-white/15 dark:text-teal-300 dark:hover:text-teal-100 sm:min-h-0 sm:rounded-none sm:border-0 sm:px-0">プロジェクト <ArrowDown className="h-4 w-4" /></a>
            <a href="#/trends" className="hidden items-center gap-1.5 text-slate-600 transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-300 sm:inline-flex"><Newspaper className="h-4 w-4" /> ITトレンド <ArrowUpRight className="h-4 w-4" /></a>
            <a href={`mailto:${site.email}`} className="hidden items-center gap-1.5 text-slate-600 transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-300 sm:inline-flex"><Mail className="h-4 w-4" /> お問い合わせ</a>
          </div>
        </div>

        <div className="about-portrait shrink-0">
          <img src={assetUrl(about.heroImage)} alt="ラ・リキハンのプロフィール写真" className="h-16 w-16 rounded-2xl object-cover object-center shadow-lg sm:h-28 sm:w-28" />
          <div className="mt-2 hidden sm:block"><VisitorCounter /></div>
        </div>
      </div>

      <JourneyTimeline />
    </section>
  );
}
