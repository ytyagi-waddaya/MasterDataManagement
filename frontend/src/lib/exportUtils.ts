import * as XLSX from "xlsx";

export interface ColumnConfig {
  id: string;
  header: string;
  hidden?: boolean;
}

/**
 * Export data to CSV
 * @param data Array of objects representing table rows
 * @param columns Columns to include (can filter hidden with hiddenColumnsIncluded)
 * @param fileName Name of the exported file
 * @param includeHidden Whether to include hidden columns
 */
export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  columns: ColumnConfig[],
  fileName: string,
  includeHidden = false
) {
  if (!data || data.length === 0) return;

  const visibleColumns = columns.filter((col) => includeHidden || !col.hidden);
  const headers = visibleColumns.map((col) => col.header);
  const rows = data.map((row) =>
    visibleColumns.map((col) => row[col.id] ?? "")
  );

  const csvContent =
    [headers.join(","), ...rows.map((r) => r.map(escapeCSV).join(","))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function escapeCSV(value: any) {
  if (value === null || value === undefined) return "";
  const str = value.toString();
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Export data to XLSX (Excel)
 * @param data Array of objects representing table rows
 * @param columns Columns to include (can filter hidden with hiddenColumnsIncluded)
 * @param fileName Name of the exported file
 * @param includeHidden Whether to include hidden columns
 */
export function exportToXLSX<T extends Record<string, any>>(
  data: T[],
  columns: ColumnConfig[],
  fileName: string,
  includeHidden = false
) {
  if (!data || data.length === 0) return;

  const visibleColumns = columns.filter((col) => includeHidden || !col.hidden);

  // Map data to include only selected columns
  const formattedData = data.map((row) =>
    visibleColumns.reduce((acc, col) => {
      acc[col.header] = row[col.id] ?? "";
      return acc;
    }, {} as Record<string, any>)
  );

  const worksheet = XLSX.utils.json_to_sheet(formattedData, {
    header: visibleColumns.map((c) => c.header),
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, fileName);
}
