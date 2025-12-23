import { FieldConfig } from "../contracts/field-config.contract";

/* ================= PERMISSIONS + BEHAVIOR ================= */

export function canWriteField(
  field: FieldConfig,
  ctx: { roles: string[]; userId: string },
  values: Record<string, any>
): boolean {
  // Explicit read-only
  if (field.behavior?.readOnly) return false;

  // Locked by state
  if (
    field.behavior?.lockWhen &&
    values[field.behavior.lockWhen.field] ===
      field.behavior.lockWhen.equals
  ) {
    return false;
  }

  const rule = field.permissions?.write;

  // No rule → allowed
  if (!rule) return true;

  if (rule.roles?.some((r) => ctx.roles.includes(r)))
    return true;

  if (rule.users?.includes(ctx.userId)) return true;

  if (rule.conditions) {
    return rule.conditions.every(
      (c) => values[c.field] === c.equals
    );
  }

  return false;
}

/* ================= VISIBILITY ================= */

export function isFieldVisible(
  field: FieldConfig,
  values: Record<string, any>
): boolean {
  if (!field.visibility?.conditions?.length) return true;

  return field.visibility.conditions.every((c) => {
    const v = values[c.field];
    switch (c.operator) {
      case "EQUALS":
        return v === c.value;
      case "IN":
        return Array.isArray(c.value) && c.value.includes(v);
      case "GT":
        return v > c.value;
      case "LT":
        return v < c.value;
      default:
        return true;
    }
  });
}

export function isDependentField(
  field: FieldConfig,
  changedKeys: string[]
): boolean {
  const deps =
    field.integration?.apiSource?.dependsOn ??
    field.behavior?.formula?.dependencies ??
    [];

  return deps.some((dep) => changedKeys.includes(dep));
}


function resolveParams(
  params: Record<string, any>,
  values: Record<string, any>
) {
  return Object.fromEntries(
    Object.entries(params).map(([k, v]) => {
      if (typeof v === "string" && v.startsWith("{{")) {
        const key = v.replace(/[{}]/g, "");
        return [k, values[key]];
      }
      return [k, v];
    })
  );
}

export async function fetchFieldOptions(
  field: FieldConfig,
  values: Record<string, any>
) {
  const src = field.integration?.apiSource;
  if (!src) return [];

  const params = resolveParams(src.params ?? {}, values);
  const qs = new URLSearchParams(params as any).toString();

  const res = await fetch(`${src.url}?${qs}`);
  const data = await res.json();

  return data.map((item: any) => ({
    label: item[src.labelField],
    value: item[src.valueField],
  }));
}

