import type { TrendFeed, TrendItem, TrendSource, TrendSummary } from '@/types/trends';

const DEFAULT_TRENDS_DATA_URL = 'https://portfolio-it-trends-prod-901099688492.s3.ap-northeast-1.amazonaws.com/news.json';
const TRENDS_DATA_URL = import.meta.env.VITE_TRENDS_DATA_URL?.trim() || DEFAULT_TRENDS_DATA_URL;
const SOURCES = new Set<TrendSource>(['hacker-news', 'zenn', 'qiita']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

function isValidDate(value: unknown): value is string {
  return isString(value) && !Number.isNaN(Date.parse(value));
}

function isValidUrl(value: unknown): value is string {
  if (!isString(value)) return false;
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function parseSummary(value: unknown): TrendSummary | null {
  if (!isRecord(value) || !isString(value.ja)) return null;
  if (value.zh !== undefined && !isString(value.zh)) return null;
  if (value.en !== undefined && !isString(value.en)) return null;
  return { ja: value.ja, zh: value.zh, en: value.en };
}

function parseItem(value: unknown): TrendItem | null {
  if (!isRecord(value) || !isString(value.id) || !isString(value.source) || !SOURCES.has(value.source as TrendSource)) return null;
  const summary = parseSummary(value.summary);
  if (!summary || !isString(value.title) || !isValidUrl(value.url) || !isValidDate(value.publishedAt)) return null;
  if (!isString(value.category) || !Array.isArray(value.tags) || !value.tags.every(isString)) return null;
  return {
    id: value.id,
    source: value.source as TrendSource,
    title: value.title,
    url: value.url,
    publishedAt: value.publishedAt,
    category: value.category,
    tags: value.tags,
    summary,
  };
}

export function parseTrendFeed(value: unknown): TrendFeed {
  if (!isRecord(value) || !isValidDate(value.generatedAt) || !Array.isArray(value.items)) {
    throw new Error('Invalid trends feed');
  }
  const items = value.items.map(parseItem);
  if (items.some((item) => item === null)) throw new Error('Invalid trends feed item');
  return { generatedAt: value.generatedAt, items: items as TrendItem[] };
}

export async function loadTrendFeed(endpoint = TRENDS_DATA_URL): Promise<TrendFeed> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch(endpoint, {
      headers: { Accept: 'application/json' },
      cache: 'no-cache',
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Trends request failed with ${response.status}`);
    return parseTrendFeed(await response.json());
  } finally {
    window.clearTimeout(timeout);
  }
}
