import { FieldKey } from "./condition.contract";

export function createFieldKey(raw: string): FieldKey {
  return raw as FieldKey;
}

//helper
export function toFieldKey(id: string): FieldKey {
  return id as FieldKey;
}
