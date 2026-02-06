/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import {
  LiveTimingProvider,
  useLiveTimingContext,
} from './live-timing-context';

function renderHook<T>(
  hook: () => T,
  options?: { wrapper?: React.ComponentType<{ children: React.ReactNode }> },
) {
  const result = { current: undefined as T };
  const unmountRef = { current: () => {} };

  function TestComponent() {
    result.current = hook();
    return null;
  }

  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = createRoot(container);
  const Wrapper = options?.wrapper ?? React.Fragment;

  act(() => {
    root.render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );
  });

  unmountRef.current = () => {
    act(() => {
      root.unmount();
    });
    document.body.removeChild(container);
  };

  return { result, unmount: unmountRef.current };
}

const MOCK_RAW_DATA = {
  riders: [
    {
      DriverLID: 1,
      Position: 1,
      FirstName: 'Jett',
      LastName: 'Lawrence',
      BikeNumber: '18',
      CompletedLaps: 5,
      LapTime: 52.123,
      FastestLap: 51.456,
      DifferenceBehindLeaderDisplay: '',
      DifferenceBehindPrecedingDisplay: '',
      LatestSectors: [],
    },
  ],
  clock: { Elapsed: 300, Remaining: 600, FlagType: 1, CautionElapsedSeconds: 0 },
  weather: {
    IconURL: '',
    TemperatureDegreesFahrenheit: 72,
    TemperatureDegreesCelsius: 22,
    Forecast: 'Clear',
    WindDirection: 'N',
    WindSpeed: '5',
    HumidityPercentage: 40,
  },
  race: {
    ClassName: '450SX',
    RaceStatus: 1,
    RaceLengthSeconds: 900,
    RaceNumber: 1,
    TotalRaces: 3,
    RoundNumber: 5,
    EventName: 'Houston',
    HeatNumber: 1,
    TotalHeats: 2,
    NumberOfRacersInRace: 22,
    RaceLID: 100,
    ClassLID: 200,
    SectorNames: [],
    Series: [{ Name: 'Supercross' }],
  },
};

function createWrapper(eventId: number) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <LiveTimingProvider eventId={eventId}>{children}</LiveTimingProvider>;
  };
}

// Helper to flush microtasks (promises) without advancing fake timers
function flushMicrotasks() {
  return act(async () => {});
}

describe('LiveTimingContext', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('useLiveTimingContext', () => {
    it('throws when used outside LiveTimingProvider', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useLiveTimingContext());
      }).toThrow('useLiveTimingContext must be used within a LiveTimingProvider');

      spy.mockRestore();
    });

    it('starts with connecting status and null session', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() => new Promise(() => {})), // never resolves
      );

      const { result, unmount } = renderHook(() => useLiveTimingContext(), {
        wrapper: createWrapper(7478),
      });

      expect(result.current.status).toBe('connecting');
      expect(result.current.session).toBeNull();
      unmount();
    });

    it('transitions to live with session data on successful fetch', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(MOCK_RAW_DATA),
          }),
        ),
      );

      const { result, unmount } = renderHook(() => useLiveTimingContext(), {
        wrapper: createWrapper(7478),
      });

      // Flush the initial poll's promise chain
      await flushMicrotasks();

      expect(result.current.status).toBe('live');
      expect(result.current.session).not.toBeNull();
      expect(result.current.session!.riders).toHaveLength(1);
      expect(result.current.session!.riders[0].firstName).toBe('Jett');
      expect(result.current.session!.race.className).toBe('450SX');
      unmount();
    });

    it('transitions to error on fetch failure', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() => Promise.resolve({ ok: false, status: 500 })),
      );

      const { result, unmount } = renderHook(() => useLiveTimingContext(), {
        wrapper: createWrapper(7478),
      });

      await flushMicrotasks();

      expect(result.current.status).toBe('error');
      expect(result.current.session).toBeNull();
      unmount();
    });

    it('transitions to error on network error', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() => Promise.reject(new Error('Network error'))),
      );

      const { result, unmount } = renderHook(() => useLiveTimingContext(), {
        wrapper: createWrapper(7478),
      });

      await flushMicrotasks();

      expect(result.current.status).toBe('error');
      unmount();
    });

    it('polls on interval', async () => {
      const fetchMock = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(MOCK_RAW_DATA),
        }),
      );
      vi.stubGlobal('fetch', fetchMock);

      const { unmount } = renderHook(() => useLiveTimingContext(), {
        wrapper: createWrapper(7478),
      });

      // Flush initial poll
      await flushMicrotasks();
      expect(fetchMock).toHaveBeenCalledTimes(1);

      // Advance by one poll interval and flush
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      await flushMicrotasks();

      expect(fetchMock).toHaveBeenCalledTimes(2);
      unmount();
    });

    it('cleans up interval on unmount', async () => {
      const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');

      vi.stubGlobal(
        'fetch',
        vi.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(MOCK_RAW_DATA),
          }),
        ),
      );

      const { unmount } = renderHook(() => useLiveTimingContext(), {
        wrapper: createWrapper(7478),
      });

      await flushMicrotasks();

      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
    });
  });
});
