
// import { useFormBuilderStore } from "../state/useFormBuilderStore";
// import {
//   GenericLayoutNode,
//   RepeaterLayoutNode,
//   Node,
// } from "../node.types";
// import { NodePath } from "../state/useFormBuilderStore";

// /* ======================================================
//    HELPERS
// ====================================================== */

// function findLayoutNode(
//   nodes: Node[],
//   nodeId: string,
// ): GenericLayoutNode | RepeaterLayoutNode | undefined {
//   for (const n of nodes) {
//     if (n.id === nodeId && n.kind === "LAYOUT") {
//       if (
//         n.type === "columns" ||
//         n.type === "tabs" ||
//         n.type === "repeater"
//       ) {
//         return n;
//       }
//     }

//     if (n.kind === "LAYOUT") {
//       if (n.type === "repeater") {
//         const found = findLayoutNode(n.children, nodeId);
//         if (found) return found;
//       }

//       if ("slots" in n) {
//         for (const slot of n.slots) {
//           const found = findLayoutNode(slot.children, nodeId);
//           if (found) return found;
//         }
//       }
//     }
//   }
//   return undefined;
// }

// /* ======================================================
//    PANEL
// ====================================================== */

// export function LayoutSettingsPanel({ nodePath }: { nodePath: NodePath }) {
//   const { schema, deleteNode } = useFormBuilderStore();

//   const section = schema.layout.sections.find(
//     (s) => s.id === nodePath.sectionId,
//   );

//   const node = section
//     ? findLayoutNode(section.nodes, nodePath.nodeId)
//     : undefined;

//   if (!node) {
//     return <div className="p-4 text-red-500">Layout not found</div>;
//   }

//   switch (node.type) {
//     case "columns":
//       return (
//         <ColumnsSettings node={node} nodePath={nodePath} />
//       );

//     case "tabs":
//       return (
//         <TabsSettings node={node} nodePath={nodePath} />
//       );

//     case "repeater":
//       return (
//         <RepeaterSettings node={node} nodePath={nodePath} />
//       );

//     default:
//       return null;
//   }
// }

// /* ======================================================
//    COLUMNS
// ====================================================== */

// function ColumnsSettings({
//   node,
//   nodePath,
// }: {
//   node: GenericLayoutNode;
//   nodePath: NodePath;
// }) {
//   const { updateLayoutNode, deleteNode } =
//     useFormBuilderStore();

//   return (
//     <div className="p-4 space-y-4">
//       <h3 className="font-semibold">Columns</h3>

//       <select
//         className="border p-2 w-full"
//         value={node.slots.length}
//         onChange={(e) => {
//           const count = Number(e.target.value);

//           updateLayoutNode(nodePath, (n) => {
//             if (n.type !== "columns") return;

//             n.slots = Array.from({ length: count }).map(
//               (_, i) => ({
//                 id: crypto.randomUUID(),
//                 children: n.slots[i]?.children ?? [],
//               }),
//             );
//           });
//         }}
//       >
//         <option value={1}>1 column</option>
//         <option value={2}>2 columns</option>
//         <option value={3}>3 columns</option>
//       </select>

//       <button
//         className="text-red-600 text-sm underline"
//         onClick={() => {
//           if (confirm("Delete columns layout?")) {
//             deleteNode(nodePath);
//           }
//         }}
//       >
//         🗑 Delete Columns
//       </button>
//     </div>
//   );
// }

// /* ======================================================
//    TABS
// ====================================================== */

// function TabsSettings({
//   node,
//   nodePath,
// }: {
//   node: GenericLayoutNode;
//   nodePath: NodePath;
// }) {
//   const { updateLayoutNode, deleteNode } =
//     useFormBuilderStore();

//   return (
//     <div className="p-4 space-y-4">
//       <h3 className="font-semibold">Tabs</h3>

//       {node.slots.map((slot, i) => (
//         <div key={slot.id} className="flex gap-2">
//           <input
//             className="border p-2 flex-1"
//             value={slot.title ?? ""}
//             onChange={(e) =>
//               updateLayoutNode(nodePath, (n) => {
//                 if (n.type !== "tabs") return;
//                 n.slots[i].title = e.target.value;
//               })
//             }
//           />

//           <button
//             className="text-red-600 text-xs"
//             disabled={node.slots.length === 1}
//             onClick={() =>
//               updateLayoutNode(nodePath, (n) => {
//                 if (n.type !== "tabs") return;
//                 n.slots.splice(i, 1);
//               })
//             }
//           >
//             ✕
//           </button>
//         </div>
//       ))}

//       <button
//         className="border p-2 w-full text-sm"
//         onClick={() =>
//           updateLayoutNode(nodePath, (n) => {
//             if (n.type !== "tabs") return;
//             n.slots.push({
//               id: crypto.randomUUID(),
//               title: `Tab ${n.slots.length + 1}`,
//               children: [],
//             });
//           })
//         }
//       >
//         ➕ Add Tab
//       </button>

//       <button
//         className="text-red-600 text-sm underline"
//         onClick={() => {
//           if (confirm("Delete tabs layout?")) {
//             deleteNode(nodePath);
//           }
//         }}
//       >
//         🗑 Delete Tabs
//       </button>
//     </div>
//   );
// }

// /* ======================================================
//    REPEATER
// ====================================================== */

// function RepeaterSettings({
//   node,
//   nodePath,
// }: {
//   node: RepeaterLayoutNode;
//   nodePath: NodePath;
// }) {
//   const { updateLayoutNode, deleteNode } =
//     useFormBuilderStore();

//   return (
//     <div className="p-4 space-y-4">
//       <h3 className="font-semibold">Repeater</h3>

//       <input
//         type="number"
//         className="border p-2 w-full"
//         value={node.config?.minItems ?? 0}
//         onChange={(e) =>
//           updateLayoutNode(nodePath, (n) => {
//             if (n.type !== "repeater") return;
//             n.config = {
//               ...n.config,
//               minItems: Number(e.target.value),
//             };
//           })
//         }
//       />

//       <input
//         type="number"
//         className="border p-2 w-full"
//         value={node.config?.maxItems ?? 1}
//         onChange={(e) =>
//           updateLayoutNode(nodePath, (n) => {
//             if (n.type !== "repeater") return;
//             n.config = {
//               ...n.config,
//               maxItems: Number(e.target.value),
//             };
//           })
//         }
//       />

//       <button
//         className="text-red-600 text-sm underline"
//         onClick={() => {
//           if (confirm("Delete repeater layout?")) {
//             deleteNode(nodePath);
//           }
//         }}
//       >
//         🗑 Delete Repeater
//       </button>
//     </div>
//   );
// }

import { useFormBuilderStore } from "../state/useFormBuilderStore";
import {
  GenericLayoutNode,
  RepeaterLayoutNode,
  Node,
} from "../node.types";
import { NodePath } from "../state/useFormBuilderStore";
import {
  Columns3,
  Table,
  Repeat,
  Trash2,
  Plus,
  Minus,
  AlertTriangle,
  Settings,
  X,
  ChevronRight,
  Hash,
  Type
} from "lucide-react";
import { useState } from "react";

/* ======================================================
   HELPERS
====================================================== */

function findLayoutNode(
  nodes: Node[],
  nodeId: string,
): GenericLayoutNode | RepeaterLayoutNode | undefined {
  for (const n of nodes) {
    if (n.id === nodeId && n.kind === "LAYOUT") {
      if (
        n.type === "columns" ||
        n.type === "tabs" ||
        n.type === "repeater"
      ) {
        return n;
      }
    }

    if (n.kind === "LAYOUT") {
      if (n.type === "repeater") {
        const found = findLayoutNode(n.children, nodeId);
        if (found) return found;
      }

      if ("slots" in n) {
        for (const slot of n.slots) {
          const found = findLayoutNode(slot.children, nodeId);
          if (found) return found;
        }
      }
    }
  }
  return undefined;
}

/* ======================================================
   PANEL
====================================================== */

export function LayoutSettingsPanel({ nodePath }: { nodePath: NodePath }) {
  const { schema, deleteNode } = useFormBuilderStore();

  const section = schema.layout.sections.find(
    (s) => s.id === nodePath.sectionId,
  );

  const node = section
    ? findLayoutNode(section.nodes, nodePath.nodeId)
    : undefined;

  if (!node) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-linear-to-b from-white to-gray-50/50">
        <div className="relative mb-4">
          <div className="w-12 h-12 bg-linear-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="absolute -inset-1 bg-linear-to-r from-red-100/30 to-transparent rounded-xl blur-sm -z-10"></div>
        </div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1.5">Layout Not Found</h3>
        <p className="text-xs text-gray-500 max-w-40 text-center">
          Selected layout could not be located
        </p>
      </div>
    );
  }

  switch (node.type) {
    case "columns":
      return (
        <ColumnsSettings node={node} nodePath={nodePath} />
      );

    case "tabs":
      return (
        <TabsSettings node={node} nodePath={nodePath} />
      );

    case "repeater":
      return (
        <RepeaterSettings node={node} nodePath={nodePath} />
      );

    default:
      return null;
  }
}

/* ======================================================
   COLUMNS SETTINGS
====================================================== */

function ColumnsSettings({
  node,
  nodePath,
}: {
  node: GenericLayoutNode;
  nodePath: NodePath;
}) {
  const { updateLayoutNode, deleteNode } = useFormBuilderStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Delete columns layout and all its contents?")) {
      deleteNode(nodePath);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 bg-linear-to-b from-white to-gray-50/50">
        <div className="flex items-start gap-4">
          <div className="relative w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm">
            <Columns3 className="w-5 h-5 text-blue-600" />
            <div className="absolute -inset-0.5 bg-linear-to-r from-white/20 to-transparent rounded-xl blur-xs -z-10"></div>
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-gray-900 mb-1">Columns Layout</h2>
            <p className="text-xs text-gray-500">Configure multi-column arrangement</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 bg-linear-to-b from-white to-gray-50/30">
        <div className="space-y-5">
          <div className="bg-linear-to-br from-gray-50 to-gray-100/30 border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-500" />
                <h4 className="text-xs font-semibold text-gray-900">Column Configuration</h4>
              </div>
              <span className="text-[10px] font-medium px-2 py-1 bg-white border border-gray-300 text-gray-600 rounded-full">
                {node.slots.length} Column{node.slots.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-900 mb-3">
                Number of Columns
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((count) => (
                  <button
                    key={count}
                    onClick={() => {
                      updateLayoutNode(nodePath, (n) => {
                        if (n.type !== "columns") return;

                        n.slots = Array.from({ length: count }).map(
                          (_, i) => ({
                            id: crypto.randomUUID(),
                            children: n.slots[i]?.children ?? [],
                          }),
                        );
                      });
                    }}
                    className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
                      node.slots.length === count
                        ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {Array.from({ length: count }).map((_, i) => (
                        <div key={i} className="w-2 h-6 bg-current rounded-sm opacity-80"></div>
                      ))}
                    </div>
                    <span className="text-xs font-medium">{count} Column{count !== 1 ? 's' : ''}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-linear-to-br from-blue-50/50 to-blue-100/30 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                Each column acts as an independent container. Drag and drop fields into specific columns to organize your form layout.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Section */}
      <div className="p-5 border-t border-gray-200 bg-linear-to-b from-gray-50 to-gray-100/30">
        <div className="space-y-3">
          {showDeleteConfirm ? (
            <div className="bg-linear-to-br from-red-50 to-red-100/50 border border-red-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-white border border-red-200 rounded-lg flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-900 mb-1.5">Delete Columns Layout</h4>
                  <p className="text-xs text-red-700 leading-relaxed">
                    This will permanently delete the columns layout and all its contents.
                    Fields inside columns will be moved to the parent section.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-600 to-red-700 text-white rounded-lg text-sm font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Layout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-b from-white to-gray-50 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:border-gray-400 hover:shadow-sm transition-all duration-200 group"
            >
              <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-600 transition-colors" />
              Delete Columns Layout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   TABS SETTINGS
====================================================== */

function TabsSettings({
  node,
  nodePath,
}: {
  node: GenericLayoutNode;
  nodePath: NodePath;
}) {
  const { updateLayoutNode, deleteNode } = useFormBuilderStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Delete tabs layout and all its contents?")) {
      deleteNode(nodePath);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 bg-linear-to-b from-white to-gray-50/50">
        <div className="flex items-start gap-4">
          <div className="relative w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200 shadow-sm">
            <Table className="w-5 h-5 text-purple-600" />
            <div className="absolute -inset-0.5 bg-linear-to-r from-white/20 to-transparent rounded-xl blur-xs -z-10"></div>
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-gray-900 mb-1">Tabs Layout</h2>
            <p className="text-xs text-gray-500">Configure tabbed interface structure</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 bg-linear-to-b from-white to-gray-50/30">
        <div className="space-y-5">
          <div className="bg-linear-to-br from-gray-50 to-gray-100/30 border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-500" />
                <h4 className="text-xs font-semibold text-gray-900">Tab Management</h4>
              </div>
              <span className="text-[10px] font-medium px-2 py-1 bg-white border border-gray-300 text-gray-600 rounded-full">
                {node.slots.length} Tab{node.slots.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-3">
              {node.slots.map((slot, i) => (
                <div
                  key={slot.id}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-xs font-semibold text-gray-700">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <input
                      className="w-full px-3 py-1.5 text-sm bg-transparent border-none focus:outline-none focus:ring-0"
                      value={slot.title ?? `Tab ${i + 1}`}
                      onChange={(e) =>
                        updateLayoutNode(nodePath, (n) => {
                          if (n.type !== "tabs") return;
                          n.slots[i].title = e.target.value;
                        })
                      }
                      placeholder="Enter tab title"
                    />
                  </div>
                  <button
                    className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    disabled={node.slots.length === 1}
                    onClick={() => {
                      if (node.slots.length > 1) {
                        updateLayoutNode(nodePath, (n) => {
                          if (n.type !== "tabs") return;
                          n.slots.splice(i, 1);
                        });
                      }
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-b from-white to-gray-50 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:border-gray-400 hover:shadow-sm transition-all duration-200"
              onClick={() =>
                updateLayoutNode(nodePath, (n) => {
                  if (n.type !== "tabs") return;
                  n.slots.push({
                    id: crypto.randomUUID(),
                    title: `Tab ${n.slots.length + 1}`,
                    children: [],
                  });
                })
              }
            >
              <Plus className="w-4 h-4" />
              Add New Tab
            </button>
          </div>

          <div className="p-3 bg-linear-to-br from-purple-50/50 to-purple-100/30 border border-purple-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <p className="text-xs text-purple-700">
                Tabs organize content into separate panels. Users can switch between tabs to view different groups of fields.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Section */}
      <div className="p-5 border-t border-gray-200 bg-linear-to-b from-gray-50 to-gray-100/30">
        <div className="space-y-3">
          {showDeleteConfirm ? (
            <div className="bg-linear-to-br from-red-50 to-red-100/50 border border-red-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-white border border-red-200 rounded-lg flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-900 mb-1.5">Delete Tabs Layout</h4>
                  <p className="text-xs text-red-700 leading-relaxed">
                    This will permanently delete the tabs layout and all its contents.
                    Fields inside tabs will be moved to the parent section.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-600 to-red-700 text-white rounded-lg text-sm font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Layout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-b from-white to-gray-50 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:border-gray-400 hover:shadow-sm transition-all duration-200 group"
            >
              <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-600 transition-colors" />
              Delete Tabs Layout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   REPEATER SETTINGS
====================================================== */

function RepeaterSettings({
  node,
  nodePath,
}: {
  node: RepeaterLayoutNode;
  nodePath: NodePath;
}) {
  const { updateLayoutNode, deleteNode } = useFormBuilderStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Delete repeater layout and all its contents?")) {
      deleteNode(nodePath);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 bg-linear-to-b from-white to-gray-50/50">
        <div className="flex items-start gap-4">
          <div className="relative w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br from-green-50 to-green-100 border border-green-200 shadow-sm">
            <Repeat className="w-5 h-5 text-green-600" />
            <div className="absolute -inset-0.5 bg-linear-to-r from-white/20 to-transparent rounded-xl blur-xs -z-10"></div>
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-gray-900 mb-1">Repeater Layout</h2>
            <p className="text-xs text-gray-500">Configure repeatable field groups</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 bg-linear-to-b from-white to-gray-50/30">
        <div className="space-y-5">
          <div className="bg-linear-to-br from-gray-50 to-gray-100/30 border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-500" />
                <h4 className="text-xs font-semibold text-gray-900">Repeater Configuration</h4>
              </div>
              <span className="text-[10px] font-medium px-2 py-1 bg-white border border-gray-300 text-gray-600 rounded-full">
                Dynamic
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Minus className="w-3.5 h-3.5 text-gray-500" />
                    Minimum Items
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={node.config?.minItems ?? 0}
                    onChange={(e) =>
                      updateLayoutNode(nodePath, (n) => {
                        if (n.type !== "repeater") return;
                        n.config = {
                          ...n.config,
                          minItems: Number(e.target.value),
                        };
                      })
                    }
                    className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 shadow-sm appearance-none"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">items</div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1.5">Minimum required repetitions</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-900 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-gray-500" />
                    Maximum Items
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={node.config?.maxItems ?? 1}
                    onChange={(e) =>
                      updateLayoutNode(nodePath, (n) => {
                        if (n.type !== "repeater") return;
                        n.config = {
                          ...n.config,
                          maxItems: Number(e.target.value),
                        };
                      })
                    }
                    className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 shadow-sm appearance-none"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">items</div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1.5">Maximum allowed repetitions</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-linear-to-br from-green-50/50 to-green-100/30 border border-green-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              <p className="text-xs text-green-700">
                Repeaters allow users to add multiple instances of a field group. Useful for lists, arrays, or repeating sections of data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Section */}
      <div className="p-5 border-t border-gray-200 bg-linear-to-b from-gray-50 to-gray-100/30">
        <div className="space-y-3">
          {showDeleteConfirm ? (
            <div className="bg-linear-to-br from-red-50 to-red-100/50 border border-red-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-white border border-red-200 rounded-lg flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-900 mb-1.5">Delete Repeater Layout</h4>
                  <p className="text-xs text-red-700 leading-relaxed">
                    This will permanently delete the repeater layout and all its contents.
                    Fields inside repeater will be moved to the parent section.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-600 to-red-700 text-white rounded-lg text-sm font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Layout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-b from-white to-gray-50 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:border-gray-400 hover:shadow-sm transition-all duration-200 group"
            >
              <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-600 transition-colors" />
              Delete Repeater Layout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Add missing Info component
const Info = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);