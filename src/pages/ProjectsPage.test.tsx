import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectsPage } from './ProjectsPage';

describe('ProjectsPage', () => {
  it('filters the archive and restores all projects', () => {
    render(<ProjectsPage />);
    expect(screen.getAllByRole('article')).toHaveLength(3);

    fireEvent.click(screen.getByRole('button', { name: /AI アプリケーション/ }));
    expect(screen.getByRole('heading', { name: 'Resident Portal' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'AI News Daily' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Cloud Resume Challenge' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /AI アプリケーション/ })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('2 件');

    fireEvent.click(screen.getByRole('button', { name: /クラウド/ }));
    expect(screen.getByRole('heading', { name: 'Cloud Resume Challenge' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Resident Portal' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'AI News Daily' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /すべて/ }));
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });
});
