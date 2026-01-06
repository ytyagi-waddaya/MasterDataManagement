// import { EditorNode } from "../contracts/editor.contract";

// export function LayoutInspector({
//   node,
//   onChange
// }: {
//   node: Extract<EditorNode, { kind: "LAYOUT" }>;
//     onChange: (node: EditorNode) => void;
// }) {
//   return (
//     <div className="space-y-2 text-sm">
//       <div className="font-medium capitalize">{node.type}</div>
//       <div className="text-xs text-muted-foreground">
//         Slots: {node.slots?.length ?? 0}
//       </div>
//     </div>
//   );
// }

// import { nanoid } from "nanoid";
// import {
//   EditorNode,
//   ContainerSlot,
//   LayoutSpan,
// } from "../contracts/editor.contract";

// type LayoutNode = Extract<EditorNode, { kind: "LAYOUT" }>;

// export function LayoutInspector({
//   node,
//   onChange,
// }: {
//   node: LayoutNode;
//   onChange: (node: EditorNode) => void;
// }) {
//   /* ================= COLUMNS ================= */
//   if (node.type === "columns") {
//     return (
//       <div className="space-y-3 text-sm">
//         <div className="font-medium">Columns</div>

//         {node.slots.map((slot, index) => (
//           <div
//             key={slot.id}
//             className="flex items-center gap-2"
//           >
//             <span className="text-xs">Column {index + 1}</span>

//             <select
//               value={slot.config?.span ?? 12}
//               onChange={(e) => {
//                 const span = Number(e.target.value) as LayoutSpan;

//                 onChange({
//                   ...node,
//                   slots: node.slots.map((s) =>
//                     s.id === slot.id
//                       ? { ...s, config: { span } }
//                       : s
//                   ),
//                 });
//               }}
//               className="border rounded px-2 py-1 text-xs"
//             >
//               {[3, 4, 6, 8, 12].map((v) => (
//                 <option key={v} value={v}>
//                   {v}/12
//                 </option>
//               ))}
//             </select>

//             <button
//               className="text-red-500 text-xs"
//               onClick={() =>
//                 onChange({
//                   ...node,
//                   slots: node.slots.filter(
//                     (s) => s.id !== slot.id
//                   ),
//                 })
//               }
//             >
//               ✕
//             </button>
//           </div>
//         ))}

//         <button
//           className="text-xs border rounded px-2 py-1"
//           onClick={() =>
//             onChange({
//               ...node,
//               slots: [
//                 ...node.slots,
//                 {
//                   id: nanoid(),
//                   children: [],
//                   config: { span: 6 },
//                 } as ContainerSlot,
//               ],
//             })
//           }
//         >
//           + Add column
//         </button>
//       </div>
//     );
//   }

//   /* ================= TABS / ACCORDION ================= */
//   if (node.type === "tabs" || node.type === "accordion") {
//     return (
//       <div className="space-y-3 text-sm">
//         <div className="font-medium capitalize">
//           {node.type}
//         </div>

//         {node.slots.map((slot) => (
//           <div key={slot.id} className="flex gap-2">
//             <input
//               value={slot.title ?? ""}
//               onChange={(e) =>
//                 onChange({
//                   ...node,
//                   slots: node.slots.map((s) =>
//                     s.id === slot.id
//                       ? { ...s, title: e.target.value }
//                       : s
//                   ),
//                 })
//               }
//               placeholder="Title"
//               className="border rounded px-2 py-1 text-xs flex-1"
//             />

//             <button
//               className="text-red-500 text-xs"
//               onClick={() =>
//                 onChange({
//                   ...node,
//                   slots: node.slots.filter(
//                     (s) => s.id !== slot.id
//                   ),
//                 })
//               }
//             >
//               ✕
//             </button>
//           </div>
//         ))}

//         <button
//           className="text-xs border rounded px-2 py-1"
//           onClick={() =>
//             onChange({
//               ...node,
//               slots: [
//                 ...node.slots,
//                 {
//                   id: nanoid(),
//                   title:
//                     node.type === "tabs"
//                       ? "New Tab"
//                       : "New Panel",
//                   children: [],
//                 },
//               ],
//             })
//           }
//         >
//           + Add {node.type === "tabs" ? "Tab" : "Panel"}
//         </button>
//       </div>
//     );
//   }

//   /* ================= SIMPLE LAYOUT ================= */
//   return (
//     <div className="text-sm text-muted-foreground">
//       This layout has no configurable slots.
//     </div>
//   );
// }
import { nanoid } from "nanoid";
import {
  EditorNode,
  ContainerSlot,
  LayoutSpan,
} from "../contracts/editor.contract";
import { Plus, X, Columns, Folder, FileStack, Minus, Type, Space } from "lucide-react";

type LayoutNode = Extract<EditorNode, { kind: "LAYOUT" }>;

export function LayoutInspector({
  node,
  onChange,
}: {
  node: LayoutNode;
  onChange: (node: EditorNode) => void;
}) {
  /* ================= DIVIDER ================= */
  if (node.type === "divider") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Minus className="h-4 w-4 text-gray-500" />
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Divider
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Label (optional)
            </label>
            <input
              value={node.config?.text ?? ""}
              onChange={(e) =>
                onChange({
                  ...node,
                  config: { ...node.config, text: e.target.value },
                })
              }
              placeholder="e.g., Section divider"
              className="w-full text-xs px-2 py-1.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
        </div>
      </div>
    );
  }

  /* ================= HEADING ================= */
  if (node.type === "heading") {
    const level = node.config?.level ?? 3;
    const text = node.config?.text ?? "";
    const description = node.config?.description ?? "";

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Type className="h-4 w-4 text-gray-500" />
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Heading
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Text
            </label>
            <input
              value={text}
              onChange={(e) =>
                onChange({
                  ...node,
                  config: { ...node.config, text: e.target.value },
                })
              }
              placeholder="Enter heading text"
              className="w-full text-xs px-2 py-1.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Level
            </label>
            <select
              value={level}
              onChange={(e) =>
                onChange({
                  ...node,
                  config: { ...node.config, level: Number(e.target.value) },
                })
              }
              className="w-full text-xs px-2 py-1.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              {[1, 2, 3, 4, 5, 6].map((lvl) => (
                <option key={lvl} value={lvl}>
                  Heading {lvl} {lvl === 1 ? "(Largest)" : lvl === 6 ? "(Smallest)" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) =>
                onChange({
                  ...node,
                  config: { ...node.config, description: e.target.value },
                })
              }
              placeholder="Additional description text"
              className="w-full text-xs px-2 py-1.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 min-h-[60px]"
              rows={2}
            />
          </div>
        </div>
      </div>
    );
  }

  /* ================= SPACER ================= */
  if (node.type === "spacer") {
    const height = node.config?.height ?? 16;
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Space className="h-4 w-4 text-gray-500" />
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Spacer
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Height (pixels)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="8"
                max="120"
                step="8"
                value={height}
                onChange={(e) =>
                  onChange({
                    ...node,
                    config: { ...node.config, height: Number(e.target.value) },
                  })
                }
                className="flex-1"
              />
              <div className="text-xs text-gray-600 dark:text-gray-400 w-12 text-center">
                {height}px
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[16, 32, 48, 64].map((size) => (
              <button
                key={size}
                onClick={() =>
                  onChange({
                    ...node,
                    config: { ...node.config, height: size },
                  })
                }
                className={`px-2 py-1.5 text-xs rounded border transition-colors ${
                  height === size
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                }`}
              >
                {size <= 16 ? "XS" : size <= 32 ? "S" : size <= 48 ? "M" : "L"}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ================= COLUMNS ================= */
  if (node.type === "columns") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Columns className="h-4 w-4 text-gray-500" />
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Columns Layout
          </div>
        </div>

        <div className="space-y-3">
          {node.slots.map((slot, index) => (
            <div
              key={slot.id}
              className="flex items-center gap-2 p-2 rounded border border-gray-200 dark:border-gray-800"
            >
              <div className="flex-1">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Column {index + 1}
                </div>
                <select
                  value={slot.config?.span ?? 12}
                  onChange={(e) => {
                    const span = Number(e.target.value) as LayoutSpan;

                    onChange({
                      ...node,
                      slots: node.slots.map((s) =>
                        s.id === slot.id
                          ? { ...s, config: { span } }
                          : s
                      ),
                    });
                  }}
                  className="w-full text-xs px-2 py-1.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                >
                  {[3, 4, 6, 8, 12].map((v) => (
                    <option key={v} value={v}>
                      {v}/12 ({Math.round((v / 12) * 100)}%)
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() =>
                  onChange({
                    ...node,
                    slots: node.slots.filter(
                      (s) => s.id !== slot.id
                    ),
                  })
                }
                title="Remove column"
              >
                <X className="h-3.5 w-3.5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs rounded border border-dashed border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          onClick={() =>
            onChange({
              ...node,
              slots: [
                ...node.slots,
                {
                  id: nanoid(),
                  children: [],
                  config: { span: 6 },
                } as ContainerSlot,
              ],
            })
          }
        >
          <Plus className="h-3.5 w-3.5" />
          Add Column
        </button>
      </div>
    );
  }

  /* ================= TABS ================= */
  if (node.type === "tabs") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Folder className="h-4 w-4 text-gray-500" />
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Tabs
          </div>
        </div>

        <div className="space-y-2">
          {node.slots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center gap-2 p-2 rounded border border-gray-200 dark:border-gray-800"
            >
              <input
                value={slot.title ?? ""}
                onChange={(e) =>
                  onChange({
                    ...node,
                    slots: node.slots.map((s) =>
                      s.id === slot.id
                        ? { ...s, title: e.target.value }
                        : s
                    ),
                  })
                }
                placeholder="Tab title"
                className="flex-1 text-xs px-2 py-1.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
              />

              <button
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() =>
                  onChange({
                    ...node,
                    slots: node.slots.filter(
                      (s) => s.id !== slot.id
                    ),
                  })
                }
                title="Remove tab"
              >
                <X className="h-3.5 w-3.5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs rounded border border-dashed border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          onClick={() =>
            onChange({
              ...node,
              slots: [
                ...node.slots,
                {
                  id: nanoid(),
                  title: "New Tab",
                  children: [],
                },
              ],
            })
          }
        >
          <Plus className="h-3.5 w-3.5" />
          Add Tab
        </button>
      </div>
    );
  }

  /* ================= ACCORDION ================= */
  if (node.type === "accordion") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileStack className="h-4 w-4 text-gray-500" />
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Accordion
          </div>
        </div>

        <div className="space-y-2">
          {node.slots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center gap-2 p-2 rounded border border-gray-200 dark:border-gray-800"
            >
              <input
                value={slot.title ?? ""}
                onChange={(e) =>
                  onChange({
                    ...node,
                    slots: node.slots.map((s) =>
                      s.id === slot.id
                        ? { ...s, title: e.target.value }
                        : s
                    ),
                  })
                }
                placeholder="Panel title"
                className="flex-1 text-xs px-2 py-1.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
              />

              <button
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() =>
                  onChange({
                    ...node,
                    slots: node.slots.filter(
                      (s) => s.id !== slot.id
                    ),
                  })
                }
                title="Remove panel"
              >
                <X className="h-3.5 w-3.5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs rounded border border-dashed border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          onClick={() =>
            onChange({
              ...node,
              slots: [
                ...node.slots,
                {
                  id: nanoid(),
                  title: "New Panel",
                  children: [],
                },
              ],
            })
          }
        >
          <Plus className="h-3.5 w-3.5" />
          Add Panel
        </button>
      </div>
    );
  }

  /* ================= OTHER LAYOUT TYPES ================= */
  return (
    <div className="py-4 text-center">
      <div className="text-sm text-gray-400 dark:text-gray-500">
        No configuration available
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
        This layout type has no settings
      </div>
    </div>
  );
}