import { Node } from "../node.types";
import { useFormBuilderStore } from "../state/useFormBuilderStore";
import { FieldNode } from "./FieldNode";
import { LayoutNode } from "./LayoutNode";
import { DividerNode } from "./presentation/DividerNode";
import { HeadingNode } from "./presentation/HeadingNode";
import { RepeaterNode } from "./presentation/RepeaterNode";
import { SpacerNode } from "./presentation/SpacerNode";

type Props = {
  node: Node;
  sectionId: string;
  slotId?: string;
};

/* ======================================================
   COMPONENT
====================================================== */

export function NodeRenderer({ node, sectionId, slotId }: Props) {
  const selectNode = useFormBuilderStore((s) => s.selectNode);

  function handleSelect(e: React.MouseEvent) {
    e.stopPropagation();
    selectNode({
      sectionId,
      nodeId: node.id,
      slotId,
    });
  }

  /* ---------- FIELD ---------- */
  if (node.kind === "FIELD") {
    return (
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          useFormBuilderStore.getState().selectField(node.field.key);
        }}
      >
        <FieldNode node={node} sectionId={sectionId} slotId={slotId} />
      </div>
    );
  }

  /* ---------- LAYOUT ---------- */
  return (
    <div onClick={handleSelect} className="cursor-pointer">
      {node.type === "heading" && <HeadingNode node={node} />}
      {node.type === "divider" && <DividerNode />}
      {node.type === "spacer" && <SpacerNode node={node} />}
      {node.type === "repeater" && (
        <RepeaterNode node={node} sectionId={sectionId} />
      )}
      {(node.type === "columns" || node.type === "tabs") && (
        <LayoutNode node={node} sectionId={sectionId} />
      )}
    </div>
  );
}
