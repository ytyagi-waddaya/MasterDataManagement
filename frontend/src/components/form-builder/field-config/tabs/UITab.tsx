// import { useMemo, useState, useEffect } from "react";
// import { useFormBuilderStore } from "../../state/useFormBuilderStore";

// /* ======================================================
//    TYPES
// ====================================================== */

// type Option = {
//   label: string;
//   value: string;
// };

// /* ======================================================
//    COMPONENT
// ====================================================== */

// export function UITab({ field }: any) {
//   const updateField = useFormBuilderStore((s) => s.updateField);
//   const fieldConfigs = useFormBuilderStore((s) => s.fieldConfigs);

//   // ⚠️ SAFE UI DEFAULT (do NOT create partial objects)
//   const ui = field.ui ?? {};

//   /* ======================================================
//      UPDATE HELPERS
//   ====================================================== */

//   function updateUI(patch: any) {
//     updateField(field.meta.key, {
//       ui: {
//         ...ui,
//         ...patch,
//       },
//     });
//   }

//   function updateDataSource(patch: any) {
//     updateUI({
//       dataSource: {
//         ...ui.dataSource,
//         ...patch,
//       },
//     });
//   }

//   /* ======================================================
//      DEPENDS-ON OPTIONS (FORM FIELDS)
//   ====================================================== */

//   const dependencyCandidates = useMemo(() => {
//     return fieldConfigs
//       .filter((f: any) => {
//         if (f.meta.key === field.meta.key) return false;
//         if (f.meta.deprecated) return false;

//         const w = f.ui?.widget;
//         return w === "SELECT" || w === "RADIO";
//       })
//       .map((f: any) => ({
//         label: `${f.meta.label} (${f.meta.key})`,
//         value: f.meta.key,
//       }));
//   }, [fieldConfigs, field.meta.key]);

//   /* ======================================================
//      MAPPING TEXT (STABLE CONTROLLED STATE)
//   ====================================================== */

//   const [mappingText, setMappingText] = useState("");
// const isReference = field.meta.category === "REFERENCE";

//   // Sync mapping → textarea (ONLY when map actually changes)
//   useEffect(() => {
//     if (ui.dataSource?.type !== "DEPENDENT") return;

//     const map = ui.dataSource.map ?? {};
//     const text = Object.entries(map)
//       .map(
//         ([parent, options]: any) =>
//           `${parent}: ${options
//             .map((o: Option) => `${o.label}:${o.value}`)
//             .join(", ")}`,
//       )
//       .join("\n");

//     setMappingText(text);
//   }, [ui.dataSource?.type, ui.dataSource?.map]);

//   function saveMapping(text: string) {
//     const map: Record<string, Option[]> = {};

//     text.split("\n").forEach((line) => {
//       if (!line.trim()) return;

//       // ✅ split ONLY on first colon
//       const firstColonIndex = line.indexOf(":");
//       if (firstColonIndex === -1) return;

//       const parent = line.slice(0, firstColonIndex).trim();
//       const rest = line.slice(firstColonIndex + 1).trim();

//       if (!parent || !rest) return;

//       map[parent] = rest
//         .split(",")
//         .map((pair) => {
//           const pairColonIndex = pair.indexOf(":");
//           if (pairColonIndex === -1) return null;

//           return {
//             label: pair.slice(0, pairColonIndex).trim(),
//             value: pair.slice(pairColonIndex + 1).trim(),
//           };
//         })
//         .filter(Boolean) as Option[];
//     });

//     updateDataSource({ map });
//   }

//   /* ======================================================
//      RENDER
//   ====================================================== */

//   return (
//     <div className="space-y-4">
//       <h4 className="font-semibold">UI</h4>

//       {/* Widget info */}
//       <div className="text-sm">
//         Widget: <b>{ui.widget}</b>
//       </div>

//       {/* Placeholder */}
//       <input
//         className="border p-2 w-full"
//         placeholder="Placeholder"
//         value={ui.placeholder ?? ""}
//         onChange={(e) => updateUI({ placeholder: e.target.value })}
//       />

//       {/* Help text */}
//       <input
//         className="border p-2 w-full"
//         placeholder="Help text"
//         value={ui.helpText ?? ""}
//         onChange={(e) => updateUI({ helpText: e.target.value })}
//       />

//       {/* ======================================================
//          STATIC OPTIONS
//       ====================================================== */}

//       {(ui.widget === "SELECT" || ui.widget === "RADIO") &&
//         ui.dataSource?.type !== "DEPENDENT" && (
//           <textarea
//             className="border p-2 w-full"
//             placeholder="Options (label:value per line)"
//             value={(ui.options ?? [])
//               .map((o: Option) => `${o.label}:${o.value}`)
//               .join("\n")}
//             onChange={(e) =>
//               updateUI({
//                 options: e.target.value
//                   .split("\n")
//                   .filter(Boolean)
//                   .map((line) => {
//                     const [label, value] = line.split(":");
//                     return { label: label.trim(), value: value.trim() };
//                   }),
//               })
//             }
//           />
//         )}

//       {/* Multi-select */}
//       {ui.widget === "SELECT" && (
//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             checked={ui.multiple ?? false}
//             onChange={(e) => updateUI({ multiple: e.target.checked })}
//           />
//           Allow multiple selections
//         </label>
//       )}

//       {/* ======================================================
//          DATA SOURCE TYPE (SAFE SWITCH)
//       ====================================================== */}
// <div className="text-sm">
//   Widget: <b>{isReference ? "SELECT (Reference)" : ui.widget}</b>
// </div>

//       {(ui.widget === "SELECT" || ui.widget === "RADIO") &&
//         field.meta.category !== "REFERENCE" && (
//           <select
//             className="border p-2 w-full"
//             value={ui.dataSource?.type ?? "STATIC"}
//             onChange={(e) => {
//               const type = e.target.value as "STATIC" | "DEPENDENT";

//               updateUI({
//                 dataSource:
//                   type === "DEPENDENT"
//                     ? {
//                         type: "DEPENDENT",
//                         dependsOn: ui.dataSource?.dependsOn,
//                         map: ui.dataSource?.map ?? {},
//                         resetOnChange: ui.dataSource?.resetOnChange ?? true,
//                       }
//                     : undefined,
//               });
//             }}
//           >
//             <option value="STATIC">Static</option>
//             <option value="DEPENDENT">Dependent</option>
//           </select>
//         )}

//       {field.meta.category === "REFERENCE" && (
//         <div className="space-y-2">
//           <input
//             placeholder="Resource name"
//             value={field.reference?.resource ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   ...field.reference,
//                   resource: e.target.value,
//                 },
//               })
//             }
//           />

//           <input
//             placeholder="Label field"
//             value={field.reference?.labelField ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   ...field.reference,
//                   labelField: e.target.value,
//                 },
//               })
//             }
//           />

//           <input
//             placeholder="Value field"
//             value={field.reference?.valueField ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   ...field.reference,
//                   valueField: e.target.value,
//                 },
//               })
//             }
//           />
//         </div>
//       )}

//       {/* ======================================================
//          DEPENDENT CONFIG
//       ====================================================== */}

//       {ui.dataSource?.type === "DEPENDENT" && (
//         <div className="space-y-3 border p-3 rounded bg-gray-50">
//           {/* Depends on dropdown */}
//           <div>
//             <label className="text-xs text-gray-500">Depends on</label>
//             <select
//               className="border p-2 w-full"
//               value={ui.dataSource.dependsOn ?? ""}
//               onChange={(e) => updateDataSource({ dependsOn: e.target.value })}
//             >
//               <option value="">Select field</option>
//               {dependencyCandidates.map((f) => (
//                 <option key={f.value} value={f.value}>
//                   {f.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Reset toggle */}
//           <label className="flex items-center gap-2 text-sm">
//             <input
//               type="checkbox"
//               checked={ui.dataSource.resetOnChange ?? true}
//               onChange={(e) =>
//                 updateDataSource({ resetOnChange: e.target.checked })
//               }
//             />
//             Reset value when parent changes
//           </label>

//           {/* Mapping editor */}
//           <div>
//             <label className="text-xs text-gray-500">
//               Mapping (parentValue → options)
//             </label>
//             <textarea
//               className="border p-2 w-full text-xs font-mono"
//               placeholder={`IN: Karnataka:KA, Delhi:DL\nUS: California:CA, Texas:TX`}
//               value={mappingText}
//               onChange={(e) => setMappingText(e.target.value)}
//               onBlur={() => saveMapping(mappingText)}
//             />
//           </div>
//         </div>
//       )}

//       {/* Layout width */}
//       <select
//         className="border p-2 w-full"
//         value={ui.layout?.width ?? ""}
//         onChange={(e) =>
//           updateUI({
//             layout: {
//               ...ui.layout,
//               width: e.target.value || undefined,
//             },
//           })
//         }
//       >
//         <option value="">Default width</option>
//         <option value="full">Full</option>
//         <option value="half">Half</option>
//         <option value="third">Third</option>
//         <option value="quarter">Quarter</option>
//         <option value="two-third">Two Third</option>
//       </select>
//     </div>
//   );
// }

// import { useMemo, useState, useEffect } from "react";
// import { useFormBuilderStore } from "../../state/useFormBuilderStore";
// import { useResourceList } from "@/lib/resource/hook";
// import { useResourceSchema } from "@/lib/resource/hook/useResource";

// /* ======================================================
//    TYPES
// ====================================================== */

// type Option = {
//   label: string;
//   value: string;
// };

// /* ======================================================
//    COMPONENT
// ====================================================== */

// export function UITab({ field }: any) {
//   const updateField = useFormBuilderStore((s) => s.updateField);
//   const fieldConfigs = useFormBuilderStore((s) => s.fieldConfigs);

//   const ui = field.ui ?? {};
//   const isReference = field.meta.category === "REFERENCE";

//   /* ======================================================
//      UPDATE HELPERS
//   ====================================================== */

//   function updateUI(patch: any) {
//     updateField(field.meta.key, {
//       ui: {
//         ...ui,
//         ...patch,
//       },
//     });
//   }

//   function updateDataSource(patch: any) {
//     updateUI({
//       dataSource: {
//         ...ui.dataSource,
//         ...patch,
//       },
//     });
//   }

//   /* ======================================================
//      CLEAN UI WHEN FIELD BECOMES REFERENCE
//   ====================================================== */

//   useEffect(() => {
//     if (!isReference) return;

//     updateField(field.meta.key, {
//       ui: {
//         widget: "SELECT",
//         placeholder: ui.placeholder,
//         helpText: ui.helpText,
//         layout: ui.layout,
//       },
//     });
//   }, [isReference]);

//   /* ======================================================
//      DEPENDS-ON OPTIONS (FORM FIELDS)
//   ====================================================== */

//   const dependencyCandidates = useMemo(() => {
//     return fieldConfigs
//       .filter((f: any) => {
//         if (f.meta.key === field.meta.key) return false;
//         if (f.meta.deprecated) return false;
//         if (f.meta.category === "REFERENCE") return false;

//         const w = f.ui?.widget;
//         return w === "SELECT" || w === "RADIO";
//       })
//       .map((f: any) => ({
//         label: `${f.meta.label} (${f.meta.key})`,
//         value: f.meta.key,
//       }));
//   }, [fieldConfigs, field.meta.key]);

//   /* ======================================================
//      MAPPING TEXT (STABLE CONTROLLED STATE)
//   ====================================================== */

//   const [mappingText, setMappingText] = useState("");

//   useEffect(() => {
//     if (ui.dataSource?.type !== "DEPENDENT") return;

//     const map = ui.dataSource.map ?? {};
//     const text = Object.entries(map)
//       .map(
//         ([parent, options]: any) =>
//           `${parent}: ${options
//             .map((o: Option) => `${o.label}:${o.value}`)
//             .join(", ")}`,
//       )
//       .join("\n");

//     setMappingText(text);
//   }, [ui.dataSource?.type, ui.dataSource?.map]);

//   function saveMapping(text: string) {
//     const map: Record<string, Option[]> = {};

//     text.split("\n").forEach((line) => {
//       if (!line.trim()) return;

//       const firstColon = line.indexOf(":");
//       if (firstColon === -1) return;

//       const parent = line.slice(0, firstColon).trim();
//       const rest = line.slice(firstColon + 1).trim();

//       if (!parent || !rest) return;

//       map[parent] = rest
//         .split(",")
//         .map((pair) => {
//           const pairColon = pair.indexOf(":");
//           if (pairColon === -1) return null;

//           return {
//             label: pair.slice(0, pairColon).trim(),
//             value: pair.slice(pairColon + 1).trim(),
//           };
//         })
//         .filter(Boolean) as Option[];
//     });

//     updateDataSource({ map });
//   }

//   const { data: resources = [] } = useResourceList();
//   const resourceName = field.reference?.resource;
//   const { data: resourceFields = [] } = useResourceSchema(resourceName);

//   /* ======================================================
//      RENDER
//   ====================================================== */

//   return (
//     <div className="space-y-4">
//       <h4 className="font-semibold">UI</h4>

//       {/* Widget Info */}
//       <div className="text-sm">
//         Widget: <b>{isReference ? "SELECT (Reference)" : ui.widget}</b>
//       </div>

//       {/* Placeholder */}
//       <input
//         className="border p-2 w-full"
//         placeholder="Placeholder"
//         value={ui.placeholder ?? ""}
//         onChange={(e) => updateUI({ placeholder: e.target.value })}
//       />

//       {/* Help text */}
//       <input
//         className="border p-2 w-full"
//         placeholder="Help text"
//         value={ui.helpText ?? ""}
//         onChange={(e) => updateUI({ helpText: e.target.value })}
//       />

//       {/* ======================================================
//          STATIC OPTIONS (NON-REFERENCE ONLY)
//       ====================================================== */}

//       {(ui.widget === "SELECT" || ui.widget === "RADIO") &&
//         ui.dataSource?.type !== "DEPENDENT" &&
//         !isReference && (
//           <textarea
//             className="border p-2 w-full"
//             placeholder="Options (label:value per line)"
//             value={(ui.options ?? [])
//               .map((o: Option) => `${o.label}:${o.value}`)
//               .join("\n")}
//             onChange={(e) =>
//               updateUI({
//                 options: e.target.value
//                   .split("\n")
//                   .filter(Boolean)
//                   .map((line) => {
//                     const [label, value] = line.split(":");
//                     return { label: label.trim(), value: value.trim() };
//                   }),
//               })
//             }
//           />
//         )}

//       {/* Multi select (NON-REFERENCE ONLY) */}
//       {ui.widget === "SELECT" && !isReference && (
//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             checked={ui.multiple ?? false}
//             onChange={(e) => updateUI({ multiple: e.target.checked })}
//           />
//           Allow multiple selections
//         </label>
//       )}

//       {/* ======================================================
//          DATA SOURCE TYPE (NON-REFERENCE ONLY)
//       ====================================================== */}

//       {(ui.widget === "SELECT" || ui.widget === "RADIO") && !isReference && (
//         <select
//           className="border p-2 w-full"
//           value={ui.dataSource?.type ?? "STATIC"}
//           onChange={(e) => {
//             const type = e.target.value as "STATIC" | "DEPENDENT";

//             updateUI({
//               dataSource:
//                 type === "DEPENDENT"
//                   ? {
//                       type: "DEPENDENT",
//                       dependsOn: ui.dataSource?.dependsOn,
//                       map: ui.dataSource?.map ?? {},
//                       resetOnChange: ui.dataSource?.resetOnChange ?? true,
//                     }
//                   : undefined,
//             });
//           }}
//         >
//           <option value="STATIC">Static</option>
//           <option value="DEPENDENT">Dependent</option>
//         </select>
//       )}

//       {/* ======================================================
//          REFERENCE CONFIG
//       ====================================================== */}

//       {isReference && (
//         <div className="space-y-2 border p-3 rounded bg-gray-50">
//           <input
//             className="border p-2 w-full"
//             placeholder="Resource (e.g. Customer)"
//             value={field.reference?.resource ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   ...field.reference,
//                   resource: e.target.value,
//                 },
//               })
//             }
//           />

//           <input
//             className="border p-2 w-full"
//             placeholder="Label field (e.g. name)"
//             value={field.reference?.labelField ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   ...field.reference,
//                   labelField: e.target.value,
//                 },
//               })
//             }
//           />

//           <input
//             className="border p-2 w-full"
//             placeholder="Value field (e.g. id)"
//             value={field.reference?.valueField ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   ...field.reference,
//                   valueField: e.target.value,
//                 },
//               })
//             }
//           />
//         </div>
//       )}
//       {field.meta.category === "REFERENCE" && (
//         <div className="space-y-2">
//           {/* Resource dropdown */}
//           <select
//             className="border p-2 w-full"
//             value={field.reference?.resource ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   resource: e.target.value,
//                   labelField: undefined,
//                   valueField: undefined,
//                 },
//               })
//             }
//           >
//             <option value="">Select resource</option>
//             {resources.map((r) => (
//               <option key={r.value} value={r.value}>
//                 {r.label}
//               </option>
//             ))}
//           </select>

//           {/* Label field */}
//           <select
//             className="border p-2 w-full"
//             value={field.reference?.labelField ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   ...field.reference,
//                   labelField: e.target.value,
//                 },
//               })
//             }
//           >
//             <option value="">Label field</option>
//             {resourceFields.map((f: any) => (
//               <option key={f.key} value={f.key}>
//                 {f.key}
//               </option>
//             ))}
//           </select>

//           {/* Value field */}
//           <select
//             className="border p-2 w-full"
//             value={field.reference?.valueField ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   ...field.reference,
//                   valueField: e.target.value,
//                 },
//               })
//             }
//           >
//             <option value="">Value field</option>
//             {resourceFields.map((f: any) => (
//               <option key={f.key} value={f.key}>
//                 {f.key}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* ======================================================
//          DEPENDENT CONFIG (NON-REFERENCE ONLY)
//       ====================================================== */}

//       {ui.dataSource?.type === "DEPENDENT" && !isReference && (
//         <div className="space-y-3 border p-3 rounded bg-gray-50">
//           <div>
//             <label className="text-xs text-gray-500">Depends on</label>
//             <select
//               className="border p-2 w-full"
//               value={ui.dataSource.dependsOn ?? ""}
//               onChange={(e) => updateDataSource({ dependsOn: e.target.value })}
//             >
//               <option value="">Select field</option>
//               {dependencyCandidates.map((f) => (
//                 <option key={f.value} value={f.value}>
//                   {f.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <label className="flex items-center gap-2 text-sm">
//             <input
//               type="checkbox"
//               checked={ui.dataSource.resetOnChange ?? true}
//               onChange={(e) =>
//                 updateDataSource({ resetOnChange: e.target.checked })
//               }
//             />
//             Reset value when parent changes
//           </label>

//           <div>
//             <label className="text-xs text-gray-500">
//               Mapping (parentValue → options)
//             </label>
//             <textarea
//               className="border p-2 w-full text-xs font-mono"
//               placeholder={`IN: Karnataka:KA, Delhi:DL\nUS: California:CA, Texas:TX`}
//               value={mappingText}
//               onChange={(e) => setMappingText(e.target.value)}
//               onBlur={() => saveMapping(mappingText)}
//             />
//           </div>
//         </div>
//       )}

//       {/* Layout width */}
//       <select
//         className="border p-2 w-full"
//         value={ui.layout?.width ?? ""}
//         onChange={(e) =>
//           updateUI({
//             layout: {
//               ...ui.layout,
//               width: e.target.value || undefined,
//             },
//           })
//         }
//       >
//         <option value="">Default width</option>
//         <option value="full">Full</option>
//         <option value="half">Half</option>
//         <option value="third">Third</option>
//         <option value="quarter">Quarter</option>
//         <option value="two-third">Two Third</option>
//       </select>
//     </div>
//   );
// }

// import { useMemo, useState, useEffect } from "react";
// import { useFormBuilderStore } from "../../state/useFormBuilderStore";
// import { useResourceList } from "@/lib/resource/hook";
// import { useResourceSchema } from "@/lib/resource/hook/useResource";

// /* ======================================================
//    TYPES
// ====================================================== */

// type Option = {
//   label: string;
//   value: string;
// };

// /* ======================================================
//    COMPONENT
// ====================================================== */

// export function UITab({ field }: any) {
//   const updateField = useFormBuilderStore((s) => s.updateField);
//   const fieldConfigs = useFormBuilderStore((s) => s.fieldConfigs);

//   const ui = field.ui ?? {};
//   const isReference = field.meta.category === "REFERENCE";

//   /* ======================================================
//      UPDATE HELPERS
//   ====================================================== */

//   function updateUI(patch: any) {
//     updateField(field.meta.key, {
//       ui: {
//         ...ui,
//         ...patch,
//       },
//     });
//   }

//   function updateDataSource(patch: any) {
//     updateUI({
//       dataSource: {
//         ...ui.dataSource,
//         ...patch,
//       },
//     });
//   }

//   /* ======================================================
//      ENSURE REFERENCE USES SELECT (SAFE)
//   ====================================================== */

//   useEffect(() => {
//     if (!isReference) return;
//     if (ui.widget === "SELECT") return;

//     updateField(field.meta.key, {
//       ui: {
//         ...ui,
//         widget: "SELECT",
//       },
//     });
//   }, [isReference]);

//   /* ======================================================
//      DEPENDS-ON OPTIONS (NON-REFERENCE ONLY)
//   ====================================================== */

//   const dependencyCandidates = useMemo(() => {
//     return fieldConfigs
//       .filter((f: any) => {
//         if (f.meta.key === field.meta.key) return false;
//         if (f.meta.deprecated) return false;
//         if (f.meta.category === "REFERENCE") return false;

//         const w = f.ui?.widget;
//         return w === "SELECT" || w === "RADIO";
//       })
//       .map((f: any) => ({
//         label: `${f.meta.label} (${f.meta.key})`,
//         value: f.meta.key,
//       }));
//   }, [fieldConfigs, field.meta.key]);

//   /* ======================================================
//      DEPENDENT MAPPING EDITOR
//   ====================================================== */

//   const [mappingText, setMappingText] = useState("");

//   useEffect(() => {
//     if (ui.dataSource?.type !== "DEPENDENT") return;

//     const map = ui.dataSource.map ?? {};
//     const text = Object.entries(map)
//       .map(
//         ([parent, options]: any) =>
//           `${parent}: ${options
//             .map((o: Option) => `${o.label}:${o.value}`)
//             .join(", ")}`,
//       )
//       .join("\n");

//     setMappingText(text);
//   }, [ui.dataSource?.type, ui.dataSource?.map]);

//   function saveMapping(text: string) {
//     const map: Record<string, Option[]> = {};

//     text.split("\n").forEach((line) => {
//       if (!line.trim()) return;

//       const firstColon = line.indexOf(":");
//       if (firstColon === -1) return;

//       const parent = line.slice(0, firstColon).trim();
//       const rest = line.slice(firstColon + 1).trim();

//       if (!parent || !rest) return;

//       map[parent] = rest
//         .split(",")
//         .map((pair) => {
//           const pairColon = pair.indexOf(":");
//           if (pairColon === -1) return null;

//           return {
//             label: pair.slice(0, pairColon).trim(),
//             value: pair.slice(pairColon + 1).trim(),
//           };
//         })
//         .filter(Boolean) as Option[];
//     });

//     updateDataSource({ map });
//   }

//   /* ======================================================
//      REFERENCE DATA
//   ====================================================== */

//   const { data: resources = [] } = useResourceList();
//   const resourceName = field.reference?.resource;
//   const { data: resourceFields = [] } = useResourceSchema(resourceName);

//   /* ======================================================
//      RENDER
//   ====================================================== */

//   return (
//     <div className="space-y-4">
//       <h4 className="font-semibold">UI</h4>

//       {/* Widget Info */}
//       <div className="text-sm">
//         Widget: <b>{isReference ? "SELECT (Reference)" : ui.widget}</b>
//       </div>

//       {/* Placeholder */}
//       <input
//         className="border p-2 w-full"
//         placeholder="Placeholder"
//         value={ui.placeholder ?? ""}
//         onChange={(e) => updateUI({ placeholder: e.target.value })}
//       />

//       {/* Help text */}
//       <input
//         className="border p-2 w-full"
//         placeholder="Help text"
//         value={ui.helpText ?? ""}
//         onChange={(e) => updateUI({ helpText: e.target.value })}
//       />

//       {/* ======================================================
//          STATIC OPTIONS (NON-REFERENCE ONLY)
//       ====================================================== */}

//       {(ui.widget === "SELECT" || ui.widget === "RADIO") &&
//         ui.dataSource?.type !== "DEPENDENT" &&
//         !isReference && (
//           <textarea
//             className="border p-2 w-full"
//             placeholder="Options (label:value per line)"
//             value={(ui.options ?? [])
//               .map((o: Option) => `${o.label}:${o.value}`)
//               .join("\n")}
//             onChange={(e) =>
//               updateUI({
//                 options: e.target.value
//                   .split("\n")
//                   .filter(Boolean)
//                   .map((line) => {
//                     const [label, value] = line.split(":");
//                     return {
//                       label: label.trim(),
//                       value: value.trim(),
//                     };
//                   }),
//               })
//             }
//           />
//         )}

//       {/* Multi-select (NON-REFERENCE ONLY) */}
//       {ui.widget === "SELECT" && !isReference && (
//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             checked={ui.multiple ?? false}
//             onChange={(e) => updateUI({ multiple: e.target.checked })}
//           />
//           Allow multiple selections
//         </label>
//       )}

//       {/* ======================================================
//          DATA SOURCE TYPE (NON-REFERENCE ONLY)
//       ====================================================== */}

//       {(ui.widget === "SELECT" || ui.widget === "RADIO") && !isReference && (
//         <select
//           className="border p-2 w-full"
//           value={ui.dataSource?.type ?? "STATIC"}
//           onChange={(e) => {
//             const type = e.target.value as "STATIC" | "DEPENDENT";

//             updateUI({
//               dataSource:
//                 type === "DEPENDENT"
//                   ? {
//                       type: "DEPENDENT",
//                       dependsOn: ui.dataSource?.dependsOn,
//                       map: ui.dataSource?.map ?? {},
//                       resetOnChange: ui.dataSource?.resetOnChange ?? true,
//                     }
//                   : undefined,
//             });
//           }}
//         >
//           <option value="STATIC">Static</option>
//           <option value="DEPENDENT">Dependent</option>
//         </select>
//       )}

//       {/* ======================================================
//          REFERENCE CONFIG
//       ====================================================== */}

//       {isReference && (
//         <div className="space-y-2 border p-3 rounded bg-gray-50">
//           {/* Resource */}
//           <select
//             className="border p-2 w-full"
//             value={field.reference?.resource ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   resource: e.target.value,
//                   labelField: undefined,
//                   valueField: undefined,
//                 },
//               })
//             }
//           >
//             <option value="">Select resource</option>
//             {resources.map((r: any) => (
//               <option key={r.value} value={r.value}>
//                 {r.label}
//               </option>
//             ))}
//           </select>

//           {/* Label field */}
//           <select
//             className="border p-2 w-full"
//             value={field.reference?.labelField ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   ...field.reference,
//                   labelField: e.target.value,
//                 },
//               })
//             }
//           >
//             <option value="">Label field</option>
//             {resourceFields.map((f: any) => (
//               <option key={f.key} value={f.key}>
//                 {f.label}
//               </option>
//             ))}
//           </select>

//           {/* Value field */}
//           <select
//             className="border p-2 w-full"
//             value={field.reference?.valueField ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   ...field.reference,
//                   valueField: e.target.value,
//                 },
//               })
//             }
//           >
//             <option value="">Value field</option>
//             {resourceFields.map((f: any) => (
//               <option key={f.key} value={f.key}>
//                 {f.key}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* ======================================================
//          DEPENDENT CONFIG (NON-REFERENCE ONLY)
//       ====================================================== */}

//       {ui.dataSource?.type === "DEPENDENT" && !isReference && (
//         <div className="space-y-3 border p-3 rounded bg-gray-50">
//           <div>
//             <label className="text-xs text-gray-500">Depends on</label>
//             <select
//               className="border p-2 w-full"
//               value={ui.dataSource.dependsOn ?? ""}
//               onChange={(e) => updateDataSource({ dependsOn: e.target.value })}
//             >
//               <option value="">Select field</option>
//               {dependencyCandidates.map((f) => (
//                 <option key={f.value} value={f.value}>
//                   {f.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <label className="flex items-center gap-2 text-sm">
//             <input
//               type="checkbox"
//               checked={ui.dataSource.resetOnChange ?? true}
//               onChange={(e) =>
//                 updateDataSource({ resetOnChange: e.target.checked })
//               }
//             />
//             Reset value when parent changes
//           </label>

//           <div>
//             <label className="text-xs text-gray-500">
//               Mapping (parentValue → options)
//             </label>
//             <textarea
//               className="border p-2 w-full text-xs font-mono"
//               placeholder={`IN: Karnataka:KA, Delhi:DL\nUS: California:CA, Texas:TX`}
//               value={mappingText}
//               onChange={(e) => setMappingText(e.target.value)}
//               onBlur={() => saveMapping(mappingText)}
//             />
//           </div>
//         </div>
//       )}

//       {/* Layout width */}
//       <select
//         className="border p-2 w-full"
//         value={ui.layout?.width ?? "full"}
//         onChange={(e) =>
//           updateUI({
//             layout: {
//               ...ui.layout,
//               width: e.target.value as any,
//             },
//           })
//         }
//       >
//         <option value="full">Full</option>
//         <option value="half">Half</option>
//         <option value="third">Third</option>
//         <option value="quarter">Quarter</option>
//         <option value="two-third">Two Third</option>
//       </select>
//     </div>
//   );
// }

// import { useMemo, useState, useEffect } from "react";
// import { useFormBuilderStore } from "../../state/useFormBuilderStore";
// import { useResourceList } from "@/lib/resource/hook";
// import { useResourceSchema } from "@/lib/resource/hook/useResource";

// /* ======================================================
//    TYPES
// ====================================================== */

// type Option = {
//   label: string;
//   value: string;
// };

// type ResourceOption = {
//   label: string;
//   value: string;
// };

// type ResourceField = {
//   key: string;
//   label: string;
//   fieldType?: string;
//   dataType?: string;
// };

// /* ======================================================
//    COMPONENT
// ====================================================== */

// export function UITab({ field }: any) {
//   const updateField = useFormBuilderStore((s) => s.updateField);
//   const fieldConfigs = useFormBuilderStore((s) => s.fieldConfigs);

//   const ui = field.ui ?? {};
//   const isReference = field.meta.category === "REFERENCE";

//   /* ======================================================
//      UPDATE HELPERS
//   ====================================================== */

//   function updateUI(patch: any) {
//     updateField(field.meta.key, {
//       ui: {
//         ...ui,
//         ...patch,
//       },
//     });
//   }

//   // function updateDataSource(patch: any) {
//   //   updateUI({
//   //     dataSource: {
//   //       ...ui.dataSource,
//   //       ...patch,
//   //     },
//   //   });
//   // }

//   function updateDataSource(patch: any) {
//   updateField(field.meta.key, {
//     integration: {
//       ...field.integration,
//       dataSource: {
//         ...field.integration?.dataSource,
//         ...patch,
//       },
//     },
//   });
// }

//   /* ======================================================
//      ENSURE REFERENCE USES SELECT
//   ====================================================== */

//   useEffect(() => {
//     if (!isReference) return;
//     if (ui.widget === "SELECT") return;

//     updateField(field.meta.key, {
//       ui: {
//         ...ui,
//         widget: "SELECT",
//       },
//     });
//   }, [isReference, ui.widget]);

//   /* ======================================================
//      DEPENDS-ON OPTIONS (NON-REFERENCE ONLY)
//   ====================================================== */

//   const dependencyCandidates = useMemo(() => {
//     return fieldConfigs
//       .filter((f: any) => {
//         if (f.meta.key === field.meta.key) return false;
//         if (f.meta.deprecated) return false;
//         if (f.meta.category === "REFERENCE") return false;

//         const w = f.ui?.widget;
//         return w === "SELECT" || w === "RADIO";
//       })
//       .map((f: any) => ({
//         label: `${f.meta.label} (${f.meta.key})`,
//         value: f.meta.key,
//       }));
//   }, [fieldConfigs, field.meta.key]);

//   /* ======================================================
//      DEPENDENT MAPPING EDITOR
//   ====================================================== */

//   const [mappingText, setMappingText] = useState("");

//   useEffect(() => {
//     if (field.integration?.dataSource?.type !== "DEPENDENT") return;

//     const map = field.integration?.dataSource?.map ?? {};
//     const text = Object.entries(map)
//       .map(([parent, options]) => {
//         const opts = options as Option[];

//         return `${parent}: ${opts
//           .map((o) => `${o.label}:${o.value}`)
//           .join(", ")}`;
//       })
//       .join("\n");

//     setMappingText(text);
//   }, [field.integration?.dataSource?.type, field.integration?.dataSource?.map]);

//   function saveMapping(text: string) {
//     const map: Record<string, Option[]> = {};

//     text.split("\n").forEach((line) => {
//       if (!line.trim()) return;

//       const firstColon = line.indexOf(":");
//       if (firstColon === -1) return;

//       const parent = line.slice(0, firstColon).trim();
//       const rest = line.slice(firstColon + 1).trim();

//       if (!parent || !rest) return;

//       map[parent] = rest
//         .split(",")
//         .map((pair) => {
//           const pairColon = pair.indexOf(":");
//           if (pairColon === -1) return null;

//           return {
//             label: pair.slice(0, pairColon).trim(),
//             value: pair.slice(pairColon + 1).trim(),
//           };
//         })
//         .filter(Boolean) as Option[];
//     });

//     updateDataSource({ map });
//   }

//   /* ======================================================
//      REFERENCE DATA
//   ====================================================== */

//   const { data: resources = [] } = useResourceList();
//   const resourceName: string | undefined = field.reference?.resource;

//   const { data: resourceFields = [] } = useResourceSchema(resourceName);

//   /* ======================================================
//      RENDER
//   ====================================================== */

//   return (
//     <div className="space-y-4">
//       <h4 className="font-semibold">UI</h4>

//       <div className="text-sm">
//         Widget: <b>{isReference ? "SELECT (Reference)" : ui.widget}</b>
//       </div>

//       {/* Placeholder */}
//       <input
//         className="border p-2 w-full"
//         placeholder="Placeholder"
//         value={ui.placeholder ?? ""}
//         onChange={(e) => updateUI({ placeholder: e.target.value })}
//       />

//       {/* Help text */}
//       <input
//         className="border p-2 w-full"
//         placeholder="Help text"
//         value={ui.helpText ?? ""}
//         onChange={(e) => updateUI({ helpText: e.target.value })}
//       />
//       {/* Options source type */}
//       {(ui.widget === "SELECT" || ui.widget === "RADIO") && !isReference && (
//         <select
//           className="border p-2 w-full"
//           value={ui.dataSource?.type ?? "STATIC"}
//           onChange={(e) => {
//             const type = e.target.value;

//             if (type === "STATIC") {
//               updateUI({
//                 dataSource: { type: "STATIC" },
//                 options: ui.options ?? [],
//               });
//             } else {
//               updateUI({
//                 options: undefined,
//                 dataSource: { type: "DEPENDENT", map: {} },
//               });
//             }
//           }}
//         >
//           <option value="STATIC">Static options</option>
//           <option value="DEPENDENT">Dependent options</option>
//         </select>
//       )}

//       {/* ======================================================
//          STATIC OPTIONS (NON-REFERENCE)
//       ====================================================== */}

//       {(ui.widget === "SELECT" || ui.widget === "RADIO") &&
//         ui.dataSource?.type !== "DEPENDENT" &&
//         !isReference && (
//           <textarea
//             className="border p-2 w-full"
//             placeholder="Options (label:value per line)"
//             value={(ui.options ?? [])
//               .map((o: Option) => `${o.label}:${o.value}`)
//               .join("\n")}
//             onChange={(e) =>
//               updateUI({
//                 options: e.target.value
//                   .split("\n")
//                   .filter(Boolean)
//                   .map((line) => {
//                     const [label, value] = line.split(":");
//                     return {
//                       label: label.trim(),
//                       value: value.trim(),
//                     };
//                   }),
//               })
//             }
//           />
//         )}

//       {/* ======================================================
//          REFERENCE CONFIG
//       ====================================================== */}

//       {isReference && (
//         <div className="space-y-2 border p-3 rounded bg-gray-50">
//           {/* Resource */}
//           <select
//             className="border p-2 w-full"
//             value={field.reference?.resource ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   resource: e.target.value,
//                   labelField: "",
//                   valueField: "",
//                 },
//               })
//             }
//           >
//             <option value="">Select resource</option>
//             {resources.map((r: ResourceOption) => (
//               <option key={r.value} value={r.value}>
//                 {r.label}
//               </option>
//             ))}
//           </select>

//           {/* Label field */}
//           <select
//             className="border p-2 w-full"
//             value={field.reference?.labelField ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   ...field.reference,
//                   labelField: e.target.value,
//                 },
//               })
//             }
//           >
//             <option value="">Label field</option>
//             {resourceFields.map((f: ResourceField) => (
//               <option key={f.key} value={f.key}>
//                 {f.label}
//               </option>
//             ))}
//           </select>

//           {/* Value field */}
//           <select
//             className="border p-2 w-full"
//             value={field.reference?.valueField ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   ...field.reference,
//                   valueField: e.target.value,
//                 },
//               })
//             }
//           >
//             <option value="">Value field</option>
//             {resourceFields.map((f: ResourceField) => (
//               <option key={f.key} value={f.key}>
//                 {f.key}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* ======================================================
//          DEPENDENT CONFIG (NON-REFERENCE)
//       ====================================================== */}

//       {ui.dataSource?.type === "DEPENDENT" && !isReference && (
//         <div className="space-y-3 border p-3 rounded bg-gray-50">
//           <select
//             className="border p-2 w-full"
//             value={ui.dataSource.dependsOn ?? ""}
//             onChange={(e) => updateDataSource({ dependsOn: e.target.value })}
//           >
//             <option value="">Select field</option>
//             {dependencyCandidates.map((f) => (
//               <option key={f.value} value={f.value}>
//                 {f.label}
//               </option>
//             ))}
//           </select>

//           <textarea
//             className="border p-2 w-full text-xs font-mono"
//             value={mappingText}
//             onChange={(e) => setMappingText(e.target.value)}
//             onBlur={() => saveMapping(mappingText)}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// import { useMemo, useState, useEffect } from "react";
// import { useFormBuilderStore } from "../../state/useFormBuilderStore";
// import { useResourceList } from "@/lib/resource/hook";
// import { useResourceSchema } from "@/lib/resource/hook/useResource";

// /* ======================================================
//    TYPES
// ====================================================== */

// type Option = {
//   label: string;
//   value: string;
// };

// type ResourceOption = {
//   label: string;
//   value: string;
// };

// type ResourceField = {
//   key: string;
//   label: string;
//   fieldType?: string;
//   dataType?: string;
// };

// /* ======================================================
//    COMPONENT
// ====================================================== */

// export function UITab({ field }: any) {
//   const updateField = useFormBuilderStore((s) => s.updateField);
//   const fieldConfigs = useFormBuilderStore((s) => s.fieldConfigs);

//   const ui = field.ui ?? {};
//   const dataSource = field.integration?.dataSource;
//   const isReference = field.meta.category === "REFERENCE";

//   /* ======================================================
//      UPDATE HELPERS
//   ====================================================== */

//   function updateUI(patch: any) {
//     updateField(field.meta.key, {
//       ui: {
//         ...ui,
//         ...patch,
//       },
//     });
//   }

//   function updateDataSource(patch: any) {
//     updateField(field.meta.key, {
//       integration: {
//         ...field.integration,
//         dataSource: {
//           ...field.integration?.dataSource,
//           ...patch,
//         },
//       },
//     });
//   }

//   /* ======================================================
//      ENSURE REFERENCE USES SELECT
//   ====================================================== */

//   useEffect(() => {
//     if (!isReference) return;
//     if (ui.widget === "SELECT") return;

//     updateField(field.meta.key, {
//       ui: { ...ui, widget: "SELECT" },
//     });
//   }, [isReference, ui.widget]);

//   /* ======================================================
//      DEPENDS-ON OPTIONS (NON-REFERENCE ONLY)
//   ====================================================== */

//   const dependencyCandidates = useMemo(() => {
//     return fieldConfigs
//       .filter((f: any) => {
//         if (f.meta.key === field.meta.key) return false;
//         if (f.meta.deprecated) return false;
//         if (f.meta.category === "REFERENCE") return false;

//         const w = f.ui?.widget;
//         return w === "SELECT" || w === "RADIO";
//       })
//       .map((f: any) => ({
//         label: `${f.meta.label} (${f.meta.key})`,
//         value: f.meta.key,
//       }));
//   }, [fieldConfigs, field.meta.key]);

//   /* ======================================================
//      DEPENDENT MAPPING EDITOR
//   ====================================================== */

//   const [mappingText, setMappingText] = useState("");

//   useEffect(() => {
//     if (dataSource?.type !== "DEPENDENT") return;

//     const map = dataSource.map ?? {};
//     const text = Object.entries(map)
//       .map(([parent, options]) => {
//         const opts = options as Option[];
//         return `${parent}: ${opts
//           .map((o) => `${o.label}:${o.value}`)
//           .join(", ")}`;
//       })
//       .join("\n");

//     setMappingText(text);
//   }, [dataSource?.type, dataSource?.map]);

//   function saveMapping(text: string) {
//     const map: Record<string, Option[]> = {};

//     text.split("\n").forEach((line) => {
//       if (!line.trim()) return;

//       const firstColon = line.indexOf(":");
//       if (firstColon === -1) return;

//       const parent = line.slice(0, firstColon).trim();
//       const rest = line.slice(firstColon + 1).trim();

//       if (!parent || !rest) return;

//       map[parent] = rest
//         .split(",")
//         .map((pair) => {
//           const pairColon = pair.indexOf(":");
//           if (pairColon === -1) return null;

//           return {
//             label: pair.slice(0, pairColon).trim(),
//             value: pair.slice(pairColon + 1).trim(),
//           };
//         })
//         .filter(Boolean) as Option[];
//     });

//     updateDataSource({ map });
//   }

//   /* ======================================================
//      REFERENCE DATA
//   ====================================================== */

//   const { data: resources = [] } = useResourceList();
//   const resourceName: string | undefined = field.reference?.resource;
//   const { data: resourceFields = [] } = useResourceSchema(resourceName);

//   /* ======================================================
//      RENDER
//   ====================================================== */

//   return (
//     <div className="space-y-4">
//       <h4 className="font-semibold">UI</h4>

//       <div className="text-sm">
//         Widget: <b>{isReference ? "SELECT (Reference)" : ui.widget}</b>
//       </div>

//       {/* Placeholder */}
//       <input
//         className="border p-2 w-full"
//         placeholder="Placeholder"
//         value={ui.placeholder ?? ""}
//         onChange={(e) => updateUI({ placeholder: e.target.value })}
//       />

//       {/* Help text */}
//       <input
//         className="border p-2 w-full"
//         placeholder="Help text"
//         value={ui.helpText ?? ""}
//         onChange={(e) => updateUI({ helpText: e.target.value })}
//       />

//       {/* ======================================================
//          OPTIONS SOURCE TYPE
//       ====================================================== */}

//       {(ui.widget === "SELECT" || ui.widget === "RADIO") && !isReference && (
//         <select
//           className="border p-2 w-full"
//           value={dataSource?.type ?? "STATIC"}
//           onChange={(e) => {
//             const type = e.target.value;

//             if (type === "STATIC") {
//               updateField(field.meta.key, {
//                 ui: { ...ui, options: ui.options ?? [] },
//                 integration: { dataSource: { type: "STATIC" } },
//               });
//             } else {
//               updateField(field.meta.key, {
//                 ui: { ...ui, options: undefined },
//                 integration: { dataSource: { type: "DEPENDENT", map: {} } },
//               });
//             }
//           }}
//         >
//           <option value="STATIC">Static options</option>
//           <option value="DEPENDENT">Dependent options</option>
//         </select>
//       )}

//       {/* ======================================================
//          STATIC OPTIONS
//       ====================================================== */}

//       {(ui.widget === "SELECT" || ui.widget === "RADIO") &&
//         dataSource?.type !== "DEPENDENT" &&
//         !isReference && (
//           <textarea
//             className="border p-2 w-full"
//             placeholder="Options (label:value per line)"
//             value={(ui.options ?? [])
//               .map((o: Option) => `${o.label}:${o.value}`)
//               .join("\n")}
//             onChange={(e) =>
//               updateUI({
//                 options: e.target.value
//                   .split("\n")
//                   .filter(Boolean)
//                   .map((line) => {
//                     const [label, value] = line.split(":");
//                     return {
//                       label: label.trim(),
//                       value: value.trim(),
//                     };
//                   }),
//               })
//             }
//           />
//         )}

//       {/* ======================================================
//          REFERENCE CONFIG
//       ====================================================== */}

//       {isReference && (
//         <div className="space-y-2 border p-3 rounded bg-gray-50">
//           <select
//             className="border p-2 w-full"
//             value={field.reference?.resource ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   resource: e.target.value,
//                   labelField: "",
//                   valueField: "",
//                 },
//               })
//             }
//           >
//             <option value="">Select resource</option>
//             {resources.map((r: ResourceOption) => (
//               <option key={r.value} value={r.value}>
//                 {r.label}
//               </option>
//             ))}
//           </select>

//           <select
//             className="border p-2 w-full"
//             value={field.reference?.labelField ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   ...field.reference,
//                   labelField: e.target.value,
//                 },
//               })
//             }
//           >
//             <option value="">Label field</option>
//             {resourceFields.map((f: ResourceField) => (
//               <option key={f.key} value={f.key}>
//                 {f.label}
//               </option>
//             ))}
//           </select>

//           <select
//             className="border p-2 w-full"
//             value={field.reference?.valueField ?? ""}
//             onChange={(e) =>
//               updateField(field.meta.key, {
//                 reference: {
//                   ...field.reference,
//                   valueField: e.target.value,
//                 },
//               })
//             }
//           >
//             <option value="">Value field</option>
//             {resourceFields.map((f: ResourceField) => (
//               <option key={f.key} value={f.key}>
//                 {f.key}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* ======================================================
//          DEPENDENT CONFIG
//       ====================================================== */}

//       {dataSource?.type === "DEPENDENT" && !isReference && (
//         <div className="space-y-3 border p-3 rounded bg-gray-50">
//           <select
//             className="border p-2 w-full"
//             value={dataSource.dependsOn ?? ""}
//             onChange={(e) => updateDataSource({ dependsOn: e.target.value })}
//           >
//             <option value="">Select field</option>
//             {dependencyCandidates.map((f) => (
//               <option key={f.value} value={f.value}>
//                 {f.label}
//               </option>
//             ))}
//           </select>

//           <textarea
//             className="border p-2 w-full text-xs font-mono"
//             value={mappingText}
//             onChange={(e) => setMappingText(e.target.value)}
//             onBlur={() => saveMapping(mappingText)}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

import { useMemo, useState, useEffect } from "react";
import { useFormBuilderStore } from "../../state/useFormBuilderStore";
import { useResourceList } from "@/lib/resource/hook";
import { useResourceSchema } from "@/lib/resource/hook/useResource";

/* ======================================================
   TYPES
====================================================== */

type Option = {
  label: string;
  value: string;
};

type ResourceOption = {
  label: string;
  value: string;
};

type ResourceField = {
  key: string;
  label: string;
};

/* ======================================================
   COMPONENT
====================================================== */

export function UITab({ field }: any) {
  const updateField = useFormBuilderStore((s) => s.updateField);
  const fieldConfigs = useFormBuilderStore((s) => s.fieldConfigs);

  const ui = field.ui ?? {};
  const dataSource = field.integration?.dataSource;
  const reference = field.integration?.reference;

  const isReference = Boolean(reference || field.meta.category === "REFERENCE");

  /* ======================================================
     UPDATE HELPERS
  ====================================================== */

  function updateUI(patch: any) {
    updateField(field.meta.key, {
      ui: {
        ...ui,
        ...patch,
      },
    });
  }

  function updateDataSource(patch: any) {
    updateField(field.meta.key, {
      integration: {
        ...field.integration,
        dataSource: {
          ...dataSource,
          ...patch,
        },
      },
    });
  }

  function updateReference(patch: any) {
    updateField(field.meta.key, {
      integration: {
        ...field.integration,
        reference: {
          ...reference,
          ...patch,
        },
      },
    });
  }

  /* ======================================================
     ENSURE REFERENCE USES SELECT
  ====================================================== */

  useEffect(() => {
    if (!isReference) return;
    if (ui.widget === "SELECT") return;

    updateUI({ widget: "SELECT" });
  }, [isReference, ui.widget]);

  /* ======================================================
     DEPENDS-ON OPTIONS
  ====================================================== */

  const dependencyCandidates = useMemo(() => {
    return fieldConfigs
      .filter((f: any) => {
        if (f.meta.key === field.meta.key) return false;
        if (f.meta.deprecated) return false;
        if (f.meta.category === "REFERENCE") return false;

        const w = f.ui?.widget;
        return w === "SELECT" || w === "RADIO";
      })
      .map((f: any) => ({
        label: `${f.meta.label} (${f.meta.key})`,
        value: f.meta.key,
      }));
  }, [fieldConfigs, field.meta.key]);

  /* ======================================================
     DEPENDENT MAPPING EDITOR
  ====================================================== */

  const [mappingText, setMappingText] = useState("");

  useEffect(() => {
    if (dataSource?.type !== "DEPENDENT") return;

    const map = dataSource.map ?? {};
    const text = Object.entries(map)
      .map(([parent, options]) => {
        const opts = options as Option[];
        return `${parent}: ${opts
          .map((o) => `${o.label}:${o.value}`)
          .join(", ")}`;
      })
      .join("\n");

    setMappingText(text);
  }, [dataSource?.type, dataSource?.map]);

  function saveMapping(text: string) {
    const map: Record<string, Option[]> = {};

    text.split("\n").forEach((line) => {
      if (!line?.trim()) return;

      const i = line.indexOf(":");
      if (i === -1) return;

      const parent = line.slice(0, i)?.trim();
      const rest = line.slice(i + 1)?.trim();

      if (!parent || !rest) return;

      map[parent] = rest
        .split(",")
        .map((pair) => {
          const j = pair.indexOf(":");
          if (j === -1) return null;
          return {
            label: pair.slice(0, j)?.trim(),
            value: pair.slice(j + 1)?.trim(),
          };
        })
        .filter(Boolean) as Option[];
    });

    updateDataSource({ map });
  }

  /* ======================================================
     REFERENCE DATA
  ====================================================== */

  const { data: resources = [] } = useResourceList();
  const resourceName = reference?.resource;
  const { data: resourceField } = useResourceSchema(resourceName);
  const resourceFields = resourceField?.fields ?? [];
  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">UI</h4>

      <div className="text-sm">
        Widget: <b>{isReference ? "SELECT (Reference)" : ui.widget}</b>
      </div>

      <input
        className="border p-2 w-full"
        placeholder="Placeholder"
        value={ui.placeholder ?? ""}
        onChange={(e) => updateUI({ placeholder: e.target.value })}
      />

      <input
        className="border p-2 w-full"
        placeholder="Help text"
        value={ui.helpText ?? ""}
        onChange={(e) => updateUI({ helpText: e.target.value })}
      />

 
      {/* ======================================================
         OPTIONS SOURCE
      ====================================================== */}

      {(ui.widget === "SELECT" || ui.widget === "RADIO") && !isReference && (
        <select
          className="border p-2 w-full"
          value={dataSource?.type ?? "STATIC"}
          onChange={(e) => {
            const type = e.target.value;
            if (type === "STATIC") {
              updateField(field.meta.key, {
                ui: { ...ui, options: ui.options ?? [] },
                integration: { dataSource: { type: "STATIC" } },
              });
            } else {
              updateField(field.meta.key, {
                ui: { ...ui, options: undefined },
                integration: { dataSource: { type: "DEPENDENT", map: {} } },
              });
            }
          }}
        >
          <option value="STATIC">Static options</option>
          <option value="DEPENDENT">Dependent options</option>
        </select>
      )}

      {/* ======================================================
         STATIC OPTIONS
      ====================================================== */}

      {(ui.widget === "SELECT" || ui.widget === "RADIO") &&
        dataSource?.type !== "DEPENDENT" &&
        !isReference && (
          <textarea
            className="border p-2 w-full"
            placeholder="Options (label:value per line)"
            value={(ui.options ?? [])
              .map((o: Option) => `${o.label}:${o.value}`)
              .join("\n")}
            onChange={(e) =>
              updateUI({
                options: e.target.value
                  .split("\n")
                  .filter(Boolean)
                  .map((line) => {
                    const [label, value] = line.split(":");
                    return { label: label?.trim(), value: value?.trim() };
                  }),
              })
            }
          />
        )}

      {/* ======================================================
         REFERENCE CONFIG
      ====================================================== */}

      {isReference && (
        <div className="space-y-2 border p-3 rounded bg-gray-50">
          <select
            className="border p-2 w-full"
            value={reference?.resource ?? ""}
            onChange={(e) =>
              updateReference({
                resource: e.target.value,
                labelField: "",
                valueField: "",
              })
            }
          >
            <option value="">Select resource</option>
            {resources.map((r: ResourceOption) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>

          <select
            className="border p-2 w-full"
            value={reference?.labelField ?? ""}
            onChange={(e) => updateReference({ labelField: e.target.value })}
          >
            <option value="">Label field</option>
            {resourceFields?.map((f: ResourceField) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>



          <select
            className="border p-2 w-full"
            value={reference?.valueField ?? ""}
            onChange={(e) => updateReference({ valueField: e.target.value })}
          >
            <option value="">Value field</option>
            {resourceFields?.map((f: ResourceField) => (
              <option key={f.key} value={f.key}>
                {f.key}
              </option>
            ))}
          </select>


        </div>
      )}

            {/* Layout width */}
    <select
        className="border p-2 w-full"
        value={ui.layout?.width ?? ""}
        onChange={(e) =>
          updateUI({
            layout: {
              ...ui.layout,
              width: e.target.value || undefined,
            },
          })
        }
      >
        <option value="">Default width</option>
        <option value="full">Full</option>
        <option value="half">Half</option>
        <option value="third">Third</option>
        <option value="quarter">Quarter</option>
        <option value="two-third">Two Third</option>
      </select>

      {/* ======================================================
         DEPENDENT CONFIG
      ====================================================== */}

      {dataSource?.type === "DEPENDENT" && !isReference && (
        <div className="space-y-3 border p-3 rounded bg-gray-50">
          <select
            className="border p-2 w-full"
            value={dataSource.dependsOn ?? ""}
            onChange={(e) => updateDataSource({ dependsOn: e.target.value })}
          >
            <option value="">Select field</option>
            {dependencyCandidates.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>

          <textarea
            className="border p-2 w-full text-xs font-mono"
            value={mappingText}
            onChange={(e) => setMappingText(e.target.value)}
            onBlur={() => saveMapping(mappingText)}
          />
        </div>
      )}
    </div>
  );
}
