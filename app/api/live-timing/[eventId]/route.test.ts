/**
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './route';
import { NextRequest } from 'next/server';

function makeRequest(eventId: string) {
  const url = `http://localhost/api/live-timing/${eventId}`;
  const request = new NextRequest(url);
  const params = Promise.resolve({ eventId });
  return GET(request, { params });
}

describe('GET /api/live-timing/[eventId]', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns combined data from all 4 endpoints', async () => {
    const mockData = {
      riders: [{ DriverLID: 1 }],
      clock: { Elapsed: 100 },
      weather: { Forecast: 'Sunny' },
      race: { EventName: 'Houston' },
    };

    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        if (url.includes('riders.json'))
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockData.riders),
          });
        if (url.includes('clock.json'))
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockData.clock),
          });
        if (url.includes('weather.json'))
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockData.weather),
          });
        if (url.includes('race.json'))
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockData.race),
          });
        return Promise.resolve({ ok: false });
      }),
    );

    const res = await makeRequest('7478');
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.riders).toEqual(mockData.riders);
    expect(body.clock).toEqual(mockData.clock);
    expect(body.weather).toEqual(mockData.weather);
    expect(body.race).toEqual(mockData.race);
  });

  it('returns null for failed endpoints', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        if (url.includes('riders.json'))
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([{ DriverLID: 1 }]),
          });
        // All other endpoints fail
        return Promise.resolve({ ok: false });
      }),
    );

    const res = await makeRequest('7478');
    const body = await res.json();

    expect(body.riders).toEqual([{ DriverLID: 1 }]);
    expect(body.clock).toBeNull();
    expect(body.weather).toBeNull();
    expect(body.race).toBeNull();
  });

  it('handles fetch rejections gracefully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Network error'))),
    );

    const res = await makeRequest('7478');
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.riders).toBeNull();
    expect(body.clock).toBeNull();
    expect(body.weather).toBeNull();
    expect(body.race).toBeNull();
  });

  it('sets Cache-Control: no-store header', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
      ),
    );

    const res = await makeRequest('7478');
    expect(res.headers.get('Cache-Control')).toBe('no-store');
  });

  it('returns 400 for non-numeric event IDs', async () => {
    const res = await makeRequest('abc');
    expect(res.status).toBe(400);
  });

  it('appends cache-buster query param to S3 URLs', async () => {
    const fetchSpy = vi.fn((_url: string) =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
    );
    vi.stubGlobal('fetch', fetchSpy);

    await makeRequest('7478');

    expect(fetchSpy.mock.calls.length).toBe(4);
    for (const call of fetchSpy.mock.calls) {
      const url = String(call[0]);
      expect(url).toMatch(/\?t=\d+$/);
    }
  });
});
