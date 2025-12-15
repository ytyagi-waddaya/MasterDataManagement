// src/components/SocketBootstrap.tsx
"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { socket } from "@/socket/socket";
import { connectSocketIfReady } from "@/socket/connectSocket";
import { RootState } from "@/store";

export function SocketBootstrap() {
  const { accessToken, loaded } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    // 🔑 WAIT for auth to finish loading
    if (!loaded) return;

    if (accessToken) {
      connectSocketIfReady();
    } else if (socket.connected) {
      socket.disconnect();
    }
  }, [loaded, accessToken]);

  return null;
}
