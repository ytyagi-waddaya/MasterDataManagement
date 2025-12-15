// src/lib/auth-kit/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* -------------------------
   Types
-------------------------- */

export type MeUser = {
  id: string;
  name: string;
  email: string;
  department?: string | null;
  location?: string | null;
  attributes?: any;
  status?: string;
  type?: string;
};

export type PermissionRow = {
  roleId: string;
  permissionId: string;
  accessLevel: "FULL" | "NONE" | "CONDITIONAL";
  conditions?: any | null;
  expression?: string | null;
  permission?: {
    id: string;
    key?: string;
    name?: string;
    resource?: { id?: string; key?: string; name?: string } | null;
    action?: { id?: string; key?: string; name?: string } | null;
  } | null;
};

export type RoleBrief = {
  id: string;
  name: string;
  key: string;
  description?: string | null;
  isSystem?: boolean;
  isActive?: boolean;
};

export type MePayload = {
  user: MeUser;
  roles: RoleBrief[];
  permissions: PermissionRow[];
};

/* -------------------------
   Slice State
-------------------------- */

type AuthState = {
  me: MePayload | null;
  loaded: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  me: null,
  loaded: false,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

/* -------------------------
   Slice
-------------------------- */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /** Store /me response */
    setMe(state, action: PayloadAction<MePayload>) {
      state.me = action.payload;
      state.loaded = true;
      state.isAuthenticated = true;
    },

    /** For logout */
    clearMe(state) {
      state.me = null;
      state.loaded = true;
      state.isAuthenticated = false;
    },

    /** Update a part of me */
    patchMe(state, action: PayloadAction<Partial<MePayload>>) {
      state.me = { ...(state.me ?? {}), ...action.payload } as MePayload;
      state.loaded = true;
    },

    /** Tokens (used by axios interceptor) */
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },

    setRefreshToken(state, action: PayloadAction<string | null>) {
      state.refreshToken = action.payload ?? null;
    },

    /** Complete logout */
    clearAuth(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.me = null;
      state.isAuthenticated = false;
    },
  },
});

/* -------------------------
   Export actions + reducer
-------------------------- */

export const {
  setMe,
  clearMe,
  patchMe,
  setAccessToken,
  setRefreshToken,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;
