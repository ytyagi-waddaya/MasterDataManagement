import { FormSection } from "../../contracts/editor.contract";
import { FieldDefinition } from "../../contracts/field-definition.contract";
import { RuntimeField } from "../../contracts/runtime.contract";
import { fieldDefinitionToConfig } from "../../types/fieldDefinitionToConfig";

export function buildRuntimeSchemaFromCanonical(
  sections: FormSection[],
  defs: FieldDefinition[],
): RuntimeField[] {
  const map = Object.fromEntries(defs.map((d) => [d.key, fieldDefinitionToConfig(d)]));
  const nodes = sections.flatMap((s) => s.nodes);

  return nodes
    .filter((n) => n.kind === "FIELD")
    .map((n) => ({
      id: n.id,
      fieldKey: n.field.key,
      config: map[n.field.key],
      state: {
        value: map[n.field.key]?.data.default,
        visible: true,
        readOnly: false,
        errors: [],
      },
    }));
}
