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

// /* ======================================================
//    HELPERS
// ====================================================== */

// function findNodeById(nodes: Node[], nodeId: string): Node | undefined {
//   for (const node of nodes) {
//     if (node.id === nodeId) return node;

//     if (node.kind === "LAYOUT") {
//       // ✅ Repeater has children
//       if (node.type === "repeater") {
//         const found = findNodeById(node.children, nodeId);
//         if (found) return found;
//       }

//       // ✅ Generic layouts have slots
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
//       return <div className="p-4 text-red-500">Selected element not found</div>;
//     }

//     // 🔹 PRESENTATION ELEMENTS
//     if (
//       node.kind === "LAYOUT" &&
//       (node.type === "heading" ||
//         node.type === "divider" ||
//         node.type === "spacer")
//     ) {
//       return <PresentationSettingsPanel nodePath={selectedNodePath} />;
//     }

//     // 🔹 STRUCTURAL LAYOUTS
//     if (node.kind === "LAYOUT") {
//       return <LayoutSettingsPanel nodePath={selectedNodePath} />;
//     }
//   }

//   /* ---------- EMPTY ---------- */
//   return (
//     <div className="p-4 text-sm text-gray-500">
//       Select a field, section, or layout element
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

//   // ✅ DO NOT RETURN EARLY
//   if (!field) {
//     return (
//       <div className="p-4 text-sm text-gray-500">
//         Field not found or removed
//       </div>
//     );
//   }

//   const fieldKeySafe = field.meta.key;

// function handleDelete() {
//   const refs = store.fieldConfigs
//     .filter((f) => f.meta.key !== fieldKeySafe)
//     .filter((f) => JSON.stringify(f).includes(`"${fieldKeySafe}"`))
//     .map((f) => f.meta.key);

//   if (refs.length) {
//     const confirmed = window.confirm(
//       `This field is used by:\n\n${refs.join(
//         ", ",
//       )}\n\nDeleting it will break those fields.\n\nContinue anyway?`,
//     );

//     if (!confirmed) return;
//   }

//   const confirmed = window.confirm(
//     store.published
//       ? "This field will be removed from the form layout.\nExisting data remains.\n\nContinue?"
//       : "This field will be permanently deleted.\n\nContinue?",
//   );

//   if (!confirmed) return;

//   store.removeField(fieldKeySafe);
//   store.selectField(undefined);
// }

//   return (
//     <div className="space-y-6 p-4">
//       <MetaTab field={field} />
//       <DataTab field={field} />
//       <UITab field={field} />
//       <ValidationTab field={field} />
//       <VisibilityTab target="FIELD" fieldKey={field.meta.key} />
//       <CalculationTab field={field} />
//       <PermissionTab field={field} />

//       <div className="pt-6 border-t">
//         <button
//           onClick={handleDelete}
//           className="text-red-600 text-sm hover:underline"
//         >
//           {store.published ? "Remove field" : "Delete field"}
//         </button>
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

//   if (!section) {
//     return <div className="p-4 text-red-500">Section not found</div>;
//   }

//   return (
//     <div className="p-4 space-y-4">
//       <h3 className="font-semibold text-sm">Section Settings</h3>

//       <div>
//         <label className="text-xs text-gray-500">Section Title</label>
//         <input
//           className="border p-2 w-full"
//           value={section.title}
//           onChange={(e) =>
//             updateSection(section.id, {
//               title: e.target.value,
//             })
//           }
//         />
//       </div>

//       <div className="pt-4 border-t">
//         <button
//           onClick={() => {
//             if (
//               confirm("Delete this section and all its fields and layouts?")
//             ) {
//               removeSection(section.id);
//             }
//           }}
//           className="text-red-600 text-sm hover:underline"
//         >
//           Delete Section
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
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
import { CalculationTab } from "./tabs/CalculationTab";

/* ======================================================
   HELPERS
====================================================== */

function findNodeById(nodes: Node[], nodeId: string): Node | undefined {
  for (const node of nodes) {
    if (node.id === nodeId) return node;

    if (node.kind === "LAYOUT") {
      if (node.type === "repeater") {
        const found = findNodeById(node.children, nodeId);
        if (found) return found;
      }

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
   ACCORDION COMPONENT
====================================================== */

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
  icon,
}: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
            {title}
          </span>
        </div>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          } text-gray-500`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 bg-gray-50/50 dark:bg-gray-800/50">
          {children}
        </div>
      )}
    </div>
  );
}

/* ======================================================
   TAB NAVIGATION
====================================================== */

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      }`}
    >
      {children}
    </button>
  );
}

/* ======================================================
   ROOT CONFIG PANEL
====================================================== */

export function FieldConfigPanel() {
  const { selectedFieldKey, selectedSectionId, selectedNodePath, schema } =
    useFormBuilderStore();

  if (selectedFieldKey) {
    return <FieldSettings fieldKey={selectedFieldKey} />;
  }

  if (selectedSectionId) {
    return <SectionSettings sectionId={selectedSectionId} />;
  }

  if (selectedNodePath) {
    const section = schema.layout.sections.find(
      (s) => s.id === selectedNodePath.sectionId,
    );

    const node = section
      ? findNodeById(section.nodes, selectedNodePath.nodeId)
      : undefined;

    if (!node) {
      return (
        <div className="p-4 text-sm text-red-500 dark:text-red-400">
          Selected element not found
        </div>
      );
    }

    if (
      node.kind === "LAYOUT" &&
      (node.type === "heading" ||
        node.type === "divider" ||
        node.type === "spacer")
    ) {
      return <PresentationSettingsPanel nodePath={selectedNodePath} />;
    }

    if (node.kind === "LAYOUT") {
      return <LayoutSettingsPanel nodePath={selectedNodePath} />;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Select a field, section, or layout element to configure
      </p>
    </div>
  );
}

/* ======================================================
   FIELD SETTINGS
====================================================== */

// function FieldSettings({ fieldKey }: { fieldKey: string }) {
//   const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic");
//   const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>(
//     {
//       meta: true,
//       data: true,
//       ui: false,
//       validation: false,
//       visibility: false,
//       calculation: false,
//       permission: false,
//     },
//   );

//   const store = useFormBuilderStore((s) => ({
//     fieldConfigs: s.fieldConfigs,
//     removeField: s.removeField,
//     selectField: s.selectField,
//     published: s.published,
//   }));

//   const field = store.fieldConfigs.find((f) => f.meta.key === fieldKey);

//   if (!field) {
//     return (
//       <div className="p-6 text-sm text-gray-500 dark:text-gray-400">
//         <div className="flex items-center gap-2 mb-2">
//           <svg
//             className="w-5 h-5 text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.282 16.5c-.77.833.192 2.5 1.732 2.5z"
//             />
//           </svg>
//           <span>Field not found or removed</span>
//         </div>
//       </div>
//     );
//   }

//   const fieldKeySafe = field.meta.key;

//   const handleDelete = () => {
//     const refs = store.fieldConfigs
//       .filter((f) => f.meta.key !== fieldKeySafe)
//       .filter((f) => JSON.stringify(f).includes(`"${fieldKeySafe}"`))
//       .map((f) => f.meta.key);

//     if (refs.length) {
//       const confirmed = window.confirm(
//         `This field is used by:\n\n${refs.join(
//           ", ",
//         )}\n\nDeleting it will break those fields.\n\nContinue anyway?`,
//       );

//       if (!confirmed) return;
//     }

//     const confirmed = window.confirm(
//       store.published
//         ? "This field will be removed from the form layout.\nExisting data remains.\n\nContinue?"
//         : "This field will be permanently deleted.\n\nContinue?",
//     );

//     if (!confirmed) return;

//     store.removeField(fieldKeySafe);
//     store.selectField(undefined);
//   };

//   const toggleAccordion = (key: string) => {
//     setOpenAccordions((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const renderAccordionIcon = (name: string) => {
//     const icons: Record<string, React.ReactNode> = {
//       meta: (
//         <svg
//           className="w-4 h-4 text-gray-500"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//           />
//         </svg>
//       ),
//       data: (
//         <svg
//           className="w-4 h-4 text-gray-500"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
//           />
//         </svg>
//       ),
//       ui: (
//         <svg
//           className="w-4 h-4 text-gray-500"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
//           />
//         </svg>
//       ),
//       validation: (
//         <svg
//           className="w-4 h-4 text-gray-500"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//           />
//         </svg>
//       ),
//       visibility: (
//         <svg
//           className="w-4 h-4 text-gray-500"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//           />
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//           />
//         </svg>
//       ),
//       calculation: (
//         <svg
//           className="w-4 h-4 text-gray-500"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
//           />
//         </svg>
//       ),
//       permission: (
//         <svg
//           className="w-4 h-4 text-gray-500"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//           />
//         </svg>
//       ),
//     };
//     return icons[name];
//   };

//   const renderBasicTab = () => (
//     <div className="space-y-1">
//       <AccordionItem
//         title="Field Information"
//         isOpen={openAccordions.meta}
//         onToggle={() => toggleAccordion("meta")}
//         icon={renderAccordionIcon("meta")}
//       >
//         <MetaTab field={field} />
//       </AccordionItem>

//       <AccordionItem
//         title="Data Configuration"
//         isOpen={openAccordions.data}
//         onToggle={() => toggleAccordion("data")}
//         icon={renderAccordionIcon("data")}
//       >
//         <DataTab field={field} />
//       </AccordionItem>

//       <AccordionItem
//         title="UI Settings"
//         isOpen={openAccordions.ui}
//         onToggle={() => toggleAccordion("ui")}
//         icon={renderAccordionIcon("ui")}
//       >
//         <UITab field={field} />
//       </AccordionItem>
//     </div>
//   );

//   const renderAdvancedTab = () => (
//     <div className="space-y-1">
//       <AccordionItem
//         title="Validation Rules"
//         isOpen={openAccordions.validation}
//         onToggle={() => toggleAccordion("validation")}
//         icon={renderAccordionIcon("validation")}
//       >
//         <ValidationTab field={field} />
//       </AccordionItem>

//       <AccordionItem
//         title="Visibility Conditions"
//         isOpen={openAccordions.visibility}
//         onToggle={() => toggleAccordion("visibility")}
//         icon={renderAccordionIcon("visibility")}
//       >
//         <VisibilityTab target="FIELD" fieldKey={field.meta.key} />
//       </AccordionItem>

//       {field.meta.category === "CALCULATED" && (
//         <AccordionItem
//           title="Calculations"
//           isOpen={openAccordions.calculation}
//           onToggle={() => toggleAccordion("calculation")}
//           icon={renderAccordionIcon("calculation")}
//         >
//           <CalculationTab field={field} />
//         </AccordionItem>
//       )}

//       <AccordionItem
//         title="Permissions"
//         isOpen={openAccordions.permission}
//         onToggle={() => toggleAccordion("permission")}
//         icon={renderAccordionIcon("permission")}
//       >
//         <PermissionTab field={field} />
//       </AccordionItem>
//     </div>
//   );

//   return (
//     <div className="h-full flex flex-col bg-white dark:bg-gray-900">

//       {/* Tab Navigation */}
//       <div className="flex border-b border-gray-200 dark:border-gray-700">
//         <TabButton
//           active={activeTab === "basic"}
//           onClick={() => setActiveTab("basic")}
//         >
//           Basic
//         </TabButton>
//         <TabButton
//           active={activeTab === "advanced"}
//           onClick={() => setActiveTab("advanced")}
//         >
//           Advanced
//         </TabButton>
//       </div>

//       {/* Tab Content */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="py-2">
//           {activeTab === "basic" ? renderBasicTab() : renderAdvancedTab()}
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
//         <button
//           onClick={handleDelete}
//           className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
//         >
//           <svg
//             className="w-4 h-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//             />
//           </svg>
//           {store.published ? "Remove Field" : "Delete Field"}
//         </button>
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

//   if (!section) {
//     return (
//       <div className="p-6 text-sm text-red-500 dark:text-red-400">
//         <div className="flex items-center gap-2">
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.282 16.5c-.77.833.192 2.5 1.732 2.5z"
//             />
//           </svg>
//           <span>Section not found</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full flex flex-col bg-white dark:bg-gray-900">
//       {/* Header */}
//       <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
//         <div className="flex items-center justify-between">
//           <h3 className="font-medium text-gray-800 dark:text-gray-200">
//             Section Settings
//           </h3>
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//             <span className="text-xs text-gray-500 dark:text-gray-400">
//               Section
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-6">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//             Section Title
//           </label>
//           <input
//             className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
//             value={section.title}
//             onChange={(e) =>
//               updateSection(section.id, {
//                 title: e.target.value,
//               })
//             }
//             placeholder="Enter section title"
//           />
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             Display name for this section in the form
//           </p>
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//             Section ID
//           </label>
//           <div className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-400 font-mono">
//             {section.id}
//           </div>
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             Unique identifier for this section
//           </p>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
//         <button
//           onClick={() => {
//             if (
//               confirm("Delete this section and all its fields and layouts?")
//             ) {
//               removeSection(section.id);
//             }
//           }}
//           className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
//         >
//           <svg
//             className="w-4 h-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//             />
//           </svg>
//           Delete Section
//         </button>
//       </div>
//     </div>
//   );
// }

/* ======================================================
   FIELD SETTINGS
====================================================== */

function FieldSettings({ fieldKey }: { fieldKey: string }) {
  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic");
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>(
    {
      meta: true,
      data: true,
      ui: false,
      validation: false,
      visibility: false,
      calculation: false,
      permission: false,
    },
  );

  const store = useFormBuilderStore((s) => ({
    fieldConfigs: s.fieldConfigs,
    removeField: s.removeField,
    selectField: s.selectField,
    published: s.published,
  }));

  const field = store.fieldConfigs.find((f) => f.meta.key === fieldKey);

  if (!field) {
    return (
      <div className="p-6 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2 mb-2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.282 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <span>Field not found or removed</span>
        </div>
      </div>
    );
  }

  const fieldKeySafe = field.meta.key;

  const handleDelete = () => {
    const refs = store.fieldConfigs
      .filter((f) => f.meta.key !== fieldKeySafe)
      .filter((f) => JSON.stringify(f).includes(`"${fieldKeySafe}"`))
      .map((f) => f.meta.key);

    if (refs.length) {
      const confirmed = window.confirm(
        `This field is used by:\n\n${refs.join(
          ", ",
        )}\n\nDeleting it will break those fields.\n\nContinue anyway?`,
      );

      if (!confirmed) return;
    }

    const confirmed = window.confirm(
      store.published
        ? "This field will be removed from the form layout.\nExisting data remains.\n\nContinue?"
        : "This field will be permanently deleted.\n\nContinue?",
    );

    if (!confirmed) return;

    store.removeField(fieldKeySafe);
    store.selectField(undefined);
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderAccordionIcon = (name: string) => {
    const icons: Record<string, React.ReactNode> = {
      meta: (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      data: (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
          />
        </svg>
      ),
      ui: (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
      validation: (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      visibility: (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      calculation: (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      permission: (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    };
    return icons[name];
  };

  const renderBasicTab = () => (
    <div className="space-y-1">
      <AccordionItem
        title="Field Information"
        isOpen={openAccordions.meta}
        onToggle={() => toggleAccordion("meta")}
        icon={renderAccordionIcon("meta")}
      >
        <MetaTab field={field} />
      </AccordionItem>

      <AccordionItem
        title="Data Configuration"
        isOpen={openAccordions.data}
        onToggle={() => toggleAccordion("data")}
        icon={renderAccordionIcon("data")}
      >
        <DataTab field={field} />
      </AccordionItem>

      <AccordionItem
        title="UI Settings"
        isOpen={openAccordions.ui}
        onToggle={() => toggleAccordion("ui")}
        icon={renderAccordionIcon("ui")}
      >
        <UITab field={field} />
      </AccordionItem>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-1">
      <AccordionItem
        title="Validation Rules"
        isOpen={openAccordions.validation}
        onToggle={() => toggleAccordion("validation")}
        icon={renderAccordionIcon("validation")}
      >
        <ValidationTab field={field} />
      </AccordionItem>

      <AccordionItem
        title="Visibility Conditions"
        isOpen={openAccordions.visibility}
        onToggle={() => toggleAccordion("visibility")}
        icon={renderAccordionIcon("visibility")}
      >
        <VisibilityTab target="FIELD" fieldKey={field.meta.key} />
      </AccordionItem>

      {field.meta.category === "CALCULATED" && (
        <AccordionItem
          title="Calculations"
          isOpen={openAccordions.calculation}
          onToggle={() => toggleAccordion("calculation")}
          icon={renderAccordionIcon("calculation")}
        >
          <CalculationTab field={field} />
        </AccordionItem>
      )}

      <AccordionItem
        title="Permissions"
        isOpen={openAccordions.permission}
        onToggle={() => toggleAccordion("permission")}
        icon={renderAccordionIcon("permission")}
      >
        <PermissionTab field={field} />
      </AccordionItem>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">

      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-800 dark:text-gray-200">
            Field Settings
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Field
            </span>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 px-3 py-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
              title={store.published ? "Remove Field" : "Delete Field"}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <TabButton
          active={activeTab === "basic"}
          onClick={() => setActiveTab("basic")}
        >
          Basic
        </TabButton>
        <TabButton
          active={activeTab === "advanced"}
          onClick={() => setActiveTab("advanced")}
        >
          Advanced
        </TabButton>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          {activeTab === "basic" ? renderBasicTab() : renderAdvancedTab()}
        </div>
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
    return (
      <div className="p-6 text-sm text-red-500 dark:text-red-400">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.282 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <span>Section not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-800 dark:text-gray-200">
            Section Settings
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Section
            </span>
            <button
              onClick={() => {
                if (
                  confirm("Delete this section and all its fields and layouts?")
                ) {
                  removeSection(section.id);
                }
              }}
              className="flex items-center gap-1 px-3 py-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
              title="Delete Section"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Section Title
          </label>
          <input
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            value={section.title}
            onChange={(e) =>
              updateSection(section.id, {
                title: e.target.value,
              })
            }
            placeholder="Enter section title"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Display name for this section in the form
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Section ID
          </label>
          <div className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-400 font-mono">
            {section.id}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Unique identifier for this section
          </p>
        </div>
      </div>
    </div>
  );
}