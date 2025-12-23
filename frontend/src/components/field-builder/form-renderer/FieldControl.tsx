"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectItem } from "@/components/ui/select";
import { RuntimeField } from "../runtime/runtimeField";

export function FieldControl({
  field,
  value,
  onChange,
}: {
  field: RuntimeField;
  value?: any;
  onChange?: (v: any) => void;
}) {
  const disabled = field.readOnly;

  switch (field.widget) {
    case "TEXT":
    case "CURRENCY":
      return (
        <Input
          value={value ?? ""}
          placeholder={field.ui?.placeholder}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
        />
      );

    case "TEXTAREA":
      return (
        <Textarea
          value={value ?? ""}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
        />
      );

    case "CHECKBOX":
      return (
        <Checkbox
          checked={!!value}
          disabled={disabled}
          onCheckedChange={(v) => onChange?.(!!v)}
        />
      );

    case "SELECT":
      return (
        <Select
          value={value}
          disabled={disabled}
          onValueChange={(v) => onChange?.(v)}
        >
          {field.options?.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </Select>
      );

    default:
      return null;
  }
}
