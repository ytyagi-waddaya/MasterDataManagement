// "use client";

// import { EditorNode, InsertPos } from "../contracts/editor.contract";

// export function CanvasNodeView({
//   node,
//   selected,
//   insertPos,
//   setInsertPos,
//   sectionId,
//   onClick,
// }: {
//   node: EditorNode;
//   selected: boolean;
//   insertPos: InsertPos | null;
//   setInsertPos: (pos: InsertPos | null) => void;
//   sectionId: string;
//   onClick: () => void;
// }) {
//   function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const midpoint = rect.top + rect.height / 2;

//     setInsertPos({
//       sectionId,
//       nodeId: node.id,
//       position: e.clientY < midpoint ? "before" : "after",
//     });
//   }

//   function onMouseLeave() {
//     setInsertPos(null);
//   }
//   const showBefore =
//     insertPos?.nodeId === node.id && insertPos.position === "before";

//   const showAfter =
//     insertPos?.nodeId === node.id && insertPos.position === "after";

//   return (
//     <div
//       className="relative"
//       onMouseMove={onMouseMove}
//       onMouseLeave={onMouseLeave}
//     >
//       {showBefore && (
//         <div className="absolute -top-1 left-0 right-0 h-1 bg-blue-500 rounded" />
//       )}

//       <div
//         onClick={(e)=>{
//           e.stopPropagation()
//           onClick()}}
//         className={`border rounded-md p-3 cursor-pointer bg-background
//           ${selected ? "ring-2 ring-primary" : ""}
//         `}
//         style={{
//           gridColumn:
//             node.kind === "FIELD"
//               ? `span ${node.field.layout.span}`
//               : "span 12",
//         }}
//       >
//         {node.kind === "FIELD" ? (
//           <div className="text-sm font-medium">{node.field.label}</div>
//         ) : (
//           <div className="text-xs uppercase text-muted-foreground">
//             {node.type}
//           </div>
//         )}
//       </div>

//       {showAfter && (
//         <div className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-500 rounded" />
//       )}
//     </div>
//   );
// }

// "use client";

// import { EditorNode, InsertPos } from "../contracts/editor.contract";
// import { CanvasNodeRenderer } from "./CanvasNodeRenderer";

// export function CanvasNodeView({
//   node,
//   selected,
//   insertPos,
//   setInsertPos,
//   sectionId,
//   onClick,
// }: {
//   node: EditorNode;
//   selected: boolean;
//   insertPos: InsertPos | null;
//   setInsertPos: (pos: InsertPos | null) => void;
//   sectionId: string;
//   onClick: () => void;
// }) {
//   function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const midpoint = rect.top + rect.height / 2;

//     setInsertPos({
//       sectionId,
//       nodeId: node.id,
//       position: e.clientY < midpoint ? "before" : "after",
//     });
//   }

//   function onMouseLeave() {
//     setInsertPos(null);
//   }

//   const showBefore =
//     insertPos?.nodeId === node.id && insertPos.position === "before";
//   const showAfter =
//     insertPos?.nodeId === node.id && insertPos.position === "after";

//   return (
//     <div
//       className="relative"
//       onMouseMove={onMouseMove}
//       onMouseLeave={onMouseLeave}
//     >
//       {showBefore && (
//         <div className="absolute -top-1 left-0 right-0 h-1 bg-blue-500 rounded" />
//       )}

//       <div
//         onClick={(e) => {
//           e.stopPropagation();
//           onClick();
//         }}
//         className={`border rounded-md p-3 bg-background
//           ${selected ? "ring-2 ring-primary" : ""}
//         `}
//         style={{
//           gridColumn:
//             node.kind === "FIELD"
//               ? `span ${node.field.layout.span}`
//               : "span 12",
//         }}
//       >
//         {/* 🔥 THIS IS THE KEY LINE */}
//         <CanvasNodeRenderer node={node} />
//       </div>

//       {showAfter && (
//         <div className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-500 rounded" />
//       )}
//     </div>
//   );
// }

"use client";

import {
  EditorNode,
  EditorSelection,
  InsertPos,
} from "../contracts/editor.contract";
import { CanvasNodeRenderer } from "./CanvasNodeRenderer";

export function CanvasNodeView({
  node,
  selected,
  selection,
  onSelectNode,
  insertPos,
  setInsertPos,
  sectionId,
  onClick,
}: {
  node: EditorNode;
  selected: boolean;
  selection: EditorSelection;
  onSelectNode: (id: string) => void;
  insertPos: InsertPos | null;
  setInsertPos: (pos: InsertPos | null) => void;
  sectionId: string;
  onClick: () => void;
}) {
  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;

    setInsertPos({
      sectionId,
      nodeId: node.id,
      position: e.clientY < midpoint ? "before" : "after",
    });
  }

  function onMouseLeave() {
    setInsertPos(null);
  }

  const showBefore =
    insertPos?.nodeId === node.id && insertPos.position === "before";
  const showAfter =
    insertPos?.nodeId === node.id && insertPos.position === "after";

  return (
    <div
      className="relative group"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Insertion indicator - before */}
      {showBefore && (
        <div className="absolute -top-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full z-10" />
      )}

      {/* Main node container */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`
          border rounded-lg p-1 bg-white  dark:bg-gray-900
          cursor-pointer transition-all duration-150
          hover:border-gray-300 dark:hover:border-gray-700 
          ${
            selected
              ? "border-blue-500 bg-blue-50/30 dark:bg-blue-900/10 ring-1 ring-blue-500/30"
              : "border-gray-200 dark:border-gray-800"
          }
        `}
        style={{
          gridColumn:
            node.kind === "FIELD"
              ? `span ${node.field.layout.span}`
              : "span 12",
        }}
      >
        <CanvasNodeRenderer
          node={node}
          sectionId={sectionId}
          selection={selection}
          onSelectNode={onSelectNode}
          insertPos={insertPos}
          setInsertPos={setInsertPos}
        />

        {selected && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
        )}
      </div>

      {/* Insertion indicator - after */}
      {showAfter && (
        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full z-10" />
      )}

      {/* Hover hint */}
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="h-4 w-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
      </div>
    </div>
  );
}
