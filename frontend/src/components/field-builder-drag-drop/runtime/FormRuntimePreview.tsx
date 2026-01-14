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

// /* ======================================================
//    FORM RUNTIME PREVIEW (PUBLISHED / END-USER UI)
// ====================================================== */

// type FormRuntimePreviewProps = {
//   sections: FormSection[];
//   readOnly?: boolean;
//   hideDebug?: boolean;
//   onSubmit?: (values: Record<string, any>) => void;
// };


// export function FormRuntimePreview({
//   sections,
//   readOnly = false,
//   hideDebug = false,
//   onSubmit,
// }: FormRuntimePreviewProps) {
//   /* 🔥 HARD GUARD */
//   if (!Array.isArray(sections) || sections.length === 0) {
//     return (
//       <div className="p-6 text-sm text-muted-foreground">
//         No published form schema available.
//       </div>
//     );
//   }

//   /* ---------- Build runtime field schema ---------- */
//   const runtimeFields = useMemo(() => buildRuntimeSchema(sections), [sections]);

//   const runtimeFieldMap = useMemo(() => {
//     if (!Array.isArray(runtimeFields)) return {};
//     return Object.fromEntries(runtimeFields.map((f) => [f.config.meta.key, f]));
//   }, [runtimeFields]);

//   const [values, setValues] = useState<Record<string, any>>({});

//   useEffect(() => {
//     validateForm(runtimeFields, values);
//   }, [runtimeFields, values]);

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     onSubmit?.(values);
//   }

//   return (
//     <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 space-y-12">
//       {sections.map((section) => (
//         <section
//           key={section.id}
//           className="rounded-xl border bg-background p-6 space-y-6"
//         >
//           <h2 className="text-lg font-semibold">{section.title}</h2>
//           <div className="space-y-8">
//             {section.nodes?.map((node) =>
//               renderRuntimeNode(
//                 node,
//                 runtimeFieldMap,
//                 values,
//                 setValues,
//                 readOnly
//               )
//             )}
//           </div>
//         </section>
//       ))}

//       {!readOnly && onSubmit && (
//         <div className="pt-8">
//           <button
//             type="submit"
//             className="px-6 py-2 rounded-md bg-primary text-primary-foreground"
//           >
//             Submit
//           </button>
//         </div>
//       )}

//       {!hideDebug && (
//         <pre className="bg-muted p-4 rounded text-xs">
//           {JSON.stringify(values, null, 2)}
//         </pre>
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
//   readOnly: boolean
// ): React.ReactNode {
//   /* ================= FIELD ================= */
//   if (node.kind === "FIELD") {
//     const runtime = fieldMap[node.field.key];
//     if (!runtime || runtime.state.visible === false) return null;

//     return (
//       <div
//         key={node.id}
//         className="space-y-1"
//         style={{
//           gridColumn: `span ${node.field.layout.span}`,
//         }}
//       >
//         <div className="flex items-center gap-2">
//           <label className="text-sm font-medium text-foreground">
//             {runtime.config.meta.label}
//           </label>

//           {runtime.config.validation?.rules?.some(
//             (r) => r.type === "REQUIRED"
//           ) && <span className="text-xs text-red-500">*</span>}
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
//           onChange={(v) =>
//             setValues({
//               ...values,
//               [node.field.key]: v,
//             })
//           }
//         />

//         {runtime.state.errors?.length ? (
//           <p className="text-xs text-red-500">{runtime.state.errors[0]}</p>
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
//           <div key={node.id} className="grid grid-cols-12 gap-8">
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
//                       readOnly
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
//               renderRuntimeNode(child, fieldMap, values, setValues, readOnly)
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
//               renderRuntimeNode(child, fieldMap, values, setValues, readOnly)
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
//               renderRuntimeNode(child, fieldMap, values, setValues, readOnly)
//             }
//           />
//         );

//       /* ---------- PRESENTATION ---------- */
//       case "heading":
//         return (
//           <h3 key={node.id} className="text-lg font-semibold">
//             {node.config?.text}
//           </h3>
//         );

//       case "divider":
//         return <hr key={node.id} />;

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
import { Send, Code } from "lucide-react";

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

export function FormRuntimePreview({
  sections,
  readOnly = false,
  hideDebug = false,
  onSubmit,
 initialValues = {},
}: FormRuntimePreviewProps) {
  /* 🔥 HARD GUARD */
  if (!Array.isArray(sections) || sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center ">
        <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-4 flex items-center justify-center">
          <div className="h-6 w-6 rounded border border-gray-300 dark:border-gray-700" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No published form schema available.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Add fields to the form to preview it here.
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

const [values, setValues] = useState<Record<string, any>>(() => initialValues ?? {});
//   useEffect(() => {
//   setValues(initialValues ?? {});
// }, [initialValues]);
  useEffect(() => {
    validateForm(runtimeFields, values);
  }, [runtimeFields, values]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.(values);
  }

  useEffect(() => {
  if (initialValues) {
    setValues(initialValues);
  }
}, [initialValues]);


  return (
    <form onSubmit={handleSubmit} className="max-w-full mx-auto p-4 sm:p-6 space-y-8">
      {sections.map((section) => (
        <section
          key={section.id}
          className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-6 space-y-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {section.title}
          </h2>
          <div className="space-y-6">
            {section.nodes?.map((node) =>
              renderRuntimeNode(
                node,
                runtimeFieldMap,
                values,
                setValues,
                readOnly
              )
            )}
          </div>
        </section>
      ))}

      {!readOnly && onSubmit && (
        <div className="pt-6">
          <button
            type="submit"
            className="
              flex items-center gap-2 px-4 py-2.5 rounded-lg
              bg-blue-600 text-white hover:bg-blue-700
              transition-colors
            "
          >
            <Send className="h-4 w-4" />
            <span>Submit Form</span>
          </button>
        </div>
      )}

      {!hideDebug && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-gray-500" />
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Debug Data
            </div>
          </div>
          <pre className="
            text-xs p-4 rounded-lg border border-gray-200 dark:border-gray-800
            bg-gray-50 dark:bg-gray-900 overflow-x-auto
            font-mono
          ">
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
  readOnly: boolean
): React.ReactNode {
  /* ================= FIELD ================= */
  if (node.kind === "FIELD") {
    const runtime = fieldMap[node.field.key];
    if (!runtime || runtime.state.visible === false) return null;

    return (
      <div
        key={node.id}
        className="space-y-2"
        style={{
          gridColumn: `span ${node.field.layout.span}`,
        }}
      >
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {runtime.config.meta.label}
            {runtime.config.validation?.rules?.some(
              (r) => r.type === "REQUIRED"
            ) && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </label>
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
          onChange={(v) =>
            setValues({
              ...values,
              [node.field.key]: v,
            })
          }
        />

        {runtime.state.errors?.length ? (
          <div className="text-xs text-red-500">
            {runtime.state.errors[0]}
          </div>
        ) : runtime.config.meta.description ? (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {runtime.config.meta.description}
          </div>
        ) : null}
      </div>
    );
  }

  /* ================= LAYOUT ================= */
  if (node.kind === "LAYOUT") {
    switch (node.type) {
      /* ---------- COLUMNS ---------- */
      case "columns":
        return (
          <div key={node.id} className="grid grid-cols-12 gap-4 sm:gap-6">
            {node.slots.map((slot) => (
              <div
                key={slot.id}
                className={`col-span-${slot.config?.span ?? 12}`}
              >
                <div className="space-y-6">
                  {slot.children.map((child) =>
                    renderRuntimeNode(
                      child,
                      fieldMap,
                      values,
                      setValues,
                      readOnly
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
              renderRuntimeNode(child, fieldMap, values, setValues, readOnly)
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
              renderRuntimeNode(child, fieldMap, values, setValues, readOnly)
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
              renderRuntimeNode(child, fieldMap, values, setValues, readOnly)
            }
          />
        );

      /* ---------- PRESENTATION ---------- */
      case "heading":
        const headingLevel = node.config?.level ?? 3;
        const headingClass = {
          1: "text-2xl font-bold text-gray-900 dark:text-gray-100",
          2: "text-xl font-semibold text-gray-800 dark:text-gray-200",
          3: "text-lg font-semibold text-gray-700 dark:text-gray-300",
          4: "text-md font-medium text-gray-700 dark:text-gray-300",
          5: "text-sm font-medium text-gray-600 dark:text-gray-400",
          6: "text-sm font-normal text-gray-500 dark:text-gray-500 uppercase tracking-wide",
        }[headingLevel];

        return (
          <div key={node.id} className="space-y-1">
            {headingLevel === 1 && <h1 className={headingClass}>{node.config?.text}</h1>}
            {headingLevel === 2 && <h2 className={headingClass}>{node.config?.text}</h2>}
            {headingLevel === 3 && <h3 className={headingClass}>{node.config?.text}</h3>}
            {headingLevel === 4 && <h4 className={headingClass}>{node.config?.text}</h4>}
            {headingLevel === 5 && <h5 className={headingClass}>{node.config?.text}</h5>}
            {headingLevel === 6 && <h6 className={headingClass}>{node.config?.text}</h6>}
            {node.config?.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {node.config.description}
              </p>
            )}
          </div>
        );

      case "divider":
        return (
          <div key={node.id} className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gray-200 dark:bg-gray-800" />
            </div>
            {node.config?.text && (
              <div className="relative flex justify-center">
                <span className="px-3 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
                  {node.config.text}
                </span>
              </div>
            )}
          </div>
        );

      case "spacer":
        return (
          <div key={node.id} style={{ height: node.config?.height ?? 16 }} />
        );
    }
  }

  return null;
}