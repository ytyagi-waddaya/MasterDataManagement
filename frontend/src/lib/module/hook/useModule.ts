"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { serializeFiltersForApi } from "@/hooks/useServerDataTable";
import apiClient from "@/lib/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import { CreateModuleInput, UpdateModuleInput } from "../schema/module-schema";
import { moduleQueryKeys } from "@/lib/queryKeys/modules";


export interface ModuleFilters {
  status?: "active" | "inactive" | "all";
  [key: string]: any;
}

export interface ModuleResponse<T> {
  data: T[];
  total: number;
}

export function useModules<T = any>({
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
  filters?: ModuleFilters;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const debouncedSearch = useDebounce(search, 500);
  const stableFilters = useMemo(() => JSON.stringify(filters), [filters]);

  return useQuery<{
    modules: {
      data: T[];
      total: number;
      page: number;
      pageSize: number;
    };
  }>({
    queryKey: moduleQueryKeys.list ({
      page,
      limit,
      search:debouncedSearch,
      filters:stableFilters,
      sortBy,
      sortOrder,
    }),

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

      const res = await apiClient.get("/module", { params });

      return {
        modules: {
          data: res.data.data?.modules?.data ?? [],
          total: res.data.data?.modules?.total ?? 0,
          page: res.data.data?.modules?.page ?? page,
          pageSize: res.data.data?.modules?.pageSize ?? limit,
        },
      };
    },

    placeholderData: (old) => old,
  });
}

export function useModuleList() {
  return useQuery({
    queryKey: ["modules"],
    queryFn: async () => {
      const res = await apiClient.get("/module", {
        params: { skip: 0, take: 100 }, 
      });

      const modules =
        res.data.data?.modules?.data?.map((m: any) => ({
          label: m.name,
          value: m.id,
        })) ?? [];

      return modules;
    },

  });
}

export function useCreateModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateModuleInput) => {
      const res = await apiClient.post("/module", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Module created successfully");
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create module");
    },
  });
}

export function useModuleswithresources() {
  return useQuery({
    queryKey: ["modulesWithResources"],
    queryFn: async () => {
      const res = await apiClient.get("/module/modules-with-resources");
      return res.data.data;
    },
  });
}

export function useUpdateModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      moduleId,
      payload,
    }: {
      moduleId: string;
      payload: UpdateModuleInput;
    }) => {
      const res = await apiClient.put(`/module/${moduleId}`, payload);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Module updated successfully");
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update module");
    },
  });
}


export function useDeleteModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (moduleId: string) => {
      const res = await apiClient.delete(`/module/${moduleId}`);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Module deleted");
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete module");
    },
  });
}


export function useArchiveModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (moduleId: string) => {
      const res = await apiClient.patch(`/module/${moduleId}/archive`);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Module archived");
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to archive module");
    },
  });
}


export function useRestoreModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (moduleId: string) => {
      const res = await apiClient.patch(`/module/${moduleId}/restore`);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Module restored");
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to restore module");
    },
  });
}

export function useBulkArchiveModules() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (moduleIds: string[]) => {
      const res = await apiClient.patch("/module/bulk/archive", {
        moduleIds,
      });
      return res.data;
    },

    onSuccess: () => {
      toast.success("Modules archived");
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to archive modules");
    },
  });
}

export function useBulkRestoreModules() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (moduleIds: string[]) => {
      const res = await apiClient.patch("/module/bulk/restore", { moduleIds });
      return res.data;
    },

    onSuccess: () => {
      toast.success("Modules restored");
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to restore modules");
    },
  });
}

export function useBulkDeleteModules() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (moduleIds: string[]) => {
      const res = await apiClient.delete("/module/bulk", {
        data: { moduleIds },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Modules deleted");
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete modules");
    },
  });
}
