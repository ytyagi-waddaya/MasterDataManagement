// src/lib/api/authInterceptor.ts
import {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

import refreshClient from "./refreshClient";
import { store } from "@/store";
import { clearAuth, setAccessToken, setRefreshToken } from "@/store/auth";

// If using App Router:
import { redirect } from "next/navigation";
// If using Pages Router, uncomment:
// import Router from "next/router";

let isRefreshing = false;
let subscribers: ((token: string | null) => void)[] = [];

function subscribeToken(cb: (token: string | null) => void) {
  subscribers.push(cb);
}

function onRefreshed(token: string | null) {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
}

async function doRefreshToken(): Promise<string | null> {
  try {
    const res = await refreshClient.post("/auth/refresh");

    const data = res.data?.data ?? res.data;
    const accessToken = data?.accessToken || null;
    const refreshToken = data?.refreshToken || null;

    if (accessToken) store.dispatch(setAccessToken(accessToken));
    if (refreshToken) store.dispatch(setRefreshToken(refreshToken));

    return accessToken;
  } catch (err) {
    console.error("Refresh token failed:", err);
    return null;
  }
}

export function initAuthInterceptor(api: AxiosInstance) {
  /** REQUEST INTERCEPTOR — CORRECT TYPE */
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      try {
        if (typeof window === "undefined") return config;

        const state = store.getState();
        const token = state.auth.accessToken;

        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.warn("Error attaching token", err);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  /** RESPONSE INTERCEPTOR — AUTO REFRESH */
  api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
      const originalRequest: any = error.config;

      if (!error.response || error.response.status !== 401) {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeToken((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      }

      isRefreshing = true;

      try {
        const newAccessToken = await doRefreshToken();
        isRefreshing = false;
        onRefreshed(newAccessToken);

        if (!newAccessToken) {
          store.dispatch(clearAuth());
          if (typeof window !== "undefined") {
            redirect("/login"); // App Router
            // window.location.href = "/login";
          }
          return Promise.reject(error);
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (e) {
        isRefreshing = false;
        onRefreshed(null);
        store.dispatch(clearAuth());

        if (typeof window !== "undefined") {
          redirect("/login");
          // window.location.href = "/login";
        }

        return Promise.reject(e);
      }
    }
  );
}
