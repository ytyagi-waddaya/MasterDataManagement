// import { RepeaterLayoutNode } from "../../contracts/editor.contract";
// import { CanvasNodeRenderer } from "../CanvasNodeRenderer";
// import { SlotDropZone } from "../SlotDropZone";

// export function RepeaterView({
//   node,
// }: {
//   node: RepeaterLayoutNode;
// }) {
//   const slot = node.slots[0];

//   return (
//     <div className="border rounded-md p-3 space-y-2">
//       <div className="text-sm font-semibold">
//         Repeater
//       </div>

//       <SlotDropZone
//         containerId={node.id}
//         slotId={slot.id}
//       >
//         {slot.children.length === 0 && (
//           <div className="text-xs text-muted-foreground">
//             Drop fields to define repeated item
//           </div>
//         )}

//         <div className="space-y-3">
//           {slot.children.map((child) => (
//             <CanvasNodeRenderer
//               key={child.id}
//               node={child}
//             />
//           ))}
//         </div>
//       </SlotDropZone>
//     </div>
//   );
// }

// "use client";

// import { RepeaterLayoutNode } from "../../contracts/editor.contract";
// import { ContainerDropZone } from "../ColumnDropZone";
// import { CanvasNodeRenderer } from "../CanvasNodeRenderer";

// export function RepeaterView({
//   node,
// }: {
//   node: RepeaterLayoutNode;
// }) {
//   const templateSlot = node.slots[0];

//   return (
//     <div className="rounded-lg border bg-muted/20 p-3 space-y-3">
//       {/* ================= HEADER ================= */}
//       <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
//         <span>{node.config?.itemLabel ?? "Repeater Item"}</span>
//         <span className="italic">Template</span>
//       </div>

//       {/* ================= TEMPLATE SLOT ================= */}
//       <ContainerDropZone
//         containerId={node.id}
//         slotId={templateSlot.id}
//       >
//         <div className="bg-background rounded p-3 space-y-3 min-h-20">
//           {templateSlot.children.length === 0 && (
//             <div className="text-xs italic text-muted-foreground">
//               Drop fields here (repeated at runtime)
//             </div>
//           )}

//           {templateSlot.children.map((child) => (
//             <CanvasNodeRenderer
//               key={child.id}
//               node={child}
//             />
//           ))}
//         </div>
//       </ContainerDropZone>
//     </div>
//   );
// }

"use client";

import {
  EditorSelection,
  InsertPos,
  RepeaterLayoutNode,
} from "../../contracts/editor.contract";
import { ContainerDropZone } from "../ColumnDropZone";
import { CanvasNodeRenderer } from "../CanvasNodeRenderer";
import { Repeat, Layers } from "lucide-react";
import { CanvasNodeView } from "../CanvasNodeView";

export function RepeaterView({
  node,
  sectionId,
  selection,
  onSelectNode,
  insertPos,
  setInsertPos,
}: {
  node: RepeaterLayoutNode;
  sectionId: string;
  selection: EditorSelection;
  onSelectNode: (id: string) => void;
  insertPos: InsertPos | null;
  setInsertPos: (pos: InsertPos | null) => void;
}) {
  const templateSlot = node.slots[0];
  const itemLabel = node.config?.label ?? "Item";

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Repeat className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {itemLabel} Repeater
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Layers className="h-3 w-3" />
          <span>Template</span>
        </div>
      </div>

      {/* ================= TEMPLATE SLOT ================= */}
      <ContainerDropZone containerId={node.id} slotId={templateSlot.id}>
        <div
          className={`
          p-4 space-y-3 min-h-28
          ${
            templateSlot.children.length === 0
              ? "border border-dashed border-gray-300 dark:border-gray-700 rounded m-3 bg-gray-50/50 dark:bg-gray-800/30"
              : "bg-white dark:bg-gray-900"
          }
        `}
        >
          {templateSlot.children.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <div className="h-10 w-10 rounded-lg border border-gray-300 dark:border-gray-700 mb-3 flex items-center justify-center">
                <Repeat className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Drop fields here
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 max-w-[200px]">
                Will be repeated for each item at runtime
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {templateSlot.children.map((child) => {
                const isSelected =
                  selection?.type === "NODE" && selection.nodeId === child.id;

                return (
                  <CanvasNodeView
                    key={child.id}
                    node={child}
                    sectionId={sectionId}
                    selected={isSelected}
                    selection={selection}
                    onSelectNode={onSelectNode}
                    insertPos={insertPos}
                    setInsertPos={setInsertPos}
                    onClick={() => onSelectNode(child.id)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </ContainerDropZone>

      {/* ================= FOOTER ================= */}
      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          This template will be repeated for each {itemLabel.toLowerCase()}
        </p>
      </div>
    </div>
  );
}
