import { FormSection } from "../../contracts/editor.contract";
import { PaletteItem } from "../../contracts/fieldPalette.contract";
import { createEditorNodeFromPalette } from "../../editor-utils/createEditorNodeFromPalette";

export function addFieldToSection(
  sections: FormSection[],
  item: PaletteItem,
  sectionId: string
): { sections: FormSection[]; createdId: string } {
  const newNode = createEditorNodeFromPalette(item);

  return {
    createdId: newNode.id,
    sections: sections.map((s) =>
      s.id === sectionId
        ? { ...s, nodes: [...s.nodes, newNode] }
        : s
    ),
  };
}
