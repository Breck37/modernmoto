'use client';

import { useActiveEvent } from '@/lib/live-timing/use-active-event';
import { useLiveTimingContext } from '@/lib/live-timing/live-timing-context';

function formatTime(seconds: number): string {
  if (seconds <= 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatLapTime(seconds: number): string {
  if (seconds <= 0) return '-';
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(3);
  return mins > 0 ? `${mins}:${secs.padStart(6, '0')}` : secs;
}

function StatusIndicator({ status }: { readonly status: string }) {
  const colors: Record<string, string> = {
    idle: 'bg-gray-400',
    connecting: 'bg-yellow-400 animate-pulse',
    live: 'bg-green-500',
    error: 'bg-red-500',
  };

  return (
    <span className="inline-flex items-center gap-2 text-sm text-foreground-muted">
      <span className={`inline-block w-2 h-2 rounded-full ${colors[status] ?? 'bg-gray-400'}`} />
      {status}
    </span>
  );
}

function LiveTimingContent() {
  const { session, status } = useLiveTimingContext();

  if (status === 'connecting' && !session) {
    return (
      <div className="flex items-center gap-2 text-foreground-muted">
        <StatusIndicator status={status} />
        <span>Connecting...</span>
      </div>
    );
  }

  if (status === 'error' && !session) {
    return (
      <div className="text-red-500">
        <StatusIndicator status={status} />
        <span className="ml-2">Failed to connect. Retrying...</span>
      </div>
    );
  }

  if (!session) {
    return <p className="text-foreground-muted">Waiting for data...</p>;
  }

  const { clock, riders, race } = session;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-semibold">
            {race.eventName || 'Live Event'}
          </h2>
          <p className="text-sm text-foreground-muted">
            {race.className}
            {race.roundNumber > 0 && ` — Round ${race.roundNumber}`}
            {race.series.length > 0 && ` — ${race.series.join(', ')}`}
          </p>
        </div>
        <StatusIndicator status={status} />
      </div>

      <div className="flex gap-6 text-sm font-mono">
        <span>
          Elapsed: <strong>{formatTime(clock.elapsed)}</strong>
        </span>
        <span>
          Remaining: <strong>{formatTime(clock.remaining)}</strong>
        </span>
      </div>

      {riders.length === 0 ? (
        <p className="text-foreground-muted">No rider data available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-foreground-muted">
                <th className="py-2 pr-3 w-12">Pos</th>
                <th className="py-2 pr-3 w-14">#</th>
                <th className="py-2 pr-3">Rider</th>
                <th className="py-2 pr-3 text-right">Gap</th>
                <th className="py-2 pr-3 text-right">Last Lap</th>
                <th className="py-2 pr-3 text-right">Best Lap</th>
                <th className="py-2 pr-3 text-right">Laps</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider) => (
                <tr
                  key={rider.driverLID}
                  className="border-b border-border/50 hover:bg-muted/30"
                >
                  <td className="py-2 pr-3 font-mono font-bold">
                    {rider.position}
                  </td>
                  <td className="py-2 pr-3 font-mono">{rider.bikeNumber}</td>
                  <td className="py-2 pr-3">
                    {rider.firstName} {rider.lastName}
                    {rider.isPitting && (
                      <span className="ml-2 text-xs text-yellow-500">PIT</span>
                    )}
                    {rider.isDNF && (
                      <span className="ml-2 text-xs text-red-500">DNF</span>
                    )}
                    {rider.isDNS && (
                      <span className="ml-2 text-xs text-red-500">DNS</span>
                    )}
                    {rider.isDQ && (
                      <span className="ml-2 text-xs text-red-500">DQ</span>
                    )}
                  </td>
                  <td className="py-2 pr-3 text-right font-mono">
                    {rider.position === 1 ? '-' : rider.gap || '-'}
                  </td>
                  <td
                    className={`py-2 pr-3 text-right font-mono ${
                      rider.isLastLapBestOverall
                        ? 'text-purple-500 font-bold'
                        : rider.isLastLapBestPersonal
                          ? 'text-green-500'
                          : ''
                    }`}
                  >
                    {formatLapTime(rider.lapTime)}
                  </td>
                  <td
                    className={`py-2 pr-3 text-right font-mono ${
                      rider.isFastestLapBestOverall
                        ? 'text-purple-500 font-bold'
                        : ''
                    }`}
                  >
                    {formatLapTime(rider.fastestLap)}
                  </td>
                  <td className="py-2 pr-3 text-right font-mono">
                    {rider.completedLaps}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function LiveTimingPage() {
  const activeEventId = useActiveEvent();

  if (!activeEventId) {
    return (
      <main className="min-h-screen bg-background text-foreground p-6">
        <h1 className="text-3xl font-bold mb-4">Live Timing</h1>
        <p className="text-foreground-muted">No active event detected.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <div className="flex items-baseline gap-3 mb-6">
        <h1 className="text-3xl font-bold">Live Timing</h1>
        <span className="text-sm font-mono text-foreground-muted">
          Event {activeEventId}
        </span>
      </div>
      <LiveTimingContent />
    </main>
  );
}
