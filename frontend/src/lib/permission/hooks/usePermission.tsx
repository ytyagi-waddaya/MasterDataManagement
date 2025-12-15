"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { serializeFiltersForApi } from "@/hooks/useServerDataTable";
import apiClient from "@/lib/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import {
  UpdatePermissionConditionInput,
  UpdatePermissionInput,
} from "../schema/permission-schema";

export interface PermissionFilters {
  status?: "active" | "inactive" | "all";
  [key: string]: any;
}

export interface PermissionResponse<T> {
  data: T[];
  total: number;
}

interface PermissionItem {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  isSystem: boolean;
  [key: string]: any;
}

export function usePermissions<T = any>({
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
  filters?: PermissionFilters;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const debouncedSearch = useDebounce(search, 500);
  const stableFilters = useMemo(() => JSON.stringify(filters), [filters]);

  return useQuery<{
    permissions: {
      data: T[];
      total: number;
      page: number;
      pageSize: number;
    };
  }>({
    queryKey: [
      "permissions",
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

      const res = await apiClient.get("/permission", { params });

      console.log("RESULT:", res);
      
      return {
        permissions: {
          data: res.data.data?.permissions.data ?? [],
          total: res.data.data?.permissions.total ?? 0,
          page: res.data.data?.permissions.page ?? page,
          pageSize: res.data.data?.permissions.pageSize ?? limit,
        },
      };
    },
    placeholderData: (old) => old,
  });
}

export function usePermission(permissionId: string) {
  return useQuery({
    queryKey: ["permission", permissionId],
    queryFn: async () => {
      if (!permissionId) return null;

      const res = await apiClient.get(`/permission/${permissionId}`);
      return res.data.data;
    },
    enabled: !!permissionId,
  });
}

export function useGeneratePermissions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.post("/permission/generate");
      return res.data;
    },
    onSuccess: () => {
      toast.success("Permissions generated successfully");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to generate permissions");
    },
  });
}

export function useUpdatePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      permissionId,
      payload,
    }: {
      permissionId: string;
      payload: UpdatePermissionInput;
    }) => {
      const res = await apiClient.put(`/permission/${permissionId}`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Permission updated successfully");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update permission");
    },
  });
}

export function useDeletePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (permissionId: string) => {
      const res = await apiClient.delete(`/permission/${permissionId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Permission deleted");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete permission");
    },
  });
}

export function useArchivePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (permissionId: string) => {
      const res = await apiClient.patch(`/permission/${permissionId}/archive`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Permission(s) archived");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to archive permissions"
      );
    },
  });
}

export function useRestorePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (permissionId: string) => {
      const res = await apiClient.patch(`/permission/${permissionId}/restore`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Permission(s) restored");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to restore permissions"
      );
    },
  });
}

export function useBulkArchivePermissions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (permissionIds: string[]) => {
      const res = await apiClient.patch("/permission/bulk/archive", {
        permissionIds,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Permission(s) archived");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to archived permissions"
      );
    },
  });
}

export function useBulkRestorePermissions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (permissionIds: string[]) => {
      const res = await apiClient.patch("/permission/bulk/restore", {
        permissionIds,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Permissions restored");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to restore permissions"
      );
    },
  });
}

export function useBulkDeletePermissions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (permissionIds: string[]) => {
      const res = await apiClient.delete("/permission/bulk", {
        data: { permissionIds },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Permissions deleted");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to delete permissions"
      );
    },
  });
}

export function usePermissionsByRole(roleId?: string) {
  return useQuery<{ permissions: PermissionItem[] }>({
    queryKey: ["permissions-by-role", roleId],

    queryFn: async () => {
      if (!roleId) return { permissions: [] };

      const res = await apiClient.get(`/permission/by-role/${roleId}`);
      return { permissions: res.data.data?.permissions ?? [] };
    },

    enabled: !!roleId,

    meta: {
      onError: (err: any) => {
        toast.error(
          err.response?.data?.message || "Failed to fetch permissions by role"
        );
      },
    },
  });
}

export function usePermissionsByResource(resourceId?: string) {
  return useQuery<{ permissions: PermissionItem[] }>({
    queryKey: ["permissions-by-resource", resourceId],

    queryFn: async () => {
      if (!resourceId) return { permissions: [] };

      const res = await apiClient.get(`/permission/by-resource/${resourceId}`);
      return { permissions: res.data.data?.permissions ?? [] };
    },

    enabled: !!resourceId,

    meta: {
      onError: (err: any) => {
        toast.error(
          err.response?.data?.message ||
            "Failed to fetch permissions by resource"
        );
      },
    },
  });
}

export function usePermissionsByAction(actionId?: string) {
  return useQuery<{ permissions: PermissionItem[] }>({
    queryKey: ["permissions-by-action", actionId],

    queryFn: async () => {
      if (!actionId) return { permissions: [] };

      const res = await apiClient.get(`/permission/by-action/${actionId}`);
      return { permissions: res.data.data?.permissions ?? [] };
    },

    enabled: !!actionId,

    meta: {
      onError: (err: any) => {
        toast.error(
          err.response?.data?.message || "Failed to fetch permissions by action"
        );
      },
    },
  });
}

export function useUpdatePermissionCondition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      permissionId,
      payload,
    }: {
      permissionId: string;
      payload: UpdatePermissionConditionInput; 
    }) => {
      const res = await apiClient.put(
        `/permission/${permissionId}/condition`,
        payload,
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Permission condition updated successfully");
      queryClient.invalidateQueries({ queryKey: ["permission"] });
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message ||
          "Failed to update permission condition"
      );
    },
  });
}

export function useAssignPermissionsToRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      roleId,
      permissionIds,
    }: {
      roleId: string;
      permissionIds: string[];
    }) => {
      const res = await apiClient.post(`/permission/assign-to-role`, {
        roleId,
        permissionIds,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Permissions assigned to role successfully");
      queryClient.invalidateQueries({ queryKey: ["permissions-by-role"] });
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message ||
          "Failed to assign permissions to role"
      );
    },
  });
}
