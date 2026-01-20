import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectPermissions, selectRoles, selectUser } from "./selectors";
import { checkABAC } from "./checkABAC";
import {
  chooseMostPermissive,
  findRowsForActionResource,
  findRowsByPermissionKey,
} from "./rbac";

export default function useCan() {
  const perms = useSelector(selectPermissions);
  const user = useSelector(selectUser);
  const role = useSelector(selectRoles);
  

  return useMemo(() => {
    /* ---------------------------
       Helpers
    ---------------------------- */
      const isAdmin = role.some((r) => r.key === "ADMIN");

    const safeKey = (v?: string | null): string =>
      (v ?? "").toString().trim().toUpperCase();

    // Converts "Material Request", "material-request", "material request" → MATERIAL_REQUEST
    const normalizeResourceKey = (v?: string | null): string =>
      (v ?? "")
        .toString()
        .trim()
        .replace(/[-\s]+/g, "_")
        .toUpperCase();

    /* ---------------------------
       RBAC: Action + Resource Check
    ---------------------------- */
    function canByActionResource(
      actionKey?: string,
      resourceKey?: string,
      context?: any

    ): boolean {
      if (isAdmin) return true;
      const a = safeKey(actionKey); // e.g. READ
      const r = normalizeResourceKey(resourceKey); // MATERIAL_REQUEST

      if (!a || !r) return false;

      const rows = findRowsForActionResource(perms, a, r);
      if (!rows.length) return false;

      const effective = chooseMostPermissive(rows);
      if (!effective) return false;

      if (effective.accessLevel === "FULL") return true;
      if (effective.accessLevel === "NONE") return false;

      return checkABAC(effective.conditions, buildCtx(context, user));
    }

    /* ---------------------------
       RBAC: Permission Key Check
    ---------------------------- */
    function canByPermissionKey(permissionKey?: string, context?: any): boolean {
      if (isAdmin) return true;
      if (!permissionKey) return false;

      const key = safeKey(permissionKey);
      const rows = findRowsByPermissionKey(perms, key);

      if (!rows.length) return false;

      const effective = chooseMostPermissive(rows);
      if (!effective) return false;

      if (effective.accessLevel === "FULL") return true;
      if (effective.accessLevel === "NONE") return false;

      return checkABAC(effective.conditions, buildCtx(context, user));
    }

    return { canByActionResource, canByPermissionKey };
  }, [perms, user]);
}

/* ---------------------------
   ABAC Context Builder
---------------------------- */
function buildCtx(context: any, user: any) {
  return {
    user,
    actor: user,
    resource: context?.resource ?? context?.resourceObj ?? null,
    body: context?.body ?? {},
    params: context?.params ?? {},
    query: context?.query ?? {},
    now: new Date(),
  };
}
