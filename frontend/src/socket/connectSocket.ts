// src/socket/connectSocket.ts
import { socket } from "./socket";
import { store } from "@/store";

export function connectSocketIfReady() {
  const token = store.getState().auth.accessToken;

  if (!token) {
    console.warn("[socket] skip connect — no access token");
    return;
  }

  if (socket.connected) {
    return;
  }

  socket.auth = { token };
  socket.connect();

  console.log("[socket] connecting with token");
}
