// import { TabsLayoutNode } from "../../contracts/editor.contract";
// import { CanvasNodeRenderer } from "../CanvasNodeRenderer";
// import { SlotDropZone } from "../SlotDropZone";

// export function TabsView({ node }: { node: TabsLayoutNode }) {
//   return (
//     <div className="border rounded-md">
//       <div className="flex border-b bg-muted/30">
//         {node.slots.map((slot) => (
//           <div
//             key={slot.id}
//             className="px-4 py-2 text-sm font-medium"
//           >
//             {slot.title}
//           </div>
//         ))}
//       </div>

//       {node.slots.map((slot) => (
//         <div key={slot.id} className="p-3">
//           <SlotDropZone
//             containerId={node.id}
//             slotId={slot.id}
//           >
//             {slot.children.length === 0 && (
//               <div className="text-xs text-muted-foreground">
//                 Drop fields inside tab
//               </div>
//             )}

//             <div className="space-y-3">
//               {slot.children.map((child) => (
//                 <CanvasNodeRenderer
//                   key={child.id}
//                   node={child}
//                 />
//               ))}
//             </div>
//           </SlotDropZone>
//         </div>
//       ))}
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import { TabsLayoutNode } from "../../contracts/editor.contract";
// import { ContainerDropZone } from "../ColumnDropZone";
// import { CanvasNodeRenderer } from "../CanvasNodeRenderer";

// export function TabsView({ node }: { node: TabsLayoutNode }) {
//   // 🔥 Editor-only active tab state
//   const [activeTabId, setActiveTabId] = useState(
//     node.slots[0]?.id
//   );

//   const activeSlot = node.slots.find(
//     (s) => s.id === activeTabId
//   );

//   return (
//     <div className="rounded-lg border bg-muted/20">
//       {/* ================= TAB HEADERS ================= */}
//       <div className="flex gap-2 px-3 py-2 border-b bg-background">
//         {node.slots.map((slot) => {
//           const isActive = slot.id === activeTabId;

//           return (
//             <button
//               key={slot.id}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setActiveTabId(slot.id);
//               }}
//               className={`
//                 px-3 py-1 text-xs rounded border transition
//                 ${
//                   isActive
//                     ? "bg-primary text-primary-foreground border-primary"
//                     : "bg-muted/40 hover:bg-muted"
//                 }
//               `}
//             >
//               {slot.title}
//             </button>
//           );
//         })}
//       </div>

//       {/* ================= ACTIVE TAB CONTENT ================= */}
//       {activeSlot && (
//         <ContainerDropZone
//           containerId={node.id}
//           slotId={activeSlot.id}
//         >
//           <div className="p-4 min-h-[100px] space-y-3 bg-background">
//             {activeSlot.children.length === 0 && (
//               <div className="text-xs italic text-muted-foreground">
//                 Drop fields into “{activeSlot.title}”
//               </div>
//             )}

//             {activeSlot.children.map((child) => (
//               <CanvasNodeRenderer
//                 key={child.id}
//                 node={child}
//               />
//             ))}
//           </div>
//         </ContainerDropZone>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  ColumnsLayoutNode,
  EditorSelection,
  InsertPos,
  TabsLayoutNode,
} from "../../contracts/editor.contract";
import { ContainerDropZone } from "../ColumnDropZone";
import { CanvasNodeView } from "../CanvasNodeView";

export function TabsView({
  node,
  sectionId,
  selection,
  onSelectNode,
  insertPos,
  setInsertPos,
}: {
  node: TabsLayoutNode;
  sectionId: string;
  selection: EditorSelection;
  onSelectNode: (id: string) => void;
  insertPos: InsertPos | null;
  setInsertPos: (pos: InsertPos | null) => void;
}) {
  const [activeTabId, setActiveTabId] = useState(node.slots[0]?.id);

  const activeSlot = node.slots.find((s) => s.id === activeTabId);

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      {/* ================= TAB HEADERS ================= */}
      <div className="flex gap-1 px-3 pt-2 bg-gray-50/50 dark:bg-gray-800/30">
        {node.slots.map((slot) => {
          const isActive = slot.id === activeTabId;

          return (
            <button
              key={slot.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTabId(slot.id);
              }}
              className={`
                relative px-3 py-2 text-xs font-medium rounded-t-lg
                transition-all duration-150
                ${
                  isActive
                    ? "text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border-t border-x border-gray-200 dark:border-gray-800 -mb-px"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border border-transparent"
                }
              `}
            >
              {slot.title}
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* ================= ACTIVE TAB CONTENT ================= */}
      {activeSlot && (
        <ContainerDropZone containerId={node.id} slotId={activeSlot.id}>
          <div
            className={`
            p-4 min-h-[120px] space-y-3
            ${
              activeSlot.children.length === 0
                ? "border border-dashed border-gray-300 dark:border-gray-700 rounded-lg m-3 bg-gray-50/50 dark:bg-gray-800/30"
                : ""
            }
          `}
          >
            {activeSlot.children.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                <div className="h-8 w-8 rounded-lg border border-gray-300 dark:border-gray-700 mb-2 flex items-center justify-center">
                  <div className="h-4 w-4 rounded border border-gray-400" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Drop fields here
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  into "{activeSlot.title}"
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {activeSlot.children.map((child) => {
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
      )}
    </div>
  );
}
