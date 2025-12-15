// src/lib/auth-kit/rbac.ts
import { PermissionRow } from "./authSlice";

/**
 * RBAC helpers.
 * - chooseMostPermissive: among permission rows for same permission choose the effective access
 *   FULL > CONDITIONAL > NONE
 */
export function chooseMostPermissive(rows: PermissionRow[]): PermissionRow | null {
  if (!rows || rows.length === 0) return null;
  // If any FULL — pick that one
  const full = rows.find((r) => r.accessLevel === "FULL");
  if (full) return full;
  const conditional = rows.find((r) => r.accessLevel === "CONDITIONAL");
  if (conditional) return conditional;
  return rows[0] ?? null;
}

/**
 * Find groups/rows by action+resource or permission key.
 */
export function findRowsForActionResource(
  rows: PermissionRow[],
  actionKey: string,
  resourceKey: string
): PermissionRow[] {
  return rows.filter((r) => {
    const p = r.permission;
    if (!p) return false;
    const ak = p.action?.key ?? "";
    const rk = p.resource?.key ?? "";
    return ak === actionKey && rk === resourceKey;
  });
}

export function findRowsByPermissionKey(rows: PermissionRow[], permissionKey: string) {
  return rows.filter((r) => (r.permission?.key ?? "") === permissionKey);
}
