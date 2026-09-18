const DEFAULT_VISITOR_API_URL =
  'https://ngknde7bpj.execute-api.ap-northeast-1.amazonaws.com/count';

export interface VisitorCountResponse {
  views: number;
}

function isVisitorCountResponse(value: unknown): value is VisitorCountResponse {
  if (!value || typeof value !== 'object' || !('views' in value)) return false;
  const views = (value as { views: unknown }).views;
  return typeof views === 'number' && Number.isFinite(views) && views >= 0;
}

export async function getVisitorCount(): Promise<number> {
  const apiUrl = import.meta.env.VITE_VISITOR_API_URL || DEFAULT_VISITOR_API_URL;
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Visitor API returned ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!isVisitorCountResponse(data)) {
    throw new Error('Visitor API returned an invalid response');
  }

  return data.views;
}
