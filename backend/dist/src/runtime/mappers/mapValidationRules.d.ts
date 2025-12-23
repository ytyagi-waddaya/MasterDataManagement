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
export declare function mapValidationRules(rules: PrismaValidationRule[]): RuntimeValidationRule[];
export {};
//# sourceMappingURL=mapValidationRules.d.ts.map