"use client";

import { useEffect } from "react";
import { socket, joinResource, leaveResource } from "@/socket/socket";
import { useQueryClient } from "@tanstack/react-query";
import { moduleQueryKeys } from "@/lib/queryKeys/modules";

export function useModuleRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    joinResource("MODULE");

    const onEvent = (evt: any) => {
      console.log("📡 [module]", evt.event);
      queryClient.invalidateQueries({
        queryKey: moduleQueryKeys.all,
      });
    };

    socket.on("module.created", onEvent);
    socket.on("module.updated", onEvent);
    socket.on("module.deleted", onEvent);
    socket.on("module.archived", onEvent);
    socket.on("module.restored", onEvent);

    return () => {
      leaveResource("MODULE");
      socket.off("module.created", onEvent);
      socket.off("module.updated", onEvent);
      socket.off("module.deleted", onEvent);
      socket.off("module.archived", onEvent);
      socket.off("module.restored", onEvent);
    };
  }, [queryClient]);
}
