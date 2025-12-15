
import { queryClient } from "@/lib/api/queryClient";
import { socket } from "./socket";

export function initNotificationSocket(userId: string) {
  socket.on("notification", (payload) => {
    // Insert at top without refetch
    queryClient.setQueryData(["notifications", userId], (old: any) => {
      if (!old) return old;

      return {
        ...old,
        notifications: {
          ...old.notifications,
          data: [payload, ...old.notifications.data],
          total: old.notifications.total + 1,
        },
      };
    });
  });
}
