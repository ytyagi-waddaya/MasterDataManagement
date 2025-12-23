// runtime/types.ts

import {
  RuntimeField,
  RuntimeFormula,
  RuntimeValidationRule,
} from "./domain.js";

export type RuntimeMode = "VIEW" | "EDIT" | "SUBMIT" | "SYSTEM_RECALC";

export interface RuntimeContext {
  fields: RuntimeField[];
  formulas: RuntimeFormula[];
  validationRules: RuntimeValidationRule[];

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

  mode: RuntimeMode;
}

export interface RuntimeResult {
  fields: ExecutedField[];
  values: Record<string, any>;
  errors: {
    field: string;
    errors: string[];
  }[];
}

export interface ExecutedField {
  key: string;
  label: string;
  value: any;

  visible: boolean;
  required: boolean;
  readOnly: boolean;

  errors: string[];
  config: Record<string, any>;

}
