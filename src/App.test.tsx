import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { getVisitorCount } from '@/services/visitorCounter';

vi.mock('@/services/visitorCounter', () => ({
  getVisitorCount: vi.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    window.location.hash = '';
    window.localStorage.clear();
    vi.mocked(getVisitorCount).mockResolvedValue(25);
  });

  it('renders the migrated resume content and navigation', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: /ラ・リキハン/ })).toBeInTheDocument();
    expect(screen.queryByText('クラウド・インフラエンジニア志望')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '自己PRとキャリア目標' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Cloud Resume Challenge' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'メインナビゲーション' })).toBeInTheDocument();
  });

  it('opens the trends page from the resume entry point', () => {
    render(<App />);

    const link = screen.getByRole('link', { name: /ITトレンド/ });
    expect(link).toHaveAttribute('href', '#/trends');
  });

  it('shows the journey and opens a dedicated experience page', () => {
    const { unmount } = render(<App />);
    expect(screen.getAllByText('先進理工学部 電気電子情報通信工学科')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'SALT2 Bootcampの詳細を見る' })).toHaveAttribute('href', '#/journey/salt2');
    unmount();

    window.location.hash = '#/journey/salt2';
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'SALT2 Bootcamp' })).toBeInTheDocument();
    expect(screen.getByText('約3週間のチーム開発')).toBeInTheDocument();
  });

  it('presents the upcoming Mikke internship as the October highlight', () => {
    const { unmount } = render(<App />);
    expect(screen.getByRole('link', { name: 'ミッケ株式会社の詳細を見る' })).toHaveAttribute('href', '#/journey/mikke');
    expect(screen.getByRole('link', { name: 'ミッケ株式会社のインターン詳細を見る' })).toHaveAttribute('href', '#/journey/mikke');
    expect(screen.getByText('同時期に取り組む')).toBeInTheDocument();
    unmount();

    window.location.hash = '#/journey/mikke';
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'ミッケ株式会社' })).toBeInTheDocument();
    expect(screen.getByText('募集要項に記載された業務領域')).toBeInTheDocument();
  });
});
