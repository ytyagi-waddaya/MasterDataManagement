import { configureStore } from "@reduxjs/toolkit";
import dataTableReducer from "./dataTableSlice";
import moduleReducer from "./moduleSlice";
import notificationReducer from "./notificationSlice";
import authReducer from "./auth/authSlice";
import presenceReducer from "./presenceSlice";

export const store = configureStore({
  reducer: {
    dataTable: dataTableReducer,
    modules: moduleReducer,
    notifications: notificationReducer,
    auth: authReducer,
    presence: presenceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
