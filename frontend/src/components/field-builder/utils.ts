import { DynamicField, FormSection } from "./types/DynamicField";

/**
 * Map layout key to width fraction (for preview grouping)
 */
export const layoutSizeMap: Record<string, number> = {
  full: 1,
  half: 0.5,
  third: 1 / 3,
  quarter: 0.25,
  "two-third": 2 / 3,
};

/**
 * Convert layout to tailwind width class
 */
export function layoutToClass(layout?: string) {
  switch (layout) {
    case "half":
      return "w-1/2";
    case "third":
      return "w-1/3";
    case "quarter":
      return "w-1/4";
    case "two-third":
      return "w-2/3";
    default:
      return "w-full";
  }
}

/**
 * Given a list of fields (already ordered), group them into rows
 * using layout sizes so rows fit nicely.
 */
export function groupFieldsIntoRows(fields: DynamicField[]) {
  const rows: DynamicField[][] = [];
  let currentRow: DynamicField[] = [];
  let remaining = 1;

  for (const f of fields) {
    const size = layoutSizeMap[f.layout ?? "full"] ?? 1;
    // If field is bigger than remaining, start new row
    if (size > remaining + 1e-9) {
      // push current and reset
      if (currentRow.length) rows.push(currentRow);
      currentRow = [];
      remaining = 1;
    }
    currentRow.push(f);
    remaining = Number((remaining - size).toFixed(6));
    // If no space left, flush row
    if (remaining <= 1e-9) {
      rows.push(currentRow);
      currentRow = [];
      remaining = 1;
    }
  }
  if (currentRow.length) rows.push(currentRow);
  return rows;
}

/** Helper to create a default option */
export function makeOption(label: string) {
  const value = label.trim().toLowerCase().replace(/\s+/g, "_");
  return { label, value };
}

/** Sort fields by order */
export function sortFields(fields: DynamicField[]) {
  return [...fields].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** Sort sections by order */
export function sortSections(sections: FormSection[]) {
  return [...sections].sort((a, b) => a.order - b.order);
}
