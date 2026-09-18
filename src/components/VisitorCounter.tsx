import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { getVisitorCount } from '@/services/visitorCounter';

type CounterState =
  | { status: 'loading' }
  | { status: 'success'; count: number }
  | { status: 'error' };

export function VisitorCounter() {
  const [state, setState] = useState<CounterState>({ status: 'loading' });

  useEffect(() => {
    let active = true;
    getVisitorCount()
      .then((count) => {
        if (active) setState({ status: 'success', count });
      })
      .catch(() => {
        if (active) setState({ status: 'error' });
      });
    return () => {
      active = false;
    };
  }, []);

  const value = state.status === 'loading'
    ? '読み込み中…'
    : state.status === 'success'
      ? `${state.count.toLocaleString('ja-JP')} views`
      : '現在取得できません';

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/30 px-4 py-2 text-sm text-white backdrop-blur-md" aria-live="polite">
      <Eye className="h-4 w-4 text-teal-300" aria-hidden="true" />
      <span className="text-white/65">訪問者数</span>
      <strong>{value}</strong>
    </div>
  );
}
