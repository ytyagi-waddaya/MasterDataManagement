import { Parser } from "expr-eval";
// ================= HELPERS =================
function canWrite(field, ctx) {
    if (ctx.mode === "VIEW")
        return false;
    if (field.isSystem)
        return false;
    if (field.isLocked)
        return false;
    return true;
}
function evaluateCondition(condition, values) {
    return values[condition.fieldKey] === condition.value;
}
function resolveVisibility(field, values) {
    const visibleIf = field.config?.visibleIf;
    if (!visibleIf)
        return true;
    return evaluateCondition(visibleIf, values);
}
function resolveRequired(field, values) {
    if (field.isRequired)
        return true;
    const requiredIf = field.config?.requiredIf;
    if (!requiredIf)
        return false;
    return evaluateCondition(requiredIf, values);
}
// ================= FORMULA ENGINE =================
const parser = new Parser({
    operators: {
        logical: true,
        conditional: true,
        comparison: true,
        add: true,
        subtract: true,
        multiply: true,
        divide: true,
        remainder: true,
        power: true,
    },
});
function computeFormula(expression, values) {
    try {
        return parser.evaluate(expression, values);
    }
    catch {
        return null;
    }
}
// ================= VALIDATION =================
function validateField(field, value, required) {
    const errors = [];
    if (required && (value === null || value === undefined || value === "")) {
        errors.push("Required");
        return errors;
    }
    if (value == null)
        return errors;
    switch (field.dataType) {
        case "NUMBER":
            if (typeof value !== "number")
                errors.push("Must be a number");
            break;
        case "BOOLEAN":
            if (typeof value !== "boolean")
                errors.push("Must be true/false");
            break;
        case "STRING":
            if (typeof value !== "string")
                errors.push("Must be a string");
            break;
        case "DATE":
        case "DATETIME":
            if (isNaN(Date.parse(value)))
                errors.push("Invalid date");
            break;
    }
    return errors;
}
// ================= RUNTIME ENGINE =================
export class DefaultFormRuntimeEngine {
    execute(ctx) {
        const executedFields = [];
        const outputErrors = [];
        const nextValues = { ...ctx.values };
        for (const field of [...ctx.fields].sort((a, b) => a.order - b.order)) {
            const visible = resolveVisibility(field, nextValues);
            const required = visible && resolveRequired(field, nextValues);
            const readOnly = !canWrite(field, ctx);
            let value = nextValues[field.key];
            if (field.config?.calculation?.expression) {
                value = computeFormula(field.config.calculation.expression, nextValues);
                nextValues[field.key] = value;
            }
            const fieldErrors = ctx.mode !== "VIEW" && visible
                ? validateField(field, value, required)
                : [];
            if (fieldErrors.length) {
                outputErrors.push({
                    field: field.key,
                    errors: fieldErrors,
                });
            }
            executedFields.push({
                key: field.key,
                label: field.label,
                fieldType: field.fieldType,
                dataType: field.dataType,
                value,
                visible,
                required,
                readOnly,
                errors: fieldErrors,
                config: field.config,
            });
        }
        return {
            fields: executedFields,
            values: nextValues,
            errors: outputErrors,
            readOnly: ctx.mode === "VIEW",
        };
    }
    validate(ctx) {
        return this.execute(ctx).errors;
    }
}
//# sourceMappingURL=engine.js.map