'use client';

import { ActiveEventProvider, useActiveEventContext } from '@/lib/live-timing';
import { LiveTimingProvider } from '@/lib/live-timing/live-timing-context';

function LiveTimingBridge({ children }: { readonly children: React.ReactNode }) {
  const { activeEventId } = useActiveEventContext();

  if (!activeEventId) {
    return <>{children}</>;
  }

  return (
    <LiveTimingProvider eventId={activeEventId}>{children}</LiveTimingProvider>
  );
}

export default function LiveTimingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ActiveEventProvider>
      <LiveTimingBridge>{children}</LiveTimingBridge>
    </ActiveEventProvider>
  );
}
