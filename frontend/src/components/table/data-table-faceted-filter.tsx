"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandSeparator,
  CommandItem,
} from "@/components/ui/command";
import { Check, ListFilter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, setPage } from "@/store/dataTableSlice";
import { RootState } from "@/store";
import { AdvancedDateFilter } from "./AdvancedDateFilter";
import { TableFilter } from "@/utils/filterType";
import { useQueries } from "@tanstack/react-query";

interface DynamicFilterConfig {
  columnId: string;
  fetcherFn: () => Promise<any[]>; // plain async fn returning array
  labelKey?: string;
  valueKey?: string;
}

interface Props<TValue> {
  filters: TableFilter<TValue>[]; // TableFilter.type can be "single"|"multi"|"date-advanced"|"dynamic"
}

export function DataTableFacetedFilter<TValue>({ filters }: Props<TValue>) {
  const dispatch = useDispatch();
  const reduxFilters = useSelector(
    (state: RootState) => state.dataTable.filters
  );

  const getSelectedValues = (key: string, multi?: boolean): TValue[] => {
    const val = reduxFilters[key];
    if (multi) return Array.isArray(val) ? val : [];
    return val !== undefined ? [val as TValue] : [];
  };

  const handleSelect = (key: string, value: TValue, multi?: boolean) => {
    const current = getSelectedValues(key, multi);
    const next = multi
      ? current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      : current[0] === value
      ? []
      : [value];

    dispatch(setFilters({ ...reduxFilters, [key]: multi ? next : next[0] }));
    dispatch(setPage(1));
  };

  const handleClear = (key: string, multi?: boolean) => {
    dispatch(setFilters({ ...reduxFilters, [key]: multi ? [] : undefined }));
    dispatch(setPage(1));
  };

  // IMPORTANT: Always render the component (DataTableToolbar must render this unconditionally).
  // We must NOT change the number/order of hooks across renders.
  // Build a stable list of dynamic filters (in order of appearance).
  const dynamicFilters: DynamicFilterConfig[] = filters
    .map((f: any) =>
      f?.type === "dynamic" && f?.fetcherFn
        ? {
            columnId: f.columnId,
            fetcherFn: f.fetcherFn,
            labelKey: f.labelKey,
            valueKey: f.valueKey,
          }
        : null
    )
    .filter(Boolean) as DynamicFilterConfig[];

  // Single hook call that fetches all dynamic filter lists.
  // useQueries accepts an array of query objects — it's ONE hook call always.
  const dynamicQueries = useQueries({
    queries: dynamicFilters.map((df) => ({
      queryKey: ["dynamic-filter", df.columnId],
      queryFn: async () => {
        // fetcherFn should return the array of items
        const items = await df.fetcherFn();
        return items ?? [];
      },
      staleTime: 5 * 60 * 1000, // 5 min cache (adjustable)
      keepPreviousData: true,
    })),
  });

  // Build a map from columnId -> query result
  const dynamicResultsByColumn: Record<
    string,
    { data: any[]; isLoading: boolean }
  > = {};
  dynamicFilters.forEach((df, i) => {
    const q = dynamicQueries[i];
    dynamicResultsByColumn[df.columnId] = {
      data: q?.data ?? [],
      isLoading: !!q?.isLoading,
    };
  });

  // If there are no filters at all, render nothing minimal (but we already invoked hooks above).
  if (!filters || filters.length === 0) {
    return <div />;
  }

  const renderFilterItem = (filter: any, index: number) => {
    const selectedValues = getSelectedValues(filter.columnId, filter.multi);

    // DATE ADVANCED FILTER
    if (filter.type === "date-advanced" || filter.type === "date") {
      return <AdvancedDateFilter key={filter.columnId} />;
    }

    // DYNAMIC FILTER (uses data from useQueries map)
    if (filter.type === "dynamic") {
      const result = dynamicResultsByColumn[filter.columnId] ?? {
        data: [],
        isLoading: false,
      };
      const list = result.data ?? [];
      const isLoading = result.isLoading;

      const options =
        list?.map((item: any) => ({
          label: item?.[filter.labelKey ?? "label"] ?? String(item),
          value: item?.[filter.valueKey ?? "value"] ?? item,
        })) ?? [];

      return (
        <Popover key={filter.columnId}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 border-dashed">
              {filter.title}
              {selectedValues.length > 0 && (
                <Badge className="ml-2 rounded-sm px-1 font-normal">
                  {selectedValues.length === 1
                    ? options.find((o) => o.value === selectedValues[0])?.label
                    : selectedValues.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder={`Search ${filter.title}`} />
              <CommandList>
                {isLoading && <CommandEmpty>Loading...</CommandEmpty>}
                {!isLoading &&
                  (options.length > 0 ? (
                    options.map((opt: any) => {
                      const isSelected = filter.multi
                        ? selectedValues.includes(opt.value)
                        : selectedValues[0] === opt.value;

                      return (
                        <CommandItem
                          key={String(opt.value)}
                          onSelect={() =>
                            handleSelect(filter.columnId, opt.value, filter.multi)
                          }
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible"
                            )}
                          >
                            <Check className="h-4 w-4" />
                          </div>
                          <span>{opt.label}</span>
                        </CommandItem>
                      );
                    })
                  ) : (
                    <CommandEmpty>No options</CommandEmpty>
                  ))}
                {selectedValues.length > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandItem
                      className="justify-center"
                      onSelect={() => handleClear(filter.columnId, filter.multi)}
                    >
                      Clear
                    </CommandItem>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
    }

    // STATIC FILTER (single / multi)
    const options = filter.options ?? [];

    return (
      <Popover key={filter.columnId}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            {filter.title}
            {selectedValues.length > 0 && (
              <Badge className="ml-2 rounded-sm px-1 font-normal">
                {filter.multi
                  ? selectedValues.length
                  : options.find((o: any) => o.value === selectedValues[0])?.label}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-48 p-0" align="start">
          <Command>
            <CommandInput placeholder={`Filter ${filter.title}`} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              {options.map((opt: any) => {
                const isSelected = filter.multi
                  ? selectedValues.includes(opt.value)
                  : selectedValues[0] === opt.value;

                return (
                  <CommandItem
                    key={String(opt.value)}
                    onSelect={() =>
                      handleSelect(filter.columnId, opt.value, filter.multi)
                    }
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    <span>{opt.label}</span>
                  </CommandItem>
                );
              })}

              {selectedValues.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandItem
                    className="justify-center"
                    onSelect={() => handleClear(filter.columnId, filter.multi)}
                  >
                    Clear filter
                  </CommandItem>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

  // NESTED MODE (too many filters)
  if (filters.length > 2) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <ListFilter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-64 p-2" align="start">
          <div className="flex flex-col gap-1">
            {filters.map((filter, index) => renderFilterItem(filter, index))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // HORIZONTAL FILTER LAYOUT
  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter, index) => renderFilterItem(filter, index))}
    </div>
  );
}
