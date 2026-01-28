// utils/isSlotLayoutNode.ts
import { EditorNode, SlotLayoutNode } from "../contracts/editor.contract";

export function isSlotLayoutNode(
  node: EditorNode
): node is SlotLayoutNode {
  return node.kind === "LAYOUT" && "slots" in node;
}
