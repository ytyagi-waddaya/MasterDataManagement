// runtime/mappers/mapFormulas.ts
export function mapFormulas(formulas) {
    return formulas.map(f => ({
        fieldKey: f.field.key,
        expression: f.expression,
        dependencies: f.dependencies ?? [],
    }));
}
//# sourceMappingURL=mapFormulas.js.map