// tabs/ValidationTab.tsx
"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { DynamicField } from "../types/DynamicField";

export function ValidationTab({
  field,
  onUpdate,
}: {
  field: DynamicField;
  onUpdate: (f: DynamicField) => void;
}) {
  return (
    <TabsContent value="validation" className="space-y-4">
      <label className="flex items-center gap-2">
        <Checkbox
          checked={field.required}
          onCheckedChange={(v) =>
            onUpdate({ ...field, required: Boolean(v) })
          }
        />
        Required
      </label>

      {field.type === "number" && (
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={field.min ?? ""}
            onChange={(e) =>
              onUpdate({
                ...field,
                min: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
          />
          <Input
            type="number"
            placeholder="Max"
            value={field.max ?? ""}
            onChange={(e) =>
              onUpdate({
                ...field,
                max: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
          />
        </div>
      )}
    </TabsContent>
  );
}
