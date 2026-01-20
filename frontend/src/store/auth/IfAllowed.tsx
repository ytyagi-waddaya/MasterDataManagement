// src/lib/auth-kit/IfAllowed.tsx
import React from "react";
import useCan from "./useCan";

type Props =
  | {
      action: string;
      resource: string; 
      context?: any;
      children: React.ReactNode;
      fallback?: React.ReactNode;
    }
  | {
      permissionKey: string;
      context?: any;
      children: React.ReactNode;
      fallback?: React.ReactNode;
    };

export default function IfAllowed(props: Props) {
  const api = useCan();

  const allowed = ("permissionKey" in props && props.permissionKey)
    ? api.canByPermissionKey(props.permissionKey, props.context)
    : api.canByActionResource((props as any).action, (props as any).resource, props.context);

  if (allowed) return <>{props.children}</>;
  return <>{props.fallback ?? null}</>;
}


{/* <IfAllowed action="UPDATE" resource="TICKET" context={{ resource: ticket }}>
  <Button>Edit</Button>
</IfAllowed> */}
