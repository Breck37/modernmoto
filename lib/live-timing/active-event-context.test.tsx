/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React, { useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { ActiveEventProvider, useActiveEventContext } from './active-event-context';
import { useActiveEvent } from './use-active-event';

// Lightweight renderHook helper (avoids @testing-library/react dependency)
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

describe('ActiveEventContext', () => {
  describe('useActiveEventContext', () => {
    it('throws when used outside ActiveEventProvider', () => {
      // Suppress React error boundary console noise
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useActiveEventContext());
      }).toThrow('useActiveEventContext must be used within an ActiveEventProvider');

      spy.mockRestore();
    });

    it('provides null activeEventId by default', () => {
      const { result, unmount } = renderHook(() => useActiveEventContext(), {
        wrapper: ActiveEventProvider,
      });

      expect(result.current.activeEventId).toBeNull();
      unmount();
    });

    it('allows setting activeEventId', () => {
      const values: (number | null)[] = [];

      function Setter() {
        const { activeEventId, setActiveEventId } = useActiveEventContext();
        values.push(activeEventId);

        useEffect(() => {
          setActiveEventId(1163);
        }, [setActiveEventId]);

        return null;
      }

      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      act(() => {
        root.render(
          <ActiveEventProvider>
            <Setter />
          </ActiveEventProvider>,
        );
      });

      expect(values).toContain(1163);

      act(() => root.unmount());
      document.body.removeChild(container);
    });

    it('allows clearing activeEventId back to null', () => {
      const values: (number | null)[] = [];

      function Toggler() {
        const { activeEventId, setActiveEventId } = useActiveEventContext();
        values.push(activeEventId);
        const countRef = useRef(0);

        useEffect(() => {
          countRef.current += 1;
          if (countRef.current === 1) {
            setActiveEventId(1163);
          } else if (countRef.current === 2) {
            setActiveEventId(null);
          }
        });

        return null;
      }

      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);

      act(() => {
        root.render(
          <ActiveEventProvider>
            <Toggler />
          </ActiveEventProvider>,
        );
      });

      // Should have gone null -> 1163 -> null
      expect(values[0]).toBeNull();
      expect(values).toContain(1163);
      expect(values[values.length - 1]).toBeNull();

      act(() => root.unmount());
      document.body.removeChild(container);
    });
  });

  describe('useActiveEvent', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns the hardcoded event ID on mount', () => {
      const { result, unmount } = renderHook(() => useActiveEvent(), {
        wrapper: ActiveEventProvider,
      });

      expect(result.current).toBe(7478);
      unmount();
    });

    it('re-checks for active event on interval', () => {
      const { result, unmount } = renderHook(() => useActiveEvent(), {
        wrapper: ActiveEventProvider,
      });

      expect(result.current).toBe(7478);

      act(() => {
        vi.advanceTimersByTime(60 * 60 * 1000);
      });

      expect(result.current).toBe(7478);
      unmount();
    });

    it('cleans up interval on unmount', () => {
      const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');

      const { unmount } = renderHook(() => useActiveEvent(), {
        wrapper: ActiveEventProvider,
      });

      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
    });
  });
});
