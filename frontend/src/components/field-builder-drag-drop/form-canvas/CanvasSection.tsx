// import { FormSection, InsertPos } from "../contracts/editor.contract";
// import { CanvasNodeView } from "./CanvasNodeView";

// export function CanvasSectionView({
//   section,
//   selectedNodeId,
//   onSelectNode,
//   insertPos,
//   setInsertPos,
//   onToggleSection,
//   onDeleteSection,
// }: {
//   section: FormSection;
//   selectedNodeId: string | null;
//   onSelectNode: (id: string) => void;
//   insertPos: InsertPos | null;
//   setInsertPos: (pos: InsertPos | null) => void;
//   onToggleSection: (id: string) => void;
//   onDeleteSection: (id: string) => void;
// }) {
//   return (
//     <div className="space-y-4">
//       {/* ================= SECTION HEADER ================= */}
//       <div className="flex justify-between items-center">
//         <h3
//           className="font-semibold cursor-pointer"
//           onClick={() => onSelectNode(section.id)}
//         >
//           {section.title}
//         </h3>

//         <div className="flex gap-2 text-xs">
//           <button onClick={() => onToggleSection(section.id)}>
//             {section.collapsed ? "Expand" : "Collapse"}
//           </button>

//           <button
//             className="text-red-500"
//             onClick={() => onDeleteSection(section.id)}
//           >
//             Delete
//           </button>
//         </div>
//       </div>

//       {/* ================= SECTION BODY ================= */}
//       {!section.collapsed && (
//         <div className="space-y-2">
//           {section.nodes.length === 0 && (
//             <div className="text-xs text-muted-foreground italic p-2 border border-dashed rounded">
//               Drop fields here
//             </div>
//           )}

//           {section.nodes.map((node) => (
//             <CanvasNodeView
//               key={node.id}
//               node={node}
//               sectionId={section.id}
//               selected={selectedNodeId === node.id}
//               insertPos={insertPos}
//               setInsertPos={setInsertPos}
//               onClick={() => onSelectNode(node.id)}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// import { FormSection, InsertPos } from "../contracts/editor.contract";
// import { CanvasNodeView } from "./CanvasNodeView";

// export function CanvasSectionView({
//   section,
//   selectedNodeId,
//   onSelectNode,
//   insertPos,
//   setInsertPos,
//   onToggleSection,
//   onDeleteSection,
// }: {
//   section: FormSection;
//   selectedNodeId: string | null;
//   onSelectNode: (id: string) => void;
//   insertPos: InsertPos | null;
//   setInsertPos: (pos: InsertPos | null) => void;
//   onToggleSection: (id: string) => void;
//   onDeleteSection: (id: string) => void;
// }) {
//   return (
//     <div className="space-y-4">
//       {/* ================= SECTION HEADER ================= */}
//       <div className="flex justify-between items-center">
//         <h3
//           className="font-semibold cursor-pointer"
//           onClick={() => onSelectNode(section.id)}
//         >
//           {section.title}
//         </h3>

//         <div className="flex gap-2 text-xs">
//           <button onClick={() => onToggleSection(section.id)}>
//             {section.collapsed ? "Expand" : "Collapse"}
//           </button>

//           <button
//             className="text-red-500"
//             onClick={() => onDeleteSection(section.id)}
//           >
//             Delete
//           </button>
//         </div>
//       </div>

//       {/* ================= SECTION BODY ================= */}
//       {!section.collapsed && (
//         <div className="space-y-2">
//           {section.nodes.length === 0 && (
//             <div className="text-xs text-muted-foreground italic p-2 border border-dashed rounded">
//               Drop fields here
//             </div>
//           )}

//           {section.nodes.map((node) => (
//             <CanvasNodeView
//               key={node.id}
//               node={node}
//               sectionId={section.id}
//               selected={selectedNodeId === node.id}
//               insertPos={insertPos}
//               setInsertPos={setInsertPos}
//               onClick={() => onSelectNode(node.id)}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import {
  FormSection,
  InsertPos,
  EditorSelection,
} from "../contracts/editor.contract";
import { CanvasNodeView } from "./CanvasNodeView";
import { ChevronDown, ChevronUp, Trash2, GripVertical } from "lucide-react";

export function CanvasSectionView({
  section,
  selection,
  onSelectSection,
  onSelectNode,
  insertPos,
  setInsertPos,
  onToggleSection,
  onDeleteSection,
}: {
  section: FormSection;
  selection: EditorSelection;
  onSelectSection: (id: string) => void;
  onSelectNode: (id: string) => void;
  insertPos: InsertPos | null;
  setInsertPos: (pos: InsertPos | null) => void;
  onToggleSection: (id: string) => void;
  onDeleteSection: (id: string) => void;
}) {
  const isSectionSelected =
    selection?.type === "SECTION" && selection.sectionId === section.id;

  return (
    <div className="space-y-3">
      {/* ================= SECTION HEADER ================= */}
      <div
        className={`
          flex items-center gap-2 p-3 rounded-lg border cursor-pointer
          transition-all duration-150
          ${
            isSectionSelected
              ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10"
              : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
          }
        `}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSection(section.id);
        }}
      >
        <GripVertical className="h-4 w-4 text-gray-400 shrink-0" />

        <div className="flex-1">
          <h3 className="font-medium text-gray-800 dark:text-gray-200">
            {section.title || "Untitled Section"}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSection(section.id);
            }}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={section.collapsed ? "Expand section" : "Collapse section"}
          >
            {section.collapsed ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteSection(section.id);
            }}
            className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title="Delete section"
          >
            <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>

      {/* ================= SECTION BODY ================= */}
      {!section.collapsed && (
        <div className="space-y-2 pl-4 border-l border-gray-200 dark:border-gray-800 ml-3">
          {section.nodes.length === 0 ? (
            <div className="p-4 text-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Drop fields here
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Drag fields from the palette
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {section.nodes.map((node) => {
                const isSelected =
                  selection?.type === "NODE" && selection.nodeId === node.id;

                return (
                  <CanvasNodeView
                    key={node.id}
                    node={node}
                    sectionId={section.id}
                    selected={isSelected}
                    selection={selection}
                    onSelectNode={onSelectNode}
                    insertPos={insertPos}
                    setInsertPos={setInsertPos}
                    onClick={() => onSelectNode(node.id)}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
