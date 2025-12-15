"use client";

import { loadMe } from "@/store/auth/loadMe";
import { useEffect, PropsWithChildren } from "react";

export default function AuthInitializer({ children }: PropsWithChildren) {
  useEffect(() => {
    loadMe();
  }, []);

  return <>{children}</>;
}

// "use client";

// import { useEffect } from "react";
// import { loadMe } from "@/store/auth/loadMe";
// import { store } from "@/store";

// export default function AuthInitializer({ children }: { children: React.ReactNode }) {
//   useEffect(() => {
//     const state = store.getState().auth;

//     // ✅ Only loadMe if we actually have a token
//     if (state.accessToken || state.refreshToken) {
//       loadMe();
//     }
//   }, []);

//   return <>{children}</>;
// }
