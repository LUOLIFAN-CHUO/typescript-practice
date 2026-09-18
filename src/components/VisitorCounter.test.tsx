import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VisitorCounter } from './VisitorCounter';
import { getVisitorCount } from '@/services/visitorCounter';

vi.mock('@/services/visitorCounter', () => ({
  getVisitorCount: vi.fn(),
}));

const getVisitorCountMock = vi.mocked(getVisitorCount);

describe('VisitorCounter', () => {
  beforeEach(() => {
    getVisitorCountMock.mockReset();
  });

  it('shows the visitor count returned by the backend', async () => {
    getVisitorCountMock.mockResolvedValue(1234);
    render(<VisitorCounter />);

    expect(screen.getByText('読み込み中…')).toBeInTheDocument();
    expect(await screen.findByText('1,234 views')).toBeInTheDocument();
    expect(getVisitorCountMock).toHaveBeenCalledOnce();
  });

  it('shows an honest fallback when the backend is unavailable', async () => {
    getVisitorCountMock.mockRejectedValue(new Error('offline'));
    render(<VisitorCounter />);

    expect(await screen.findByText('現在取得できません')).toBeInTheDocument();
  });
});
