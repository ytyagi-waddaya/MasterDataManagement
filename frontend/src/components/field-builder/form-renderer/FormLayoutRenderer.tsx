"use client";

import { RuntimeField } from "../runtime/runtimeField";
import { FieldControl } from "./FieldControl";
import { layoutToColSpan } from "./layout";

export function FormLayoutRenderer({
  fields,
  values,
  onChange,
  readOnly = false,
}: {
  fields: RuntimeField[];
  values: Record<string, any>;
  onChange?: (key: string, value: any) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="grid grid-cols-12 gap-4">
      {fields.map((field) => (
        <div
          key={field.key}
          className={layoutToColSpan(
            field.ui?.layout?.width
          )}
        >
          <FieldControl
            field={{
              ...field,
              readOnly: readOnly || field.readOnly,
            }}
            value={values[field.key]}
            onChange={(v) =>
              onChange?.(field.key, v)
            }
          />
        </div>
      ))}
    </div>
  );
}
