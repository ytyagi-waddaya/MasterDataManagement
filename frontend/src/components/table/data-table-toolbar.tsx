"use client";

import React from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleX, Search } from "lucide-react";

import {
  DataTableFacetedFilter,
} from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

import { useDispatch, useSelector } from "react-redux";
import { setSearch, setPage, resetTableState } from "@/store/dataTableSlice";
import { RootState } from "@/store";
import { TableFilter } from "@/utils/filterType";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters?: TableFilter<any>[];
  globalFilterPlaceholder?: string;
  createButton?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  filters = [],
  globalFilterPlaceholder = "Search...",
  createButton,
}: DataTableToolbarProps<TData>) {
  const dispatch = useDispatch();

  const reduxSearch = useSelector((state: RootState) => state.dataTable.search);
  const reduxFilters = useSelector(
    (state: RootState) => state.dataTable.filters
  );

  const [localSearch, setLocalSearch] = React.useState(reduxSearch || "");

  React.useEffect(() => {
    setLocalSearch(reduxSearch || "");
  }, [reduxSearch]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setSearch(localSearch));
      dispatch(setPage(1));
    }, 450);
    return () => clearTimeout(timeout);
  }, [localSearch, dispatch]);

  const handleReset = () => {
    dispatch(resetTableState());
    table.resetColumnFilters();
    table.resetSorting();
  };

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex flex-1 items-center space-x-2">
        {/* Global Search */}
        {/* <Input
          placeholder={globalFilterPlaceholder}
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="h-8 w-[200px]"
        /> */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={globalFilterPlaceholder}
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="h-8 w-[200px] pl-8" // add padding-left for icon
          />
        </div>

        {/* Filters */}
        <DataTableFacetedFilter filters={filters} />

        {/* Reset Button */}
        {(Object.keys(reduxFilters).length > 0 || !!reduxSearch) && (
          <Button variant="ghost" className="h-8 px-2" onClick={handleReset}>
            Reset <CircleX className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex  items-center space-x-2">
        {createButton}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
