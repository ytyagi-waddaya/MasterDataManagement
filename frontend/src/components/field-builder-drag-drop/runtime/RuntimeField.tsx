// "use client";

// import { RuntimeField } from "../contracts/runtime.contract";
// import { FieldUI } from "../contracts/field-config.contract";
// import {
//   Calendar,
//   Clock,
//   Check,
//   ChevronDown,
//   Upload,
//   DollarSign,
// } from "lucide-react";
// import { useState } from "react";

// type Props = {
//   field: RuntimeField;
//   value: any;
//   onChange: (v: any) => void;
// };

// export function RuntimeFieldRenderer({ field, value, onChange }: Props) {
//   const ui = field.config.ui;
//   if (!ui) return null;

//   const readOnly = field.state.readOnly;

//   return (
//     <div className="space-y-2">
//       <div className="relative">
//         {renderInput(field, ui, value, onChange, readOnly)}
//         {/* {field.state.errors?.length ? (
//           <ul className="space-y-1">
//             {field.state.errors.map((err, i) => (
//               <li key={i} className="text-xs text-red-600 dark:text-red-400">
//                 {err}
//               </li>
//             ))}
//           </ul>
//         ) : null} */}
//       </div>

//       {ui.helpText && (
//         <p className="text-xs text-gray-500 dark:text-gray-400 pl-0.5">
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
//   // ✅ FIX (widened safely)
//   const semanticType = field.config.data?.type as string | undefined;

//   const baseClass = `
//     w-full text-sm px-3 py-2.5 rounded-lg border
//     border-gray-200 dark:border-gray-800
//     bg-white dark:bg-gray-900
//     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
//     transition-all duration-150
//     ${
//       readOnly
//         ? "bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 cursor-not-allowed"
//         : "hover:border-gray-300 dark:hover:border-gray-700"
//     }
//   `;

//   switch (ui.widget) {
//     /* ---------------- TEXT ---------------- */
//     case "TEXT":
//       return (
//         <input
//           type={
//             semanticType === "email"
//               ? "email"
//               : semanticType === "password"
//               ? "password"
//               : semanticType === "url"
//               ? "url"
//               : semanticType === "phone"
//               ? "tel"
//               : "text"
//           }
//           className={baseClass}
//           disabled={readOnly}
//           placeholder={ui.placeholder}
//           value={value ?? ""}
//           onChange={(e) => onChange(e.target.value)}
//         />
//       );

//     /* ---------------- TEXTAREA ---------------- */
//     case "TEXTAREA":
//       return (
//         <div className="relative">
//           <textarea
//             className={`${baseClass} resize-none`}
//             rows={3}
//             disabled={readOnly}
//             placeholder={ui.placeholder}
//             value={value ?? ""}
//             onChange={(e) => onChange(e.target.value)}
//           />
//           <div className="absolute bottom-2 right-2 text-xs text-gray-400">
//             {value?.length || 0} chars
//           </div>
//         </div>
//       );

//     /* ---------------- NUMBER / PERCENT ---------------- */
//     case "NUMBER":
//       return (
//         <input
//           type="number"
//           className={baseClass}
//           disabled={readOnly}
//           placeholder={ui.placeholder}
//           value={value ?? ""}
//           onChange={(e) =>
//             onChange(e.target.value === "" ? undefined : Number(e.target.value))
//           }
//         />
//       );

//     /* ---------------- CURRENCY ---------------- */
//     case "CURRENCY":
//       return (
//         <div className="relative">
//           <input
//             type="number"
//             className={`${baseClass} pl-8`}
//             disabled={readOnly}
//             placeholder={ui.placeholder}
//             value={value ?? ""}
//             onChange={(e) =>
//               onChange(
//                 e.target.value === "" ? undefined : Number(e.target.value)
//               )
//             }
//           />
//           <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//         </div>
//       );

//     /* ---------------- CHECKBOX / BOOLEAN ---------------- */
//     case "CHECKBOX":
//       return (
//         <label className="inline-flex items-center gap-3 cursor-pointer group">
//           <div className="relative">
//             <input
//               type="checkbox"
//               disabled={readOnly}
//               checked={Boolean(value)}
//               onChange={(e) => onChange(e.target.checked)}
//               className="sr-only peer"
//             />
//             <div
//               className={`
//               w-5 h-5 rounded border flex items-center justify-center
//               ${value ? "bg-blue-500 border-blue-500" : "border-gray-300"}
//               ${readOnly ? "opacity-50" : ""}
//             `}
//             >
//               {value && <Check className="h-3 w-3 text-white" />}
//             </div>
//           </div>
//           <span className="text-sm">{ui.placeholder ?? "Enabled"}</span>
//         </label>
//       );

//     /* ---------------- SELECT / MULTI ---------------- */
//     case "SELECT":
//       return (
//         <div className="relative">
//           <select
//             className={`${baseClass} appearance-none pr-10`}
//             disabled={readOnly}
//             multiple={semanticType === "multi_select"}
//             value={value ?? (semanticType === "multi_select" ? [] : "")}
//             onChange={(e) =>
//               onChange(
//                 semanticType === "multi_select"
//                   ? Array.from(e.target.selectedOptions).map((o) => o.value)
//                   : e.target.value
//               )
//             }
//           >
//             <option value="">{ui.placeholder ?? "Select an option"}</option>
//             {ui.options?.map((o) => (
//               <option key={o.value} value={o.value}>
//                 {o.label}
//               </option>
//             ))}
//           </select>
//           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//         </div>
//       );

//     /* ---------------- RADIO ---------------- */
//     case "RADIO":
//       return (
//         <div className="space-y-2">
//           {ui.options?.map((option) => (
//             <label key={option.value} className="flex items-center gap-3">
//               <input
//                 type="radio"
//                 disabled={readOnly}
//                 checked={value === option.value}
//                 onChange={() => onChange(option.value)}
//               />
//               <span className="text-sm">{option.label}</span>
//             </label>
//           ))}
//         </div>
//       );

//     /* ---------------- DATE ---------------- */
//     case "DATE":
//       return (
//         <div className="relative">
//           <input
//             type="date"
//             className={`${baseClass} pl-10`}
//             disabled={readOnly}
//             value={value ?? ""}
//             onChange={(e) => onChange(e.target.value)}
//           />
//           <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//         </div>
//       );

//     /* ---------------- DATETIME ---------------- */
//     case "DATETIME":
//       return (
//         <div className="relative">
//           <input
//             type="datetime-local"
//             className={`${baseClass} pl-10`}
//             disabled={readOnly}
//             value={value ?? ""}
//             onChange={(e) => onChange(e.target.value)}
//           />
//           <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//         </div>
//       );

//     /* ---------------- FILE / IMAGE ---------------- */
//     case "FILE":
//       return (
//         <FileUpload
//           value={value}
//           onChange={onChange}
//           readOnly={readOnly}
//           placeholder={ui.placeholder}
//           accept={semanticType === "image" ? "image/*" : undefined}
//         />
//       );

//     default:
//       return null;
//   }
// }

// /* ---------------- FILE UPLOAD ---------------- */
// function FileUpload({
//   value,
//   onChange,
//   readOnly,
//   placeholder,
//   accept,
// }: {
//   value: any;
//   onChange: (v: any) => void;
//   readOnly: boolean;
//   placeholder?: string;
//   accept?: string;
// }) {
//   const [fileName, setFileName] = useState<string | null>(null);

//   return (
//     <div
//       className={`border-2 border-dashed p-6 text-center rounded-lg ${
//         readOnly ? "opacity-50" : "cursor-pointer"
//       }`}
//       onClick={() =>
//         !readOnly && document.getElementById("file-input")?.click()
//       }
//     >
//       <input
//         id="file-input"
//         type="file"
//         className="hidden"
//         disabled={readOnly}
//         accept={accept}
//         onChange={(e) => {
//           const file = e.target.files?.[0];
//           if (file) {
//             setFileName(file.name);
//             onChange(file);
//           }
//         }}
//       />
//       <Upload className="mx-auto mb-2" />
//       <p className="text-sm">{fileName || placeholder || "Click to upload"}</p>
//     </div>
//   );
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
  X,
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
      {renderInput(field, ui, value, onChange, readOnly)}
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
  const semanticType = field.config.data?.type as string | undefined;

  const baseClass = `
    w-full px-3.5 py-3 rounded-xl border
    bg-white dark:bg-gray-900
    text-sm text-gray-900 dark:text-gray-100
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
    transition-all duration-200
    ${
      readOnly
        ? "border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 text-gray-500 cursor-not-allowed"
        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
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
            className={`${baseClass} resize-none min-h-[100px]`}
            rows={3}
            disabled={readOnly}
            placeholder={ui.placeholder}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500">
            {value?.length || 0}
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
            className={`${baseClass} pl-10`}
            disabled={readOnly}
            placeholder={ui.placeholder}
            value={value ?? ""}
            onChange={(e) =>
              onChange(
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center">
            <DollarSign className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
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
                w-5 h-5 rounded-lg border-2 flex items-center justify-center
                transition-all duration-200
                ${value 
                  ? "bg-blue-500 border-blue-500 shadow-sm" 
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                }
                ${readOnly ? "opacity-50" : "group-hover:border-gray-400"}
              `}
            >
              {value && (
                <Check className="h-3 w-3 text-white transition-transform duration-200" />
              )}
            </div>
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {ui.placeholder ?? "Enabled"}
          </span>
        </label>
      );

    /* ---------------- SELECT / MULTI ---------------- */
    case "SELECT":
      if (semanticType === "multi_select") {
        return (
          <MultiSelect
            options={ui.options || []}
            value={Array.isArray(value) ? value : []}
            onChange={onChange}
            readOnly={readOnly}
            placeholder={ui.placeholder}
          />
        );
      }

      return (
        <div className="relative">
          <select
            className={`${baseClass} appearance-none pr-10 cursor-pointer`}
            disabled={readOnly}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">{ui.placeholder ?? "Select..."}</option>
            {ui.options?.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      );

    /* ---------------- RADIO ---------------- */
    case "RADIO":
      return (
        <div className="space-y-2.5">
          {ui.options?.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <input
                  type="radio"
                  disabled={readOnly}
                  checked={value === option.value}
                  onChange={() => onChange(option.value)}
                  className="sr-only peer"
                />
                <div
                  className={`
                    w-4 h-4 rounded-full border-2 flex items-center justify-center
                    transition-all duration-200
                    ${value === option.value
                      ? "border-blue-500"
                      : "border-gray-300 dark:border-gray-600"
                    }
                    ${readOnly ? "" : "group-hover:border-gray-400"}
                  `}
                >
                  {value === option.value && (
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {option.label}
              </span>
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
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
            <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
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
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
            <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
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

/* ---------------- MULTI SELECT ---------------- */
function MultiSelect({
  options,
  value,
  onChange,
  readOnly,
  placeholder,
}: {
  options: Array<{ value: string; label: string }>;
  value: string[];
  onChange: (v: any) => void;
  readOnly: boolean;
  placeholder?: string;
}) {
  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  const toggleOption = (optionValue: string) => {
    if (readOnly) return;
    
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const removeOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  return (
    <div className="space-y-2">
      <div
        className={`
          min-h-12 px-3.5 py-2.5 rounded-xl border
          flex flex-wrap gap-2 items-center
          transition-all duration-200
          ${readOnly
            ? "border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30"
            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer"
          }
        `}
        // onClick={() => !readOnly && document.getElementById("multi-select")?.click()}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map((option) => (
            <div
              key={option.value}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
                       bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300
                       text-xs font-medium"
            >
              {option.label}
              {!readOnly && (
                <button
                  type="button"
                  onClick={(e) => removeOption(option.value, e)}
                  className="hover:bg-blue-100 dark:hover:bg-blue-800/50 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))
        ) : (
          <span className="text-sm text-gray-400 dark:text-gray-500">
            {placeholder || "Select options..."}
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative">
              <input
                type="checkbox"
                disabled={readOnly}
                checked={value.includes(option.value)}
                onChange={() => toggleOption(option.value)}
                className="sr-only peer"
              />
              <div
                className={`
                  w-4 h-4 rounded border flex items-center justify-center
                  transition-all duration-200
                  ${value.includes(option.value)
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  }
                  ${readOnly ? "" : "group-hover:border-gray-400"}
                `}
              >
                {value.includes(option.value) && (
                  <Check className="h-2.5 w-2.5 text-white" />
                )}
              </div>
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onChange(file);
    }
  };

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-xl p-6
        transition-all duration-200
        ${readOnly
          ? "border-gray-200 dark:border-gray-800 bg-gray-50/50 opacity-50"
          : "border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
        }
      `}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={readOnly}
        accept={accept}
        onChange={handleFileChange}
      />
      
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full 
                       bg-gray-100 dark:bg-gray-800 mb-3">
          <Upload className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {fileName || placeholder || "Click to upload"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {accept?.includes("image") ? "PNG, JPG, GIF up to 5MB" : "File up to 10MB"}
        </p>
      </div>
    </div>
  );
}