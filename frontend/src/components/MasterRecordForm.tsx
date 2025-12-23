// "use client";

// import React, { useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// /* =========================================================
//    TYPES
// ========================================================= */

// type ApiSource = {
//   resourceKey: string;
//   labelKey: string;
//   valueKey: string;
// };

// type Calculation = {
//   type: "formula";
//   expression: string;
//   dependsOn?: string[];
// };

// export type DynamicField = {
//   id: string;
//   key: string;
//   label: string;
//   type:
//     | "text"
//     | "textarea"
//     | "number"
//     | "currency"
//     | "email"
//     | "phone"
//     | "select"
//     | "radio"
//     | "checkbox"
//     | "date"
//     | "datetime";
//   order: number;
//   layout?: "full" | "half" | "third" | "two-third" | "quarter";
//   placeholder?: string;
//   required?: boolean;
//   readOnly?: boolean;
//   min?: number | null;
//   max?: number | null;
//   options?: { label: string; value: string }[];
//   visibleIf?: { fieldId: string; value: any } | null;
//   calculation?: Calculation;
//   source?: "static" | "api";
//   apiSource?: ApiSource;
// };

// /* =========================================================
//    HELPERS
// ========================================================= */

// function layoutToGridCol(layout?: string) {
//   switch (layout) {
//     case "half":
//       return "col-span-6";
//     case "third":
//       return "col-span-4";
//     case "two-third":
//       return "col-span-8";
//     case "quarter":
//       return "col-span-3";
//     default:
//       return "col-span-12";
//   }
// }

// function isFieldVisible(
//   field: DynamicField,
//   formData: Record<string, any>
// ) {
//   if (!field.visibleIf) return true;
//   return formData[field.visibleIf.fieldId] === field.visibleIf.value;
// }

// function evaluateFormula(
//   expression: string,
//   values: Record<string, any>
// ) {
//   try {
//     const fn = new Function(
//       ...Object.keys(values),
//       `return ${expression};`
//     );
//     return fn(...Object.values(values));
//   } catch {
//     return "";
//   }
// }

// function resolveOptions(
//   field: DynamicField,
//   apiOptions: Record<string, any[]>
// ) {
//   if (field.source !== "api" || !field.apiSource) {
//     return field.options ?? [];
//   }

//   const { resourceKey, labelKey, valueKey } = field.apiSource;

//   return (apiOptions[resourceKey] ?? []).map((item: any) => ({
//     label: item?.[labelKey],
//     value: String(item?.[valueKey]),
//   }));
// }

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export function MasterRecordForm({
//   fields,
//   formData,
//   setValue,
//   apiOptions = {},
// }: {
//   fields: DynamicField[];
//   formData: Record<string, any>;
//   setValue: (key: string, value: any) => void;
//   apiOptions?: Record<string, any[]>;
// }) {
//   /* --------------------------------------------
//      Auto-calculate fields
//   --------------------------------------------- */
//   useEffect(() => {
//     fields.forEach((field) => {
//       if (field.calculation?.type === "formula") {
//         const computed = evaluateFormula(
//           field.calculation.expression,
//           formData
//         );
//         setValue(field.key, computed);
//       }
//     });
//   }, [fields, formData, setValue]);

//   /* --------------------------------------------
//      Render
//   --------------------------------------------- */

//   return (
//     <div className="grid grid-cols-12 gap-4 py-2">
//       {fields
//         .sort((a, b) => a.order - b.order)
//         .map((field) => {
//           if (!isFieldVisible(field, formData)) return null;

//           const value = formData[field.key] ?? "";
//           const readOnly = field.readOnly || !!field.calculation;
//           const options = resolveOptions(field, apiOptions);

//           return (
//             <div
//               key={field.id}
//               className={`${layoutToGridCol(
//                 field.layout
//               )} flex flex-col gap-1`}
//             >
//               {/* LABEL */}
//               {field.type !== "checkbox" && (
//                 <label className="text-sm font-medium">
//                   {field.label}
//                   {field.required && (
//                     <span className="text-red-500 ml-1">*</span>
//                   )}
//                 </label>
//               )}

//               {/* TEXT / EMAIL / PHONE / CURRENCY */}
//               {["text", "email", "phone", "currency"].includes(field.type) && (
//                 <Input
//                   type={field.type === "currency" ? "number" : field.type}
//                   value={value}
//                   readOnly={readOnly}
//                   placeholder={field.placeholder}
//                   onChange={(e) =>
//                     setValue(field.key, e.target.value)
//                   }
//                 />
//               )}

//               {/* NUMBER */}
//               {field.type === "number" && (
//                 <Input
//                   type="number"
//                   value={value}
//                   readOnly={readOnly}
//                   min={field.min ?? undefined}
//                   max={field.max ?? undefined}
//                   placeholder={field.placeholder}
//                   onChange={(e) =>
//                     setValue(
//                       field.key,
//                       e.target.value === ""
//                         ? ""
//                         : Number(e.target.value)
//                     )
//                   }
//                 />
//               )}

//               {/* TEXTAREA */}
//               {field.type === "textarea" && (
//                 <Textarea
//                   value={value}
//                   readOnly={readOnly}
//                   placeholder={field.placeholder}
//                   onChange={(e) =>
//                     setValue(field.key, e.target.value)
//                   }
//                 />
//               )}

//               {/* SELECT / RADIO */}
//               {(field.type === "select" ||
//                 field.type === "radio") && (
//                 <Select
//                   value={value}
//                   disabled={readOnly}
//                   onValueChange={(val) =>
//                     setValue(field.key, val)
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue
//                       placeholder={
//                         field.placeholder || "Select option"
//                       }
//                     />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {options.map((opt) => (
//                       <SelectItem
//                         key={opt.value}
//                         value={opt.value}
//                       >
//                         {opt.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}

//               {/* CHECKBOX */}
//               {field.type === "checkbox" && (
//                 <div className="flex items-center gap-2">
//                   <Checkbox
//                     checked={!!value}
//                     disabled={readOnly}
//                     onCheckedChange={(val) =>
//                       setValue(field.key, !!val)
//                     }
//                   />
//                   <span className="text-sm">
//                     {field.label}
//                   </span>
//                 </div>
//               )}

//               {/* DATE / DATETIME */}
//               {(field.type === "date" ||
//                 field.type === "datetime") && (
//                 <Input
//                   type={
//                     field.type === "date"
//                       ? "date"
//                       : "datetime-local"
//                   }
//                   value={value}
//                   readOnly={readOnly}
//                   onChange={(e) =>
//                     setValue(field.key, e.target.value)
//                   }
//                 />
//               )}
//             </div>
//           );
//         })}
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

/* ============================
   HELPERS
============================ */

function layoutToGridCol(layout?: string) {
  switch (layout) {
    case "half":
      return "col-span-6";
    case "third":
      return "col-span-4";
    case "two-third":
      return "col-span-8";
    case "quarter":
      return "col-span-3";
    default:
      return "col-span-12";
  }
}

/* ============================
   COMPONENT
============================ */

export function MasterRecordForm({
  sections,
  formData,
  setValue,
}: {
  sections: any[];
  formData: Record<string, any>;
  setValue: (key: string, value: any) => void;
}) {
  /* Auto formula evaluation */
  useEffect(() => {
    sections.forEach((section) => {
      section.fields.forEach((field: any) => {
        if (field.calculation?.expression) {
          try {
            const fn = new Function(
              ...Object.keys(formData),
              `return ${field.calculation.expression};`
            );
            const computed = fn(...Object.values(formData));
            setValue(field.key, computed);
          } catch {}
        }
      });
    });
  }, [sections, formData, setValue]);

  if (!sections.length) {
    return (
      <div className="text-sm text-muted-foreground">
        No form schema defined.
      </div>
    );
  }

  return (
    <Tabs defaultValue={sections[0].id} className="w-full">
      {/* 🔥 Section Tabs */}
      <TabsList className="bg-transparent gap-6">
        {sections.map((section) => (
          <TabsTrigger
            key={section.id}
            value={section.id}
            className="
              relative bg-transparent px-2 pb-2
              text-muted-foreground
              data-[state=active]:text-primary
              data-[state=active]:font-medium
              after:absolute after:left-0 after:bottom-0
              after:h-0.5 after:w-full
              after:scale-x-0 after:bg-primary
              after:transition-transform
              data-[state=active]:after:scale-x-100
            "
          >
            {section.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* 🔥 Section Content */}
      {sections.map((section) => (
        <TabsContent
          key={section.id}
          value={section.id}
          className="pt-6"
        >
          <div className="grid grid-cols-12 gap-4">
            {section.fields
              .sort((a: any, b: any) => a.order - b.order)
              .map((field: any) => {
                const value = formData[field.key] ?? "";
                const readOnly = field.readOnly;

                return (
                  <div
                    key={field.key}
                    className={`${layoutToGridCol(
                      field.config?.layout
                    )} flex flex-col gap-1`}
                  >
                    {field.fieldType !== "CHECKBOX" && (
                      <label className="text-sm font-medium">
                        {field.label}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                    )}

                    {/* TEXT */}
                    {["TEXT", "EMAIL", "PHONE", "CURRENCY"].includes(
                      field.fieldType
                    ) && (
                      <Input
                        value={value}
                        readOnly={readOnly}
                        onChange={(e) =>
                          setValue(field.key, e.target.value)
                        }
                      />
                    )}

                    {/* NUMBER */}
                    {field.fieldType === "NUMBER" && (
                      <Input
                        type="number"
                        value={value}
                        readOnly={readOnly}
                        onChange={(e) =>
                          setValue(field.key, Number(e.target.value))
                        }
                      />
                    )}

                    {/* TEXTAREA */}
                    {field.fieldType === "TEXTAREA" && (
                      <Textarea
                        value={value}
                        readOnly={readOnly}
                        onChange={(e) =>
                          setValue(field.key, e.target.value)
                        }
                      />
                    )}

                    {/* SELECT */}
                    {field.fieldType === "SELECT" && (
                      <Select
                        value={value}
                        onValueChange={(v) =>
                          setValue(field.key, v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          {(field.config?.options ?? []).map(
                            (opt: any) => (
                              <SelectItem
                                key={opt.value}
                                value={opt.value}
                              >
                                {opt.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    )}

                    {/* CHECKBOX */}
                    {field.fieldType === "CHECKBOX" && (
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={!!value}
                          onCheckedChange={(v) =>
                            setValue(field.key, !!v)
                          }
                        />
                        <span className="text-sm">
                          {field.label}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
