// tabs/BasicTab.tsx
"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DynamicField } from "../types/DynamicField";

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "textarea", label: "Long Text" },
  { value: "number", label: "Number" },
  { value: "currency", label: "Currency" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "select", label: "Dropdown" },
  { value: "radio", label: "Radio" },
  { value: "checkbox", label: "Checkbox" },
  { value: "date", label: "Date" },
  { value: "datetime", label: "Date & Time" },
];

export function BasicTab({
  field,
  onUpdate,
}: {
  field: DynamicField;
  onUpdate: (f: DynamicField) => void;
}) {
  return (
    <TabsContent value="basic" className="space-y-5">
      {/* Field type */}
      <Select
        value={field.type}
        onValueChange={(v) =>
          onUpdate({
            ...field,
            type: v as DynamicField["type"],
            options:
              v === "select" || v === "radio"
                ? field.options ?? []
                : undefined,
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Field type" />
        </SelectTrigger>
        <SelectContent>
          {FIELD_TYPES.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Label */}
      <Input
        value={field.label}
        placeholder="Field label"
        onChange={(e) =>
          onUpdate({ ...field, label: e.target.value })
        }
      />

      {/* Placeholder */}
      <Input
        value={field.placeholder ?? ""}
        placeholder="Placeholder"
        onChange={(e) =>
          onUpdate({ ...field, placeholder: e.target.value })
        }
      />

      {/* Help text */}
      <Textarea
        value={field.helperText ?? ""}
        placeholder="Helper text"
        onChange={(e) =>
          onUpdate({ ...field, helperText: e.target.value })
        }
      />

      {/* Flags */}
      <div className="grid grid-cols-2 gap-3">
        {[
          ["required", "Required"],
          ["readOnly", "Read only"],
          ["showInList", "Show in list"],
        ].map(([key, label]) => (
          <label
            key={key}
            className="flex items-center gap-2 text-sm"
          >
            <Checkbox
              checked={(field as any)[key]}
              onCheckedChange={(v) =>
                onUpdate({ ...field, [key]: Boolean(v) })
              }
            />
            {label}
          </label>
        ))}
      </div>

      {/* Layout */}
      <Select
        value={field.layout ?? "full"}
        onValueChange={(v) =>
          onUpdate({ ...field, layout: v as any })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Layout" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="full">Full</SelectItem>
          <SelectItem value="half">Half</SelectItem>
          <SelectItem value="third">One third</SelectItem>
          <SelectItem value="two-third">Two third</SelectItem>
          <SelectItem value="quarter">Quarter</SelectItem>
        </SelectContent>
      </Select>
    </TabsContent>
  );
}
