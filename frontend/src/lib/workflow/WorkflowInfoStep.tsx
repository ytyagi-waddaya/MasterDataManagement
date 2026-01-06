// "use client";

// import { Controller, UseFormReturn } from "react-hook-form";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import { WorkflowFormValues } from "./forms/workflowForm";

// type Resource = {
//   value: string;
//   label: string;
// };

// type Props = {
//   form: UseFormReturn<WorkflowFormValues>;
//   resources?: Resource[];
//    workflowStatus: "DRAFT" | "PUBLISHED" | "ARCHIVED";
// };

// export function WorkflowInfoStep({ form, resources = [],workflowStatus, }: Props) {
//   const {
//     register,
//     control,
//     formState: { errors },
//   } = form;
// const isEditable = workflowStatus === "DRAFT";

//   return (

//     <Card className="p-6 space-y-5">
//       {/* WORKFLOW NAME */}
//       <div className="space-y-1">
//         <Label>
//           Workflow Name <span className="text-red-500">*</span>
//         </Label>
//         <Input
//           placeholder="Enter workflow name"
//           {...register("name", { required: true })}
//           disabled={!isEditable}
//         />
//         {errors.name && <p className="text-sm text-red-500">Required</p>}
//       </div>

//       {/* DESCRIPTION */}
//       <div className="space-y-1">
//         <Label>Description</Label>
//         <Input
//           placeholder="Describe the workflow"
//           {...register("description")}
//           disabled={!isEditable}
//         />
//       </div>

//       <div className="space-y-1">
//                 <Label>
//           Resource <span className="text-red-500">*</span>
//         </Label>
//         <Input
//           placeholder="Describe the Resource for the workflow"
//           {...register("resourceId")}
//           disabled={!isEditable}
//         />
//       </div>
//       {/* RESOURCE SELECT */}
//       {/* <div className="space-y-1">
//         <Label>
//           Resource <span className="text-red-500">*</span>
//         </Label> */}

//         {/* <Controller
//           name="resourceId"
//           control={control}
//           rules={{ required: true }}
//           render={({ field }) => (
//             <Select value={field.value ?? ""} onValueChange={field.onChange}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select a resource" />
//               </SelectTrigger>

//               <SelectContent>
//                 {resources.map((r, index) => (
//                   <SelectItem key={`${r.value}-${index}`} value={r.value}>
//                     {r.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           )}
//         />

//         {errors.resourceId && <p className="text-sm text-red-500">Required</p>} */}
//       {/* </div> */}
//     </Card>
//   );
// }
"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { WorkflowFormValues } from "./forms/workflowForm";
import { Settings, FileText, Database } from "lucide-react";

type Resource = {
  value: string;
  label: string;
};

type Props = {
  form: UseFormReturn<WorkflowFormValues>;
  resources?: Resource[];
  workflowStatus: "DRAFT" | "PUBLISHED" | "ARCHIVED";
};

export function WorkflowInfoStep({
  form,
  resources = [],
  workflowStatus,
}: Props) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const isEditable = workflowStatus === "DRAFT";

  return (
    <div className="space-y-6">
      <div>
        <div>
          <h3 className="text-sm font-medium text-gray-900">Workflow Basics</h3>
          <p className="text-xs text-gray-500">
            Define the fundamental information for your workflow
          </p>
        </div>

        {!isEditable && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 text-sm rounded-lg border border-amber-200 mb-4">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            Workflow is published - some fields are read-only
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Workflow Name */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium text-gray-900">
              Workflow Name
            </Label>
            <span className="text-red-500 text-sm">*</span>
          </div>
          <div className="relative">
            <Input
              placeholder="e.g., Customer Onboarding"
              {...register("name", { required: true })}
              disabled={!isEditable}
              className={`
                h-11 rounded-lg border-gray-300
                ${!isEditable ? "bg-gray-50 text-gray-500" : "bg-white"}
                ${
                  errors.name ? "border-red-300 focus-visible:ring-red-200" : ""
                }
                focus-visible:ring-gray-200
              `}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">
                Workflow name is required
              </p>
            )}
          </div>
        </div>

        {/* Resource */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium text-gray-900">
              Resource
            </Label>
            <span className="text-red-500 text-sm">*</span>
          </div>
          <div className="relative">
            <Input
              placeholder="e.g., Customer"
              {...register("resourceId", { required: true })}
              disabled={!isEditable}
              className={`
                h-11 rounded-lg border-gray-300
                ${!isEditable ? "bg-gray-50 text-gray-500" : "bg-white"}
                ${
                  errors.resourceId
                    ? "border-red-300 focus-visible:ring-red-200"
                    : ""
                }
                focus-visible:ring-gray-200
              `}
            />
            {errors.resourceId && (
              <p className="mt-2 text-sm text-red-600">Resource is required</p>
            )}
          </div>
          <p className="text-xs text-gray-500">
            The resource this workflow will manage (e.g., Customer, Order, Task)
          </p>
        </div>

        {/* Description - Full Width */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium text-gray-900">
              Description
            </Label>
            <span className="text-xs text-gray-400">(Optional)</span>
          </div>
          <div className="relative">
            <Textarea
              placeholder="Describe the purpose and scope of this workflow..."
              {...register("description")}
              disabled={!isEditable}
              className={`
                min-h-[100px] rounded-lg border-gray-300
                ${!isEditable ? "bg-gray-50 text-gray-500" : "bg-white"}
                focus-visible:ring-gray-200
              `}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">
                Provide context for team members using this workflow
              </p>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Optional
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Separator */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 uppercase tracking-wider">
          Configuration
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Status Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`
            h-3 w-3 rounded-full
            ${
              workflowStatus === "DRAFT"
                ? "bg-amber-500"
                : workflowStatus === "PUBLISHED"
                ? "bg-green-500"
                : "bg-gray-400"
            }
          `}
          />
          <span className="text-sm font-medium text-gray-700">
            Status:{" "}
            {workflowStatus.charAt(0) + workflowStatus.slice(1).toLowerCase()}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {isEditable ? "Editable" : "Read-only"}
        </div>
      </div>
    </div>
  );
}
