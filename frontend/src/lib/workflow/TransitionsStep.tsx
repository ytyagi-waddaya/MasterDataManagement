// "use client";

// import { Controller } from "react-hook-form";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";


// import { Trash2, Plus } from "lucide-react";
// import { MultiSelect } from "./multiselect";

// export function TransitionsStep({
//   form,
//   transitionArray,
//   stages,
//   roleList,
//   userList,
// }: any) {
//   const { register, control, watch } = form;

//   return (
//     <Card className="p-6 space-y-2">
//       <div className="flex justify-between">
//         <div>
//           <h2 className="text-slate-900 mb-1">Workflow Transitions</h2>
//           <p className="text-slate-600">Define how stages connect</p>
//         </div>

//         <Button
//           type="button"
//           onClick={() =>
//             transitionArray.append({
//               label: "",
//               fromStageId: "",
//               toStageId: "",
//               allowedRoleIds: [],
//               allowedUserIds: [],
//               requiresApproval: false,
//               autoTrigger: false,
//             })
//           }
//         >
//           <Plus className="w-4 h-4 mr-2" /> Add Transition
//         </Button>
//       </div>

//       <div className="space-y-4">
//         {transitionArray.fields.map((field: any, index: number) => (
//           <Card key={field.id} className="p-5 space-y-4 border">
//             <div className="flex justify-between">
//               <span>Transition {index + 1}</span>
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 className="hover:text-red-600"
//                 onClick={() => transitionArray.remove(index)}
//               >
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//             </div>

//             {/* Grid */}
//             <div className="grid gap-4 md:grid-cols-2">
//               {/* Label */}
//               <div className="md:col-span-2 space-y-2">
//                 <Label>Label</Label>
//                 <Input
//                   placeholder="Transition label"
//                   {...register(`transitions.${index}.label`, {
//                     required: true,
//                   })}
//                 />
//               </div>

//               {/* From Stage */}
//               <div className="space-y-2">
//                 <Label>From Stage</Label>
//                 <Controller
//                   name={`transitions.${index}.fromStageId`}
//                   control={control}
//                   render={({ field }) => (
//                     <Select value={field.value} onValueChange={field.onChange}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select stage" />
//                       </SelectTrigger>

//                       <SelectContent>
//                         {stages.map((s: any, i: number) => (
//                           <SelectItem key={i} value={String(i)}>
//                             {s.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   )}
//                 />
//               </div>

//               {/* To Stage */}
//               <div className="space-y-2">
//                 <Label>To Stage</Label>
//                 <Controller
//                   name={`transitions.${index}.toStageId`}
//                   control={control}
//                   render={({ field }) => (
//                     <Select value={field.value} onValueChange={field.onChange}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select stage" />
//                       </SelectTrigger>

//                       <SelectContent>
//                         {stages.map((s: any, i: number) => (
//                           <SelectItem key={i} value={String(i)}>
//                             {s.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   )}
//                 />
//               </div>

//               {/* Allowed Roles */}
//               <div className="space-y-2">
//                 <Label>Allowed Roles</Label>
//                 <Controller
//                   name={`transitions.${index}.allowedRoleIds`}
//                   control={control}
//                   render={({ field }) => (
//                     <MultiSelect
//                       options={roleList || []}
//                       value={field.value}
//                       onChange={field.onChange}
//                     />
//                   )}
//                 />
//               </div>

//               {/* Allowed Users */}
//               <div className="space-y-2">
//                 <Label>Allowed Users</Label>
//                 <Controller
//                   name={`transitions.${index}.allowedUserIds`}
//                   control={control}
//                   render={({ field }) => (
//                     <MultiSelect
//                       options={userList || []}
//                       value={field.value}
//                       onChange={field.onChange}
//                     />
//                   )}
//                 />
//               </div>

//               {/* Approval + Autotrigger */}
//               <div className="flex items-center gap-6 md:col-span-2">
//                 <div className="flex items-center gap-2">
//                   <Controller
//                     name={`transitions.${index}.requiresApproval`}
//                     control={control}
//                     render={({ field }) => (
//                       <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                     )}
//                   />
//                   <Label>Requires Approval</Label>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Controller
//                     name={`transitions.${index}.autoTrigger`}
//                     control={control}
//                     render={({ field }) => (
//                       <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                     )}
//                   />
//                   <Label>Auto Trigger</Label>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </Card>
//   );
// }

// "use client";

// import { Controller } from "react-hook-form";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { Trash2, Plus } from "lucide-react";
// import { MultiSelect } from "./multiselect";

// export function TransitionsStep({
//   form,
//   transitionArray,
//   stages,
//   roles,
//   users,
// }: any) {
//   const { register, control } = form;

//   return (
//     <Card className="p-6 space-y-2">
//       <div className="flex justify-between">
//         <div>
//           <h2 className="text-slate-900 mb-1">Workflow Transitions</h2>
//           <p className="text-slate-600">Define how stages connect</p>
//         </div>

//         <Button
//           type="button"
//           onClick={() =>
//             transitionArray.append({
//               label: "",
//               fromStageId: "",
//               toStageId: "",
//               allowedRoleIds: [],
//               allowedUserIds: [],
//               requiresApproval: false,
//               autoTrigger: false,
//             })
//           }
//         >
//           <Plus className="w-4 h-4 mr-2" /> Add Transition
//         </Button>
//       </div>

//       <div className="space-y-4">
//         {transitionArray.fields.map((field: any, index: number) => (
//           <Card key={field.id} className="p-5 space-y-4 border">
//             <div className="flex justify-between">
//               <span>Transition {index + 1}</span>

//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 className="hover:text-red-600"
//                 onClick={() => transitionArray.remove(index)}
//               >
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//             </div>

//             {/* Grid */}
//             <div className="grid gap-4 md:grid-cols-2">
              
//               {/* Label */}
//               <div className="md:col-span-2 space-y-2">
//                 <Label>Label</Label>
//                 <Input
//                   placeholder="Transition label"
//                   {...register(`transitions.${index}.label`, {
//                     required: true,
//                   })}
//                 />
//               </div>

//               {/* From Stage */}
//               <div className="space-y-2">
//                 <Label>From Stage</Label>
//                 <Controller
//                   name={`transitions.${index}.fromStageId`}
//                   control={control}
//                   render={({ field }) => (
//                     <Select value={field.value} onValueChange={field.onChange}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select stage" />
//                       </SelectTrigger>

//                       <SelectContent>
//                         {stages?.map((s: any) => (
//                           <SelectItem key={s.id} value={s.id}>
//                             {s.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   )}
//                 />
//               </div>

//               {/* To Stage */}
//               <div className="space-y-2">
//                 <Label>To Stage</Label>
//                 <Controller
//                   name={`transitions.${index}.toStageId`}
//                   control={control}
//                   render={({ field }) => (
//                     <Select value={field.value} onValueChange={field.onChange}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select stage" />
//                       </SelectTrigger>

//                       <SelectContent>
//                         {stages?.map((s: any) => (
//                           <SelectItem key={s.id} value={s.id}>
//                             {s.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   )}
//                 />
//               </div>

//               {/* Allowed Roles */}
//               <div className="space-y-2">
//                 <Label>Allowed Roles</Label>
//                 <Controller
//                   name={`transitions.${index}.allowedRoleIds`}
//                   control={control}
//                   render={({ field }) => (
//                     <MultiSelect
//                       options={roles} // [{label, value}]
//                       value={field.value}
//                       onChange={field.onChange}
//                     />
//                   )}
//                 />
//               </div>

//               {/* Allowed Users */}
//               <div className="space-y-2">
//                 <Label>Allowed Users</Label>
//                 <Controller
//                   name={`transitions.${index}.allowedUserIds`}
//                   control={control}
//                   render={({ field }) => (
//                     <MultiSelect
//                       options={users} // [{label, value}]
//                       value={field.value}
//                       onChange={field.onChange}
//                     />
//                   )}
//                 />
//               </div>

//               {/* Approval + Autotrigger */}
//               <div className="flex items-center gap-6 md:col-span-2">

//                 <div className="flex items-center gap-2">
//                   <Controller
//                     name={`transitions.${index}.requiresApproval`}
//                     control={control}
//                     render={({ field }) => (
//                       <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                     )}
//                   />
//                   <Label>Requires Approval</Label>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Controller
//                     name={`transitions.${index}.autoTrigger`}
//                     control={control}
//                     render={({ field }) => (
//                       <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                     )}
//                   />
//                   <Label>Auto Trigger</Label>
//                 </div>

//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </Card>
//   );
// }
"use client";

import { Controller } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Trash2, Plus } from "lucide-react";
import { MultiSelect } from "./multiselect";

export function TransitionsStep({
  form,
  transitionArray,
  stages,
  roleList = [],
  userList = [],
}: any) {
  const { register, control } = form;

  // ✅ Normalize stages into { id, name }
  const normalizedStages = stages.map((s: any) => ({
    id: String(s.order), // must be string for Select
    name: s.name,
  }));

  return (
    <Card className="p-6 space-y-2">
      <div className="flex justify-between">
        <div>
          <h2 className="text-slate-900 mb-1">Workflow Transitions</h2>
          <p className="text-slate-600">Define how stages connect</p>
        </div>

        <Button
          type="button"
          onClick={() =>
            transitionArray.append({
              label: "",
              fromStageId: "",
              toStageId: "",
              allowedRoleIds: [],
              allowedUserIds: [],
              requiresApproval: false,
              autoTrigger: false,
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" /> Add Transition
        </Button>
      </div>

      <div className="space-y-4">
        {transitionArray.fields.map((field: any, index: number) => (
          <Card key={field.id} className="p-5 space-y-4 border">
            <div className="flex justify-between">
              <span>Transition {index + 1}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="hover:text-red-600"
                onClick={() => transitionArray.remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Label */}
              <div className="md:col-span-2 space-y-2">
                <Label>Label</Label>
                <Input
                  placeholder="Transition label"
                  {...register(`transitions.${index}.label`, {
                    required: true,
                  })}
                />
              </div>

              {/* From Stage */}
              <div className="space-y-2">
                <Label>From Stage</Label>
                <Controller
                  name={`transitions.${index}.fromStageId`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={String(field.value ?? "")}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>

                      <SelectContent>
                        {normalizedStages.map((s:any) => (
                          <SelectItem key={s.id} value={s.name}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* To Stage */}
              <div className="space-y-2">
                <Label>To Stage</Label>
                <Controller
                  name={`transitions.${index}.toStageId`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={String(field.value ?? "")}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>

                      <SelectContent>
                        {normalizedStages.map((s:any) => (
                          <SelectItem key={s.id} value={s.name}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Allowed Roles */}
              <div className="space-y-2">
                <Label>Allowed Roles</Label>
                <Controller
                  name={`transitions.${index}.allowedRoleIds`}
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={roleList}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>

              {/* Allowed Users */}
              <div className="space-y-2">
                <Label>Allowed Users</Label>
                <Controller
                  name={`transitions.${index}.allowedUserIds`}
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={userList}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>

              {/* Approval + Autotrigger */}
              <div className="flex items-center gap-6 md:col-span-2">
                <div className="flex items-center gap-2">
                  <Controller
                    name={`transitions.${index}.requiresApproval`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    )}
                  />
                  <Label>Requires Approval</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Controller
                    name={`transitions.${index}.autoTrigger`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    )}
                  />
                  <Label>Auto Trigger</Label>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
