// src/components/RealtimeEventsBootstrap.tsx
"use client";

import { useRealtimeEvents } from "@/hooks/useRealtimeEvents";

export function RealtimeProvider() {
  useRealtimeEvents();
  return null;
}
