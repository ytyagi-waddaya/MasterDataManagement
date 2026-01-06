import { EditorNode, FormSection } from "../contracts/editor.contract";
import { isSlotLayoutNode } from "../types/layout.guards";


/* ======================================================
   FIND NODE BY ID (SLOT SAFE)
====================================================== */
export function findNodeById(
  sections: FormSection[],
  nodeId: string | null
): EditorNode | null {
  if (!nodeId) return null;

  const walk = (nodes: EditorNode[]): EditorNode | null => {
    for (const node of nodes) {
      if (node.id === nodeId) return node;

      if (isSlotLayoutNode(node)) {
        for (const slot of node.slots) {
          const found = walk(slot.children);
          if (found) return found;
        }
      }
    }
    return null;
  };

  for (const section of sections) {
    const found = walk(section.nodes);
    if (found) return found;
  }

  return null;
}
