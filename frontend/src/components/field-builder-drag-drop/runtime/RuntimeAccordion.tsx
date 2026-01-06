
// // runtime/RuntimeAccordion.tsx
// "use client";

// import { AccordionLayoutNode, EditorNode } from "../contracts/editor.contract";
// import { RuntimeField } from "../contracts/runtime.contract";

// type Props = {
//   node: AccordionLayoutNode;
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

// export function RuntimeAccordion({
//   node,
//   fieldMap,
//   values,
//   setValues,
//   renderNode,
// }: Props) {
//   return (
//     <div className="space-y-3">
//       {node.slots.map((slot) => (
//         <details
//           key={slot.id}
//           className="group rounded-lg border bg-background overflow-hidden"
//         >
//           <summary
//             className="
//   cursor-pointer px-4 py-3 font-medium
//   flex justify-between items-center
//   bg-muted hover:bg-muted/70
// "
//           >
//             {slot.title}
//           </summary>

//           <div className="p-6 space-y-6">
//             {slot.children.map((child) =>
//               renderNode(child, fieldMap, values, setValues)
//             )}
//           </div>
//         </details>
//       ))}
//     </div>
//   );
// }

"use client";

import { AccordionLayoutNode, EditorNode } from "../contracts/editor.contract";
import { RuntimeField } from "../contracts/runtime.contract";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  node: AccordionLayoutNode;
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

export function RuntimeAccordion({
  node,
  fieldMap,
  values,
  setValues,
  renderNode,
}: Props) {
  const [openPanels, setOpenPanels] = useState<Set<string>>(new Set());

  const togglePanel = (panelId: string) => {
    setOpenPanels(prev => {
      const next = new Set(prev);
      if (next.has(panelId)) {
        next.delete(panelId);
      } else {
        next.add(panelId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-2">
      {node.slots.map((slot) => {
        const isOpen = openPanels.has(slot.id);
        
        return (
          <div
            key={slot.id}
            className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <button
              onClick={() => togglePanel(slot.id)}
              className="
                w-full px-4 py-3 font-medium text-left
                flex justify-between items-center
                bg-white dark:bg-gray-900
                hover:bg-gray-50 dark:hover:bg-gray-800/50
                transition-colors
              "
            >
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {slot.title}
              </span>
              <ChevronDown 
                className={`
                  h-4 w-4 text-gray-500 transition-transform duration-200
                  ${isOpen ? 'rotate-180' : ''}
                `} 
              />
            </button>

            {isOpen && (
              <div className="px-4 py-4 space-y-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                {slot.children.map((child) =>
                  renderNode(child, fieldMap, values, setValues)
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}