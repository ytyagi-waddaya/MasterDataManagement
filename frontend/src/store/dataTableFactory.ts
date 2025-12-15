import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Draft } from "immer";

export interface ServerFilter {
  [key: string]: any;
}

export interface SortingState<ColumnId extends string = string> {
  id: ColumnId;
  desc: boolean;
}

export interface DataTableState<ColumnId extends string = string> {
  page: number;
  pageSize: number;
  search: string;
  filters: ServerFilter;
  sorting: SortingState<ColumnId>[];
  columnVisibility: Record<string, boolean>;
  total: number;
  rowSelection: Record<string, boolean>;
}

export const createInitialDataTableState = <
  ColumnId extends string = string
>(): DataTableState<ColumnId> => ({
  page: 1,
  pageSize: 10,
  search: "",
  filters: {},
  sorting: [],
  columnVisibility: {},
  rowSelection: {},
  total: 0,
});

export const createDataTableSlice = <ColumnId extends string = string>(
  name: string
) => {
  const initialState = createInitialDataTableState<ColumnId>();

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      setPage(state, action: PayloadAction<number>) {
        state.page = action.payload;
      },
      setPageSize(state, action: PayloadAction<number>) {
        state.pageSize = action.payload;
        state.page = 1;
      },
      setSearch(state, action: PayloadAction<string>) {
        state.search = action.payload;
        state.page = 1;
      },
      setFilters(state, action: PayloadAction<ServerFilter>) {
        state.filters = { ...state.filters, ...action.payload };
        state.page = 1;
      },
      clearFilter(state, action: PayloadAction<string>) {
        delete state.filters[action.payload];
        state.page = 1;
      },
      clearAllFilters(state) {
        state.filters = {};
        state.page = 1;
      },
      setSorting(state, action: PayloadAction<SortingState<ColumnId>[]>) {
        // Cast to Draft to satisfy Immer typing
        state.sorting = action.payload as Draft<SortingState<ColumnId>>[];
        state.page = 1;
      },
      setColumnVisibility(
        state,
        action: PayloadAction<Record<string, boolean>>
      ) {
        state.columnVisibility = action.payload;
      },
      setTotal(state, action: PayloadAction<number>) {
        state.total = action.payload;
      },
      setRowSelection(state, action: PayloadAction<Record<string, boolean>>) {
        state.rowSelection = action.payload;
      },
      toggleRowSelection(state, action: PayloadAction<string>) {
        state.rowSelection[action.payload] =
          !state.rowSelection[action.payload];
      },
      clearRowSelection(state) {
        state.rowSelection = {};
      },
      resetTableState(state) {
        return initialState;
      },
    },
  });

  return slice;
};
