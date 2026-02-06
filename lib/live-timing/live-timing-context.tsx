'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { normalize } from './normalizer';
import type { SessionState, RawTimingData } from './types';

type ConnectionStatus = 'idle' | 'connecting' | 'live' | 'error';

interface LiveTimingContextType {
  readonly session: SessionState | null;
  readonly status: ConnectionStatus;
}

const LiveTimingContext = createContext<LiveTimingContextType | undefined>(
  undefined,
);

const POLL_INTERVAL_MS = 2000;

export function useLiveTimingContext(): LiveTimingContextType {
  const context = useContext(LiveTimingContext);
  if (!context) {
    throw new Error(
      'useLiveTimingContext must be used within a LiveTimingProvider',
    );
  }
  return context;
}

export function LiveTimingProvider({
  eventId,
  children,
}: {
  readonly eventId: number;
  readonly children: React.ReactNode;
}) {
  const [session, setSession] = useState<SessionState | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('idle');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const poll = useCallback(async () => {
    try {
      const res = await fetch(`/api/live-timing/${eventId}`);
      if (!res.ok) {
        setStatus('error');
        return;
      }
      const raw: RawTimingData = await res.json();
      const normalized = normalize(eventId, raw);
      setSession(normalized);
      setStatus('live');
    } catch {
      setStatus('error');
    }
  }, [eventId]);

  useEffect(() => {
    setStatus('connecting');
    poll();

    intervalRef.current = setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [poll]);

  return (
    <LiveTimingContext.Provider value={{ session, status }}>
      {children}
    </LiveTimingContext.Provider>
  );
}
