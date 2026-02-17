"use client";

import { Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export function DepartmentForm({
  form,
  errors,
  touched,
  setValue,
  onBlur,
}: {
  form: {
    name: string;
    code: string;
    description: string | null;
    status: "ACTIVE" | "INACTIVE";
  };
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setValue: (field: any, value: any) => void;
  onBlur: (field: any) => void;
}) {
  return (
    <div className="flex flex-col gap-4 py-2">
      
      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Department Name</label>
        <Input
          className={`${errors.name ? "border-red-500" : ""}`}
          value={form.name}
          onChange={(e) => setValue("name", e.target.value)}
          onBlur={() => onBlur("name")}
        />

        {touched.name && errors.name && (
          <p className="text-xs text-red-600">{errors.name}</p>
        )}

        <p className="text-xs text-gray-600 flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-gray-500" />
          Enter a clear and recognizable department name (e.g. HR, FINANCE).
        </p>
      </div>

      {/* Code */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Department Code</label>
        <Input
          className={`${errors.code ? "border-red-500" : ""}`}
          value={form.code}
          onChange={(e) => setValue("code", e.target.value.toUpperCase())}
          onBlur={() => onBlur("code")}
        />

        {touched.code && errors.code && (
          <p className="text-xs text-red-600">{errors.code}</p>
        )}

        <p className="text-xs text-gray-600 flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-gray-500" />
          Must be uppercase and unique (e.g., HR, IT_SUPPORT, SALES).
        </p>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          rows={3}
          className={`${errors.description ? "border-red-500" : ""}`}
          value={form.description ?? ""}
          onChange={(e) => setValue("description", e.target.value)}
          onBlur={() => onBlur("description")}
        />

        {errors.description && (
          <p className="text-xs text-red-600">{errors.description}</p>
        )}

        <p className="text-xs text-gray-600 flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-gray-500" />
          Briefly describe the department’s responsibilities.
        </p>
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.status === "ACTIVE"}
            onChange={(e) =>
              setValue("status", e.target.checked ? "ACTIVE" : "INACTIVE")
            }
            onBlur={() => onBlur("status")}
          />
          <span>Active Department</span>
        </label>

        <p className="text-xs text-gray-600 flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-gray-500" />
          Inactive departments cannot be assigned to users.
        </p>
      </div>
    </div>
  );
}
