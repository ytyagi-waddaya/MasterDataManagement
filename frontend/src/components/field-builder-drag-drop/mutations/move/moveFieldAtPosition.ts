import { FormSection, EditorNode } from "../../contracts/editor.contract";
import { extractField } from "../extractField";

export function moveFieldAtPosition(
  sections: FormSection[],
  fieldId: string,
  sectionId: string,
  targetNodeId: string,
  position: "before" | "after"
): FormSection[] {
  let extractedField: EditorNode | null = null;

  /* =========================================
     STEP 1: REMOVE FIELD FROM TREE
  ========================================= */
  const sectionsWithoutField = sections.map((section) => {
    const result = extractField(section.nodes, fieldId);

    if (result.field) {
      extractedField = result.field;
    }

    return { ...section, nodes: result.nodes };
  });

  /* =========================================
     SAFETY CHECK (TYPE NARROWING)
  ========================================= */
  if (!extractedField) {
    // field not found → no mutation
    return sections;
  }

  const field = extractedField; // ✅ now non-null

  /* =========================================
     STEP 2: INSERT AT TARGET POSITION
  ========================================= */
  return sectionsWithoutField.map((section) => {
    if (section.id !== sectionId) return section;

    const index = section.nodes.findIndex(
      (n) => n.id === targetNodeId
    );

    if (index === -1) return section;

    const insertAt = position === "before" ? index : index + 1;

    const next = [...section.nodes];
    next.splice(insertAt, 0, field); // ✅ SAFE

    return { ...section, nodes: next };
  });
}
