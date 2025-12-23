import { FieldFormula } from "../../../prisma/generated/client.js";
import { RuntimeFormula } from "../domain.js";
type PrismaFormula = FieldFormula & {
    field: {
        key: string;
    };
};
export declare function mapFormulas(formulas: PrismaFormula[]): RuntimeFormula[];
export {};
//# sourceMappingURL=mapFormulas.d.ts.map