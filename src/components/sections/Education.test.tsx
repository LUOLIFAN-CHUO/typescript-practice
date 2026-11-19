import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Education } from './Education';

describe('Education awards', () => {
  it('shows the confirmed prize with selection criteria and working evidence assets', () => {
    render(<Education />);
    const award = screen.getByRole('article', { name: 'paizaランクチャレンジ 2026' });
    expect(within(award).getByText('paizaランク賞 受賞')).toBeInTheDocument();
    expect(within(award).getByText(/選考基準：Bランク以上.*上位30名/)).toBeInTheDocument();
    expect(award).not.toHaveTextContent('上位20名');
    const pdf = within(award).getByRole('link', { name: '表彰状を見る（PDF）' });
    expect(pdf).toHaveAttribute('href', '/certificates/paiza-rank-award-2026.pdf');
    expect(readFileSync(resolve('public/certificates/paiza-rank-award-2026.pdf')).subarray(0, 5).toString()).toBe('%PDF-');
    expect(existsSync(resolve('public/images/paiza-rank-award-2026.webp'))).toBe(true);
    expect(within(award).getByRole('link', { name: '主催者の公式案内' })).toHaveAttribute('href', 'https://www.chuo-u.ac.jp/aboutus/efforts/ai_and_ds/event/2026/06/86678/');
  });

  it('opens the certificate and returns keyboard focus after closing', () => {
    render(<Education />);
    const opener = screen.getByRole('button', { name: 'paizaランク賞の表彰状を拡大する' });
    opener.focus();
    fireEvent.click(opener);
    expect(within(screen.getByRole('dialog')).getByRole('img', { name: '2026年度 paizaランク賞 表彰状（羅 力凡）' })).toHaveAttribute('src', '/images/paiza-rank-award-2026.webp');
    expect(screen.getByRole('button', { name: '画像を閉じる' })).toHaveFocus();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });
});
