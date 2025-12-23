import type { MasterObjectSchema, FieldDefinition, FieldDataType } from "../../prisma/generated/client.js";
export interface ValidationError {
    field: string;
    errors: string[];
}
export interface FormRuntimeContext {
    schema: MasterObjectSchema;
    fields: FieldDefinition[];
    values: Record<string, any>;
    user: {
        id: string;
        roles: string[];
        attributes?: Record<string, any>;
    };
    workflowStage?: {
        id: string;
        code: string;
    };
    mode: "VIEW" | "EDIT" | "SUBMIT";
}
export interface ExecutedField {
    key: string;
    label: string;
    fieldType: string;
    dataType: FieldDataType;
    value: any;
    visible: boolean;
    required: boolean;
    readOnly: boolean;
    errors: string[];
    config: any;
}
export interface FormRuntimeResult {
    fields: ExecutedField[];
    values: Record<string, any>;
    errors: ValidationError[];
    readOnly: boolean;
}
export interface FormRuntimeEngine {
    execute(ctx: FormRuntimeContext): FormRuntimeResult;
    validate(ctx: FormRuntimeContext): ValidationError[];
}
export declare class DefaultFormRuntimeEngine implements FormRuntimeEngine {
    execute(ctx: FormRuntimeContext): FormRuntimeResult;
    validate(ctx: FormRuntimeContext): ValidationError[];
}
//# sourceMappingURL=engine.d.ts.map