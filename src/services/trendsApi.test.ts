import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockTrendFeed } from '@/data/trends';
import { loadTrendFeed, parseTrendFeed } from './trendsApi';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('trendsApi', () => {
  it('loads and validates the remote feed', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockTrendFeed,
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(loadTrendFeed('https://example.com/news.json')).resolves.toEqual(mockTrendFeed);
    expect(fetchMock).toHaveBeenCalledWith('https://example.com/news.json', expect.objectContaining({
      cache: 'no-cache',
      headers: { Accept: 'application/json' },
    }));
  });

  it('rejects unsuccessful responses', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    await expect(loadTrendFeed('https://example.com/news.json')).rejects.toThrow('503');
  });

  it('rejects malformed feeds before rendering them', () => {
    expect(() => parseTrendFeed({ ...mockTrendFeed, items: [{ source: 'unknown' }] })).toThrow('Invalid trends feed item');
  });
});
