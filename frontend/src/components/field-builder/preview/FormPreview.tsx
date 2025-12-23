"use client";

import { FieldControl } from "../form-renderer/FieldControl";
import { layoutToColSpan } from "../form-renderer/layout";
import { RuntimeField } from "../runtime/runtimeField";


export function FormPreview({
  fields,
  values = {},
}: {
  fields: RuntimeField[];
  values?: Record<string, any>;
}) {
  return (
    <div className="grid grid-cols-12 gap-4">
      {fields.map((field) => (
        <div
          key={field.key}
          className={layoutToColSpan(field.ui?.layout?.width)}
        >
          <FieldControl
            field={field}
            value={values[field.key]}
          />
        </div>
      ))}
    </div>
  );
}
