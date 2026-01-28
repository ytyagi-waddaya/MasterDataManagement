// import { useState, useEffect, useMemo } from "react";
// import { useFormBuilderStore } from "../state/useFormBuilderStore";
// import { evaluateVisibility } from "../runtime/evaluateVisibility";
// import { evaluateCalculation } from "../runtime/evaluateCalculation";
// import { validateField } from "./validateField";
// import apiClient from "@/lib/api/apiClient";

// /* ======================================================
//    HELPERS
// ====================================================== */

// function widthToSpan(width?: string): number {
//   switch (width) {
//     case "half":
//       return 6;
//     case "third":
//       return 4;
//     case "quarter":
//       return 3;
//     case "two-third":
//       return 8;
//     default:
//       return 12;
//   }
// }

// function isRequired(rules: any[] = []) {
//   return rules.some((r) => r.type === "REQUIRED");
// }

// /* ======================================================
//    COMPONENT
// ====================================================== */

// export function RuntimeField({
//   fieldKey,
//   fields,
//   rowId,
//   preview = false,
// }: any) {
//   const field = fields.find((f: any) => f.meta.key === fieldKey);
//   if (!field || field.meta.deprecated) return null;

//   /* ---------- STORE ---------- */

//   const values = preview
//     ? useFormBuilderStore((s) => s.previewValues)
//     : useFormBuilderStore((s) => s.formValues);

//   const setValueFn = preview
//     ? useFormBuilderStore((s) => s.setPreviewValue)
//     : useFormBuilderStore((s) => s.setFieldValue);

//   const submitErrors = useFormBuilderStore((s) => s.submitErrors);

//   /* ---------- META ---------- */

//   const rules = field.validation?.rules ?? [];
//   const required = isRequired(rules);
//   const submitError = submitErrors?.[fieldKey];
//   const isCalculated = !!field.calculation;

//   /* ---------- VISIBILITY ---------- */

//   if (!evaluateVisibility(field.visibility, values)) return null;

//   /* ---------- STORAGE KEY (REPEATER SAFE) ---------- */

//   const storageKey = rowId ? `${fieldKey}.${rowId}` : fieldKey;

//   /* ---------- CALCULATION ---------- */

//   const calculatedValue = isCalculated
//     ? evaluateCalculation(field.calculation, values)
//     : undefined;

//   /* ---------- STATE ---------- */

//   const [value, setValue] = useState<any>(
//     isCalculated ? calculatedValue : (values[storageKey] ?? ""),
//   );

//   const [localError, setLocalError] = useState<string | null>(null);
//   const error = submitError ?? localError;
//   const [refOptions, setRefOptions] = useState<{ label: string; value: any }[]>(
//     [],
//   );

//   /* ---------- SYNC CALCULATED ---------- */

//   useEffect(() => {
//     if (!isCalculated) return;
//     if (values[storageKey] === calculatedValue) return;

//     setValue(calculatedValue);
//     setValueFn(storageKey, calculatedValue);
//   }, [calculatedValue, isCalculated, storageKey, values, setValueFn]);

//   const isReference = field.meta.category === "REFERENCE";

//   useEffect(() => {
//     if (!isReference || !field.reference) return;

//     // you said you use apiClient.get → GOOD
//     apiClient
//       .get(`/reference/${field.reference.resource}`)
//       .then((res) => {
//         const rows = res.data ?? [];

//         setRefOptions(
//           rows.map((row: any) => ({
//             label: row[field.reference.labelField],
//             value: row[field.reference.valueField],
//           })),
//         );
//       })
//       .catch(() => {
//         setRefOptions([]);
//       });
//   }, [
//     isReference,
//     field.reference?.resource,
//     field.reference?.labelField,
//     field.reference?.valueField,
//   ]);

//   /* ---------- VALIDATION ---------- */

//   function runValidation(val: any) {
//     if (preview || isCalculated) return;
//     setLocalError(validateField(val, rules, field.data.type));
//   }

//   function update(val: any) {
//     if (isCalculated) return;
//     setValue(val);
//     setValueFn(storageKey, val);
//     if (localError) runValidation(val);
//   }

//   /* ======================================================
//      DEPENDENT DROPDOWN (FINAL + SAFE)
//   ====================================================== */

//   const ui = field.ui ?? {};
//   const span = widthToSpan(ui.layout?.width);

//   const parentKey = ui.dataSource?.dependsOn;
//   const parentStorageKey =
//     parentKey && rowId ? `${parentKey}.${rowId}` : parentKey;

//   const parentValue = parentStorageKey ? values[parentStorageKey] : undefined;

// const options = useMemo(() => {
//   if (isReference) {
//     return refOptions;
//   }

//   if (ui.dataSource?.type === "DEPENDENT") {
//     const key = parentValue != null ? String(parentValue) : "";
//     return ui.dataSource.map?.[key] ?? [];
//   }

//   return ui.options ?? [];
// }, [isReference, refOptions, ui.dataSource, ui.options, parentValue]);

//   /* ---------- RESET CHILD ON PARENT CHANGE ---------- */

//   useEffect(() => {
//     if (
//       ui.dataSource?.type !== "DEPENDENT" ||
//       ui.dataSource.resetOnChange === false
//     )
//       return;

//     if (value && !options.some((o: any) => o.value === value)) {
//       setValue("");
//       setValueFn(storageKey, "");
//     }
//   }, [parentValue, options, storageKey, setValueFn, ui.dataSource, value]);

//   /* ======================================================
//      INPUT RENDERER
//   ====================================================== */

//   const baseClass =
//     "border p-2 w-full rounded" +
//     (error ? " border-red-500" : "") +
//     (isCalculated ? " bg-gray-100 cursor-not-allowed" : "");

//   function renderInput() {
//     if (isCalculated) {
//       return <input className={baseClass} value={value ?? ""} disabled />;
//     }

//     switch (ui.widget) {
//       case "TEXT":
//         return (
//           <input
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "TEXTAREA":
//       case "RICH_TEXT":
//         return (
//           <textarea
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "NUMBER":
//       case "CURRENCY":
//         return (
//           <input
//             type="number"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "DATE":
//         return (
//           <input
//             type="date"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "DATETIME":
//         return (
//           <input
//             type="datetime-local"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "CHECKBOX":
//         return (
//           <input
//             type="checkbox"
//             checked={!!value}
//             onChange={(e) => update(e.target.checked)}
//           />
//         );

//       case "FILE":
//         return (
//           <input
//             type="file"
//             className={baseClass}
//             onChange={(e) =>
//               update(e.target.files ? Array.from(e.target.files) : [])
//             }
//           />
//         );

//       case "SELECT":
//         return (
//           <select
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           >
//             <option value="">Select…</option>
//             {options.map((opt: any) => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         );

//       case "RADIO":
//         return (
//           <div className="space-y-1">
//             {options.map((opt: any) => (
//               <label key={opt.value} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   checked={value === opt.value}
//                   onChange={() => update(opt.value)}
//                 />
//                 {opt.label}
//               </label>
//             ))}
//           </div>
//         );

//       default:
//         return null;
//     }
//   }

//   /* ======================================================
//      RENDER
//   ====================================================== */

//   return (
//     <div className={`col-span-${span}`}>
//       <label className="block text-sm font-medium mb-1">
//         {field.meta.label}
//         {required && <span className="ml-1 text-red-500">*</span>}
//         {preview && (
//           <span className="ml-2 text-xs text-blue-400">(preview)</span>
//         )}
//       </label>

//       {renderInput()}

//       {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useFormBuilderStore } from "../state/useFormBuilderStore";
// import { evaluateVisibility } from "../runtime/evaluateVisibility";
// import { evaluateCalculation } from "../runtime/evaluateCalculation";
// import { validateField } from "./validateField";
// import apiClient from "@/lib/api/apiClient";

// /* ======================================================
//    HELPERS
// ====================================================== */

// function widthToSpan(width?: string): number {
//   switch (width) {
//     case "half":
//       return 6;
//     case "third":
//       return 4;
//     case "quarter":
//       return 3;
//     case "two-third":
//       return 8;
//     default:
//       return 12;
//   }
// }

// function isRequired(rules: any[] = []) {
//   return rules.some((r) => r.type === "REQUIRED");
// }

// /* ======================================================
//    COMPONENT
// ====================================================== */

// export function RuntimeField({
//   fieldKey,
//   fields,
//   rowId,
//   preview = false,
// }: any) {
//   const field = fields.find((f: any) => f.meta.key === fieldKey);
//   if (!field || field.meta.deprecated) return null;

//   /* ================= STORE ================= */

//   const values = preview
//     ? useFormBuilderStore((s) => s.previewValues)
//     : useFormBuilderStore((s) => s.formValues);

//   const setValueFn = preview
//     ? useFormBuilderStore((s) => s.setPreviewValue)
//     : useFormBuilderStore((s) => s.setFieldValue);

//   const submitErrors = useFormBuilderStore((s) => s.submitErrors);

//   /* ================= META ================= */

//   const rules = field.validation?.rules ?? [];
//   const required = isRequired(rules);
//   const submitError = submitErrors?.[fieldKey];
//   const isCalculated = !!field.calculation;
//   const isReference = field.meta.category === "REFERENCE";

//   /* ================= VISIBILITY ================= */

//   if (!evaluateVisibility(field.visibility, values)) return null;

//   /* ================= STORAGE KEY ================= */

//   const storageKey = rowId ? `${fieldKey}.${rowId}` : fieldKey;

//   /* ================= CALCULATION ================= */

//   const calculatedValue = isCalculated
//     ? evaluateCalculation(field.calculation, values)
//     : undefined;

//   /* ================= STATE ================= */

//   const [value, setValue] = useState<any>(
//     isCalculated ? calculatedValue : values[storageKey] ?? "",
//   );

//   const [localError, setLocalError] = useState<string | null>(null);
//   const error = submitError ?? localError;

//   const [refOptions, setRefOptions] = useState<
//     { label: string; value: string }[]
//   >([]);

//   /* ================= SYNC CALCULATED ================= */

//   useEffect(() => {
//     if (!isCalculated) return;
//     if (values[storageKey] === calculatedValue) return;

//     setValue(calculatedValue);
//     setValueFn(storageKey, calculatedValue);
//   }, [calculatedValue, isCalculated, storageKey, values, setValueFn]);

//   /* ================= REFERENCE FETCH ================= */

// useEffect(() => {
//   if (!isReference || !field.reference) return;

//   apiClient
//     .get(`/reference/${field.reference.resource}`, {
//       params: {
//         parentValue, // 🔑 enables reference → dependent chaining
//       },
//     })
//     .then((res) => {
//       setRefOptions(
//         res.data.map((row: any) => ({
//           label: row[field.reference.labelField],
//           value: row[field.reference.valueField],
//         }))
//       );
//     });
// }, [isReference, field.reference, parentValue]);

//   /* ================= VALIDATION ================= */

//   function runValidation(val: any) {
//     if (preview || isCalculated) return;
//     setLocalError(validateField(val, rules, field.data.type));
//   }

//   function update(val: any) {
//     if (isCalculated) return;
//     setValue(val);
//     setValueFn(storageKey, val);
//     if (localError) runValidation(val);
//   }

//   /* ================= DEPENDENT LOGIC ================= */

//   const ui = field.ui ?? {};
//   const span = widthToSpan(ui.layout?.width);

//   const parentKey = ui.dataSource?.dependsOn;
//   const parentStorageKey =
//     parentKey && rowId ? `${parentKey}.${rowId}` : parentKey;

//   const parentValue = parentStorageKey
//     ? values[parentStorageKey]
//     : undefined;

//     const options = useMemo(() => {
//   if (isReference) return refOptions;
//   if (ui.dataSource?.type === "DEPENDENT") {
//     return ui.dataSource.map?.[String(parentValue)] ?? [];
//   }
//   return ui.options ?? [];
// }, [isReference, refOptions, parentValue]);

//   const options = useMemo(() => {
//     // 🔹 Reference behaves like SELECT
//     if (isReference) return refOptions;

//     // 🔹 Dependent (parent may be reference or select)
//     if (ui.dataSource?.type === "DEPENDENT") {
//       const key = parentValue != null ? String(parentValue) : "";
//       return ui.dataSource.map?.[key] ?? [];
//     }

//     return ui.options ?? [];
//   }, [isReference, refOptions, ui.dataSource, ui.options, parentValue]);

//   /* ================= RESET ON PARENT CHANGE ================= */

//   useEffect(() => {
//     if (ui.dataSource?.type !== "DEPENDENT") return;
//     if (ui.dataSource.resetOnChange === false) return;

//     if (value && !options.some((o) => o.value === value)) {
//       setValue("");
//       setValueFn(storageKey, "");
//     }
//   }, [parentValue, options]);

//   /* ================= INPUT RENDER ================= */

//   const baseClass =
//     "border p-2 w-full rounded" +
//     (error ? " border-red-500" : "") +
//     (isCalculated ? " bg-gray-100 cursor-not-allowed" : "");

//   function renderInput() {
//     if (isCalculated) {
//       return <input className={baseClass} value={value ?? ""} disabled />;
//     }

//     switch (ui.widget) {
//       case "TEXT":
//         return (
//           <input
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "TEXTAREA":
//       case "RICH_TEXT":
//         return (
//           <textarea
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "NUMBER":
//       case "CURRENCY":
//         return (
//           <input
//             type="number"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "DATE":
//         return (
//           <input
//             type="date"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "DATETIME":
//         return (
//           <input
//             type="datetime-local"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "CHECKBOX":
//         return (
//           <input
//             type="checkbox"
//             checked={!!value}
//             onChange={(e) => update(e.target.checked)}
//           />
//         );

//       case "FILE":
//         return (
//           <input
//             type="file"
//             className={baseClass}
//             onChange={(e) =>
//               update(e.target.files ? Array.from(e.target.files) : [])
//             }
//           />
//         );

//       case "SELECT":
//         return (
//           <select
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           >
//             <option value="">Select…</option>
//             {options.map((opt) => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         );

//       case "RADIO":
//         return (
//           <div className="space-y-1">
//             {options.map((opt) => (
//               <label key={opt.value} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   checked={value === opt.value}
//                   onChange={() => update(opt.value)}
//                 />
//                 {opt.label}
//               </label>
//             ))}
//           </div>
//         );

//       default:
//         return null;
//     }
//   }

//   /* ================= RENDER ================= */

//   return (
//     <div className={`col-span-${span}`}>
//       <label className="block text-sm font-medium mb-1">
//         {field.meta.label}
//         {required && <span className="ml-1 text-red-500">*</span>}
//         {preview && (
//           <span className="ml-2 text-xs text-blue-400">(preview)</span>
//         )}
//       </label>

//       {renderInput()}

//       {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useFormBuilderStore } from "../state/useFormBuilderStore";
// import { evaluateVisibility } from "../runtime/evaluateVisibility";
// import { evaluateCalculation } from "../runtime/evaluateCalculation";
// import { validateField } from "./validateField";
// import apiClient from "@/lib/api/apiClient";

// /* ======================================================
//    HELPERS
// ====================================================== */

// function widthToSpan(width?: string): number {
//   switch (width) {
//     case "half":
//       return 6;
//     case "third":
//       return 4;
//     case "quarter":
//       return 3;
//     case "two-third":
//       return 8;
//     default:
//       return 12;
//   }
// }

// function isRequired(rules: any[] = []) {
//   return rules.some((r) => r.type === "REQUIRED");
// }

// type SelectOption = {
//   label: string;
//   value: string;
// };

// /* ======================================================
//    COMPONENT
// ====================================================== */

// export function RuntimeField({
//   fieldKey,
//   fields,
//   rowId,
//   preview = false,
// }: any) {
//   const field = fields.find((f: any) => f.meta.key === fieldKey);
//   if (!field || field.meta.deprecated) return null;

//   /* ================= STORE ================= */

//   const values = preview
//     ? useFormBuilderStore((s) => s.previewValues)
//     : useFormBuilderStore((s) => s.formValues);

//   const setValueFn = preview
//     ? useFormBuilderStore((s) => s.setPreviewValue)
//     : useFormBuilderStore((s) => s.setFieldValue);

//   const submitErrors = useFormBuilderStore((s) => s.submitErrors);

//   /* ================= META ================= */

//   const rules = field.validation?.rules ?? [];
//   const required = isRequired(rules);
//   const submitError = submitErrors?.[fieldKey];
//   const isCalculated = !!field.calculation;
//   const isReference = field.meta.category === "REFERENCE";

//   /* ================= VISIBILITY ================= */

//   if (!evaluateVisibility(field.visibility, values)) return null;

//   /* ================= STORAGE KEY ================= */

//   const storageKey = rowId ? `${fieldKey}.${rowId}` : fieldKey;

//   /* ================= CALCULATION ================= */

//   const calculatedValue = isCalculated
//     ? evaluateCalculation(field.calculation, values)
//     : undefined;

//   /* ================= STATE ================= */

//   const [value, setValue] = useState<any>(
//     isCalculated ? calculatedValue : (values[storageKey] ?? ""),
//   );

//   const [localError, setLocalError] = useState<string | null>(null);
//   const error = submitError ?? localError;

//   const [refOptions, setRefOptions] = useState<SelectOption[]>([]);

//   /* ================= DEPENDENT CONTEXT (MUST BE EARLY) ================= */

//   const ui = field.ui ?? {};
//   const span = widthToSpan(ui.layout?.width);

//   const parentKey = ui.dataSource?.dependsOn;

//   const parentStorageKey: string | undefined =
//     parentKey && rowId ? `${parentKey}.${rowId}` : parentKey;

//   const parentValue: any =
//     parentStorageKey != null ? values[parentStorageKey] : undefined;

//   /* ================= SYNC CALCULATED ================= */

//   useEffect(() => {
//     if (!isCalculated) return;
//     if (values[storageKey] === calculatedValue) return;

//     setValue(calculatedValue);
//     setValueFn(storageKey, calculatedValue);
//   }, [calculatedValue, isCalculated, storageKey, values, setValueFn]);

//   /* ================= REFERENCE FETCH ================= */

//   useEffect(() => {
//     if (!isReference || !field.reference) return;

//     apiClient
//       .get(`/reference/${field.reference.resource}`, {
//         params: {
//           parentValue, // 🔑 enables reference → dependent chaining
//         },
//       })
//       .then((res) => {
//         const rows = res.data ?? [];
//         setRefOptions(
//           rows.map((row: any) => ({
//             label: row[field.reference.labelField],
//             value: String(row[field.reference.valueField]),
//           })),
//         );
//       })
//       .catch(() => setRefOptions([]));
//   }, [
//     isReference,
//     field.reference?.resource,
//     field.reference?.labelField,
//     field.reference?.valueField,
//     parentValue,
//   ]);

//   /* ================= VALIDATION ================= */

//   function runValidation(val: any) {
//     if (preview || isCalculated) return;
//     setLocalError(validateField(val, rules, field.data.type));
//   }

//   function update(val: any) {
//     if (isCalculated) return;
//     setValue(val);
//     setValueFn(storageKey, val);
//     if (localError) runValidation(val);
//   }

//   /* ================= OPTIONS (SINGLE SOURCE OF TRUTH) ================= */

//   const options: SelectOption[] = useMemo(() => {
//     if (isReference) return refOptions;

//     if (ui.dataSource?.type === "DEPENDENT") {
//       const key = parentValue != null ? String(parentValue) : "";
//       return ui.dataSource.map?.[key] ?? [];
//     }

//     return ui.options ?? [];
//   }, [isReference, refOptions, ui.dataSource, ui.options, parentValue]);

//   /* ================= RESET ON PARENT CHANGE ================= */

//   useEffect(() => {
//     if (ui.dataSource?.type !== "DEPENDENT") return;
//     if (ui.dataSource.resetOnChange === false) return;

//     if (value && !options.some((o) => o.value === value)) {
//       setValue("");
//       setValueFn(storageKey, "");
//     }
//   }, [parentValue, options, storageKey, setValueFn, ui.dataSource, value]);

//   /* ================= INPUT RENDER ================= */

//   const baseClass =
//     "border p-2 w-full rounded" +
//     (error ? " border-red-500" : "") +
//     (isCalculated ? " bg-gray-100 cursor-not-allowed" : "");

//   function renderInput() {
//     if (isCalculated) {
//       return <input className={baseClass} value={value ?? ""} disabled />;
//     }

//     switch (ui.widget) {
//       case "TEXT":
//         return (
//           <input
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "TEXTAREA":
//       case "RICH_TEXT":
//         return (
//           <textarea
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "NUMBER":
//       case "CURRENCY":
//         return (
//           <input
//             type="number"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "DATE":
//         return (
//           <input
//             type="date"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "DATETIME":
//         return (
//           <input
//             type="datetime-local"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "CHECKBOX":
//         return (
//           <input
//             type="checkbox"
//             checked={!!value}
//             onChange={(e) => update(e.target.checked)}
//           />
//         );

//       case "FILE":
//         return (
//           <input
//             type="file"
//             className={baseClass}
//             onChange={(e) =>
//               update(e.target.files ? Array.from(e.target.files) : [])
//             }
//           />
//         );

//       case "SELECT":
//         return (
//           <select
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           >
//             <option value="">Select…</option>
//             {options.map((opt: { label: string; value: string }) => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         );

//       case "RADIO":
//         return (
//           <div className="space-y-1">
//             {options.map((opt: { label: string; value: string }) => (
//               <label key={opt.value} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   checked={value === opt.value}
//                   onChange={() => update(opt.value)}
//                 />
//                 {opt.label}
//               </label>
//             ))}
//           </div>
//         );

//       default:
//         return null;
//     }
//   }

//   /* ================= RENDER ================= */

//   return (
//     <div className={`col-span-${span}`}>
//       <label className="block text-sm font-medium mb-1">
//         {field.meta.label}
//         {required && <span className="ml-1 text-red-500">*</span>}
//         {preview && (
//           <span className="ml-2 text-xs text-blue-400">(preview)</span>
//         )}
//       </label>

//       {renderInput()}

//       {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useFormBuilderStore } from "../state/useFormBuilderStore";
// import { evaluateVisibility } from "../runtime/evaluateVisibility";
// import { evaluateCalculation } from "../runtime/evaluateCalculation";
// import { validateField } from "./validateField";
// import apiClient from "@/lib/api/apiClient";

// /* ======================================================
//    HELPERS
// ====================================================== */

// function widthToSpan(width?: string): number {
//   switch (width) {
//     case "half":
//       return 6;
//     case "third":
//       return 4;
//     case "quarter":
//       return 3;
//     case "two-third":
//       return 8;
//     default:
//       return 12;
//   }
// }

// function isRequired(rules: any[] = []) {
//   return rules.some((r) => r.type === "REQUIRED");
// }

// type SelectOption = {
//   label: string;
//   value: string;
// };

// /* ======================================================
//    COMPONENT
// ====================================================== */

// export function RuntimeField({
//   fieldKey,
//   fields,
//   rowId,
//   preview = false,
// }: any) {
//   const field = fields.find((f: any) => f.meta.key === fieldKey);
//   if (!field || field.meta.deprecated) return null;

//   /* ================= STORE ================= */

//   const values = preview
//     ? useFormBuilderStore((s) => s.previewValues)
//     : useFormBuilderStore((s) => s.formValues);

//   const setValueFn = preview
//     ? useFormBuilderStore((s) => s.setPreviewValue)
//     : useFormBuilderStore((s) => s.setFieldValue);

//   const submitErrors = useFormBuilderStore((s) => s.submitErrors);

//   /* ================= META ================= */

//   const rules = field.validation?.rules ?? [];
//   const required = isRequired(rules);
//   const submitError = submitErrors?.[fieldKey];
//   const isCalculated = Boolean(field.calculation);
//   const isReference = field.meta.category === "REFERENCE";

//   /* ================= VISIBILITY ================= */

//   if (!evaluateVisibility(field.visibility, values)) return null;

//   /* ================= STORAGE KEY ================= */

//   const storageKey = rowId ? `${fieldKey}.${rowId}` : fieldKey;

//   /* ================= CALCULATION ================= */

//   const calculatedValue = isCalculated
//     ? evaluateCalculation(field.calculation, values)
//     : undefined;

//   /* ================= UI / DEPENDENCY CONTEXT ================= */

//   const ui = field.ui ?? {};
//   const span = widthToSpan(ui.layout?.width);

//   const parentKey = ui.dataSource?.dependsOn;
//   const parentStorageKey =
//     parentKey && rowId ? `${parentKey}.${rowId}` : parentKey;

//   const parentValue =
//     parentStorageKey !== undefined ? values[parentStorageKey] : undefined;

//   /* ================= STATE ================= */

//   const [value, setValue] = useState<any>(
//     isCalculated ? calculatedValue : values[storageKey] ?? "",
//   );

//   const [localError, setLocalError] = useState<string | null>(null);
//   const error = submitError ?? localError;

//   const [refOptions, setRefOptions] = useState<SelectOption[]>([]);

//   /* ================= SYNC CALCULATED ================= */

//   useEffect(() => {
//     if (!isCalculated) return;
//     if (values[storageKey] === calculatedValue) return;

//     setValue(calculatedValue);
//     setValueFn(storageKey, calculatedValue);
//   }, [isCalculated, calculatedValue, storageKey, values, setValueFn]);

//   /* ================= REFERENCE FETCH ================= */

//   useEffect(() => {
//     if (!isReference || !field.reference) return;

//     apiClient
//       .get(`/reference/${field.reference.resource}`, {
//         params: parentValue ? { parentValue } : undefined,
//       })
//       .then((res) => {
//         const rows: any[] = res.data ?? [];

//         setRefOptions(
//           rows.map((row) => ({
//             label: String(row[field.reference.labelField]),
//             value: String(row[field.reference.valueField]),
//           })),
//         );
//       })
//       .catch(() => setRefOptions([]));
//   }, [
//     isReference,
//     field.reference?.resource,
//     field.reference?.labelField,
//     field.reference?.valueField,
//     parentValue,
//   ]);

//   /* ================= VALIDATION ================= */

//   function runValidation(val: any) {
//     if (preview || isCalculated) return;
//     setLocalError(validateField(val, rules, field.data.type));
//   }

//   function update(val: any) {
//     if (isCalculated) return;
//     setValue(val);
//     setValueFn(storageKey, val);
//     if (localError) runValidation(val);
//   }

//   /* ================= OPTIONS (SINGLE SOURCE) ================= */

//   const options: SelectOption[] = useMemo(() => {
//     if (isReference) return refOptions;

//     if (ui.dataSource?.type === "DEPENDENT") {
//       const key = parentValue != null ? String(parentValue) : "";
//       return ui.dataSource.map?.[key] ?? [];
//     }

//     return ui.options ?? [];
//   }, [isReference, refOptions, ui.dataSource, ui.options, parentValue]);

//   /* ================= RESET ON PARENT CHANGE ================= */

//   useEffect(() => {
//     if (ui.dataSource?.type !== "DEPENDENT") return;
//     if (ui.dataSource.resetOnChange === false) return;

//     if (value && !options.some((o) => o.value === value)) {
//       setValue("");
//       setValueFn(storageKey, "");
//     }
//   }, [parentValue, options, storageKey, setValueFn, ui.dataSource, value]);

//   /* ================= INPUT RENDER ================= */

//   const baseClass =
//     "border p-2 w-full rounded" +
//     (error ? " border-red-500" : "") +
//     (isCalculated ? " bg-gray-100 cursor-not-allowed" : "");

//   function renderInput() {
//     if (isCalculated) {
//       return <input className={baseClass} value={value ?? ""} disabled />;
//     }

//     switch (ui.widget) {
//       case "TEXT":
//         return (
//           <input
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "TEXTAREA":
//       case "RICH_TEXT":
//         return (
//           <textarea
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "NUMBER":
//       case "CURRENCY":
//         return (
//           <input
//             type="number"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "DATE":
//         return (
//           <input
//             type="date"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "DATETIME":
//         return (
//           <input
//             type="datetime-local"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "CHECKBOX":
//         return (
//           <input
//             type="checkbox"
//             checked={Boolean(value)}
//             onChange={(e) => update(e.target.checked)}
//           />
//         );

//       case "FILE":
//         return (
//           <input
//             type="file"
//             className={baseClass}
//             onChange={(e) =>
//               update(e.target.files ? Array.from(e.target.files) : [])
//             }
//           />
//         );

//       case "SELECT":
//         return (
//           <select
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           >
//             <option value="">Select…</option>
//             {options.map((opt) => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         );

//       case "RADIO":
//         return (
//           <div className="space-y-1">
//             {options.map((opt) => (
//               <label key={opt.value} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   checked={value === opt.value}
//                   onChange={() => update(opt.value)}
//                 />
//                 {opt.label}
//               </label>
//             ))}
//           </div>
//         );

//       default:
//         return null;
//     }
//   }

//   /* ================= RENDER ================= */

//   return (
//     <div className={`col-span-${span}`}>
//       <label className="block text-sm font-medium mb-1">
//         {field.meta.label}
//         {required && <span className="ml-1 text-red-500">*</span>}
//         {preview && (
//           <span className="ml-2 text-xs text-blue-400">(preview)</span>
//         )}
//       </label>

//       {renderInput()}

//       {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useFormBuilderStore } from "../state/useFormBuilderStore";
// import { evaluateVisibility } from "../runtime/evaluateVisibility";
// import { evaluateCalculation } from "../runtime/evaluateCalculation";
// import { validateField } from "./validateField";
// import { useReferenceData } from "@/lib/resource/hook/useResource";

// /* ======================================================
//    HELPERS
// ====================================================== */

// function widthToSpan(width?: string): number {
//   switch (width) {
//     case "half":
//       return 6;
//     case "third":
//       return 4;
//     case "quarter":
//       return 3;
//     case "two-third":
//       return 8;
//     default:
//       return 12;
//   }
// }

// function isRequired(rules: any[] = []) {
//   return rules.some((r) => r.type === "REQUIRED");
// }

// type SelectOption = {
//   label: string;
//   value: string;
// };

// /* ======================================================
//    COMPONENT
// ====================================================== */

// export function RuntimeField({
//   fieldKey,
//   fields,
//   rowId,
//   preview = false,
// }: any) {
//   const field = fields.find((f: any) => f.meta.key === fieldKey);
//   if (!field || field.meta.deprecated) return null;

//   /* ================= STORE ================= */

//   const values = preview
//     ? useFormBuilderStore((s) => s.previewValues)
//     : useFormBuilderStore((s) => s.formValues);

//   const setValueFn = preview
//     ? useFormBuilderStore((s) => s.setPreviewValue)
//     : useFormBuilderStore((s) => s.setFieldValue);

//   const submitErrors = useFormBuilderStore((s) => s.submitErrors);

//   /* ================= META ================= */

//   const rules = field.validation?.rules ?? [];
//   const required = isRequired(rules);
//   const submitError = submitErrors?.[fieldKey];
//   const isCalculated = Boolean(field.calculation);
//   const isReference = field.meta.category === "REFERENCE";

//   /* ================= VISIBILITY ================= */

//   if (!evaluateVisibility(field.visibility, values)) return null;

//   /* ================= STORAGE KEY ================= */

//   const storageKey = rowId ? `${fieldKey}.${rowId}` : fieldKey;

//   /* ================= CALCULATION ================= */

//   const calculatedValue = isCalculated
//     ? evaluateCalculation(field.calculation, values)
//     : undefined;

//   /* ================= UI / DEPENDENCY CONTEXT ================= */

//   const ui = field.ui ?? {};
//   const span = widthToSpan(ui.layout?.width);

//   const parentKey = ui.dataSource?.dependsOn;
//   const parentStorageKey =
//     parentKey && rowId ? `${parentKey}.${rowId}` : parentKey;

//   const parentValue =
//     parentStorageKey !== undefined ? values[parentStorageKey] : undefined;

//   /* ================= STATE ================= */

//   const [value, setValue] = useState<any>(
//     isCalculated ? calculatedValue : (values[storageKey] ?? ""),
//   );

//   const [localError, setLocalError] = useState<string | null>(null);
//   const error = submitError ?? localError;

//   const [refOptions, setRefOptions] = useState<SelectOption[]>([]);

//   /* ================= SYNC CALCULATED ================= */

//   useEffect(() => {
//     if (!isCalculated) return;
//     if (values[storageKey] === calculatedValue) return;

//     setValue(calculatedValue);
//     setValueFn(storageKey, calculatedValue);
//   }, [isCalculated, calculatedValue, storageKey, values, setValueFn]);

//   /* ================= REFERENCE FETCH ================= */

//   // useEffect(() => {
//   //   if (!isReference || !field.reference) return;

//   //   apiClient
//   //     .get(`/resource/${field.reference.resource}`, {
//   //       params: parentValue ? { parentValue } : undefined,
//   //     })
//   //     .then((res) => {
//   //       const rows: any[] = res.data?.data ?? [];

//   //       setRefOptions(
//   //         rows.map((row) => ({
//   //           label: String(row.data?.[field.reference.labelField]),
//   //           value: String(row.id ?? row.data?.[field.reference.valueField]),
//   //         })),
//   //       );
//   //     })
//   //     .catch(() => setRefOptions([]));
//   // }, [
//   //   isReference,
//   //   field.reference?.resource,
//   //   field.reference?.labelField,
//   //   field.reference?.valueField,
//   //   parentValue,
//   // ]);

// const {
//   data: referenceOptions = [],
//   isLoading: isReferenceLoading,
// } = useReferenceData(
//   field.reference?.valueField,   // ✅ referencing field
//   parentValue ? String(parentValue) : undefined
// );

//     console.log("REFERENCE FIELD:",field);
//   useEffect(() => {
//   if (isReference) {
//     console.log("REFERENCE OPTIONS", {
//       resource: field.key,
//       options: refOptions,
//     });
//   }
// }, [refOptions]);

//   /* ================= VALIDATION ================= */

//   function runValidation(val: any) {
//     if (preview || isCalculated) return;
//     setLocalError(validateField(val, rules, field.data.type));
//   }

//   function update(val: any) {
//     if (isCalculated) return;
//     setValue(val);
//     setValueFn(storageKey, val);
//     if (localError) runValidation(val);
//   }

//   /* ================= OPTIONS (SINGLE SOURCE) ================= */

//   // const options: SelectOption[] = useMemo(() => {
//   //   if (isReference) return refOptions;

//   //   if (ui.dataSource?.type === "DEPENDENT") {
//   //     const key = parentValue != null ? String(parentValue) : "";
//   //     return ui.dataSource.map?.[key] ?? [];
//   //   }

//   //   return ui.options ?? [];
//   // }, [isReference, refOptions, ui.dataSource, ui.options, parentValue]);

//   const options: SelectOption[] = useMemo(() => {
//   if (isReference) {
//     return referenceOptions.map((r:any) => ({
//       label: r.label,
//       value: String(r.value),
//     }));
//   }

//   if (ui.dataSource?.type === "DEPENDENT") {
//     const key = parentValue != null ? String(parentValue) : "";
//     return ui.dataSource.map?.[key] ?? [];
//   }

//   return ui.options ?? [];
// }, [isReference, referenceOptions, ui.dataSource, ui.options, parentValue]);

//   /* ================= RESET ON PARENT CHANGE ================= */

//   useEffect(() => {
//     if (ui.dataSource?.type !== "DEPENDENT") return;
//     if (ui.dataSource.resetOnChange === false) return;

//     if (value && !options.some((o) => o.value === value)) {
//       setValue("");
//       setValueFn(storageKey, "");
//     }
//   }, [parentValue, options, storageKey, setValueFn, ui.dataSource, value]);

//   /* ================= INPUT RENDER ================= */

//   const baseClass =
//     "border p-2 w-full rounded" +
//     (error ? " border-red-500" : "") +
//     (isCalculated ? " bg-gray-100 cursor-not-allowed" : "");

//   function renderInput() {
//     if (isCalculated) {
//       return <input className={baseClass} value={value ?? ""} disabled />;
//     }

//     switch (ui.widget) {
//       case "TEXT":
//         return (
//           <input
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "TEXTAREA":
//       case "RICH_TEXT":
//         return (
//           <textarea
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "NUMBER":
//       case "CURRENCY":
//         return (
//           <input
//             type="number"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "DATE":
//         return (
//           <input
//             type="date"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "DATETIME":
//         return (
//           <input
//             type="datetime-local"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "CHECKBOX":
//         return (
//           <input
//             type="checkbox"
//             checked={Boolean(value)}
//             onChange={(e) => update(e.target.checked)}
//           />
//         );

//       case "FILE":
//         return (
//           <input
//             type="file"
//             className={baseClass}
//             onChange={(e) =>
//               update(e.target.files ? Array.from(e.target.files) : [])
//             }
//           />
//         );

//       case "SELECT":
//         return (
//           <select
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           >
//             <option value="">Select…</option>
//             {options.map((opt) => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         );

//       case "RADIO":
//         return (
//           <div className="space-y-1">
//             {options.map((opt) => (
//               <label key={opt.value} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   checked={value === opt.value}
//                   onChange={() => update(opt.value)}
//                 />
//                 {opt.label}
//               </label>
//             ))}
//           </div>
//         );

//       default:
//         return null;
//     }
//   }

//   /* ================= RENDER ================= */

//   return (
//     <div className={`col-span-${span}`}>
//       <label className="block text-sm font-medium mb-1">
//         {field.meta.label}
//         {required && <span className="ml-1 text-red-500">*</span>}
//         {preview && (
//           <span className="ml-2 text-xs text-blue-400">(preview)</span>
//         )}
//       </label>

//       {renderInput()}

//       {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { useFormBuilderStore } from "../state/useFormBuilderStore";
// import { evaluateVisibility } from "../runtime/evaluateVisibility";
// import { evaluateCalculation } from "../runtime/evaluateCalculation";
// import { validateField } from "./validateField";
// import { useReferenceData } from "@/lib/resource/hook/useResource";

// /* ======================================================
//    HELPERS
// ====================================================== */

// function widthToSpan(width?: string): number {
//   switch (width) {
//     case "half":
//       return 6;
//     case "third":
//       return 4;
//     case "quarter":
//       return 3;
//     case "two-third":
//       return 8;
//     default:
//       return 12;
//   }
// }

// function isRequired(rules: any[] = []) {
//   return rules.some((r) => r.type === "REQUIRED");
// }

// type SelectOption = {
//   label: string;
//   value: string;
// };

// /* ======================================================
//    COMPONENT
// ====================================================== */

// export function RuntimeField({
//   fieldKey,
//   fields,
//   rowId,
//   preview = false,
// }: any) {
//   const field = fields.find((f: any) => f.meta.key === fieldKey);
//   if (!field || field.meta.deprecated) return null;

//   /* ================= STORE ================= */

//   const values = preview
//     ? useFormBuilderStore((s) => s.previewValues)
//     : useFormBuilderStore((s) => s.formValues);

//   const setValueFn = preview
//     ? useFormBuilderStore((s) => s.setPreviewValue)
//     : useFormBuilderStore((s) => s.setFieldValue);

//   const submitErrors = useFormBuilderStore((s) => s.submitErrors);

//   /* ================= META ================= */

//   const rules = field.validation?.rules ?? [];
//   const required = isRequired(rules);
//   const submitError = submitErrors?.[fieldKey];
//   const isCalculated = Boolean(field.calculation);
//   const isReference = field.meta.category === "REFERENCE";

//   /* ================= VISIBILITY ================= */

//   if (!evaluateVisibility(field.visibility, values)) return null;

//   /* ================= STORAGE KEY ================= */

//   const storageKey = rowId ? `${fieldKey}.${rowId}` : fieldKey;

//   /* ================= CALCULATION ================= */

//   const calculatedValue = isCalculated
//     ? evaluateCalculation(field.calculation, values)
//     : undefined;

//   /* ================= UI / DEPENDENCY CONTEXT ================= */

//   const ui = field.ui ?? {};
//   const dataSource = field.integration?.dataSource;
//   const span = widthToSpan(ui.layout?.width);

//   const parentKey = dataSource?.dependsOn;
//   const parentStorageKey =
//     parentKey && rowId ? `${parentKey}.${rowId}` : parentKey;

//   const parentValue =
//     parentStorageKey !== undefined ? values[parentStorageKey] : undefined;

//   /* ================= STATE ================= */

//   const [value, setValue] = useState<any>(
//     isCalculated ? calculatedValue : values[storageKey] ?? ""
//   );

//   const [localError, setLocalError] = useState<string | null>(null);
//   const error = submitError ?? localError;

//   /* ================= SYNC CALCULATED ================= */

//   useEffect(() => {
//     if (!isCalculated) return;
//     if (values[storageKey] === calculatedValue) return;

//     setValue(calculatedValue);
//     setValueFn(storageKey, calculatedValue);
//   }, [isCalculated, calculatedValue, storageKey, values, setValueFn]);

//   /* ================= REFERENCE FETCH ================= */

//   const {
//     data: referenceOptions = [],
//   } = useReferenceData(
//     field.reference?.valueField,
//     parentValue ? String(parentValue) : undefined
//   );

//   /* ================= VALIDATION ================= */

//   function runValidation(val: any) {
//     if (preview || isCalculated) return;
//     setLocalError(validateField(val, rules, field.data.type));
//   }

//   function update(val: any) {
//     if (isCalculated) return;
//     setValue(val);
//     setValueFn(storageKey, val);
//     if (localError) runValidation(val);
//   }

//   /* ================= OPTIONS (SINGLE SOURCE) ================= */

//   const options: SelectOption[] = useMemo(() => {
//     if (isReference) {
//       return referenceOptions.map((r: any) => ({
//         label: r.label,
//         value: String(r.value),
//       }));
//     }

//     if (dataSource?.type === "DEPENDENT") {
//       const key = parentValue != null ? String(parentValue) : "";
//       return dataSource.map?.[key] ?? [];
//     }

//     return ui.options ?? [];
//   }, [isReference, referenceOptions, dataSource, ui.options, parentValue]);

//   /* ================= RESET ON PARENT CHANGE ================= */

//   useEffect(() => {
//     if (dataSource?.type !== "DEPENDENT") return;
//     if (dataSource.resetOnChange === false) return;

//     if (value && !options.some((o) => o.value === value)) {
//       setValue("");
//       setValueFn(storageKey, "");
//     }
//   }, [parentValue, options, storageKey, setValueFn, dataSource, value]);

//   /* ================= INPUT RENDER ================= */

//   const baseClass =
//     "border p-2 w-full rounded" +
//     (error ? " border-red-500" : "") +
//     (isCalculated ? " bg-gray-100 cursor-not-allowed" : "");

//   function renderInput() {
//     if (isCalculated) {
//       return <input className={baseClass} value={value ?? ""} disabled />;
//     }

//     switch (ui.widget) {
//       case "TEXT":
//         return (
//           <input
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "TEXTAREA":
//       case "RICH_TEXT":
//         return (
//           <textarea
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "NUMBER":
//       case "CURRENCY":
//         return (
//           <input
//             type="number"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "DATE":
//         return (
//           <input
//             type="date"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "DATETIME":
//         return (
//           <input
//             type="datetime-local"
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           />
//         );

//       case "CHECKBOX":
//         return (
//           <input
//             type="checkbox"
//             checked={Boolean(value)}
//             onChange={(e) => update(e.target.checked)}
//           />
//         );

//       case "FILE":
//         return (
//           <input
//             type="file"
//             className={baseClass}
//             onChange={(e) =>
//               update(e.target.files ? Array.from(e.target.files) : [])
//             }
//           />
//         );

//       case "SELECT":
//         return (
//           <select
//             className={baseClass}
//             value={value ?? ""}
//             onChange={(e) => update(e.target.value)}
//             onBlur={() => runValidation(value)}
//           >
//             <option value="">Select…</option>
//             {options.map((opt) => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         );

//       case "RADIO":
//         return (
//           <div className="space-y-1">
//             {options.map((opt) => (
//               <label key={opt.value} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   checked={value === opt.value}
//                   onChange={() => update(opt.value)}
//                 />
//                 {opt.label}
//               </label>
//             ))}
//           </div>
//         );

//       default:
//         return null;
//     }
//   }

//   /* ================= RENDER ================= */

//   return (
//     <div className={`col-span-${span}`}>
//       <label className="block text-sm font-medium mb-1">
//         {field.meta.label}
//         {required && <span className="ml-1 text-red-500">*</span>}
//         {preview && (
//           <span className="ml-2 text-xs text-blue-400">(preview)</span>
//         )}
//       </label>

//       {renderInput()}

//       {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { evaluateVisibility } from "../runtime/evaluateVisibility";
// import { validateField } from "./validateField";
// import { useReferenceData } from "@/lib/resource/hook/useResource";
// import { useRuntimeFormStore } from "./runtimeFormStore";

// /* ====================================================== */

// function widthToSpan(width?: string): number {
//   switch (width) {
//     case "half":
//       return 6;
//     case "third":
//       return 4;
//     case "quarter":
//       return 3;
//     case "two-third":
//       return 8;
//     default:
//       return 12;
//   }
// }

// function isRequired(rules: any[] = []) {
//   return rules.some((r) => r.type === "REQUIRED");
// }

// export function RuntimeField({
//   fieldKey,
//   fields,
//   mode = "CREATE",
// }: {
//   fieldKey: string;
//   fields: any[];
//   mode?: "PREVIEW" | "CREATE" | "VIEW" | "EDIT";
// }) {
//   const isViewMode = mode === "VIEW";
//   const isPreviewMode = mode === "PREVIEW";

//   const field = fields.find((f: any) => f.meta.key === fieldKey);
//   if (!field || field.meta.deprecated) return null;

//   /* ================= RUNTIME STORE ================= */
//   const values = useRuntimeFormStore((s) => s.values);
//   const setValueFn = useRuntimeFormStore((s) => s.setValue);

//   /* ================= META ================= */
//   const rules = field.validation?.rules ?? [];
//   const required = isRequired(rules);
//   const isCalculated = Boolean(field.calculation);
//   const ui = field.ui ?? {};
//   const span = widthToSpan(ui.layout?.width);
//   const readOnly =
//     isViewMode || isPreviewMode || field.behavior?.readOnly || isCalculated;
//   /* ================= VISIBILITY ================= */
//   if (!evaluateVisibility(field.visibility, values)) return null;

//   const storageKey = fieldKey;
//   const value = values[storageKey] ?? "";

//   const [localError, setLocalError] = useState<string | null>(null);

//   function runValidation(val: any) {
//     if (isCalculated) return;
//     setLocalError(validateField(val, rules, field.data.type));
//   }

//   function update(val: any) {
//     if (isCalculated) return;
//     setValueFn(storageKey, val);
//     if (localError) runValidation(val);
//   }

//   /* ================= OPTIONS ================= */
//   const reference = field.integration?.reference;
//   const dataSource = field.integration?.dataSource;

//   const parentValue = dataSource?.dependsOn
//     ? values[dataSource.dependsOn]
//     : undefined;

//   const { data: referenceOptions = [] } = useReferenceData(
//     reference?.valueField,
//     parentValue ? String(parentValue) : undefined,
//   );

//   const options = useMemo(() => {
//     if (reference) {
//       return referenceOptions.map((r: any) => ({
//         label: r.label,
//         value: String(r.value),
//       }));
//     }

//     if (dataSource?.type === "DEPENDENT") {
//       return dataSource.map?.[String(parentValue)] ?? [];
//     }

//     return ui.options ?? [];
//   }, [reference, referenceOptions, dataSource, ui.options, parentValue]);

//   const baseClass =
//     "border p-2 w-full rounded" +
//     (localError ? " border-red-500" : "") +
//     (isCalculated ? " bg-gray-100 cursor-not-allowed" : "");

//   /* ================= RENDER ================= */

//   return (
//     <div className={`col-span-${span}`}>
//       <label className="block text-sm font-medium mb-1">
//         {field.meta.label}
//         {required && <span className="ml-1 text-red-500">*</span>}
//       </label>

//       {isCalculated ? (
//         <input className={baseClass} value={value} disabled={readOnly} />
//       ) : ui.widget === "SELECT" ? (
//         <select
//           className={baseClass}
//           value={value}
//           onChange={(e) => update(e.target.value)}
//           onBlur={() => runValidation(value)}
//         >
//           <option value="">Select…</option>
//           {options.map((opt: any) => (
//             <option key={opt.value} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <input
//           className={baseClass}
//           value={value}
//           onChange={(e) => update(e.target.value)}
//           onBlur={() => runValidation(value)}
//         />
//       )}

//       {localError && (
//         <div className="text-xs text-red-600 mt-1">{localError}</div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useMemo } from "react";
import { evaluateVisibility } from "../runtime/evaluateVisibility";
import { evaluateCalculation } from "../runtime/evaluateCalculation";
import { validateField } from "./validateField";
import { useReferenceData } from "@/lib/resource/hook/useResource";
import { useRuntimeFormStore } from "./runtimeFormStore";

/* ======================================================
   HELPERS
====================================================== */

function widthToSpan(width?: string): number {
  switch (width) {
    case "half":
      return 6;
    case "third":
      return 4;
    case "quarter":
      return 3;
    case "two-third":
      return 8;
    default:
      return 12;
  }
}

function isRequired(rules: any[] = []) {
  return rules.some((r) => r.type === "REQUIRED");
}

/* ======================================================
   COMPONENT
====================================================== */

export function RuntimeField({
  fieldKey,
  fields,
  rowId,
  mode = "CREATE",
}: {
  fieldKey: string;
  fields: any[];
  rowId?: string; 
  mode?: "PREVIEW" | "CREATE" | "VIEW" | "EDIT";
}) {
  const isPreview = mode === "PREVIEW";
  const isView = mode === "VIEW";
  const isEditable = mode === "CREATE" || mode === "EDIT";

  const field = fields.find((f: any) => f.meta.key === fieldKey);
  if (!field || field.meta.deprecated) return null;

  /* ================= STORE ================= */

  const values = useRuntimeFormStore((s) => s.values);
  const setValueFn = useRuntimeFormStore((s) => s.setValue);

  // const storageKey = fieldKey;
  const storageKey = rowId ? `${rowId}.${fieldKey}` : fieldKey;


  /* ================= META ================= */

  const rules = field.validation?.rules ?? [];
  const required = isRequired(rules);
  const isCalculated = Boolean(field.calculation);
  const ui = field.ui ?? {};
  const span = widthToSpan(ui.layout?.width);

  const readOnly =
    isPreview ||
    isView ||
    field.behavior?.readOnly ||
    isCalculated;

  /* ================= VISIBILITY ================= */

  if (!evaluateVisibility(field.visibility, values)) return null;

  /* ================= VALUE ================= */

  const value =
    isPreview ? "" : values[storageKey] ?? "";

  const [localError, setLocalError] = useState<string | null>(null);

  /* ================= CALCULATION ================= */

  const calculatedValue = isCalculated
    ? evaluateCalculation(field.calculation, values)
    : undefined;

  useEffect(() => {
    if (!isCalculated) return;
    if (values[storageKey] === calculatedValue) return;

    setValueFn(storageKey, calculatedValue);
  }, [isCalculated, calculatedValue, storageKey, values, setValueFn]);

  /* ================= VALIDATION ================= */

  function runValidation(val: any) {
    if (!isEditable) return;
    if (isCalculated) return;
    setLocalError(validateField(val, rules, field.data.type));
  }

  function update(val: any) {
    if (readOnly) return;
    setValueFn(storageKey, val);
    if (localError) runValidation(val);
  }

  /* ================= OPTIONS ================= */

  const reference = field.integration?.reference;
  const dataSource = field.integration?.dataSource;

  const parentValue = dataSource?.dependsOn
    ? values[dataSource.dependsOn]
    : undefined;

  const { data: referenceOptions = [] } = useReferenceData(
    reference?.valueField,
    parentValue ? String(parentValue) : undefined
  );

  const options = useMemo(() => {
    if (reference) {
      return referenceOptions.map((r: any) => ({
        label: r.label,
        value: String(r.value),
      }));
    }

    if (dataSource?.type === "DEPENDENT") {
      return dataSource.map?.[String(parentValue)] ?? [];
    }

    return ui.options ?? [];
  }, [reference, referenceOptions, dataSource, ui.options, parentValue]);

  /* ================= RESET DEPENDENT ================= */

  useEffect(() => {
    if (dataSource?.type !== "DEPENDENT") return;
    if (dataSource.resetOnChange === false) return;

    if (value && !options.some((o: any) => o.value === value)) {
      setValueFn(storageKey, "");
    }
  }, [parentValue, options, value, storageKey, setValueFn, dataSource]);

  /* ================= UI ================= */

  const baseClass =
    "border p-2 w-full rounded " +
    (localError ? "border-red-500 " : "") +
    (readOnly ? "bg-gray-100 cursor-not-allowed" : "");

  function renderInput() {
    if (isCalculated) {
      return <input className={baseClass} value={value} disabled />;
    }

    switch (ui.widget) {
      case "TEXT":
        return (
          <input
            className={baseClass}
            value={value}
            disabled={readOnly}
            onChange={(e) => update(e.target.value)}
            onBlur={() => runValidation(value)}
          />
        );

      case "TEXTAREA":
      case "RICH_TEXT":
        return (
          <textarea
            className={baseClass}
            value={value}
            disabled={readOnly}
            onChange={(e) => update(e.target.value)}
            onBlur={() => runValidation(value)}
          />
        );

      case "NUMBER":
      case "CURRENCY":
        return (
          <input
            type="number"
            className={baseClass}
            value={value}
            disabled={readOnly}
            onChange={(e) => update(e.target.value)}
            onBlur={() => runValidation(value)}
          />
        );

      case "DATE":
        return (
          <input
            type="date"
            className={baseClass}
            value={value}
            disabled={readOnly}
            onChange={(e) => update(e.target.value)}
            onBlur={() => runValidation(value)}
          />
        );

      case "DATETIME":
        return (
          <input
            type="datetime-local"
            className={baseClass}
            value={value}
            disabled={readOnly}
            onChange={(e) => update(e.target.value)}
            onBlur={() => runValidation(value)}
          />
        );

      case "CHECKBOX":
        return (
          <input
            type="checkbox"
            checked={Boolean(value)}
            disabled={readOnly}
            onChange={(e) => update(e.target.checked)}
          />
        );

      case "FILE":
        return (
          <input
            type="file"
            disabled={readOnly}
            onChange={(e) =>
              update(e.target.files ? Array.from(e.target.files) : [])
            }
          />
        );

      case "SELECT":
        return (
          <select
            className={baseClass}
            value={value}
            disabled={readOnly}
            onChange={(e) => update(e.target.value)}
            onBlur={() => runValidation(value)}
          >
            <option value="">Select…</option>
            {options.map((opt: any) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "RADIO":
        return (
          <div className="space-y-1">
            {options.map((opt: any) => (
              <label key={opt.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={value === opt.value}
                  disabled={readOnly}
                  onChange={() => update(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            className={baseClass}
            value={value}
            disabled={readOnly}
            onChange={(e) => update(e.target.value)}
          />
        );
    }
  }

  /* ================= RENDER ================= */

  return (
    <div className={`col-span-${span}`}>
      <label className="block text-sm font-medium mb-1">
        {field.meta.label}
        {required && <span className="ml-1 text-red-500">*</span>}
        {isPreview && (
          <span className="ml-2 text-xs text-blue-400">(preview)</span>
        )}
      </label>

      {renderInput()}

      {localError && (
        <div className="text-xs text-red-600 mt-1">{localError}</div>
      )}
    </div>
  );
}
