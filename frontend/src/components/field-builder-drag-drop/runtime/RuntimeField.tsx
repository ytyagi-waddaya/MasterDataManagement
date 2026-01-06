
// "use client";

// import { RuntimeField } from "../contracts/runtime.contract";
// import {
//   Calendar,
//   List,
//   Type,
//   Hash,
//   CheckSquare,
//   Upload,
//   DollarSign,
// } from "lucide-react";
// import { FieldUI } from "../contracts/field-config.contract";

// type Props = {
//   field: RuntimeField;
//   value: any;
//   onChange: (v: any) => void;
// };

// /* ================= ICON MAP (WIDGET BASED) ================= */

// const FIELD_ICONS: Record<FieldUI["widget"], any> = {
//   TEXT: Type,
//   TEXTAREA: Type,
//   NUMBER: Hash,
//   CURRENCY: DollarSign,
//   SELECT: List,
//   RADIO: List,
//   CHECKBOX: CheckSquare,
//   DATE: Calendar,
//   DATETIME: Calendar,
//   FILE: Upload,
// };

// export function RuntimeFieldRenderer({
//   field,
//   value,
//   onChange,
// }: Props) {
//   const ui = field.config.ui;
//   if (!ui) return null;

//   const readOnly = field.state.readOnly;
//   const Icon = FIELD_ICONS[ui.widget] ?? Type;

//   return (
//     <div className="space-y-1.5">
//       {/* Input wrapper */}
//       <div className="relative">
//         <Icon
//           size={16}
//           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//         />

//         {renderInput(field, ui, value, onChange, readOnly)}
//       </div>

//       {/* Help text */}
//       {ui.helpText && (
//         <p className="text-xs text-gray-500 dark:text-gray-400">
//           {ui.helpText}
//         </p>
//       )}
//     </div>
//   );
// }

// function renderInput(
//   field: RuntimeField,
//   ui: FieldUI,
//   value: any,
//   onChange: (v: any) => void,
//   readOnly: boolean
// ) {
//   const baseClass = `
//     w-full text-sm px-3 py-2.5 rounded-lg border
//     border-gray-300 dark:border-gray-700
//     bg-white dark:bg-gray-900
//     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
//     transition-colors pl-10
//     ${readOnly ? "bg-gray-50 dark:bg-gray-800 text-gray-500 cursor-not-allowed" : ""}
//   `;

//   switch (ui.widget) {
//     case "TEXT":
//       return (
//         <input
//           type="text"
//           className={baseClass}
//           disabled={readOnly}
//           placeholder={ui.placeholder}
//           value={value ?? ""}
//           onChange={(e) => onChange(e.target.value)}
//         />
//       );

//     case "TEXTAREA":
//       return (
//         <textarea
//           className={baseClass}
//           rows={3}
//           disabled={readOnly}
//           placeholder={ui.placeholder}
//           value={value ?? ""}
//           onChange={(e) => onChange(e.target.value)}
//         />
//       );

//     case "NUMBER":
//     case "CURRENCY":
//       return (
//         <div className="relative">
//           <input
//             type="number"
//             className={baseClass}
//             disabled={readOnly}
//             placeholder={ui.placeholder}
//             value={value ?? ""}
//             onChange={(e) =>
//               onChange(
//                 e.target.value === "" ? undefined : Number(e.target.value)
//               )
//             }
//           />
//           {ui.widget === "CURRENCY" && (
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//               $
//             </div>
//           )}
//         </div>
//       );

//     case "CHECKBOX":
//       return (
//         <label className="flex items-center gap-3 cursor-pointer group">
//           <input
//             type="checkbox"
//             disabled={readOnly}
//             checked={Boolean(value)}
//             onChange={(e) => onChange(e.target.checked)}
//           />
//           <span className="text-sm text-gray-700 dark:text-gray-300">
//             {value ? "Yes" : "No"}
//           </span>
//         </label>
//       );

//     case "SELECT":
//       return (
//         <select
//           className={`${baseClass} appearance-none pr-10`}
//           disabled={readOnly}
//           value={value ?? ""}
//           onChange={(e) => onChange(e.target.value)}
//         >
//           <option value="">
//             {ui.placeholder ?? "Select an option"}
//           </option>
//           {ui.options?.map((o) => (
//             <option key={o.value} value={o.value}>
//               {o.label}
//             </option>
//           ))}
//         </select>
//       );

//     case "DATE":
//     case "DATETIME":
//       return (
//         <input
//           type={ui.widget === "DATETIME" ? "datetime-local" : "date"}
//           className={baseClass}
//           disabled={readOnly}
//           value={value ?? ""}
//           onChange={(e) => onChange(e.target.value)}
//         />
//       );

//     case "FILE":
//       return (
//         <input
//           type="file"
//           disabled={readOnly}
//           onChange={(e) => onChange(e.target.files?.[0])}
//         />
//       );

//     default:
//       return (
//         <div className="text-sm text-gray-500 dark:text-gray-400 p-2">
//           Widget {ui.widget} not implemented
//         </div>
//       );
//   }
// }


// "use client";

// import { RuntimeField } from "../contracts/runtime.contract";
// import { FieldUI } from "../contracts/field-config.contract";

// type Props = {
//   field: RuntimeField;
//   value: any;
//   onChange: (v: any) => void;
// };

// export function RuntimeFieldRenderer({
//   field,
//   value,
//   onChange,
// }: Props) {
//   const ui = field.config.ui;
//   if (!ui) return null;

//   const readOnly = field.state.readOnly;

//   return (
//     <div className="space-y-1.5">
//       {/* Input wrapper */}
//       <div className="relative">
//         {renderInput(field, ui, value, onChange, readOnly)}
//       </div>

//       {/* Help text */}
//       {ui.helpText && (
//         <p className="text-xs text-gray-500 dark:text-gray-400">
//           {ui.helpText}
//         </p>
//       )}
//     </div>
//   );
// }

// function renderInput(
//   field: RuntimeField,
//   ui: FieldUI,
//   value: any,
//   onChange: (v: any) => void,
//   readOnly: boolean
// ) {
//   const baseClass = `
//     w-full text-sm px-3 py-2.5 rounded-lg border
//     border-gray-300 dark:border-gray-700
//     bg-white dark:bg-gray-900
//     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
//     transition-colors
//     ${readOnly ? "bg-gray-50 dark:bg-gray-800 text-gray-500 cursor-not-allowed" : ""}
//   `;

//   switch (ui.widget) {
//     case "TEXT":
//       return (
//         <input
//           type="text"
//           className={baseClass}
//           disabled={readOnly}
//           placeholder={ui.placeholder}
//           value={value ?? ""}
//           onChange={(e) => onChange(e.target.value)}
//         />
//       );

//     case "TEXTAREA":
//       return (
//         <textarea
//           className={baseClass}
//           rows={3}
//           disabled={readOnly}
//           placeholder={ui.placeholder}
//           value={value ?? ""}
//           onChange={(e) => onChange(e.target.value)}
//         />
//       );

//     case "NUMBER":
//     case "CURRENCY":
//       return (
//         <input
//           type="number"
//           className={baseClass}
//           disabled={readOnly}
//           placeholder={ui.placeholder}
//           value={value ?? ""}
//           onChange={(e) =>
//             onChange(
//               e.target.value === "" ? undefined : Number(e.target.value)
//             )
//           }
//         />
//       );

//     case "CHECKBOX":
//       return (
//         <label className="flex items-center gap-3 cursor-pointer">
//           <input
//             type="checkbox"
//             disabled={readOnly}
//             checked={Boolean(value)}
//             onChange={(e) => onChange(e.target.checked)}
//           />
//           <span className="text-sm text-gray-700 dark:text-gray-300">
//             {value ? "Yes" : "No"}
//           </span>
//         </label>
//       );

//     case "SELECT":
//       return (
//         <select
//           className={baseClass}
//           disabled={readOnly}
//           value={value ?? ""}
//           onChange={(e) => onChange(e.target.value)}
//         >
//           <option value="">
//             {ui.placeholder ?? "Select an option"}
//           </option>
//           {ui.options?.map((o) => (
//             <option key={o.value} value={o.value}>
//               {o.label}
//             </option>
//           ))}
//         </select>
//       );

//     case "DATE":
//     case "DATETIME":
//       return (
//         <input
//           type={ui.widget === "DATETIME" ? "datetime-local" : "date"}
//           className={baseClass}
//           disabled={readOnly}
//           value={value ?? ""}
//           onChange={(e) => onChange(e.target.value)}
//         />
//       );

//     case "FILE":
//       return (
//         <input
//           type="file"
//           disabled={readOnly}
//           onChange={(e) => onChange(e.target.files?.[0])}
//         />
//       );

//     default:
//       return (
//         <div className="text-sm text-gray-500 dark:text-gray-400 p-2">
//           Widget {ui.widget} not implemented
//         </div>
//       );
//   }
// }
"use client";

import { RuntimeField } from "../contracts/runtime.contract";
import { FieldUI } from "../contracts/field-config.contract";
import {
  Calendar,
  Clock,
  Check,
  ChevronDown,
  Upload,
  DollarSign,
} from "lucide-react";
import { useState } from "react";

type Props = {
  field: RuntimeField;
  value: any;
  onChange: (v: any) => void;
};

export function RuntimeFieldRenderer({ field, value, onChange }: Props) {
  const ui = field.config.ui;
  if (!ui) return null;

  const readOnly = field.state.readOnly;

  return (
    <div className="space-y-2">
      <div className="relative">
        {renderInput(field, ui, value, onChange, readOnly)}
      </div>

      {ui.helpText && (
        <p className="text-xs text-gray-500 dark:text-gray-400 pl-0.5">
          {ui.helpText}
        </p>
      )}
    </div>
  );
}

function renderInput(
  field: RuntimeField,
  ui: FieldUI,
  value: any,
  onChange: (v: any) => void,
  readOnly: boolean
) {
  // ✅ FIX (widened safely)
const semanticType = field.config.data?.type as string | undefined;


  const baseClass = `
    w-full text-sm px-3 py-2.5 rounded-lg border
    border-gray-200 dark:border-gray-800
    bg-white dark:bg-gray-900
    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
    transition-all duration-150
    ${
      readOnly
        ? "bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 cursor-not-allowed"
        : "hover:border-gray-300 dark:hover:border-gray-700"
    }
  `;

  switch (ui.widget) {
    /* ---------------- TEXT ---------------- */
    case "TEXT":
      return (
        <input
          type={
            semanticType === "email"
              ? "email"
              : semanticType === "password"
              ? "password"
              : semanticType === "url"
              ? "url"
              : semanticType === "phone"
              ? "tel"
              : "text"
          }
          className={baseClass}
          disabled={readOnly}
          placeholder={ui.placeholder}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    /* ---------------- TEXTAREA ---------------- */
    case "TEXTAREA":
      return (
        <div className="relative">
          <textarea
            className={`${baseClass} resize-none`}
            rows={3}
            disabled={readOnly}
            placeholder={ui.placeholder}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {value?.length || 0} chars
          </div>
        </div>
      );

    /* ---------------- NUMBER / PERCENT ---------------- */
    case "NUMBER":
      return (
        <input
          type="number"
          className={baseClass}
          disabled={readOnly}
          placeholder={ui.placeholder}
          value={value ?? ""}
          onChange={(e) =>
            onChange(e.target.value === "" ? undefined : Number(e.target.value))
          }
        />
      );

    /* ---------------- CURRENCY ---------------- */
    case "CURRENCY":
      return (
        <div className="relative">
          <input
            type="number"
            className={`${baseClass} pl-8`}
            disabled={readOnly}
            placeholder={ui.placeholder}
            value={value ?? ""}
            onChange={(e) =>
              onChange(e.target.value === "" ? undefined : Number(e.target.value))
            }
          />
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      );

    /* ---------------- CHECKBOX / BOOLEAN ---------------- */
    case "CHECKBOX":
      return (
        <label className="inline-flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              disabled={readOnly}
              checked={Boolean(value)}
              onChange={(e) => onChange(e.target.checked)}
              className="sr-only peer"
            />
            <div
              className={`
              w-5 h-5 rounded border flex items-center justify-center
              ${value ? "bg-blue-500 border-blue-500" : "border-gray-300"}
              ${readOnly ? "opacity-50" : ""}
            `}
            >
              {value && <Check className="h-3 w-3 text-white" />}
            </div>
          </div>
          <span className="text-sm">
            {ui.placeholder ?? "Enabled"}
          </span>
        </label>
      );

    /* ---------------- SELECT / MULTI ---------------- */
    case "SELECT":
      return (
        <div className="relative">
          <select
            className={`${baseClass} appearance-none pr-10`}
            disabled={readOnly}
            multiple={semanticType === "multi_select"}
            value={
              value ??
              (semanticType === "multi_select" ? [] : "")
            }
            onChange={(e) =>
              onChange(
                semanticType === "multi_select"
                  ? Array.from(e.target.selectedOptions).map((o) => o.value)
                  : e.target.value
              )
            }
          >
            <option value="">
              {ui.placeholder ?? "Select an option"}
            </option>
            {ui.options?.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      );

    /* ---------------- RADIO ---------------- */
    case "RADIO":
      return (
        <div className="space-y-2">
          {ui.options?.map((option) => (
            <label key={option.value} className="flex items-center gap-3">
              <input
                type="radio"
                disabled={readOnly}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      );

    /* ---------------- DATE ---------------- */
    case "DATE":
      return (
        <div className="relative">
          <input
            type="date"
            className={`${baseClass} pl-10`}
            disabled={readOnly}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      );

    /* ---------------- DATETIME ---------------- */
    case "DATETIME":
      return (
        <div className="relative">
          <input
            type="datetime-local"
            className={`${baseClass} pl-10`}
            disabled={readOnly}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      );

    /* ---------------- FILE / IMAGE ---------------- */
    case "FILE":
      return (
        <FileUpload
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={ui.placeholder}
          accept={semanticType === "image" ? "image/*" : undefined}
        />
      );

    default:
      return null;
  }
}

/* ---------------- FILE UPLOAD ---------------- */
function FileUpload({
  value,
  onChange,
  readOnly,
  placeholder,
  accept,
}: {
  value: any;
  onChange: (v: any) => void;
  readOnly: boolean;
  placeholder?: string;
  accept?: string;
}) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div
      className={`border-2 border-dashed p-6 text-center rounded-lg ${
        readOnly ? "opacity-50" : "cursor-pointer"
      }`}
      onClick={() =>
        !readOnly && document.getElementById("file-input")?.click()
      }
    >
      <input
        id="file-input"
        type="file"
        className="hidden"
        disabled={readOnly}
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setFileName(file.name);
            onChange(file);
          }
        }}
      />
      <Upload className="mx-auto mb-2" />
      <p className="text-sm">
        {fileName || placeholder || "Click to upload"}
      </p>
    </div>
  );
}
