// runtime/mappers/mapFormulas.ts

import { FieldFormula } from "../../../prisma/generated/client.js";
import { RuntimeFormula } from "../domain.js";




type PrismaFormula = FieldFormula & {
  field: {
    key: string;
  };
};

export function mapFormulas(
  formulas: PrismaFormula[]
): RuntimeFormula[] {
  return formulas.map(f => ({
    fieldKey: f.field.key,
    expression: f.expression,
    dependencies: f.dependencies ?? [],
  }));
}
