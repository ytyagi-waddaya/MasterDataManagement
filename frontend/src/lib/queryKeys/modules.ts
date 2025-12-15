// src/lib/queryKeys/modules.ts
export const moduleQueryKeys = {
  all: ["modules"] as const,

  lists: () => [...moduleQueryKeys.all, "list"] as const,

  list: (params: {
    page: number;
    limit: number;
    search?: string;
    filters?: string;
    sortBy?: string;
    sortOrder?: string;
  }) =>
    [
      ...moduleQueryKeys.lists(),
      params.page,
      params.limit,
      params.search,
      params.filters,
      params.sortBy,
      params.sortOrder,
    ] as const,
};
