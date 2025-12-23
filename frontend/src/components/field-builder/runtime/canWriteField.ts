import { FieldConfig } from "../contracts/field-config.contract";

export function canWriteField(
  field: FieldConfig,
  ctx: { roles: string[]; userId: string },
  values: Record<string, any>
): boolean {
  /* ================= BEHAVIOR ================= */

  // System / calculated fields
  if (field.behavior?.readOnly) return false;

  // Locked by workflow/state
  if (
    field.behavior?.lockWhen &&
    values[field.behavior.lockWhen.field] ===
      field.behavior.lockWhen.equals
  ) {
    return false;
  }

  /* ================= PERMISSIONS ================= */

  const rule = field.permissions?.write;

  // No rule → allowed
  if (!rule) return true;

  // Role-based
  if (
    rule.roles?.some((r) => ctx.roles.includes(r))
  ) {
    return true;
  }

  // User-based
  if (rule.users?.includes(ctx.userId)) {
    return true;
  }

  // Conditional (ABAC)
  if (rule.conditions) {
    return rule.conditions.every(
      (c) => values[c.field] === c.equals
    );
  }

  return false;
}
