import { EditorNode } from "../contracts/editor.contract";

import { isSlotLayoutNode } from "../types/layout.guards";

export function extractField(
  nodes: EditorNode[],
  fieldId: string
): { nodes: EditorNode[]; field: EditorNode | null } {
  let extracted: EditorNode | null = null;

  const walk = (list: EditorNode[]): EditorNode[] =>
    list
      .map((node): EditorNode | null => {
        if (node.kind === "FIELD") {
          if (node.field.id === fieldId) {
            extracted = node;
            return null;
          }
          return node;
        }

        if (isSlotLayoutNode(node)) {
          return {
            ...node,
            slots: node.slots.map((slot) => ({
              ...slot,
              children: walk(slot.children),
            })),
          };
        }

        return node;
      })
      .filter((n): n is EditorNode => n !== null);

  return { nodes: walk(nodes), field: extracted };
}

