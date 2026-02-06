'use client';

import { createContext, useContext, useState, useCallback } from 'react';

interface ActiveEventContextType {
  readonly activeEventId: number | null;
  readonly setActiveEventId: (id: number | null) => void;
}

const ActiveEventContext = createContext<ActiveEventContextType | undefined>(undefined);

export function useActiveEventContext() {
  const context = useContext(ActiveEventContext);
  if (!context) {
    throw new Error('useActiveEventContext must be used within an ActiveEventProvider');
  }
  return context;
}

export function ActiveEventProvider({ children }: { children: React.ReactNode }) {
  const [activeEventId, setActiveEventIdState] = useState<number | null>(null);

  const setActiveEventId = useCallback((id: number | null) => {
    setActiveEventIdState(id);
  }, []);

  return (
    <ActiveEventContext.Provider value={{ activeEventId, setActiveEventId }}>
      {children}
    </ActiveEventContext.Provider>
  );
}
