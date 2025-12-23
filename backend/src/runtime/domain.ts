// runtime/domain.ts

export interface RuntimeField {
  key: string;
  label: string;
  config: Record<string, any>;


  isSystem: boolean;
  isLocked: boolean;
  isRequired: boolean;

  permissions: RuntimeFieldPermission[];
  visibility?: RuntimeVisibilityRule;
  order: number;
}

export interface RuntimeFieldPermission {
  roleId?: string | null;
  userId?: string | null;
  canRead: boolean;
  canWrite: boolean;
  condition?: Condition;
}

export interface RuntimeFormula {
  fieldKey: string;
  expression: string;
  dependencies: string[];
}

export interface RuntimeValidationRule {
  fieldKey: string;
  type: ValidationRuleType;
  rule: ValidationRuleConfig;
  errorMessage: string;
  severity?: "ERROR" | "WARNING";
}

export type ValidationRuleType =
  | "REQUIRED"
  | "REQUIRED_IF"
  | "REGEX"
  | "RANGE"
  | "LENGTH"
  | "CUSTOM";

export type ValidationRuleConfig =
  | { fieldKey: string; value: any }
  | { regex: string }
  | { min: number; max: number }
  | { min?: number; max?: number }
  | Record<string, any>;

export interface RuntimeVisibilityRule {
  visible?: boolean;
  conditions?: Condition;
}

export type Condition =
  | {
      all: Condition[];
    }
  | {
      any: Condition[];
    }
  | {
      not: Condition;
    }
  | ConditionLeaf;

export interface ConditionLeaf {
  field: string;
  operator:
    | "EQUALS"
    | "NOT_EQUALS"
    | "IN"
    | "NOT_IN"
    | "GREATER_THAN"
    | "LESS_THAN";
  value: any;
}

// design the frontend condition builder JSON
// Frontend condition builder UI