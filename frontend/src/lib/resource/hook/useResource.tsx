"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { serializeFiltersForApi } from "@/hooks/useServerDataTable";
import apiClient from "@/lib/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import {
  CreateResourceInput,
  UpdateResourceInput,
} from "../schema/resource-schema";

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
      console.log("RESOURCE:", res);

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
      console.log("RESOURCES:", res);
      return res.data.data.resource;
    },

    enabled: !!resourceId,
  });
}

export function useResourceFields(resourceKey: string) {
  return useQuery({
    queryKey: ["resource", resourceKey],
    queryFn: async () => {
      const res = await apiClient.get(`/resource/${resourceKey}/fields`);
      console.log("RESOURCES:", res);
      return res.data.data.resource;
    },

    enabled: !!resourceKey,
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
      const res = await apiClient.patch("/resource/bulk/archive", {
        ResourceIds,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Resource(s) archived");
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to archived Resources",
      );
    },
  });
}

export function useBulkRestoreResources() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ResourceIds: string[]) => {
      const res = await apiClient.patch("/resource/bulk/restore", {
        ResourceIds,
      });
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
      const res = await apiClient.delete("/resource/bulk", {
        data: { ResourceIds },
      });
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

// export function useReferenceData(fieldId?: string, parentValue?: string) {
//   return useQuery({
//     queryKey: ["reference-data", fieldId, parentValue],
//     enabled: !!fieldId,
//     queryFn: async () => {
//       console.log("Field Id:", fieldId);

//       const res = await apiClient.get(`/resource/by-field/${fieldId}`, {
//         params: parentValue ? { parentValue } : undefined,
//       });
// console.log("Field Id:", res);
//       const records =
//         res.data.data?.map((r: any) => ({
//           label: r.data?.name ?? r.code, // adjust display logic
//           value: r.id,
//           raw: r,
//         })) ?? [];

//       return records;
//     },
//   });
// }

export function useReferenceData(fieldId?: string, parentValue?: string) {
  return useQuery({
    queryKey: ["reference-data", fieldId, parentValue],
    enabled: !!fieldId,
    queryFn: async () => {
      const res = await apiClient.get(`/resource/by-field/${fieldId}`, {
        params: parentValue ? { parentValue } : undefined,
      });

      const values: string[] = res.data?.data ?? [];

      return values.map((v) => ({
        label: v,
        value: v,
      }));
    },
  });
}

export function useReferenceSearch(fieldId?: string, query?: string) {
  return useQuery({
    queryKey: ["reference-search", fieldId, query],
    enabled: !!fieldId && !!query && query.length > 0,
    queryFn: async () => {
      const res = await apiClient.get(`/resource/${fieldId}/search`, {
        params: { q: query },
      });

      const options =
        res.data.data?.map((r: any) => ({
          label: r.stringValue,
          value: r.recordId,
        })) ?? [];

      return options;
    },
  });
}

export function useValidateReference() {
  return useMutation({
    mutationFn: async (payload: { fieldId: string; value: string }) => {
      const res = await apiClient.post(
        `/resource/${payload.fieldId}/validate`,
        { value: payload.value },
      );

      return res.data.data as boolean;
    },
  });
}

export function useReference(
  fieldId?: string,
  options?: {
    parentValue?: string;
    search?: string;
  },
) {
  return useQuery({
    queryKey: ["reference", fieldId, options],
    enabled: !!fieldId,
    queryFn: async () => {
      const url = options?.search
        ? `/resource/${fieldId}/search`
        : `/resource/${fieldId}`;

      const params = options?.search
        ? { q: options.search }
        : options?.parentValue
          ? { parentValue: options.parentValue }
          : undefined;

      const res = await apiClient.get(url, { params });
      return res.data.data ?? [];
    },
  });
}



export function useResourceSchema(resource?: string) {
  return useQuery({
    queryKey: ["resource-schema", resource],
    enabled: !!resource,
    queryFn: async () => {
      const res = await apiClient.get(`/resource/${resource}/schema`);
      const payload = res.data?.data;

      const schema = payload.schema;
      const sections = schema.layout.sections ?? [];
      const fieldDefinitions = schema.fieldDefinitions ?? [];

      // 🔥 FLATTEN fields in layout order
      const fields = sections
        .flatMap((section: any) => section.nodes ?? [])
        .filter((node: any) => node.kind === "FIELD")
        .map((node: any) =>
          fieldDefinitions.find((f: any) => f.key === node.field.key),
        )
        .filter(Boolean); // remove undefined

      return {
        schema,
        sections,
        fields, // 👈 flattened + ordered
      };
    },
  });
}
