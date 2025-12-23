"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { WorkflowFormValues } from "./forms/workflowForm";

type Resource = {
  value: string;
  label: string;
};

type Props = {
  form: UseFormReturn<WorkflowFormValues>;
  resources?: Resource[];
   workflowStatus: "DRAFT" | "PUBLISHED" | "ARCHIVED";
};

export function WorkflowInfoStep({ form, resources = [],workflowStatus, }: Props) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
const isEditable = workflowStatus === "DRAFT";

  return (
    
    <Card className="p-6 space-y-5">
      {/* WORKFLOW NAME */}
      <div className="space-y-1">
        <Label>
          Workflow Name <span className="text-red-500">*</span>
        </Label>
        <Input
          placeholder="Enter workflow name"
          {...register("name", { required: true })}
          disabled={!isEditable}
        />
        {errors.name && <p className="text-sm text-red-500">Required</p>}
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-1">
        <Label>Description</Label>
        <Input
          placeholder="Describe the workflow"
          {...register("description")}
          disabled={!isEditable}
        />
      </div>

      <div className="space-y-1">
                <Label>
          Resource <span className="text-red-500">*</span>
        </Label>
        <Input
          placeholder="Describe the Resource for the workflow"
          {...register("resourceId")}
          disabled={!isEditable}
        />
      </div>
      {/* RESOURCE SELECT */}
      {/* <div className="space-y-1">
        <Label>
          Resource <span className="text-red-500">*</span>
        </Label> */}

        {/* <Controller
          name="resourceId"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select value={field.value ?? ""} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a resource" />
              </SelectTrigger>

              <SelectContent>
                {resources.map((r, index) => (
                  <SelectItem key={`${r.value}-${index}`} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.resourceId && <p className="text-sm text-red-500">Required</p>} */}
      {/* </div> */}
    </Card>
  );
}
