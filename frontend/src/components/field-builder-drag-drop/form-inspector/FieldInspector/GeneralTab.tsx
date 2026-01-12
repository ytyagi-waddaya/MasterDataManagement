// import { EditorNode, LayoutSpan } from "../../contracts/editor.contract";

// export function GeneralTab({
//   node,
//   onChange,
// }: {
//   node: Extract<EditorNode, { kind: "FIELD" }>;
//   onChange: (node: EditorNode) => void;
// }) {
//   const f = node.field;

//   function update(patch: Partial<typeof f>) {
//     onChange({
//       ...node,
//       field: { ...f, ...patch },
//     });
//   }

//   return (
//     <div className="space-y-4 text-sm">
//       <input
//         value={f.label}
//         onChange={(e) => update({ label: e.target.value })}
//         className="w-full border px-2 py-1"
//       />
//     </div>
//   );
// }

// import { EditorNode, LayoutSpan } from "../../contracts/editor.contract";
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
//   node,
//   onChange,
// }: {
//   node: Extract<EditorNode, { kind: "FIELD" }>;
//   onChange: (node: EditorNode) => void;
// }) {
//   const f = node.field;
//   const fieldType = f.type as EditorFieldType;

//   function update(patch: Partial<typeof f>) {
//     onChange({
//       ...node,
//       field: { ...f, ...patch },
//     });
//   }

//   // Field type icons mapping
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

//   return (
//     <div className="space-y-4">
//       {/* Field Label */}
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
//       <div>
//         <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
//           Description
//         </label>
//         <textarea
//           value={f.description ?? ""}
//           onChange={(e) => update({ description: e.target.value })}
//           placeholder="Help text for users"
//           className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 min-h-[60px]"
//           rows={2}
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

//       {/* Layout Span */}
//       <div>
//         <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
//           Width
//         </label>
//         <select
//           value={f.layout.span}
//           onChange={(e) =>
//             update({
//               layout: {
//                 ...f.layout,
//                 span: Number(e.target.value) as LayoutSpan,
//               },
//             })
//           }
//           className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
//         >
//           {[3, 4, 6, 8, 12].map((span) => (
//             <option key={span} value={span}>
//               {span}/12 columns ({Math.round((span / 12) * 100)}%)
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Required Toggle */}
//       <div className="flex items-center justify-between">
//         <div>
//           <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
//             Required
//           </div>
//           <div className="text-xs text-gray-500 dark:text-gray-400">
//             User must fill this field
//           </div>
//         </div>
//         <button
//           onClick={() => update({ required: !f.required })}
//           className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
//             f.required ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"
//           }`}
//         >
//           <span
//             className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//               f.required ? "translate-x-5" : "translate-x-0.5"
//             }`}
//           />
//         </button>
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

//       {/* Default Value */}
//       {[
//         "text",
//         "textarea",
//         "email",
//         "phone",
//         "url",
//         "number",
//         "currency",
//         "percentage",
//         "boolean",
//         "select",
//         "radio",
//       ].includes(fieldType) && (
//         <div>
//           <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
//             Default Value
//           </label>
//           <input
//             value={f.defaultValue ?? ""}
//             onChange={(e) => update({ defaultValue: e.target.value })}
//             placeholder="Default value"
//             className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
//           />
//         </div>
//       )}

//       {/* Options for Select/Multi-select/Radio */}
//       {["select", "multi_select", "radio"].includes(fieldType) && (
//         <div>
//           <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
//             Options
//           </label>
//           <textarea
//             value={f.options?.join("\n") ?? ""}
//             onChange={(e) =>
//               update({
//                 options: e.target.value
//                   .split("\n")
//                   .filter((o) => o.trim())
//                   .map((o) => ({
//                     label: o.trim(),
//                     value: o.trim(),
//                   })),
//               })
//             }
//             placeholder="Option 1\nOption 2\nOption 3"
//             className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 min-h-20"
//             rows={3}
//           />
//           <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//             Enter each option on a new line
//           </p>
//         </div>
//       )}

//       {/* Min/Max for Number fields */}
//       {["number", "currency", "percentage"].includes(fieldType) && (
//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
//               Min Value
//             </label>
//             <input
//               type="number"
//               value={f.min ?? ""}
//               onChange={(e) =>
//                 update({
//                   min: e.target.value ? Number(e.target.value) : undefined,
//                 })
//               }
//               placeholder="Minimum"
//               className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
//               Max Value
//             </label>
//             <input
//               type="number"
//               value={f.max ?? ""}
//               onChange={(e) =>
//                 update({
//                   max: e.target.value ? Number(e.target.value) : undefined,
//                 })
//               }
//               placeholder="Maximum"
//               className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { EditorNode, LayoutSpan } from "../../contracts/editor.contract";
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
} from "lucide-react";

export function GeneralTab({
  node,
  onChange,
}: {
  node: Extract<EditorNode, { kind: "FIELD" }>;
  onChange: (node: EditorNode) => void;
}) {
  const f = node.field;
  const fieldType = f.type as EditorFieldType;

  function update(patch: Partial<typeof f>) {
    onChange({
      ...node,
      field: { ...f, ...patch },
    });
  }

  const fieldIcons: Record<EditorFieldType, React.ComponentType<any>> = {
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

  const FieldIcon = fieldIcons[fieldType] || Type;

  return (
    <div className="space-y-4">
      {/* Label */}
      <div>
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          Label
        </label>
        <input
          value={f.label}
          onChange={(e) => update({ label: e.target.value })}
          placeholder="Field label"
          className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          Description
        </label>
        <textarea
          value={f.description ?? ""}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="Help text for users"
          className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 min-h-[60px]"
          rows={2}
        />
      </div>

      {/* Field Type */}
      <div>
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          Field Type
        </label>
        <div className="flex items-center gap-2 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <FieldIcon className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {fieldType}
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Type cannot be changed after creation
        </p>
      </div>

      {/* Layout Span */}
      <div>
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          Width
        </label>
        <select
          value={f.layout.span}
          onChange={(e) =>
            update({
              layout: {
                ...f.layout,
                span: Number(e.target.value) as LayoutSpan,
              },
            })
          }
          className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
        >
          {[3, 4, 6, 8, 12].map((span) => (
            <option key={span} value={span}>
              {span}/12 columns ({Math.round((span / 12) * 100)}%)
            </option>
          ))}
        </select>
      </div>

      {/* Required Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Required
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            User must fill this field
          </div>
        </div>
        <button
          onClick={() => update({ required: !f.required })}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
            f.required ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              f.required ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      {/* Placeholder */}
      {[
        "text",
        "textarea",
        "email",
        "phone",
        "url",
        "number",
        "currency",
        "percentage",
      ].includes(fieldType) && (
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Placeholder
          </label>
          <input
            value={f.placeholder ?? ""}
            onChange={(e) => update({ placeholder: e.target.value })}
            placeholder="Example placeholder text"
            className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          />
        </div>
      )}

      {/* Default Value */}
      {[
        "text",
        "textarea",
        "email",
        "phone",
        "url",
        "number",
        "currency",
        "percentage",
        "boolean",
        "select",
        "radio",
      ].includes(fieldType) && (
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Default Value
          </label>
          <input
            value={f.defaultValue ?? ""}
            onChange={(e) => update({ defaultValue: e.target.value })}
            placeholder="Default value"
            className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          />
        </div>
      )}

      {/* Options */}
      {["select", "multi_select", "radio"].includes(fieldType) && (
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Options
          </label>
          <textarea
            value={f.options?.map((o) => o.label).join("\n") ?? ""}
            onChange={(e) =>
              update({
                options: e.target.value
                  .split("\n")
                  .filter((o) => o.trim())
                  .map((o) => ({
                    label: o.trim(),
                    value: o.trim(),
                  })),
              })
            }
            placeholder="Option 1\nOption 2\nOption 3"
            className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 min-h-20"
            rows={3}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Enter each option on a new line
          </p>
        </div>
      )}

      {/* Min / Max */}
      {["number", "currency", "percentage"].includes(fieldType) && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Min Value
            </label>
            <input
              type="number"
              value={f.validation?.min ?? ""}
              onChange={(e) =>
                update({
                  validation: {
                    ...f.validation,
                    min: e.target.value ? Number(e.target.value) : undefined,
                  },
                })
              }
              placeholder="Minimum"
              className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Max Value
            </label>
            <input
              type="number"
              value={f.validation?.max ?? ""}
              onChange={(e) =>
                update({
                  validation: {
                    ...f.validation,
                    max: e.target.value ? Number(e.target.value) : undefined,
                  },
                })
              }
              placeholder="Maximum"
              className="w-full text-sm px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
        </div>
      )}
    </div>
  );
}
