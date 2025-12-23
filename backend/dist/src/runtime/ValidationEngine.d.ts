import { RuntimeValidationRule } from "./domain.js";
import { RuntimeContext } from "./types.js";
export type ValidationResult = Record<string, {
    message: string;
    severity: "ERROR" | "WARNING";
}[]>;
export declare class ValidationEngine {
    static validate(rules: RuntimeValidationRule[], ctx: RuntimeContext, // ✅ ADD CONTEXT
    values: Record<string, any>): ValidationResult;
}
//# sourceMappingURL=ValidationEngine.d.ts.map