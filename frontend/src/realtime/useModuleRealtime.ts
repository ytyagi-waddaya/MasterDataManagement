"use client";

import { useEffect } from "react";
import { socket } from "@/socket/socket";
import { useQueryClient } from "@tanstack/react-query";
import { moduleQueryKeys } from "@/lib/queryKeys/modules";

export function useModuleRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const join = () => {
      console.log("[RT][module] joining resource room: MODULE");
      socket.emit("join:resource", "MODULE");
    };

    // 🔁 Join immediately if already connected
    if (socket.connected) {
      join();
    }

    // 🔁 Join on future connects (initial connect / reconnect)
    socket.on("connect", join);

    const onModuleEvent = (evt: any) => {
      console.log("📡 [RT][module] realtime event received", evt);

      queryClient.invalidateQueries({
        queryKey: moduleQueryKeys.all,
      });
    };

    // ✅ Listen to exact backend events
    socket.on("module.updated", onModuleEvent);
    socket.on("module.created", onModuleEvent);
    socket.on("module.deleted", onModuleEvent);
    socket.on("module.archived", onModuleEvent);
    socket.on("module.restored", onModuleEvent);

    // 🔍 TEMP DEBUG (safe)
    socket.onAny((event, payload) => {
      console.log("📡 socket event:", event, payload);
    });

    return () => {
      console.log("[RT][module] leaving resource room: MODULE");

      socket.emit("leave:resource", "MODULE");

      socket.off("connect", join);
      socket.off("module.updated", onModuleEvent);
      socket.off("module.created", onModuleEvent);
      socket.off("module.deleted", onModuleEvent);
      socket.off("module.archived", onModuleEvent);
      socket.off("module.restored", onModuleEvent);
      socket.offAny();
    };
  }, [queryClient]);
}
