import { ArrowLeft, Newspaper } from 'lucide-react';
import { TrendCard } from '@/components/trends/TrendCard';
import { mockTrendFeed } from '@/data/trends';

export function TrendsPage() {
  const generatedAt = new Intl.DateTimeFormat('ja-JP', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(mockTrendFeed.generatedAt));

  return (
    <section className="section-shell pt-14 lg:pt-20">
      <a href="#about" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-300">
        <ArrowLeft className="h-4 w-4" /> 履歴書に戻る
      </a>

      <div className="mt-10 grid gap-8 border-b border-slate-200 pb-10 dark:border-white/10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="eyebrow"><Newspaper className="h-4 w-4" /> Curated technology news</div>
          <h1 className="text-4xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">
            最近のIT業界トレンド
          </h1>
          <p className="section-copy">
            Hacker News、Zenn、Qiita から注目した記事を集め、短い日本語の要約で紹介します。
          </p>
        </div>
        <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
          最終更新<br /><strong className="text-slate-700 dark:text-slate-200">{generatedAt}</strong>
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mockTrendFeed.items.map((item) => <TrendCard key={item.id} item={item} />)}
      </div>
    </section>
  );
}
