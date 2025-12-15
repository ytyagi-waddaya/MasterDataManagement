"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

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

  if (!selectedRows.length && table.getSelectedRowModel().rows.length === 0)
    return null;

  const handleConfirm = () => {
    const ids = selectedRows.map((r: any) => r.id);

    if (openAction === "archive" && onBulkArchive) onBulkArchive(ids);
    if (openAction === "restore" && onBulkRestore) onBulkRestore(ids);
    if (openAction === "delete" && onBulkDelete) onBulkDelete(ids);

    setOpenAction(null);
    dispatch(clearRowSelection());
  };

  const handleExport = (type: "selected" | "all") => {
    const rows =
      type === "selected"
        ? table.getSelectedRowModel().rows
        : table.getRowModel().rows;

    const columns: ColumnConfig[] = table.getAllColumns().map((col) => ({
      id: col.id,
      header: String(col.columnDef.header ?? col.id),
      hidden: !col.getIsVisible(),
    }));

    const data = rows.map((row) =>
      columns.reduce((acc, col) => {
        acc[col.id] = row.getValue(col.id);
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
        {/* Archive Button */}
        {!isActive && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => setOpenAction("archive")}
              >
                <Archive className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive selected rows</TooltipContent>
          </Tooltip>
        )}

        {/* Delete & Restore Buttons */}
        {isActive && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex items-center gap-1"
                  onClick={() => setOpenAction("delete")}
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
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Restore selected rows</TooltipContent>
            </Tooltip>
          </>
        )}

        {/* Export Dropdown */}
        <DropdownMenu open={exportDropdown} onOpenChange={setExportDropdown}>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport("selected")}>
              Export Selected
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("all")}>
              Export All (Filtered)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIncludeHidden(!includeHidden)}>
              {includeHidden ? "Hide Hidden Columns" : "Include Hidden Columns"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setExportFormat(exportFormat === "csv" ? "xlsx" : "csv")
              }
            >
              Switch to {exportFormat === "csv" ? "XLSX" : "CSV"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Bulk Action Dialog */}
      {openAction && (
        <BulkActionDialog
          open={!!openAction}
          onOpenChange={(open) => !open && setOpenAction(null)}
          onConfirm={handleConfirm}
          actionType={openAction}
          selectedCount={selectedRows.length}
        />
      )}
    </>
  );
};
