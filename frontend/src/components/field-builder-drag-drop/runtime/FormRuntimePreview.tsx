// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { FormSection, EditorNode } from "../contracts/editor.contract";
// import { buildRuntimeSchema } from "../types/buildRuntimeSchema";
// import { validateForm } from "../validation/validateForm";
// import { RuntimeField } from "../contracts/runtime.contract";

// import { RuntimeFieldRenderer } from "./RuntimeField";
// import { RuntimeTabs } from "./RuntimeTabs";
// import { RuntimeAccordion } from "./RuntimeAccordion";
// import { RuntimeRepeater } from "./RuntimeRepeater";
// import { Send, Code } from "lucide-react";
// import { validateField } from "./validateField";

// /* ======================================================
//    FORM RUNTIME PREVIEW (PUBLISHED / END-USER UI)
// ====================================================== */

// type FormRuntimePreviewProps = {
//   sections: FormSection[];
//   readOnly?: boolean;
//   hideDebug?: boolean;
//   onSubmit?: (values: Record<string, any>) => void;

//   initialValues?: Record<string, any>;
// };

// export function FormRuntimePreview({
//   sections,
//   readOnly = false,
//   hideDebug = false,
//   onSubmit,
//   initialValues = {},
// }: FormRuntimePreviewProps) {
//   /* 🔥 HARD GUARD */
//   if (!Array.isArray(sections) || sections.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center ">
//         <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-4 flex items-center justify-center">
//           <div className="h-6 w-6 rounded border border-gray-300 dark:border-gray-700" />
//         </div>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           No published form schema available.
//         </p>
//         <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
//           Add fields to the form to preview it here.
//         </p>
//       </div>
//     );
//   }

//   /* ---------- Build runtime field schema ---------- */
//   const runtimeFields = useMemo(() => buildRuntimeSchema(sections), [sections]);

//   const runtimeFieldMap = useMemo(() => {
//     if (!Array.isArray(runtimeFields)) return {};
//     return Object.fromEntries(runtimeFields.map((f) => [f.config.meta.key, f]));
//   }, [runtimeFields]);

//   const [values, setValues] = useState<Record<string, any>>(
//     () => initialValues ?? {}
//   );

//   function handleChange(field: RuntimeField, value: any) {
//     const errors = validateField(field, value);

//     setValues((prev) => ({
//       ...prev,
//       [field.config.meta.key]: value,
//     }));

//     // update runtime field errors
//     field.state.errors = errors;
//   }
//   useEffect(() => {
//     setValues(initialValues ?? {});
//   }, [initialValues]);

//   useEffect(() => {
//     validateForm(runtimeFields, values);
//   }, [runtimeFields, values]);

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     onSubmit?.(values);
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-full mx-auto p-4 sm:p-6 space-y-8"
//     >
//       {sections.map((section) => (
//         <section
//           key={section.id}
//           className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-6 space-y-6"
//         >
//           <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//             {section.title}
//           </h2>
//           <div className="space-y-6">
//             {section.nodes?.map((node) =>
//               renderRuntimeNode(
//                 node,
//                 runtimeFieldMap,
//                 values,
//                 setValues,
//                 readOnly,
//                 handleChange
//               )
//             )}
//           </div>
//         </section>
//       ))}

//       {!readOnly && onSubmit && (
//         <div className="pt-6">
//           <button
//             type="submit"
//             className="
//               flex items-center gap-2 px-4 py-2.5 rounded-lg
//               bg-blue-600 text-white hover:bg-blue-700
//               transition-colors
//             "
//           >
//             <Send className="h-4 w-4" />
//             <span>Submit Form</span>
//           </button>
//         </div>
//       )}

//       {!hideDebug && (
//         <div className="space-y-2">
//           <div className="flex items-center gap-2">
//             <Code className="h-4 w-4 text-gray-500" />
//             <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
//               Debug Data
//             </div>
//           </div>
//           <pre
//             className="
//             text-xs p-4 rounded-lg border border-gray-200 dark:border-gray-800
//             bg-gray-50 dark:bg-gray-900 overflow-x-auto
//             font-mono
//           "
//           >
//             {JSON.stringify(values, null, 2)}
//           </pre>
//         </div>
//       )}
//     </form>
//   );
// }

// /* ======================================================
//    NODE RENDERER (FIELD + LAYOUT)
// ====================================================== */

// function renderRuntimeNode(
//   node: EditorNode,
//   fieldMap: Record<string, RuntimeField>,
//   values: Record<string, any>,
//   setValues: (v: Record<string, any>) => void,
//   readOnly: boolean,
//   handleChange: (field: RuntimeField, value: any) => void
// ): React.ReactNode {
//   /* ================= FIELD ================= */
//   if (node.kind === "FIELD") {
//     const runtime = fieldMap[node.field.key];
//     if (!runtime || runtime.state.visible === false) return null;

//     return (
//       <div
//         key={node.id}
//         className="space-y-2"
//         style={{
//           gridColumn: `span ${node.field.layout.span}`,
//         }}
//       >
//         <div className="flex items-center gap-2">
//           <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//             {runtime.config.meta.label}
//             {runtime.config.validation?.rules?.some(
//               (r) => r.type === "REQUIRED"
//             ) && <span className="ml-1 text-red-500">*</span>}
//           </label>
//         </div>

//         <RuntimeFieldRenderer
//           field={{
//             ...runtime,
//             state: {
//               ...runtime.state,
//               readOnly: readOnly || runtime.state.readOnly,
//             },
//           }}
//           value={values[node.field.key]}
//           onChange={(v) => handleChange(runtime, v)}
//         />

//         {runtime.state.errors?.length ? (
//           <div className="text-xs text-red-500">{runtime.state.errors[0]}</div>
//         ) : runtime.config.meta.description ? (
//           <div className="text-xs text-gray-500 dark:text-gray-400">
//             {runtime.config.meta.description}
//           </div>
//         ) : null}
//       </div>
//     );
//   }

//   /* ================= LAYOUT ================= */
//   if (node.kind === "LAYOUT") {
//     switch (node.type) {
//       /* ---------- COLUMNS ---------- */
//       case "columns":
//         return (
//           <div key={node.id} className="grid grid-cols-12 gap-4 sm:gap-6">
//             {node.slots.map((slot) => (
//               <div
//                 key={slot.id}
//                 className={`col-span-${slot.config?.span ?? 12}`}
//               >
//                 <div className="space-y-6">
//                   {slot.children.map((child) =>
//                     renderRuntimeNode(
//                       child,
//                       fieldMap,
//                       values,
//                       setValues,
//                       readOnly,
//                       handleChange
//                     )
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         );

//       /* ---------- TABS ---------- */
//       case "tabs":
//         return (
//           <RuntimeTabs
//             key={node.id}
//             node={node}
//             fieldMap={fieldMap}
//             values={values}
//             setValues={setValues}
//             renderNode={(child) =>
//               renderRuntimeNode(child, fieldMap, values, setValues, readOnly, handleChange)
//             }
//           />
//         );

//       /* ---------- ACCORDION ---------- */
//       case "accordion":
//         return (
//           <RuntimeAccordion
//             key={node.id}
//             node={node}
//             fieldMap={fieldMap}
//             values={values}
//             setValues={setValues}
//             renderNode={(child) =>
//               renderRuntimeNode(child, fieldMap, values, setValues, readOnly, handleChange)
//             }
//           />
//         );

//       /* ---------- REPEATER ---------- */
//       case "repeater":
//         return (
//           <RuntimeRepeater
//             key={node.id}
//             node={node}
//             fieldMap={fieldMap}
//             values={values}
//             setValues={setValues}
//             renderNode={(child) =>
//               renderRuntimeNode(child, fieldMap, values, setValues, readOnly, handleChange)
//             }
//           />
//         );

//       /* ---------- PRESENTATION ---------- */
//       case "heading":
//         const headingLevel = node.config?.level ?? 3;
//         const headingClass = {
//           1: "text-2xl font-bold text-gray-900 dark:text-gray-100",
//           2: "text-xl font-semibold text-gray-800 dark:text-gray-200",
//           3: "text-lg font-semibold text-gray-700 dark:text-gray-300",
//           4: "text-md font-medium text-gray-700 dark:text-gray-300",
//           5: "text-sm font-medium text-gray-600 dark:text-gray-400",
//           6: "text-sm font-normal text-gray-500 dark:text-gray-500 uppercase tracking-wide",
//         }[headingLevel];

//         return (
//           <div key={node.id} className="space-y-1">
//             {headingLevel === 1 && (
//               <h1 className={headingClass}>{node.config?.text}</h1>
//             )}
//             {headingLevel === 2 && (
//               <h2 className={headingClass}>{node.config?.text}</h2>
//             )}
//             {headingLevel === 3 && (
//               <h3 className={headingClass}>{node.config?.text}</h3>
//             )}
//             {headingLevel === 4 && (
//               <h4 className={headingClass}>{node.config?.text}</h4>
//             )}
//             {headingLevel === 5 && (
//               <h5 className={headingClass}>{node.config?.text}</h5>
//             )}
//             {headingLevel === 6 && (
//               <h6 className={headingClass}>{node.config?.text}</h6>
//             )}
//             {node.config?.description && (
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 {node.config.description}
//               </p>
//             )}
//           </div>
//         );

//       case "divider":
//         return (
//           <div key={node.id} className="relative py-4">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full h-px bg-gray-200 dark:bg-gray-800" />
//             </div>
//             {node.config?.text && (
//               <div className="relative flex justify-center">
//                 <span className="px-3 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
//                   {node.config.text}
//                 </span>
//               </div>
//             )}
//           </div>
//         );

//       case "spacer":
//         return (
//           <div key={node.id} style={{ height: node.config?.height ?? 16 }} />
//         );
//     }
//   }

//   return null;
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { FormSection, EditorNode } from "../contracts/editor.contract";
import { buildRuntimeSchema } from "../types/buildRuntimeSchema";
import { validateForm } from "../validation/validateForm";
import { RuntimeField } from "../contracts/runtime.contract";

import { RuntimeFieldRenderer } from "./RuntimeField";
import { RuntimeTabs } from "./RuntimeTabs";
import { RuntimeAccordion } from "./RuntimeAccordion";
import { RuntimeRepeater } from "./RuntimeRepeater";
import { Send, Code, Eye, Info } from "lucide-react";
import { validateField } from "./validateField";

/* ======================================================
   FORM RUNTIME PREVIEW (PUBLISHED / END-USER UI)
====================================================== */

type FormRuntimePreviewProps = {
  sections: FormSection[];
  readOnly?: boolean;
  hideDebug?: boolean;
  onSubmit?: (values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
};

// export function FormRuntimePreview({
//   sections,
//   readOnly = false,
//   hideDebug = false,
//   onSubmit,
//   initialValues = {},
// }: FormRuntimePreviewProps) {
//   /* 🔥 HARD GUARD */
//   if (!Array.isArray(sections) || sections.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
//         <div className="h-16 w-16 rounded-full bg-gray-50 dark:bg-gray-900 mb-4 flex items-center justify-center">
//           <Eye className="h-8 w-8 text-gray-400 dark:text-gray-600" />
//         </div>
//         <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
//           No form available
//         </h3>
//         <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
//           Add fields to the form builder to preview it here.
//         </p>
//       </div>
//     );
//   }

//   /* ---------- Build runtime field schema ---------- */
//   const runtimeFields = useMemo(() => buildRuntimeSchema(sections), [sections]);

//   const runtimeFieldMap = useMemo(() => {
//     if (!Array.isArray(runtimeFields)) return {};
//     return Object.fromEntries(runtimeFields.map((f) => [f.config.meta.key, f]));
//   }, [runtimeFields]);

//   const [values, setValues] = useState<Record<string, any>>(
//     () => initialValues ?? {}
//   );

//   function handleChange(field: RuntimeField, value: any) {
//     const errors = validateField(field, value);

//     setValues((prev) => ({
//       ...prev,
//       [field.config.meta.key]: value,
//     }));

//     // update runtime field errors
//     field.state.errors = errors;
//   }

//   useEffect(() => {
//     setValues(initialValues ?? {});
//   }, [initialValues]);

//   useEffect(() => {
//     validateForm(runtimeFields, values);
//   }, [runtimeFields, values]);

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     let hasErrors = false;

//     runtimeFields.forEach((field) => {
//       const value = values[field.config.meta.key];
//       const errors = validateField(field, value);

//       field.state.errors = errors;

//       if (errors.length > 0) {
//         hasErrors = true;
//       }
//     });

//     // ❌ stop submit if errors
//     if (hasErrors) return;

//     // ✅ submit only if valid
//     onSubmit?.(values);
//   }

//   return (
//     <form onSubmit={handleSubmit} className="max-w-full mx-auto space-y-8">
//       {sections.map((section) => (
//         <section
//           key={section.id}
//           className="rounded-2xl bg-white dark:bg-gray-900 p-6 space-y-8
//                    border border-gray-100 dark:border-gray-800
//                    shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
//         >
//           <div className="space-y-2">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//               {section.title}
//             </h2>
//             {/* {section.description && (
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 {section.description}
//               </p>
//             )} */}
//           </div>

//           <div className="space-y-8">
//             {section.nodes?.map((node) =>
//               renderRuntimeNode(
//                 node,
//                 runtimeFieldMap,
//                 values,
//                 setValues,
//                 readOnly,
//                 handleChange
//               )
//             )}
//           </div>
//         </section>
//       ))}

//       {!readOnly && onSubmit && (
//         <div
//           className="sticky bottom-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
//                        rounded-2xl border border-gray-200 dark:border-gray-800
//                        shadow-lg p-6 mt-8"
//         >
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="group flex items-center gap-3 px-6 py-3 rounded-xl
//                          bg-gray-900 dark:bg-white text-white dark:text-gray-900
//                          hover:bg-gray-800 dark:hover:bg-gray-100
//                          transition-all duration-200 font-medium
//                          shadow-sm hover:shadow-md active:scale-[0.98]"
//             >
//               <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
//               <span>Submit Form</span>
//             </button>
//           </div>
//         </div>
//       )}

//       {!hideDebug && (
//         <div
//           className="rounded-2xl border border-gray-200 dark:border-gray-800
//                        bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden"
//         >
//           <div
//             className="flex items-center justify-between p-4 border-b
//                          border-gray-200 dark:border-gray-800"
//           >
//             <div className="flex items-center gap-3">
//               <div
//                 className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800
//                             flex items-center justify-center"
//               >
//                 <Code className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Form Data
//                 </div>
//                 <div className="text-xs text-gray-500 dark:text-gray-400">
//                   Real-time form values
//                 </div>
//               </div>
//             </div>
//             <div
//               className="text-xs font-medium px-3 py-1 rounded-full
//                            bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
//             >
//               {Object.keys(values).length} fields
//             </div>
//           </div>
//           <pre
//             className="text-xs p-4 overflow-x-auto font-mono
//                          text-gray-600 dark:text-gray-300"
//           >
//             {JSON.stringify(values, null, 2)}
//           </pre>
//         </div>
//       )}
//     </form>
//   );
// }
export function FormRuntimePreview({
  sections,
  readOnly = false,
  hideDebug = false,
  onSubmit,
  initialValues,
}: FormRuntimePreviewProps) {
  /* 🔥 HARD GUARD */
  if (!Array.isArray(sections) || sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="h-14 w-14 rounded-full bg-gray-50 dark:bg-gray-900 mb-3 flex items-center justify-center">
          <Eye className="h-6 w-6 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
          No form available
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
          Add fields to the form builder to preview it here.
        </p>
      </div>
    );
  }

  /* ---------- Build runtime field schema ---------- */
  const runtimeFields = useMemo(() => buildRuntimeSchema(sections), [sections]);

  const runtimeFieldMap = useMemo(() => {
    if (!Array.isArray(runtimeFields)) return {};
    return Object.fromEntries(runtimeFields.map((f) => [f.config.meta.key, f]));
  }, [runtimeFields]);

  const [values, setValues] = useState<Record<string, any>>(
    () => initialValues ?? {}
  );

  function handleChange(field: RuntimeField, value: any) {
    const errors = validateField(field, value);

    setValues((prev) => ({
      ...prev,
      [field.config.meta.key]: value,
    }));

    // update runtime field errors
    field.state.errors = errors;
  }

useEffect(() => {
  if (!initialValues) return;

  setValues((prev) =>
    shallowEqual(prev, initialValues) ? prev : initialValues
  );
}, [initialValues]);



  useEffect(() => {
    validateForm(runtimeFields, values);
  }, [runtimeFields, values]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let hasErrors = false;

    runtimeFields.forEach((field) => {
      const value = values[field.config.meta.key];
      const errors = validateField(field, value);

      field.state.errors = errors;

      if (errors.length > 0) {
        hasErrors = true;
      }
    });

    // ❌ stop submit if errors
    if (hasErrors) return;

    // ✅ submit only if valid
    onSubmit?.(values);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-full mx-auto space-y-6">
      {sections.map((section) => (
        <section
          key={section.id}
          className="rounded-xl bg-white dark:bg-gray-900 p-5 space-y-6
                   border border-gray-100 dark:border-gray-800/50"
        >
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {section.title}
            </h2>
          </div>

          <div className="space-y-6">
            {section.nodes?.map((node) =>
              renderRuntimeNode(
                node,
                runtimeFieldMap,
                values,
                setValues,
                readOnly,
                handleChange
              )
            )}
          </div>
        </section>
      ))}

      {!readOnly && onSubmit && (
        <div
          className="sticky bottom-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm 
                        p-4 mt-6"
        >
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg
                         bg-gray-900 dark:bg-white text-white dark:text-gray-900 
                         hover:bg-gray-800 dark:hover:bg-gray-100
                         transition-colors duration-150 text-sm font-medium"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Submit</span>
            </button>
          </div>
        </div>
      )}

      {!hideDebug && (
        <div
          className="rounded-xl border border-gray-200 dark:border-gray-800/50 
                       bg-gray-50 dark:bg-gray-900/50 overflow-hidden"
        >
          <div
            className="flex items-center justify-between p-3 border-b 
                         border-gray-200/50 dark:border-gray-800/50"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-6 w-6 rounded-md bg-gray-100 dark:bg-gray-800 
                            flex items-center justify-center"
              >
                <Code className="h-3 w-3 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Form Data
              </div>
            </div>
            <div
              className="text-xs px-2 py-1 rounded-md 
                           bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              {Object.keys(values).length}
            </div>
          </div>
          <pre
            className="text-xs p-3 overflow-x-auto font-mono
                         text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            {JSON.stringify(values, null, 2)}
          </pre>
        </div>
      )}
    </form>
  );
}

/* ======================================================
   NODE RENDERER (FIELD + LAYOUT)
====================================================== */

function renderRuntimeNode(
  node: EditorNode,
  fieldMap: Record<string, RuntimeField>,
  values: Record<string, any>,
  setValues: (v: Record<string, any>) => void,
  readOnly: boolean,
  handleChange: (field: RuntimeField, value: any) => void
): React.ReactNode {
  /* ================= FIELD ================= */
  if (node.kind === "FIELD") {
    const runtime = fieldMap[node.field.key];
    if (!runtime || runtime.state.visible === false) return null;
    // console.log("RUNTIME CHECK", {

    return (
      // <div
      //   key={node.id}
      //   className="space-y-3"
      //   style={{
      //     gridColumn: `span ${node.field.layout.span}`,
      //   }}
      // >
      //   <div className="space-y-1">
      //     <div className="flex items-center gap-2">
      //       <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
      //         {runtime.config.meta.label}
      //         {runtime.config.validation?.rules?.some(
      //           (r) => r.type === "REQUIRED"
      //         ) && (
      //           <span className="ml-1 text-red-500" title="Required">
      //             *
      //           </span>
      //         )}
      //       </label>
      //     </div>
      //   </div>

      //   <RuntimeFieldRenderer
      //     field={{
      //       ...runtime,
      //       state: {
      //         ...runtime.state,
      //         readOnly: readOnly || runtime.state.readOnly,
      //       },
      //     }}
      //     value={values[node.field.key]}
      //     onChange={(v) => handleChange(runtime, v)}
      //   />

      //   {runtime.state.errors?.length ? (
      //     <div className="flex items-center gap-1 text-xs text-red-500">
      //       <div className="h-1 w-1 rounded-full bg-red-500" />
      //       {runtime.state.errors[0]}
      //     </div>
      //   ) : runtime.config.meta.description ? (
      //     <div className="flex items-start gap-1.5 text-xs text-gray-500 dark:text-gray-400">
      //       <Info className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500 mt-0.5 shrink-0" />
      //       <span>{runtime.config.meta.description}</span>
      //     </div>
      //   ) : null}
      // </div>
      <div
        key={node.id}
        className="space-y-3"
        style={{
          gridColumn: `span ${node.field.layout.span}`,
        }}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {runtime.config.meta.label}
              {runtime.config.validation?.rules?.some(
                (r) => r.type === "REQUIRED"
              ) && (
                <span className="ml-1 text-red-500" title="Required">
                  *
                </span>
              )}
            </label>
          </div>
        </div>

        <RuntimeFieldRenderer
          field={{
            ...runtime,
            state: {
              ...runtime.state,
              readOnly: readOnly || runtime.state.readOnly,
            },
          }}
          value={values[node.field.key]}
          onChange={(v) => handleChange(runtime, v)}
        />

        {/* Show error if it exists */}
        {runtime.state.errors?.length ? (
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-red-500">
              <div className="h-1 w-1 rounded-full bg-red-500" />
              {runtime.state.errors[0]}
            </div>
            {/* Also show description below error if it exists */}
            {runtime.config.meta.description && (
              <div className="flex items-start gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Info className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500 mt-0.5 shrink-0" />
                <span>{runtime.config.meta.description}</span>
              </div>
            )}
          </div>
        ) : (
          /* Show only description if no error */
          runtime.config.meta.description && (
            <div className="flex items-start gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <Info className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500 mt-0.5 shrink-0" />
              <span>{runtime.config.meta.description}</span>
            </div>
          )
        )}
      </div>
    );
  }

  /* ================= LAYOUT ================= */
  if (node.kind === "LAYOUT") {
    switch (node.type) {
      /* ---------- COLUMNS ---------- */
      case "columns":
        return (
          <div key={node.id} className="grid grid-cols-12 gap-6">
            {node.slots.map((slot) => (
              <div
                key={slot.id}
                style={{ gridColumn: `span ${slot.config?.span ?? 12}` }}
              >
                <div className="space-y-8">
                  {slot.children.map((child) =>
                    renderRuntimeNode(
                      child,
                      fieldMap,
                      values,
                      setValues,
                      readOnly,
                      handleChange
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      /* ---------- TABS ---------- */
      case "tabs":
        return (
          <RuntimeTabs
            key={node.id}
            node={node}
            fieldMap={fieldMap}
            values={values}
            setValues={setValues}
            renderNode={(child) =>
              renderRuntimeNode(
                child,
                fieldMap,
                values,
                setValues,
                readOnly,
                handleChange
              )
            }
          />
        );

      /* ---------- ACCORDION ---------- */
      case "accordion":
        return (
          <RuntimeAccordion
            key={node.id}
            node={node}
            fieldMap={fieldMap}
            values={values}
            setValues={setValues}
            renderNode={(child) =>
              renderRuntimeNode(
                child,
                fieldMap,
                values,
                setValues,
                readOnly,
                handleChange
              )
            }
          />
        );

      /* ---------- REPEATER ---------- */
      case "repeater":
        return (
          <RuntimeRepeater
            key={node.id}
            node={node}
            fieldMap={fieldMap}
            values={values}
            setValues={setValues}
            renderNode={(child) =>
              renderRuntimeNode(
                child,
                fieldMap,
                values,
                setValues,
                readOnly,
                handleChange
              )
            }
          />
        );

      /* ---------- PRESENTATION ---------- */
      case "heading":
        const headingLevel = node.config?.level ?? 3;
        const headingClass = {
          1: "text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight",
          2: "text-2xl font-bold text-gray-800 dark:text-gray-200",
          3: "text-xl font-semibold text-gray-800 dark:text-gray-200",
          4: "text-lg font-semibold text-gray-700 dark:text-gray-300",
          5: "text-base font-medium text-gray-600 dark:text-gray-400",
          6: "text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
        }[headingLevel];

        return (
          <div key={node.id} className="space-y-2">
            {headingLevel === 1 && (
              <h1 className={headingClass}>{node.config?.text}</h1>
            )}
            {headingLevel === 2 && (
              <h2 className={headingClass}>{node.config?.text}</h2>
            )}
            {headingLevel === 3 && (
              <h3 className={headingClass}>{node.config?.text}</h3>
            )}
            {headingLevel === 4 && (
              <h4 className={headingClass}>{node.config?.text}</h4>
            )}
            {headingLevel === 5 && (
              <h5 className={headingClass}>{node.config?.text}</h5>
            )}
            {headingLevel === 6 && (
              <h6 className={headingClass}>{node.config?.text}</h6>
            )}
            {node.config?.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {node.config.description}
              </p>
            )}
          </div>
        );

      case "divider":
        if (node.config?.text) {
          return (
            <div key={node.id} className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-linear-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
              </div>
              <div className="relative flex justify-center">
                <span
                  className="px-4 text-sm font-medium text-gray-500 dark:text-gray-400 
                               bg-white dark:bg-gray-900"
                >
                  {node.config.text}
                </span>
              </div>
            </div>
          );
        }

        return (
          <div key={node.id} className="my-8">
            <div className="h-px bg-linear-to-r from-transparent via-gray-100 dark:via-gray-800 to-transparent" />
          </div>
        );

      case "spacer":
        return (
          <div key={node.id} style={{ height: node.config?.height ?? 24 }} />
        );
    }
  }

  return null;
}


function shallowEqual(a: any, b: any) {
  if (a === b) return true;
  if (!a || !b) return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every((k) => a[k] === b[k]);
}
