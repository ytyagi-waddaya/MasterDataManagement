"use client";
import { FormSection } from "../types/DynamicField";
import { RuntimeForm } from "../form-renderer/RuntimeForm";
import { buildRuntimeFieldsFromSections } from "../runtime/buildRuntimeFieldsFromSections";
/* ======================================================
   PROPS
====================================================== */

export function FormPreviewTabs({
  sections,
  values = {},
  showBanner = false,
}: {
  sections: FormSection[];
  values?: Record<string, any>;
  showBanner?: boolean;
}) {
  if (!sections.length) return null;

  // ✅ Convert editor sections → runtime fields
  const runtimeFields = buildRuntimeFieldsFromSections(sections);

  return (
    <div className="space-y-4">
      {showBanner && (
        <div className="sticky top-0 z-10 pb-2">
          <span className="text-sm text-muted-foreground">
            Preview mode – changes are not saved
          </span>
        </div>
      )}

      <RuntimeForm
        fields={runtimeFields}
        values={values}
        onChange={() => {}} // preview = readonly interaction
      />
    </div>
  );
}
