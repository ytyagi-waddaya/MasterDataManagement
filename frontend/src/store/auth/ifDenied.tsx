// src/lib/auth-kit/IfDenied.tsx
import React from "react";
import useCan from "./useCan";

export default function IfDenied(props: any) {
  const { action, resource, permissionKey, context, children, fallback } = props;

  const api = useCan();

  let allowed = false;

  if (permissionKey) {
    allowed = api.canByPermissionKey(permissionKey, context);
  } else if (action && resource) {
    allowed = api.canByActionResource(action, resource, context);
  } else {
    console.warn("IfDenied requires either permissionKey or action+resource");
  }

  if (!allowed) return <>{children}</>;

  return <>{fallback ?? null}</>;
}


{/* <IfDenied action="UPDATE" resource="PROJECT">
  <div className="p-2 bg-amber-100 rounded text-amber-700 text-xs">
    You do not have permission to edit this project.
  </div>
</IfDenied> */}


{/* <IfDenied action="APPROVE" resource="MATERIAL-REQUEST">
  <Button disabled className="opacity-50 cursor-not-allowed">
    Approve (No Access)
  </Button>
</IfDenied>

<IfAllowed action="APPROVE" resource="MATERIAL-REQUEST">
  <Button>Approve</Button>
</IfAllowed> */}
