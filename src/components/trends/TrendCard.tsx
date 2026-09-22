import { ArrowUpRight, CalendarDays } from 'lucide-react';
import type { TrendItem } from '@/types/trends';

const sourceLabels: Record<TrendItem['source'], string> = {
  'hacker-news': 'Hacker News',
  zenn: 'Zenn',
  qiita: 'Qiita',
};

interface TrendCardProps {
  item: TrendItem;
}

export function TrendCard({ item }: TrendCardProps) {
  const publishedAt = new Intl.DateTimeFormat('ja-JP', {
    dateStyle: 'medium',
  }).format(new Date(item.publishedAt));

  return (
    <article className="glass-card group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300 dark:hover:border-teal-300/40 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
        <span className="rounded-full bg-slate-950 px-3 py-1.5 text-white dark:bg-teal-300 dark:text-slate-950">
          {sourceLabels[item.source]}
        </span>
        <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <CalendarDays className="h-3.5 w-3.5" /> {publishedAt}
        </span>
      </div>

      <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-teal-300">
        {item.category}
      </p>
      <h2 className="mt-3 text-xl font-black leading-8 text-slate-950 dark:text-white">
        {item.title}
      </h2>
      <p className="mt-4 flex-1 leading-7 text-slate-600 dark:text-slate-300">
        {item.summary.ja}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
      </div>

      <a href={item.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 font-bold text-blue-700 transition group-hover:gap-3 dark:text-teal-300">
        原文を読む <ArrowUpRight className="h-4 w-4" />
      </a>
    </article>
  );
}
