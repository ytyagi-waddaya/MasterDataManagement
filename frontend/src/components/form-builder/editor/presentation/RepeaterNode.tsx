import { NodeRenderer } from "../NodeRenderer";
import { useFormBuilderStore } from "../../state/useFormBuilderStore";
import { RepeaterLayoutNode } from "../../node.types";



type Props = {
  node: RepeaterLayoutNode;
  sectionId: string;
};

/* ======================================================
   COMPONENT
====================================================== */

export function RepeaterNode({ node, sectionId }: Props) {
  const addRow = useFormBuilderStore((s) => s.addRepeaterRow);

  return (
    <div className="border rounded p-3 space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">
          {node.config?.itemLabel ?? "Items"}
        </h4>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addRow(node.id);
          }}
          className="text-sm text-blue-600"
        >
          {node.config?.addLabel ?? "Add"}
        </button>
      </div>

      <div className="space-y-3">
        <div className="opacity-60 text-sm">
          Repeater fields (per item)
        </div>

        {node.children.length === 0 && (
          <div className="text-xs text-gray-400">
            Drop fields here
          </div>
        )}

        {node.children.map((child) => (
          <NodeRenderer
            key={child.id}
            node={child}
            sectionId={sectionId}
          />
        ))}
      </div>
    </div>
  );
}
