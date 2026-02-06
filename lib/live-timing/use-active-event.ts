'use client';

import { useEffect } from 'react';
import { useActiveEventContext } from './active-event-context';

// Hardcoded known event ID (detected via XHR interception on supercrosslive.com).
// TODO: Replace with real active-event detection (e.g., API call to check
// which event is currently live). For now this simulates finding an active event.
const KNOWN_EVENT_ID = 7478;

const POLL_INTERVAL_MS = 60 * 60 * 1000; // 60 minutes

function detectActiveEvent(): number | null {
  // Detection strategy will be implemented later.
  // For now, return the hardcoded known event ID.
  return KNOWN_EVENT_ID;
}

export function useActiveEvent() {
  const { activeEventId, setActiveEventId } = useActiveEventContext();

  useEffect(() => {
    // Initial detection
    setActiveEventId(detectActiveEvent());

    const interval = setInterval(() => {
      setActiveEventId(detectActiveEvent());
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [setActiveEventId]);

  return activeEventId;
}
