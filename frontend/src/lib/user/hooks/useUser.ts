"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { serializeFiltersForApi } from "@/hooks/useServerDataTable";
import apiClient from "@/lib/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import {
  CreateUserInput,
  UpdateUserInput,
  UserFilters,
} from "../schema/user-schema";

export function useUsers<T = any>({
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
  filters?: UserFilters;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const debouncedSearch = useDebounce(search, 500);
  const stableFilters = useMemo(() => JSON.stringify(filters), [filters]);

  return useQuery<{
    users: {
      data: T[];
      total: number;
      page: number;
      pageSize: number;
    };
  }>({
    queryKey: [
      "users",
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

      const res = await apiClient.get("/user", { params });

      return {
        users: {
          data: res.data.data?.users.data ?? [],
          total: res.data.data?.users.total ?? 0,
          page: res.data.data?.users.page ?? page,
          pageSize: res.data.data?.users.pageSize ?? limit,
        },
      };
    },
    placeholderData: (old) => old,
  });
}

// export function useUserList() {
//   return useQuery({
//     queryKey: ["users", "list"],
//     queryFn: async () => {
//       const res = await apiClient.get("/user", {
//         params: { skip: 0, take: 100 },
//       });
//   console.log("USERS:", res);
//       return (
//         res.data.data?.users?.data?.map((u: any) => ({
//           label: u.name,
//           value: u.id,
//         })) ?? []
//       );
//     },
//   });
// }
export function useUserList() {
  return useQuery({
    queryKey: ["users", "list"],
    queryFn: async () => {
      const res = await apiClient.get("/user", {
        params: { skip: 0, take: 100 },
      });

      return (
        res.data.data?.users?.data?.map((u: any) => ({
          value: u.id,
          label: u.name,
          email: u.email,

          // ✅ ADD THIS
          roleIds:
            u.roles?.map((r: any) => r.role?.id).filter(Boolean) ?? [],

          roleKeys:
            u.roles?.map((r: any) => r.role?.key).filter(Boolean) ?? [],

          roleNames:
            u.roles?.map((r: any) => r.role?.name).filter(Boolean) ?? [],
        })) ?? []
      );
    },
  });
}


export function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await apiClient.get(`/user/${userId}`);
      return res.data.data.user;
    },
    enabled: !!userId,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateUserInput) => {
      const res = await apiClient.post("/user", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User created successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create user");
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      payload,
    }: {
      userId: string;
      payload: UpdateUserInput;
    }) => {
      const res = await apiClient.put(`/user/${userId}`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update user");
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await apiClient.delete(`/user/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User deleted");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete user");
    },
  });
}

export function useArchiveUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await apiClient.patch(`/user/${userId}/archive`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User archived");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to archive user");
    },
  });
}

export function useRestoreUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await apiClient.patch(`/user/${userId}/restore`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User restored");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to restore user");
    },
  });
}

export function useBulkArchiveUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userIds: string[]) => {
      const res = await apiClient.patch("/user/bulk/archive", { userIds });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Users archived");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to archive users");
    },
  });
}

export function useBulkRestoreUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userIds: string[]) => {
      const res = await apiClient.patch("/user/bulk/restore", { userIds });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Users restored");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to restore users");
    },
  });
}

export function useBulkDeleteUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userIds: string[]) => {
      const res = await apiClient.delete("/user/bulk", { data: { userIds } });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Users deleted");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete users");
    },
  });
}

export function useUserStats() {
  return useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const res = await apiClient.get("/user/stats");
      return res.data.data;
    },
  });
}

export function useAssignUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      roleId,
    }: {
      userId: string;
      roleId: string;
    }) => {
      const res = await apiClient.post(
        `/user-role/${userId}/roles/${roleId}/assign`
      );
      return res.data;
    },

    onSuccess: (_, { userId }) => {
      toast.success("Role assigned");
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to assign role");
    },
  });
}

export function useRevokeUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      roleId,
    }: {
      userId: string;
      roleId: string;
    }) => {
      const res = await apiClient.delete(
        `/user-role/${userId}/roles/${roleId}/revoke`
      );
      return res.data;
    },

    onSuccess: (_, { userId }) => {
      toast.success("Role revoked");
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to revoke role");
    },
  });
}

export function useBulkAssignUserRoles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      roleIds,
    }: {
      userId: string;
      roleIds: string[];
    }) => {
      const res = await apiClient.post(
        `/user-role/${userId}/roles/bulk-assign`,
        { roleIds }
      );
      return res.data;
    },

    onSuccess: (_, { userId }) => {
      toast.success("Roles assigned to user");
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Bulk assign failed");
    },
  });
}

export function useBulkRevokeUserRoles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      roleIds,
    }: {
      userId: string;
      roleIds: string[];
    }) => {
      const res = await apiClient.post(
        `/user-role/${userId}/roles/bulk-revoke`,
        { roleIds }
      );
      return res.data;
    },

    onSuccess: (_, { userId }) => {
      toast.success("Roles removed from user");
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Bulk revoke failed");
    },
  });
}



export function useAssignUserDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      departmentId,
    }: {
      userId: string;
      departmentId: string;
    }) => {
      const res = await apiClient.post(
        `/user/${userId}/assign-department`,
        { departmentId }
      );
      return res.data;
    },

    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });
}


export function useRemoveUserDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      departmentIds,
    }: {
      userId: string;
      departmentIds: string[];
    }) => {
      const res = await apiClient.delete(
        `/user/${userId}/remove-department`,
        {
          data: { departmentIds },
        }
      );

      return res.data;
    },

    onSuccess: (_, { userId }) => {
      toast.success("Department removed");
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
