"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useZodForm } from "@/hooks/useZodForm";
import {
  UpdateDepartmentInput,
  updateDepartmentSchema,
} from "../schema/department-schema";

interface Props {
  initialValues: UpdateDepartmentInput;
  onSubmit: (data: UpdateDepartmentInput) => void;
  onClose: () => void;
  disabled?: boolean;
}

const departmentStatus = {
  ACTIVE: {
    label: "Active",
    desc: "Department is active and usable in system.",
  },
  INACTIVE: {
    label: "Inactive",
    desc: "Department is temporarily disabled.",
  },
} as const;

export const EditDepartmentForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  onClose,
  disabled,
}) => {
  const { form, errors, touched, setValue, onBlur, validateForm, reset } =
    useZodForm(updateDepartmentSchema, initialValues);

  React.useEffect(() => {
    reset();
  }, [initialValues, reset]);

  const handleSave = () => {
    const result = validateForm();
    if (!result.success) return;

    onSubmit(result.data);
    onClose();
  };

  return (
    <div className="space-y-5 py-2">
      {/* Name */}
      <div className="space-y-2">
        <Label>Department Name</Label>
        <Input
          value={form.name ?? ""}
          onChange={(e) => setValue("name", e.target.value)}
          onBlur={() => onBlur("name")}
          disabled={disabled}
        />
        {touched.name && errors.name && (
          <p className="text-xs text-red-600">{errors.name}</p>
        )}
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Info className="w-3 h-3" />
          Name of the department.
        </p>
      </div>

      {/* Code */}
      <div className="space-y-2">
        <Label>Department Code</Label>
        <Input
          value={form.code ?? ""}
          onChange={(e) => setValue("code", e.target.value)}
          onBlur={() => onBlur("code")}
          disabled={disabled}
        />
        {touched.code && errors.code && (
          <p className="text-xs text-red-600">{errors.code}</p>
        )}
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Info className="w-3 h-3" />
          Unique short identifier (e.g. HR, FIN, IT).
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label>Description</Label>
        <Input
          value={form.description ?? ""}
          onChange={(e) => setValue("description", e.target.value)}
          disabled={disabled}
        />
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label>Status</Label>

        <Select
          value={form.status ?? "ACTIVE"}
          onValueChange={(val) => setValue("status", val as any)}
          disabled={disabled}
        >
          <SelectTrigger className="w-full flex flex-col items-start py-2">
            <span className="font-medium text-sm">
              {departmentStatus[form.status ?? "ACTIVE"].label}
            </span>
            <SelectValue className="hidden" />
          </SelectTrigger>

          <SelectContent>
            {Object.entries(departmentStatus).map(([value, obj]) => (
              <SelectItem key={value} value={value}>
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{obj.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {obj.desc}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={disabled}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};
