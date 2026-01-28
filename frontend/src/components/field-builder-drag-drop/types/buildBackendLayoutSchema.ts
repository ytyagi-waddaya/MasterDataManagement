import { EditorNode, FormSection } from "../contracts/editor.contract";
import {
  BackendEditorNode,
  BackendFormSection,
} from "../contracts/backend-layout.contract";

/* ======================================================
   PUBLIC API
====================================================== */

export function buildBackendLayoutSchema(
  sections: FormSection[]
): BackendFormSection[] {
  return sections.map((section) => ({
    id: section.id,
    title: section.title,
    collapsed: section.collapsed,
    nodes: normalizeBackendNodes(section.nodes),
  }));
}

/* ======================================================
   INTERNAL NORMALIZER
====================================================== */

function normalizeBackendNodes(
  nodes: EditorNode[]
): BackendEditorNode[] {
  return nodes.map((node) => {
    /* ---------- FIELD ---------- */
    if (node.kind === "FIELD") {
      if (!node.field?.key) {
        throw new Error(`FIELD node missing key: ${node.id}`);
      }

      return {
        id: node.id,
        kind: "FIELD",
        field: {
          key: node.field.key,
          layout: {
            span: node.field.layout.span,
          },
        },
      };
    }

    /* ---------- LAYOUT (with slots) ---------- */
    if (node.kind === "LAYOUT" && "slots" in node) {
      return {
        id: node.id,
        kind: "LAYOUT",
        type: node.type,
        slots: node.slots.map((slot) => ({
          id: slot.id,
          title: slot.title,
          config: slot.config,
          children: normalizeBackendNodes(slot.children),
        })),
        config: node.config,
      };
    }

    /* ---------- LAYOUT (simple) ---------- */
    if (node.kind === "LAYOUT") {
      return {
        id: node.id,
        kind: "LAYOUT",
        type: node.type,
        config: node.config,
      };
    }

    throw new Error(`Unknown editor node kind: ${(node as any).kind}`);
  });
}
