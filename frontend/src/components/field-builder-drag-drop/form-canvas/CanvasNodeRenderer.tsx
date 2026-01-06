// form-canvas/CanvasNodeRenderer.tsx
import {
  EditorNode,
  EditorSelection,
  FormSection,
  InsertPos,
} from "../contracts/editor.contract";
import {
  ColumnsView,
  TabsView,
  AccordionView,
  RepeaterView,
  SimpleLayoutView,
  FieldView,
} from "./view";

export function CanvasNodeRenderer({
  node,
  selection,
  onSelectNode,
  insertPos,
  setInsertPos,
  sectionId,
}: {
  node: EditorNode;
  selection: EditorSelection;
  onSelectNode: (id: string) => void;
  insertPos: InsertPos | null;
  setInsertPos: (pos: InsertPos | null) => void;
  sectionId: string;
}) {
  if (node.kind === "FIELD") {
    return <FieldView node={node} />;
  }

  switch (node.type) {
    case "columns":
      return (
        <ColumnsView
          node={node}
          sectionId={sectionId}
          selection={selection}
          onSelectNode={onSelectNode}
          insertPos={insertPos}
          setInsertPos={setInsertPos}
        />
      );

    case "tabs":
      return (
        <TabsView
          node={node}
          sectionId={sectionId}
          selection={selection}
          onSelectNode={onSelectNode}
          insertPos={insertPos}
          setInsertPos={setInsertPos}
        />
      );

    case "accordion":
      return (
        <AccordionView
          node={node}
          sectionId={sectionId}
          selection={selection}
          onSelectNode={onSelectNode}
          insertPos={insertPos}
          setInsertPos={setInsertPos}
        />
      );

    case "repeater":
      return (
        <RepeaterView
          node={node}
          sectionId={sectionId}
          selection={selection}
          onSelectNode={onSelectNode}
          insertPos={insertPos}
          setInsertPos={setInsertPos}
        />
      );

    case "heading":
    case "divider":
    case "spacer":
      return <SimpleLayoutView node={node} />;

    default:
      return null;
  }
}
