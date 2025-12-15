// src/lib/auth-kit/IfAllowedAuto.tsx
import React from "react";
import useCan from "./useCan";

/**
 * Auto-detection component.
 * Props:
 *  - method: HTTP method string (GET, POST, PATCH, DELETE, etc.)
 *  - pathname: path like "/material-requests/55"
 *  - body?: optional body (for action override)
 *  - context?: resource, params, etc.
 *  - children, fallback
 *
 * It will detect ACTION (from body.action or method) and RESOURCE from pathname segment
 */
export default function IfAllowedAuto({
  method,
  pathname,
  body,
  context,
  children,
  fallback,
}: {
  method: string;
  pathname: string;
  body?: any;
  context?: any;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const api = useCan();
  const action = detectActionFromMethodOrBody(method, body);
  const resource = detectResourceFromPath(pathname);

  const allowed = api.canByActionResource(action, resource, { ...context, body });

  if (allowed) return <>{children}</>;
  return <>{fallback ?? null}</>;
}

/* Helpers */
function detectActionFromMethodOrBody(method: string, body?: any) {
  if (body?.action) return String(body.action).toUpperCase();
  switch ((method || "").toUpperCase()) {
    case "GET":
      return "READ";
    case "POST":
      return "CREATE";
    case "PATCH":
    case "PUT":
      return "UPDATE";
    case "DELETE":
      return "DELETE";
    default:
      return (method || "").toUpperCase();
  }
}

function detectResourceFromPath(pathname: string) {
  if (!pathname) return "UNKNOWN";
  const parts = pathname.split("/").filter(Boolean);
  // pick first non-id segment
  for (const seg of parts) {
    if (!/^\d+$/.test(seg) && !/^[0-9a-fA-F-]{36}$/.test(seg)) {
      // singularize simple plural (remove trailing s)
      return seg.replace(/s$/, "").replace(/_/g, "-").toUpperCase();
    }
  }
  return "UNKNOWN";
}
