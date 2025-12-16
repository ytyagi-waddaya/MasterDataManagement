"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { clearRowSelection } from "@/store/dataTableSlice";
import { Archive, Trash2, Download, RotateCcw } from "lucide-react";
import { BulkActionDialog } from "./BulkActionDialog";
import { Table } from "@tanstack/react-table";
import { exportToCSV, exportToXLSX, ColumnConfig } from "@/lib/exportUtils";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface BulkActionsBarProps<TData> {
  selectedRows: TData[];
  table: Table<TData>;
  isActive?: boolean;
  onBulkArchive?: (ids: string[]) => void;
  onBulkRestore?: (ids: string[]) => void;
  onBulkDelete?: (ids: string[]) => void;
}

export const BulkActionsBar = <TData,>({
  selectedRows,
  table,
  isActive = false,
  onBulkArchive,
  onBulkRestore,
  onBulkDelete,
}: BulkActionsBarProps<TData>) => {
  const [openAction, setOpenAction] = React.useState<
    "archive" | "delete" | "restore" | null
  >(null);

  const [exportDropdown, setExportDropdown] = React.useState(false);
  const [includeHidden, setIncludeHidden] = React.useState(false);
  const [exportFormat, setExportFormat] = React.useState<"csv" | "xlsx">("csv");

  const dispatch = useDispatch<AppDispatch>();

  const selectedTableRows = table.getSelectedRowModel().rows;
  const effectiveSelectedCount =
    selectedTableRows.length > 0 ? selectedTableRows.length : selectedRows.length;

  if (!selectedRows.length && selectedTableRows.length === 0) return null;

  const getSelectedIds = () => {
    if (selectedTableRows.length > 0) {
      return selectedTableRows
        .map((row) => (row.original as any)?.id ?? row.getValue("id"))
        .filter(Boolean)
        .map(String);
    }
    return (selectedRows as any[])
      .map((r) => r?.id)
      .filter(Boolean)
      .map(String);
  };

  const handleConfirm = () => {
    const ids = getSelectedIds();

    if (openAction === "archive" && onBulkArchive) onBulkArchive(ids);
    if (openAction === "restore" && onBulkRestore) onBulkRestore(ids);
    if (openAction === "delete" && onBulkDelete) onBulkDelete(ids);

    setOpenAction(null);
    dispatch(clearRowSelection());
  };

  // ✅ Try parse JSON string safely
  const tryParseJSON = (v: any) => {
    if (typeof v !== "string") return null;
    const s = v.trim();
    if (!s.startsWith("[") && !s.startsWith("{")) return null;
    try {
      return JSON.parse(s);
    } catch {
      return null;
    }
  };

  // ✅ Converts Permissions field to clean export string
  const formatPermissions = (value: any) => {
    // value can be array OR stringified JSON
    const parsed = tryParseJSON(value);
    const v = parsed ?? value;

    const arr = Array.isArray(v) ? v : [];
    if (!arr.length) return "";

    // rolePermissions[] like:
    // { permission: { key/name }, permissionId, accessLevel }
    const keys = arr
      .map((x: any) => x?.permission?.key ?? x?.permission?.name ?? x?.key ?? x?.permissionId)
      .filter(Boolean)
      .map(String);

    // ✅ prevent Excel cell overflow (32767 chars) + keep file readable
    const joined = keys.join(" | ");
    const MAX = 8000;
    if (joined.length > MAX) {
      const short = joined.slice(0, MAX);
      return `${short} ... (+${Math.max(0, keys.length)} total)`;
    }

    return joined;
  };

  const sanitizeExportValue = (colId: string, v: any) => {
    if (v == null) return "";

    // ✅ If your permissions column id is "permissions" OR "rolePermissions"
    // (keep both, because projects differ)
    if (colId === "permissions" || colId === "rolePermissions") {
      return formatPermissions(v);
    }

    // Convert objects safely but not huge
    if (typeof v === "object") {
      // common case: boolean -> "TRUE/FALSE"
      if (typeof (v as any) === "boolean") return String(v);

      const s = JSON.stringify(v);
      const MAX = 2000;
      return s.length > MAX ? s.slice(0, MAX) + "..." : s;
    }

    return String(v);
  };

  const handleExport = (type: "selected" | "all") => {
    const rows =
      type === "selected"
        ? table.getSelectedRowModel().rows
        : table.getFilteredRowModel().rows; // ✅ Export All (Filtered)

    // ✅ Use leaf columns and REMOVE select/actions columns from export
    const columns: ColumnConfig[] = table
      .getAllLeafColumns()
      .filter((col) => col.id !== "select") // checkbox col
      .filter((col) => col.id !== "actions") // actions col (common id)
      .filter((col) => String(col.columnDef.header ?? "").toLowerCase() !== "actions")
      .map((col) => ({
        id: col.id,
        header: String(col.columnDef.header ?? col.id),
        hidden: !col.getIsVisible(),
      }));

    const data = rows.map((row) =>
      columns.reduce((acc, col) => {
        acc[col.id] = sanitizeExportValue(col.id, row.getValue(col.id));
        return acc;
      }, {} as Record<string, any>)
    );

    const date = new Date().toISOString().split("T")[0];
    const fileName = `export-${type}-${date}.${exportFormat}`;

    if (exportFormat === "csv") {
      exportToCSV(data, columns, fileName, includeHidden);
    } else {
      exportToXLSX(data, columns, fileName, includeHidden);
    }

    setExportDropdown(false);
  };

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white shadow-lg rounded-sm border p-1.5 flex gap-2 items-center">
        {!isActive && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => setOpenAction("archive")}
                disabled={effectiveSelectedCount === 0}
              >
                <Archive className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive selected rows</TooltipContent>
          </Tooltip>
        )}

        {isActive && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex items-center gap-1"
                  onClick={() => setOpenAction("delete")}
                  disabled={effectiveSelectedCount === 0}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete selected rows</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="secondary"
                  className="flex items-center gap-1"
                  onClick={() => setOpenAction("restore")}
                  disabled={effectiveSelectedCount === 0}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Restore selected rows</TooltipContent>
            </Tooltip>
          </>
        )}

        <DropdownMenu open={exportDropdown} onOpenChange={setExportDropdown}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="secondary" className="flex items-center gap-1">
              <Download className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => handleExport("selected")}
              disabled={table.getSelectedRowModel().rows.length === 0}
            >
              Export Selected ({table.getSelectedRowModel().rows.length})
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleExport("all")}>
              Export All (Filtered)
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setIncludeHidden(!includeHidden)}>
              {includeHidden ? "Hide Hidden Columns" : "Include Hidden Columns"}
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setExportFormat(exportFormat === "csv" ? "xlsx" : "csv")}
            >
              Switch to {exportFormat === "csv" ? "XLSX" : "CSV"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {openAction && (
        <BulkActionDialog
          open={!!openAction}
          onOpenChange={(open) => !open && setOpenAction(null)}
          onConfirm={handleConfirm}
          actionType={openAction}
          selectedCount={effectiveSelectedCount}
        />
      )}
    </>
  );
};
