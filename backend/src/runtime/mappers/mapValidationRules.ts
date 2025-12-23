// runtime/mappers/mapValidationRules.ts

import { Prisma } from "../../../prisma/generated/client.js";
import { RuntimeValidationRule } from "../domain.js";


type PrismaValidationRule = {
  fieldId: string;
  type: string;
  rule: Prisma.JsonValue;
  errorMessage: string;
  field: {
    key: string;
  };
};

export function mapValidationRules(
  rules: PrismaValidationRule[]
): RuntimeValidationRule[] {
  return rules.map(r => ({
    fieldKey: r.field.key,
    type: r.type as RuntimeValidationRule["type"],
    rule: (r.rule ?? {}) as RuntimeValidationRule["rule"],
    errorMessage: r.errorMessage,
    severity: (r as any).severity ?? "ERROR", // fallback safety
  }));
}

