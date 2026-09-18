import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { getVisitorCount } from '@/services/visitorCounter';

vi.mock('@/services/visitorCounter', () => ({
  getVisitorCount: vi.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(getVisitorCount).mockResolvedValue(25);
  });

  it('renders the migrated resume content and navigation', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: /ラ・リキハン/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '自己PRとキャリア目標' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Cloud Resume Challenge' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'メインナビゲーション' })).toBeInTheDocument();
  });
});
