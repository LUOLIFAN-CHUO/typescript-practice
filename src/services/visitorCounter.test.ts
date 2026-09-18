import { afterEach, describe, expect, it, vi } from 'vitest';
import { getVisitorCount } from './visitorCounter';

describe('getVisitorCount', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns a valid view count from the API', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ views: 42 }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(getVisitorCount()).resolves.toBe(42);
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/count'),
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('rejects non-successful responses', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }));

    await expect(getVisitorCount()).rejects.toThrow('Visitor API returned 500');
  });

  it('rejects invalid response data', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ views: 'not-a-number' }),
    }));

    await expect(getVisitorCount()).rejects.toThrow('invalid response');
  });
});
