// src/components/AuthGate.tsx
"use client";

import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { RootState } from "@/store";import { isPublicRoute } from "./isPublicRoute";


export function AuthGate({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const { loaded, me } = useSelector((s: RootState) => s.auth);

  // Public routes → skip gate
  if (isPublicRoute(pathname)) {
    return <>{children}</>;
  }

  // Wait for /me
  if (!loaded) {
    return null; // or loader
  }

  // Not authenticated → redirect
  if (!me) {
    router.replace("/login");
    return null;
  }

  return <>{children}</>;
}
