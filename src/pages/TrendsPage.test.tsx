import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TrendsPage } from './TrendsPage';

describe('TrendsPage', () => {
  it('renders the trend feed with source links and update time', () => {
    render(<TrendsPage />);

    expect(screen.getByRole('heading', { level: 1, name: '最近のIT業界トレンド' })).toBeInTheDocument();
    expect(screen.getByText('Hacker News')).toBeInTheDocument();
    expect(screen.getByText('Zenn')).toBeInTheDocument();
    expect(screen.getByText('Qiita')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /原文を読む/ })).toHaveLength(3);
    expect(screen.getByRole('link', { name: /履歴書に戻る/ })).toHaveAttribute('href', '#about');
  });
});
