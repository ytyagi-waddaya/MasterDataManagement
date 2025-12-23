// tabs/VisibilityTab.tsx
"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DynamicField } from "../types/DynamicField";

export function VisibilityTab({
  field,
  onUpdate,
}: {
  field: DynamicField;
  onUpdate: (f: DynamicField) => void;
}) {
  const v = field.visibleIf;

  return (
    <TabsContent value="visibility" className="space-y-3">
      <Input
        placeholder="Dependent field key"
        value={v?.rules?.[0]?.field ?? ""}
        onChange={(e) =>
          onUpdate({
            ...field,
            visibleIf: {
              operator: "AND",
              rules: [
                {
                  field: e.target.value,
                  operator: v?.rules?.[0]?.operator ?? "EQUALS",
                  value: v?.rules?.[0]?.value,
                },
              ],
            },
          })
        }
      />

      <Select
        value={v?.rules?.[0]?.operator ?? "EQUALS"}
        onValueChange={(op) =>
          onUpdate({
            ...field,
            visibleIf: {
              operator: "AND",
              rules: [
                {
                  field: v?.rules?.[0]?.field ?? "",
                  operator: op as any,
                  value: v?.rules?.[0]?.value,
                },
              ],
            },
          })
        }
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="EQUALS">Equals</SelectItem>
          <SelectItem value="IN">In</SelectItem>
          <SelectItem value="GT">Greater than</SelectItem>
          <SelectItem value="LT">Less than</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Value"
        value={v?.rules?.[0]?.value ?? ""}
        onChange={(e) =>
          onUpdate({
            ...field,
            visibleIf: {
              operator: "AND",
              rules: [
                {
                  field: v?.rules?.[0]?.field ?? "",
                  operator: v?.rules?.[0]?.operator ?? "EQUALS",
                  value: e.target.value,
                },
              ],
            },
          })
        }
      />
    </TabsContent>
  );
}
