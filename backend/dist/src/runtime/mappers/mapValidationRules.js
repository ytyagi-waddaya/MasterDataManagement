// runtime/mappers/mapValidationRules.ts
export function mapValidationRules(rules) {
    return rules.map(r => ({
        fieldKey: r.field.key,
        type: r.type,
        rule: (r.rule ?? {}),
        errorMessage: r.errorMessage,
        severity: r.severity ?? "ERROR", // fallback safety
    }));
}
//# sourceMappingURL=mapValidationRules.js.map