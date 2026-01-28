import { FormSection } from "../../contracts/editor.contract";
import { extractField } from "../extractField";
import { walkEditorTree } from "../../dnd/walkEditorTree";
import { isSlotLayoutNode } from "../../editor-utils/layout.guards";

export function moveFieldToSlot(
  sections: FormSection[],
  fieldId: string,
  containerId: string,
  slotId: string
): FormSection[] {
  return sections.map((section) => {
    const { nodes, field } = extractField(section.nodes, fieldId);
    if (!field) return section;

    return {
      ...section,
      nodes: walkEditorTree(nodes, (node) => {
        if (
          isSlotLayoutNode(node) &&
          node.id === containerId
        ) {
          return {
            ...node,
            slots: node.slots.map((slot) =>
              slot.id === slotId
                ? { ...slot, children: [...slot.children, field] }
                : slot
            ),
          };
        }
        return node;
      }),
    };
  });
}

