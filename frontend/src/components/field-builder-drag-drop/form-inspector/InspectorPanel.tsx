// "use client";

// import { useEffect, useState, useMemo } from "react";
// import { collectFields, InspectorProps, InspectorTab } from "./inspector.types";
// import { InspectorTabs } from "./InspectorTabs";

// import { GeneralTab } from "./FieldInspector/GeneralTab";
// import { ValidationTab } from "./FieldInspector/ValidationTab";
// import { VisibilityTab } from "./FieldInspector/VisibilityTab";
// import { ApiBindingTab } from "./FieldInspector/ApiBindingTab";

// import { LayoutInspector } from "./LayoutInspector";
// import { SectionInspector } from "./sectionInspector";

// export function InspectorPanel({
//   node,
//   section,
//   sections, // ✅ FIX: destructure sections
//   onNodeChange,
//   onSectionChange,
//   onDelete,
//   onDuplicate,
// }: InspectorProps) {
//   const [tab, setTab] = useState<InspectorTab>("GENERAL");

//   const availableFields = useMemo(() => collectFields(sections), [sections]);

//   useEffect(() => {
//     console.log("Inspector sections:", sections);
//   }, [sections]);

//   useEffect(() => {
//   if (!node) return;

//   const selectedNode = node; // ✅ hard narrowing

//   function handler(e: KeyboardEvent) {
//     const target = e.target as HTMLElement;

//     if (
//       target instanceof HTMLInputElement ||
//       target instanceof HTMLTextAreaElement ||
//       target.isContentEditable
//     ) {
//       return;
//     }

//     if (e.key === "Delete") {
//       e.preventDefault();
//       onDelete(selectedNode.id);
//     }

//     if ((e.ctrlKey || e.metaKey) && e.key === "d") {
//       e.preventDefault();
//       onDuplicate(selectedNode.id);
//     }
//   }

//   window.addEventListener("keydown", handler);
//   return () => window.removeEventListener("keydown", handler);
// }, [node, onDelete, onDuplicate]);

//   /* ---------- EMPTY ---------- */
//   if (!node && !section) {
//     return (
//       <aside className="w-80 border-l p-4 text-sm text-muted-foreground">
//         Select a field, layout, or section
//       </aside>
//     );
//   }

//   /* ---------- SECTION ---------- */
//   if (!node && section) {
//     return (
//       <aside className="w-80 border-l bg-background p-4">
//         <SectionInspector section={section} onChange={onSectionChange} />
//       </aside>
//     );
//   }

//   /* ---------- FIELD / LAYOUT ---------- */
//   if (!node) return null;

//   return (
//     <aside className="w-140 border-l bg-background p-4">
//       <div className="flex justify-between mb-2">
//         <h3 className="text-sm font-semibold">
//           {node.kind === "FIELD" ? "Field Settings" : "Layout Settings"}
//         </h3>

//         <div className="flex gap-2 text-xs">
//           <button onClick={() => onDuplicate(node.id)}>Duplicate</button>
//           <button className="text-red-500" onClick={() => onDelete(node.id)}>
//             Delete
//           </button>
//         </div>
//       </div>

//       {node.kind === "FIELD" ? (
//         <>
//           <InspectorTabs active={tab} onChange={setTab} />

//           {tab === "GENERAL" && (
//             <GeneralTab node={node} onChange={onNodeChange} />
//           )}

//           {tab === "VALIDATION" && (
//             <ValidationTab node={node} onChange={onNodeChange} />
//           )}

//           {tab === "VISIBILITY" && (
//             <VisibilityTab
//               node={node}
//               onChange={onNodeChange}
//               fields={availableFields} // ✅ correct
//             />
//           )}

//           {tab === "API" && (
//             <ApiBindingTab node={node} onChange={onNodeChange} />
//           )}
//         </>
//       ) : (
//         <LayoutInspector node={node} onChange={onNodeChange} />
//       )}
//     </aside>
//   );
// }

"use client";

import { useEffect, useState, useMemo } from "react";
import { collectFields, InspectorProps, InspectorTab } from "./inspector.types";
import { InspectorTabs } from "./InspectorTabs";

import { GeneralTab } from "./FieldInspector/GeneralTab";
import { ValidationTab } from "./FieldInspector/ValidationTab";
import { VisibilityTab } from "./FieldInspector/VisibilityTab";
import { ApiBindingTab } from "./FieldInspector/ApiBindingTab";

import { LayoutInspector } from "./LayoutInspector";
import { SectionInspector } from "./sectionInspector";
import { Settings, Copy, Trash2 } from "lucide-react";

export function InspectorPanel({
  node,
  section,
  sections,
  onNodeChange,
  onSectionChange,
  onDelete,
  onDuplicate,
}: InspectorProps) {
  const [tab, setTab] = useState<InspectorTab>("GENERAL");

  const availableFields = useMemo(() => collectFields(sections), [sections]);

  useEffect(() => {
    if (!node) return;

    const selectedNode = node;

    function handler(e: KeyboardEvent) {
      const target = e.target as HTMLElement;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "Delete") {
        e.preventDefault();
        onDelete(selectedNode.id);
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault();
        onDuplicate(selectedNode.id);
      }
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [node, onDelete, onDuplicate]);

  /* ---------- EMPTY STATE ---------- */
  if (!node && !section) {
    return (
      <aside className="w-80 border-l border-gray-200 dark:border-gray-800 p-6">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Settings className="h-10 w-10 text-gray-300 dark:text-gray-700 mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select a field, layout, or section
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            to edit its properties
          </p>
        </div>
      </aside>
    );
  }

  /* ---------- SECTION ---------- */
  if (!node && section) {
    return (
      <aside className="w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <SectionInspector section={section} onChange={onSectionChange} />
      </aside>
    );
  }

  /* ---------- FIELD / LAYOUT ---------- */
  if (!node) return null;

  return (
    <aside className="w-100 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-gray-500" />
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {node.kind === "FIELD" ? "Field Settings" : "Layout Settings"}
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onDuplicate(node.id)}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Duplicate"
            >
              <Copy className="h-3.5 w-3.5 text-gray-500" />
            </button>
            <button
              onClick={() => onDelete(node.id)}
              className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5 text-gray-500 hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {node.kind === "FIELD" ? (
          <div className="p-4">
            <InspectorTabs active={tab} onChange={setTab} />

            <div className="mt-4">
              {/* {tab === "GENERAL" && (
                <GeneralTab node={node} onChange={onNodeChange} />
              )} */}
              {tab === "GENERAL" && node.kind === "FIELD" && (
                <GeneralTab
                  definition={node.field}
                  onChange={(updatedDef) =>
                    onNodeChange({
                      ...node,
                      field: updatedDef,
                    })
                  }
                />
              )}

              {tab === "VALIDATION" && (
                <ValidationTab node={node} onChange={onNodeChange} />
              )}

              {tab === "VISIBILITY" && (
                <VisibilityTab
                  node={node}
                  onChange={onNodeChange}
                  fields={availableFields}
                />
              )}

              {tab === "API" && (
                <ApiBindingTab node={node} onChange={onNodeChange} />
              )}
            </div>
          </div>
        ) : (
          <div className="p-4">
            <LayoutInspector node={node} onChange={onNodeChange} />
          </div>
        )}
      </div>
    </aside>
  );
}
