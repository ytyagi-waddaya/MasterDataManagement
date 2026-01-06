// import { ColumnsLayoutNode } from "../../contracts/editor.contract";
// import { CanvasNodeRenderer } from "../CanvasNodeRenderer";
// import { ContainerDropZone } from "../ColumnDropZone";

// export function ColumnsView({ node }: { node: ColumnsLayoutNode }) {
//   return (
//     <div className="border rounded p-3 space-y-2">
//       <div className="text-xs font-semibold text-muted-foreground ">
//         COLUMNS
//       </div>

//       <div className="grid grid-cols-12 gap-3">
//         {node.slots.map((slot) => (
//           <div
//             key={slot.id}
//             className={`col-span-${slot.config?.span ?? 12}`}
//           >
//             {/* SLOT is the visible box */}
//             <ContainerDropZone
//               containerId={node.id}
//               slotId={slot.id}
//             >
//               <div
//                 className="
//                   min-h-12
//                   rounded
//                   bg-muted/30
//                   p-2
//                   transition
//                 "
//               >
//                 {slot.children.length === 0 ? (
//                   <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
//                     Drop field here
//                   </div>
//                 ) : (
//                   <div className="space-y-2">
//                     {slot.children.map((child) => (
//                       <CanvasNodeRenderer
//                         key={child.id}
//                         node={child}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </ContainerDropZone>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import {
  ColumnsLayoutNode,
  EditorSelection,
  InsertPos,
} from "../../contracts/editor.contract";
import { CanvasNodeRenderer } from "../CanvasNodeRenderer";
import { CanvasNodeView } from "../CanvasNodeView";
import { ContainerDropZone } from "../ColumnDropZone";
import { Grid } from "lucide-react";

export function ColumnsView({
  node,
  sectionId,
  selection,
  onSelectNode,
  insertPos,
  setInsertPos,
}: {
  node: ColumnsLayoutNode;
  sectionId: string;
  selection: EditorSelection;
  onSelectNode: (id: string) => void;
  insertPos: InsertPos | null;
  setInsertPos: (pos: InsertPos | null) => void;
}) {
  return (
    <div className="p-3 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Grid className="h-3.5 w-3.5 text-gray-400" />
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {node.slots.length} Column{node.slots.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Columns grid */}
      <div className="grid grid-cols-12 gap-2">
        {node.slots.map((slot) => (
          <div key={slot.id} className={`col-span-${slot.config?.span ?? 12}`}>
            <ContainerDropZone containerId={node.id} slotId={slot.id}>
              <div
                className={`
                  min-h-16 rounded border border-dashed p-2
                  transition-all duration-150
                  hover:border-gray-400 dark:hover:border-gray-600
                  ${
                    slot.children.length === 0
                      ? "border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30"
                      : "border-transparent bg-white dark:bg-gray-900"
                  }
                `}
              >
                {slot.children.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-2">
                    <div className="h-6 w-6 rounded border border-gray-300 dark:border-gray-700 mb-1 flex items-center justify-center">
                      <Grid className="h-3 w-3 text-gray-400" />
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      Drop here
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
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
          </div>
        ))}
      </div>
    </div>
  );
}
