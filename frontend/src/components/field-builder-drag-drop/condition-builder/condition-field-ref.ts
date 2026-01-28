import { FieldKey } from "../contracts/condition.contract";
import { EditorFieldType } from "../contracts/fieldPalette.contract";

export type ConditionFieldRef = {
  key: FieldKey;
  label: string;
  type: EditorFieldType;
};
