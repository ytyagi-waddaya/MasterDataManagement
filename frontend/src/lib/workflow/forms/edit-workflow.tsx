"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Info, ShieldCheck } from "lucide-react";
import { useZodForm } from "@/hooks/useZodForm";
import { updateWorkflowSchema, UpdateWorkflowInput } from "../schema/workflow-schema";
import { Button } from "@/components/ui/button";

interface Props {
  initialValues: UpdateWorkflowInput;
  onSubmit: (data: UpdateWorkflowInput) => void;
  onClose: () => void;
  disabled?: boolean;
}

export const EditWorkflowForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  onClose,
  disabled,
}) => {
  const { form, errors, touched, setValue, onBlur, validateForm, reset } =
    useZodForm(updateWorkflowSchema, initialValues);

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
      {/* Workflow Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Workflow Name</Label>
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
           Uppercase with underscores (e.g., ADMIN_ROLE).
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
          Brief description about the workflow.
        </p>
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
