import { EditorField } from "./editor.contract";
import { FieldCategory, FieldDataType, FieldUI, FieldValidation } from "./field-config.contract";
import { EditorFieldType } from "./fieldPalette.contract";

export type FieldDefinition = {
  id: string;
  key: string;
  label: string;
  category: FieldCategory; // ✅ reuse canonical type

  dataType: FieldDataType;
  fieldType: EditorFieldType;

  config?: {
    ui?: FieldUI;
    validation?: FieldValidation;
    integration?: EditorField["integration"];
  };

  isRequired: boolean;
  isReadOnly?: boolean;
  isActive: boolean;
};
