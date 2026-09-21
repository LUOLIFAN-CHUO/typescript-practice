import { FormEvent, useMemo, useState } from 'react';
import { Bot, ChevronDown, Loader2, MessageCircle, Send, X } from 'lucide-react';
import { askRag, RagSource } from '@/services/ragApi';

type Message = { role: 'user' | 'assistant'; text: string; sources?: RagSource[]; error?: boolean };

const AVAILABILITY_QUESTION = '曜日ごとの勤務可能時間を教えてください。';
const START_DATE_QUESTION = 'いつから勤務を開始できますか。';

const suggestions = [
  { question: AVAILABILITY_QUESTION, label: '勤務可能な曜日・時間は？' },
  { question: 'AWS に関する経験を教えてください。', label: 'AWS に関する経験は？' },
  { question: 'Cloud Resume Challenge について教えてください。', label: 'Cloud Resume Challenge とは？' },
  { question: 'どのような技術スキルがありますか？', label: '技術スキルについて' },
];

function formatAnswer(text: string, sources: RagSource[]) {
  const isAvailability = sources.some((source) => source.section === 'availability' || source.title === '勤務可能時間');
  const sentences = text.split('。').map((line) => line.trim()).filter(Boolean);
  if (isAvailability && text.includes('曜日')) {
    return ['勤務可能時間', ...sentences.map((line) => `・${line}。`)].join('\n');
  }
  if (sentences.length >= 3) return sentences.map((line) => `・${line}。`).join('\n');
  return text;
}

function Sources({ sources }: { sources: RagSource[] }) {
  if (sources.length === 0) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1.5" aria-label="回答の参照元">
      {sources.map((source) => (
        <span key={`${source.title}-${source.section}`} className="rounded-full border border-teal-200 bg-teal-50 px-2 py-1 text-[11px] font-semibold text-teal-700 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-200">
          {source.title}
        </span>
      ))}
    </div>
  );
}

export function RagChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'こんにちは。スキル、プロジェクト、経験についてご質問ください。' },
  ]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  async function submit(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;
    setInput('');
    setLoading(true);
    setMessages((current) => [...current, { role: 'user', text: trimmed }]);
    try {
      const result = await askRag(trimmed);
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: formatAnswer(result.answer, result.sources), sources: result.sources },
        ...(trimmed === AVAILABILITY_QUESTION
          ? [{ role: 'assistant' as const, text: `関連する質問：${START_DATE_QUESTION}` }]
          : []),
      ]);
    } catch (error) {
      setMessages((current) => [...current, {
        role: 'assistant',
        text: error instanceof Error ? error.message : '現在、回答を生成できません。',
        error: true,
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit(input);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
      {open && (
        <section className="mb-3 flex h-[min(38rem,calc(100vh-6rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0c1a2b]" role="dialog" aria-label="履歴書 AI アシスタント">
          <header className="flex items-center justify-between border-b border-slate-200 bg-slate-950 px-4 py-3 text-white dark:border-white/10">
            <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-teal-300 font-black text-slate-950">AI</span><div><strong className="block text-sm">履歴書 AI</strong><span className="text-xs text-white/60">履歴書の情報をもとに回答</span></div></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="AI アシスタントを閉じる" className="rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4 dark:bg-[#081321]" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'assistant' && <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-300/15 dark:text-teal-200"><Bot className="h-4 w-4" /></span>}
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-7 ${message.role === 'user' ? 'rounded-br-md bg-slate-900 text-white dark:bg-teal-300 dark:text-slate-950' : `rounded-bl-md bg-white text-slate-700 shadow-sm dark:bg-white/10 dark:text-slate-200 ${message.error ? 'text-rose-600 dark:text-rose-300' : ''}`}`}>
                  <p className="whitespace-pre-line">{message.text}</p>
                  {message.sources && <Sources sources={message.sources} />}
                </div>
              </div>
            ))}
            {messages.length === 1 && <div className="ml-9 grid gap-2">{suggestions.map((item) => <button key={item.question} type="button" onClick={() => void submit(item.question)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:border-teal-400 hover:text-teal-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-teal-300 dark:hover:text-teal-200">{item.label}</button>)}</div>}
            {loading && <div className="ml-9 flex items-center gap-2 text-xs text-slate-400"><Loader2 className="h-4 w-4 animate-spin" />回答を作成しています…</div>}
          </div>
          <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-[#0c1a2b]"><label className="sr-only" htmlFor="rag-question">質問</label><textarea id="rag-question" value={input} onChange={(event) => setInput(event.target.value.slice(0, 240))} disabled={loading} rows={2} placeholder="知りたいことを入力してください…" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-teal-400 dark:border-white/10 dark:bg-white/5" /><div className="mt-2 flex items-center justify-between"><span className="text-[11px] text-slate-400">{input.length} / 240</span><button type="submit" disabled={!canSend} className="inline-flex items-center gap-1 rounded-xl bg-teal-300 px-3 py-2 text-xs font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">送信 <Send className="h-3.5 w-3.5" /></button></div></form>
        </section>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-teal-300 dark:text-slate-950"><MessageCircle className="h-5 w-5" />AI に質問 {open ? <ChevronDown className="h-4 w-4" /> : null}</button>
    </div>
  );
}
