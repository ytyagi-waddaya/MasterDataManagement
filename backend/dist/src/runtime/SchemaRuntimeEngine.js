// runtime/SchemaRuntimeEngine.ts
import { SchemaCompiler } from "./SchemaCompiler.js";
import { PermissionEvaluator } from "./PermissionEvaluator.js";
import { ValidationEngine } from "./ValidationEngine.js";
import { FormulaEngine } from "./FormulaEngine.js";
import { VisibilityEvaluator } from "./VisibilityEvaluator.js";
export class SchemaRuntimeEngine {
    static execute(ctx) {
        const compiled = SchemaCompiler.compile(ctx.fields);
        const values = { ...ctx.values };
        const executed = [];
        const errors = [];
        /* --------------------------------------------------
           1️⃣ FORMULAS (SYSTEM ONLY)
        -------------------------------------------------- */
        if (ctx.mode === "SYSTEM_RECALC") {
            FormulaEngine.execute(ctx.formulas, values);
        }
        /* --------------------------------------------------
           2️⃣ VALIDATION
        -------------------------------------------------- */
        const validationErrors = ValidationEngine.validate(ctx.validationRules, ctx, values);
        /* --------------------------------------------------
           3️⃣ FIELD EXECUTION
        -------------------------------------------------- */
        for (const field of compiled.orderedFields) {
            const fieldKey = field.key; // ✅ local narrowing
            /* ---------- READ PERMISSION ---------- */
            const canRead = PermissionEvaluator.canRead(field, ctx, values);
            if (!canRead)
                continue;
            /* ---------- VISIBILITY ---------- */
            const visible = VisibilityEvaluator.isVisible(field.visibility, ctx, values);
            /* ---------- WRITE PERMISSION ---------- */
            const canWrite = visible && PermissionEvaluator.canWrite(field, ctx, values);
            /* ---------- VALIDATION ERRORS ---------- */
            const fieldValidationErrors = validationErrors[fieldKey] ?? [];
            const blockingErrors = fieldValidationErrors.filter((e) => e.severity === "ERROR");
            if (blockingErrors.length) {
                errors.push({
                    field: fieldKey,
                    errors: blockingErrors.map((e) => e.message),
                });
            }
            /* ---------- EXECUTED FIELD ---------- */
            executed.push({
                key: fieldKey,
                label: field.label,
                value: values[fieldKey],
                visible,
                required: field.isRequired && visible && ctx.mode === "SUBMIT",
                readOnly: !canWrite,
                errors: fieldValidationErrors.map((e) => e.message),
                config: field.config,
            });
        }
        return { fields: executed, values, errors };
    }
}
//# sourceMappingURL=SchemaRuntimeEngine.js.map