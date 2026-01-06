
// // runtime/RuntimeRepeater.tsx
// "use client";

// import { useState } from "react";
// import { RepeaterLayoutNode, EditorNode } from "../contracts/editor.contract";
// import { RuntimeField } from "../contracts/runtime.contract";
// import { Plus, Trash2 } from "lucide-react";

// type Props = {
//   node: RepeaterLayoutNode;
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

// export function RuntimeRepeater({
//   node,
//   fieldMap,
//   values,
//   setValues,
//   renderNode,
// }: Props) {
//   const [items, setItems] = useState([0]);

//   function addItem() {
//     setItems((p) => [...p, p.length]);
//   }

//   function removeItem(index: number) {
//     setItems((p) => p.filter((_, i) => i !== index));
//   }

//   return (
//     <div className="rounded-xl border bg-background p-6 space-y-6">
//       <div className="font-semibold">
//         {node.config?.label ?? "Item"}
//       </div>

//       {items.map((_, index) => (
//         <div
//           key={index}
//           className="rounded-lg border p-4 space-y-4 bg-muted/20"
//         >
//           <div className="flex justify-between items-center text-sm font-medium">
//             <span>
//               {node.config?.label ?? "Item"} {index + 1}
//             </span>

//             <button
//               onClick={() => removeItem(index)}
//               className="text-red-500 hover:text-red-600"
//             >
//               <Trash2 size={16} />
//             </button>
//           </div>

//           {node.slots[0]?.children.map((child) =>
//             renderNode(child, fieldMap, values, setValues)
//           )}
//         </div>
//       ))}

//       <button
//         onClick={addItem}
//         className="flex items-center gap-2 text-sm px-3 py-2 border rounded hover:bg-muted"
//       >
//         <Plus size={16} />
//         Add {node.config?.label ?? "Item"}
//       </button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { RepeaterLayoutNode, EditorNode } from "../contracts/editor.contract";
import { RuntimeField } from "../contracts/runtime.contract";
import { Plus, Trash2, Layers } from "lucide-react";

type Props = {
  node: RepeaterLayoutNode;
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

export function RuntimeRepeater({
  node,
  fieldMap,
  values,
  setValues,
  renderNode,
}: Props) {
  const [items, setItems] = useState([0]);
  const itemLabel = node.config?.label ?? "Item";

  function addItem() {
    setItems((p) => [...p, p.length]);
  }

  function removeItem(index: number) {
    setItems((p) => p.filter((_, i) => i !== index));
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Layers className="h-4 w-4 text-gray-500" />
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {itemLabel} Repeater
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
          {items.length} items
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {items.map((_, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 space-y-4 bg-gray-50/50 dark:bg-gray-800/30"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium flex items-center justify-center">
                  {index + 1}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {itemLabel} {index + 1}
                </span>
              </div>

              {items.length > 1 && (
                <button
                  onClick={() => removeItem(index)}
                  className="
                    p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20
                    transition-colors
                  "
                  title={`Remove ${itemLabel} ${index + 1}`}
                >
                  <Trash2 className="h-3.5 w-3.5 text-gray-500 hover:text-red-500" />
                </button>
              )}
            </div>

            <div className="space-y-4 pt-2">
              {node.slots[0]?.children.map((child) =>
                renderNode(child, fieldMap, values, setValues)
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Button */}
      <button
        onClick={addItem}
        className="
          w-full flex items-center justify-center gap-2
          px-3 py-2.5 text-sm rounded-lg border
          border-dashed border-gray-300 dark:border-gray-700
          hover:border-gray-400 dark:hover:border-gray-600
          hover:bg-gray-50 dark:hover:bg-gray-800/50
          transition-colors
        "
      >
        <Plus className="h-4 w-4" />
        <span>Add {itemLabel}</span>
      </button>
    </div>
  );
}