// // runtime/RuntimeTabs.tsx
// "use client";

// import { useState } from "react";
// import { TabsLayoutNode, EditorNode } from "../contracts/editor.contract";
// import { RuntimeField } from "../contracts/runtime.contract";

// type Props = {
//   node: TabsLayoutNode;
//   fieldMap: Record<string, RuntimeField>;
//   values: Record<string, any>;
//   setValues: (v: Record<string, any>) => void;
//   renderNode: (
//     node: EditorNode,
//     fieldMap: Record<string, RuntimeField>,
//     values: Record<string, any>,
//     setValues: (v: Record<string, any>) => void,
//     readOnly?: boolean
//   ) => React.ReactNode;
// };

// export function RuntimeTabs({
//   node,
//   fieldMap,
//   values,
//   setValues,
//   renderNode,
// }: Props) {
//   const [activeId, setActiveId] = useState(node.slots[0]?.id);

//   const activeSlot = node.slots.find((s) => s.id === activeId);

//   return (
//     <div className="rounded-xl border bg-background">
//       {/* Tabs header */}
//       <div className="flex gap-2 overflow-x-auto border-b px-3 py-2">
//         {node.slots.map((slot) => {
//           const active = slot.id === activeId;
//           return (
//             <button
//               key={slot.id}
//               onClick={() => setActiveId(slot.id)}
//               className={`
//                 whitespace-nowrap px-4 py-2 rounded-md text-sm transition
//                 ${active
//                   ? "bg-primary text-primary-foreground"
//                   : "bg-muted hover:bg-muted/70"}
//               `}
//             >
//               {slot.title}
//             </button>
//           );
//         })}
//       </div>

//       {/* Active tab content */}
//       <div className="p-6 space-y-6">
//         {activeSlot?.children.map((child) =>
//           renderNode(child, fieldMap, values, setValues)
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { TabsLayoutNode, EditorNode } from "../contracts/editor.contract";
import { RuntimeField } from "../contracts/runtime.contract";

type Props = {
  node: TabsLayoutNode;
  fieldMap: Record<string, RuntimeField>;
  values: Record<string, any>;
  setValues: (v: Record<string, any>) => void;
  renderNode: (
    node: EditorNode,
    fieldMap: Record<string, RuntimeField>,
    values: Record<string, any>,
    setValues: (v: Record<string, any>) => void,
    readOnly?: boolean
  ) => React.ReactNode;
};

export function RuntimeTabs({
  node,
  fieldMap,
  values,
  setValues,
  renderNode,
}: Props) {
  const [activeId, setActiveId] = useState(node.slots[0]?.id);

  const activeSlot = node.slots.find((s) => s.id === activeId);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      {/* Tabs header */}
      <div className="flex gap-1 overflow-x-auto px-4 pt-3 bg-gray-50 dark:bg-gray-800/30">
        {node.slots.map((slot) => {
          const active = slot.id === activeId;
          return (
            <button
              key={slot.id}
              onClick={() => setActiveId(slot.id)}
              className={`
                relative whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-t-lg
                transition-all duration-150
                ${active
                  ? "text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border-t border-x border-gray-200 dark:border-gray-800 -mb-px"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800/50"
                }
              `}
            >
              {slot.title}
              {/* Active indicator */}
              {active && (
                <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active tab content */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {activeSlot?.children.map((child) =>
          renderNode(child, fieldMap, values, setValues)
        )}
      </div>
    </div>
  );
}