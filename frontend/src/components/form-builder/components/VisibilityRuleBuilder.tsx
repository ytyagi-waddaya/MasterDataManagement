// import {
//   VisibilityRule,
//   VisibilityGroup,
//   VisibilityNode,
// } from "../node.types";
// import { useActiveFields, useFormBuilderStore } from "../state/useFormBuilderStore";

// /* ======================================================
//    TYPES
// ====================================================== */

// type Props = {
//   value?: VisibilityRule;
//   onChange: (rule?: VisibilityRule) => void;
// };

// const OP_LABEL: Record<string, string> = {
//   EQUALS: "=",
//   NOT_EQUALS: "≠",
//   GREATER_THAN: ">",
//   LESS_THAN: "<",
//   IN: "IN",
//   NOT_IN: "NOT IN",
// };

// /* ======================================================
//    HELPERS
// ====================================================== */

// function normalize(node?: VisibilityNode): VisibilityNode | undefined {
//   if (!node) return undefined;

//   if (node.type === "condition") return node;

//   const cleaned = node.conditions
//     .map(normalize)
//     .filter(Boolean) as VisibilityNode[];

//   if (!cleaned.length) return undefined;

//   return {
//     ...node,
//     conditions: cleaned,
//   };
// }

// /* ======================================================
//    CONDITION NODE (RECURSIVE)
// ====================================================== */

// function ConditionNode({
//   node,
//   onUpdate,
//   onRemove,
// }: {
//   node: VisibilityNode;
//   onUpdate: (next?: VisibilityNode) => void;
//   onRemove: () => void;
// }) {
//   const fields = useActiveFields()

//   /* ---------- GROUP ---------- */
//   if (node.type === "group") {
//     return (
//       <div className="border rounded p-3 space-y-3 bg-gray-50">
//         {/* LOGIC + REMOVE */}
//         <div className="flex items-center gap-2">
//           <select
//             className="border p-1 text-sm"
//             value={node.logic}
//             onChange={(e) =>
//               onUpdate({
//                 ...node,
//                 logic: e.target.value as "AND" | "OR",
//               })
//             }
//           >
//             <option value="AND">AND</option>
//             <option value="OR">OR</option>
//           </select>

//           <button
//             type="button"
//             className="text-red-500 text-xs"
//             onClick={onRemove}
//           >
//             ✕ Remove group
//           </button>
//         </div>

//         {/* EMPTY STATE */}
//         {node.conditions.length === 0 && (
//           <div className="text-xs text-gray-400 italic">No conditions yet</div>
//         )}

//         {/* CHILD CONDITIONS */}
//         {node.conditions.map((child, i) => (
//           <ConditionNode
//             key={i}
//             node={child}
//             onUpdate={(next) => {
//               const copy = [...node.conditions];
//               if (next) copy[i] = next;
//               else copy.splice(i, 1);

//               onUpdate(
//                 normalize({
//                   ...node,
//                   conditions: copy,
//                 }),
//               );
//             }}
//             onRemove={() => {
//               const copy = node.conditions.filter((_, idx) => idx !== i);
//               onUpdate(
//                 normalize({
//                   ...node,
//                   conditions: copy,
//                 }),
//               );
//             }}
//           />
//         ))}

//         {/* ACTION BUTTONS — ALWAYS VISIBLE */}
//         <div className="flex gap-2 pt-2">
//           <button
//             type="button"
//             className="text-xs border px-2 py-1"
//             onClick={() =>
//               onUpdate({
//                 ...node,
//                 conditions: [
//                   ...node.conditions,
//                   {
//                     type: "condition",
//                     fieldKey: fields[0]?.meta.key ?? "",
//                     operator: "EQUALS",
//                     value: "",
//                   },
//                 ],
//               })
//             }
//           >
//             ➕ Condition
//           </button>

//           <button
//             type="button"
//             className="text-xs border px-2 py-1"
//             onClick={() =>
//               onUpdate({
//                 ...node,
//                 conditions: [
//                   ...node.conditions,
//                   {
//                     type: "group",
//                     logic: "AND",
//                     conditions: [],
//                   },
//                 ],
//               })
//             }
//           >
//             ➕ Group
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ---------- CONDITION ---------- */
//   return (
//     <div className="flex gap-2 items-center">
//       <select
//         className="border p-2 text-sm"
//         value={node.fieldKey}
//         onChange={(e) =>
//           onUpdate({ ...node, fieldKey: e.target.value, value: "" })
//         }
//       >
//         {fields.map((f) => (
//           <option key={f.meta.key} value={f.meta.key}>
//             {f.meta.label}
//           </option>
//         ))}
//       </select>

//       <select
//         className="border p-2 text-sm"
//         value={node.operator}
//         onChange={(e) =>
//           onUpdate({
//             ...node,
//             operator: e.target.value as any,
//           })
//         }
//       >
//         {Object.entries(OP_LABEL).map(([op, label]) => (
//           <option key={op} value={op}>
//             {label}
//           </option>
//         ))}
//       </select>

//       <input
//         className="border p-2 text-sm"
//         value={node.value ?? ""}
//         onChange={(e) =>
//           onUpdate({
//             ...node,
//             value: e.target.value,
//           })
//         }
//       />

//       <button type="button" className="text-red-500 text-xs" onClick={onRemove}>
//         ✕
//       </button>
//     </div>
//   );
// }

// /* ======================================================
//    ROOT BUILDER
// ====================================================== */

// export function VisibilityRuleBuilder({ value, onChange }: Props) {
//   const root: VisibilityGroup = value ?? {
//     type: "group",
//     logic: "AND",
//     conditions: [],
//   };

//   return (
//     <div className="space-y-4">
//       <h4 className="font-semibold">Visibility</h4>

//       <ConditionNode
//         node={root}
//         onUpdate={(next) =>
//           onChange(next ? (next as VisibilityRule) : undefined)
//         }
//         onRemove={() => onChange(undefined)}
//       />
//     </div>
//   );
// }


// import {
//   VisibilityRule,
//   VisibilityCondition,
//   VisibilityGroup,
//   VisibilityNode,
// } from "../node.types";
// import { useActiveFields, useFormBuilderStore } from "../state/useFormBuilderStore";
// import { useState } from "react";

// /* ======================================================
//    TYPES
// ====================================================== */

// type Props = {
//   value?: VisibilityRule;
//   onChange: (rule?: VisibilityRule) => void;
// };

// const OP_LABEL: Record<string, string> = {
//   EQUALS: "Equals",
//   NOT_EQUALS: "Not equals",
//   GREATER_THAN: "Greater than",
//   LESS_THAN: "Less than",
//   IN: "In list",
//   NOT_IN: "Not in list",
// };

// /* ======================================================
//    HELPERS
// ====================================================== */

// function normalize(node?: VisibilityNode): VisibilityNode | undefined {
//   if (!node) return undefined;

//   if (node.type === "condition") return node;

//   const cleaned = node.conditions
//     .map(normalize)
//     .filter(Boolean) as VisibilityNode[];

//   if (!cleaned.length) return undefined;

//   return {
//     ...node,
//     conditions: cleaned,
//   };
// }

// /* ======================================================
//    CONDITION NODE (RECURSIVE)
// ====================================================== */

// function ConditionNode({
//   node,
//   onUpdate,
//   onRemove,
//   depth = 0,
// }: {
//   node: VisibilityNode;
//   onUpdate: (next?: VisibilityNode) => void;
//   onRemove: () => void;
//   depth?: number;
// }) {
//   const fields = useActiveFields();

//   /* ---------- GROUP ---------- */
//   if (node.type === "group") {
//     const hasChildren = node.conditions.length > 0;
    
//     return (
//       <div 
//         className={`relative rounded-lg p-4 space-y-4 ${
//           depth === 0 
//             ? 'border border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10' 
//             : 'border border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/30'
//         }`}
//         style={{ marginLeft: depth > 0 ? '1rem' : '0' }}
//       >
//         {/* GROUP HEADER */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className={`w-2 h-2 rounded-full ${
//               depth === 0 ? 'bg-blue-500' : 'bg-gray-500'
//             }`}></div>
//             <div className="relative z-10">
//               <select
//                 className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-md px-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent cursor-pointer min-w-[180px]"
//                 value={node.logic}
//                 onChange={(e) =>
//                   onUpdate({
//                     ...node,
//                     logic: e.target.value as "AND" | "OR",
//                   })
//                 }
//               >
//                 <option value="AND">All conditions must be true (AND)</option>
//                 <option value="OR">Any condition can be true (OR)</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <button
//             type="button"
//             className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-1 rounded transition-colors"
//             onClick={onRemove}
//           >
//             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//             Remove Group
//           </button>
//         </div>

//         {/* CHILD CONDITIONS */}
//         <div className={`space-y-3 ${hasChildren ? 'ml-4 pl-4 border-l border-gray-300 dark:border-gray-700' : ''}`}>
//           {/* EMPTY STATE */}
//           {!hasChildren && (
//             <div className="flex flex-col items-center justify-center py-4 px-6 text-center bg-white/50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
//               <svg className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No conditions yet</p>
//               <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Add conditions to define when this should be visible</p>
//             </div>
//           )}

//           {/* CONDITIONS */}
//           {node.conditions.map((child, i) => (
//             <ConditionNode
//               key={i}
//               node={child}
//               depth={depth + 1}
//               onUpdate={(next) => {
//                 const copy = [...node.conditions];
//                 if (next) copy[i] = next;
//                 else copy.splice(i, 1);

//                 onUpdate(
//                   normalize({
//                     ...node,
//                     conditions: copy,
//                   }),
//                 );
//               }}
//               onRemove={() => {
//                 const copy = node.conditions.filter((_, idx) => idx !== i);
//                 onUpdate(
//                   normalize({
//                     ...node,
//                     conditions: copy,
//                   }),
//                 );
//               }}
//             />
//           ))}
//         </div>

//         {/* ACTION BUTTONS - Always visible for better UX */}
//         <div className="flex gap-2 pt-2">
//           <button
//             type="button"
//             className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 hover:shadow-sm"
//             onClick={() =>
//               onUpdate({
//                 ...node,
//                 conditions: [
//                   ...node.conditions,
//                   {
//                     type: "condition",
//                     fieldKey: fields[0]?.meta.key ?? "",
//                     operator: "EQUALS",
//                     value: "",
//                   },
//                 ],
//               })
//             }
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//             Add Condition
//           </button>

//           <button
//             type="button"
//             className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-green-300 dark:hover:border-green-700 transition-all duration-200 hover:shadow-sm"
//             onClick={() =>
//               onUpdate({
//                 ...node,
//                 conditions: [
//                   ...node.conditions,
//                   {
//                     type: "group",
//                     logic: "AND",
//                     conditions: [],
//                   },
//                 ],
//               })
//             }
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//             </svg>
//             Add Nested Group
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ---------- CONDITION ---------- */
//   return (
//     <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:shadow transition-shadow duration-200">
//       {/* FIELD SELECTOR */}
//       <div className="flex-1 min-w-0">
//         <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//           Field
//         </label>
//         <div className="relative">
//           <select
//             className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent appearance-none cursor-pointer"
//             value={node.fieldKey}
//             onChange={(e) =>
//               onUpdate({ ...node, fieldKey: e.target.value, value: "" })
//             }
//           >
//             <option value="">Select field...</option>
//             {fields.map((f) => (
//               <option key={f.meta.key} value={f.meta.key}>
//                 {f.meta.label} ({f.meta.key})
//               </option>
//             ))}
//           </select>
//           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* OPERATOR SELECTOR */}
//       <div className="w-full sm:w-40">
//         <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//           Operator
//         </label>
//         <div className="relative">
//           <select
//             className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent appearance-none cursor-pointer"
//             value={node.operator}
//             onChange={(e) =>
//               onUpdate({
//                 ...node,
//                 operator: e.target.value as any,
//               })
//             }
//           >
//             {Object.entries(OP_LABEL).map(([op, label]) => (
//               <option key={op} value={op}>
//                 {label}
//               </option>
//             ))}
//           </select>
//           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* VALUE INPUT */}
//       <div className="flex-1 min-w-0">
//         <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//           Value
//         </label>
//         <input
//           className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
//           value={node.value ?? ""}
//           placeholder={node.operator.includes('IN') ? "value1, value2, value3" : "Enter value..."}
//           onChange={(e) =>
//             onUpdate({
//               ...node,
//               value: e.target.value,
//             })
//           }
//         />
//         {node.operator.includes('IN') && (
//           <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
//             Separate multiple values with commas
//           </p>
//         )}
//       </div>

//       {/* REMOVE BUTTON */}
//       <div className="flex items-end sm:items-center h-10 sm:h-auto">
//         <button
//           type="button"
//           className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
//           onClick={onRemove}
//           title="Remove condition"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ======================================================
//    ROOT BUILDER
// ====================================================== */

// export function VisibilityRuleBuilder({ value, onChange }: Props) {
//   const [showHelp, setShowHelp] = useState(false);
  
//   const root: VisibilityGroup = value ?? {
//     type: "group",
//     logic: "AND",
//     conditions: [],
//   };

//   return (
//     <div className="space-y-6">
//       {/* HELP SECTION */}
//       <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
//         <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowHelp(!showHelp)}>
//           <div className="flex items-center gap-2">
//             <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
//               How to create visibility rules
//             </span>
//           </div>
//           <svg className={`w-4 h-4 text-blue-600 dark:text-blue-400 transform transition-transform ${showHelp ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </div>
        
//         {showHelp && (
//           <div className="mt-3 space-y-2 text-sm text-blue-700 dark:text-blue-300">
//             <p><strong>AND:</strong> All conditions must be true for the element to be visible</p>
//             <p><strong>OR:</strong> Any condition being true makes the element visible</p>
//             <p><strong>Nested Groups:</strong> Create complex logic by combining AND/OR groups</p>
//             <p><strong>Examples:</strong> "Show when (Field A = 'Yes' AND Field B &gt; 10) OR Field C = 'Admin'"</p>
//           </div>
//         )}
//       </div>

//       {/* MAIN BUILDER */}
//       <div className="space-y-4">
//         <ConditionNode
//           node={root}
//           onUpdate={(next) =>
//             onChange(next ? (next as VisibilityRule) : undefined)
//           }
//           onRemove={() => onChange(undefined)}
//         />
//       </div>

//       {/* QUICK TIPS */}
//       <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
//         <div className="text-xs px-2.5 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md">
//           Tip: Use nested groups for complex logic
//         </div>
//         <div className="text-xs px-2.5 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md">
//           Tip: "IN" operator accepts comma-separated values
//         </div>
//         <div className="text-xs px-2.5 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md">
//           Tip: Empty rule = always visible
//         </div>
//       </div>
//     </div>
//   );
// }

import {
  VisibilityRule,
  VisibilityCondition,
  VisibilityGroup,
  VisibilityNode,
} from "../node.types";
import { useActiveFields, useFormBuilderStore } from "../state/useFormBuilderStore";
import { useState } from "react";

/* ======================================================
   TYPES
====================================================== */

type Props = {
  value?: VisibilityRule;
  onChange: (rule?: VisibilityRule) => void;
};

const OPERATOR_OPTIONS = [
  { ui: "EQUALS", value: "EQUAL", label: "=" },
  { ui: "NOT_EQUALS", value: "NOT_EQUAL", label: "≠" },
  { ui: "GREATER_THAN", value: "GREATER_THAN", label: ">" },
  { ui: "LESS_THAN", value: "LESS_THAN", label: "<" },
  { ui: "IN", value: "IN", label: "in" },
  { ui: "NOT_IN", value: "NOT_IN", label: "not in" },
] as const;


/* ======================================================
   HELPERS
====================================================== */

function normalize(node?: VisibilityNode): VisibilityNode | undefined {
  if (!node) return undefined;

  if (node.type === "condition") return node;

  const cleaned = node.conditions
    .map(normalize)
    .filter(Boolean) as VisibilityNode[];

  if (!cleaned.length) return undefined;

  return {
    ...node,
    conditions: cleaned,
  };
}

/* ======================================================
   CONDITION NODE (RECURSIVE)
====================================================== */

function ConditionNode({
  node,
  onUpdate,
  onRemove,
  depth = 0,
}: {
  node: VisibilityNode;
  onUpdate: (next?: VisibilityNode) => void;
  onRemove: () => void;
  depth?: number;
}) {
  const fields = useActiveFields();

  /* ---------- GROUP ---------- */
  if (node.type === "group") {
    const hasChildren = node.conditions.length > 0;
    const isRoot = depth === 0;
    return (
      <div 
        className={`relative rounded-lg p-3 space-y-3 ${
          isRoot 
            ? 'border border-blue-200 dark:border-blue-800 bg-blue-50/20 dark:bg-blue-900/10' 
            : 'border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20'
        }`}
        style={{ 
          marginLeft: depth > 0 ? '0.75rem' : '0',
        }}
      >
        {/* GROUP HEADER - COMPACT */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full flex items-center justify-center text-[10px] font-bold ${
              isRoot 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-500 text-white'
            }`}>
              {depth === 0 ? 'R' : depth}
            </div>
            <div className="relative">
              <select
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-xs rounded px-2 pr-6 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent cursor-pointer min-w-[140px]"
                value={node.logic}
                onChange={(e) =>
                  onUpdate({
                    ...node,
                    logic: e.target.value as "AND" | "OR",
                  })
                }
              >
                <option value="AND">All conditions (AND)</option>
                <option value="OR">Any condition (OR)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-500">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1 text-[10px] text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/10 px-1.5 py-0.5 rounded transition-colors"
            onClick={onRemove}
          >
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Remove
          </button>
        </div>

        {/* CHILD CONDITIONS */}
        <div className={`space-y-2 ${hasChildren ? 'ml-3 pl-3 border-l border-gray-300 dark:border-gray-700' : ''}`}>
          {/* EMPTY STATE - COMPACT */}
          {!hasChildren && (
            <div className="flex flex-col items-center justify-center py-2 px-3 text-center bg-white/50 dark:bg-gray-800/30 rounded border border-dashed border-gray-300 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">No conditions yet</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Add conditions below</p>
            </div>
          )}

          {/* CONDITIONS */}
          {node.conditions.map((child, i) => (
            <ConditionNode
              key={i}
              node={child}
              depth={depth + 1}
              onUpdate={(next) => {
                const copy = [...node.conditions];
                if (next) copy[i] = next;
                else copy.splice(i, 1);

                onUpdate(
                  normalize({
                    ...node,
                    conditions: copy,
                  }),
                );
              }}
              onRemove={() => {
                const copy = node.conditions.filter((_, idx) => idx !== i);
                onUpdate(
                  normalize({
                    ...node,
                    conditions: copy,
                  }),
                );
              }}
            />
          ))}
        </div>

        {/* ACTION BUTTONS - COMPACT */}
        <div className="flex gap-1.5 pt-1">
          
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-1 justify-center text-[10px]"
            onClick={() =>
              onUpdate({
                ...node,
                conditions: [
                  ...node.conditions,
                  {
                    type: "condition",
                    field: fields[0]?.meta.key ?? "",
                    operator: "EQUAL",
                    value: "",
                  },
                ],
              })
            }
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Condition
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-1 justify-center text-[10px]"
            onClick={() =>
              onUpdate({
                ...node,
                conditions: [
                  ...node.conditions,
                  {
                    type: "group",
                    logic: "AND",
                    conditions: [],
                  },
                ],
              })
            }
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Group
          </button>
        </div>
      </div>
    );
  }

  /* ---------- CONDITION ---------- COMPACT LAYOUT */
  return (
    <div className="grid grid-cols-12 gap-1.5 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
      {/* FIELD SELECTOR - 5 columns */}
      <div className="col-span-5">
        <div className="relative">
          <select
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-xs rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent appearance-none cursor-pointer truncate"
            value={node.fieldKey}
            onChange={(e) =>
              onUpdate({ ...node, field: e.target.value, value: "" })
            }
          >
            <option value="">Field...</option>
            {fields.map((f) => (
              <option key={f.meta.key} value={f.meta.key} title={f.meta.label}>
                {f.meta.label.length > 15 ? f.meta.label.substring(0, 15) + '...' : f.meta.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1 text-gray-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
      </div>

      {/* OPERATOR SELECTOR - 2 columns */}
      <div className="col-span-2">
        <div className="relative">
          <select
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-xs rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent appearance-none cursor-pointer"
            value={node.operator}
            onChange={(e) =>
              onUpdate({
                ...node,
                operator: e.target.value as any,
              })
            }
          >
            {OPERATOR_OPTIONS.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1 text-gray-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
      </div>

      {/* VALUE INPUT - 4 columns */}
      <div className="col-span-4">
        <input
          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-xs rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent truncate"
          value={node.value ?? ""}
          placeholder={node.operator.includes('IN') ? "val1, val2" : "Value"}
          onChange={(e) =>
            onUpdate({
              ...node,
              value: e.target.value,
            })
          }
          title={node.value}
        />
      </div>

      {/* REMOVE BUTTON - 1 column */}
      <div className="col-span-1 flex items-center justify-center">
        <button
          type="button"
          className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded transition-colors"
          onClick={onRemove}
          title="Remove"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ======================================================
   ROOT BUILDER - COMPACT
====================================================== */

export function VisibilityRuleBuilder({ value, onChange }: Props) {
  const [showHelp, setShowHelp] = useState(false);
  
  const root: VisibilityGroup = value ?? {
    type: "group",
    logic: "AND",
    conditions: [],
  };

  // Helper to count active rules
  const countRules = (node: VisibilityNode): number => {
    if (node.type === "condition") return 1;
    return node.conditions.reduce((sum, child) => sum + countRules(child), 0);
  };

  const totalRules = countRules(root);

  return (
    <div className="space-y-3">
      {/* COMPACT HEADER */}
      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Visibility Rules</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
            {totalRules} rule{totalRules !== 1 ? 's' : ''}
          </div>
          <button
            type="button"
            className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            onClick={() => onChange(undefined)}
          >
            Clear
          </button>
        </div>
      </div>

      {/* COLLAPSIBLE HELP */}
      <div className="bg-gray-50 dark:bg-gray-800/30 border border-gray-300 dark:border-gray-700 rounded p-2">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowHelp(!showHelp)}>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-gray-700 dark:text-gray-300">Quick tips</span>
          </div>
          <svg className={`w-3.5 h-3.5 text-gray-500 transform transition-transform ${showHelp ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {showHelp && (
          <div className="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-1">
              <span className="font-medium min-w-[35px]">AND:</span>
              <span>All conditions must be true</span>
            </div>
            <div className="flex items-start gap-1">
              <span className="font-medium min-w-[35px]">OR:</span>
              <span>Any condition can be true</span>
            </div>
            <div className="flex items-start gap-1">
              <span className="font-medium min-w-[35px]">IN:</span>
              <span>Use commas for multiple values</span>
            </div>
          </div>
        )}
      </div>

      {/* MAIN BUILDER */}
      <div className="space-y-2">
        <ConditionNode
          node={root}
          onUpdate={(next) =>
            onChange(next ? (next as VisibilityRule) : undefined)
          }
          onRemove={() => onChange(undefined)}
        />
      </div>

      {/* COMPACT FOOTER */}
      <div className="pt-2 border-t border-gray-300 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Rule status: <span className={`font-medium ${totalRules > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
            {totalRules > 0 ? 'Active' : 'No rules'}
          </span>
        </div>
      </div>
    </div>
  );
}