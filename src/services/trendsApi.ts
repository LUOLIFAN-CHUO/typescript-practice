import { mockTrendFeed } from '@/data/trends';
import type { TrendFeed } from '@/types/trends';

export async function loadTrendFeed(): Promise<TrendFeed> {
  await new Promise((resolve) => window.setTimeout(resolve, 250));
  return mockTrendFeed;
}
