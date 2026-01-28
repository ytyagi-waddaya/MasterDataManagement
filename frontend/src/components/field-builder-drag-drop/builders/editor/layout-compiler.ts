
import { BackendEditorNode, BackendFormSection } from "../../contracts/backend-layout.contract";
import { EditorNode, FormSection } from "../../contracts/editor.contract";

export function buildBackendLayoutSchema(
  sections: FormSection[],
): BackendFormSection[] {
  return sections.map((section) => ({
    id: section.id,
    title: section.title,
    collapsed: section.collapsed,
    nodes: normalizeNodes(section.nodes),
  }));
}

function normalizeNodes(nodes: EditorNode[]): BackendEditorNode[] {
  return nodes.map((node) => {
    if (node.kind === "FIELD") {
      return {
        id: node.id,
        kind: "FIELD",
        field: {
          key: node.field.key,
          layout: { span: node.field.layout.span },
        },
      };
    }

    if (node.kind === "LAYOUT" && "slots" in node) {
      return {
        id: node.id,
        kind: "LAYOUT",
        type: node.type,
        slots: node.slots.map((s) => ({
          id: s.id,
          title: s.title,
          config: s.config,
          children: normalizeNodes(s.children),
        })),
        config: node.config,
      };
    }

    return {
      id: node.id,
      kind: "LAYOUT",
      type: node.type,
      config: node.config,
    };
  });
}
