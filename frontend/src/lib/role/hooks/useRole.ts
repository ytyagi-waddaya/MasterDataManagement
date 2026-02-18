"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { serializeFiltersForApi } from "@/hooks/useServerDataTable";
import apiClient from "@/lib/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import { CreateRoleInput, UpdateRoleInput } from "../schema/role-schema";
import { loadMe } from "@/store/auth/loadMe";

export interface RoleFilters {
  status?: "active" | "inactive" | "all";
  [key: string]: any;
}

export interface RoleResponse<T> {
  data: T[];
  total: number;
}
export function useRoles<T = any>({
  page,
  limit,
  search,
  filters = {},
  sortBy,
  sortOrder = "desc",
}: {
  page: number;
  limit: number;
  search: string;
  filters?: RoleFilters;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const debouncedSearch = useDebounce(search, 500);
  const stableFilters = useMemo(() => JSON.stringify(filters), [filters]);

  return useQuery<{
    roles: {
      data: T[];
      total: number;
      page: number;
      pageSize: number;
    };
  }>({
    queryKey: [
      "roles",
      page,
      limit,
      debouncedSearch,
      stableFilters,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const skip = (page - 1) * limit;
      const params = {
        search: debouncedSearch || undefined,
        skip,
        take: limit,
        sortBy,
        sortOrder,
        ...serializeFiltersForApi(filters),
      };

      const res = await apiClient.get("/role", { params });

      return {
        roles: {
          data: res.data.data?.roles.data ?? [],
          total: res.data.data?.roles.total ?? 0,
          page: res.data.data?.roles.page ?? page,
          pageSize: res.data.data?.roles.pageSize ?? limit,
        },
      };
    },
    placeholderData: (old) => old,
  });
}

// export function useRoleList() {
//   return useQuery({
//     queryKey: ["roles"],
//     queryFn: async () => {
//       const res = await apiClient.get("/role", {
//         params: { skip: 0, take: 100 },
//       });

//       const roles =
//         res.data.data?.roles?.data?.map((m: any) => ({
//           label: m.name,
//           value: m.id,
//         })) ?? [];

//       return roles;
//     },

//   });
// }
export function useRoleList() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const res = await apiClient.get("/role", {
        params: { skip: 0, take: 100 },
      });

      return (
        res.data.data?.roles?.data?.map((r: any) => ({
          label: r.name,
          value: r.id,

          // ✅ FIXED (join table aware)
          departmentIds:
            r.departmentRoles?.map(
              (dr: any) => dr.department?.id
            ).filter(Boolean) ?? [],
        })) ?? []
      );
    },
  });
}



export function useRole(roleId: string) {
  return useQuery({
    queryKey: ["role", roleId],
    queryFn: async () => {
      const res = await apiClient.get(`/role/${roleId}`);
      return res.data.data.role;
    },
    enabled: !!roleId,
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateRoleInput) => {
      const res = await apiClient.post("/role", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Role created successfully");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create Role");
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      roleId,
      payload,
    }: {
      roleId: string;
      payload: UpdateRoleInput;
    }) => {

      const res = await apiClient.put(`/role/${roleId}`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Role updated successfully");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update role");
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roleId: string) => {
      const res = await apiClient.delete(`/role/${roleId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Role deleted");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete role");
    },
  });
}

export function useArchiveRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roleId: string) => {
      const res = await apiClient.patch(`/role/${roleId}/archive`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Role(s) archived");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to archive roles");
    },
  });
}

export function useRestoreRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roleId: string) => {
      const res = await apiClient.patch(`/role/${roleId}/restore`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Role(s) restored");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to restore roles");
    },
  });
}


export function useBulkArchiveRoles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roleIds: string[]) => {
      const res = await apiClient.patch("/role/bulk/archive", { roleIds });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Role(s) archived");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to archived roles");
    },
  });
}

export function useBulkRestoreRoles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roleIds: string[]) => {
      const res = await apiClient.patch("/role/bulk/restore", { roleIds });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Roles restored");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to restore roles");
    },
  });
}

export function useBulkDeleteRoles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roleIds: string[]) => {
      const res = await apiClient.delete("/role/bulk", { data: { roleIds } });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Roles deleted");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete roles");
    },
  });
}


// *********************** //
// Role Permission //
// *********************** //

export function useUpdateRolePermissionAccess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      roleId,
      permissionId,
      payload,
    }: {
      roleId: string;
      permissionId: string;
      payload: {
        accessLevel: "FULL" | "NONE" | "CONDITIONAL";
        conditions?: any;
        expression?: string | null;
      };
    }) => {
      const res = await apiClient.patch(
        `/role-permission/${roleId}/permissions/${permissionId}/access`,
        payload
      );
      return res.data;
    },

    // onSuccess: (_, variables) => {
    //   toast.success("Permission updated");
    //   queryClient.invalidateQueries({ queryKey: ["role", variables.roleId] });
    //   queryClient.invalidateQueries({ queryKey: ["roles"] });
    // },

    onSuccess: async (_, variables) => {
      toast.success("Permission updated");

      // 🔥 reload auth → useCan() update
      await loadMe();

      // tables
      queryClient.invalidateQueries({ queryKey: ["role", variables.roleId] });
      queryClient.invalidateQueries({ queryKey: ["roles"] });

      // 🔥 sidebar + SPA
      queryClient.invalidateQueries({ queryKey: ["modulesWithResources"] });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update permission");
    },
  });
}

export function useGrantAllModulePermissions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      roleId,
      moduleId,
    }: {
      roleId: string;
      moduleId: string;
    }) => {
      const res = await apiClient.patch(
        `/role-permission/${roleId}/modules/${moduleId}/grant-all`
      );
      return res.data;
    },

    // onSuccess: (_, variables) => {
    //   toast.success("All module permissions granted");
    //   queryClient.invalidateQueries({ queryKey: ["role", variables.roleId] });
    // },

    onSuccess: async (_, variables) => {
      toast.success("All module permissions granted");

      await loadMe(); // 🔥

      queryClient.invalidateQueries({ queryKey: ["role", variables.roleId] });
      queryClient.invalidateQueries({ queryKey: ["modulesWithResources"] }); // 🔥
    },


    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to grant module permissions"
      );
    },
  });
}

export function useRevokeAllModulePermissions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      roleId,
      moduleId,
    }: {
      roleId: string;
      moduleId: string;
    }) => {
      const res = await apiClient.patch(
        `/role-permission/${roleId}/modules/${moduleId}/revoke-all`
      );
      return res.data;
    },

    // onSuccess: (_, variables) => {
    //   toast.success("All module permissions revoked");
    //   queryClient.invalidateQueries({ queryKey: ["role", variables.roleId] });
    // },
    onSuccess: async (_, variables) => {
      toast.success("All module permissions revoked");

      await loadMe(); // 🔥

      queryClient.invalidateQueries({ queryKey: ["role", variables.roleId] });
      queryClient.invalidateQueries({ queryKey: ["modulesWithResources"] }); // 🔥
    },

    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to revoke module permissions"
      );
    },
  });
}

export function useRolePermissions(roleId: string) {
  return useQuery({
    queryKey: ["role-permissions", roleId],
    queryFn: async () => {
      const res = await apiClient.get(`/role-permission/${roleId}/permissions`);
      return res.data.data.permissions;
    },
    enabled: !!roleId,
  });
}
