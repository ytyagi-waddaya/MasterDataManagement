import { FieldConfig } from "@/components/field-builder/contracts/field-config.contract";
import { RuntimeField } from "./runtimeField";
import { toRuntimeField } from "./runtimeField";

/**
 * Converts published schema layout into runtime fields
 * This is the SINGLE source of truth for runtime rendering
 */
export function buildRuntimeFields(
  layout: FieldConfig[]
): RuntimeField[] {
  if (!Array.isArray(layout)) return [];

  const values: Record<string, any> = {}; // empty context for preview

  return layout.map((field) => toRuntimeField(field, values));
}
