"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setFilters, setPage } from "@/store/dataTableSlice";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";

import { format, subDays, startOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export function AdvancedDateFilter() {
  const dispatch = useDispatch();
  const filters = useSelector((s: RootState) => s.dataTable.filters);

  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const from = filters.createdFrom || "";
  const to = filters.createdTo || "";

  const quickOptions = [
    { label: "Today", value: "today" },
    { label: "Last 7 Days", value: "last7" },
    { label: "Last 30 Days", value: "last30" },
  ];

  const applyQuickFilter = (type: string) => {
    let fromDate = "";
    let toDate = format(new Date(), "yyyy-MM-dd");

    if (type === "today") fromDate = format(startOfDay(new Date()), "yyyy-MM-dd");
    if (type === "last7") fromDate = format(subDays(new Date(), 7), "yyyy-MM-dd");
    if (type === "last30") fromDate = format(subDays(new Date(), 30), "yyyy-MM-dd");

    dispatch(setFilters({ ...filters, createdFrom: fromDate, createdTo: toDate }));
    dispatch(setPage(1));
  };

  const setDate = (key: "createdFrom" | "createdTo", value: string) => {
    dispatch(setFilters({ ...filters, [key]: value }));
    dispatch(setPage(1));
  };

  const clearDates = () => {
    dispatch(setFilters({ ...filters, createdFrom: undefined, createdTo: undefined }));
    dispatch(setPage(1));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          Created Date
          {from && to && (
            <Badge variant="secondary" className="ml-2 rounded-sm px-1">
              {from} → {to}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[340px] p-4" align="start">
        {/* Quick Filters */}
        <p className="font-medium text-sm mb-2">Quick Filters</p>
        <div className="flex flex-col gap-2 mb-4">
          {quickOptions.map((opt) => (
            <Button
              key={opt.value}
              variant="outline"
              className="w-full justify-start"
              onClick={() => applyQuickFilter(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>

        {/* Custom Date Range */}
        <p className="font-medium text-sm mb-1">Custom Range</p>

        {/* From */}
        <div className="mb-4">
          <label className="text-xs block mb-1">From</label>
          <div className="relative">
            <Input
              type="text"
              inputMode="none"
              placeholder="YYYY-MM-DD"
              value={from}
              onChange={(e) => setDate("createdFrom", e.target.value)}
              className="pr-10"
            />

            <Popover open={fromOpen} onOpenChange={setFromOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-0" align="start">
                <Calendar
                  mode="single"
                  selected={from ? new Date(from) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      setDate("createdFrom", format(date, "yyyy-MM-dd"));
                      setFromOpen(false); // ← CLOSE POPUP ON SELECT
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* To */}
        <div className="mb-4">
          <label className="text-xs block mb-1">To</label>
          <div className="relative">
            <Input
              type="text"
              inputMode="none"
              placeholder="YYYY-MM-DD"
              value={to}
              onChange={(e) => setDate("createdTo", e.target.value)}
              className="pr-10"
            />

            <Popover open={toOpen} onOpenChange={setToOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-0" align="start">
                <Calendar
                  mode="single"
                  selected={to ? new Date(to) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      setDate("createdTo", format(date, "yyyy-MM-dd"));
                      setToOpen(false); // ← CLOSE POPUP ON SELECT
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {(from || to) && (
          <Button variant="outline" size="sm" className="w-full" onClick={clearDates}>
            Clear
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}
