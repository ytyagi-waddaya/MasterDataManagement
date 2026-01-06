// "use client";

// import { useDroppable } from "@dnd-kit/core";
// import { CanvasSectionView } from "./CanvasSection";
// import { FormSection } from "../contracts/editor.contract";
// import { addSection } from "../mutations/add";
// import { useInsertionIndicator } from "../mutations/useInsertionIndicator";

// export function FormCanvas({
//   sections,
//   selectedNodeId,
//   setSelectedNodeId,
//   setSections,
//   readOnly = false,
// }: {
//   sections: FormSection[];
//   selectedNodeId: string | null;
//   setSelectedNodeId: (id: string | null) => void;
//   setSections: React.Dispatch<React.SetStateAction<FormSection[]>>;
//   readOnly?: boolean;
// }) {
//   const { insertPos, setInsertPos, clear } = useInsertionIndicator();
//   return (
//     <div
//       className="flex-1 p-4 space-y-6"
//       onClick={() => setSelectedNodeId(null)}
//     >
//       {/* Add Section */}
//       {!readOnly && (
//         <button
//           onClick={() => setSections((prev) => addSection(prev))}
//           className="px-3 py-1 border rounded text-sm"
//         >
//           + Add Section
//         </button>
//       )}

//       {sections.map((section) => (
//         <SectionDropZone key={section.id} sectionId={section.id}>
//           <CanvasSectionView
//             section={section}
//             selectedNodeId={selectedNodeId}
//             onSelectNode={setSelectedNodeId}
//             insertPos={insertPos}
//             setInsertPos={setInsertPos}
//             onToggleSection={(id) =>
//               setSections((prev) =>
//                 prev.map((s) =>
//                   s.id === id ? { ...s, collapsed: !s.collapsed } : s
//                 )
//               )
//             }
//             onDeleteSection={(id) =>
//               setSections((prev) => prev.filter((s) => s.id !== id))
//             }
//           />
//         </SectionDropZone>
//       ))}
//     </div>
//   );
// }

// export function SectionDropZone({
//   sectionId,
//   children,
// }: {
//   sectionId: string;
//   children: React.ReactNode;
// }) {
//   const { setNodeRef, isOver, active } = useDroppable({
//     id: `section:${sectionId}`,
//     data: {
//       type: "SECTION",
//       sectionId,
//     },
//   });

//   const isDragging =
//     active?.data.current?.type === "FIELD" ||
//     active?.data.current?.type === "PALETTE_FIELD" ||
//     active?.data.current?.type === "PALETTE_LAYOUT";

//   return (
//     <div
//       ref={setNodeRef}
//       className={`
//         p-3 rounded transition
//         ${isOver && isDragging ? "bg-muted/40" : ""}
//       `}
//       style={{
//         pointerEvents: isDragging ? "auto" : "none",
//       }}
//     >
//       {/* 🔥 re-enable clicks for children */}
//       <div style={{ pointerEvents: "auto" }}>{children}</div>
//     </div>
//   );
// }

// "use client";

// import { useDroppable } from "@dnd-kit/core";
// import { CanvasSectionView } from "./CanvasSection";
// import { FormSection } from "../contracts/editor.contract";
// import { addSection } from "../mutations/add";
// import { useInsertionIndicator } from "../mutations/useInsertionIndicator";

// export function FormCanvas({
//   sections,
//   selectedNodeId,
//   setSelectedNodeId,
//   setSections,
//   readOnly = false,
// }: {
//   sections: FormSection[];
//   selectedNodeId: string | null;
//   setSelectedNodeId: (id: string | null) => void;
//   setSections: React.Dispatch<React.SetStateAction<FormSection[]>>;
//   readOnly?: boolean;
// }) {
//   const { insertPos, setInsertPos } = useInsertionIndicator();

//   return (
//     <div
//       className="flex-1 p-4 space-y-6"
//       onClick={() => setSelectedNodeId(null)}
//     >
//       {/* Add Section */}
//       {!readOnly && (
//         <button
//           onClick={() => setSections((prev) => addSection(prev))}
//           className="px-3 py-1 border rounded text-sm"
//         >
//           + Add Section
//         </button>
//       )}

//       {sections.length === 0 && !readOnly && (
//         <div className="text-sm text-muted-foreground">
//           No sections yet.
//         </div>
//       )}

//       {sections.map((section) => (
//         <SectionDropZone key={section.id} sectionId={section.id}>
//           <CanvasSectionView
//             section={section}
//             selectedNodeId={selectedNodeId}
//             onSelectNode={setSelectedNodeId}
//             insertPos={insertPos}
//             setInsertPos={setInsertPos}
//             onToggleSection={(id) =>
//               setSections((prev) =>
//                 prev.map((s) =>
//                   s.id === id ? { ...s, collapsed: !s.collapsed } : s
//                 )
//               )
//             }
//             onDeleteSection={(id) =>
//               setSections((prev) =>
//                 prev.length === 1
//                   ? prev
//                   : prev.filter((s) => s.id !== id)
//               )
//             }
//           />
//         </SectionDropZone>
//       ))}
//     </div>
//   );
// }

// function SectionDropZone({
//   sectionId,
//   children,
// }: {
//   sectionId: string;
//   children: React.ReactNode;
// }) {
//   const { setNodeRef, isOver, active } = useDroppable({
//     id: `section:${sectionId}`,
//     data: {
//       type: "SECTION",
//       sectionId,
//     },
//   });

//   const isDragging =
//     active?.data.current?.type === "FIELD" ||
//     active?.data.current?.type === "PALETTE_FIELD" ||
//     active?.data.current?.type === "PALETTE_LAYOUT";

//   return (
//     <div
//       ref={setNodeRef}
//       className={`p-3 rounded transition ${
//         isOver && isDragging ? "bg-muted/40" : ""
//       }`}
//     >
//       {children}
//     </div>
//   );
// }

"use client";

import { useDroppable } from "@dnd-kit/core";
import { CanvasSectionView } from "./CanvasSection";
import {
  EditorSelection,
  FormSection,
} from "../contracts/editor.contract";
import { addSection } from "../mutations/add";
import { useInsertionIndicator } from "../mutations/useInsertionIndicator";
import { Plus, Grid } from "lucide-react";

export function FormCanvas({
  sections,
  selection,
  setSelection,
  setSections,
  readOnly = false,
}: {
  sections: FormSection[];
  selection: EditorSelection;
  setSelection: (sel: EditorSelection) => void;
  setSections: React.Dispatch<React.SetStateAction<FormSection[]>>;
  readOnly?: boolean;
}) {
  const { insertPos, setInsertPos } = useInsertionIndicator();

  return (
    <div
      className="flex-1 p-4 bg-gray-50/50 dark:bg-gray-900/50"
      onClick={() => setSelection(null)}
    >
      {/* ================= EMPTY STATE ================= */}
      {sections.length === 0 && !readOnly ? (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
          <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <Grid className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            No sections yet
          </p>
          <button
            onClick={() => setSections((prev) => addSection(prev))}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Section
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* ================= ADD SECTION BUTTON ================= */}
          {!readOnly && (
            <div className="sticky top-4 z-10">
              <button
                onClick={() => setSections((prev) => addSection(prev))}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-dashed border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Section
              </button>
            </div>
          )}

          {/* ================= SECTIONS ================= */}
          <div className="space-y-4">
            {sections.map((section) => (
              <SectionDropZone key={section.id} sectionId={section.id}>
                <CanvasSectionView
                  section={section}
                  selection={selection}
                  onSelectSection={(id) =>
                    setSelection({ type: "SECTION", sectionId: id })
                  }
                  onSelectNode={(id) =>
                    setSelection({ type: "NODE", nodeId: id })
                  }
                  insertPos={insertPos}
                  setInsertPos={setInsertPos}
                  onToggleSection={(id) =>
                    setSections((prev) =>
                      prev.map((s) =>
                        s.id === id
                          ? { ...s, collapsed: !s.collapsed }
                          : s
                      )
                    )
                  }
                  onDeleteSection={(id) =>
                    setSections((prev) =>
                      prev.length === 1
                        ? prev
                        : prev.filter((s) => s.id !== id)
                    )
                  }
                />
              </SectionDropZone>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ======================================================
   SECTION DROP ZONE
====================================================== */

function SectionDropZone({
  sectionId,
  children,
}: {
  sectionId: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver, active } = useDroppable({
    id: `section:${sectionId}`,
    data: {
      type: "SECTION",
      sectionId,
    },
  });

  const isDragging =
    active?.data.current?.type === "FIELD" ||
    active?.data.current?.type === "PALETTE_FIELD" ||
    active?.data.current?.type === "PALETTE_LAYOUT";

  return (
    <div
      ref={setNodeRef}
      className={`
        transition-all duration-150
        ${isOver && isDragging 
          ? "ring-1 ring-blue-400/50 ring-inset bg-blue-50/30 dark:bg-blue-900/10 rounded-lg" 
          : ""
        }
      `}
    >
      {children}
    </div>
  );
}