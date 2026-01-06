import { FormSection } from "../../contracts/editor.contract";
import { PaletteItem } from "../../contracts/fieldPalette.contract";
import { createEditorNodeFromPalette } from "../../types/createEditorNodeFromPalette";

export function addFieldAtPosition(
  sections: FormSection[],
  item: PaletteItem,
  sectionId: string,
  targetNodeId: string,
  position: "before" | "after"
): FormSection[] {
  return sections.map((s) => {
    if (s.id !== sectionId) return s;

    const index = s.nodes.findIndex((n) => n.id === targetNodeId);
    if (index === -1) return s;

    const insertAt = position === "before" ? index : index + 1;
    const next = [...s.nodes];
    next.splice(insertAt, 0, createEditorNodeFromPalette(item));

    return { ...s, nodes: next };
  });
}
