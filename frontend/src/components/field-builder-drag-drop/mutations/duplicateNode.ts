import { nanoid } from "nanoid";
import { EditorNode, FormSection } from "../contracts/editor.contract";
import { isSlotLayoutNode } from "../editor-utils/layout.guards";
import { createFieldKey } from "../contracts/field-key";

export function duplicateNode(
  sections: FormSection[],
  nodeId: string
): FormSection[] {
  const clone = (node: EditorNode): EditorNode => {
    if (node.kind === "FIELD") {
      return {
        ...node,
        id: nanoid(),
        field: {
          ...node.field,
          id: nanoid(),
          key: createFieldKey(`field_${nanoid(6)}`),
        },
      };
    }

    // ✅ SLOT LAYOUTS ONLY
    if (isSlotLayoutNode(node)) {
      return {
        ...node,
        id: nanoid(),
        slots: node.slots.map((slot) => ({
          ...slot,
          id: nanoid(),
          children: slot.children.map(clone),
        })),
      };
    }

    // ✅ SIMPLE LAYOUTS (divider, heading, spacer)
    return {
      ...node,
      id: nanoid(),
    };
  };

  const walk = (nodes: EditorNode[]): EditorNode[] => {
    const result: EditorNode[] = [];

    for (const node of nodes) {
      // ✅ Rebuild children safely
      let next = node;

      if (isSlotLayoutNode(node)) {
        next = {
          ...node,
          slots: node.slots.map((slot) => ({
            ...slot,
            children: walk(slot.children),
          })),
        };
      }

      result.push(next);

      // ✅ Duplicate immediately after
      if (node.id === nodeId) {
        result.push(clone(node));
      }
    }

    return result;
  };

  return sections.map((s) => ({
    ...s,
    nodes: walk(s.nodes),
  }));
}
