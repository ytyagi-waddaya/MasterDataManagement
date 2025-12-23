// src/store/notificationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NotificationType = "INFO" | "SUCCESS" | "WARNING" | "ERROR";

export interface NotificationPayload {
  deliveryId: string;
  userId: string;
  title: string;
  message: string;
  data?: any;
  type?: NotificationType;
  createdAt?: string;
  read?: boolean;
}

interface NotificationState {
  unread: number;
  latest: NotificationPayload[]; // last 10 only
}

const initialState: NotificationState = {
  unread: 0,
  latest: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    pushNotification(state, action: PayloadAction<NotificationPayload>) {
      console.log("🧠 [redux] pushNotification", action.payload);
      state.latest.unshift({
        ...action.payload,
        read: false,
        createdAt: action.payload.createdAt ?? new Date().toISOString(),
      });

      state.latest = state.latest.slice(0, 10);
      state.unread += 1;
    },

    syncUnread(state, action: PayloadAction<number>) {
      state.unread = action.payload;
    },

    markAllRead(state) {
      state.unread = 0;
      state.latest = state.latest.map((n) => ({ ...n, read: true }));
    },
  },
});

export const { pushNotification, syncUnread, markAllRead } =
  notificationSlice.actions;

export default notificationSlice.reducer;
