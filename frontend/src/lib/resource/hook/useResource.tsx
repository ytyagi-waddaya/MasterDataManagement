"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { serializeFiltersForApi } from "@/hooks/useServerDataTable";
import apiClient from "@/lib/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import { CreateResourceInput, UpdateResourceInput } from "../schema/resource-schema";

export interface ResourceFilters {
  status?: "active" | "inactive" | "all";
  [key: string]: any;
}

export interface ResourceResponse<T> {
  data: T[];
  total: number;
}

export function useResources<T = any>({
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
  filters?: ResourceFilters;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const debouncedSearch = useDebounce(search, 500);
  const stableFilters = useMemo(() => JSON.stringify(filters), [filters]);

  return useQuery<{
    resources: {
      data: T[];
      total: number;
      page: number;
      pageSize: number;
    };
  }>({
    queryKey: [
      "resources",
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

      const res = await apiClient.get("/resource", { params });
      
      return {
        resources: {
          data: res.data.data?.resources.data ?? [],
          total: res.data.data?.resources.total ?? 0,
          page: res.data.data?.resources.page ?? page,
          pageSize: res.data.data?.resources.pageSize ?? limit,
        },
      };
    },
    placeholderData: (old) => old,
  });
}

export function useResourceList() {
  return useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const res = await apiClient.get("/resource", {
        params: { skip: 0, take: 100 }, 
      });

      const resources =
        res.data.data?.resources?.data?.map((m: any) => ({
          label: m.name,
          value: m.id,
        })) ?? [];

      return resources;
    },

  });
}

export function useResource(resourceId: string) {
  return useQuery({
    queryKey: ["resource", resourceId],
    queryFn: async () => {
      const res = await apiClient.get(`/resource/${resourceId}`);
      return res.data.data.resource;
    },
    
    enabled: !!resourceId, 
  });
}

export function useCreateResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateResourceInput) => {
      const res = await apiClient.post("/resource", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Resource created successfully");
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create Resource");
    },
  });
}

export function useUpdateResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      resourceId,
      payload,
    }: {
      resourceId: string;
      payload: UpdateResourceInput;
    }) => {
      
      const res = await apiClient.put(`/resource/${resourceId}`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Resource updated successfully");
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update Resource");
    },
  });
}

export function useDeleteResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resourceId: string) => {
      const res = await apiClient.delete(`/resource/${resourceId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Resource deleted");
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete Resource");
    },
  });
}

export function useArchiveResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resourceId: string) => {
      const res = await apiClient.patch(`/resource/${resourceId}/archive`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Resource(s) archived");
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to archive Resources");
    },
  });
}

export function useRestoreResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resourceId: string) => {
      const res = await apiClient.patch(`/resource/${resourceId}/restore`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Resource(s) restored");
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to restore Resources");
    },
  });
}

// export function useBulkCreateResources() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (payload: Array<{ name: string; description?: string }>) => {
//       const res = await apiClient.post("/resource/bulk", { resources: payload });
//       return res.data;
//     },
//     onSuccess: () => {
//       toast.success("Resources created");
//       queryClient.invalidateQueries({ queryKey: ["resources"] });
//     },
//     onError: (err: any) => {
//       toast.error(err.response?.data?.message || "Failed to bulk create Resources");
//     },
//   });
// }

export function useBulkArchiveResources() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ResourceIds: string[]) => {
      const res = await apiClient.patch("/resource/bulk/archive", { ResourceIds });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Resource(s) archived");
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to archived Resources");
    },
  });
}

export function useBulkRestoreResources() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ResourceIds: string[]) => {
      const res = await apiClient.patch("/resource/bulk/restore", { ResourceIds });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Resources restored");
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to restore Resources");
    },
  });
}

export function useBulkDeleteResources() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ResourceIds: string[]) => {
      const res = await apiClient.delete("/resource/bulk", { data: { ResourceIds } });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Resources deleted");
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete Resources");
    },
  });
}


