"use client";

import { RuntimeField } from "../runtime/runtimeField";
import { groupFieldsBySection } from "../runtime/layout/groupFieldsBySection";
import { FormLayoutRenderer } from "./FormLayoutRenderer";

export function RuntimeForm({
  fields,
  values,
  onChange,
  readOnly = false,
}: {
  fields: RuntimeField[];
  values: Record<string, any>;
  onChange?: (k: string, v: any) => void;
  readOnly?: boolean;
}) {
  const sections = groupFieldsBySection(fields);

  return (
    <div className="space-y-10">
      {[...sections.entries()].map(
        ([sectionTitle, sectionFields]) => (
          <section key={sectionTitle}>
            {/* Section Header */}
            <h3 className="text-lg font-semibold mb-4">
              {sectionTitle}
            </h3>

            {/* Fields inside section */}
            <FormLayoutRenderer
              fields={sectionFields}
              values={values}
              onChange={onChange}
              readOnly={readOnly}
            />
          </section>
        )
      )}
    </div>
  );
}
