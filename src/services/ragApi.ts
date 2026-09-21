const DEFAULT_RAG_API_URL =
  'https://db895lxek2.execute-api.ap-northeast-1.amazonaws.com/ask';

export interface RagSource {
  title: string;
  section: string;
}

export interface RagAnswer {
  answer: string;
  sources: RagSource[];
}

function isSource(value: unknown): value is RagSource {
  if (!value || typeof value !== 'object') return false;
  const source = value as Record<string, unknown>;
  return typeof source.title === 'string' && source.title.trim().length > 0
    && typeof source.section === 'string' && source.section.trim().length > 0;
}

function isRagAnswer(value: unknown): value is RagAnswer {
  if (!value || typeof value !== 'object') return false;
  const payload = value as Record<string, unknown>;
  return typeof payload.answer === 'string' && payload.answer.trim().length > 0
    && Array.isArray(payload.sources) && payload.sources.every(isSource);
}

export async function askRag(question: string, signal?: AbortSignal): Promise<RagAnswer> {
  const apiUrl = import.meta.env.VITE_RAG_API_URL || DEFAULT_RAG_API_URL;
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
    signal,
  });

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error('回答を正しく読み込めませんでした。');
  }

  if (!response.ok) {
    const message = (payload as { error?: { message?: unknown } })?.error?.message;
    if (response.status === 429) throw new Error('アクセスが集中しています。少し待ってからお試しください。');
    throw new Error(typeof message === 'string' ? message : '現在、回答を生成できません。');
  }

  if (!isRagAnswer(payload)) throw new Error('回答を正しく読み込めませんでした。');
  return payload;
}
