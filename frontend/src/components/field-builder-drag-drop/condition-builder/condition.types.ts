import { FieldKey } from "../contracts/condition.contract";
import { FieldDataType } from "./condition-ui.schema";

export type FieldMeta = {
  key: FieldKey;
  label: string;
  type: FieldDataType;
};
