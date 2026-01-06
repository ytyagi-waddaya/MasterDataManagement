import { FormSection } from "../../contracts/editor.contract";
import { PaletteItem } from "../../contracts/fieldPalette.contract";
import { walkEditorTree } from "../../dnd/walkEditorTree";
import { createEditorNodeFromPalette } from "../../types/createEditorNodeFromPalette";
import { isSlotLayoutNode } from "../../types/layout.guards";


export function addFieldToContainerSlot(
  sections: FormSection[],
  item: PaletteItem,
  containerId: string,
  slotId: string
): FormSection[] {
  // ⛔ layouts cannot be dropped inside slots
  if (item.kind === "LAYOUT") return sections;

  const newNode = createEditorNodeFromPalette(item);

  return sections.map((section) => ({
    ...section,
    nodes: walkEditorTree(section.nodes, (node) => {
      if (
        isSlotLayoutNode(node) &&
        node.id === containerId
      ) {
        return {
          ...node,
          slots: node.slots.map((slot) =>
            slot.id === slotId
              ? { ...slot, children: [...slot.children, newNode] }
              : slot
          ),
        };
      }
      return node;
    }),
  }));
}
