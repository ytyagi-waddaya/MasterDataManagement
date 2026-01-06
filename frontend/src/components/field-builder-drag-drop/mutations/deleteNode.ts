import { EditorNode, FormSection } from "../contracts/editor.contract";

import { isSlotLayoutNode } from "../types/layout.guards";

export function deleteNode(
  sections: FormSection[],
  nodeId: string
): FormSection[] {
  const remove = (nodes: EditorNode[]): EditorNode[] =>
    nodes
      .map((node): EditorNode | null => {
        if (node.id === nodeId) return null;

        if (isSlotLayoutNode(node)) {
          return {
            ...node,
            slots: node.slots.map((slot) => ({
              ...slot,
              children: remove(slot.children),
            })),
          };
        }

        return node;
      })
      .filter((n): n is EditorNode => n !== null);

  return sections.map((s) => ({
    ...s,
    nodes: remove(s.nodes),
  }));
}
