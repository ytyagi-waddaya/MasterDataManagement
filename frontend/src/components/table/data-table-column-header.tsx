
"use client";

import React from "react";
import { Column, Table, ColumnSort } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  table: Table<TData>; // Pass table instance
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  table,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  // Get sorting state from the table
  const sortingState: ColumnSort[] = table.getState().sorting;

  const columnSort = sortingState.find((s) => s.id === column.id);
  const sorted: "asc" | "desc" | false = columnSort
    ? columnSort.desc
      ? "desc"
      : "asc"
    : false;

  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn("font-medium", className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 -ml-3 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {sorted === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : sorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          {column.getCanSort() && (
            <>
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <ArrowUp className="mr-2 h-4 w-4" /> Ascending
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <ArrowDown className="mr-2 h-4 w-4" /> Descending
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => column.clearSorting()}>
                <ChevronsUpDown className="mr-2 h-4 w-4" /> Clear Sorting
              </DropdownMenuItem>

              <DropdownMenuSeparator />
            </>
          )}

          {column.getCanHide() && (
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <EyeOff className="mr-2 h-4 w-4" />
              Hide Column
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
