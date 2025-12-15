import { createDataTableSlice } from "./dataTableFactory";


export const dataTableSlice = createDataTableSlice("dataTable");

export const {
  setPage,
  setPageSize,
  setSearch,
  setFilters,
  clearFilter,
  clearAllFilters,
  setSorting,
  setColumnVisibility,
  setTotal,
  resetTableState,
  setRowSelection,
  toggleRowSelection,
  clearRowSelection
} = dataTableSlice.actions;

export default dataTableSlice.reducer;
