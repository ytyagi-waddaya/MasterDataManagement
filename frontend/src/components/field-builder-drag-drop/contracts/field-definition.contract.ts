import {
  FieldCategory,
  FieldDataType,
  FieldUI,
  FieldValidation,
  FieldBehavior,
  FieldVisibility,
  FieldPermissions,
  FieldIntegration,
  FieldMeta,
  FieldData,
} from "./field-config.contract";
import { EditorFieldType } from "./fieldPalette.contract";

/* ======================================================
   FIELD DEFINITION (PUBLISHED CANONICAL)
   🔥 Single source of truth after publish
====================================================== */
export type FieldDefinition = {
  id: string;
  key: string;
  label: string;

  category: FieldCategory;
  dataType: FieldDataType;
  fieldType: EditorFieldType;

  /** Canonical config used by runtime */
  config?: {
    meta?:FieldMeta;
    data?:FieldData;
    ui?: FieldUI;
    validation?: FieldValidation;
    integration?: FieldIntegration;
    behavior?: FieldBehavior;
    visibility?: FieldVisibility;
    permissions?: FieldPermissions;
  };

  /** Derived flags (denormalized for speed) */
  isRequired: boolean;
  isReadOnly?: boolean;
  description?: string; // 👈 ADD
  default?: any;
  isActive: boolean;
};
