import { FieldKey } from "./condition.contract";

export function createFieldKey(raw: string): FieldKey {
  if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(raw)) {
    throw new Error("Invalid field key");
  }
  return raw as FieldKey;
}


//helper
export function toFieldKey(id: string): FieldKey {
  return id as FieldKey;
}
