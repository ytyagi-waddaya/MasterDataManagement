// tabs/FormulaTab.tsx
"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { DynamicField } from "../types/DynamicField";

export function FormulaTab({
  field,
  onUpdate,
}: {
  field: DynamicField;
  onUpdate: (f: DynamicField) => void;
}) {
  const formula = field.formula ?? {
    expression: "",
    dependencies: [],
  };

  return (
    <TabsContent value="formula" className="space-y-3">
      <Textarea
        placeholder="Expression (e.g. price * quantity)"
        value={formula.expression}
        onChange={(e) =>
          onUpdate({
            ...field,
            formula: {
              ...formula,
              expression: e.target.value,
            },
          })
        }
      />

      <Input
        placeholder="Dependencies (comma separated)"
        value={formula.dependencies.join(",")}
        onChange={(e) =>
          onUpdate({
            ...field,
            formula: {
              ...formula,
              dependencies: e.target.value
                .split(",")
                .map((v) => v.trim())
                .filter(Boolean),
            },
          })
        }
      />
    </TabsContent>
  );
}
