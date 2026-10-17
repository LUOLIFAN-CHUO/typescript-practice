import { act, fireEvent, render, screen, within } from '@testing-library/react';
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
    window.scrollTo = vi.fn();
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

  it('provides direct mobile entry points to the journey and projects', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: '経歴を見る' })).toHaveAttribute('href', '#journey');
    expect(document.getElementById('journey')).toBeInTheDocument();
    expect(document.querySelector('#about a[href="#projects"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'AI に質問' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows the journey and opens a dedicated experience page', () => {
    const { unmount } = render(<App />);
    expect(screen.getAllByText('先進理工学部 電気電子情報通信工学科')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'SALT2 Bootcampの詳細を見る' })).toHaveAttribute('href', '#/journey/salt2');
    unmount();

    window.location.hash = '#/journey/salt2';
    render(<App />);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(screen.getByRole('heading', { level: 1, name: 'SALT2 Bootcamp' })).toBeInTheDocument();
    expect(screen.getByText('チームでの設計・実装')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'カリキュラム（予定）' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sprint 1｜個人開発' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sprint 2｜チーム開発' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sprint 3｜AIエージェント' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sprint 4｜開発環境の自作（任意）' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '各Sprintの進め方' })).toBeInTheDocument();
  });

  it('presents Mikke and SALT2 as October highlights', () => {
    const { unmount } = render(<App />);
    expect(screen.getByRole('link', { name: 'ミッケ株式会社の詳細を見る' })).toHaveAttribute('href', '#/journey/mikke');
    expect(screen.getByRole('link', { name: 'SALT2 Bootcampの詳細を見る' })).toHaveTextContent('Webアプリ → チーム開発 → AIエージェント');
    expect(screen.getByRole('link', { name: 'GCI 2026 Winterの詳細を見る' })).toHaveTextContent('東京大学 松尾・岩澤研究室監修');
    expect(screen.getByRole('link', { name: 'ミッケ株式会社のインターン詳細を見る' })).toHaveAttribute('href', '#/journey/mikke');
    unmount();

    window.location.hash = '#/journey/mikke';
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'ミッケ株式会社' })).toBeInTheDocument();
    expect(screen.getByText('募集要項に記載された業務領域')).toBeInTheDocument();
  });

  it('keeps the original journey after the selected projects', () => {
    render(<App />);
    const selected = document.getElementById('projects')!;
    const journey = document.getElementById('journey')!;
    expect(selected.compareDocumentPosition(journey) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole('link', { name: 'AWS Japan インターンシップの詳細を見る' })).toHaveAttribute('href', '#/journey/aws');
    expect(screen.getByRole('heading', { name: '学びを、実践へ。' })).toBeInTheDocument();
  });

  it('supports direct project links and returning to the existing timeline', () => {
    window.history.replaceState(null, '', '#/projects/resident-portal');
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'Resident Portal' })).toBeInTheDocument();
    expect(document.title).toContain('Resident Portal');
    expect(document.getElementById('main-content')).toHaveFocus();
    expect(screen.getByRole('link', { name: '関連する経歴を見る' })).toHaveAttribute('href', '#/journey/salt2');
    expect(screen.queryByRole('link', { name: 'Live site' })).not.toBeInTheDocument();
    expect(within(screen.getByRole('main')).queryByRole('link', { name: 'GitHub' })).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: /AI チャットがエレベーターの閉じ込め/ })).toHaveAttribute('src', '/images/resident-portal-emergency.png');
    expect(screen.getByRole('img', { name: /管理画面：質問履歴と対応待ち/ })).toHaveAttribute('src', '/images/resident-portal-questions.png');
    expect(screen.getByRole('img', { name: 'スマートフォンで表示した連絡先一覧' })).toHaveAttribute('src', '/images/resident-portal-mobile.png');
    expect(screen.getByRole('heading', { name: '通常の質問：根拠付きで回答する' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '緊急・安全関連：回答より、連絡を優先する' })).toBeInTheDocument();
    const flow = screen.getByRole('region', { name: '質問に応じて、AI の動きを変える。' });
    const supportingImages = screen.getByRole('region', { name: 'プロジェクトの画像' });
    expect(flow.compareDocumentPosition(supportingImages) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByText(/運用成果を示す数値ではありません/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /AI チャットがエレベーターの閉じ込め.*を拡大する/ }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '画像を閉じる' })).toHaveFocus();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    act(() => {
      window.history.replaceState(null, '', '#journey');
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    expect(screen.getByRole('heading', { name: '学びを、実践へ。' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /ラ・リキハン/ })).toBeInTheDocument();
  });

  it('shows the project archive through hash navigation', () => {
    render(<App />);
    act(() => {
      window.history.replaceState(null, '', '#/projects');
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    expect(screen.getByRole('heading', { level: 1, name: 'プロジェクト' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '学びを、実践へ。' })).not.toBeInTheDocument();
  });

  it('offers the public cloud links and expandable architecture', () => {
    window.history.replaceState(null, '', '#/projects/cloud-resume');
    render(<App />);
    expect(screen.getByRole('link', { name: 'Live site' })).toHaveAttribute('href', 'https://dyp8879eswsdu.cloudfront.net/');
    fireEvent.click(screen.getByRole('button', { name: /システム構成図を拡大する/ }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows a useful fallback for an unknown project link', () => {
    window.history.replaceState(null, '', '#/projects/missing');
    render(<App />);
    expect(screen.getByRole('heading', { name: 'ページが見つかりません' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'プロジェクト一覧へ戻る' })).toHaveAttribute('href', '#/projects');
  });
});
