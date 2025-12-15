"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useRealtimeEvents } from "@/hooks/useRealtimeEvents";

function RealtimeWrapper() {
  useRealtimeEvents();
  return null;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <RealtimeWrapper />
      {children}
    </Provider>
  );
}
