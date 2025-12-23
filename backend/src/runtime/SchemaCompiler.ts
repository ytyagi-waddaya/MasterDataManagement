import { RuntimeField } from "./domain.js";

export interface CompiledSchema {
  orderedFields: RuntimeField[];
  fieldMap: Map<string, RuntimeField>;
}

export class SchemaCompiler {
  static compile(fields: RuntimeField[]): CompiledSchema {
    const orderedFields = [...fields].sort((a, b) => a.order - b.order);

    const fieldMap = new Map(orderedFields.map(f => [f.key, f]));

    return { orderedFields, fieldMap };
  }
}
