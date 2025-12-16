// import * as XLSX from "xlsx";

// export interface ColumnConfig {
//   id: string;
//   header: string;
//   hidden?: boolean;
// }

// /**
//  * Export data to CSV
//  * @param data Array of objects representing table rows
//  * @param columns Columns to include (can filter hidden with hiddenColumnsIncluded)
//  * @param fileName Name of the exported file
//  * @param includeHidden Whether to include hidden columns
//  */
// export function exportToCSV<T extends Record<string, any>>(
//   data: T[],
//   columns: ColumnConfig[],
//   fileName: string,
//   includeHidden = false
// ) {
//   if (!data || data.length === 0) return;

//   const visibleColumns = columns.filter((col) => includeHidden || !col.hidden);
//   const headers = visibleColumns.map((col) => col.header);
//   const rows = data.map((row) =>
//     visibleColumns.map((col) => row[col.id] ?? "")
//   );

//   const csvContent =
//     [headers.join(","), ...rows.map((r) => r.map(escapeCSV).join(","))].join("\n");

//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.setAttribute("download", fileName);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

// function escapeCSV(value: any) {
//   if (value === null || value === undefined) return "";
//   const str = value.toString();
//   if (str.includes(",") || str.includes('"') || str.includes("\n")) {
//     return `"${str.replace(/"/g, '""')}"`;
//   }
//   return str;
// }

// /**
//  * Export data to XLSX (Excel)
//  * @param data Array of objects representing table rows
//  * @param columns Columns to include (can filter hidden with hiddenColumnsIncluded)
//  * @param fileName Name of the exported file
//  * @param includeHidden Whether to include hidden columns
//  */
// export function exportToXLSX<T extends Record<string, any>>(
//   data: T[],
//   columns: ColumnConfig[],
//   fileName: string,
//   includeHidden = false
// ) {
//   if (!data || data.length === 0) return;

//   const visibleColumns = columns.filter((col) => includeHidden || !col.hidden);

//   // Map data to include only selected columns
//   const formattedData = data.map((row) =>
//     visibleColumns.reduce((acc, col) => {
//       acc[col.header] = row[col.id] ?? "";
//       return acc;
//     }, {} as Record<string, any>)
//   );

//   const worksheet = XLSX.utils.json_to_sheet(formattedData, {
//     header: visibleColumns.map((c) => c.header),
//   });
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//   XLSX.writeFile(workbook, fileName);
// }


import * as XLSX from "xlsx";

export interface ColumnConfig {
  id: string;
  header: string;
  hidden?: boolean;
}

/* =========================================================
   Helpers
========================================================= */

function sanitizeValue(value: any) {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value).replace(/\r?\n|\r/g, " ").trim();
}

function escapeCSV(value: any) {
  const str = sanitizeValue(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// ✅ Extract permission keys from:
// - array of rolePermissions
// - JSON string
// - already-joined string "A | B | C"
function extractPermissionKeys(value: any): string[] {
  if (!value) return [];

  // Already an array
  if (Array.isArray(value)) {
    return value
      .map((x: any) => x?.permission?.key ?? x?.permission?.name ?? x?.permissionId ?? x?.key)
      .filter(Boolean)
      .map(String);
  }

  // String - can be JSON OR joined text
  if (typeof value === "string") {
    const s = value.trim();

    // JSON string
    if (s.startsWith("[") || s.startsWith("{")) {
      try {
        const parsed = JSON.parse(s);
        return extractPermissionKeys(parsed);
      } catch {
        // fallthrough
      }
    }

    // Joined string
    if (s.includes("|")) {
      return s
        .split("|")
        .map((p) => p.trim())
        .filter(Boolean);
    }

    // Single permission
    return s ? [s] : [];
  }

  // Object fallback
  if (typeof value === "object") {
    return extractPermissionKeys(sanitizeValue(value));
  }

  return [];
}

/* =========================================================
   Export to CSV
========================================================= */

export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  columns: ColumnConfig[],
  fileName: string,
  includeHidden = false
) {
  if (!data || data.length === 0) return;

  const visibleColumns = columns.filter((col) => includeHidden || !col.hidden);
  const headers = visibleColumns.map((col) => escapeCSV(col.header));
  const rows = data.map((row) => visibleColumns.map((col) => escapeCSV(row[col.id])));

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* =========================================================
   Export to XLSX (Excel) - Permissions horizontal columns
========================================================= */

export function exportToXLSX<T extends Record<string, any>>(
  data: T[],
  columns: ColumnConfig[],
  fileName: string,
  includeHidden = false
) {
  if (!data || data.length === 0) return;

  const visibleColumns = columns.filter((col) => includeHidden || !col.hidden);

  // ✅ Find permissions column (by id OR header)
  const permCol = visibleColumns.find((c) => {
    const h = String(c.header).toLowerCase();
    return c.id === "permissions" || c.id === "rolePermissions" || h.includes("permission");
  });

  // ✅ Build base columns (exclude permissions col from base)
  const baseCols = permCol ? visibleColumns.filter((c) => c.id !== permCol.id) : visibleColumns;

  // ✅ If permissions exist, compute max permission count
  let maxPerms = 0;
  if (permCol) {
    for (const row of data) {
      const perms = extractPermissionKeys((row as any)[permCol.id]);
      if (perms.length > maxPerms) maxPerms = perms.length;
    }
  }

  // ✅ Create expanded permission columns: Permission_1 ... Permission_N
  const permHeaders = permCol
    ? Array.from({ length: maxPerms }, (_, i) => `Permission_${i + 1}`)
    : [];

  // ✅ Final headers (base + expanded perms + a joined Permissions column for readability)
  const finalHeaders = [
    ...baseCols.map((c) => c.header),
    ...(permCol ? permHeaders : []),
    ...(permCol ? ["Permissions (Joined)"] : []),
  ];

  // ✅ Build formatted data (keys = headers)
  const formattedData = data.map((row) => {
    const out: Record<string, any> = {};

    // base columns
    for (const c of baseCols) {
      out[c.header] = sanitizeValue((row as any)[c.id]);
    }

    // permissions expanded
    if (permCol) {
      const keys = extractPermissionKeys((row as any)[permCol.id]);

      for (let i = 0; i < maxPerms; i++) {
        out[`Permission_${i + 1}`] = keys[i] ?? "";
      }

      // joined (single cell)
      out["Permissions (Joined)"] = keys.join(" | ");
    }

    return out;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData, {
    header: finalHeaders,
  });

  // ✅ Set column widths for better Excel look
  const colWidths = finalHeaders.map((h) => {
    const lower = String(h).toLowerCase();
    if (lower.startsWith("permission_")) return { wch: 28 };
    if (lower.includes("permissions (joined)")) return { wch: 120 };
    if (lower.includes("description")) return { wch: 60 };
    if (lower.includes("name")) return { wch: 25 };
    return { wch: 18 };
  });

  (worksheet as any)["!cols"] = colWidths;

  // ✅ AutoFilter (Excel dropdown filter)
  const ref = worksheet["!ref"];
  if (ref) {
    (worksheet as any)["!autofilter"] = { ref };
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // ✅ Write file
  XLSX.writeFile(workbook, fileName);
}
