export type TrendSource = 'hacker-news' | 'zenn' | 'qiita';

export interface TrendSummary {
  ja: string;
  zh?: string;
  en?: string;
}

export type TrendLanguage = keyof TrendSummary;

export interface TrendItem {
  id: string;
  source: TrendSource;
  title: string;
  url: string;
  publishedAt: string;
  category: string;
  tags: string[];
  summary: TrendSummary;
}

export interface TrendFeed {
  generatedAt: string;
  items: TrendItem[];
}
