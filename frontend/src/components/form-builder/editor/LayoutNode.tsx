import { useFormBuilderStore } from "../state/useFormBuilderStore";
import { NodeRenderer } from "./NodeRenderer";
import { GenericLayoutNode } from "../node.types";

/* ======================================================
   PROPS
====================================================== */

type Props = {
  node: GenericLayoutNode;
  sectionId: string;
};

/* ======================================================
   COMPONENT
====================================================== */

export function LayoutNode({ node, sectionId }: Props) {
  const { selectNode, selectedNodePath } = useFormBuilderStore();

  function selectLayout(e: React.MouseEvent) {
    e.stopPropagation();
    selectNode({
      sectionId,
      nodeId: node.id,
    });
  }

  function selectSlot(e: React.MouseEvent, slotId: string) {
    e.stopPropagation();
    selectNode({
      sectionId,
      nodeId: node.id,
      slotId,
    });
  }

  // ---------- Generic layouts ALWAYS have slots ----------
  return (
    <div
      className="border-dashed border p-3 rounded cursor-pointer"
      onClick={selectLayout}
    >
      <div className="text-xs mb-2">{node.type}</div>

      {node.slots.map((slot) => {
        const isSlotSelected =
          selectedNodePath?.nodeId === node.id &&
          selectedNodePath?.slotId === slot.id;

        return (
          <div
            key={slot.id}
            onClick={(e) => selectSlot(e, slot.id)}
            className={`ml-4 space-y-2 border p-2 rounded ${
              isSlotSelected ? "ring-2 ring-blue-400" : ""
            }`}
          >
            {slot.title && (
              <div className="text-xs font-medium">
                {slot.title}
              </div>
            )}

            {slot.children.length === 0 && (
              <div className="text-xs text-gray-400">
                Drop here
              </div>
            )}

            {slot.children.map((child) => (
              <NodeRenderer
                key={child.id}
                node={child}
                sectionId={sectionId}
                slotId={slot.id}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
