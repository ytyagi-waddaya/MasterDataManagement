import { EditorNode, FormSection } from "../contracts/editor.contract";

import { isSlotLayoutNode } from "../types/layout.guards";

export function updateNode(
  sections: FormSection[],
  updated: EditorNode
): FormSection[] {
  const walk = (nodes: EditorNode[]): EditorNode[] =>
    nodes.map((node) => {
      if (node.id === updated.id) return updated;

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
    });

  return sections.map((s) => ({
    ...s,
    nodes: walk(s.nodes),
  }));
}
