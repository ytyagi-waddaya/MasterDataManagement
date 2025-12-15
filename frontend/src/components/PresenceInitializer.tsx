"use client";

import { useEffect } from "react";
import { socket } from "@/socket/socket";
import { store } from "@/store";
import {
  userOnline,
  userOffline,
} from "@/store/presenceSlice";

export default function PresenceInitializer() {
  useEffect(() => {
    const dispatch = store.dispatch;

    const onSnapshot = ({ users }: { users: string[] }) => {
      users.forEach((id) => dispatch(userOnline(id)));
    };

    const onUserOnline = ({ userId }: { userId: string }) => {
      dispatch(userOnline(userId));
    };

    const onUserOffline = ({ userId }: { userId: string }) => {
      dispatch(userOffline(userId));
    };

    socket.on("presence.snapshot", onSnapshot);
    socket.on("user.online", onUserOnline);
    socket.on("user.offline", onUserOffline);

    return () => {
      socket.off("presence.snapshot", onSnapshot);
      socket.off("user.online", onUserOnline);
      socket.off("user.offline", onUserOffline);
    };
  }, []);

  return null;
}
