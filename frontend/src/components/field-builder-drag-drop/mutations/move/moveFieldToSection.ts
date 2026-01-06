import { EditorNode, FormSection } from "../../contracts/editor.contract";
import { extractField } from "../extractField";

export function moveFieldToSection(
  sections: FormSection[],
  fieldId: string,
  targetSectionId: string
): FormSection[] {
  let extracted: EditorNode | null = null;

  return sections.map((s) => {
    const result = extractField(s.nodes, fieldId);
    if (result.field) extracted = result.field;

    if (s.id !== targetSectionId || !extracted) {
      return { ...s, nodes: result.nodes };
    }

    return {
      ...s,
      nodes: [...result.nodes, extracted],
    };
  });
}
