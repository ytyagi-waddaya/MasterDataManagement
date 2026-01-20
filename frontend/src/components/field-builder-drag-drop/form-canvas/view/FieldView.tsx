// import { EditorNode } from "../../contracts/editor.contract";

// /* ======================================================
//    FIELD VIEW (EDITOR CANVAS)
// ====================================================== */
// export function FieldView({
//   node,
// }: {
//   node: Extract<EditorNode, { kind: "FIELD" }>;
// }) {
//   const span = node.field.layout.span ?? 12;

//   return (
//     <div
//       className="border rounded-md p-3 bg-background cursor-pointer"
//       style={{ gridColumn: `span ${span}` }}
//     >
//       <div className="text-sm font-medium">
//         {node.field.label}
//       </div>

//       <div className="text-xs text-muted-foreground">
//         {node.field.type}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { EditorNode } from "../../contracts/editor.contract";
// import { 
//   Square, CheckSquare, Hash, ChevronDown, Database,
//   Calendar, Clock, DollarSign, Percent, Image, File,
//   Mail, Phone, Globe, Key, User, CheckCircle,
//   Star, ThumbsUp, List, Upload
// } from "lucide-react";
// import { EditorFieldType } from "../../contracts/fieldPalette.contract";

// /* ======================================================
//    FIELD VIEW (EDITOR CANVAS)
// ====================================================== */
// export function FieldView({
//   node,
// }: {
//   node: Extract<EditorNode, { kind: "FIELD" }>;
// }) {
//   const span = node.field.layout.span ?? 12;
//   const fieldType = node.field.type as EditorFieldType;

//   // Field type icons mapping - using lowercase keys to match EditorFieldType
//   const fieldIcons: Record<EditorFieldType, React.ComponentType<any>> = {
//     // Text
//     text: Square,
//     textarea: Database,
//     rich_text: Database,
//     email: Mail,
//     phone: Phone,
//     url: Globe,
//     password: Key,
    
//     // Numbers
//     number: Hash,
//     currency: DollarSign,
//     percentage: Percent,
    
//     // Boolean
//     boolean: CheckSquare,
//     consent: CheckCircle,
    
//     // Selection
//     select: ChevronDown,
//     multi_select: List,
//     radio: CheckSquare,
//     rating: Star,
//     scale: ThumbsUp,
//     matrix: Hash,
    
//     // Date / Time
//     date: Calendar,
//     datetime: Clock,
    
//     // Files / Media
//     file: File,
//     image: Image,
    
//     // References
//     reference: Database,
//     multi_reference: List,
//     user: User,
//     role: User,
//     status: CheckCircle,
    
//     // Workflow / System
//     approval: CheckCircle,
//     checklist: List,
//     captcha: CheckCircle,
    
//     // Advanced
//     json: Database,
//   };

//   const FieldIcon = fieldIcons[fieldType] || Square;

//   return (
//     <div
//       className="p-3"
//       style={{ gridColumn: `span ${span}` }}
//     >
//       {/* Field header */}
//       <div className="flex items-start justify-between mb-2">
//         <div>
//           <div className="flex items-center gap-2">
//             <FieldIcon className="h-3.5 w-3.5 text-gray-400" />
//             <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
//               {node.field.label}
//               {node.field.required && (
//                 <span className="ml-1 text-red-500">*</span>
//               )}
//             </div>
//           </div>
//           {node.field.description && (
//             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//               {node.field.description}
//             </p>
//           )}
//         </div>
        
//         {/* Field type badge */}
//         <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
//           {fieldType}
//         </div>
//       </div>

//       {/* Input preview */}
//       <div className="mt-2">
//         {/* Text inputs */}
//         {(fieldType === "text" || fieldType === "email" || fieldType === "phone" || 
//           fieldType === "url" || fieldType === "password") && (
//           <div className="h-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 flex items-center">
//             <span className="text-xs text-gray-400">
//               {fieldType === "email" && "email@example.com"}
//               {fieldType === "phone" && "(123) 456-7890"}
//               {fieldType === "url" && "https://example.com"}
//               {fieldType === "password" && "••••••••"}
//               {(fieldType === "text" || fieldType === "rich_text") && "Text input..."}
//             </span>
//           </div>
//         )}
        
//         {/* Textarea */}
//         {(fieldType === "textarea" || fieldType === "rich_text") && (
//           <div className="min-h-16 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1.5">
//             <span className="text-xs text-gray-400">Multiline text...</span>
//           </div>
//         )}
        
//         {/* Number inputs */}
//         {(fieldType === "number" || fieldType === "currency" || fieldType === "percentage") && (
//           <div className="h-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 flex items-center">
//             <span className="text-xs text-gray-400">
//               {fieldType === "currency" && "$0.00"}
//               {fieldType === "percentage" && "0%"}
//               {fieldType === "number" && "0"}
//             </span>
//           </div>
//         )}
        
//         {/* Select */}
//         {(fieldType === "select" || fieldType === "multi_select") && (
//           <div className="h-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 flex items-center justify-between">
//             <span className="text-xs text-gray-400">Select option...</span>
//             <ChevronDown className="h-3 w-3 text-gray-400" />
//           </div>
//         )}
        
//         {/* Boolean */}
//         {fieldType === "boolean" && (
//           <div className="flex items-center gap-2">
//             <div className="h-4 w-4 rounded border border-gray-300 dark:border-gray-700 flex items-center justify-center">
//               <div className="h-2 w-2 bg-gray-300 dark:bg-gray-600 rounded-sm" />
//             </div>
//             <span className="text-xs text-gray-600 dark:text-gray-300">Yes/No</span>
//           </div>
//         )}
        
//         {/* Radio */}
//         {fieldType === "radio" && (
//           <div className="flex items-center gap-2">
//             <div className="h-4 w-4 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center">
//               <div className="h-2 w-2 bg-gray-300 dark:bg-gray-600 rounded-full" />
//             </div>
//             <span className="text-xs text-gray-600 dark:text-gray-300">Option</span>
//           </div>
//         )}
        
//         {/* Rating/Scale */}
//         {(fieldType === "rating" || fieldType === "scale") && (
//           <div className="flex items-center gap-1">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <div key={i} className="h-4 w-4 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800" />
//             ))}
//           </div>
//         )}
        
//         {/* Date */}
//         {(fieldType === "date" || fieldType === "datetime") && (
//           <div className="h-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 flex items-center justify-between">
//             <span className="text-xs text-gray-400">MM/DD/YYYY</span>
//             <Calendar className="h-3 w-3 text-gray-400" />
//           </div>
//         )}
        
//         {/* File/Image */}
//         {(fieldType === "file" || fieldType === "image") && (
//           <div className="h-16 rounded border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
//             <Upload className="h-4 w-4 text-gray-400 mr-2" />
//             <span className="text-xs text-gray-400">Upload {fieldType}</span>
//           </div>
//         )}
        
//         {/* Reference */}
//         {(fieldType === "reference" || fieldType === "multi_reference" || 
//           fieldType === "user" || fieldType === "role") && (
//           <div className="h-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 flex items-center justify-between">
//             <span className="text-xs text-gray-400">Select {fieldType}...</span>
//             <Database className="h-3 w-3 text-gray-400" />
//           </div>
//         )}
        
//         {/* Workflow */}
//         {(fieldType === "approval" || fieldType === "checklist" || fieldType === "captcha") && (
//           <div className="flex items-center gap-2">
//             <CheckCircle className="h-4 w-4 text-gray-400" />
//             <span className="text-xs text-gray-600 dark:text-gray-300">
//               {fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}
//             </span>
//           </div>
//         )}
        
//         {/* JSON */}
//         {fieldType === "json" && (
//           <div className="h-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 flex items-center">
//             <span className="text-xs text-gray-400">{`{ "key": "value" }`}</span>
//           </div>
//         )}
//       </div>

//       {/* Field metadata */}
//       {(node.field.placeholder || node.field.defaultValue) && (
//         <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
//           <div className="flex flex-wrap gap-1.5">
//             {node.field.placeholder && (
//               <div className="text-xs text-gray-500 dark:text-gray-400">
//                 <span className="font-medium">Placeholder:</span> {node.field.placeholder}
//               </div>
//             )}
//             {node.field.defaultValue && (
//               <div className="text-xs text-gray-500 dark:text-gray-400">
//                 <span className="font-medium">Default:</span> {node.field.defaultValue}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { EditorNode } from "../../contracts/editor.contract";
import {
  Square, CheckSquare, Hash, ChevronDown, Database,
  Calendar, Clock, DollarSign, Percent, Image, File,
  Mail, Phone, Globe, Key, User, CheckCircle,
  Star, ThumbsUp, List, Upload,
  Text
} from "lucide-react";
import { EditorFieldType } from "../../contracts/fieldPalette.contract";

/* ======================================================
   FIELD VIEW (EDITOR CANVAS)
====================================================== */

/* ---------- TYPE GROUPS (LOGIC ONLY) ---------- */
const TEXT_INPUT_FIELDS: EditorFieldType[] = [
  "text",
  "email",
  "phone",
  "url",
  "password",
];

const MULTILINE_FIELDS: EditorFieldType[] = [
  "textarea",
  "rich_text",
];

const NUMBER_FIELDS: EditorFieldType[] = [
  "number",
  "currency",
  "percentage",
];

const SELECT_FIELDS: EditorFieldType[] = [
  "select",
  "multi_select",
];

const DATE_FIELDS: EditorFieldType[] = [
  "date",
  "datetime",
];

const FILE_FIELDS: EditorFieldType[] = [
  "file",
  "image",
];

const REFERENCE_FIELDS: EditorFieldType[] = [
  "reference",
  "multi_reference",
  "user",
  "role",
];

const WORKFLOW_FIELDS: EditorFieldType[] = [
  "approval",
  "checklist",
  "captcha",
];

export function FieldView({
  node,
}: {
  node: Extract<EditorNode, { kind: "FIELD" }>;
}) {
  const span = node.field.layout.span ?? 12;
  const fieldType = node.field.type as EditorFieldType;

  /* ---------- ICON MAP ---------- */
  const fieldIcons: Record<EditorFieldType, React.ComponentType<any>> = {
    text: Text,
    textarea: Database,
    rich_text: Database,
    email: Mail,
    phone: Phone,
    url: Globe,
    password: Key,

    number: Hash,
    currency: DollarSign,
    percentage: Percent,

    boolean: CheckSquare,
    consent: CheckCircle,

    select: ChevronDown,
    multi_select: List,
    radio: CheckSquare,
    rating: Star,
    scale: ThumbsUp,
    matrix: Hash,

    date: Calendar,
    datetime: Clock,

    file: File,
    image: Image,

    reference: Database,
    multi_reference: List,
    user: User,
    role: User,
    status: CheckCircle,

    approval: CheckCircle,
    checklist: List,
    captcha: CheckCircle,

    json: Database,
  };

  const FieldIcon = fieldIcons[fieldType] || Square;
console.log("FIELD TYPE:", node.field.type);

  return (
    <div className="p-3" style={{ gridColumn: `span ${span}` }}>
      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <FieldIcon className="h-3.5 w-3.5 text-gray-400" />
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {node.field.label}
              {node.field.required && (
                <span className="ml-1 text-red-500">*</span>
              )}
            </div>
          </div>
          {node.field.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {node.field.description}
            </p>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
          {fieldType}
        </div>
      </div>

      {/* ================= INPUT PREVIEW ================= */}
      <div className="mt-2">
        {/* Text inputs */}
        {TEXT_INPUT_FIELDS.includes(fieldType) && (
          <div className="h-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 flex items-center">
            <span className="text-xs text-gray-400">
              {fieldType === "email" && "email@example.com"}
              {fieldType === "phone" && "(123) 456-7890"}
              {fieldType === "url" && "https://example.com"}
              {fieldType === "password" && "••••••••"}
              {fieldType === "text" && "Text input..."}
            </span>
          </div>
        )}

        {/* Textarea / Rich text */}
        {MULTILINE_FIELDS.includes(fieldType) && (
          <div className="min-h-16 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1.5">
            <span className="text-xs text-gray-400">Multiline text...</span>
          </div>
        )}

        {/* Number inputs */}
        {NUMBER_FIELDS.includes(fieldType) && (
          <div className="h-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 flex items-center">
            <span className="text-xs text-gray-400">
              {fieldType === "currency" && "$0.00"}
              {fieldType === "percentage" && "0%"}
              {fieldType === "number" && "0"}
            </span>
          </div>
        )}

        {/* Select */}
        {SELECT_FIELDS.includes(fieldType) && (
          <div className="h-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">Select option...</span>
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </div>
        )}

        {/* Boolean */}
        {fieldType === "boolean" && (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border border-gray-300 dark:border-gray-700 flex items-center justify-center">
              <div className="h-2 w-2 bg-gray-300 dark:bg-gray-600 rounded-sm" />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300">
              Yes/No
            </span>
          </div>
        )}

        {/* Radio */}
        {fieldType === "radio" && (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center">
              <div className="h-2 w-2 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300">
              Option
            </span>
          </div>
        )}

        {/* Rating / Scale */}
        {(fieldType === "rating" || fieldType === "scale") && (
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-4 w-4 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
              />
            ))}
          </div>
        )}

        {/* Date */}
        {DATE_FIELDS.includes(fieldType) && (
          <div className="h-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">MM/DD/YYYY</span>
            <Calendar className="h-3 w-3 text-gray-400" />
          </div>
        )}

        {/* File / Image */}
        {FILE_FIELDS.includes(fieldType) && (
          <div className="h-16 rounded border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
            <Upload className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-xs text-gray-400">
              Upload {fieldType}
            </span>
          </div>
        )}

        {/* Reference */}
        {REFERENCE_FIELDS.includes(fieldType) && (
          <div className="h-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Select {fieldType}...
            </span>
            <Database className="h-3 w-3 text-gray-400" />
          </div>
        )}

        {/* Workflow */}
        {WORKFLOW_FIELDS.includes(fieldType) && (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-600 dark:text-gray-300">
              {fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}
            </span>
          </div>
        )}

        {/* JSON */}
        {fieldType === "json" && (
          <div className="h-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 flex items-center">
            <span className="text-xs text-gray-400">
              {`{ "key": "value" }`}
            </span>
          </div>
        )}
      </div>

      {/* ================= METADATA ================= */}
      {(node.field.placeholder || node.field.default) && (
        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap gap-1.5">
            {node.field.placeholder && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">Placeholder:</span>{" "}
                {node.field.placeholder}
              </div>
            )}
            {node.field.default && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">Default:</span>{" "}
                {node.field.default}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


