"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/apiClient";
import { toast } from "sonner";
import { UpdateMasterObjectInput } from "../schema/masterObject.schema";
import { serializeFiltersForApi } from "@/hooks/useServerDataTable";
import { useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export interface MasterObjectFilters {
  status?: "active" | "inactive" | "all";
  [key: string]: any;
}

export interface MasterObjectResponse<T> {
  data: T[];
  total: number;
}

export function useMasterObjects<T = any>({
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
  filters?: MasterObjectFilters;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const debouncedSearch = useDebounce(search, 500);
  const stableFilters = useMemo(() => JSON.stringify(filters), [filters]);

  return useQuery<{
    masterObjects: {
      data: T[];
      total: number;
      page: number;
      pageSize: number;
    };
  }>({
    queryKey: [
      "masterObjects",
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

      const res = await apiClient.get("/master-object", { params });

      return {
        masterObjects: {
          data: res.data.data?.masterObjects.data ?? [],
          total: res.data.data?.masterObjects.total ?? 0,
          page: res.data.data?.masterObjects.page ?? page,
          pageSize: res.data.data?.masterObjects.pageSize ?? limit,
        },
      };
    },
    placeholderData: (old) => old,
  });
}

export function useMasterObjectForEditor(masterObjectId: string) {
  return useQuery({
    queryKey: ["masterObject", "editor", masterObjectId],
    enabled: !!masterObjectId,
    queryFn: async () => {
      const masterObject = await fetchMasterObject(masterObjectId);

      const latestSchema = masterObject.schemas?.[0] ?? null;

      return {
        ...masterObject,
        activeSchema: latestSchema,
        hasSchema: Boolean(latestSchema),
      };
    },
  });
}

export function useMasterObjectForRuntime(masterObjectId: string) {
  return useQuery({
    queryKey: ["masterObject", "runtime", masterObjectId],
    enabled: !!masterObjectId,
    staleTime: 60 * 1000,

    queryFn: async () => {
      const masterObject = await fetchMasterObject(masterObjectId);

      const publishedSchema = masterObject.schemas.find(
        (s: any) => s.status === "PUBLISHED"
      );

      return {
        ...masterObject,
        activeSchema: publishedSchema ?? null,
        isRunnable: Boolean(publishedSchema),
      };
    },
  });
}

export function useUpdateMasterObject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      masterObjectId,
      payload,
    }: {
      masterObjectId: string;
      payload: UpdateMasterObjectInput;
    }) => {
      console.log("MasterobjectId:", masterObjectId);
      console.log("Payload Object:", payload);

      const res = await apiClient.put(
        `/master-object/${masterObjectId}`,
        payload
      );
      return res.data;
    },

    onSuccess: (data) => {
      const status = data?.schema?.status;

      toast.success(
        status === "PUBLISHED"
          ? "Schema published successfully"
          : "Schema saved successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["masterObject", data?.id],
      });
    },

    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Failed to update Master Object"
      );
    },
  });
}

export function useDeleteMasterObject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (masterObjectId: string) => {
      const res = await apiClient.delete(`/master-object/${masterObjectId}`);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Master Object deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["masterObject"] });
    },

    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to delete Master Object"
      );
    },
  });
}

export function useArchiveMasterObject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (masterObjectId: string) => {
      const res = await apiClient.delete(
        `/master-object/${masterObjectId}/archive`
      );
      return res.data;
    },

    onSuccess: () => {
      toast.success("Master Object archived successfully");
      queryClient.invalidateQueries({ queryKey: ["masterObject"] });
    },

    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to archive Master Object"
      );
    },
  });
}

export function useRestoreMasterObject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (masterObjectId: string) => {
      const res = await apiClient.delete(
        `/master-object/${masterObjectId}/restore`
      );
      return res.data;
    },

    onSuccess: () => {
      toast.success("Master Object restored successfully");
      queryClient.invalidateQueries({ queryKey: ["masterObject"] });
    },

    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to restore Master Object"
      );
    },
  });
}

export function useResourceWithMasterObject(id: string) {
  return useQuery({
    queryKey: ["resource-with-masterobject", id],
    queryFn: async () => {
      const res = await apiClient.get(`/resources/${id}`);
      return res.data;
    },
  });
}

export function useCreateMasterObject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, fields }: { name: string; fields: any }) => {
      const res = await apiClient.put(`/master-object/`);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Master Object updated successfully");
      queryClient.invalidateQueries({ queryKey: ["masterObject"] });
    },

    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to update Master Object"
      );
    },
  });
}

// Base fetch (internal)
async function fetchMasterObject(masterObjectId: string) {
  const res = await apiClient.get(`/master-object/${masterObjectId}`);
  return res.data.data.masterObject;
}

/**
 * OPTIONAL: FETCH LIST (if needed later)
 * ------------------------------------------------------------------
 */
// export function useMasterObjects() {
//   return useQuery({
//     queryKey: ["masterObjects"],
//     queryFn: async () => {
//       const res = await apiClient.get(`/master-object`, {
//         params: { skip: 0, take: 100 },
//       });

//       return res.data.data.masterObjects ?? [];
//     },
//   });
// }

// export function useMasterObjects<T = any>({
//   page,
//   limit,
//   search,
//   filters = {},
//   sortBy,
//   sortOrder = "desc",
// }: {
//   page: number;
//   limit: number;
//   search: string;
//   filters?: MasterObjectFilters;
//   sortBy?: string;
//   sortOrder?: "asc" | "desc";
// }) {
//   const debouncedSearch = useDebounce(search, 500);

//   // Make filters stable as a string (important!)
//   const stableFilters = useMemo(() => JSON.stringify(filters), [filters]);

//   return useQuery<{
//     masterObjects: {
//       data: T[];
//       total: number;
//       page: number;
//       pageSize: number;
//     };
//   }>({
//     queryKey: [
//       "masterObjects",
//       page,
//       limit,
//       debouncedSearch,
//       stableFilters,
//       sortBy,
//       sortOrder,
//     ],

//     queryFn: async () => {
//       const skip = (page - 1) * limit;

//       const params = {
//         search: debouncedSearch || undefined,
//         skip,
//         take: limit,
//         sortBy,
//         sortOrder,
//         // serialize AFTER memo so it stays stable
//         ...serializeFiltersForApi(JSON.parse(stableFilters)),
//       };

//       const res = await apiClient.get("/master-object", { params });

//       const m = res.data?.data?.masterObjects ?? {};
// console.log("MasterObject:", m);

//       return {
//         masterObjects: {
//           data: m.data ?? [],
//           total: m.total ?? 0,
//           page: m.page ?? page,
//           pageSize: m.pageSize ?? limit,
//         },
//       };
//     },

//     placeholderData: (old) => old,
//   });
// }

// export function useMasterObject(masterObjectId: string) {
//   return useQuery({
//     queryKey: ["masterObject", masterObjectId],
//     queryFn: async () => {
//       const res = await apiClient.get(`/master-object/${masterObjectId}`);
//       return res.data.data.masterObject;
//     },
//     enabled: !!masterObjectId,
//   });
// }

// if (!data?.isRunnable) {
//   return <EmptyState message="Schema not published yet" />;
// }
