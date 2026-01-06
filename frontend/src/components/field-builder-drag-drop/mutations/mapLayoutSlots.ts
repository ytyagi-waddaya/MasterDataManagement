import { EditorNode } from "../contracts/editor.contract";
import { isSlotLayoutNode } from "../types/layout.guards";

/* ======================================================
   MAP ALL LAYOUT SLOTS (UTILITY)
====================================================== */
export function mapLayoutSlots(
  node: EditorNode,
  fn: (
    children: EditorNode[],
    slotId: string,
    layoutId: string
  ) => EditorNode[]
): EditorNode {
  if (!isSlotLayoutNode(node)) return node;

  return {
    ...node,
    slots: node.slots.map((slot) => ({
      ...slot,
      children: fn(slot.children, slot.id, node.id),
    })),
  };
}
