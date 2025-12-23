export interface FieldConfig {
    meta: FieldMeta;
    data: FieldData;
    ui?: FieldUI;
    validation?: FieldValidation;
    visibility?: FieldVisibility;
    permissions?: FieldPermissions;
    behavior?: FieldBehavior;
    integration?: FieldIntegration;
}
export type FieldCategory = "INPUT" | "SYSTEM" | "CALCULATED" | "REFERENCE" | "STRUCTURE" | "PRESENTATION";
export interface FieldMeta {
    key: string;
    label: string;
    description?: string;
    category: FieldCategory;
    system?: boolean;
    locked?: boolean;
    deprecated?: boolean;
}
export type FieldDataType = "STRING" | "NUMBER" | "BOOLEAN" | "DATE" | "DATETIME" | "JSON";
export interface FieldData {
    type: FieldDataType;
    default?: any;
    nullable?: boolean;
    precision?: number;
    scale?: number;
}
export interface FieldUI {
    widget: "TEXT" | "TEXTAREA" | "NUMBER" | "CURRENCY" | "SELECT" | "RADIO" | "CHECKBOX" | "DATE" | "DATETIME";
    placeholder?: string;
    helpText?: string;
    layout?: {
        width?: "full" | "half" | "third" | "quarter" | "two-third";
        order?: number;
        section?: string;
    };
    format?: {
        style?: "currency" | "percent" | "decimal";
        currency?: string;
    };
}
export type ValidationRuleType = "REQUIRED" | "RANGE" | "MIN" | "MAX" | "REGEX" | "REQUIRED_IF";
export interface FieldValidationRule {
    type: ValidationRuleType;
    params?: Record<string, any>;
    message: string;
    severity?: "ERROR" | "WARN";
}
export interface FieldValidation {
    required?: boolean;
    rules?: FieldValidationRule[];
}
export interface VisibilityCondition {
    field: string;
    operator: "EQUALS" | "IN" | "GT" | "LT";
    value: any;
}
export interface FieldVisibility {
    visible?: boolean;
    conditions?: VisibilityCondition[];
}
export interface PermissionCondition {
    field: string;
    equals: any;
}
export interface PermissionRule {
    roles?: string[];
    users?: string[];
    conditions?: PermissionCondition[];
}
export interface FieldPermissions {
    read?: PermissionRule;
    write?: PermissionRule;
}
export interface FieldFormula {
    expression: string;
    dependencies: string[];
    mode?: "SYSTEM_RECALC" | "ON_CHANGE";
}
export interface FieldBehavior {
    formula?: FieldFormula;
    readOnly?: boolean;
    lockWhen?: {
        field: string;
        equals: any;
    };
}
export interface ReferenceConfig {
    targetObject: string;
    displayField: string;
    relation: "ONE_TO_ONE" | "ONE_TO_MANY";
    allowMultiple?: boolean;
    onDelete?: "CASCADE" | "SET_NULL";
}
export interface ApiSourceConfig {
    url: string;
    method: "GET" | "POST";
    valueField: string;
    labelField: string;
    dependsOn?: string[];
    params?: Record<string, string | number | boolean>;
    cache?: boolean;
}
export interface FieldIntegration {
    reference?: ReferenceConfig;
    apiSource?: ApiSourceConfig;
}
export declare const IMMUTABLE_AFTER_PUBLISH: readonly ["meta.key", "meta.category", "data.type", "behavior.formula"];
//# sourceMappingURL=fieldConfig.d.ts.map