import { EditorNode } from "../contracts/editor.contract";
import { isSlotLayoutNode } from "../editor-utils/layout.guards";

/* ======================================================
   WALK EDITOR TREE (POST-ORDER, SLOT SAFE)
====================================================== */
export function walkEditorTree(
  nodes: EditorNode[],
  fn: (node: EditorNode) => EditorNode | null
): EditorNode[] {
  return nodes
    .map((node): EditorNode | null => {
      let next = node;

      if (isSlotLayoutNode(node)) {
        next = {
          ...node,
          slots: node.slots.map((slot) => ({
            ...slot,
            children: walkEditorTree(slot.children, fn),
          })),
        };
      }

      return fn(next);
    })
    .filter(Boolean) as EditorNode[];
}
