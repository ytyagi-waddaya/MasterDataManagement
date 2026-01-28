import { nanoid } from "nanoid";
import { EditorNode, FormSection } from "../contracts/editor.contract";
import { isSlotLayoutNode } from "../editor-utils/layout.guards";
import { createFieldKey } from "../contracts/field-key";


/* ======================================================
   FIND NODE BY ID (SLOT-SAFE)
====================================================== */

export function findNodeById(
  sections: FormSection[],
  nodeId: string | null
): EditorNode | null {
  if (!nodeId) return null;

  for (const section of sections) {
    const found = findInNodes(section.nodes, nodeId);
    if (found) return found;
  }

  return null;
}

function findInNodes(
  nodes: EditorNode[],
  nodeId: string
): EditorNode | null {
  for (const node of nodes) {
    if (node.id === nodeId) return node;

    if (isSlotLayoutNode(node)) {
      for (const slot of node.slots) {
        const found = findInNodes(slot.children, nodeId);
        if (found) return found;
      }
    }
  }
  return null;
}

/* ======================================================
   UPDATE NODE (IMMUTABLE, SLOT-SAFE)
====================================================== */

export function updateNode(
  sections: FormSection[],
  updated: EditorNode
): FormSection[] {
  return sections.map((section) => ({
    ...section,
    nodes: updateInNodes(section.nodes, updated),
  }));
}

function updateInNodes(
  nodes: EditorNode[],
  updated: EditorNode
): EditorNode[] {
  return nodes.map((node) => {
    if (node.id === updated.id) return updated;

    if (isSlotLayoutNode(node)) {
      return {
        ...node,
        slots: node.slots.map((slot) => ({
          ...slot,
          children: updateInNodes(slot.children, updated),
        })),
      };
    }

    return node;
  });
}

/* ======================================================
   DELETE NODE (SLOT-SAFE)
====================================================== */

export function deleteNode(
  sections: FormSection[],
  nodeId: string
): FormSection[] {
  return sections.map((section) => ({
    ...section,
    nodes: removeNodeRecursive(section.nodes, nodeId),
  }));
}

function removeNodeRecursive(
  nodes: EditorNode[],
  nodeId: string
): EditorNode[] {
  const result: EditorNode[] = [];

  for (const node of nodes) {
    if (node.id === nodeId) continue;

    if (isSlotLayoutNode(node)) {
      result.push({
        ...node,
        slots: node.slots.map((slot) => ({
          ...slot,
          children: removeNodeRecursive(slot.children, nodeId),
        })),
      });
    } else {
      result.push(node);
    }
  }

  return result;
}


/* ======================================================
   DUPLICATE NODE (IMMUTABLE, SLOT-SAFE)
====================================================== */

export function duplicateNode(
  sections: FormSection[],
  nodeId: string
): FormSection[] {
  return sections.map((section) => ({
    ...section,
    nodes: duplicateRecursive(section.nodes, nodeId),
  }));
}

function duplicateRecursive(
  nodes: EditorNode[],
  targetId: string
): EditorNode[] {
  const result: EditorNode[] = [];

  for (const node of nodes) {
    result.push(node);

    if (node.id === targetId) {
      result.push(cloneNode(node));
    }

    if (isSlotLayoutNode(node)) {
      result[result.length - 1] = {
        ...node,
        slots: node.slots.map((slot) => ({
          ...slot,
          children: duplicateRecursive(slot.children, targetId),
        })),
      };
    }
  }

  return result;
}

/* ======================================================
   CLONE NODE (DEEP, SLOT-SAFE)
====================================================== */

function cloneNode(node: EditorNode): EditorNode {
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

  if (isSlotLayoutNode(node)) {
    return {
      ...node,
      id: nanoid(),
      slots: node.slots.map((slot) => ({
        ...slot,
        id: nanoid(),
        children: slot.children.map(cloneNode),
      })),
    };
  }

  // SIMPLE LAYOUT (divider / heading / spacer)
  return {
    ...node,
    id: nanoid(),
  };
}
