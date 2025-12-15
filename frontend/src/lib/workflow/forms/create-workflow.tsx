"use client";

import { Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// ShadCN Select components
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export function WorkflowForm({
  form,
  errors,
  touched,
  setValue,
  onBlur,
  resources,
  close,
}: {
  form: {
    name: string;
    description: string | null;
    isActive: boolean;
    resourceId: string;
  };
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setValue: (field: any, value: any) => void;
  onBlur: (field: any) => void;
  resources: { label: string; value: string }[];
  close?: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 py-2">
      {/* Workflow Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Workflow Name</label>

        <input
          className={`border p-2 rounded ${
            errors.name ? "border-red-500" : ""
          }`}
          value={form.name}
          onChange={(e) => setValue("name", e.target.value)}
          onBlur={() => onBlur("name")}
        />

        {touched.name && errors.name && (
          <p className="text-xs text-red-600">{errors.name}</p>
        )}

        {/* Helper Text */}
        <p className="text-xs text-gray-600 flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-gray-500" />
          Workflow names should be descriptive and unique (e.g.,{" "}
          <strong>Project Approval Flow</strong>).
        </p>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Description</label>

        <Textarea
          rows={3}
          className={`border p-2 rounded ${
            errors.description ? "border-red-500" : ""
          }`}
          value={form.description ?? ""}
          onChange={(e) => setValue("description", e.target.value)}
          onBlur={() => onBlur("description")}
        />

        {touched.description && errors.description && (
          <p className="text-xs text-red-600">{errors.description}</p>
        )}

        {/* Helper Text */}
        <p className="text-xs text-gray-600 flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-gray-500" />
          Provide a short summary explaining what this workflow automates or
          controls.
        </p>
      </div>

      {/* Resource Select (ShadCN) */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Resource</label>

        {/* <Select
          value={form.resourceId}
          onValueChange={(value) => setValue("resourceId", value)}
        >
          <SelectTrigger
            className={`border p-2 rounded w-full ${
              errors.resource ? "border-red-500" : ""
            }`}
          >
            <SelectValue placeholder="Select a resource" />
          </SelectTrigger>

          <SelectContent>
            {resources.length ? (
              resources.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="__none" disabled>
                No resources available
              </SelectItem>
            )}
          </SelectContent>
        </Select> */}
        <Select
          value={form.resourceId}
          onValueChange={(value) => setValue("resourceId", value)}
        >
          <SelectTrigger
            className={`border p-2 rounded w-full ${
              errors.resourceId ? "border-red-500" : ""
            }`}
          >
            <SelectValue placeholder="Select a resource" />
          </SelectTrigger>

          <SelectContent>
            {resources.length ? (
              resources.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="__none" disabled>
                No resources available
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        {touched.resourceId && errors.resourceId && (
          <p className="text-xs text-red-600">{errors.resourceId}</p>
        )}

        {/* Helper Text */}
        <p className="text-xs text-gray-600 flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-gray-500" />
          Select which module or entity this workflow applies to (e.g., Tickets,
          Projects, Requests).
        </p>
      </div>
    </div>
  );
}
