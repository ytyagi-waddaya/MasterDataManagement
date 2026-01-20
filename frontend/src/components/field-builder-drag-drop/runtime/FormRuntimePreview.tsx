"use client";

import { useEffect, useMemo, useState } from "react";
import { FormSection, EditorNode } from "../contracts/editor.contract";
import { buildRuntimeSchema, buildRuntimeSchemaFromCanonical } from "../types/buildRuntimeSchema";
import { validateForm } from "../validation/validateForm";
import { RuntimeField } from "../contracts/runtime.contract";

import { RuntimeFieldRenderer } from "./RuntimeField";
import { RuntimeTabs } from "./RuntimeTabs";
import { RuntimeAccordion } from "./RuntimeAccordion";
import { RuntimeRepeater } from "./RuntimeRepeater";
import { Send, Code, Eye, Info } from "lucide-react";
import { validateField } from "./validateField";
import { FieldDefinition } from "../contracts/field-definition.contract";
import { FieldConfig } from "../contracts/field-config.contract";

/* ======================================================
   FORM RUNTIME PREVIEW (PUBLISHED / END-USER UI)
====================================================== */

type FormRuntimePreviewProps = {
  sections: FormSection[];
  fieldDefinitions: FieldDefinition[];
  fieldConfig?: FieldConfig[];
  readOnly?: boolean;
  hideDebug?: boolean;
  onSubmit?: (values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
};

export function FormRuntimePreview({
  sections,
  fieldDefinitions,
  fieldConfig,
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
  // const runtimeFields = useMemo(
  //   () => buildRuntimeSchema(sections, fieldDefinitions),
  //   [sections, fieldDefinitions]
  // );

//   const runtimeFields = useMemo(
//   () => buildRuntimeSchema(sections),
//   [sections]
// );


const runtimeFields = useMemo(() => {
  // ✅ ALWAYS prefer canonical fieldDefinitions
  if (fieldDefinitions?.length) {
    return buildRuntimeSchemaFromCanonical(sections, fieldDefinitions);
  }

  // fallback (editor live only)
  return buildRuntimeSchema(sections);
}, [sections, fieldDefinitions]);



  const runtimeFieldMap = useMemo(() => {
    if (!Array.isArray(runtimeFields)) return {};
    return Object.fromEntries(runtimeFields.map((f) => [f.config.meta.key, f]));
  }, [runtimeFields]);

  const [values, setValues] = useState<Record<string, any>>(
    () => initialValues ?? {}
  );

  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  function handleChange(field: RuntimeField, value: any) {
    const errors = validateField(field, value);
    const key = field.config.meta.key;
    // field.state.errors = errors;
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [key]: errors,
    }));
  }

  useEffect(() => {
    if (!initialValues) return;

    setValues((prev) =>
      shallowEqual(prev, initialValues) ? prev : initialValues
    );
  }, [initialValues]);

  // useEffect(() => {
  //   validateForm(runtimeFields, values);
  // }, [runtimeFields, values]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let hasErrors = false;

    const nextErrors: Record<string, string[]> = {};

    runtimeFields.forEach((field) => {
      const key = field.config.meta.key;
      const value = values[key];
      const errors = validateField(field, value);

      if (errors.length > 0) {
        nextErrors[key] = errors;
        hasErrors = true;
      }
    });

    setFieldErrors(nextErrors);

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
                handleChange,
                fieldErrors
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
  handleChange: (field: RuntimeField, value: any) => void,
  fieldErrors: Record<string, string[]>
): React.ReactNode {
  /* ================= FIELD ================= */
  if (node.kind === "FIELD") {
    const runtime = fieldMap[node.field.key];
    if (!runtime || runtime.state.visible === false) return null;
    const errors = fieldErrors[runtime.config.meta.key];

    return (
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
        {errors?.length ? (
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-red-500">
              <div className="h-1 w-1 rounded-full bg-red-500" />
              {errors[0]}
            </div>
            {/* Also show description below error if it exists */}
            {runtime.config.ui?.helpText && (
              <div className="flex items-start gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>{runtime.config.ui.helpText}</span>
              </div>
            )}
          </div>
        ) : (
          /* Show only description if no error */
          runtime.config.ui?.helpText && (
            <div className="flex items-start gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <Info className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500 mt-0.5 shrink-0" />
              <span>{runtime.config.ui?.helpText}</span>
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
                      handleChange,
                      fieldErrors
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
                handleChange,
                fieldErrors
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
                handleChange,
                fieldErrors
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
                handleChange,
                fieldErrors
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

//             {JSON.stringify(values, null, 2)}
