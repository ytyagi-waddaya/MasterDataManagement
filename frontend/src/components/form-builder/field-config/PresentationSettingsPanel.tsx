// import { useFormBuilderStore } from "../state/useFormBuilderStore";
// import { NodePath } from "../state/useFormBuilderStore";
// import {
//   HeadingLayoutNode,
//   SpacerLayoutNode,
//   DividerLayoutNode,
// } from "../node.types";

// export function PresentationSettingsPanel({
//   nodePath,
// }: {
//   nodePath: NodePath;
// }) {
//   const { schema, updatePresentationNode, deleteNode } =
//     useFormBuilderStore();

//   const section = schema.layout.sections.find(
//     (s) => s.id === nodePath.sectionId,
//   );

//   const node = section?.nodes.find(
//     (
//       n,
//     ): n is
//       | HeadingLayoutNode
//       | SpacerLayoutNode
//       | DividerLayoutNode =>
//       n.kind === "LAYOUT" &&
//       (n.type === "heading" ||
//         n.type === "spacer" ||
//         n.type === "divider") &&
//       n.id === nodePath.nodeId,
//   );

//   if (!node) {
//     return <div className="p-4">Not found</div>;
//   }

//   return (
//     <div className="p-4 space-y-4">
//       {node.type === "heading" && (
//         <input
//           className="border p-2 w-full"
//           value={node.config?.text ?? ""}
//           onChange={(e) =>
//             updatePresentationNode(nodePath, (n) => {
//               if (n.type !== "heading") return;
//               n.config = {
//                 ...n.config,
//                 text: e.target.value,
//               };
//             })
//           }
//         />
//       )}

//       {node.type === "spacer" && (
//         <select
//           className="border p-2 w-full"
//           value={node.config?.size ?? "md"}
//           onChange={(e) =>
//             updatePresentationNode(nodePath, (n) => {
//               if (n.type !== "spacer") return;
//               n.config = { size: e.target.value };
//             })
//           }
//         >
//           <option value="sm">Small</option>
//           <option value="md">Medium</option>
//           <option value="lg">Large</option>
//         </select>
//       )}

//       {node.type === "divider" && (
//         <div className="text-sm text-gray-500">
//           Divider has no settings
//         </div>
//       )}

//       <button
//         className="text-red-600 text-sm underline"
//         onClick={() => {
//           if (confirm("Delete this element?")) {
//             deleteNode(nodePath);
//           }
//         }}
//       >
//         🗑 Delete
//       </button>
//     </div>
//   );
// }

import { useFormBuilderStore } from "../state/useFormBuilderStore";
import { NodePath } from "../state/useFormBuilderStore";
import {
  HeadingLayoutNode,
  SpacerLayoutNode,
  DividerLayoutNode,
} from "../node.types";
import {
  Type,
  Minus,
  Space,
  Trash2,
  AlertTriangle,
  ChevronDown,
  Settings,
  Info
} from "lucide-react";
import { useState } from "react";

export function PresentationSettingsPanel({
  nodePath,
}: {
  nodePath: NodePath;
}) {
  const { schema, updatePresentationNode, deleteNode } =
    useFormBuilderStore();

  const section = schema.layout.sections.find(
    (s) => s.id === nodePath.sectionId,
  );

  const node = section?.nodes.find(
    (
      n,
    ): n is
      | HeadingLayoutNode
      | SpacerLayoutNode
      | DividerLayoutNode =>
      n.kind === "LAYOUT" &&
      (n.type === "heading" ||
        n.type === "spacer" ||
        n.type === "divider") &&
      n.id === nodePath.nodeId,
  );

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!node) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-linear-to-b from-white to-gray-50/50">
        <div className="relative mb-4">
          <div className="w-12 h-12 bg-linear-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="absolute -inset-1 bg-linear-to-r from-red-100/30 to-transparent rounded-xl blur-sm -z-10"></div>
        </div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1.5">Element Not Found</h3>
        <p className="text-xs text-gray-500 max-w-40 text-center">
          Selected presentation element could not be located
        </p>
      </div>
    );
  }

  const getNodeInfo = () => {
    switch (node.type) {
      case "heading":
        return {
          title: "Heading",
          description: "Section or form title element",
          icon: Type,
          color: "from-blue-50 to-blue-100 text-blue-600 border border-blue-200",
        };
      case "spacer":
        return {
          title: "Spacer",
          description: "Vertical spacing element",
          icon: Space,
          color: "from-gray-50 to-gray-100 text-gray-600 border border-gray-200",
        };
      case "divider":
        return {
          title: "Divider",
          description: "Visual separation line",
          icon: Minus,
          color: "from-gray-100 to-gray-200 text-gray-600 border border-gray-300",
        };
      default:
        return {
          title: "Element",
          description: "Presentation element",
          icon: Settings,
          color: "from-gray-50 to-gray-100 text-gray-600 border border-gray-200",
        };
    }
  };

  const info = getNodeInfo();
  const Icon = info.icon;

  const handleDelete = () => {
    if (window.confirm("Delete this presentation element?")) {
      deleteNode(nodePath);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 bg-linear-to-b from-white to-gray-50/50">
        <div className="flex items-start gap-4">
          <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br ${info.color} shadow-sm`}>
            <Icon className="w-5 h-5" />
            <div className="absolute -inset-0.5 bg-linear-to-r from-white/20 to-transparent rounded-xl blur-xs -z-10"></div>
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-gray-900 mb-1">{info.title}</h2>
            <p className="text-xs text-gray-500">{info.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 bg-linear-to-b from-white to-gray-50/30">
        <div className="space-y-5">
          {node.type === "heading" && (
            <div className="bg-linear-to-br from-gray-50 to-gray-100/30 border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-gray-500" />
                  <h4 className="text-xs font-semibold text-gray-900">Heading Text</h4>
                </div>
                <span className="text-[10px] font-medium px-2 py-1 bg-white border border-gray-300 text-gray-600 rounded-full">
                  H1 / H2 / H3
                </span>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-3">
                  Heading Content
                </label>
                <input
                  className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400 shadow-sm"
                  value={node.config?.text ?? ""}
                  onChange={(e) =>
                    updatePresentationNode(nodePath, (n) => {
                      if (n.type !== "heading") return;
                      n.config = {
                        ...n.config,
                        text: e.target.value,
                      };
                    })
                  }
                  placeholder="Enter heading text..."
                />
                <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  This text appears as a section title or heading in your form
                </p>
              </div>
            </div>
          )}

          {node.type === "spacer" && (
            <div className="bg-linear-to-br from-gray-50 to-gray-100/30 border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Space className="w-4 h-4 text-gray-500" />
                  <h4 className="text-xs font-semibold text-gray-900">Spacer Size</h4>
                </div>
                <span className="text-[10px] font-medium px-2 py-1 bg-white border border-gray-300 text-gray-600 rounded-full">
                  Vertical Space
                </span>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-3">
                  Select Spacing Size
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none shadow-sm"
                    value={node.config?.size ?? "md"}
                    onChange={(e) =>
                      updatePresentationNode(nodePath, (n) => {
                        if (n.type !== "spacer") return;
                        n.config = { size: e.target.value };
                      })
                    }
                  >
                    <option value="sm">Small (8px)</option>
                    <option value="md">Medium (24px)</option>
                    <option value="lg">Large (48px)</option>
                    <option value="xl">Extra Large (72px)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {["sm", "md", "lg", "xl"].map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        updatePresentationNode(nodePath, (n) => {
                          if (n.type !== "spacer") return;
                          n.config = { size };
                        })
                      }
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-200 ${
                        (node.config?.size ?? "md") === size
                          ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className="w-full flex flex-col items-center mb-1">
                        <div className={`bg-current rounded-full mb-1 ${
                          size === "sm" ? "w-1 h-1" :
                          size === "md" ? "w-1.5 h-1.5" :
                          size === "lg" ? "w-2 h-2" :
                          "w-2.5 h-2.5"
                        }`}></div>
                        <div className={`w-6 bg-current rounded-sm ${
                          size === "sm" ? "h-2" :
                          size === "md" ? "h-4" :
                          size === "lg" ? "h-6" :
                          "h-8"
                        }`}></div>
                      </div>
                      <span className="text-[10px] font-medium mt-1 capitalize">{size}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {node.type === "divider" && (
            <div className="bg-linear-to-br from-gray-50 to-gray-100/30 border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Minus className="w-4 h-4 text-gray-500" />
                  <h4 className="text-xs font-semibold text-gray-900">Divider Settings</h4>
                </div>
                <span className="text-[10px] font-medium px-2 py-1 bg-white border border-gray-300 text-gray-600 rounded-full">
                  Visual Element
                </span>
              </div>
              <div className="text-center py-6">
                <div className="relative mb-6">
                  <div className="w-full h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm">
                      <Minus className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                <h4 className="text-xs font-semibold text-gray-900 mb-2">Visual Divider</h4>
                <p className="text-xs text-gray-500 max-w-[200px] mx-auto">
                  Dividers create visual separation between sections of your form. No additional configuration needed.
                </p>
              </div>
            </div>
          )}

          <div className="p-3 bg-linear-to-br from-blue-50/50 to-blue-100/30 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                {node.type === "heading" && "Headings provide structure and hierarchy to your form layout."}
                {node.type === "spacer" && "Spacers add breathing room between form elements for better readability."}
                {node.type === "divider" && "Dividers visually separate different sections of your form."}
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
                  <h4 className="text-sm font-semibold text-red-900 mb-1.5">Delete {info.title}</h4>
                  <p className="text-xs text-red-700 leading-relaxed">
                    This will permanently delete the {info.title.toLowerCase()} element from your form layout.
                    This action cannot be undone.
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
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-b from-white to-gray-50 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:border-gray-400 hover:shadow-sm transition-all duration-200 group"
            >
              <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-600 transition-colors" />
              Delete {info.title}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}