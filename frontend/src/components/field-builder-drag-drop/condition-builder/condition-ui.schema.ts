import { ConditionLeaf, FieldKey } from "../contracts/condition.contract";

export type FieldDataType =
  | "STRING"
  | "NUMBER"
  | "BOOLEAN"
  | "DATE"
  | "DATETIME";

export type ConditionInputType =
  | "NONE"
  | "TEXT"
  | "NUMBER"
  | "BOOLEAN"
  | "SELECT_MULTI"
  | "DATE";

export interface ConditionOperatorUI {
  operator: ConditionLeaf["operator"];
  label: string;
  inputType: ConditionInputType;
  requiresValue: boolean;
  supportedFieldTypes: FieldDataType[];
}

export const CONDITION_OPERATORS_UI: readonly ConditionOperatorUI[] = [
  {
    operator: "EXISTS",
    label: "Is filled",
    inputType: "NONE",
    requiresValue: false,
    supportedFieldTypes: ["STRING", "NUMBER", "BOOLEAN", "DATE", "DATETIME"],
  },
  {
    operator: "EQUALS",
    label: "Equals",
    inputType: "TEXT",
    requiresValue: true,
    supportedFieldTypes: ["STRING", "NUMBER", "BOOLEAN"],
  },
  {
    operator: "NOT_EQUALS",
    label: "Does not equal",
    inputType: "TEXT",
    requiresValue: true,
    supportedFieldTypes: ["STRING", "NUMBER", "BOOLEAN"],
  },
  {
    operator: "GT",
    label: "Greater than",
    inputType: "NUMBER",
    requiresValue: true,
    supportedFieldTypes: ["NUMBER", "DATE", "DATETIME"],
  },
  {
    operator: "GTE",
    label: "Greater than or equal",
    inputType: "NUMBER",
    requiresValue: true,
    supportedFieldTypes: ["NUMBER", "DATE", "DATETIME"],
  },
  {
    operator: "LT",
    label: "Less than",
    inputType: "NUMBER",
    requiresValue: true,
    supportedFieldTypes: ["NUMBER", "DATE", "DATETIME"],
  },
  {
    operator: "LTE",
    label: "Less than or equal",
    inputType: "NUMBER",
    requiresValue: true,
    supportedFieldTypes: ["NUMBER", "DATE", "DATETIME"],
  },
  {
    operator: "IN",
    label: "Is any of",
    inputType: "SELECT_MULTI",
    requiresValue: true,
    supportedFieldTypes: ["STRING", "NUMBER"],
  },
  {
    operator: "NOT_IN",
    label: "Is none of",
    inputType: "SELECT_MULTI",
    requiresValue: true,
    supportedFieldTypes: ["STRING", "NUMBER"],
  },
];

export function getOperatorsForFieldType(type: FieldDataType) {
  return CONDITION_OPERATORS_UI.filter(op =>
    op.supportedFieldTypes.includes(type)
  );
}
