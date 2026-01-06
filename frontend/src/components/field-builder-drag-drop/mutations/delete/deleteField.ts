import { FormSection } from "../../contracts/editor.contract";
import { removeNodeById } from "../removeNodeById";


export function deleteField(
  sections: FormSection[],
  fieldId: string
): FormSection[] {
  return sections.map((s) => ({
    ...s,
    nodes: removeNodeById(s.nodes, fieldId),
  }));
}
