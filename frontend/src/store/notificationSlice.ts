import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NotificationType = "INFO" | "SUCCESS" | "WARNING" | "ERROR";

interface NotificationPayload {
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
  items: NotificationPayload[];
}

const initialState: NotificationState = {
  unread: 0,
  items: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    pushNotification: (state, action: PayloadAction<NotificationPayload>) => {
      const notif = {
        ...action.payload,
        read: false,
        createdAt: action.payload.createdAt ?? new Date().toISOString(),
      };

      state.items.unshift(notif);
      state.unread += 1;
    },

    markRead: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(
        (n) => n.deliveryId === action.payload
      );
      if (index !== -1 && !state.items[index].read) {
        state.items[index].read = true;
        state.unread = Math.max(state.unread - 1, 0);
      }
    },

    markAllRead: (state) => {
      state.items = state.items.map((n) => ({ ...n, read: true }));
      state.unread = 0;
    },
  },
});

export const { pushNotification, markAllRead, markRead } = notificationSlice.actions;
export default notificationSlice.reducer;
