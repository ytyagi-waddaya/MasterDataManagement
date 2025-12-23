import { RuntimeField } from "./domain.js";
export interface CompiledSchema {
    orderedFields: RuntimeField[];
    fieldMap: Map<string, RuntimeField>;
}
export declare class SchemaCompiler {
    static compile(fields: RuntimeField[]): CompiledSchema;
}
//# sourceMappingURL=SchemaCompiler.d.ts.map