"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DynamicField } from "../types/DynamicField";

/* ======================================================
   TYPES
====================================================== */

type ApiIntegration = {
  type: "API";
  url: string;
  valueField: string;
  labelField: string;
  dependsOn?: string[];
};

const NONE = "__none__";

/* ======================================================
   COMPONENT
====================================================== */

export function IntegrationTab({
  field,
  onUpdate,
}: {
  field: DynamicField;
  onUpdate: (f: DynamicField) => void;
}) {
  const integration = field.integration as
    | ApiIntegration
    | undefined;

  const isApi = integration?.type === "API";

  return (
    <TabsContent value="integration" className="space-y-4">
      {/* Enable API integration */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isApi}
          onCheckedChange={(v) =>
            onUpdate({
              ...field,
              integration: v
                ? {
                    type: "API",
                    url: "",
                    valueField: "id",
                    labelField: "name",
                    dependsOn: [],
                  }
                : undefined,
            })
          }
        />
        <span className="text-sm">
          Load options from API
        </span>
      </div>

      {!isApi && (
        <div className="text-sm text-muted-foreground">
          Use this for dependent dropdowns (State → City,
          User → Team, etc.)
        </div>
      )}

      {/* ================= API CONFIG ================= */}
      {isApi && integration && (
        <>
          {/* API URL */}
          <Input
            placeholder="/api/cities"
            value={integration.url}
            onChange={(e) =>
              onUpdate({
                ...field,
                integration: {
                  ...integration,
                  url: e.target.value,
                },
              })
            }
          />

          {/* Value field */}
          <Input
            placeholder="valueField (e.g. id)"
            value={integration.valueField}
            onChange={(e) =>
              onUpdate({
                ...field,
                integration: {
                  ...integration,
                  valueField: e.target.value,
                },
              })
            }
          />

          {/* Label field */}
          <Input
            placeholder="labelField (e.g. name)"
            value={integration.labelField}
            onChange={(e) =>
              onUpdate({
                ...field,
                integration: {
                  ...integration,
                  labelField: e.target.value,
                },
              })
            }
          />

          {/* DEPENDENCIES */}
          <Input
            placeholder="Depends on field keys (comma separated)"
            value={(integration.dependsOn ?? []).join(",")}
            onChange={(e) =>
              onUpdate({
                ...field,
                integration: {
                  ...integration,
                  dependsOn: e.target.value
                    .split(",")
                    .map((v) => v.trim())
                    .filter(Boolean),
                },
              })
            }
          />

          <p className="text-xs text-muted-foreground">
            Example: state → city  
            <br />
            State field key: <code>state</code>  
            City dependsOn: <code>state</code>
          </p>
        </>
      )}
    </TabsContent>
  );
}
