import { socket } from "./socket";
import { store } from "@/store";
import { pushNotification } from "@/store/notificationSlice";

export function initNotificationSocket(userId: string) {
  console.log("[RT][notification] init for user:", userId);

  socket.off("notification.created");

  socket.on("notification.created", (payload) => {
    console.log("[RT][notification] received", payload);

    // 🔐 safety check
    if (payload.userId && payload.userId !== userId) return;

    store.dispatch(
      pushNotification({
        deliveryId: payload.deliveryId ?? payload.outboxId,
        userId,
        title: payload.title,
        message: payload.message,
        data: payload.data,
        type: payload.type ?? "INFO",
        createdAt: payload.timestamp ?? new Date().toISOString(),
      })
    );
  });
}
