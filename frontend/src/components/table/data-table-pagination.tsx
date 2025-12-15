"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setPage, setPageSize } from "@/store/dataTableSlice";
import { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table?: Table<TData>;
  rowSelection?: Record<string, boolean>;
}

export function DataTablePagination<TData>({
  table,
  rowSelection,
}: DataTablePaginationProps<TData>) {
  const dispatch = useDispatch<AppDispatch>();
  const { page, pageSize, total } = useSelector(
    (state: RootState) => state.dataTable
  );

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const selectedCount = React.useMemo(() => {
    if (rowSelection) return Object.values(rowSelection).filter(Boolean).length;
    if (table) return table.getSelectedRowModel().rows.length;
    return 0;
  }, [rowSelection, table]);

  const goToPage = (newPage: number) => {
    if (newPage < 1) newPage = 1;
    if (newPage > totalPages) newPage = totalPages;
    dispatch(setPage(newPage));
  };

  const changePageSize = (newSize: number) => {
    dispatch(setPageSize(newSize));
    dispatch(setPage(1)); // Reset to first page
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-2 gap-4">
      <div className="text-sm text-muted-foreground w-full sm:w-auto">
        {/* {selectedCount} selected */}
        {selectedCount} of {pageSize} row(s) selected.
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {/* Rows per page selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm whitespace-nowrap">Rows per page</span>
          <Select
            value={`${pageSize}`}
            onValueChange={(v) => changePageSize(Number(v))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 50, 100].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pagination buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 hidden sm:flex"
            disabled={page === 1}
            onClick={() => goToPage(1)}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm sm:hidden px-2">
            {page} / {totalPages}
          </span>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={page === totalPages}
            onClick={() => goToPage(page + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0 hidden sm:flex"
            disabled={page === totalPages}
            onClick={() => goToPage(totalPages)}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>

          <div className="hidden sm:flex text-sm">
            Page {page} of {totalPages}
          </div>
        </div>
      </div>
    </div>
  );
}
