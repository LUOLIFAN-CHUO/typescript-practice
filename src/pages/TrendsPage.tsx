import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Loader2, Newspaper, RotateCcw } from 'lucide-react';
import { TrendCard } from '@/components/trends/TrendCard';
import { loadTrendFeed } from '@/services/trendsApi';
import type { TrendFeed, TrendLanguage, TrendSource } from '@/types/trends';

type FeedLoader = () => Promise<TrendFeed>;

interface TrendsPageProps {
  loadFeed?: FeedLoader;
}

const copy = {
  ja: {
    back: '履歴書に戻る', eyebrow: '注目のテクノロジーニュース', title: '最近のIT業界トレンド',
    description: 'Hacker News、Zenn、Qiita から注目した記事を集め、短い要約で紹介します。',
    updated: '最終更新', source: '情報源', category: 'カテゴリー', all: 'すべて',
    loading: 'トレンドを読み込んでいます…', empty: '条件に一致するトレンドはありません。',
    error: 'トレンドを読み込めませんでした。時間をおいて再度お試しください。', retry: '再読み込み', readOriginal: '原文を読む',
  },
  zh: {
    back: '返回简历', eyebrow: '精选技术资讯', title: '近期 IT 行业趋势',
    description: '汇总 Hacker News、Zenn 和 Qiita 的关注文章，并提供简短摘要。',
    updated: '最后更新', source: '来源', category: '分类', all: '全部', loading: '正在加载趋势资讯…',
    empty: '没有符合当前条件的趋势资讯。', error: '无法加载趋势资讯，请稍后重试。', retry: '重新加载', readOriginal: '阅读原文',
  },
  en: {
    back: 'Back to resume', eyebrow: 'Curated technology news', title: 'Recent IT Industry Trends',
    description: 'Selected stories from Hacker News, Zenn, and Qiita with concise summaries.',
    updated: 'Last updated', source: 'Source', category: 'Category', all: 'All', loading: 'Loading trends…',
    empty: 'No trends match the selected filters.', error: 'Could not load trends. Please try again later.', retry: 'Reload', readOriginal: 'Read original',
  },
} as const;

const sourceLabels: Record<TrendSource, string> = {
  'hacker-news': 'Hacker News',
  zenn: 'Zenn',
  qiita: 'Qiita',
};

export function TrendsPage({ loadFeed = loadTrendFeed }: TrendsPageProps) {
  const [feed, setFeed] = useState<TrendFeed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [language, setLanguage] = useState<TrendLanguage>('ja');
  const [source, setSource] = useState<TrendSource | 'all'>('all');
  const [category, setCategory] = useState('all');
  const text = copy[language];

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      setFeed(await loadFeed());
    } catch {
      setFeed(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [loadFeed]);

  useEffect(() => {
    void fetchFeed();
  }, [fetchFeed]);

  const categories = useMemo(
    () => [...new Set(feed?.items.map((item) => item.category) ?? [])].sort(),
    [feed],
  );

  const visibleItems = useMemo(
    () => feed?.items.filter((item) => (
      (source === 'all' || item.source === source)
      && (category === 'all' || item.category === category)
    )) ?? [],
    [category, feed, source],
  );

  const generatedAt = feed
    ? new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : language === 'en' ? 'en' : 'ja-JP', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date(feed.generatedAt))
    : null;

  return (
    <section className="section-shell pt-14 lg:pt-20">
      <a href="#about" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-300">
        <ArrowLeft className="h-4 w-4" /> {text.back}
      </a>

      <div className="mt-10 grid gap-8 border-b border-slate-200 pb-10 dark:border-white/10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="eyebrow"><Newspaper className="h-4 w-4" /> {text.eyebrow}</div>
          <h1 className="text-4xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">{text.title}</h1>
          <p className="section-copy">{text.description}</p>
        </div>
        <div className="space-y-4 lg:text-right">
          <div className="inline-flex rounded-2xl border border-slate-200 bg-white/70 p-1 dark:border-white/10 dark:bg-white/5" aria-label="Language">
            {(['ja', 'zh', 'en'] as const).map((option) => (
              <button key={option} type="button" onClick={() => setLanguage(option)} aria-pressed={language === option} className={`rounded-xl px-3 py-2 text-xs font-bold transition ${language === option ? 'bg-slate-950 text-white dark:bg-teal-300 dark:text-slate-950' : 'text-slate-500 hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-300'}`}>
                {option === 'ja' ? '日本語' : option === 'zh' ? '中文' : 'English'}
              </button>
            ))}
          </div>
          {generatedAt && <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">{text.updated}<br /><strong className="text-slate-700 dark:text-slate-200">{generatedAt}</strong></p>}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 rounded-2xl border border-slate-200/80 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.04]">
        <label className="grid gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
          {text.source}
          <select value={source} onChange={(event) => setSource(event.target.value as TrendSource | 'all')} className="min-w-40 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-white/10 dark:bg-[#0c1a2b] dark:text-slate-100">
            <option value="all">{text.all}</option>
            {(Object.entries(sourceLabels) as [TrendSource, string][]).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label className="grid gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
          {text.category}
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="min-w-40 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-white/10 dark:bg-[#0c1a2b] dark:text-slate-100">
            <option value="all">{text.all}</option>
            {categories.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </div>

      {loading && <div className="mt-10 flex items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-300 py-20 text-slate-500 dark:border-white/15 dark:text-slate-400"><Loader2 className="h-5 w-5 animate-spin" />{text.loading}</div>}
      {!loading && error && <div className="mt-10 rounded-3xl border border-rose-200 bg-rose-50/70 px-6 py-16 text-center text-rose-700 dark:border-rose-300/20 dark:bg-rose-300/5 dark:text-rose-200"><p>{text.error}</p><button type="button" onClick={() => void fetchFeed()} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-rose-700 px-4 py-2 font-bold text-white"><RotateCcw className="h-4 w-4" />{text.retry}</button></div>}
      {!loading && !error && visibleItems.length === 0 && <div className="mt-10 rounded-3xl border border-dashed border-slate-300 py-20 text-center text-slate-500 dark:border-white/15 dark:text-slate-400">{text.empty}</div>}
      {!loading && !error && visibleItems.length > 0 && <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{visibleItems.map((item) => <TrendCard key={item.id} item={item} language={language} readOriginalLabel={text.readOriginal} />)}</div>}
    </section>
  );
}
