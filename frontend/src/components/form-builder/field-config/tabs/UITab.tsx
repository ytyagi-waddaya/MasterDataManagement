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

//////////////////////////////////////////////










///////////////////////////////////////////////
//////////////////////////////////////////
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
// };

// /* ======================================================
//    COMPONENT
// ====================================================== */

// export function UITab({ field }: any) {
//   const updateField = useFormBuilderStore((s) => s.updateField);
//   const fieldConfigs = useFormBuilderStore((s) => s.fieldConfigs);
//   const [staticText, setStaticText] = useState("");

//   const ui = field.ui ?? {};
//   const dataSource = field.integration?.dataSource;
//   const reference = field.integration?.reference;

//   const isReference = Boolean(reference || field.meta.category === "REFERENCE");
//   // useEffect(() => {
//   //   if (!ui.options) return;

//   //   setStaticText(
//   //     ui.options.map((o: Option) => `${o.label}:${o.value}`).join("\n"),
//   //   );
//   // }, [ui.options]);

//   const [isEditingStatic, setIsEditingStatic] = useState(false);

//   useEffect(() => {
//     const opts = ui.options ?? [];
//     setStaticText(opts.map((o: Option) => `${o.label}:${o.value}`).join("\n"));
//   }, [field.meta.key]); // ONLY when new field is selected

//   useEffect(() => {
//     const id = setTimeout(() => {
//       if (!staticText.trim()) return;

//       updateUI({
//         options: staticText
//           .split("\n")
//           .map((l) => l.trim())
//           .filter(Boolean)
//           .map((line) => {
//             const [label, ...valueParts] = line.split(":");
//             const value = valueParts.join(":").trim();
//             return {
//               label: label.trim(),
//               value: value || label.trim(),
//             };
//           }),
//       });
//     }, 500); // ⏱️ debounce delay

//     return () => clearTimeout(id);
//   }, [staticText]);

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
//           ...dataSource,
//           ...patch,
//         },
//       },
//     });
//   }

//   function updateReference(patch: any) {
//     updateField(field.meta.key, {
//       integration: {
//         ...field.integration,
//         reference: {
//           ...reference,
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

//     updateUI({ widget: "SELECT" });
//   }, [isReference, ui.widget]);

//   /* ======================================================
//      DEPENDS-ON OPTIONS
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
//       if (!line?.trim()) return;

//       const i = line.indexOf(":");
//       if (i === -1) return;

//       const parent = line.slice(0, i)?.trim();
//       const rest = line.slice(i + 1)?.trim();

//       if (!parent || !rest) return;

//       // map[parent] = rest
//       //   .split(",")
//       //   .map((pair) => {
//       //     const j = pair.indexOf(":");
//       //     if (j === -1) return null;
//       //     return {
//       //       label: pair.slice(0, j)?.trim(),
//       //       value: pair.slice(j + 1)?.trim(),
//       //     };
//       //   })
//       //   .filter(Boolean) as Option[];
//       map[parent] = rest
//         .split(",")
//         .map((pair) => {
//           const [label, ...valueParts] = pair.split(":");
//           const value = valueParts.join(":").trim();

//           if (!label || !value) return null;

//           return {
//             label: label.trim(),
//             value,
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
//   const resourceName = reference?.resource;
//   const { data: resourceField } = useResourceSchema(resourceName);
//   const resourceFields = resourceField?.fields ?? [];
//   /* ======================================================
//      RENDER
//   ====================================================== */

//   return (
//     <div className="space-y-4">
//       <h4 className="font-semibold">UI</h4>

//       <div className="text-sm">
//         Widget: <b>{isReference ? "SELECT (Reference)" : ui.widget}</b>
//       </div>

//       <input
//         className="border p-2 w-full"
//         placeholder="Placeholder"
//         value={ui.placeholder ?? ""}
//         onChange={(e) => updateUI({ placeholder: e.target.value })}
//       />

//       <input
//         className="border p-2 w-full"
//         placeholder="Help text"
//         value={ui.helpText ?? ""}
//         onChange={(e) => updateUI({ helpText: e.target.value })}
//       />

//       {/* ======================================================
//          OPTIONS SOURCE
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
//           // <textarea
//           //   className="border p-2 w-full"
//           //   placeholder="Options (label:value per line)"
//           //   value={(ui.options ?? [])
//           //     .map((o: Option) => `${o.label}:${o.value}`)
//           //     .join("\n")}
//           //   onChange={(e) =>
//           //     updateUI({
//           //       options: e.target.value
//           //         .split("\n")
//           //         .filter(Boolean)
//           //         .map((line) => {
//           //           const [label, value] = line.split(":");
//           //           return { label: label?.trim(), value: value?.trim() };
//           //         }),
//           //     })
//           //   }
//           // />
//           // <textarea
//           //   className="border p-2 w-full text-sm font-mono resize-y min-h-[140px]"
//           //   rows={6}
//           //   placeholder="Options (label:value per line)"
//           //   value={(ui.options ?? [])
//           //     .map((o: Option) => `${o.label}:${o.value}`)
//           //     .join("\n")}
//           //   onChange={(e) =>
//           //     updateUI({
//           //       options: e.target.value
//           //         .split("\n")
//           //         .filter((l) => l.trim())
//           //         .map((line) => {
//           //           const i = line.indexOf(":");
//           //           if (i === -1) return { label: line, value: line };
//           //           return {
//           //             label: line.slice(0, i).trim(),
//           //             value: line.slice(i + 1).trim(),
//           //           };
//           //         }),
//           //     })
//           //   }
//           // />
//           // <textarea
//           //   className="border p-2 w-full text-sm font-mono resize-y min-h-[140px]"
//           //   rows={6}
//           //   placeholder="label:value (one per line)"
//           //   value={staticText}
//           //   onChange={(e) => setStaticText(e.target.value)}
//           //   onKeyDown={(e) => {
//           //     if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
//           //       updateUI({
//           //         options: staticText
//           //           .split("\n")
//           //           .map((l) => l.trim())
//           //           .filter(Boolean)
//           //           .map((line) => {
//           //             const [label, ...valueParts] = line.split(":");
//           //             const value = valueParts.join(":").trim();
//           //             return {
//           //               label: label.trim(),
//           //               value: value || label.trim(),
//           //             };
//           //           }),
//           //       });
//           //     }
//           //   }}
//           //   onFocus={() => setIsEditingStatic(true)}
//           //   onBlur={() => setIsEditingStatic(false)}
//           // />
//           <textarea
//             className="border p-2 w-full text-sm font-mono resize-y min-h-[140px]"
//             rows={6}
//             placeholder="label:value (one per line)"
//             value={staticText}
//             onChange={(e) => setStaticText(e.target.value)}
//           />
//         )}

//       {/* ======================================================
//          REFERENCE CONFIG
//       ====================================================== */}

//       {isReference && (
//         <div className="space-y-2 border p-3 rounded bg-gray-50">
//           <select
//             className="border p-2 w-full"
//             value={reference?.resource ?? ""}
//             onChange={(e) =>
//               updateReference({
//                 resource: e.target.value,
//                 labelField: "",
//                 valueField: "",
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
//             value={reference?.labelField ?? ""}
//             onChange={(e) => updateReference({ labelField: e.target.value })}
//           >
//             <option value="">Label field</option>
//             {resourceFields?.map((f: ResourceField) => (
//               <option key={f.key} value={f.key}>
//                 {f.label}
//               </option>
//             ))}
//           </select>

//           <select
//             className="border p-2 w-full"
//             value={reference?.valueField ?? ""}
//             onChange={(e) => updateReference({ valueField: e.target.value })}
//           >
//             <option value="">Value field</option>
//             {resourceFields?.map((f: ResourceField) => (
//               <option key={f.key} value={f.key}>
//                 {f.key}
//               </option>
//             ))}
//           </select>
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

//           {/* <textarea
//             className="border p-2 w-full text-xs font-mono"
//             value={mappingText}
//             onChange={(e) => setMappingText(e.target.value)}
//             onBlur={() => saveMapping(mappingText)}
//           /> */}
//           <textarea
//             className="border p-2 w-full text-xs font-mono resize-y min-h-[200px]"
//             rows={8}
//             placeholder="parentValue: label:value, label:value"
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
  const [staticText, setStaticText] = useState("");

  const ui = field.ui ?? {};
  const dataSource = field.integration?.dataSource;
  const reference = field.integration?.reference;

  const isReference = Boolean(reference || field.meta.category === "REFERENCE");

  const [activeSection, setActiveSection] = useState("basic");

  useEffect(() => {
    const opts = ui.options ?? [];
    setStaticText(opts.map((o: Option) => `${o.label}:${o.value}`).join("\n"));
  }, [field.meta.key]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (!staticText.trim()) return;

      updateUI({
        options: staticText
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
          .map((line) => {
            const [label, ...valueParts] = line.split(":");
            const value = valueParts.join(":").trim();
            return {
              label: label.trim(),
              value: value || label.trim(),
            };
          }),
      });
    }, 500);

    return () => clearTimeout(id);
  }, [staticText]);

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
          const [label, ...valueParts] = pair.split(":");
          const value = valueParts.join(":").trim();

          if (!label || !value) return null;

          return {
            label: label.trim(),
            value,
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
      {/* HEADER */}
      <div>
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          UI Settings
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Configure how this field appears in forms
          </p>
          <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">
            {isReference ? "Reference" : ui.widget || "Default"}
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-gray-300 dark:border-gray-700">
        {[
          { id: "basic", label: "Basic", icon: "⚙️" },
          { id: "options", label: "Options", icon: "📋" },
          { id: "layout", label: "Layout", icon: "📐" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
              activeSection === tab.id
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* BASIC SETTINGS */}
      {activeSection === "basic" && (
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Placeholder Text
            </label>
            <input
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter placeholder text"
              value={ui.placeholder ?? ""}
              onChange={(e) => updateUI({ placeholder: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Help Text
            </label>
            <input
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter help text"
              value={ui.helpText ?? ""}
              onChange={(e) => updateUI({ helpText: e.target.value })}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Appears below the field to provide guidance
            </p>
          </div>
        </div>
      )}

      {/* OPTIONS SETTINGS */}
      {activeSection === "options" && (
        <div className="space-y-4">
          {(ui.widget === "SELECT" || ui.widget === "RADIO") && !isReference && (
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Options Source
              </label>
              <select
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
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
                <option value="STATIC">Static Options</option>
                <option value="DEPENDENT">Dependent Options</option>
              </select>
            </div>
          )}

          {/* STATIC OPTIONS */}
          {(ui.widget === "SELECT" || ui.widget === "RADIO") &&
            dataSource?.type !== "DEPENDENT" &&
            !isReference && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Static Options
                  </label>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {staticText.split('\n').filter(l => l.trim()).length} options
                  </span>
                </div>
                <div className="relative">
                  <textarea
                    className="w-full px-3 py-2 text-sm font-mono border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-y min-h-[120px]"
                    placeholder="label:value (one per line)
Example:
Option 1:value1
Option 2:value2
Option 3:value3"
                    value={staticText}
                    onChange={(e) => setStaticText(e.target.value)}
                    rows={4}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400 dark:text-gray-500">
                    Auto-saves
                  </div>
                </div>
              </div>
            )}

          {/* REFERENCE CONFIG */}
          {isReference && (
            <div className="space-y-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Reference Configuration</span>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Resource
                </label>
                <select
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  value={reference?.resource ?? ""}
                  onChange={(e) =>
                    updateReference({
                      resource: e.target.value,
                      labelField: "",
                      valueField: "",
                    })
                  }
                >
                  <option value="">Select resource...</option>
                  {resources.map((r: ResourceOption) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Label Field
                  </label>
                  <select
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    value={reference?.labelField ?? ""}
                    onChange={(e) => updateReference({ labelField: e.target.value })}
                  >
                    <option value="">Select field...</option>
                    {resourceFields?.map((f: ResourceField) => (
                      <option key={f.key} value={f.key}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Value Field
                  </label>
                  <select
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    value={reference?.valueField ?? ""}
                    onChange={(e) => updateReference({ valueField: e.target.value })}
                  >
                    <option value="">Select field...</option>
                    {resourceFields?.map((f: ResourceField) => (
                      <option key={f.key} value={f.key}>
                        {f.key}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* DEPENDENT CONFIG */}
          {dataSource?.type === "DEPENDENT" && !isReference && (
            <div className="space-y-3 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Dependent Options</span>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Depends On Field
                </label>
                <select
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  value={dataSource.dependsOn ?? ""}
                  onChange={(e) => updateDataSource({ dependsOn: e.target.value })}
                >
                  <option value="">Select parent field...</option>
                  {dependencyCandidates.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              {dataSource.dependsOn && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                      Value Mapping
                    </label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {mappingText.split('\n').filter(l => l.trim()).length} mappings
                    </span>
                  </div>
                  <div className="relative">
                    <textarea
                      className="w-full px-3 py-2 text-xs font-mono border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent resize-y min-h-[100px]"
                      placeholder="parentValue: label:value, label:value
Example:
option1: Label 1:value1, Label 2:value2
option2: Label A:valueA, Label B:valueB"
                      value={mappingText}
                      onChange={(e) => setMappingText(e.target.value)}
                      onBlur={() => saveMapping(mappingText)}
                      rows={4}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-gray-400 dark:text-gray-500">
                      Saves on blur
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Map parent field values to available options
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* LAYOUT SETTINGS */}
      {activeSection === "layout" && (
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Field Width
            </label>
            <select
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
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
              <option value="full">Full width</option>
              <option value="half">Half width (50%)</option>
              <option value="third">One third (33%)</option>
              <option value="two-third">Two thirds (66%)</option>
              <option value="quarter">Quarter width (25%)</option>
            </select>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Width Examples</span>
            </div>
            <div className="space-y-1.5">
              {[
                { label: "Full", width: "full", color: "bg-blue-500" },
                { label: "Half", width: "half", color: "bg-green-500" },
                { label: "Third", width: "third", color: "bg-purple-500" },
                { label: "Two Thirds", width: "two-third", color: "bg-orange-500" },
              ].map((item) => (
                <div key={item.width} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{item.label}</span>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                    <div 
                      className={`h-full ${item.color} ${item.width === 'full' ? 'w-full' : item.width === 'half' ? 'w-1/2' : item.width === 'third' ? 'w-1/3' : 'w-2/3'}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QUICK TIPS */}
      <div className="p-3 bg-gray-50 dark:bg-gray-800/30 border border-gray-300 dark:border-gray-600 rounded">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">UI Configuration Tips</p>
            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
              <li>• Reference fields automatically use SELECT widget</li>
              <li>• Dependent options require a parent SELECT/RADIO field</li>
              <li>• Placeholder appears when field is empty</li>
              <li>• Help text appears below the field</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}