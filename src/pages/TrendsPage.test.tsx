import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { mockTrendFeed } from '@/data/trends';
import { TrendsPage } from './TrendsPage';

describe('TrendsPage', () => {
  it('loads the feed and switches language without loading again', async () => {
    const loadFeed = vi.fn().mockResolvedValue(mockTrendFeed);
    render(<TrendsPage loadFeed={loadFeed} />);

    expect(screen.getByText('トレンドを読み込んでいます…')).toBeInTheDocument();
    expect(await screen.findByText('Hacker News')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '中文' }));

    expect(screen.getByRole('heading', { level: 1, name: '近期 IT 行业趋势' })).toBeInTheDocument();
    expect(screen.getByText(mockTrendFeed.items[0].summary.zh!)).toBeInTheDocument();
    expect(loadFeed).toHaveBeenCalledTimes(1);
  });

  it('filters articles by source and category', async () => {
    render(<TrendsPage loadFeed={() => Promise.resolve(mockTrendFeed)} />);
    await screen.findByText('Hacker News');

    fireEvent.change(screen.getByLabelText('情報源'), { target: { value: 'qiita' } });
    expect(screen.getByRole('heading', { name: 'TypeScript プロジェクトの保守性を高めるデータ設計' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Small models are becoming useful building blocks' })).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('カテゴリー'), { target: { value: 'AI' } });
    expect(screen.getByText('条件に一致するトレンドはありません。')).toBeInTheDocument();
  });

  it('shows an error and retries the feed request', async () => {
    const loadFeed = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(mockTrendFeed);
    render(<TrendsPage loadFeed={loadFeed} />);

    expect(await screen.findByText(/トレンドを読み込めませんでした/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /再読み込み/ }));
    await waitFor(() => expect(screen.getByText('Hacker News')).toBeInTheDocument());
    expect(loadFeed).toHaveBeenCalledTimes(2);
  });

  it('falls back to Japanese when a selected translation is missing', async () => {
    const partialFeed = {
      ...mockTrendFeed,
      items: [{ ...mockTrendFeed.items[0], summary: { ja: '日本語のみの要約' } }],
    };
    render(<TrendsPage loadFeed={() => Promise.resolve(partialFeed)} />);
    await screen.findByText('日本語のみの要約');

    fireEvent.click(screen.getByRole('button', { name: 'English' }));
    expect(screen.getByText('日本語のみの要約')).toBeInTheDocument();
  });
});
