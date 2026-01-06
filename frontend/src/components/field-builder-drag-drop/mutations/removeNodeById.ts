import { EditorNode } from "../contracts/editor.contract";
import { walkEditorTree } from "../dnd/walkEditorTree";

export function removeNodeById(
  nodes: EditorNode[],
  nodeId: string
): EditorNode[] {
  return walkEditorTree(nodes, (node) =>
    node.id === nodeId ? null : node
  );
}
