"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { serializeFiltersForApi } from "@/hooks/useServerDataTable";
import apiClient from "@/lib/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import { CreateActionInput, UpdateActionInput } from "../schema/action-schema";

export interface ActionFilters {
  status?: "active" | "inactive" | "all";
  [key: string]: any;
}

export interface ActionResponse<T> {
  data: T[];
  total: number;
}

export function useActions<T = any>({
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
  filters?: ActionFilters;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const debouncedSearch = useDebounce(search, 500);
  const stableFilters = useMemo(() => JSON.stringify(filters), [filters]);

  return useQuery<{
    actions: {
      data: T[];
      total: number;
      page: number;
      pageSize: number;
    };
  }>({
    queryKey: [
    "actions",
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

      const res = await apiClient.get("/action", { params });
      
      return {
        actions: {
          data: res.data.data?.actions.data ?? [],
          total: res.data.data?.actions.total ?? 0,
          page: res.data.data?.actions.page ?? page,
          pageSize: res.data.data?.actions.pageSize ?? limit,
        },
      };
    },
    placeholderData: (old) => old,
  });
}

export function useActionList() {
  return useQuery({
    queryKey: ["actions"],
    queryFn: async () => {
      const res = await apiClient.get("/action", {
        params: { skip: 0, take: 100 }, 
      });

      const actions =
        res.data.data?.actions?.data?.map((m: any) => ({
          label: m.name,
          value: m.id,
        })) ?? [];

      return actions;
    },

  });
}

export function useCreateAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateActionInput) => {
      const res = await apiClient.post("/action", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Action created successfully");
      queryClient.invalidateQueries({ queryKey: ["actions"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create Action");
    },
  });
}

export function useUpdateAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      actionId,
      payload,
    }: {
      actionId: string;
      payload: UpdateActionInput;
    }) => {
      
      const res = await apiClient.put(`/action/${actionId}`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Action updated successfully");
      queryClient.invalidateQueries({ queryKey: ["actions"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update Action");
    },
  });
}

export function useDeleteAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (actionId: string) => {
      const res = await apiClient.delete(`/action/${actionId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Action deleted");
      queryClient.invalidateQueries({ queryKey: ["actions"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete Action");
    },
  });
}

export function useArchiveAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (actionId: string) => {
      const res = await apiClient.patch(`/action/${actionId}/archive`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Action(s) archived");
      queryClient.invalidateQueries({ queryKey: ["actions"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to archive Actions");
    },
  });
}

export function useRestoreAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (actionId: string) => {
      const res = await apiClient.patch(`/action/${actionId}/restore`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Action(s) restored");
      queryClient.invalidateQueries({ queryKey: ["actions"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to restore Actions");
    },
  });
}

// export function useBulkCreateActions() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (payload: Array<{ name: string; description?: string }>) => {
//       const res = await apiClient.post("/action/bulk", { actions: payload });
//       return res.data;
//     },
//     onSuccess: () => {
//       toast.success("Actions created");
//       queryClient.invalidateQueries({ queryKey: ["actions"] });
//     },
//     onError: (err: any) => {
//       toast.error(err.response?.data?.message || "Failed to bulk create Actions");
//     },
//   });
// }

export function useBulkArchiveActions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ActionIds: string[]) => {
      const res = await apiClient.patch("/action/bulk/archive", { ActionIds });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Action(s) archived");
      queryClient.invalidateQueries({ queryKey: ["actions"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to archived Actions");
    },
  });
}

export function useBulkRestoreActions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ActionIds: string[]) => {
      const res = await apiClient.patch("/action/bulk/restore", { ActionIds });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Actions restored");
      queryClient.invalidateQueries({ queryKey: ["actions"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to restore Actions");
    },
  });
}

export function useBulkDeleteActions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ActionIds: string[]) => {
      const res = await apiClient.delete("/action/bulk", { data: { ActionIds } });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Actions deleted");
      queryClient.invalidateQueries({ queryKey: ["actions"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete Actions");
    },
  });
}

