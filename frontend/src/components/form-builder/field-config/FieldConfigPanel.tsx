import { useFormBuilderStore } from "../state/useFormBuilderStore";
import { MetaTab } from "./tabs/MetaTab";
import { DataTab } from "./tabs/DataTab";
import { UITab } from "./tabs/UITab";
import { ValidationTab } from "./tabs/ValidationTab";
import { PermissionTab } from "./tabs/PermissionTab";
import { PresentationSettingsPanel } from "./PresentationSettingsPanel";
import { LayoutSettingsPanel } from "./LayoutSettingsPanel";
import { Node } from "../node.types";
import { VisibilityTab } from "./tabs/VisibilityTab";
import { formatVisibilityRule } from "../components/formatVisibilityRule";
import { CalculationTab } from "./tabs/CalculationTab";

/* ======================================================
   HELPERS
====================================================== */

function findNodeById(nodes: Node[], nodeId: string): Node | undefined {
  for (const node of nodes) {
    if (node.id === nodeId) return node;

    if (node.kind === "LAYOUT") {
      // ✅ Repeater has children
      if (node.type === "repeater") {
        const found = findNodeById(node.children, nodeId);
        if (found) return found;
      }

      // ✅ Generic layouts have slots
      if ("slots" in node && node.slots) {
        for (const slot of node.slots) {
          const found = findNodeById(slot.children, nodeId);
          if (found) return found;
        }
      }
    }
  }
  return undefined;
}

/* ======================================================
   ROOT CONFIG PANEL
====================================================== */

export function FieldConfigPanel() {
  const { selectedFieldKey, selectedSectionId, selectedNodePath, schema } =
    useFormBuilderStore();

  /* ---------- FIELD ---------- */
  if (selectedFieldKey) {
    return <FieldSettings fieldKey={selectedFieldKey} />;
  }

  /* ---------- SECTION ---------- */
  if (selectedSectionId) {
    return <SectionSettings sectionId={selectedSectionId} />;
  }

  /* ---------- NODE ---------- */
  if (selectedNodePath) {
    const section = schema.layout.sections.find(
      (s) => s.id === selectedNodePath.sectionId,
    );

    const node = section
      ? findNodeById(section.nodes, selectedNodePath.nodeId)
      : undefined;

    if (!node) {
      return <div className="p-4 text-red-500">Selected element not found</div>;
    }

    // 🔹 PRESENTATION ELEMENTS
    if (
      node.kind === "LAYOUT" &&
      (node.type === "heading" ||
        node.type === "divider" ||
        node.type === "spacer")
    ) {
      return <PresentationSettingsPanel nodePath={selectedNodePath} />;
    }

    // 🔹 STRUCTURAL LAYOUTS
    if (node.kind === "LAYOUT") {
      return <LayoutSettingsPanel nodePath={selectedNodePath} />;
    }
  }

  /* ---------- EMPTY ---------- */
  return (
    <div className="p-4 text-sm text-gray-500">
      Select a field, section, or layout element
    </div>
  );
}

/* ======================================================
   FIELD SETTINGS
====================================================== */

function FieldSettings({ fieldKey }: { fieldKey: string }) {
  const store = useFormBuilderStore((s) => ({
    fieldConfigs: s.fieldConfigs,
    removeField: s.removeField,
    selectField: s.selectField,
    published: s.published,
  }));

  const field = store.fieldConfigs.find((f) => f.meta.key === fieldKey);

  if (!field) {
    return <div className="p-4 text-red-500">Field not found</div>;
  }

  // 🔒 SNAPSHOT VALUES (THIS IS THE KEY)
  const fieldKeySafe = field.meta.key;

  function handleDelete() {
    const confirmed = window.confirm(
      store.published
        ? "This field will be removed from the form layout.\nExisting data remains.\n\nContinue?"
        : "This field will be permanently deleted.\n\nContinue?",
    );

    if (!confirmed) return;

    store.removeField(fieldKeySafe);
    store.selectField(undefined);
  }

  return (
    <div className="space-y-6 p-4">
      <p className="text-xs text-gray-400 italic px-4">
        {/* {formatVisibilityRule(field.visibility, store.fieldConfigs)} */}
      </p>

      <MetaTab field={field} />
      <DataTab field={field} />
      <UITab field={field} />
      <ValidationTab field={field} />
      <VisibilityTab target="FIELD" fieldKey={field.meta.key} />
      <CalculationTab field={field} />

      <PermissionTab field={field} />

      <div className="pt-6 border-t">
        <button
          onClick={handleDelete}
          className="text-red-600 text-sm hover:underline"
        >
          {store.published ? "Remove field" : "Delete field"}
        </button>
      </div>
    </div>
  );
}

/* ======================================================
   SECTION SETTINGS
====================================================== */

function SectionSettings({ sectionId }: { sectionId: string }) {
  const section = useFormBuilderStore((s) =>
    s.schema.layout.sections.find((sec) => sec.id === sectionId),
  );

  const updateSection = useFormBuilderStore((s) => s.updateSection);
  const removeSection = useFormBuilderStore((s) => s.removeSection);

  if (!section) {
    return <div className="p-4 text-red-500">Section not found</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold text-sm">Section Settings</h3>

      <div>
        <label className="text-xs text-gray-500">Section Title</label>
        <input
          className="border p-2 w-full"
          value={section.title}
          onChange={(e) =>
            updateSection(section.id, {
              title: e.target.value,
            })
          }
        />
      </div>

      <div className="pt-4 border-t">
        <button
          onClick={() => {
            if (
              confirm("Delete this section and all its fields and layouts?")
            ) {
              removeSection(section.id);
            }
          }}
          className="text-red-600 text-sm hover:underline"
        >
          Delete Section
        </button>
      </div>
    </div>
  );
}

// import { useFormBuilderStore } from "../state/useFormBuilderStore";
// import { MetaTab } from "./tabs/MetaTab";
// import { DataTab } from "./tabs/DataTab";
// import { UITab } from "./tabs/UITab";
// import { ValidationTab } from "./tabs/ValidationTab";
// import { PermissionTab } from "./tabs/PermissionTab";
// import { PresentationSettingsPanel } from "./PresentationSettingsPanel";
// import { LayoutSettingsPanel } from "./LayoutSettingsPanel";
// import { Node } from "../node.types";
// import { VisibilityTab } from "./tabs/VisibilityTab";
// import { CalculationTab } from "./tabs/CalculationTab";
// import {
//   Settings,
//   Trash2,
//   AlertCircle,
//   Eye,
//   Shield,
//   Calculator,
//   Database,
//   Palette,
//   CheckCircle,
//   Layout,
//   Hash,
//   Type,
//   Calendar,
//   ChevronDown,
//   XCircle,
//   AlertTriangle,
//   Layers,
//   Key,
//   Globe,
// } from "lucide-react";
// import { useState } from "react";

// /* ======================================================
//    HELPERS
// ====================================================== */

// function findNodeById(nodes: Node[], nodeId: string): Node | undefined {
//   for (const node of nodes) {
//     if (node.id === nodeId) return node;

//     if (node.kind === "LAYOUT") {
//       if (node.type === "repeater") {
//         const found = findNodeById(node.children, nodeId);
//         if (found) return found;
//       }

//       if ("slots" in node && node.slots) {
//         for (const slot of node.slots) {
//           const found = findNodeById(slot.children, nodeId);
//           if (found) return found;
//         }
//       }
//     }
//   }
//   return undefined;
// }

// /* ======================================================
//    ROOT CONFIG PANEL
// ====================================================== */

// export function FieldConfigPanel() {
//   const { selectedFieldKey, selectedSectionId, selectedNodePath, schema } =
//     useFormBuilderStore();

//   /* ---------- FIELD ---------- */
//   if (selectedFieldKey) {
//     return <FieldSettings fieldKey={selectedFieldKey} />;
//   }

//   /* ---------- SECTION ---------- */
//   if (selectedSectionId) {
//     return <SectionSettings sectionId={selectedSectionId} />;
//   }

//   /* ---------- NODE ---------- */
//   if (selectedNodePath) {
//     const section = schema.layout.sections.find(
//       (s) => s.id === selectedNodePath.sectionId,
//     );

//     const node = section
//       ? findNodeById(section.nodes, selectedNodePath.nodeId)
//       : undefined;

//     if (!node) {
//       return (
//         <div className="p-6 flex flex-col items-center justify-center text-center bg-linear-to-b from-white to-gray-50/50">
//           <div className="relative mb-4">
//             <div className="w-12 h-12 bg-linear-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
//               <XCircle className="w-5 h-5 text-gray-400" />
//             </div>
//             <div className="absolute -inset-1 bg-linear-to-r from-gray-200/50 to-transparent rounded-xl blur-sm -z-10"></div>
//           </div>
//           <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
//             Element Not Found
//           </h3>
//           <p className="text-xs text-gray-500 max-w-40">
//             The selected element could not be located in the structure
//           </p>
//         </div>
//       );
//     }

//     if (
//       node.kind === "LAYOUT" &&
//       (node.type === "heading" ||
//         node.type === "divider" ||
//         node.type === "spacer")
//     ) {
//       return <PresentationSettingsPanel nodePath={selectedNodePath} />;
//     }

//     if (node.kind === "LAYOUT") {
//       return <LayoutSettingsPanel nodePath={selectedNodePath} />;
//     }
//   }

//   /* ---------- EMPTY ---------- */
//   return (
//     <div className="h-full flex flex-col items-center justify-center p-6 bg-linear-to-b from-white to-gray-50/50">
//       <div className="relative mb-5">
//         <div className="w-14 h-14 bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
//           <Settings className="w-6 h-6 text-gray-400" />
//         </div>
//         <div className="absolute -inset-1.5 bg-linear-to-r from-gray-200/30 to-transparent rounded-2xl blur-sm -z-10"></div>
//       </div>
//       <h3 className="text-sm font-semibold text-gray-900 mb-1.5 tracking-tight">
//         Configuration Panel
//       </h3>
//       <p className="text-xs text-gray-500 text-center max-w-[180px] leading-relaxed">
//         Select a field, section, or layout element to configure properties and
//         behaviors
//       </p>
//     </div>
//   );
// }

// /* ======================================================
//    FIELD SETTINGS
// ====================================================== */

// function FieldSettings({ fieldKey }: { fieldKey: string }) {
//   const store = useFormBuilderStore((s) => ({
//     fieldConfigs: s.fieldConfigs,
//     removeField: s.removeField,
//     selectField: s.selectField,
//     published: s.published,
//   }));

//   const field = store.fieldConfigs.find((f) => f.meta.key === fieldKey);
//   const [activeTab, setActiveTab] = useState("meta");
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   if (!field) {
//     return (
//       <div className="h-full flex flex-col items-center justify-center p-6 bg-linear-to-b from-white to-gray-50/50">
//         <div className="relative mb-4">
//           <div className="w-12 h-12 bg-linear-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center">
//             <AlertCircle className="w-5 h-5 text-red-400" />
//           </div>
//           <div className="absolute -inset-1 bg-linear-to-r from-red-100/30 to-transparent rounded-xl blur-sm -z-10"></div>
//         </div>
//         <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
//           Field Not Found
//         </h3>
//         <p className="text-xs text-gray-500 max-w-40 text-center">
//           Selected field configuration could not be located
//         </p>
//       </div>
//     );
//   }

//   const fieldKeySafe = field.meta.key;

//   const handleDelete = () => {
//     if (store.published) {
//       if (
//         !window.confirm(
//           "⚠️ Remove Field\n\nThis field will be removed from the form layout.\nExisting submitted data will be preserved.\n\nContinue?",
//         )
//       )
//         return;
//     } else {
//       if (
//         !window.confirm(
//           "🗑️ Delete Field\n\nThis field and all its configuration will be permanently deleted.\n\nContinue?",
//         )
//       )
//         return;
//     }

//     store.removeField(fieldKeySafe);
//     store.selectField(undefined);
//   };

//   const getFieldIcon = () => {
//     switch (field.ui?.widget) {
//       case "TEXT":
//         return <Type className="w-4 h-4" />;
//       case "NUMBER":
//         return <Hash className="w-4 h-4" />;
//       case "DATE":
//         return <Calendar className="w-4 h-4" />;
//       case "SELECT":
//         return <ChevronDown className="w-4 h-4" />;
//       default:
//         return <Settings className="w-4 h-4" />;
//     }
//   };

//   const getFieldCategoryColor = () => {
//     switch (field.meta.category) {
//       case "INPUT":
//         return "from-blue-50 to-blue-100 text-blue-700 border border-blue-200";
//       case "CALCULATED":
//         return "from-purple-50 to-purple-100 text-purple-700 border border-purple-200";
//       case "REFERENCE":
//         return "from-amber-50 to-amber-100 text-amber-700 border border-amber-200";
//       case "SYSTEM":
//         return "from-gray-100 to-gray-200 text-gray-700 border border-gray-300";
//       default:
//         return "from-gray-100 to-gray-200 text-gray-700 border border-gray-300";
//     }
//   };

//   const tabs = [
//     { id: "meta", label: "Basic", icon: Settings, color: "text-gray-600" },
//     { id: "data", label: "Data", icon: Database, color: "text-blue-600" },
//     { id: "ui", label: "Display", icon: Palette, color: "text-purple-600" },
//     {
//       id: "validation",
//       label: "Validation",
//       icon: CheckCircle,
//       color: "text-green-600",
//     },
//     {
//       id: "visibility",
//       label: "Visibility",
//       icon: Eye,
//       color: "text-amber-600",
//     },
//     {
//       id: "calculation",
//       label: "Calculation",
//       icon: Calculator,
//       color: "text-indigo-600",
//     },
//     {
//       id: "permission",
//       label: "Permissions",
//       icon: Shield,
//       color: "text-red-600",
//     },
//   ];

//   const fieldType = field.data.type;
//   const fieldWidget = field.ui?.widget || "Unknown";

//   return (
//     <div className="h-full flex flex-col bg-white">
//       {/* Header with Integrated Tabs */}
//       <div className="border-b border-gray-200 bg-white">
//         <div className="p-5">
//           <div className="flex items-start gap-4 mb-2">
//             <div
//               className={`relative w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br ${getFieldCategoryColor()} shadow-sm`}
//             >
//               {getFieldIcon()}
//               <div className="absolute -inset-0.5 bg-linear-to-r from-white/20 to-transparent rounded-xl blur-xs -z-10"></div>
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2 mb-2">
//                 <h2 className="text-sm font-semibold text-gray-900 truncate">
//                   {field.meta.label}
//                 </h2>
//                 <span
//                   className={`text-[10px] font-medium px-2 py-1 rounded-full bg-linear-to-r ${getFieldCategoryColor()} border-none`}
//                 >
//                   {field.meta.category}
//                 </span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-1.5">
//                   <Key className="w-3.5 h-3.5 text-gray-400" />
//                   <code className="text-xs font-mono text-gray-600 bg-gray-100/80 px-2 py-1 rounded-md truncate max-w-[140px]">
//                     {field.meta.key}
//                   </code>
//                 </div>
//                 <div className="h-4 w-px bg-gray-200"></div>
//                 <div className="flex items-center gap-1.5">
//                   <Globe className="w-3.5 h-3.5 text-gray-400" />
//                   <span className="text-xs text-gray-500">{fieldType}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tab Navigation - Positioned under header */}
//         <div className="px-5 pb-0">
//           <div className="relative">
//             {/* Tab Wrapper with subtle gradient background */}
//             <div className="relative bg-linear-to-r from-gray-50/50 to-gray-100/30 rounded-t-lg p-1 ">
//               <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
//                 {tabs.map((tab) => {
//                   const Icon = tab.icon;
//                   const isActive = activeTab === tab.id;
//                   return (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveTab(tab.id)}
//                       className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-200 relative shrink-0 ${
//                         isActive
//                           ? "bg-white text-gray-900 shadow-sm border border-gray-200"
//                           : "text-gray-600 hover:text-gray-900 hover:bg-white/80"
//                       }`}
//                     >
//                       <Icon
//                         className={`w-3.5 h-3.5 ${isActive ? tab.color : "text-gray-500"}`}
//                       />
//                       {tab.label}
//                       {isActive && (
//                         <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full"></div>
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* Active tab indicator line */}
//               <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div className="flex-1 overflow-y-auto p-5 bg-linear-to-b from-white to-gray-50/30">
//         <div className="space-y-6">
//           {activeTab === "meta" && <MetaTab field={field} />}
//           {activeTab === "data" && <DataTab field={field} />}
//           {activeTab === "ui" && <UITab field={field} />}
//           {activeTab === "validation" && <ValidationTab field={field} />}
//           {activeTab === "visibility" && (
//             <VisibilityTab target="FIELD" fieldKey={field.meta.key} />
//           )}
//           {activeTab === "calculation" && <CalculationTab field={field} />}
//           {activeTab === "permission" && <PermissionTab field={field} />}
//         </div>
//       </div>

//       {/* Delete Section */}
//       <div className="p-5 border-t border-gray-200 bg-linear-to-b from-gray-50 to-gray-100/30">
//         <div className="space-y-4">
//           {showDeleteConfirm ? (
//             <div className="bg-linear-to-br from-red-50 to-red-100/50 border border-red-200 rounded-xl p-4 shadow-sm">
//               <div className="flex items-start gap-3 mb-4">
//                 <div className="w-10 h-10 bg-white border border-red-200 rounded-lg flex items-center justify-center shrink-0">
//                   <AlertTriangle className="w-5 h-5 text-red-600" />
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-semibold text-red-900 mb-1.5">
//                     {store.published ? "Remove Field" : "Delete Field"}
//                   </h4>
//                   <p className="text-xs text-red-700 leading-relaxed">
//                     {store.published
//                       ? "This field will be removed from the form layout. Existing submitted data will be preserved."
//                       : "This field and all its configuration will be permanently deleted. This action cannot be undone."}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowDeleteConfirm(false)}
//                   className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-600 to-red-700 text-white rounded-lg text-sm font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                   {store.published ? "Remove" : "Delete"}
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <button
//               onClick={() => setShowDeleteConfirm(true)}
//               className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-b from-white to-gray-50 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:border-gray-400 hover:shadow-sm transition-all duration-200 group"
//             >
//               <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-600 transition-colors" />
//               {store.published ? "Remove Field from Layout" : "Delete Field"}
//             </button>
//           )}
//           <p className="text-[10px] text-gray-500 text-center tracking-wide">
//             {store.published
//               ? "Removing preserves existing submitted data"
//               : "Permanent deletion • Cannot be undone"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ======================================================
//    SECTION SETTINGS
// ====================================================== */

// function SectionSettings({ sectionId }: { sectionId: string }) {
//   const section = useFormBuilderStore((s) =>
//     s.schema.layout.sections.find((sec) => sec.id === sectionId),
//   );

//   const updateSection = useFormBuilderStore((s) => s.updateSection);
//   const removeSection = useFormBuilderStore((s) => s.removeSection);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   if (!section) {
//     return (
//       <div className="h-full flex flex-col items-center justify-center p-6 bg-linear-to-b from-white to-gray-50/50">
//         <div className="relative mb-4">
//           <div className="w-12 h-12 bg-linear-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center">
//             <AlertCircle className="w-5 h-5 text-red-400" />
//           </div>
//           <div className="absolute -inset-1 bg-linear-to-r from-red-100/30 to-transparent rounded-xl blur-sm -z-10"></div>
//         </div>
//         <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
//           Section Not Found
//         </h3>
//         <p className="text-xs text-gray-500 max-w-40 text-center">
//           Selected section could not be located
//         </p>
//       </div>
//     );
//   }

//   const handleDelete = () => {
//     if (
//       window.confirm(
//         "⚠️ Delete Section\n\nThis will remove the section and all its contents.\n\nContinue?",
//       )
//     ) {
//       removeSection(section.id);
//     }
//   };

//   const fieldCount = section.nodes.filter((n) => n.kind === "FIELD").length;
//   const layoutCount = section.nodes.filter((n) => n.kind === "LAYOUT").length;

//   return (
//     <div className="h-full flex flex-col bg-white">
//       {/* Header */}
//       <div className="p-5 border-b border-gray-200 bg-linear-to-b from-white to-gray-50/50">
//         <div className="flex items-start gap-4">
//           <div className="relative w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm">
//             <Layout className="w-5 h-5 text-blue-600" />
//             <div className="absolute -inset-0.5 bg-linear-to-r from-white/20 to-transparent rounded-xl blur-xs -z-10"></div>
//           </div>
//           <div className="flex-1">
//             <h2 className="text-sm font-semibold text-gray-900 mb-1.5">
//               Section Configuration
//             </h2>
//             <p className="text-xs text-gray-500">
//               Configure section properties and content layout
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex-1 overflow-y-auto p-5 bg-linear-to-b from-white to-gray-50/30">
//         <div className="space-y-5">
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <label className="text-xs font-medium text-gray-900">
//                 Section Title
//               </label>
//               <span className="text-[10px] text-gray-500 font-medium tracking-wide">
//                 DISPLAY NAME
//               </span>
//             </div>
//             <input
//               value={section.title}
//               onChange={(e) =>
//                 updateSection(section.id, {
//                   title: e.target.value,
//                 })
//               }
//               className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400 shadow-sm"
//               placeholder="Enter section title"
//             />
//           </div>

//           {/* <div>
//             <div className="flex items-center justify-between mb-2">
//               <label className="text-xs font-medium text-gray-900">
//                 Description
//               </label>
//               <span className="text-[10px] text-gray-500 font-medium tracking-wide">
//                 OPTIONAL
//               </span>
//             </div>
//             <textarea
//               value={section.description || ""}
//               onChange={(e) =>
//                 updateSection(section.id, {
//                   description: e.target.value,
//                 })
//               }
//               className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400 shadow-sm min-h-[90px] resize-none"
//               placeholder="Enter section description (optional)"
//               rows={2}
//             />
//           </div> */}

//           <div className="blinear-to-br from-gray-50 to-gray-100/30 border border-gray-200 rounded-xl p-4 shadow-sm">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-2">
//                 <Layers className="w-4 h-4 text-gray-500" />
//                 <h4 className="text-xs font-semibold text-gray-900">
//                   Section Analytics
//                 </h4>
//               </div>
//               <span className="text-[10px] font-medium px-2 py-1 bg-white border border-gray-300 text-gray-600 rounded-full">
//                 READ-ONLY
//               </span>
//             </div>
//             <div className="grid grid-cols-3 gap-3">
//               <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
//                 <div className="text-lg font-bold text-gray-900 mb-1">
//                   {section.nodes.length}
//                 </div>
//                 <div className="text-[10px] text-gray-500 font-medium tracking-wide">
//                   TOTAL ELEMENTS
//                 </div>
//               </div>
//               <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
//                 <div className="text-lg font-bold text-gray-900 mb-1">
//                   {fieldCount}
//                 </div>
//                 <div className="text-[10px] text-gray-500 font-medium tracking-wide">
//                   FIELD COUNT
//                 </div>
//               </div>
//               <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
//                 <div className="text-lg font-bold text-gray-900 mb-1">
//                   {layoutCount}
//                 </div>
//                 <div className="text-[10px] text-gray-500 font-medium tracking-wide">
//                   LAYOUT COUNT
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Delete Section */}
//       <div className="p-5 border-t border-gray-200 bg-linear-to-b from-gray-50 to-gray-100/30">
//         <div className="space-y-4">
//           {showDeleteConfirm ? (
//             <div className="bg-linear-to-br from-red-50 to-red-100/50 border border-red-200 rounded-xl p-4 shadow-sm">
//               <div className="flex items-start gap-3 mb-4">
//                 <div className="w-10 h-10 bg-white border border-red-200 rounded-lg flex items-center justify-center shrink-0">
//                   <AlertTriangle className="w-5 h-5 text-red-600" />
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-semibold text-red-900 mb-1.5">
//                     Delete Section
//                   </h4>
//                   <p className="text-xs text-red-700 leading-relaxed">
//                     This will permanently delete the section and all its
//                     contents including fields and layouts. This action cannot be
//                     undone.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowDeleteConfirm(false)}
//                   className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-600 to-red-700 text-white rounded-lg text-sm font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                   Delete Section
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <button
//               onClick={() => setShowDeleteConfirm(true)}
//               className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-b from-white to-gray-50 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:border-gray-400 hover:shadow-sm transition-all duration-200 group"
//             >
//               <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-600 transition-colors" />
//               Delete This Section
//             </button>
//           )}
//           <p className="text-[10px] text-gray-500 text-center tracking-wide">
//             Deletes all contained fields and layouts permanently • Cannot be
//             undone
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
