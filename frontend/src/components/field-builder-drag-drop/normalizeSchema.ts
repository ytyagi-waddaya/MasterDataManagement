import {
  FormSection,
  EditorNode,
  FieldNode,
  LayoutNode,
} from "./contracts/editor.contract";

export function normalizeEditorSchema(
  sections: any[]
): FormSection[] {
  return sections.map((section) => ({
    id: section.id,
    title: section.title ?? "Section",
    collapsed: section.collapsed ?? false,
    nodes: normalizeNodes(section.nodes ?? []),
  }));
}

function normalizeNodes(nodes: any[]): EditorNode[] {
  return nodes.map((node): EditorNode => {
    /* ================= FIELD NODE ================= */
    if (node.kind === "FIELD") {
      const fieldNode: FieldNode = {
        id: node.id,
        kind: "FIELD",
        field: {
          id: node.field.id ?? node.id, 
          key: node.field.key,
          label: node.field.label,
          category: node.field.category ?? "INPUT",
          type: node.field.type ?? "text",
          layout: {
            span: node.field.layout?.span ?? 12,
          },
          required: node.field.required ?? false,
          readOnly: node.field.readOnly ?? false,
        },
      };

      return fieldNode;
    }

    /* ================= LAYOUT NODE ================= */
    const layoutNode: LayoutNode = {
      id: node.id,
      kind: "LAYOUT",
      type: node.type,
      slots: (node.slots ?? []).map((slot: any) => ({
        id: slot.id,
        title: slot.title,
        children: normalizeNodes(slot.children ?? []),
      })),
      config: node.config ?? {},
    };

    return layoutNode;
  });
}
