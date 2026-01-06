// "use client";

// import { Info } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";

// export function ResourceForm({
//   form,
//   errors,
//   touched,
//   setValue,
//   onBlur,
// }: {
//   form: {
//     name: string;
//     description: string | null;
//     isSystem: boolean;
//     isActive: boolean;
//   };
//   errors: Record<string, string>;
//   touched: Record<string, boolean>;
//   setValue: (field: any, value: any) => void;
//   onBlur: (field: any) => void;
// }) {
//   return (
//     <div className="flex flex-col gap-4 py-2">
//       {/* Name */}
//       <div className="flex flex-col gap-1">
//         <label className="text-sm font-medium">Resource Name</label>
//         <input
//           className={`border p-2 rounded ${
//             errors.name ? "border-red-500" : ""
//           }`}
//           value={form.name}
//           onChange={(e) => setValue("name", e.target.value)}
//           onBlur={() => onBlur("name")}
//         />
//         {touched.name && errors.name && (<p className="text-xs text-red-600">{errors.name}</p>)}
//         <p className="text-xs text-gray-600 flex items-center gap-1">
//           <Info className="h-3.5 w-3.5 text-gray-500" />
//           Must be uppercase and use underscores only (e.g.,
//           <strong>CREATE_TICKET</strong>).
//         </p>
//       </div>

//       {/* Description */}
//       <div className="flex flex-col gap-1">
//         <label className="text-sm font-medium">Description</label>
//         <Textarea
//           rows={3}
//           className={`border p-2 rounded ${
//             errors.description ? "border-red-500" : ""
//           }`}
//           value={form.description ?? ""}
//           onChange={(e) => setValue("description", e.target.value)}
//           onBlur={() => onBlur("description")}
//         />
//         {errors.description && (
//           <p className="text-xs text-red-600">{errors.description}</p>
//         )}
//         <p className="text-xs text-gray-600 flex items-center gap-1">
//           <Info className="h-3.5 w-3.5 text-gray-500" />
//           Brief summary explaining what this resource allows users to do.
//         </p>
//       </div>

//       {/* system resource */}
//       <div className="flex flex-col gap-1">
//         <label className="flex items-center gap-2 cursor-pointer">
//           <input
//             type="checkbox"
//             checked={form.isSystem}
//             onChange={(e) => setValue("isSystem", e.target.checked)}
//             onBlur={() => onBlur("isSystem")}
//           />
//           <span>System Resource</span>
//         </label>
//         <p className="text-xs text-gray-600 flex items-center gap-1">
//           <Info className="h-3.5 w-3.5 text-gray-500" />
//           <span>
//             System resources cannot be <strong>deleted</strong>,{" "}
//             <strong>archived</strong>, or <strong>modified</strong>.
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export function ResourceForm({
  form,
  errors,
  touched,
  setValue,
  onBlur,
  modules = [],
}: {
  form: {
    name: string;
    codePrefix:string;
    description: string | null;
    isSystem: boolean;
    isActive: boolean;
    moduleId?: string; 
  };
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setValue: (field: any, value: any) => void;
  onBlur: (field: any) => void;
  modules?: { label: string; value: string }[];
}) {
  return (
    <div className="flex flex-col gap-4 py-2">
      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Resource Name</label>
        <input
          className={`border p-2 rounded ${
            errors.name ? "border-red-500" : ""
          }`}
          value={form.name}
          onChange={(e) => setValue("name", e.target.value)}
          onBlur={() => onBlur("name")}
        />
        {touched.name && errors.name && (
          <p className="text-xs text-red-600">{errors.name}</p>
        )}
        <p className="text-xs text-gray-600 flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-gray-500" />
          Must be uppercase and use underscores only (e.g.,
          <strong>CREATE_TICKET</strong>).
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Resource Code</label>
        <input
          className={`border p-2 rounded ${
            errors.name ? "border-red-500" : ""
          }`}
          value={form.codePrefix}
          onChange={(e) => setValue("codePrefix", e.target.value)}
          onBlur={() => onBlur("codePrefix")}
        />
        {touched.codePrefix && errors.codePrefix && (
          <p className="text-xs text-red-600">{errors.codePrefix}</p>
        )}
        <p className="text-xs text-gray-600 flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-gray-500" />
          Must be uppercase and between 2–6 only (e.g.,
          <strong>INC</strong>).
        </p>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          rows={3}
          className={`border p-2 rounded ${
            errors.description ? "border-red-500" : ""
          }`}
          value={form.description ?? ""}
          onChange={(e) => setValue("description", e.target.value)}
          onBlur={() => onBlur("description")}
        />
        {errors.description && (
          <p className="text-xs text-red-600">{errors.description}</p>
        )}
        <p className="text-xs text-gray-600 flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-gray-500" />
          Brief summary explaining what this resource allows users to do.
        </p>
      </div>

      {/* Module dropdown */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Module</label>

        <Select
          value={form.moduleId || ""}
          onValueChange={(val) => setValue("moduleId", val)
          }
        >
          <SelectTrigger className="border rounded p-2 w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent>
            {modules.length === 0 && (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                No categories found
              </div>
            )}

            {modules.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.moduleId && (
          <p className="text-xs text-red-600">{errors.moduleId}</p>
        )}
      </div>

      {/* System Resource */}
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isSystem}
            onChange={(e) => setValue("isSystem", e.target.checked)}
            onBlur={() => onBlur("isSystem")}
          />
          <span>System Resource</span>
        </label>
        <p className="text-xs text-gray-600 flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-gray-500" />
          System resources cannot be <strong>deleted</strong>,{" "}
          <strong>archived</strong>, or <strong>modified</strong>.
        </p>
      </div>
    </div>
  );
}
