import { FieldDefinition } from "./field-definition.contract";
import { FieldValidationRule } from "./field-config.contract";

export type FieldDefinitionWithRules = FieldDefinition & {
  fieldValidationRules?: FieldValidationRule[];
};
