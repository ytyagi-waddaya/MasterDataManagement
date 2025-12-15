// src/lib/auth-kit/selectors.ts
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { PermissionRow } from "./authSlice";

/* -------------------------
   BASIC SELECTORS
-------------------------- */

export const selectAuth = (state: RootState) => state.auth;

export const selectMe = createSelector(
  [selectAuth],
  (auth) => auth.me
);

export const selectUser = createSelector(
  [selectMe],
  (me) => me?.user ?? null
);

export const selectRoles = createSelector(
  [selectMe],
  (me) => me?.roles ?? []
);

export const selectPermissions = createSelector(
  [selectMe],
  (me) => me?.permissions ?? []
);

/* -------------------------
   DERIVED SELECTORS
-------------------------- */

export const selectPermissionRowsByKey = createSelector(
  [selectPermissions],
  (rows) => {
    const map = new Map<string, PermissionRow[]>();

    for (const r of rows) {
      const key = r.permission?.key ?? r.permissionId ?? "UNKNOWN";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    }

    return map;
  }
);

export const selectPermissionRowsByResourceAction = createSelector(
  [selectPermissions],
  (rows) => {
    const map = new Map<string, PermissionRow[]>();

    for (const r of rows) {
      const res = r.permission?.resource?.key?.toUpperCase() ?? "UNKNOWN_RESOURCE";
      const act = r.permission?.action?.key?.toUpperCase() ?? "UNKNOWN_ACTION";
      const key = `${act}::${res}`;

      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    }

    return map;
  }
);
