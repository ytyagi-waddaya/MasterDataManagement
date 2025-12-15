import { RootConditionSchema } from "../validators/condition.schema.js";

// Extract all fields from nested groups
export function extractFieldsFromGroup(group: any, out: Set<string>) {
  (group?.conditions || []).forEach((c: any) => {
    if (c?.field) out.add(c.field);
  });

  for (const g of group?.groups || []) {
    extractFieldsFromGroup(g, out);
  }
}

// Validate condition structure only (no registry, no redis)
export async function validateConditionGroupAsync(obj: any) {
  const parsed = RootConditionSchema.safeParse(obj);
  if (!parsed.success) throw parsed.error;
  return true;
}

// No-op now
export function clearRegistryCache() {}
