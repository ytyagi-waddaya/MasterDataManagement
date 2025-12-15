"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  setSorting,
  setSearch,
  setColumnVisibility,
  setRowSelection,
  setPage,
  setPageSize,
} from "@/store/dataTableSlice";

import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import { EmptyState } from "@/components/emptyState/emptyState";
import { DataTableSkeleton } from "./table-skeleton";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "./data-table-column-header";
import { BulkActionsBar } from "./BulkActionsBar";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  total: number;
  page: number;
  pageSize: number;
  search: string;
  filters?: any[];
  sorting?: SortingState;
  globalFilterPlaceholder?: string;
  className?: string;
  loading?: boolean;
  createButton?: React.ReactNode;
  rowClassName?: (row: TData) => string;
  // Add bulk action callbacks
  onBulkArchive?: (ids: string[]) => void;
  onBulkRestore?: (ids: string[]) => void;
  onBulkDelete?: (ids: string[]) => void;
}

export function DataTable<TData>({
  columns,
  data,
  total,
  page,
  pageSize,
  search,
  filters = [],
  globalFilterPlaceholder = "Search...",
  className,
  loading = false,
  createButton,
  rowClassName,
  onBulkArchive,
  onBulkRestore,
  onBulkDelete,
}: DataTableProps<TData>) {
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const columnVisibility = useSelector(
    (state: RootState) => state.dataTable.columnVisibility
  );
  const rowSelection = useSelector(
    (state: RootState) => state.dataTable.rowSelection
  );
  const sortingState = useSelector(
    (state: RootState) => state.dataTable.sorting
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sortingState,
      globalFilter: search,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex: page - 1, pageSize },
    },
    getRowId: (row: any) => row.id,
    manualSorting: true,
    manualPagination: true,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),

    // Handlers
    onRowSelectionChange: (updater) => {
      const newSelection =
        typeof updater === "function" ? updater(rowSelection) : updater;
      dispatch(setRowSelection(newSelection));
    },
    onSortingChange: (updater) =>
      dispatch(
        setSorting(
          typeof updater === "function" ? updater(sortingState) : updater
        )
      ),
    onGlobalFilterChange: (value) => dispatch(setSearch(value)),
    onColumnVisibilityChange: (updater) =>
      dispatch(
        setColumnVisibility(
          typeof updater === "function" ? updater(columnVisibility) : updater
        )
      ),
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex: page - 1, pageSize })
          : updater;
      if (newState.pageIndex !== undefined)
        dispatch(setPage(newState.pageIndex + 1));
      if (newState.pageSize !== undefined)
        dispatch(setPageSize(newState.pageSize));
    },

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const selectedRowsData = table
    .getSelectedRowModel()
    .rows.map((r) => r.original);
  const allSelectedInactive = selectedRowsData.every((row) => !row.isActive);
  const allSelectedActive = selectedRowsData.every((row) => row.isActive);

  const rows = table.getRowModel().rows;

  if (loading) {
    return (
      <DataTableSkeleton
        columnCount={columns.length}
        rowCount={pageSize}
        filterCount={filters.length}
        withPagination
        shrinkZero
      />
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <DataTableToolbar
        table={table}
        filters={filters}
        globalFilterPlaceholder={globalFilterPlaceholder}
        createButton={createButton}
      />

      <div className="rounded-md border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/40">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3 py-2 text-sm text-left font-medium "
                  >
                    {header.isPlaceholder ? null : header.column.id === // If this is the select column, render it as is (the checkbox)
                      "select" ? (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    ) : header.column.getCanSort() ? (
                      <DataTableColumnHeader
                        column={header.column}
                        table={table}
                        title={
                          typeof header.column.columnDef.header === "string"
                            ? header.column.columnDef.header
                            : ""
                        }
                      />
                    ) : (
                      <span>
                        {typeof header.column.columnDef.header === "string"
                          ? header.column.columnDef.header
                          : ""}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* <tbody>
            {rows.length ? (
              rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2 text-[15px]">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">
                  <EmptyState title="No Data Found" />
                </td>
              </tr>
            )}
          </tbody> */}
          <tbody>
            {rows.length ? (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(rowClassName ? rowClassName(row.original) : "")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-2 text-[15px]">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">
                  <EmptyState title="No Data Found" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <BulkActionsBar
        selectedRows={selectedRowsData}
        table={table}
        isActive={allSelectedInactive}
        onBulkArchive={onBulkArchive}
        onBulkRestore={onBulkRestore}
        onBulkDelete={onBulkDelete}
      />

      <DataTablePagination table={table} rowSelection={rowSelection} />
    </div>
  );
}
