export class SchemaCompiler {
    static compile(fields) {
        const orderedFields = [...fields].sort((a, b) => a.order - b.order);
        const fieldMap = new Map(orderedFields.map(f => [f.key, f]));
        return { orderedFields, fieldMap };
    }
}
//# sourceMappingURL=SchemaCompiler.js.map