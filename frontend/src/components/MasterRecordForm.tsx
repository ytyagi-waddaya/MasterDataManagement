"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function MasterRecordForm({
  fields,
  formData,
  setValue,
}: {
  fields: any[]; // flattened fields from masterObject.fields.set[*].fields
  formData: Record<string, any>;
  setValue: (key: string, value: any) => void;
}) {
  if (!fields.length) {
    return <p className="text-sm text-gray-500">No fields available.</p>;
  }

  return (
    <div className="flex flex-col gap-4 py-2">
      {fields.map((field) => {
        const value = formData[field.key] ?? "";

        return (
          <div key={field.id} className="flex flex-col gap-1">
            <label className="text-sm font-medium">{field.label}</label>

            {/* ======================= TEXT FIELD ======================= */}
            {field.type === "text" && (
              <Input
                value={value}
                onChange={(e) => setValue(field.key, e.target.value)}
                placeholder={field.placeholder}
              />
            )}

            {/* ======================= NUMBER FIELD ======================= */}
            {field.type === "number" && (
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(field.key, Number(e.target.value))}
                placeholder={field.placeholder}
              />
            )}

            {/* ======================= TEXTAREA ======================= */}
            {field.type === "textarea" && (
              <Textarea
                value={value}
                onChange={(e) => setValue(field.key, e.target.value)}
                placeholder={field.placeholder}
              />
            )}

            {/* ======================= SELECT ======================= */}
            {field.type === "select" && (
              <Select
                value={value}
                onValueChange={(val) => setValue(field.key, val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder || "Select"} />
                </SelectTrigger>

                <SelectContent>
                  {(field.options ?? []).map((opt: any) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* ======================= CHECKBOX ======================= */}
            {field.type === "checkbox" && (
              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  checked={!!value}
                  onCheckedChange={(val) => setValue(field.key, !!val)}
                />
                <span className="text-sm">{field.label}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
