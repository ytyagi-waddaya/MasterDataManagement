// import { useEffect, useState } from "react";
// import {
//   EditorFieldDefinition,
//   EditorNode,
// } from "../../contracts/editor.contract";
// import { EditorFieldType } from "../../contracts/fieldPalette.contract";
// import {
//   Type,
//   Hash,
//   Calendar,
//   CheckSquare,
//   List,
//   File,
//   Database,
//   CheckCircle,
//   Star,
//   ThumbsUp,
// } from "lucide-react";

// // export function GeneralTab({
// //   node,
// //   onChange,
// // }: {
// //   node: Extract<EditorNode, { kind: "FIELD" }>;
// //   onChange: (node: EditorNode) => void;
// // }) {
// //   const f = node.field;
// //   const fieldType = f.type as EditorFieldType;

// //   function update(patch: Partial<typeof f>) {
// //     onChange({
// //       ...node,
// //       field: { ...f, ...patch },
// //     });
// //   }

// export function GeneralTab({
//   definition,
//   onChange,
// }: {
//   definition: EditorFieldDefinition;
//   onChange: (def: EditorFieldDefinition) => void;
// }) {
//   const f = definition;

//   function update(patch: Partial<EditorFieldDefinition>) {
//     onChange({ ...definition, ...patch });
//   }

//   function parseDefault(value: string) {
//     switch (fieldType) {
//       case "number":
//       case "currency":
//       case "percentage":
//         return value === "" ? undefined : Number(value);
//       case "boolean":
//         return value === "true";
//       default:
//         return value;
//     }
//   }

//   const fieldIcons: Record<EditorFieldType, React.ComponentType<any>> = {
//     text: Type,
//     textarea: Type,
//     rich_text: Type,
//     email: Type,
//     phone: Type,
//     url: Type,
//     password: Type,
//     number: Hash,
//     currency: Hash,
//     percentage: Hash,
//     boolean: CheckSquare,
//     consent: CheckSquare,
//     select: List,
//     multi_select: List,
//     radio: List,
//     rating: Star,
//     scale: ThumbsUp,
//     matrix: Hash,
//     date: Calendar,
//     datetime: Calendar,
//     file: File,
//     image: File,
//     reference: Database,
//     multi_reference: Database,
//     user: Database,
//     role: Database,
//     status: CheckCircle,
//     approval: CheckCircle,
//     checklist: List,
//     captcha: CheckCircle,
//     json: Database,
//   };

//   const FieldIcon = fieldIcons[fieldType] || Type;
//   const [optionsText, setOptionsText] = useState("");

//   useEffect(() => {
//     setOptionsText(
//       f.options
//         ?.map((o) =>
//           o.label === o.value ? o.label : `${o.label} | ${o.value}`,
//         )
//         .join("\n") ?? "",
//     );
//   }, [f.options, node.id]);

//   return (
//     <div className="space-y-4">
//       {/* Label */}
//       <div>
//         <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
//           Label
//         </label>
//         <input
//           value={f.label}
//           onChange={(e) => update({ label: e.target.value })}
//           placeholder="Field label"
//           className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
//         />
//       </div>

//       {/* Description */}
//       {/* System Description */}
//       <div>
//         <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
//           Description (System)
//         </label>
//         <textarea
//           value={f.description ?? ""}
//           onChange={(e) => update({ description: e.target.value })}
//           placeholder="What this field represents in the system"
//           className="w-full text-sm px-3 py-2 rounded border ..."
//         />
//       </div>

//       {/* Help Text */}
//       <div>
//         <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
//           Help Text (User)
//         </label>
//         <textarea
//           value={f.helpText ?? ""}
//           onChange={(e) => update({ helpText: e.target.value })}
//           placeholder="Guidance shown to users"
//           className="w-full text-sm px-3 py-2 rounded border ..."
//         />
//       </div>

//       {/* Field Type */}
//       <div>
//         <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
//           Field Type
//         </label>
//         <div className="flex items-center gap-2 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
//           <FieldIcon className="h-4 w-4 text-gray-500" />
//           <span className="text-sm text-gray-700 dark:text-gray-300">
//             {fieldType}
//           </span>
//         </div>
//         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//           Type cannot be changed after creation
//         </p>
//       </div>

//       {/* Placeholder */}
//       {[
//         "text",
//         "textarea",
//         "email",
//         "phone",
//         "url",
//         "number",
//         "currency",
//         "percentage",
//       ].includes(fieldType) && (
//         <div>
//           <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
//             Placeholder
//           </label>
//           <input
//             value={f.placeholder ?? ""}
//             onChange={(e) => update({ placeholder: e.target.value })}
//             placeholder="Example placeholder text"
//             className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
//           />
//         </div>
//       )}

//       {/* ================= DEFAULT VALUE ================= */}

//       {/* BOOLEAN */}
//       {fieldType === "boolean" && (
//         <div>
//           <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
//             Default Value
//           </label>

//           <select
//             value={String(f.default ?? "")}
//             onChange={(e) =>
//               update({
//                 default:
//                   e.target.value === "" ? undefined : e.target.value === "true",
//               })
//             }
//             className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
//           >
//             <option value="">None</option>
//             <option value="true">True</option>
//             <option value="false">False</option>
//           </select>
//         </div>
//       )}

//       {/* NUMBER / TEXT / ETC */}
//       {[
//         "text",
//         "textarea",
//         "email",
//         "phone",
//         "url",
//         "number",
//         "currency",
//         "percentage",
//         "select",
//         "radio",
//       ].includes(fieldType) && (
//         <div>
//           <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
//             Default Value
//           </label>

//           <input
//             value={stringifyDefault(f.default)}
//             onChange={(e) => update({ default: parseDefault(e.target.value) })}
//             placeholder="Default value"
//             className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
//           />
//         </div>
//       )}

//       {["select", "multi_select", "radio"].includes(fieldType) && (
//         <div>
//           <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
//             Options
//           </label>

//           <textarea
//             value={optionsText}
//             onChange={(e) => setOptionsText(e.target.value)}
//             onBlur={() =>
//               update({
//                 options: optionsText
//                   .split("\n")
//                   .filter((l) => l.trim())
//                   .map((line) => {
//                     const [label, value] = line.split("|").map((s) => s.trim());
//                     return { label, value: value ?? label };
//                   }),
//               })
//             }
//             placeholder={`High Priority | HIGH
// Medium Priority | MEDIUM
// Low Priority | LOW`}
//             className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 min-h-20"
//             rows={3}
//           />

//           <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//             One option per line. Use <code>Label | Value</code> if you need a
//             different stored value.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// function stringifyDefault(value: any): string {
//   if (value === undefined || value === null) return "";

//   if (typeof value === "object") {
//     try {
//       return JSON.stringify(value);
//     } catch {
//       return "";
//     }
//   }

//   return String(value);
// }

// import { useEffect, useState } from "react";
// import { EditorFieldDefinition } from "../../contracts/editor.contract";
// import { EditorFieldType } from "../../contracts/fieldPalette.contract";
// import {
//   Type,
//   Hash,
//   Calendar,
//   CheckSquare,
//   List,
//   File,
//   Database,
//   CheckCircle,
//   Star,
//   ThumbsUp,
// } from "lucide-react";

// export function GeneralTab({
//   definition,
//   onChange,
// }: {
//   definition: EditorFieldDefinition;
//   onChange: (def: EditorFieldDefinition) => void;
// }) {
//   const f = definition;
//   const fieldType: EditorFieldType = f.type;

//   function update(patch: Partial<EditorFieldDefinition>) {
//     onChange({ ...definition, ...patch });
//   }

//   function parseDefault(value: string) {
//     switch (fieldType) {
//       case "number":
//       case "currency":
//       case "percentage":
//         return value === "" ? undefined : Number(value);
//       case "boolean":
//         return value === "true";
//       default:
//         return value;
//     }
//   }

//   const fieldIcons: Record<EditorFieldType, React.ComponentType<any>> = {
//     text: Type,
//     textarea: Type,
//     rich_text: Type,
//     email: Type,
//     phone: Type,
//     url: Type,
//     password: Type,
//     number: Hash,
//     currency: Hash,
//     percentage: Hash,
//     boolean: CheckSquare,
//     consent: CheckSquare,
//     select: List,
//     multi_select: List,
//     radio: List,
//     rating: Star,
//     scale: ThumbsUp,
//     matrix: Hash,
//     date: Calendar,
//     datetime: Calendar,
//     file: File,
//     image: File,
//     reference: Database,
//     multi_reference: Database,
//     user: Database,
//     role: Database,
//     status: CheckCircle,
//     approval: CheckCircle,
//     checklist: List,
//     captcha: CheckCircle,
//     json: Database,
//   };

//   const FieldIcon = fieldIcons[fieldType];
//   const [optionsText, setOptionsText] = useState("");

//   useEffect(() => {
//     setOptionsText(
//       f.options
//         ?.map((o) =>
//           o.label === o.value ? o.label : `${o.label} | ${o.value}`,
//         )
//         .join("\n") ?? "",
//     );
//   }, [f.options]);

//   return (
//     <div className="space-y-4">
//       {/* Label */}
//       <div>
//         <label className="text-xs font-medium mb-1 block">Label</label>
//         <input
//           value={f.label}
//           onChange={(e) => update({ label: e.target.value })}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>

//       {/* Description */}
//       <div>
//         <label className="text-xs font-medium mb-1 block">
//           Description (System)
//         </label>
//         <textarea
//           value={f.description ?? ""}
//           onChange={(e) => update({ description: e.target.value })}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>

//       {/* Help Text */}
//       <div>
//         <label className="text-xs font-medium mb-1 block">
//           Help Text (User)
//         </label>
//         <textarea
//           value={f.helpText ?? ""}
//           onChange={(e) => update({ helpText: e.target.value })}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>

//       {/* Field Type */}
//       <div className="flex items-center gap-2 px-3 py-2 border rounded bg-gray-50">
//         <FieldIcon className="h-4 w-4" />
//         <span className="text-sm">{fieldType}</span>
//       </div>

//       {/* Placeholder */}
//       {[
//         "text",
//         "textarea",
//         "email",
//         "phone",
//         "url",
//         "number",
//         "currency",
//         "percentage",
//       ].includes(fieldType) && (
//         <div>
//           <label className="text-xs font-medium mb-1 block">Placeholder</label>
//           <input
//             value={f.placeholder ?? ""}
//             onChange={(e) => update({ placeholder: e.target.value })}
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//       )}

//       {/* Default */}
//       {fieldType === "boolean" ? (
//         <select
//           value={String(f.default ?? "")}
//           onChange={(e) =>
//             update({
//               default:
//                 e.target.value === "" ? undefined : e.target.value === "true",
//             })
//           }
//           className="w-full px-3 py-2 border rounded"
//         >
//           <option value="">None</option>
//           <option value="true">True</option>
//           <option value="false">False</option>
//         </select>
//       ) : (
//         <input
//           value={stringifyDefault(f.default)}
//           onChange={(e) => update({ default: parseDefault(e.target.value) })}
//           className="w-full px-3 py-2 border rounded"
//         />
//       )}

//       {/* Options */}
//       {["select", "multi_select", "radio"].includes(fieldType) && (
//         <textarea
//           value={optionsText}
//           onChange={(e) => setOptionsText(e.target.value)}
//           onBlur={() =>
//             update({
//               options: optionsText
//                 .split("\n")
//                 .filter(Boolean)
//                 .map((line) => {
//                   const [label, value] = line.split("|").map((s) => s.trim());
//                   return { label, value: value ?? label };
//                 }),
//             })
//           }
//           className="w-full px-3 py-2 border rounded"
//         />
//       )}
//     </div>
//   );
// }

// function stringifyDefault(value: any): string {
//   if (value == null) return "";
//   if (typeof value === "object") return JSON.stringify(value);
//   return String(value);
// }

///////////////////////
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { EditorFieldDefinition } from "../../contracts/editor.contract";
// import { EditorFieldType } from "../../contracts/fieldPalette.contract";
// import {
//   Type,
//   Hash,
//   Calendar,
//   CheckSquare,
//   List,
//   File,
//   Database,
//   CheckCircle,
//   Star,
//   ThumbsUp,
// } from "lucide-react";

// type Props = {
//   definition: EditorFieldDefinition;
//   onChange: (def: EditorFieldDefinition) => void;
// };

// export function GeneralTab({ definition, onChange }: Props) {
//   const f = definition;
//   const fieldType = f.type;

//   /* ================= HELPERS ================= */

//   function update(patch: Partial<EditorFieldDefinition>) {
//     onChange({ ...definition, ...patch });
//   }

//   const FieldIcon = useMemo(
//     () => fieldIcons[fieldType] ?? Type,
//     [fieldType],
//   );

//   /* ================= DEFAULT ================= */

//   function parseDefault(value: string): any {
//     if (value === "") return undefined;

//     switch (fieldType) {
//       case "number":
//       case "currency":
//       case "percentage":
//         return Number(value);
//       case "boolean":
//       case "consent":
//         return value === "true";
//       case "json":
//         try {
//           return JSON.parse(value);
//         } catch {
//           return value;
//         }
//       default:
//         return value;
//     }
//   }

//   function stringifyDefault(value: any): string {
//     if (value == null) return "";
//     if (typeof value === "object") return JSON.stringify(value, null, 2);
//     return String(value);
//   }

//   /* ================= OPTIONS ================= */

//   const [optionsText, setOptionsText] = useState("");

//   useEffect(() => {
//     setOptionsText(
//       f.options
//         ?.map((o) =>
//           o.label === o.value ? o.label : `${o.label} | ${o.value}`,
//         )
//         .join("\n") ?? "",
//     );
//   }, [f.options]);

//   function commitOptions() {
//     update({
//       options: optionsText
//         .split("\n")
//         .map((l) => l.trim())
//         .filter(Boolean)
//         .map((line) => {
//           const [label, value] = line.split("|").map((s) => s.trim());
//           return { label, value: value ?? label };
//         }),
//     });
//   }

//   /* ================= UI ================= */

//   return (
//     <div className="space-y-4">
//       {/* Label */}
//       <FieldInput
//         label="Label"
//         value={f.label}
//         onChange={(v) => update({ label: v })}
//       />

//       {/* Description */}
//       <FieldTextarea
//         label="Description (System)"
//         value={f.description ?? ""}
//         onChange={(v) => update({ description: v })}
//       />

//       {/* Help Text */}
//       <FieldTextarea
//         label="Help Text (User)"
//         value={f.helpText ?? ""}
//         onChange={(v) => update({ helpText: v })}
//       />

//       {/* Type (readonly) */}
//       <div className="flex items-center gap-2 px-3 py-2 border rounded bg-gray-50 text-sm">
//         <FieldIcon className="h-4 w-4 text-gray-600" />
//         <span className="capitalize">{fieldType.replace("_", " ")}</span>
//       </div>

//       {/* Placeholder */}
//       {supportsPlaceholder(fieldType) && (
//         <FieldInput
//           label="Placeholder"
//           value={f.placeholder ?? ""}
//           onChange={(v) => update({ placeholder: v })}
//         />
//       )}

//       {/* Default value */}
//       <div>
//         <label className="text-xs font-medium mb-1 block">Default value</label>

//         {fieldType === "boolean" || fieldType === "consent" ? (
//           <select
//             value={String(f.default ?? "")}
//             onChange={(e) =>
//               update({
//                 default:
//                   e.target.value === "" ? undefined : e.target.value === "true",
//               })
//             }
//             className="w-full px-3 py-2 border rounded"
//           >
//             <option value="">None</option>
//             <option value="true">True</option>
//             <option value="false">False</option>
//           </select>
//         ) : (
//           <textarea
//             value={stringifyDefault(f.default)}
//             onChange={(e) => update({ default: parseDefault(e.target.value) })}
//             className="w-full px-3 py-2 border rounded font-mono text-xs"
//             rows={2}
//           />
//         )}
//       </div>

//       {/* Options */}
//       {supportsOptions(fieldType) && (
//         <div>
//           <label className="text-xs font-medium mb-1 block">Options</label>
//           <textarea
//             value={optionsText}
//             onChange={(e) => setOptionsText(e.target.value)}
//             onBlur={commitOptions}
//             placeholder="Label | value"
//             className="w-full px-3 py-2 border rounded font-mono text-xs"
//             rows={4}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// /* ======================================================
//    HELPERS
// ====================================================== */

// const fieldIcons: Record<EditorFieldType, any> = {
//   text: Type,
//   textarea: Type,
//   rich_text: Type,
//   email: Type,
//   phone: Type,
//   url: Type,
//   password: Type,
//   number: Hash,
//   currency: Hash,
//   percentage: Hash,
//   boolean: CheckSquare,
//   consent: CheckSquare,
//   select: List,
//   multi_select: List,
//   radio: List,
//   rating: Star,
//   scale: ThumbsUp,
//   matrix: Hash,
//   date: Calendar,
//   datetime: Calendar,
//   file: File,
//   image: File,
//   reference: Database,
//   multi_reference: Database,
//   user: Database,
//   role: Database,
//   status: CheckCircle,
//   approval: CheckCircle,
//   checklist: List,
//   captcha: CheckCircle,
//   json: Database,
// };

// function supportsPlaceholder(type: EditorFieldType) {
//   return [
//     "text",
//     "textarea",
//     "email",
//     "phone",
//     "url",
//     "number",
//     "currency",
//     "percentage",
//   ].includes(type);
// }

// function supportsOptions(type: EditorFieldType) {
//   return ["select", "multi_select", "radio"].includes(type);
// }

// /* ================= SMALL UI HELPERS ================= */

// function FieldInput({
//   label,
//   value,
//   onChange,
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
// }) {
//   return (
//     <div>
//       <label className="text-xs font-medium mb-1 block">{label}</label>
//       <input
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full px-3 py-2 border rounded"
//       />
//     </div>
//   );
// }

// function FieldTextarea({
//   label,
//   value,
//   onChange,
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
// }) {
//   return (
//     <div>
//       <label className="text-xs font-medium mb-1 block">{label}</label>
//       <textarea
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full px-3 py-2 border rounded"
//         rows={2}
//       />
//     </div>
//   );
// }

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { EditorFieldDefinition } from "../../contracts/editor.contract";
// import { EditorFieldType } from "../../contracts/fieldPalette.contract";
// import {
//   Type,
//   Hash,
//   Calendar,
//   CheckSquare,
//   List,
//   File,
//   Database,
//   CheckCircle,
//   Star,
//   ThumbsUp,
//   ChevronDown,
//   Info,
//   HelpCircle,
// } from "lucide-react";

// type Props = {
//   definition: EditorFieldDefinition;
//   onChange: (def: EditorFieldDefinition) => void;
// };

// export function GeneralTab({ definition, onChange }: Props) {
//   const f = definition;
//   const fieldType = f.type;

//   /* ================= HELPERS ================= */

//   function update(patch: Partial<EditorFieldDefinition>) {
//     onChange({ ...definition, ...patch });
//   }

//   const FieldIcon = useMemo(
//     () => fieldIcons[fieldType] ?? Type,
//     [fieldType],
//   );

//   /* ================= DEFAULT ================= */

//   function parseDefault(value: string): any {
//     if (value === "") return undefined;

//     switch (fieldType) {
//       case "number":
//       case "currency":
//       case "percentage":
//         return Number(value);
//       case "boolean":
//       case "consent":
//         return value === "true";
//       case "json":
//         try {
//           return JSON.parse(value);
//         } catch {
//           return value;
//         }
//       default:
//         return value;
//     }
//   }

//   function stringifyDefault(value: any): string {
//     if (value == null) return "";
//     if (typeof value === "object") return JSON.stringify(value, null, 2);
//     return String(value);
//   }

//   /* ================= OPTIONS ================= */

//   const [optionsText, setOptionsText] = useState("");

//   useEffect(() => {
//     setOptionsText(
//       f.options
//         ?.map((o) =>
//           o.label === o.value ? o.label : `${o.label} | ${o.value}`,
//         )
//         .join("\n") ?? "",
//     );
//   }, [f.options]);

//   function commitOptions() {
//     update({
//       options: optionsText
//         .split("\n")
//         .map((l) => l.trim())
//         .filter(Boolean)
//         .map((line) => {
//           const [label, value] = line.split("|").map((s) => s.trim());
//           return { label, value: value ?? label };
//         }),
//     });
//   }

//   /* ================= UI ================= */

//   return (
//     <div className="space-y-6">
//       {/* Field Type Display */}
//       <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
//         <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
//           <FieldIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//         </div>
//         <div className="flex-1">
//           <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
//             Field Type
//           </div>
//           <div className="text-base font-medium text-gray-800 dark:text-gray-200 capitalize">
//             {fieldType.replace("_", " ")}
//           </div>
//         </div>
//       </div>

//       {/* Configuration Section */}
//       <div className="space-y-5">
//         <div className="flex items-center gap-2">
//           <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
//           <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2">
//             Configuration
//           </span>
//           <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
//         </div>

//         {/* Label */}
//         <FieldInput
//           label="Label"
//           value={f.label}
//           onChange={(v) => update({ label: v })}
//           placeholder="Enter field label"
//           icon={<Type className="h-4 w-4" />}
//         />

//         {/* Placeholder */}
//         {supportsPlaceholder(fieldType) && (
//           <FieldInput
//             label="Placeholder"
//             value={f.placeholder ?? ""}
//             onChange={(v) => update({ placeholder: v })}
//             placeholder="Enter placeholder text"
//           />
//         )}

//         {/* Default value */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
//             Default Value
//             <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
//           </label>
          
//           {fieldType === "boolean" || fieldType === "consent" ? (
//             <div className="relative">
//               <select
//                 value={String(f.default ?? "")}
//                 onChange={(e) =>
//                   update({
//                     default:
//                       e.target.value === "" ? undefined : e.target.value === "true",
//                   })
//                 }
//                 className="w-full px-4 py-2.5 pl-11 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
//               >
//                 <option value="">No default value</option>
//                 <option value="true">True</option>
//                 <option value="false">False</option>
//               </select>
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                 <CheckSquare className="h-4 w-4" />
//               </div>
//               <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                 <ChevronDown className="h-4 w-4" />
//               </div>
//             </div>
//           ) : (
//             <textarea
//               value={stringifyDefault(f.default)}
//               onChange={(e) => update({ default: parseDefault(e.target.value) })}
//               className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               rows={2}
//               placeholder="Enter default value"
//             />
//           )}
//         </div>

//         {/* Options */}
//         {supportsOptions(fieldType) && (
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
//               Options
//               <Info className="h-3.5 w-3.5 text-gray-400" />
//             </label>
//             <textarea
//               value={optionsText}
//               onChange={(e) => setOptionsText(e.target.value)}
//               onBlur={commitOptions}
//               placeholder={`Option 1 | value1\nOption 2 | value2\nOption 3`}
//               className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               rows={4}
//             />
//             <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
//               One option per line. Use <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-700">Label | Value</code> for different display and stored values.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Documentation Section */}
//       <div className="space-y-5">
//         <div className="flex items-center gap-2">
//           <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
//           <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2">
//             Documentation
//           </span>
//           <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
//         </div>

//         {/* Description */}
//         <FieldTextarea
//           label="Description"
//           value={f.description ?? ""}
//           onChange={(v) => update({ description: v })}
//           placeholder="Internal description for this field"
//           subtitle="Used for system documentation and developer reference"
//         />

//         {/* Help Text */}
//         <FieldTextarea
//           label="Help Text"
//           value={f.helpText ?? ""}
//           onChange={(v) => update({ helpText: v })}
//           placeholder="Guidance text for users"
//           subtitle="Displayed to users below the field"
//         />
//       </div>
//     </div>
//   );
// }

// /* ======================================================
//    HELPERS
// ====================================================== */

// const fieldIcons: Record<EditorFieldType, any> = {
//   text: Type,
//   textarea: Type,
//   rich_text: Type,
//   email: Type,
//   phone: Type,
//   url: Type,
//   password: Type,
//   number: Hash,
//   currency: Hash,
//   percentage: Hash,
//   boolean: CheckSquare,
//   consent: CheckSquare,
//   select: List,
//   multi_select: List,
//   radio: List,
//   rating: Star,
//   scale: ThumbsUp,
//   matrix: Hash,
//   date: Calendar,
//   datetime: Calendar,
//   file: File,
//   image: File,
//   reference: Database,
//   multi_reference: Database,
//   user: Database,
//   role: Database,
//   status: CheckCircle,
//   approval: CheckCircle,
//   checklist: List,
//   captcha: CheckCircle,
//   json: Database,
// };

// function supportsPlaceholder(type: EditorFieldType) {
//   return [
//     "text",
//     "textarea",
//     "email",
//     "phone",
//     "url",
//     "number",
//     "currency",
//     "percentage",
//   ].includes(type);
// }

// function supportsOptions(type: EditorFieldType) {
//   return ["select", "multi_select", "radio"].includes(type);
// }

// /* ================= IMPROVED UI COMPONENTS ================= */

// function FieldInput({
//   label,
//   value,
//   onChange,
//   placeholder = "",
//   icon,
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
//   placeholder?: string;
//   icon?: React.ReactNode;
// }) {
//   return (
//     <div className="space-y-2">
//       <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//         {label}
//       </label>
//       <div className="relative">
//         <input
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           placeholder={placeholder}
//           className="w-full px-4 py-2.5 pl-11 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//         />
//         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//           {icon || <Type className="h-4 w-4" />}
//         </div>
//       </div>
//     </div>
//   );
// }

// function FieldTextarea({
//   label,
//   value,
//   onChange,
//   placeholder = "",
//   subtitle,
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
//   placeholder?: string;
//   subtitle?: string;
// }) {
//   return (
//     <div className="space-y-2">
//       <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//         {label}
//       </label>
//       {subtitle && (
//         <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">{subtitle}</p>
//       )}
//       <textarea
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-y"
//         rows={2}
//       />
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { EditorFieldDefinition } from "../../contracts/editor.contract";
import { EditorFieldType } from "../../contracts/fieldPalette.contract";
import {
  Type,
  Hash,
  Calendar,
  CheckSquare,
  List,
  File,
  Database,
  CheckCircle,
  Star,
  ThumbsUp,
  ChevronDown,
  Info,
  HelpCircle,
} from "lucide-react";

type Props = {
  definition: EditorFieldDefinition;
  onChange: (def: EditorFieldDefinition) => void;
};

export function GeneralTab({ definition, onChange }: Props) {
  const f = definition;
  const fieldType = f.type;

  /* ================= HELPERS ================= */

  function update(patch: Partial<EditorFieldDefinition>) {
    onChange({ ...definition, ...patch });
  }

  const FieldIcon = useMemo(
    () => fieldIcons[fieldType] ?? Type,
    [fieldType],
  );

  /* ================= DEFAULT ================= */

  function parseDefault(value: string): any {
    if (value === "") return undefined;

    switch (fieldType) {
      case "number":
      case "currency":
      case "percentage":
        return Number(value);
      case "boolean":
      case "consent":
        return value === "true";
      case "json":
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      default:
        return value;
    }
  }

  function stringifyDefault(value: any): string {
    if (value == null) return "";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  }

  /* ================= OPTIONS ================= */

  const [optionsText, setOptionsText] = useState("");

  useEffect(() => {
    setOptionsText(
      f.options
        ?.map((o) =>
          o.label === o.value ? o.label : `${o.label} | ${o.value}`,
        )
        .join("\n") ?? "",
    );
  }, [f.options]);

  function commitOptions() {
    update({
      options: optionsText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((line) => {
          const [label, value] = line.split("|").map((s) => s.trim());
          return { label, value: value ?? label };
        }),
    });
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-4">
      {/* Field Type Display - Smaller */}
      <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
          <FieldIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Field Type
          </div>
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200 capitalize">
            {fieldType.replace("_", " ")}
          </div>
        </div>
      </div>

      {/* Configuration Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide px-1.5">
            Configuration
          </span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Label */}
        <CompactFieldInput
          label="Label"
          value={f.label}
          onChange={(v) => update({ label: v })}
          placeholder="Enter field label"
          icon={<Type className="h-3.5 w-3.5" />}
        />

        {/* Placeholder */}
        {supportsPlaceholder(fieldType) && (
          <CompactFieldInput
            label="Placeholder"
            value={f.placeholder ?? ""}
            onChange={(v) => update({ placeholder: v })}
            placeholder="Enter placeholder text"
          />
        )}

        {/* Default value */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
            Default Value
            <HelpCircle className="h-3 w-3 text-gray-400" />
          </label>
          
          {fieldType === "boolean" || fieldType === "consent" ? (
            <div className="relative">
              <select
                value={String(f.default ?? "")}
                onChange={(e) =>
                  update({
                    default:
                      e.target.value === "" ? undefined : e.target.value === "true",
                  })
                }
                className="w-full px-3 py-1.5 pl-9 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="">No default value</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
              <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400">
                <CheckSquare className="h-3.5 w-3.5" />
              </div>
              <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400">
                <ChevronDown className="h-3.5 w-3.5" />
              </div>
            </div>
          ) : (
            <textarea
              value={stringifyDefault(f.default)}
              onChange={(e) => update({ default: parseDefault(e.target.value) })}
              className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              rows={2}
              placeholder="Enter default value"
            />
          )}
        </div>

        {/* Options */}
        {supportsOptions(fieldType) && (
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
              Options
              <Info className="h-3 w-3 text-gray-400" />
            </label>
            <textarea
              value={optionsText}
              onChange={(e) => setOptionsText(e.target.value)}
              onBlur={commitOptions}
              placeholder={`Option 1 | value1\nOption 2 | value2\nOption 3`}
              className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 pt-0.5">
              One option per line. Use <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-xs">Label | Value</code> for different display and stored values.
            </p>
          </div>
        )}
      </div>

      {/* Documentation Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide px-1.5">
            Documentation
          </span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Description */}
        <CompactFieldTextarea
          label="Description"
          value={f.description ?? ""}
          onChange={(v) => update({ description: v })}
          placeholder="Internal description for this field"
          subtitle="Used for system documentation and developer reference"
        />

        {/* Help Text */}
        <CompactFieldTextarea
          label="Help Text"
          value={f.helpText ?? ""}
          onChange={(v) => update({ helpText: v })}
          placeholder="Guidance text for users"
          subtitle="Displayed to users below the field"
        />
      </div>
    </div>
  );
}

/* ======================================================
   HELPERS
====================================================== */

const fieldIcons: Record<EditorFieldType, any> = {
  text: Type,
  textarea: Type,
  rich_text: Type,
  email: Type,
  phone: Type,
  url: Type,
  password: Type,
  number: Hash,
  currency: Hash,
  percentage: Hash,
  boolean: CheckSquare,
  consent: CheckSquare,
  select: List,
  multi_select: List,
  radio: List,
  rating: Star,
  scale: ThumbsUp,
  matrix: Hash,
  date: Calendar,
  datetime: Calendar,
  file: File,
  image: File,
  reference: Database,
  multi_reference: Database,
  user: Database,
  role: Database,
  status: CheckCircle,
  approval: CheckCircle,
  checklist: List,
  captcha: CheckCircle,
  json: Database,
};

function supportsPlaceholder(type: EditorFieldType) {
  return [
    "text",
    "textarea",
    "email",
    "phone",
    "url",
    "number",
    "currency",
    "percentage",
  ].includes(type);
}

function supportsOptions(type: EditorFieldType) {
  return ["select", "multi_select", "radio"].includes(type);
}

/* ================= COMPACT UI COMPONENTS ================= */

function CompactFieldInput({
  label,
  value,
  onChange,
  placeholder = "",
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-1.5 pl-9 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon || <Type className="h-3.5 w-3.5" />}
        </div>
      </div>
    </div>
  );
}

function CompactFieldTextarea({
  label,
  value,
  onChange,
  placeholder = "",
  subtitle,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  subtitle?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {subtitle && (
        <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">{subtitle}</p>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-y"
        rows={2}
      />
    </div>
  );
}