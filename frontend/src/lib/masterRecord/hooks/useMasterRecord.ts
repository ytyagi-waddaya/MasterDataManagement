"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { serializeFiltersForApi } from "@/hooks/useServerDataTable";
import apiClient from "@/lib/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

export interface MasterRecordFilters {
  status?: "Draft" | "PendingApproval" | "Approved" | "Rejected" | "all";
  isActive?: "active" | "inactive" | "all";
  [key: string]: any;
}

export interface MasterRecordResponse<T> {
  data: T[];
  total: number;
}

// export function useRecords<T = any>({
//   masterObjectId,
//   page,
//   limit,
//   search,
//   filters = {},
//   sortBy,
//   sortOrder = "desc",
// }: {
//   masterObjectId?: string;
//   page: number;
//   limit: number;
//   search: string;
//   filters?: MasterRecordFilters;
//   sortBy?: string;
//   sortOrder?: "asc" | "desc";
// }) {
//   const debouncedSearch = useDebounce(search, 500);

//   const stableFilters = useMemo(() => JSON.stringify(filters), [filters]);

//   return useQuery<{
//     records: { data: T[]; total: number; page: number; pageSize: number };
//   }>({
//     queryKey: [
//       "records",
//       masterObjectId,
//       page,
//       limit,
//       debouncedSearch,
//       stableFilters,
//       sortBy,
//       sortOrder,
//     ],

//     enabled: !!masterObjectId, // prevent undefined ID crash

//     queryFn: async () => {
//       const skip = (page - 1) * limit;

//       const params = {
//         masterObjectId,
//         skip,
//         take: limit,
//         search: debouncedSearch || undefined,
//         sortBy,
//         sortOrder,
//         ...serializeFiltersForApi(filters),
//       };

//       const res = await apiClient.get("/master-record", { params });
//       console.log("MASTER Record:", res);

//       return {
//         records: {
//           data: res.data.data?.records.records ?? [],
//           total: res.data.data?.records.total ?? 0,
//           page: res.data.data?.records.page ?? page,
//           pageSize: res.data.data?.records.pageSize ?? limit,
//         },
//       };
//     },

//     placeholderData: (old) => old,
//   });
// }

// export function useResourceList() {
//   return useQuery({
//     queryKey: ["resources"],
//     queryFn: async () => {
//       const res = await apiClient.get("/resource", {
//         params: { skip: 0, take: 100 },
//       });

//       const resources =
//         res.data.data?.resources?.data?.map((m: any) => ({
//           label: m.name,
//           value: m.id,
//         })) ?? [];

//       return resources;
//     },

//   });
// }


export function useRecords<T = any>({
  masterObjectId,
  page,
  limit,
  search,
  filters = {},
  sortBy,
  sortOrder = "desc",
}: {
  masterObjectId?: string;
  page: number;
  limit: number;
  search: string;
  filters?: MasterRecordFilters;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const debouncedSearch = useDebounce(search, 500);
  const stableFilters = useMemo(() => JSON.stringify(filters), [filters]);

  return useQuery<{
    data: T[];
    total: number;
    page: number;
    pageSize: number;
  }>({
    queryKey: [
      "records",
      masterObjectId,
      page,
      limit,
      debouncedSearch,
      stableFilters,
      sortBy,
      sortOrder,
    ],

    enabled: !!masterObjectId,

    queryFn: async () => {
      const skip = (page - 1) * limit;

      const params = {
        masterObjectId,
        skip,
        take: limit,
        search: debouncedSearch || undefined,
        sortBy,
        sortOrder,
        ...serializeFiltersForApi(filters),
      };

      const res = await apiClient.get("/master-record", { params });
      console.log("MASTER Record:", res);

      const r = res?.data?.data?.records;

      return {
        data: r?.records ?? [],
        total: r?.total ?? 0,
        page: r?.page ?? page,
        pageSize: r?.pageSize ?? limit,
      };
    },

    placeholderData: (old) => old,
  });
}

export function useRecord(recordId: string) {
  return useQuery({
    queryKey: ["records", recordId],
    queryFn: async () => {
      const res = await apiClient.get(`/master-record/${recordId}`);
      return res.data.data.record;
    },

    enabled: !!recordId,
  });
}

export function useCreateRecord() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { masterObjectId: string; data: any }) => {
      const { data } = await apiClient.post("/master-record", payload);
      return data.record;
    },
    onSuccess: () => {
      toast.success("Master Record created successfully");
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to create Master Record"
      );
    },
  });
}

// export function useRecords({
//   masterObjectId,
//   page,
//   limit,
//   search,
//   filters,
//   sortBy,
//   sortOrder,
// }: {
//   masterObjectId?: string;
//   page: number;
//   limit: number;
//   search?: string;
//   filters?: any;
//   sortBy?: string;
//   sortOrder?: string;
// }) {
//   const enabled = !!masterObjectId;

//   return useQuery({
//     queryKey: ["records", { masterObjectId, page, limit, search, filters, sortBy, sortOrder }],
//     queryFn: async () => {
//       const res = await apiClient.get("/master-record", {
//         params: {
//           masterObjectId,
//           page,
//           limit,
//           search,
//           filters,
//           sortBy,
//           sortOrder,
//         },
//       });

//       return res.data;
//     },
//     enabled,
//   });
// }

// export function useUpdateRecord() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({
//       resourceId,
//       payload,
//     }: {
//       resourceId: string;
//       payload: UpdateResourceInput;
//     }) => {

//       const res = await apiClient.put(`/resource/${resourceId}`, payload);
//       return res.data;
//     },
//     onSuccess: () => {
//       toast.success("Resource updated successfully");
//       queryClient.invalidateQueries({ queryKey: ["resources"] });
//     },
//     onError: (err: any) => {
//       toast.error(err.response?.data?.message || "Failed to update Resource");
//     },
//   });
// }

export function useDeleteRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recordId: string) => {
      const res = await apiClient.delete(`/master-record/${recordId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Record deleted");
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete Record");
    },
  });
}

export function useArchiveRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recordId: string) => {
      const res = await apiClient.patch(`/master-record/${recordId}/archive`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Record(s) archived");
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to archive Records");
    },
  });
}

export function useRestoreRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recordId: string) => {
      const res = await apiClient.patch(`/master-record/${recordId}/restore`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Record(s) restored");
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to restore Record");
    },
  });
}
