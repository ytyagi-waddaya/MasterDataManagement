"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Info, ShieldCheck } from "lucide-react";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/components/ui/button";
import {
  UpdateResourceInput,
  updateResourceSchema,
} from "../schema/resource-schema";

interface Props {
  initialValues: UpdateResourceInput;
  onSubmit: (data: UpdateResourceInput) => void;
  onClose: () => void;
  disabled?: boolean;
}

export const EditResourceForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  onClose,
  disabled,
}) => {
  const { form, errors, touched, setValue, onBlur, validateForm, reset } =
    useZodForm(updateResourceSchema, initialValues);

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
      {/* Resource Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Resource Name</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => setValue("name", e.target.value)}
          onBlur={() => onBlur("name")}
          disabled={disabled}
        />
        {touched.name && errors.name && (
          <p className="text-xs text-red-600">{errors.name}</p>
        )}
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Info className="h-3 w-3" />
          Uppercase with underscores (e.g., PROJECT).
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={form.description ?? ""}
          onChange={(e) => setValue("description", e.target.value)}
          onBlur={() => onBlur("description")}
          rows={4}
        />
        {touched.description && errors.description && (
          <p className="text-xs text-red-600">{errors.description}</p>
        )}
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Info className="h-3 w-3" />
          Brief description that clarifies the purpose of this resource
        </p>
      </div>

      {/* System Resource */}
      <div className="flex justify-between items-center rounded-md border p-3 bg-muted/30">
        <div>
          <Label htmlFor="isSystem" className="font-medium mb-2">
            System Resource
          </Label>
          <p className=" flex items-center gap-1 text-xs text-muted-foreground">
            <ShieldCheck className="h-3 w-3" />
            {form.isSystem
              ? "This is a protected system resource and cannot be modified or disabled."
              : "Enable this option to designate the resource as a protected system resource."}
          </p>
        </div>
        <Switch
          id="isSystem"
          checked={form.isSystem}
          onCheckedChange={(val) => setValue("isSystem", val)}
          disabled={disabled}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};
