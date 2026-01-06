// import { AccordionLayoutNode } from "../../contracts/editor.contract";
// import { CanvasNodeRenderer } from "../CanvasNodeRenderer";
// import { SlotDropZone } from "../SlotDropZone";

// export function AccordionView({
//   node,
// }: {
//   node: AccordionLayoutNode;
// }) {
//   return (
//     <div className="space-y-2">
//       {node.slots.map((slot) => (
//         <details
//           key={slot.id}
//           className="border rounded-md"
//           open
//         >
//           <summary className="cursor-pointer px-3 py-2 font-medium">
//             {slot.title}
//           </summary>

//           <div className="p-3">
//             <SlotDropZone
//               containerId={node.id}
//               slotId={slot.id}
//             >
//               {slot.children.length === 0 && (
//                 <div className="text-xs text-muted-foreground">
//                   Drop fields here
//                 </div>
//               )}

//               <div className="space-y-3">
//                 {slot.children.map((child) => (
//                   <CanvasNodeRenderer
//                     key={child.id}
//                     node={child}
//                   />
//                 ))}
//               </div>
//             </SlotDropZone>
//           </div>
//         </details>
//       ))}
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import { AccordionLayoutNode } from "../../contracts/editor.contract";
// import { ContainerDropZone } from "../ColumnDropZone";
// import { CanvasNodeRenderer } from "../CanvasNodeRenderer";

// export function AccordionView({
//   node,
// }: {
//   node: AccordionLayoutNode;
// }) {
//   const [openPanelId, setOpenPanelId] = useState<string | null>(
//     node.slots[0]?.id ?? null
//   );

//   return (
//     <div className="rounded-lg border bg-muted/20 space-y-2">
//       {node.slots.map((slot) => {
//         const isOpen = slot.id === openPanelId;

//         return (
//           <div
//             key={slot.id}
//             className="border rounded bg-background"
//           >
//             {/* ================= HEADER ================= */}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setOpenPanelId(
//                   isOpen ? null : slot.id
//                 );
//               }}
//               className="w-full flex justify-between items-center px-4 py-2 text-sm font-medium"
//             >
//               {slot.title}
//               <span className="text-xs">
//                 {isOpen ? "−" : "+"}
//               </span>
//             </button>

//             {/* ================= PANEL BODY ================= */}
//             {isOpen && (
//               <ContainerDropZone
//                 containerId={node.id}
//                 slotId={slot.id}
//               >
//                 <div className="p-4 space-y-3 min-h-20">
//                   {slot.children.length === 0 && (
//                     <div className="text-xs italic text-muted-foreground">
//                       Drop fields into “{slot.title}”
//                     </div>
//                   )}

//                   {slot.children.map((child) => (
//                     <CanvasNodeRenderer
//                       key={child.id}
//                       node={child}
//                     />
//                   ))}
//                 </div>
//               </ContainerDropZone>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  AccordionLayoutNode,
  EditorSelection,
  InsertPos,
} from "../../contracts/editor.contract";
import { ContainerDropZone } from "../ColumnDropZone";
import { CanvasNodeRenderer } from "../CanvasNodeRenderer";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { CanvasNodeView } from "../CanvasNodeView";

export function AccordionView({
  node,
  sectionId,
  selection,
  onSelectNode,
  insertPos,
  setInsertPos,
}: {
  node: AccordionLayoutNode;
  sectionId: string;
  selection: EditorSelection;
  onSelectNode: (id: string) => void;
  insertPos: InsertPos | null;
  setInsertPos: (pos: InsertPos | null) => void;
}) {
  const [openPanelId, setOpenPanelId] = useState<string | null>(
    node.slots[0]?.id ?? null
  );

  return (
    <div className="space-y-1">
      {node.slots.map((slot) => {
        const isOpen = slot.id === openPanelId;

        return (
          <div
            key={slot.id}
            className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
          >
            {/* ================= HEADER ================= */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenPanelId(isOpen ? null : slot.id);
              }}
              className="w-full flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {slot.title}
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {slot.children.length} item
                {slot.children.length !== 1 ? "s" : ""}
              </div>
            </button>

            {/* ================= PANEL BODY ================= */}
            {isOpen && (
              <ContainerDropZone containerId={node.id} slotId={slot.id}>
                <div
                  className={`
                  p-4 space-y-3 min-h-24
                  ${
                    slot.children.length === 0
                      ? "border-t border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30"
                      : "bg-white dark:bg-gray-900"
                  }
                `}
                >
                  {slot.children.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-6 text-center">
                      <div className="h-10 w-10 rounded-lg border border-gray-300 dark:border-gray-700 mb-3 flex items-center justify-center">
                        <Plus className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Drop fields here
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        into "{slot.title}"
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {slot.children.map((child) => {
                        const isSelected =
                          selection?.type === "NODE" &&
                          selection.nodeId === child.id;

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
            )}
          </div>
        );
      })}
    </div>
  );
}
