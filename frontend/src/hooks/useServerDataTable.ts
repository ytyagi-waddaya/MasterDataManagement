"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setPage,
  setPageSize,
  setFilters as updateFilters,
  clearFilter,
  clearAllFilters,
  setSorting,
  setSearch,
} from "@/store/dataTableSlice";

export interface ServerFilter {
  [key: string]: any;
}

export interface UseServerDataTableOptions {
  pageSize?: number;
  initialFilters?: ServerFilter;
}

export function useServerDataTable({
  pageSize = 10,
  initialFilters = {},
}: UseServerDataTableOptions = {}) {
  const dispatch = useAppDispatch();

  const { page, pageSize: limit, search, filters, sorting, columnVisibility } =
    useAppSelector((state) => state.dataTable);

  // Only set defaults once (on first mount)
  useEffect(() => {
    dispatch(setPageSize(pageSize));
    if (Object.keys(initialFilters).length > 0) {
      dispatch(updateFilters(initialFilters));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    page,
    limit,
    search,
    filters,
    sorting,
    columnVisibility,

    // ACTIONS
    setPage: (p: number) => dispatch(setPage(p)),
    setLimit: (l: number) => dispatch(setPageSize(l)),
    setSearch: (s: string) => dispatch(setSearch(s)),
    setFilters: (f: ServerFilter) => dispatch(updateFilters(f)), // merge based update
    clearFilter: (key: string) => dispatch(clearFilter(key)),
    clearAllFilters: () => dispatch(clearAllFilters()),
    setSorting: (s: any) => dispatch(setSorting(s)),
  };
}

// Utility method to serialize filters for API
// export function serializeFiltersForApi(filters: Record<string, any>) {
//   const apiParams: Record<string, any> = {};

//   Object.entries(filters).forEach(([key, value]) => {
//     if (value === undefined || value === null || value === "all") return;

//     apiParams[key] = Array.isArray(value)
//       ? value.length === 1
//         ? value[0]
//         : value
//       : value;
//   });

//   return apiParams;
// }


export function serializeFiltersForApi(filters: Record<string, any>) {
  const apiParams: Record<string, any> = {};

  for (const [key, value] of Object.entries(filters)) {
    if (!value || value === "all") continue;

    // Handle created date range
    if (key === "createdRange") {
      const now = new Date();
      let from;

      if (value === "today") {
        from = new Date(now.setHours(0, 0, 0, 0));
      } else if (value === "last7") {
        from = new Date(now.setDate(now.getDate() - 7));
      } else if (value === "last30") {
        from = new Date(now.setDate(now.getDate() - 30));
      }

      apiParams["createdFrom"] = from?.toISOString().split("T")[0];
      apiParams["createdTo"] = new Date().toISOString().split("T")[0];
      continue;
    }

    apiParams[key] = value;
  }

  return apiParams;
}
