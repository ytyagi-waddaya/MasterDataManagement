// src/lib/auth-kit/loadMe.ts
import apiClient from "@/lib/api/apiClient";
import { store } from "@/store";
import { clearMe, setMe } from "./authSlice";

export async function loadMe() {
  console.log("Calling /user/me");

  console.log("API BASE URL:", process.env.NEXT_PUBLIC_API_URL);
  try {
    const res = await apiClient.get("/user/me");
    
    const payload = res.data.data?.me ?? res.data.data ?? res.data;
    if (payload) {
      store.dispatch(setMe(payload));
    } else {
      store.dispatch(clearMe());
    }
  } catch {
    store.dispatch(clearMe());
  }
}

// export async function loadMe() {
//   try {
//     const res = await apiClient.get("/user/me");
//     const payload = res.data.data?.me ?? res.data.data ?? res.data;

//     if (payload) {
//       store.dispatch(setMe(payload));
//     }
//   } catch (err: any) {
//     // ❗ Only clear auth on 401 / 403
//     if (err?.response?.status === 401 || err?.response?.status === 403) {
//       store.dispatch(clearMe());
//     }
//   }
// }
