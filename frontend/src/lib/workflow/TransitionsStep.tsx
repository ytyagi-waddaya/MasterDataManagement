// "use client";

// import { Controller, useFieldArray, useWatch } from "react-hook-form";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Trash2, Plus, ArrowRight } from "lucide-react";
// import { MultiSelect } from "./multiselect";
// import { useEffect } from "react";
// import { Checkbox } from "@/components/ui/checkbox";

// /* ======================================================
//    SMALL UI HELPERS
// ====================================================== */

// function Section({
//   title,
//   description,
//   children,
// }: {
//   title: string;
//   description?: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="space-y-4 rounded-xl bg-muted/40 p-4">
//       <div>
//         <h4 className="text-sm font-semibold">{title}</h4>
//         {description && (
//           <p className="text-xs text-muted-foreground">{description}</p>
//         )}
//       </div>
//       {children}
//     </div>
//   );
// }

// /* ======================================================
//    APPROVAL LEVEL EDITOR (SEQUENTIAL)
// ====================================================== */

// function ApprovalLevelsEditor({ control, name, roleList, userList }: any) {
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name,
//   });

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <Label className="font-semibold">Approval Levels</Label>
//         <Button
//           type="button"
//           size="sm"
//           variant="outline"
//           onClick={() =>
//             append({
//               order: fields.length + 1,
//               roleIds: [],
//               userIds: [],
//             })
//           }
//         >
//           <Plus className="mr-1 h-4 w-4" />
//           Add Level
//         </Button>
//       </div>

//       {fields.map((level, i) => (
//         <Card
//           key={level.id}
//           className="space-y-4 rounded-xl border-l-4 border-primary p-4"
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
//                 {i + 1}
//               </div>
//               <span className="font-medium">Approval Level {i + 1}</span>
//             </div>

//             <Button
//               type="button"
//               size="icon"
//               variant="ghost"
//               onClick={() => remove(i)}
//             >
//               <Trash2 className="h-4 w-4 text-destructive" />
//             </Button>
//           </div>

//           <div className="space-y-2">
//             <Label className="text-xs text-muted-foreground">
//               Approver Roles
//             </Label>
//             <Controller
//               name={`${name}.${i}.roleIds`}
//               control={control}
//               render={({ field }) => (
//                 <MultiSelect
//                   options={roleList}
//                   value={Array.isArray(field.value) ? field.value : []}
//                   onChange={field.onChange}
//                   placeholder="Select roles"
//                 />
//               )}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label className="text-xs text-muted-foreground">
//               Specific Users
//             </Label>
//             <Controller
//               name={`${name}.${i}.userIds`}
//               control={control}
//               render={({ field }) => (
//                 <MultiSelect
//                   options={userList}
//                   value={Array.isArray(field.value) ? field.value : []}
//                   onChange={field.onChange}
//                   placeholder="Select users"
//                 />
//               )}
//             />
//           </div>
//         </Card>
//       ))}
//     </div>
//   );
// }

// /* ======================================================
//    SINGLE TRANSITION ROW
// ====================================================== */

// function TransitionRow({
//   index,
//   control,
//   register,
//   setValue,
//   remove,
//   normalizedStages,
//   roleList,
//   userList,
// }: any) {
//   const transitionType = useWatch({
//     control,
//     name: `transitions.${index}.transitionType`,
//   });

//   const approvalConfig = useWatch({
//     control,
//     name: `transitions.${index}.approvalConfig`,
//   });

//   const fromStage = useWatch({
//     control,
//     name: `transitions.${index}.fromStageId`,
//   });

//   const toStage = useWatch({
//     control,
//     name: `transitions.${index}.toStageId`,
//   });

//   const approvalMode = approvalConfig?.mode;
//   const requiresApproval = transitionType === "APPROVAL";

//   /* Prevent self-loop */
//   useEffect(() => {
//     if (fromStage && toStage && fromStage === toStage) {
//       setValue(`transitions.${index}.transitionType`, "REVIEW");
//     }
//   }, [fromStage, toStage, index, setValue]);

//   /* Clear levels if switched to parallel */
//   useEffect(() => {
//     if (approvalConfig?.mode === "PARALLEL" && approvalConfig?.levels?.length) {
//       setValue(`transitions.${index}.approvalConfig.levels`, []);
//     }
//   }, [approvalConfig?.mode, index, setValue]);

//   return (
//     <Card className="space-y-6 rounded-2xl p-6">
//       <div className="flex justify-between">
//         <h3 className="text-sm font-semibold">Transition {index + 1}</h3>
//         <Button
//           type="button"
//           size="icon"
//           variant="ghost"
//           onClick={() => remove(index)}
//         >
//           <Trash2 className="h-4 w-4 text-destructive" />
//         </Button>
//       </div>

//       <Section
//         title="Action"
//         description="Label shown to users as a workflow action"
//       >
//         <Input
//           placeholder="e.g. Submit for approval"
//           {...register(`transitions.${index}.label`, {
//             required: true,
//           })}
//         />
//       </Section>

//       <Section
//         title="Workflow Flow"
//         description="Defines how the record moves between stages"
//       >
//         <div className="flex items-end gap-3">
//           <Controller
//             name={`transitions.${index}.fromStageId`}
//             control={control}
//             render={({ field }) => (
//               <Select value={field.value ?? ""} onValueChange={field.onChange}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="From stage" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {normalizedStages.map((s: any) => (
//                     <SelectItem key={s.id} value={s.id}>
//                       {s.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             )}
//           />

//           <ArrowRight className="h-4 w-4 text-muted-foreground" />

//           <Controller
//             name={`transitions.${index}.toStageId`}
//             control={control}
//             render={({ field }) => (
//               <Select value={field.value ?? ""} onValueChange={field.onChange}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="To stage" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {normalizedStages.map((s: any) => (
//                     <SelectItem key={s.id} value={s.id}>
//                       {s.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             )}
//           />
//         </div>

//         <Controller
//           name={`transitions.${index}.transitionType`}
//           control={control}
//           render={({ field }) => (
//             <Select
//               value={field.value ?? "NORMAL"}
//               onValueChange={(value) => {
//                 field.onChange(value);

//                 if (value === "APPROVAL") {
//                   setValue(`transitions.${index}.approvalStrategy`, "ALL");
//                   setValue(`transitions.${index}.approvalConfig`, {
//                     mode: "PARALLEL",
//                     levels: [],
//                   });
//                 } else {
//                   setValue(`transitions.${index}.approvalConfig`, undefined);
//                 }
//               }}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Transition type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="NORMAL">Normal</SelectItem>
//                 <SelectItem value="APPROVAL">Approval Required</SelectItem>
//                 <SelectItem value="SEND_BACK">Send Back</SelectItem>
//                 <SelectItem value="REVIEW">Review</SelectItem>
//                 <SelectItem value="AUTO">Automatic</SelectItem>
//               </SelectContent>
//             </Select>
//           )}
//         />

//         {transitionType === "AUTO" && (
//           <Controller
//             name={`transitions.${index}.autoTrigger`}
//             control={control}
//             render={({ field }) => (
//               <div className="flex items-center gap-2">
//                 <Checkbox
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//                 <Label>Automatically trigger (system)</Label>
//               </div>
//             )}
//           />
//         )}

//         {transitionType === "SEND_BACK" && (
//   <p className="text-xs text-muted-foreground">
//     Send Back transitions should typically point to a correction or draft stage.
//   </p>
// )}

//       </Section>

//       <Section
//         title="Who can trigger this action"
//         description="Users allowed to initiate this transition"
//       >
//         <Controller
//           name={`transitions.${index}.allowedRoleIds`}
//           control={control}
//           render={({ field }) => (
//             <MultiSelect
//               options={roleList}
//               value={Array.isArray(field.value) ? field.value : []}
//               onChange={field.onChange}
//               placeholder="Roles"
//             />
//           )}
//         />

//         <Controller
//           name={`transitions.${index}.allowedUserIds`}
//           control={control}
//           render={({ field }) => (
//             <MultiSelect
//               options={userList}
//               value={Array.isArray(field.value) ? field.value : []}
//               onChange={field.onChange}
//               placeholder="Specific users"
//             />
//           )}
//         />

//         <Controller
//           name={`transitions.${index}.triggerStrategy`}
//           control={control}
//           render={({ field }) => (
//             <Select
//               value={field.value ?? "ANY_ALLOWED"}
//               onValueChange={field.onChange}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Who can trigger this" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="ANY_ALLOWED">Anyone</SelectItem>
//                 <SelectItem value="CREATOR_ONLY">Creator only</SelectItem>
//                 <SelectItem value="ASSIGNEE_ONLY">Assignee only</SelectItem>
//                 <SelectItem value="APPROVER_ONLY">Approver only</SelectItem>
//                 <SelectItem value="SYSTEM_ONLY">System only</SelectItem>
//               </SelectContent>
//             </Select>
//           )}
//         />
//       </Section>

//       {/* {requiresApproval && approvalConfig && (
//         <Section
//           title="Approval Configuration"
//           description="Who must approve before this transition completes"
//         >
//           {transitionType === "AUTO" && (
//             <Controller
//               name={`transitions.${index}.autoTrigger`}
//               control={control}
//               render={({ field }) => (
//                 <div className="flex items-center gap-2">
//                   <Checkbox
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                   />
//                   <Label>Automatically trigger (system)</Label>
//                 </div>
//               )}
//             />
//           )}

//           <Controller
//             name={`transitions.${index}.approvalStrategy`}
//             control={control}
//             render={({ field }) => (
//               <Select
//                 value={field.value ?? "ALL"}
//                 onValueChange={field.onChange}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Approval strategy" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ALL">All must approve</SelectItem>
//                   <SelectItem value="ANY">Any one approval</SelectItem>
//                   <SelectItem value="MAJORITY">Majority</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />

//           <Controller
//             name={`transitions.${index}.approvalConfig.mode`}
//             control={control}
//             render={({ field }) => (
//               <Select
//                 value={field.value ?? "PARALLEL"}
//                 onValueChange={field.onChange}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Approval flow" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="PARALLEL">Parallel</SelectItem>
//                   <SelectItem value="SEQUENTIAL">Sequential</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />

//           {approvalMode === "SEQUENTIAL" && (
//             <ApprovalLevelsEditor
//               control={control}
//               name={`transitions.${index}.approvalConfig.levels`}
//               roleList={roleList}
//               userList={userList}
//             />
//           )}
//         </Section>
//       )} */}
//       {requiresApproval && approvalConfig && (
//   <Section title="Approval Configuration">
//     {/* Strategy */}
//     <Controller
//       name={`transitions.${index}.approvalStrategy`}
//       control={control}
//       render={({ field }) => (
//         <Select value={field.value} onValueChange={field.onChange}>
//           <SelectTrigger>
//             <SelectValue />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="ALL">All must approve</SelectItem>
//             <SelectItem value="ANY">Any one</SelectItem>
//             <SelectItem value="MAJORITY">Majority</SelectItem>
//           </SelectContent>
//         </Select>
//       )}
//     />

//     {/* Mode */}
//     <Controller
//       name={`transitions.${index}.approvalConfig.mode`}
//       control={control}
//       render={({ field }) => (
//         <Select value={field.value} onValueChange={field.onChange}>
//           <SelectTrigger>
//             <SelectValue />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="PARALLEL">Parallel</SelectItem>
//             <SelectItem value="SEQUENTIAL">Sequential</SelectItem>
//           </SelectContent>
//         </Select>
//       )}
//     />

//     {/* PARALLEL */}
//     {approvalConfig.mode === "PARALLEL" && (
//       <>
//         <Controller
//           name={`transitions.${index}.approvalConfig.roleIds`}
//           control={control}
//           render={({ field }) => (
//             <MultiSelect
//               options={roleList}
//               value={field.value ?? []}
//               onChange={field.onChange}
//               placeholder="Approver roles"
//             />
//           )}
//         />

//         <Controller
//           name={`transitions.${index}.approvalConfig.userIds`}
//           control={control}
//           render={({ field }) => (
//             <MultiSelect
//               options={userList}
//               value={field.value ?? []}
//               onChange={field.onChange}
//               placeholder="Specific approvers"
//             />
//           )}
//         />
//       </>
//     )}

//     {/* SEQUENTIAL */}
//     {approvalConfig.mode === "SEQUENTIAL" && (
//       <ApprovalLevelsEditor
//         control={control}
//         name={`transitions.${index}.approvalConfig.levels`}
//         roleList={roleList}
//         userList={userList}
//       />
//     )}
//   </Section>
// )}

//     </Card>
//   );
// }

// /* ======================================================
//    MAIN STEP
// ====================================================== */

// export function TransitionsStep({
//   form,
//   transitionArray,
//   stages,
//   roleList = [],
//   userList = [],
// }: any) {
//   const { register, control, setValue } = form;

//   const normalizedStages = stages
//     .filter((s: any) => s.tempId != null)
//     .map((s: any) => ({
//       id: s.tempId,
//       name: s.name,
//     }));

//   return (
//     <Card className="space-y-6 p-6">
//       <div className="flex justify-between">
//         <div>
//           <h2 className="text-lg font-semibold">Workflow Transitions</h2>
//           <p className="text-muted-foreground">
//             Define actions, approvals, and flow control
//           </p>
//         </div>

//         <Button
//           type="button"
//           onClick={() =>
//             transitionArray.append({
//               label: "",
//               fromStageId: "",
//               toStageId: "",
//               transitionType: "NORMAL",
//               triggerStrategy: "ANY_ALLOWED",
//               approvalStrategy: "ALL",
//               approvalConfig: undefined,
//               allowedRoleIds: [],
//               allowedUserIds: [],
//               autoTrigger: false,
//             })
//           }
//         >
//           <Plus className="mr-2 h-4 w-4" />
//           Add Transition
//         </Button>
//       </div>

//       {transitionArray.fields.map((field: any, index: number) => (
//         <TransitionRow
//           key={field.id}
//           index={index}
//           control={control}
//           register={register}
//           setValue={setValue}
//           remove={transitionArray.remove}
//           normalizedStages={normalizedStages}
//           roleList={roleList}
//           userList={userList}
//         />
//       ))}
//     </Card>
//   );
// }

"use client";

import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, ArrowRight } from "lucide-react";
import { MultiSelect } from "./multiselect";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

/* ======================================================
   SMALL UI HELPERS
====================================================== */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-xl bg-muted/40 p-4">
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

/* ======================================================
   APPROVAL LEVEL EDITOR (SEQUENTIAL)
====================================================== */

function ApprovalLevelsEditor({ control, name, roleList, userList }: any) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="font-semibold">Approval Levels</Label>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            append({ order: fields.length + 1, roleIds: [], userIds: [] })
          }
        >
          <Plus className="h-4 w-4 mr-1" /> Add Level
        </Button>
      </div>

      {fields.map((level, i) => (
        <Card
          key={level.id}
          className="p-4 space-y-3 border-l-4 border-primary"
        >
          <div className="flex justify-between">
            <span className="font-medium">Level {i + 1}</span>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => remove(i)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <Controller
            name={`${name}.${i}.roleIds`}
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={roleList}
                value={field.value ?? []}
                onChange={field.onChange}
                placeholder="Approver roles"
              />
            )}
          />

          <Controller
            name={`${name}.${i}.userIds`}
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={userList}
                value={field.value ?? []}
                onChange={field.onChange}
                placeholder="Specific users"
              />
            )}
          />
        </Card>
      ))}
    </div>
  );
}

/* ======================================================
   SINGLE TRANSITION ROW
====================================================== */

function TransitionRow({
  index,
  control,
  register,
  setValue,
  remove,
  normalizedStages,
  roleList,
  userList,
}: any) {
  const transitionType = useWatch({
    control,
    name: `transitions.${index}.transitionType`,
  });

  const approvalConfig = useWatch({
    control,
    name: `transitions.${index}.approvalConfig`,
  });

  const requiresApproval = transitionType === "APPROVAL";
  const showTriggerStrategy =
    transitionType === "NORMAL" || transitionType === "REVIEW";

  /* ======================================================
     ENFORCE BACKEND RULES
  ====================================================== */

  // APPROVAL ⇒ APPROVER_ONLY
  useEffect(() => {
    if (transitionType === "APPROVAL") {
      setValue(`transitions.${index}.triggerStrategy`, "APPROVER_ONLY");
    }
  }, [transitionType, index, setValue]);

  // AUTO ⇒ SYSTEM_ONLY + autoTrigger
  useEffect(() => {
    if (transitionType === "AUTO") {
      setValue(`transitions.${index}.triggerStrategy`, "SYSTEM_ONLY");
      setValue(`transitions.${index}.autoTrigger`, true);
    }
  }, [transitionType, index, setValue]);

  // Initialize approvalConfig safely
  useEffect(() => {
    if (transitionType === "APPROVAL" && !approvalConfig) {
      setValue(`transitions.${index}.approvalStrategy`, "ALL");
      setValue(`transitions.${index}.approvalConfig`, {
        mode: "PARALLEL",
        roleIds: [],
        userIds: [],
      });
    }
  }, [transitionType, approvalConfig, index, setValue]);

  // Clear SEQUENTIAL levels when switching to PARALLEL
  useEffect(() => {
    if (approvalConfig?.mode === "PARALLEL") {
      setValue(`transitions.${index}.approvalConfig.levels`, undefined);
    }
  }, [approvalConfig?.mode, index, setValue]);

  return (
    <Card className="p-6 space-y-6 rounded-2xl">
      <div className="flex justify-between">
        <h3 className="font-semibold text-sm">Transition {index + 1}</h3>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => remove(index)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>

      <Section title="Action">
        <Input
          placeholder="e.g. Submit for approval"
          {...register(`transitions.${index}.label`, { required: true })}
        />
      </Section>

      <Section title="Flow">
        <div className="flex gap-2 items-end">
          <Controller
            name={`transitions.${index}.fromStageId`}
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="From stage" />
                </SelectTrigger>
                <SelectContent>
                  {normalizedStages.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <ArrowRight className="h-4 w-4 text-muted-foreground" />

          <Controller
            name={`transitions.${index}.toStageId`}
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="To stage" />
                </SelectTrigger>
                <SelectContent>
                  {normalizedStages.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <Controller
          name={`transitions.${index}.transitionType`}
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NORMAL">Normal</SelectItem>
                <SelectItem value="APPROVAL">Approval</SelectItem>
                <SelectItem value="SEND_BACK">Send Back</SelectItem>
                <SelectItem value="REVIEW">Review</SelectItem>
                <SelectItem value="AUTO">Automatic</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </Section>
      {showTriggerStrategy && (
        <Section
          title="Who can trigger this action"
          description="Defines who is allowed to perform this transition"
        >
          <Controller
            name={`transitions.${index}.triggerStrategy`}
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ANY_ALLOWED">Anyone</SelectItem>
                  <SelectItem value="CREATOR_ONLY">Creator only</SelectItem>
                  <SelectItem value="ASSIGNEE_ONLY">Assignee only</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Section>
      )}

      {requiresApproval && approvalConfig && (
        <Section title="Approval Configuration">
          <Controller
            name={`transitions.${index}.approvalStrategy`}
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="ANY">Any</SelectItem>
                  <SelectItem value="MAJORITY">Majority</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name={`transitions.${index}.approvalConfig.mode`}
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PARALLEL">Parallel</SelectItem>
                  <SelectItem value="SEQUENTIAL">Sequential</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {approvalConfig.mode === "PARALLEL" && (
            <>
              <Controller
                name={`transitions.${index}.approvalConfig.roleIds`}
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={roleList}
                    value={field.value ?? []}
                    onChange={field.onChange}
                    placeholder="Approver roles"
                  />
                )}
              />

              <Controller
                name={`transitions.${index}.approvalConfig.userIds`}
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={userList}
                    value={field.value ?? []}
                    onChange={field.onChange}
                    placeholder="Specific users"
                  />
                )}
              />
            </>
          )}

          {approvalConfig.mode === "SEQUENTIAL" && (
            <ApprovalLevelsEditor
              control={control}
              name={`transitions.${index}.approvalConfig.levels`}
              roleList={roleList}
              userList={userList}
            />
          )}
        </Section>
      )}
    </Card>
  );
}

/* ======================================================
   MAIN STEP
====================================================== */

export function TransitionsStep({
  form,
  transitionArray,
  stages,
  roleList = [],
  userList = [],
}: any) {
  const { register, control, setValue } = form;

  const normalizedStages = stages.map((s: any) => ({
    id: s.tempId,
    name: s.name,
  }));

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">Workflow Transitions</h2>
        <Button
          type="button"
          onClick={() =>
            transitionArray.append({
              label: "",
              fromStageId: "",
              toStageId: "",
              transitionType: "NORMAL",
              triggerStrategy: "ANY_ALLOWED",
              allowedRoleIds: [],
              allowedUserIds: [],
              autoTrigger: false,
            })
          }
        >
          <Plus className="h-4 w-4 mr-2" /> Add Transition
        </Button>
      </div>

      {transitionArray.fields.map((_: any, index: number) => (
        <TransitionRow
          key={index}
          index={index}
          control={control}
          register={register}
          setValue={setValue}
          remove={transitionArray.remove}
          normalizedStages={normalizedStages}
          roleList={roleList}
          userList={userList}
        />
      ))}
    </Card>
  );
}
