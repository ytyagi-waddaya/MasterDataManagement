// import {
//   RuntimeDivider,
//   RuntimeHeading,
//   RuntimeRepeater,
//   RuntimeSpacer,
// } from "./presentation";
// import { RuntimeField } from "./RuntimeField";
// import { useFormBuilderStore } from "../state/useFormBuilderStore";
// import { evaluateVisibility } from "../runtime/evaluateVisibility";
// import { validateField } from "./validateField";

// /* ======================================================
//    NODE RENDERER (RECURSIVE)
// ====================================================== */

// function renderNode(
//   node: any,
//   fields: any[],
//   values: Record<string, any>,
//   preview: boolean,
//   rowId?: string,
// ) {
//   /* ---------- LAYOUT VISIBILITY ---------- */
//   if (node.kind === "LAYOUT") {
//     if (!evaluateVisibility(node.visibility, values)) return null;
//   }

//   /* ---------- FIELD ---------- */
//   if (node.kind === "FIELD") {
//     return (
//       <RuntimeField
//         key={node.id}
//         fieldKey={node.field.key}
//         fields={fields}
//         rowId={rowId}
//         preview={preview}
//       />
//     );
//   }

//   if (node.kind !== "LAYOUT") return null;

//   /* ---------- LAYOUT TYPES ---------- */
//   switch (node.type) {
//     case "heading":
//       return <RuntimeHeading key={node.id} node={node} />;

//     case "divider":
//       return <RuntimeDivider key={node.id} />;

//     case "spacer":
//       return <RuntimeSpacer key={node.id} node={node} />;

//     case "repeater":
//       return (
//         <RuntimeRepeater
//           key={node.id}
//           node={node}
//           fields={fields}
//           preview={preview}
//         />
//       );
//     case "columns":
//     case "tabs":
//       return (
//         <div key={node.id} className="grid grid-cols-12 gap-4">
//           {node.slots.map((slot: any) => {
//             if (!evaluateVisibility(slot.visibility, values)) return null;

//             // 🔑 slot width (default = equal split)
//             const slotSpan = slot.span ?? Math.floor(12 / node.slots.length);

//             return (
//               <div key={slot.id} className={`col-span-${slotSpan}`}>
//                 {slot.title && (
//                   <div className="font-medium mb-2">{slot.title}</div>
//                 )}

//                 {/* 🔑 nested grid so field widths work */}
//                 <div className="grid grid-cols-12 gap-4">
//                   {slot.children.map((child: any) =>
//                     renderNode(child, fields, values, preview, rowId),
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       );

//     default:
//       return null;
//   }
// }

// /* ======================================================
//    FORM RENDERER
// ====================================================== */

// export function FormRenderer({
//   schema,
//   fields,
//   preview = false,
// }: {
//   schema: any;
//   fields: any[];
//   preview?: boolean;
// }) {
//   const values = preview
//     ? useFormBuilderStore((s) => s.previewValues)
//     : useFormBuilderStore((s) => s.formValues);

//   const setSubmitErrors = useFormBuilderStore((s) => s.setSubmitErrors);
//   const clearSubmitErrors = useFormBuilderStore((s) => s.clearSubmitErrors);

//   /* ======================================================
//      TEST SUBMIT (PREVIEW MODE)
//   ====================================================== */

//   function handleTestSubmit() {
//     const errors: Record<string, string> = {};

//     fields.forEach((field: any) => {
//       if (field.meta.deprecated) return;
//       if (field.calculation) return;

//       const rules = field.validation?.rules ?? [];

//       // 🔑 validate ALL matching keys (repeaters safe)
//       Object.keys(values).forEach((key) => {
//         if (key === field.meta.key || key.startsWith(`${field.meta.key}.`)) {
//           const err = validateField(values[key], rules, field.data.type);
//           if (err) {
//             errors[key] = err;
//           }
//         }
//       });
//     });

//     if (Object.keys(errors).length > 0) {
//       setSubmitErrors(errors);

//       // scroll to first error
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } else {
//       clearSubmitErrors();
//       alert("✅ Form is valid and ready to publish!");
//       console.table(values);
//     }
//   }

//   /* ======================================================
//      RENDER
//   ====================================================== */

//   return (
//     <form className="space-y-6">
//       {schema.layout.sections.map((section: any) => (
//         <div key={section.id} className="space-y-4">
//           <h3 className="text-lg font-semibold">{section.title}</h3>

//           <div className="grid grid-cols-12 gap-4">
//             {section.nodes.map((node: any) =>
//               renderNode(node, fields, values, preview),
//             )}
//           </div>
//         </div>
//       ))}

//       {/* ---------- TEST SUBMIT ---------- */}
//       {preview && (
//         <div className="pt-6 border-t">
//           <button
//             type="button"
//             onClick={handleTestSubmit}
//             className="bg-black text-white px-6 py-2 rounded"
//           >
//             Test Submit
//           </button>
//         </div>
//       )}
//     </form>
//   );
// }

// import {
//   RuntimeDivider,
//   RuntimeHeading,
//   RuntimeRepeater,
//   RuntimeSpacer,
// } from "./presentation";
// import { RuntimeField } from "./RuntimeField";
// import { useFormBuilderStore } from "../state/useFormBuilderStore";
// import { evaluateVisibility } from "../runtime/evaluateVisibility";
// import { validateField } from "./validateField";
// import { useRuntimeFormStore } from "./runtimeFormStore";

// /* ======================================================
//    NODE RENDERER (RECURSIVE)
// ====================================================== */

// function renderNode(
//   node: any,
//   fields: any[],
//   values: Record<string, any>,
//   preview: boolean,
//   rowId?: string,
// ) {
//   if (node.kind === "LAYOUT") {
//     if (!evaluateVisibility(node.visibility, values)) return null;
//   }

//   if (node.kind === "FIELD") {
//     return (
//       <RuntimeField
//         key={node.id}
//         fieldKey={node.field.key}
//         fields={fields}
//         rowId={rowId}
//         preview={preview}
//       />
//     );
//   }

//   if (node.kind !== "LAYOUT") return null;

//   switch (node.type) {
//     case "heading":
//       return <RuntimeHeading key={node.id} node={node} />;

//     case "divider":
//       return <RuntimeDivider key={node.id} />;

//     case "spacer":
//       return <RuntimeSpacer key={node.id} node={node} />;

//     case "repeater":
//       return (
//         <RuntimeRepeater
//           key={node.id}
//           node={node}
//           fields={fields}
//           preview={preview}
//         />
//       );

//     case "columns":
//       return (
//         <div key={node.id} className="grid grid-cols-12 gap-4">
//           {node.slots.map((slot: any) => {
//             if (!evaluateVisibility(slot.visibility, values)) return null;

//             const slotSpan = slot.span ?? Math.floor(12 / node.slots.length);

//             return (
//               <div key={slot.id} className={`col-span-${slotSpan}`}>
//                 {slot.title && (
//                   <div className="font-medium mb-2">{slot.title}</div>
//                 )}

//                 {/* 🔑 nested grid so field widths work */}
//                 <div className="grid grid-cols-12 gap-4">
//                   {slot.children.map((child: any) =>
//                     renderNode(child, fields, values, preview, rowId),
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       );

//     case "tabs":
//       return (
//         <div key={node.id}>
//           {/* simple first-tab render (can be enhanced later) */}
//           {node.slots[0]?.children.map((child: any) =>
//             renderNode(child, fields, values, preview, rowId),
//           )}
//         </div>
//       );

//     default:
//       return null;
//   }
// }

// /* ======================================================
//    FORM RENDERER
// ====================================================== */

// export function FormRenderer({
//   schema,
//   fields,
//   preview = false,
// }: {
//   schema: any;
//   fields: any[];
//   preview?: boolean;
// }) {
//   // const values = preview
//   //   ? useFormBuilderStore((s) => s.previewValues)
//   //   : useFormBuilderStore((s) => s.formValues);
//   const values = useRuntimeFormStore((s) => s.values);

//   const setSubmitErrors = useFormBuilderStore((s) => s.setSubmitErrors);
//   const clearSubmitErrors = useFormBuilderStore((s) => s.clearSubmitErrors);

//   /* ---------- TEST SUBMIT ---------- */

//   function handleTestSubmit() {
//     const errors: Record<string, string> = {};

//     fields.forEach((field: any) => {
//       if (field.meta.deprecated) return;
//       if (field.calculation) return;

//       const rules = field.validation?.rules ?? [];

//       // Object.keys(values).forEach((key) => {
//       Object.entries(values).forEach(([key, value]) => {
//         if (key === field.meta.key || key.startsWith(`${field.meta.key}.`)) {
//           const err = validateField(values[key], rules, field.data.type);
//           if (err) errors[key] = err;
//         }
//       });
//     });

//     if (Object.keys(errors).length > 0) {
//       setSubmitErrors(errors);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } else {
//       clearSubmitErrors();
//       alert("✅ Form is valid and ready to publish!");
//       console.table(values);
//     }
//   }

//   /* ---------- RENDER ---------- */

//   return (
//     <form className="space-y-6">
//       {schema.layout.sections.map((section: any) => (
//         <div key={section.id} className="space-y-4">
//           <h3 className="text-lg font-semibold">{section.title}</h3>

//           <div className="grid grid-cols-12 gap-4">
//             {section.nodes.map((node: any) =>
//               renderNode(node, fields, values, preview),
//             )}
//           </div>
//         </div>
//       ))}

//       {preview && (
//         <div className="pt-6 border-t">
//           <button
//             type="button"
//             onClick={handleTestSubmit}
//             className="bg-black text-white px-6 py-2 rounded"
//           >
//             Test Submit
//           </button>
//         </div>
//       )}
//     </form>
//   );
// }

// "use client";

// import { useEffect } from "react";
// import {
//   RuntimeDivider,
//   RuntimeHeading,
//   RuntimeRepeater,
//   RuntimeSpacer,
// } from "./presentation";
// import { RuntimeField } from "./RuntimeField";
// import { useFormBuilderStore } from "../state/useFormBuilderStore";
// import { evaluateVisibility } from "../runtime/evaluateVisibility";
// import { validateField } from "./validateField";
// import { useRuntimeFormStore } from "./runtimeFormStore";

// /* ======================================================
//    NODE RENDERER (RECURSIVE)
// ====================================================== */

// function renderNode(
//   node: any,
//   fields: any[],
//   values: Record<string, any>,
//   preview: boolean,
//   rowId?: string,
// ) {
//   if (node.kind === "LAYOUT") {
//     if (!evaluateVisibility(node.visibility, values)) return null;
//   }

//   if (node.kind === "FIELD") {
//     return (
//       <RuntimeField
//         key={node.id}
//         fieldKey={node.field.key}
//         fields={fields}
//         rowId={rowId}
//         preview={preview}
//       />
//     );
//   }

//   if (node.kind !== "LAYOUT") return null;

//   switch (node.type) {
//     case "heading":
//       return <RuntimeHeading key={node.id} node={node} />;

//     case "divider":
//       return <RuntimeDivider key={node.id} />;

//     case "spacer":
//       return <RuntimeSpacer key={node.id} node={node} />;

//     case "repeater":
//       return (
//         <RuntimeRepeater
//           key={node.id}
//           node={node}
//           fields={fields}
//           preview={preview}
//         >
//           {(child: any, rid: string) =>
//             renderNode(child, fields, values, preview, rid)
//           }
//         </RuntimeRepeater>
//       );

//     case "columns":
//       return (
//         <div key={node.id} className="grid grid-cols-12 gap-4">
//           {node.slots.map((slot: any) => {
//             if (!evaluateVisibility(slot.visibility, values)) return null;

//             const slotSpan = slot.span ?? Math.floor(12 / node.slots.length);

//             return (
//               <div key={slot.id} className={`col-span-${slotSpan}`}>
//                 {slot.title && (
//                   <div className="font-medium mb-2">{slot.title}</div>
//                 )}

//                 <div className="grid grid-cols-12 gap-4">
//                   {slot.children.map((child: any) =>
//                     renderNode(child, fields, values, preview, rowId),
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       );

//     case "tabs":
//       return (
//         <div key={node.id}>
//           {node.slots[0]?.children.map((child: any) =>
//             renderNode(child, fields, values, preview, rowId),
//           )}
//         </div>
//       );

//     default:
//       return null;
//   }
// }

// /* ======================================================
//    FORM RENDERER (RUNTIME)
// ====================================================== */

// export function FormRenderer({
//   schema,
//   fields,
//   preview = false,
// }: {
//   schema: any;
//   fields: any[];
//   preview?: boolean;
// }) {
//   const values = useRuntimeFormStore((s) => s.values);
//   const setFieldConfigs = useRuntimeFormStore((s) => s.setFieldConfigs);

//   const setSubmitErrors = useFormBuilderStore((s) => s.setSubmitErrors);
//   const clearSubmitErrors = useFormBuilderStore((s) => s.clearSubmitErrors);

//   /* ✅ hydrate runtime calculation engine */
//   useEffect(() => {
//     setFieldConfigs(fields);
//   }, [fields, setFieldConfigs]);

//   /* ---------- TEST SUBMIT ---------- */
//   function handleTestSubmit() {
//     const errors: Record<string, string> = {};

//     fields.forEach((field: any) => {
//       if (field.meta.deprecated) return;
//       if (field.calculation) return;

//       const rules = field.validation?.rules ?? [];

//       Object.entries(values).forEach(([key, value]) => {
//         if (key === field.meta.key || key.startsWith(`${field.meta.key}.`)) {
//           const err = validateField(value, rules, field.data.type);
//           if (err) errors[key] = err;
//         }
//       });
//     });

//     if (Object.keys(errors).length > 0) {
//       setSubmitErrors(errors);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } else {
//       clearSubmitErrors();
//       alert("✅ Form is valid and ready to publish!");
//       console.table(values);
//     }
//   }

//   /* ---------- RENDER ---------- */
//   return (
//     <form className="space-y-6">
//       {schema.layout.sections.map((section: any) => (
//         <div key={section.id} className="space-y-4">
//           <h3 className="text-lg font-semibold">{section.title}</h3>

//           <div className="grid grid-cols-12 gap-4">
//             {section.nodes.map((node: any) =>
//               renderNode(node, fields, values, preview),
//             )}
//           </div>
//         </div>
//       ))}

//       {preview && (
//         <div className="pt-6 border-t">
//           <button
//             type="button"
//             onClick={handleTestSubmit}
//             className="bg-black text-white px-6 py-2 rounded"
//           >
//             Test Submit
//           </button>
//         </div>
//       )}
//     </form>
//   );
// }

// "use client";

// import { useEffect } from "react";
// import {
//   RuntimeDivider,
//   RuntimeHeading,
//   RuntimeRepeater,
//   RuntimeSpacer,
// } from "./presentation";
// import { RuntimeField } from "./RuntimeField";
// import { evaluateVisibility } from "../runtime/evaluateVisibility";
// import { validateField } from "./validateField";
// import { useRuntimeFormStore } from "./runtimeFormStore";
// import { useFormBuilderStore } from "../state/useFormBuilderStore";

// /* ======================================================
//    NODE RENDERER
// ====================================================== */

// function renderNode(
//   node: any,
//   fields: any[],
//   values: Record<string, any>,
//   mode: "PREVIEW" | "CREATE" | "VIEW" | "EDIT",
// ) {
//   if (node.kind === "LAYOUT") {
//     if (!evaluateVisibility(node.visibility, values)) return null;
//   }

//   if (node.kind === "FIELD") {
//     return (
//       <RuntimeField
//         key={node.id}
//         fieldKey={node.field.key}
//         fields={fields}
//         mode={mode}
//       />
//     );
//   }

//   if (node.kind !== "LAYOUT") return null;

//   switch (node.type) {
//     case "heading":
//       return <RuntimeHeading key={node.id} node={node} />;
//     case "divider":
//       return <RuntimeDivider key={node.id} />;
//     case "spacer":
//       return <RuntimeSpacer key={node.id} node={node} />;
//     case "repeater":
//       return <RuntimeRepeater key={node.id} node={node} fields={fields} />;
//     case "columns":
//       return (
//         <div key={node.id} className="grid grid-cols-12 gap-4">
//           {node.slots.map((slot: any) => {
//             if (!evaluateVisibility(slot.visibility, values)) return null;

//             const span = slot.span ?? Math.floor(12 / node.slots.length);

//             return (
//               <div key={slot.id} className={`col-span-${span}`}>
//                 {slot.title && (
//                   <div className="font-medium mb-2">{slot.title}</div>
//                 )}
//                 <div className="grid grid-cols-12 gap-4">
//                   {slot.children.map((child: any) =>
//                     renderNode(child, fields, values, mode),
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       );
//     case "tabs":
//       return (
//         <div key={node.id}>
//           {node.slots[0]?.children.map((child: any) =>
//             renderNode(child, fields, values, mode),
//           )}
//         </div>
//       );
//     default:
//       return null;
//   }
// }

// /* ======================================================
//    FORM RENDERER
// ====================================================== */

// export function FormRenderer({
//   schema,
//   fields,
//   mode = "CREATE",
//   onSubmit,
// }: {
//   schema: any;
//   fields: any[];
//    mode?: "PREVIEW" | "CREATE" | "VIEW" | "EDIT";
//   onSubmit?: (values: Record<string, any>) => void;
// }) {
//   const values = useRuntimeFormStore((s) => s.values);
//   const setFieldConfigs = useRuntimeFormStore((s) => s.setFieldConfigs);
//   const reset = useRuntimeFormStore((s) => s.reset);

//   const setSubmitErrors = useFormBuilderStore((s) => s.setSubmitErrors);
//   const clearSubmitErrors = useFormBuilderStore((s) => s.clearSubmitErrors);

//   /* ✅ hydrate calculation engine */
//   useEffect(() => {
//     setFieldConfigs(fields);
//   }, [fields, setFieldConfigs]);

//   /* ---------- SUBMIT ---------- */
//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//  if (mode === "VIEW" || mode === "PREVIEW") return;
//     const errors: Record<string, string> = {};

//     fields.forEach((field: any) => {
//       if (field.meta.deprecated) return;
//       if (field.calculation) return;

//       const rules = field.validation?.rules ?? [];

//       Object.entries(values).forEach(([key, value]) => {
//         if (key === field.meta.key || key.startsWith(`${field.meta.key}.`)) {
//           const err = validateField(value, rules, field.data.type);
//           if (err) errors[key] = err;
//         }
//       });
//     });

//     if (Object.keys(errors).length > 0) {
//       setSubmitErrors(errors);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }

//     clearSubmitErrors();
//     onSubmit?.(values);
//       if (mode === "CREATE") reset(); 
//   }

//   /* ---------- RENDER ---------- */
//   return (
//     <form
//       id="runtime-form"
//       className="space-y-6"
//       onSubmit={onSubmit ? handleSubmit : undefined}
//     >
//       {schema.layout.sections.map((section: any) => (
//         <div key={section.id} className="space-y-4">
//           <h3 className="text-lg font-semibold">{section.title}</h3>
//           <div className="grid grid-cols-12 gap-4">
//             {section.nodes.map((node: any) =>
//               renderNode(node, fields, values,mode),
//             )}
//           </div>
//         </div>
//       ))}

//       {mode === "PREVIEW" && !onSubmit && (
//         <div className="pt-6 border-t">
//           <button
//             type="button"
//             onClick={() => console.table(values)}
//             className="bg-black text-white px-6 py-2 rounded"
//           >
//             Test Submit
//           </button>
//         </div>
//       )}
//     </form>
//   );
// }

"use client";

import { useEffect } from "react";
import {
  RuntimeDivider,
  RuntimeHeading,
  RuntimeRepeater,
  RuntimeSpacer,
} from "./presentation";
import { RuntimeField } from "./RuntimeField";
import { evaluateVisibility } from "../runtime/evaluateVisibility";
import { validateField } from "./validateField";
import { useRuntimeFormStore } from "./runtimeFormStore";

/* ======================================================
   NODE RENDERER
====================================================== */

function renderNode(
  node: any,
  fields: any[],
  values: Record<string, any>,
  mode: "PREVIEW" | "CREATE" | "VIEW" | "EDIT",
) {
  if (node.kind === "LAYOUT") {
    if (!evaluateVisibility(node.visibility, values)) return null;
  }

  if (node.kind === "FIELD") {
    return (
      <RuntimeField
        key={node.id}
        fieldKey={node.field.key}
        fields={fields}
        mode={mode}
      />
    );
  }

  if (node.kind !== "LAYOUT") return null;

  switch (node.type) {
    case "heading":
      return <RuntimeHeading key={node.id} node={node} />;
    case "divider":
      return <RuntimeDivider key={node.id} />;
    case "spacer":
      return <RuntimeSpacer key={node.id} node={node} />;
    case "repeater":
      return (
        <RuntimeRepeater
          key={node.id}
          node={node}
          fields={fields}
          mode={mode}
        />
      );

    case "columns":
      return (
        <div key={node.id} className="grid grid-cols-12 gap-4">
          {node.slots.map((slot: any) => {
            if (!evaluateVisibility(slot.visibility, values)) return null;

            const span = slot.span ?? Math.floor(12 / node.slots.length);

            return (
              <div key={slot.id} className={`col-span-${span}`}>
                {slot.title && (
                  <div className="font-medium mb-2">{slot.title}</div>
                )}
                <div className="grid grid-cols-12 gap-4">
                  {slot.children.map((child: any) =>
                    renderNode(child, fields, values, mode),
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );

    case "tabs":
      return (
        <div key={node.id}>
          {node.slots[0]?.children.map((child: any) =>
            renderNode(child, fields, values, mode),
          )}
        </div>
      );

    default:
      return null;
  }
}

/* ======================================================
   FORM RENDERER
====================================================== */

export function FormRenderer({
  schema,
  fields,
  mode = "CREATE",
  onSubmit,
  initialValues,
}: {
  schema: any;
  fields: any[];
  mode?: "PREVIEW" | "CREATE" | "VIEW" | "EDIT";
  onSubmit?: (values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
}) {
  const values = useRuntimeFormStore((s) => s.values);
  const setFieldConfigs = useRuntimeFormStore((s) => s.setFieldConfigs);
  const hydrate = useRuntimeFormStore((s) => s.hydrate);
  const reset = useRuntimeFormStore((s) => s.reset);

  const isEditable = mode === "CREATE" || mode === "EDIT";

  /* ================= HYDRATION ================= */

  useEffect(() => {
    setFieldConfigs(fields);
  }, [fields, setFieldConfigs]);

  /* preload submitted values (VIEW / EDIT) */
  useEffect(() => {
    if (initialValues && (mode === "VIEW" || mode === "EDIT")) {
      hydrate(initialValues);

    }
  }, [initialValues, mode, hydrate]);

  /* ================= SUBMIT ================= */

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEditable) return;

    const errors: Record<string, string> = {};

    fields.forEach((field: any) => {
      if (field.meta.deprecated) return;
      if (field.calculation) return;

      const rules = field.validation?.rules ?? [];

      Object.entries(values).forEach(([key, value]) => {
        if (key === field.meta.key || key.startsWith(`${field.meta.key}.`)) {
          const err = validateField(value, rules, field.data.type);
          if (err) errors[key] = err;
        }
      });
    });

    if (Object.keys(errors).length > 0) {
      // you can store submitErrors in runtime store if needed
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    onSubmit?.(values);

    if (mode === "CREATE") reset();
  }

  /* ================= RENDER ================= */

  return (
    <form
      id="runtime-form"
      className="space-y-6"
      onSubmit={onSubmit ? handleSubmit : undefined}
    >
      {schema.layout.sections.map((section: any) => (
        <div key={section.id} className="space-y-4">
          <h3 className="text-lg font-semibold">{section.title}</h3>

          <div className="grid grid-cols-12 gap-4">
            {section.nodes.map((node: any) =>
              renderNode(node, fields, values, mode),
            )}
          </div>
        </div>
      ))}

      {/* preview only debug */}
      {mode === "PREVIEW" && !onSubmit && (
        <div className="pt-6 border-t">
          <button
            type="button"
            onClick={() => console.table(values)}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Test Submit
          </button>
        </div>
      )}

      {/* submit button only for editable modes */}
      {onSubmit && isEditable && (
        <div className="pt-6 border-t">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded"
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
}
