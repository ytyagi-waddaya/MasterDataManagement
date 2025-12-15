"use client";

import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api/apiClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { store } from "@/store";
import {
  setAccessToken,
  setRefreshToken,
  setMe,
  clearAuth,
} from "@/store/auth";
import { loadMe } from "@/store/auth/loadMe";
import { resetPresence } from "@/store/presenceSlice";
import { socket } from "@/socket/socket";

/* ---------------------------
   LOGIN HOOK
---------------------------- */
export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await apiClient.post("/auth/login", payload);
      return res.data?.data?.user ?? res.data?.user ?? res.data;
    },

    onSuccess: async (data: any) => {
      const accessToken = data?.accessToken;
      const refreshToken = data?.refreshToken;

      if (accessToken) store.dispatch(setAccessToken(accessToken));
      if (refreshToken) store.dispatch(setRefreshToken(refreshToken));

      // Fetch /me and store
      await loadMe();

      toast.success("Logged in successfully");
      router.push("/dashboard");
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Login failed");
    },
  });
}

/* ---------------------------
   LOGOUT HOOK
---------------------------- */
export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const state = store.getState().auth;
      const refreshToken = state.refreshToken;

      await apiClient.post("/auth/logout", { refreshToken });
    },

    onSuccess: () => {
      store.dispatch(clearAuth());
      store.dispatch(resetPresence());
      socket.disconnect();
      toast.success("Logged out");
      router.push("/login");
    },

    onError: (err: any) =>
      toast.error(err.response?.data?.message || "Logout failed"),
  });
}

/* ---------------------------
   MANUAL REFRESH TOKEN HOOK (Optional)
---------------------------- */
export function useRefreshToken() {
  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.post("/auth/refresh", {});
      return res.data?.data;
    },

    onSuccess: (data) => {
      if (data?.accessToken) {
        store.dispatch(setAccessToken(data.accessToken));
      }
      if (data?.refreshToken) {
        store.dispatch(setRefreshToken(data.refreshToken));
      }
      toast.success("Token refreshed");
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Token refresh failed");
    },
  });
}
