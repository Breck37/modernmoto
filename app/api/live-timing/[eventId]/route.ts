import { NextRequest, NextResponse } from 'next/server';

const S3_BASE = 'https://s3.amazonaws.com/assets.liveracemedia.com/event_files';

const ENDPOINTS = ['race.json', 'clock.json', 'riders.json', 'weather.json'] as const;

type EndpointKey = 'race' | 'clock' | 'riders' | 'weather';

const KEY_MAP: Record<(typeof ENDPOINTS)[number], EndpointKey> = {
  'race.json': 'race',
  'clock.json': 'clock',
  'riders.json': 'riders',
  'weather.json': 'weather',
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> },
) {
  const { eventId } = await params;

  if (!/^\d+$/.test(eventId)) {
    return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
  }

  const cacheBuster = `?t=${Date.now()}`;
  const results = await Promise.allSettled(
    ENDPOINTS.map((file) =>
      fetch(`${S3_BASE}/${eventId}/${file}${cacheBuster}`).then((res) => {
        if (!res.ok) return null;
        return res.json();
      }),
    ),
  );

  const data: Record<string, unknown> = {};
  ENDPOINTS.forEach((file, i) => {
    const result = results[i];
    data[KEY_MAP[file]] = result.status === 'fulfilled' ? result.value : null;
  });

  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
