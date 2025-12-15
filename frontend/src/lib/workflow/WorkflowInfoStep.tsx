// "use client";

// import { Controller } from "react-hook-form";
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

// export function WorkflowInfoStep({ form, resources }: any) {
//   const {
//     register,
//     control,
//     formState: { errors },
//   } = form;

//   return (
//     <Card className="p-6 space-y-2">
//       <div>
//         <h2 className="text-slate-900 mb-1">Workflow Information</h2>
//         <p className="text-slate-600">Basic details about your workflow</p>
//       </div>

//       <div className="space-y-5">
//         {/* Name */}
//         <div className="space-y-2">
//           <Label className="text-slate-700">
//             Workflow Name <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             placeholder="Enter workflow name"
//             className="h-11"
//             {...register("name", { required: true })}
//           />
//           {errors.name && (
//             <span className="text-sm text-red-500">This field is required</span>
//           )}
//         </div>

//         {/* Description */}
//         <div className="space-y-2">
//           <Label className="text-slate-700">Description</Label>
//           <Input
//             placeholder="Describe the purpose of this workflow"
//             className="h-11"
//             {...register("description")}
//           />
//         </div>

//         {/* Resource */}
//         <div className="space-y-2">
//           <Label className="text-slate-700">
//             Resource <span className="text-red-500">*</span>
//           </Label>

//           <Controller
//             name="resource"
//             control={control}
//             rules={{ required: true }}
//             render={({ field }) => (
//               <Select value={field.value} onValueChange={field.onChange}>
//                 <SelectTrigger className="h-11 w-full">
//                   <SelectValue placeholder="Select a resource" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {(resources || []).map((resource: any) => (
//                     <SelectItem key={resource.id} value={resource.id}>
//                       {resource.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             )}
//           />

//           {errors.resource && (
//             <span className="text-sm text-red-500">This field is required</span>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// }
"use client";

import { Controller } from "react-hook-form";
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

export function WorkflowInfoStep({ form, resources = [] }: any) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <Card className="p-6 space-y-2">
      <div>
        <h2 className="text-slate-900 mb-1">Workflow Information</h2>
        <p className="text-slate-600">Basic details about your workflow</p>
      </div>

      <div className="space-y-5">

        {/* WORKFLOW NAME */}
        <div className="space-y-2">
          <Label>
            Workflow Name <span className="text-red-500">*</span>
          </Label>

          <Input
            placeholder="Enter workflow name"
            className="h-11"
            {...register("name", { required: true })}
          />

          {errors.name && (
            <span className="text-sm text-red-500">Required field</span>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <Label>Description</Label>

          <Input
            placeholder="Describe the workflow"
            className="h-11"
            {...register("description")}
          />
        </div>

        {/* RESOURCE SELECT */}
        <div className="space-y-2">
          <Label>
            Resource <span className="text-red-500">*</span>
          </Label>

          <Controller
            name="resourceId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
              >
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Select a resource" />
                </SelectTrigger>

                <SelectContent>
                  {resources.map((r: any) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.resourceId && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>
      </div>
    </Card>
  );
}
