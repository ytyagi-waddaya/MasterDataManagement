import { store } from "@/store";
import { io, Socket } from "socket.io-client";



export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  autoConnect: false,
  withCredentials: true,
  transports: ["websocket", "polling"],
  reconnection: true,
  // reconnectionAttempts: Infinity,
  // reconnectionDelay: 500,
  // reconnectionDelayMax: 3000,
});


socket.on("reconnect_attempt", () => {
  const token = store.getState().auth.accessToken;
  if (token) {
    socket.auth = { token };
  }
});

// socket.on("connect", () => {
//   console.log("🟢 socket connected", socket.id);
//   socket.emit("presence.request");
// });

socket.on("connect", () => {
  console.log("📤 socket connected → requesting presence snapshot");
  socket.emit("presence.request");
});

socket.on("user.online", ({ userId }) => {
  console.log("🟢 user online:", userId);
});

socket.on("user.offline", ({ userId }) => {
  console.log("🔴 user offline:", userId);
});


socket.on("disconnect", (reason) => {
  console.log("🔴 socket disconnected", reason);
});

socket.on("connect_error", (err) => {
  console.error("❌ socket connect error", err.message);
});

socket.on("reconnect_attempt", () => {
  console.log("🔄 socket reconnecting...");
});

socket.on("reconnect", () => {
  console.log("✅ socket reconnected", socket.id);
});
