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

////////////////////////////////
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
//   const { fields, append, remove } = useFieldArray({ control, name });

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <Label className="font-semibold">Approval Levels</Label>
//         <Button
//           type="button"
//           size="sm"
//           variant="outline"
//           onClick={() =>
//             append({ order: fields.length + 1, roleIds: [], userIds: [] })
//           }
//         >
//           <Plus className="h-4 w-4 mr-1" /> Add Level
//         </Button>
//       </div>

//       {fields.map((level, i) => (
//         <Card
//           key={level.id}
//           className="p-4 space-y-3 border-l-4 border-primary"
//         >
//           <div className="flex justify-between">
//             <span className="font-medium">Level {i + 1}</span>
//             <Button
//               type="button"
//               size="icon"
//               variant="ghost"
//               onClick={() => remove(i)}
//             >
//               <Trash2 className="h-4 w-4 text-destructive" />
//             </Button>
//           </div>

//           <Controller
//             name={`${name}.${i}.roleIds`}
//             control={control}
//             render={({ field }) => (
//               <MultiSelect
//                 options={roleList}
//                 value={field.value ?? []}
//                 onChange={field.onChange}
//                 placeholder="Approver roles"
//               />
//             )}
//           />

//           <Controller
//             name={`${name}.${i}.userIds`}
//             control={control}
//             render={({ field }) => (
//               <MultiSelect
//                 options={userList}
//                 value={field.value ?? []}
//                 onChange={field.onChange}
//                 placeholder="Specific users"
//               />
//             )}
//           />
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

//   const requiresApproval = transitionType === "APPROVAL";
//   const showTriggerStrategy =
//     transitionType === "NORMAL" || transitionType === "REVIEW";

//   /* ======================================================
//      ENFORCE BACKEND RULES
//   ====================================================== */

//   // APPROVAL ⇒ APPROVER_ONLY
//   useEffect(() => {
//     if (transitionType === "APPROVAL") {
//       setValue(`transitions.${index}.triggerStrategy`, "APPROVER_ONLY");
//     }
//   }, [transitionType, index, setValue]);

//   // AUTO ⇒ SYSTEM_ONLY + autoTrigger
//   useEffect(() => {
//     if (transitionType === "AUTO") {
//       setValue(`transitions.${index}.triggerStrategy`, "SYSTEM_ONLY");
//       setValue(`transitions.${index}.autoTrigger`, true);
//     }
//   }, [transitionType, index, setValue]);

//   // Initialize approvalConfig safely
//   useEffect(() => {
//     if (transitionType === "APPROVAL" && !approvalConfig) {
//       setValue(`transitions.${index}.approvalStrategy`, "ALL");
//       setValue(`transitions.${index}.approvalConfig`, {
//         mode: "PARALLEL",
//         roleIds: [],
//         userIds: [],
//       });
//     }
//   }, [transitionType, approvalConfig, index, setValue]);

//   // Clear SEQUENTIAL levels when switching to PARALLEL
//   useEffect(() => {
//     if (approvalConfig?.mode === "PARALLEL") {
//       setValue(`transitions.${index}.approvalConfig.levels`, undefined);
//     }
//   }, [approvalConfig?.mode, index, setValue]);

//   return (
//     <Card className="p-6 space-y-6 rounded-2xl">
//       <div className="flex justify-between">
//         <h3 className="font-semibold text-sm">Transition {index + 1}</h3>
//         <Button
//           type="button"
//           size="icon"
//           variant="ghost"
//           onClick={() => remove(index)}
//         >
//           <Trash2 className="h-4 w-4 text-destructive" />
//         </Button>
//       </div>

//       <Section title="Action">
//         <Input
//           placeholder="e.g. Submit for approval"
//           {...register(`transitions.${index}.label`, { required: true })}
//         />
//       </Section>

//       <Section title="Flow">
//         <div className="flex gap-2 items-end">
//           <Controller
//             name={`transitions.${index}.fromStageId`}
//             control={control}
//             render={({ field }) => (
//               <Select value={field.value} onValueChange={field.onChange}>
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
//               <Select value={field.value} onValueChange={field.onChange}>
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
//             <Select value={field.value} onValueChange={field.onChange}>
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="NORMAL">Normal</SelectItem>
//                 <SelectItem value="APPROVAL">Approval</SelectItem>
//                 <SelectItem value="SEND_BACK">Send Back</SelectItem>
//                 <SelectItem value="REVIEW">Review</SelectItem>
//                 <SelectItem value="AUTO">Automatic</SelectItem>
//               </SelectContent>
//             </Select>
//           )}
//         />
//       </Section>
//       {showTriggerStrategy && (
//         <Section
//           title="Who can trigger this action"
//           description="Defines who is allowed to perform this transition"
//         >
//           <Controller
//             name={`transitions.${index}.triggerStrategy`}
//             control={control}
//             render={({ field }) => (
//               <Select value={field.value} onValueChange={field.onChange}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ANY_ALLOWED">Anyone</SelectItem>
//                   <SelectItem value="CREATOR_ONLY">Creator only</SelectItem>
//                   <SelectItem value="ASSIGNEE_ONLY">Assignee only</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />
//         </Section>
//       )}

//       {requiresApproval && approvalConfig && (
//         <Section title="Approval Configuration">
//           <Controller
//             name={`transitions.${index}.approvalStrategy`}
//             control={control}
//             render={({ field }) => (
//               <Select value={field.value} onValueChange={field.onChange}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ALL">All</SelectItem>
//                   <SelectItem value="ANY">Any</SelectItem>
//                   <SelectItem value="MAJORITY">Majority</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />

//           <Controller
//             name={`transitions.${index}.approvalConfig.mode`}
//             control={control}
//             render={({ field }) => (
//               <Select value={field.value} onValueChange={field.onChange}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="PARALLEL">Parallel</SelectItem>
//                   <SelectItem value="SEQUENTIAL">Sequential</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />

//           {approvalConfig.mode === "PARALLEL" && (
//             <>
//               <Controller
//                 name={`transitions.${index}.approvalConfig.roleIds`}
//                 control={control}
//                 render={({ field }) => (
//                   <MultiSelect
//                     options={roleList}
//                     value={field.value ?? []}
//                     onChange={field.onChange}
//                     placeholder="Approver roles"
//                   />
//                 )}
//               />

//               <Controller
//                 name={`transitions.${index}.approvalConfig.userIds`}
//                 control={control}
//                 render={({ field }) => (
//                   <MultiSelect
//                     options={userList}
//                     value={field.value ?? []}
//                     onChange={field.onChange}
//                     placeholder="Specific users"
//                   />
//                 )}
//               />
//             </>
//           )}

//           {approvalConfig.mode === "SEQUENTIAL" && (
//             <ApprovalLevelsEditor
//               control={control}
//               name={`transitions.${index}.approvalConfig.levels`}
//               roleList={roleList}
//               userList={userList}
//             />
//           )}
//         </Section>
//       )}
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

//   const normalizedStages = stages.map((s: any) => ({
//     id: s.tempId,
//     name: s.name,
//   }));

//   return (
//     <Card className="p-6 space-y-6">
//       <div className="flex justify-between">
//         <h2 className="text-lg font-semibold">Workflow Transitions</h2>
//         <Button
//           type="button"
//           onClick={() =>
//             transitionArray.append({
//               label: "",
//               fromStageId: "",
//               toStageId: "",
//               transitionType: "NORMAL",
//               triggerStrategy: "ANY_ALLOWED",
//               allowedRoleIds: [],
//               allowedUserIds: [],
//               autoTrigger: false,
//             })
//           }
//         >
//           <Plus className="h-4 w-4 mr-2" /> Add Transition
//         </Button>
//       </div>

//       {transitionArray.fields.map((_: any, index: number) => (
//         <TransitionRow
//           key={index}
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

// "use client";

// import { Controller, useFieldArray, useWatch } from "react-hook-form";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Trash2,
//   Plus,
//   ArrowRight,
//   Settings,
//   Zap,
//   UserCheck,
//   Users,
//   Lock,
// } from "lucide-react";
// import { MultiSelect } from "./multiselect";
// import { useEffect } from "react";

// /* ======================================================
//    TRANSITION TYPE CONFIGURATION
// ====================================================== */
// const TRANSITION_TYPES = [
//   {
//     value: "NORMAL",
//     label: "Normal",
//     icon: ArrowRight,
//     color: "bg-gray-100 text-gray-600",
//   },
//   {
//     value: "APPROVAL",
//     label: "Approval",
//     icon: UserCheck,
//     color: "bg-blue-100 text-blue-600",
//   },
//   {
//     value: "SEND_BACK",
//     label: "Send Back",
//     icon: ArrowRight,
//     color: "bg-amber-100 text-amber-600",
//   },
//   {
//     value: "REVIEW",
//     label: "Review",
//     icon: Users,
//     color: "bg-purple-100 text-purple-600",
//   },
//   {
//     value: "AUTO",
//     label: "Automatic",
//     icon: Zap,
//     color: "bg-green-100 text-green-600",
//   },
// ];

// const TRIGGER_STRATEGIES = [
//   { value: "ANY_ALLOWED", label: "Anyone allowed" },
//   { value: "CREATOR_ONLY", label: "Creator only" },
//   { value: "ASSIGNEE_ONLY", label: "Assignee only" },
//   { value: "APPROVER_ONLY", label: "Approver only" },
//   { value: "SYSTEM_ONLY", label: "System only" },
// ];

// const APPROVAL_STRATEGIES = [
//   { value: "ALL", label: "All must approve" },
//   { value: "ANY", label: "Any one approves" },
//   { value: "MAJORITY", label: "Majority approves" },
// ];

// const APPROVAL_MODES = [
//   { value: "PARALLEL", label: "Parallel approval" },
//   { value: "SEQUENTIAL", label: "Sequential approval" },
// ];

// /* ======================================================
//    SECTION COMPONENT (MINIMAL)
// ====================================================== */
// function Section({ title, description, children, icon }: any) {
//   return (
//     <div className="space-y-3">
//       <div className="flex items-center gap-2">
//         {icon && <div className="h-5 w-5 text-gray-400">{icon}</div>}
//         <div>
//           <h4 className="text-sm font-medium text-gray-900">{title}</h4>
//           {description && (
//             <p className="text-xs text-gray-500">{description}</p>
//           )}
//         </div>
//       </div>
//       {children}
//     </div>
//   );
// }

// /* ======================================================
//    APPROVAL LEVEL EDITOR (SEQUENTIAL)
// ====================================================== */
// function ApprovalLevelsEditor({ control, name, roleList, userList }: any) {
//   const { fields, append, remove } = useFieldArray({ control, name });

//   return (
//     <div className="space-y-3">
//       <div className="flex justify-between items-center">
//         <Label className="text-sm font-medium text-gray-700">
//           Approval Levels
//         </Label>
//         <Button
//           type="button"
//           size="sm"
//           variant="outline"
//           onClick={() =>
//             append({ order: fields.length + 1, roleIds: [], userIds: [] })
//           }
//         >
//           <Plus className="h-4 w-4 mr-1" /> Add Level
//         </Button>
//       </div>

//       <div className="space-y-3">
//         {fields.map((level, i) => (
//           <div
//             key={level.id}
//             className="border border-gray-200 rounded-lg p-4 space-y-3"
//           >
//             <div className="flex justify-between items-center">
//               <div className="flex items-center gap-2">
//                 <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
//                   <span className="text-xs font-medium text-gray-700">
//                     {i + 1}
//                   </span>
//                 </div>
//                 <span className="text-sm font-medium text-gray-900">
//                   Level {i + 1}
//                 </span>
//               </div>
//               <Button
//                 type="button"
//                 size="sm"
//                 variant="ghost"
//                 onClick={() => remove(i)}
//                 className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
//               >
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//             </div>

//             <div className="space-y-3">
//               <Controller
//                 name={`${name}.${i}.roleIds`}
//                 control={control}
//                 render={({ field }) => (
//                   <MultiSelect
//                     options={roleList}
//                     value={field.value ?? []}
//                     onChange={field.onChange}
//                     placeholder="Select approver roles"
//                   />
//                 )}
//               />

//               <Controller
//                 name={`${name}.${i}.userIds`}
//                 control={control}
//                 render={({ field }) => (
//                   <MultiSelect
//                     options={userList}
//                     value={field.value ?? []}
//                     onChange={field.onChange}
//                     placeholder="Select specific users"
//                   />
//                 )}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ======================================================
//    TRANSITION TYPE BADGE
// ====================================================== */
// function TransitionTypeBadge({ type }: { type: string }) {
//   const config = TRANSITION_TYPES.find((t) => t.value === type);
//   const Icon = config?.icon || ArrowRight;

//   return (
//     <Badge
//       variant="outline"
//       className={`inline-flex items-center gap-1.5 ${config?.color}`}
//     >
//       <Icon className="h-3 w-3" />
//       {config?.label || type}
//     </Badge>
//   );
// }

// /* ======================================================
//    SINGLE TRANSITION CARD
// ====================================================== */
// function TransitionCard({
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

//   const requiresApproval = transitionType === "APPROVAL";
//   const showTriggerStrategy =
//     transitionType === "NORMAL" || transitionType === "REVIEW"|| transitionType === "SEND_BACK";;
//   const fromStageId = useWatch({
//     control,
//     name: `transitions.${index}.fromStageId`,
//   });
//   const toStageId = useWatch({
//     control,
//     name: `transitions.${index}.toStageId`,
//   });

//   const fromStage = normalizedStages.find((s: any) => s.id === fromStageId);
//   const toStage = normalizedStages.find((s: any) => s.id === toStageId);

//   /* ======================================================
//      ENFORCE BACKEND RULES
//   ====================================================== */
//   useEffect(() => {
//     if (transitionType === "APPROVAL") {
//       setValue(`transitions.${index}.triggerStrategy`, "APPROVER_ONLY");
//     }
//   }, [transitionType, index, setValue]);

//   useEffect(() => {
//     if (transitionType === "AUTO") {
//       setValue(`transitions.${index}.triggerStrategy`, "SYSTEM_ONLY");
//       setValue(`transitions.${index}.autoTrigger`, true);
//     }
//   }, [transitionType, index, setValue]);

//   useEffect(() => {
//     if (transitionType === "APPROVAL" && !approvalConfig) {
//       setValue(`transitions.${index}.approvalStrategy`, "ALL");
//       setValue(`transitions.${index}.approvalConfig`, {
//         mode: "PARALLEL",
//         roleIds: [],
//         userIds: [],
//       });
//     }
//   }, [transitionType, approvalConfig, index, setValue]);

//   useEffect(() => {
//     if (approvalConfig?.mode === "PARALLEL") {
//       setValue(`transitions.${index}.approvalConfig.levels`, undefined);
//     }
//   }, [approvalConfig?.mode, index, setValue]);

//   return (
//     <div className="border border-gray-200 rounded-xl p-5 space-y-6 bg-white">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
//             <span className="text-sm font-medium text-gray-700">
//               {index + 1}
//             </span>
//           </div>
//           <div>
//             <div className="flex items-center gap-2">
//               <TransitionTypeBadge type={transitionType} />
//               <span className="text-sm text-gray-500">Transition</span>
//             </div>
//             {fromStage && toStage && (
//               <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
//                 <span className="font-medium">{fromStage.name}</span>
//                 <ArrowRight className="h-3 w-3" />
//                 <span className="font-medium">{toStage.name}</span>
//               </div>
//             )}
//           </div>
//         </div>
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => remove(index)}
//           className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
//         >
//           <Trash2 className="h-4 w-4" />
//         </Button>
//       </div>

//       {/* Action Name */}
//       <Section title="Action Name" description="What triggers this transition">
//         <Input
//           placeholder="e.g., Submit for approval, Send for review"
//           {...register(`transitions.${index}.label`, { required: true })}
//           className="border-gray-300"
//         />
//       </Section>

//       {/* Stage Selection */}
//       <Section title="Stage Flow" description="Select source and target stages">
//         <div className="flex items-center gap-3">
//           <div className="flex-1">
//             <Label className="text-xs text-gray-500 mb-1.5 block">
//               From Stage
//             </Label>
//             <Controller
//               name={`transitions.${index}.fromStageId`}
//               control={control}
//               render={({ field }) => (
//                 <Select value={field.value} onValueChange={field.onChange}>
//                   <SelectTrigger className="border-gray-300">
//                     <SelectValue placeholder="Select source stage" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {normalizedStages.map((s: any) => (
//                       <SelectItem key={s.id} value={s.id}>
//                         {s.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//           </div>

//           <ArrowRight className="h-4 w-4 text-gray-400 shrink-0 mt-5" />

//           <div className="flex-1">
//             <Label className="text-xs text-gray-500 mb-1.5 block">
//               To Stage
//             </Label>
//             <Controller
//               name={`transitions.${index}.toStageId`}
//               control={control}
//               render={({ field }) => (
//                 <Select value={field.value} onValueChange={field.onChange}>
//                   <SelectTrigger className="border-gray-300">
//                     <SelectValue placeholder="Select target stage" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {normalizedStages.map((s: any) => (
//                       <SelectItem key={s.id} value={s.id}>
//                         {s.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//           </div>
//         </div>
//       </Section>

//       {/* Transition Type */}
//       <Section
//         title="Transition Type"
//         description="Define how this transition works"
//       >
//         <Controller
//           name={`transitions.${index}.transitionType`}
//           control={control}
//           render={({ field }) => (
//             <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
//               {TRANSITION_TYPES.map((type) => {
//                 const Icon = type.icon;
//                 return (
//                   <button
//                     key={type.value}
//                     type="button"
//                     onClick={() => field.onChange(type.value)}
//                     className={`
//                       flex flex-col items-center gap-2 p-3 rounded-lg border transition-all
//                       ${
//                         field.value === type.value
//                           ? "border-gray-900 bg-gray-900 text-white"
//                           : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
//                       }
//                     `}
//                   >
//                     <Icon className="h-4 w-4" />
//                     <span className="text-xs font-medium">{type.label}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           )}
//         />
//       </Section>

//       {/* Trigger Strategy */}
//       {showTriggerStrategy && (
//         <Section
//           title="Who can trigger"
//           description="Specify who can perform this action"
//         >
//           <Controller
//             name={`transitions.${index}.triggerStrategy`}
//             control={control}
//             render={({ field }) => (
//               <Select value={field.value} onValueChange={field.onChange}>
//                 <SelectTrigger className="border-gray-300">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {TRIGGER_STRATEGIES.map((strategy) => (
//                     <SelectItem key={strategy.value} value={strategy.value}>
//                       {strategy.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             )}
//           />
//         </Section>
//       )}

//       {/* Approval Configuration */}
//       {requiresApproval && approvalConfig && (
//         <div className="space-y-6 border-t pt-6">
//           <Section
//             title="Approval Settings"
//             icon={<UserCheck className="h-4 w-4" />}
//           >
//             <div className="space-y-4">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-sm text-gray-700">
//                     Approval Strategy
//                   </Label>
//                   <Controller
//                     name={`transitions.${index}.approvalStrategy`}
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         value={field.value}
//                         onValueChange={field.onChange}
//                       >
//                         <SelectTrigger className="border-gray-300">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {APPROVAL_STRATEGIES.map((strategy) => (
//                             <SelectItem
//                               key={strategy.value}
//                               value={strategy.value}
//                             >
//                               {strategy.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="text-sm text-gray-700">Approval Mode</Label>
//                   <Controller
//                     name={`transitions.${index}.approvalConfig.mode`}
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         value={field.value}
//                         onValueChange={field.onChange}
//                       >
//                         <SelectTrigger className="border-gray-300">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {APPROVAL_MODES.map((mode) => (
//                             <SelectItem key={mode.value} value={mode.value}>
//                               {mode.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 </div>
//               </div>

//               {approvalConfig.mode === "PARALLEL" && (
//                 <div className="space-y-4">
//                   <Controller
//                     name={`transitions.${index}.approvalConfig.roleIds`}
//                     control={control}
//                     render={({ field }) => (
//                       <MultiSelect
//                         options={roleList}
//                         value={field.value ?? []}
//                         onChange={field.onChange}
//                         placeholder="Select approver roles"
//                       />
//                     )}
//                   />

//                   <Controller
//                     name={`transitions.${index}.approvalConfig.userIds`}
//                     control={control}
//                     render={({ field }) => (
//                       <MultiSelect
//                         options={userList}
//                         value={field.value ?? []}
//                         onChange={field.onChange}
//                         placeholder="Select specific users"
//                       />
//                     )}
//                   />
//                 </div>
//               )}

//               {approvalConfig.mode === "SEQUENTIAL" && (
//                 <ApprovalLevelsEditor
//                   control={control}
//                   name={`transitions.${index}.approvalConfig.levels`}
//                   roleList={roleList}
//                   userList={userList}
//                 />
//               )}
//             </div>
//           </Section>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ======================================================
//    MAIN STEP COMPONENT
// ====================================================== */
// export function TransitionsStep({
//   form,
//   transitionArray,
//   stages,
//   roleList = [],
//   userList = [],
// }: any) {
//   const { register, control, setValue } = form;

//   const normalizedStages = stages.map((s: any) => ({
//     id: s.tempId,
//     name: s.name,
//   }));

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-start justify-between">
//         <div>
//           <h3 className="text-sm font-medium text-gray-900">
//             Workflow Transitions
//           </h3>
//           <p className="text-xs text-gray-500">
//             Define rules for moving between stages
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Badge variant="outline" className="bg-gray-50">
//             {transitionArray.fields.length} transitions
//           </Badge>
//           <Button
//             type="button"
//             size="sm"
//             onClick={() =>
//               transitionArray.append({
//                 label: "",
//                 fromStageId: "",
//                 toStageId: "",
//                 transitionType: "NORMAL",
//                 triggerStrategy: "ANY_ALLOWED",
//                 allowedRoleIds: [],
//                 allowedUserIds: [],
//                 autoTrigger: false,
//               })
//             }
//             className="bg-gray-900 hover:bg-gray-800 text-white"
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             Add Transition
//           </Button>
//         </div>
//       </div>

//       {/* Empty State */}
//       {transitionArray.fields.length === 0 && (
//         <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center">
//           <Settings className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//           <h3 className="text-sm font-medium text-gray-900 mb-1">
//             No transitions defined
//           </h3>
//           <p className="text-sm text-gray-500 mb-4">
//             Add transitions to connect stages in your workflow
//           </p>
//           <Button
//             type="button"
//             size="sm"
//             onClick={() =>
//               transitionArray.append({
//                 label: "",
//                 fromStageId: "",
//                 toStageId: "",
//                 transitionType: "NORMAL",
//                 triggerStrategy: "ANY_ALLOWED",
//                 allowedRoleIds: [],
//                 allowedUserIds: [],
//                 autoTrigger: false,
//               })
//             }
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             Add First Transition
//           </Button>
//         </div>
//       )}

//       {/* Transition Cards */}
//       <div className="space-y-4">
//         {transitionArray.fields.map((_: any, index: number) => (
//           <TransitionCard
//             key={index}
//             index={index}
//             control={control}
//             register={register}
//             setValue={setValue}
//             remove={transitionArray.remove}
//             normalizedStages={normalizedStages}
//             roleList={roleList}
//             userList={userList}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trash2,
  Plus,
  ArrowRight,
  Settings,
  Zap,
  UserCheck,
  Users,
} from "lucide-react";
import { MultiSelect } from "./multiselect";
import { useEffect } from "react";

/* ======================================================
   TRANSITION TYPE CONFIGURATION
====================================================== */
const TRANSITION_TYPES = [
  {
    value: "NORMAL",
    label: "Normal",
    icon: ArrowRight,
    color: "bg-gray-100 text-gray-600",
  },
  {
    value: "APPROVAL",
    label: "Approval",
    icon: UserCheck,
    color: "bg-blue-100 text-blue-600",
  },
  {
    value: "SEND_BACK",
    label: "Send Back",
    icon: ArrowRight,
    color: "bg-amber-100 text-amber-600",
  },
  {
    value: "REVIEW",
    label: "Review",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
  },
  // {
  //   value: "AUTO",
  //   label: "Automatic",
  //   icon: Zap,
  //   color: "bg-green-100 text-green-600",
  // },
];

const TRIGGER_STRATEGIES = [
  { value: "ANY_ALLOWED", label: "Anyone allowed" },
  { value: "CREATOR_ONLY", label: "Creator only" },
  { value: "ASSIGNEE_ONLY", label: "Assignee only" },
  { value: "APPROVER_ONLY", label: "Approver only" },
  { value: "SYSTEM_ONLY", label: "System only" },
];

const APPROVAL_STRATEGIES = [
  { value: "ALL", label: "All must approve" },
  { value: "ANY", label: "Any one approves" },
  { value: "MAJORITY", label: "Majority approves" },
];

const APPROVAL_MODES = [
  { value: "PARALLEL", label: "Parallel approval" },
  { value: "SEQUENTIAL", label: "Sequential approval" },
];

/* ======================================================
   SECTION
====================================================== */
function Section({ title, description, children, icon }: any) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {icon && <div className="h-5 w-5 text-gray-400">{icon}</div>}
        <div>
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ======================================================
   APPROVAL LEVELS
====================================================== */
function ApprovalLevelsEditor({ control, name, roleList, userList }: any) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium text-gray-700">
          Approval Levels
        </Label>
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
        <div
          key={level.id}
          className="border border-gray-200 rounded-lg p-4 space-y-3"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-700">
                  {i + 1}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                Level {i + 1}
              </span>
            </div>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => remove(i)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
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
                placeholder="Select approver roles"
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
                placeholder="Select specific users"
              />
            )}
          />
        </div>
      ))}
    </div>
  );
}

/* ======================================================
   BADGE
====================================================== */
function TransitionTypeBadge({ type }: { type: string }) {
  const config = TRANSITION_TYPES.find((t) => t.value === type);
  const Icon = config?.icon || ArrowRight;

  return (
    <Badge
      variant="outline"
      className={`inline-flex items-center gap-1.5 ${config?.color}`}
    >
      <Icon className="h-3 w-3" />
      {config?.label || type}
    </Badge>
  );
}

/* ======================================================
   TRANSITION CARD
====================================================== */
function TransitionCard({
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

  const triggerStrategy = useWatch({
    control,
    name: `transitions.${index}.triggerStrategy`,
  });

  const fromStageId = useWatch({
    control,
    name: `transitions.${index}.fromStageId`,
  });

  const toStageId = useWatch({
    control,
    name: `transitions.${index}.toStageId`,
  });

  const requiresApproval = transitionType === "APPROVAL";
  const showTriggerPermissions =
    transitionType !== "APPROVAL" && triggerStrategy === "ANY_ALLOWED";

  // ✅ SEND_BACK now included (no UI change)
  const showTriggerStrategy =
    transitionType === "NORMAL" ||
    transitionType === "REVIEW" ||
    transitionType === "SEND_BACK";

  const fromStage = normalizedStages.find((s: any) => s.id === fromStageId);
  const toStage = normalizedStages.find((s: any) => s.id === toStageId);

  /* ======================================================
     ENFORCE BACKEND RULES
  ====================================================== */
  // 1. APPROVER_ONLY only allowed for APPROVAL
  useEffect(() => {
    if (transitionType !== "APPROVAL" && triggerStrategy === "APPROVER_ONLY") {
      setValue(`transitions.${index}.triggerStrategy`, "ANY_ALLOWED");
    }
  }, [transitionType, triggerStrategy, index, setValue]);

  // 2. APPROVAL → force trigger
  useEffect(() => {
    if (transitionType === "APPROVAL") {
      setValue(`transitions.${index}.triggerStrategy`, "APPROVER_ONLY");
    }
  }, [transitionType, index, setValue]);

  // 3. AUTO → force system + remove approval
  useEffect(() => {
    if (transitionType === "AUTO") {
      setValue(`transitions.${index}.triggerStrategy`, "SYSTEM_ONLY");
      setValue(`transitions.${index}.autoTrigger`, true);
      setValue(`transitions.${index}.approvalStrategy`, undefined);
      setValue(`transitions.${index}.approvalConfig`, undefined);
    }
  }, [transitionType, index, setValue]);

  // 4. REVIEW → must be self-loop
  useEffect(() => {
    if (transitionType === "REVIEW" && fromStageId) {
      setValue(`transitions.${index}.toStageId`, fromStageId);
    }
  }, [transitionType, fromStageId, index, setValue]);

  // 5. SEND_BACK → never SYSTEM_ONLY
  useEffect(() => {
    if (transitionType === "SEND_BACK" && triggerStrategy === "SYSTEM_ONLY") {
      setValue(`transitions.${index}.triggerStrategy`, "ANY_ALLOWED");
    }
  }, [transitionType, triggerStrategy, index, setValue]);

  // 6. APPROVAL defaults
  useEffect(() => {
    if (transitionType === "APPROVAL" && !approvalConfig) {
      setValue(`transitions.${index}.approvalStrategy`, "ALL");
      setValue(`transitions.${index}.approvalConfig`, {
        mode: "PARALLEL",
        roleIds: [],
        userIds: [],
        levels: [], // ✅ REQUIRED BY BACKEND
      });
    }
  }, [transitionType, approvalConfig, index, setValue]);

  // 7. ALWAYS keep levels array valid
  // useEffect(() => {
  //   if (approvalConfig?.mode === "PARALLEL") {
  //     setValue(`transitions.${index}.approvalConfig.levels`, []);
  //   }

  //   if (approvalConfig?.mode === "SEQUENTIAL" && !approvalConfig.levels) {
  //     setValue(`transitions.${index}.approvalConfig.levels`, []);
  //   }
  // }, [approvalConfig?.mode, index, setValue]);
  // 7. ALWAYS keep levels array valid (backend requires >= 1)
  useEffect(() => {
    if (!approvalConfig) return;

    const levels = approvalConfig.levels;

    // For BOTH PARALLEL and SEQUENTIAL:
    // ensure at least one level exists
    if (!levels || levels.length === 0) {
      setValue(`transitions.${index}.approvalConfig.levels`, [
        { order: 1, roleIds: [], userIds: [] },
      ]);
    }
  }, [approvalConfig?.mode, index, setValue]);

  return (
    <div className="border border-gray-200 rounded-xl p-5 space-y-6 bg-white">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">
              {index + 1}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <TransitionTypeBadge type={transitionType} />
              <span className="text-sm text-gray-500">Transition</span>
            </div>
            {fromStage && toStage && (
              <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
                <span className="font-medium">{fromStage.name}</span>
                <ArrowRight className="h-3 w-3" />
                <span className="font-medium">{toStage.name}</span>
              </div>
            )}
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => remove(index)}
          className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* ACTION NAME */}
      <Section title="Action Name" description="What triggers this transition">
        <Input
          placeholder="e.g., Submit for approval, Send for review"
          {...register(`transitions.${index}.label`, { required: true })}
          className="border-gray-300"
        />
      </Section>

      {/* STAGE FLOW */}
      <Section title="Stage Flow" description="Select source and target stages">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Label className="text-xs text-gray-500 mb-1.5 block">
              From Stage
            </Label>
            <Controller
              name={`transitions.${index}.fromStageId`}
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select source stage" />
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

          <ArrowRight className="h-4 w-4 text-gray-400 shrink-0 mt-5" />

          <div className="flex-1">
            <Label className="text-xs text-gray-500 mb-1.5 block">
              To Stage
            </Label>
            <Controller
              name={`transitions.${index}.toStageId`}
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select target stage" />
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
        </div>
      </Section>

      {/* TRANSITION TYPE */}
      <Section
        title="Transition Type"
        description="Define how this transition works"
      >
        <Controller
          name={`transitions.${index}.transitionType`}
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {TRANSITION_TYPES.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => field.onChange(type.value)}
                    className={`
                      flex flex-col items-center gap-2 p-3 rounded-lg border transition-all
                      ${
                        field.value === type.value
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        />
      </Section>

      {/* TRIGGER STRATEGY */}
      {showTriggerStrategy && (
        <Section
          title="Who can trigger"
          description="Specify who can perform this action"
        >
          <Controller
            name={`transitions.${index}.triggerStrategy`}
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TRIGGER_STRATEGIES.map((strategy) => (
                    <SelectItem key={strategy.value} value={strategy.value}>
                      {strategy.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Section>
      )}
      {/* WHO CAN TRIGGER → PERMISSIONS */}
      {showTriggerPermissions && (
        <Section
          title="Who is allowed to perform this action"
          description="Limit who can use this transition"
        >
          <div className="space-y-4">
            <Controller
              name={`transitions.${index}.allowedRoleIds`}
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={roleList}
                  value={field.value ?? []}
                  onChange={field.onChange}
                  placeholder="Select allowed roles"
                />
              )}
            />

            <Controller
              name={`transitions.${index}.allowedUserIds`}
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={userList}
                  value={field.value ?? []}
                  onChange={field.onChange}
                  placeholder="Select specific users"
                />
              )}
            />
          </div>
        </Section>
      )}

      {/* APPROVAL CONFIG */}
      {requiresApproval && approvalConfig && (
        <div className="space-y-6 border-t pt-6">
          <Section
            title="Approval Settings"
            icon={<UserCheck className="h-4 w-4" />}
          >
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-700">
                    Approval Strategy
                  </Label>
                  <Controller
                    name={`transitions.${index}.approvalStrategy`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {APPROVAL_STRATEGIES.map((strategy) => (
                            <SelectItem
                              key={strategy.value}
                              value={strategy.value}
                            >
                              {strategy.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-700">Approval Mode</Label>
                  <Controller
                    name={`transitions.${index}.approvalConfig.mode`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {APPROVAL_MODES.map((mode) => (
                            <SelectItem key={mode.value} value={mode.value}>
                              {mode.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* {approvalConfig.mode === "PARALLEL" && (
                <div className="space-y-4">
                  <Controller
                    name={`transitions.${index}.approvalConfig.roleIds`}
                    control={control}
                    render={({ field }) => (
                      <MultiSelect
                        options={roleList}
                        value={field.value ?? []}
                        onChange={field.onChange}
                        placeholder="Select approver roles"
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
                        placeholder="Select specific users"
                      />
                    )}
                  />
                </div>
              )} */}

              {approvalConfig.mode === "SEQUENTIAL" && (
                <ApprovalLevelsEditor
                  control={control}
                  name={`transitions.${index}.approvalConfig.levels`}
                  roleList={roleList}
                  userList={userList}
                />
              )}

              {approvalConfig.mode === "PARALLEL" && (
                <ApprovalLevelsEditor
                  control={control}
                  name={`transitions.${index}.approvalConfig.levels`}
                  roleList={roleList}
                  userList={userList}
                />
              )}
            </div>
          </Section>
        </div>
      )}
    </div>
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
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            Workflow Transitions
          </h3>
          <p className="text-xs text-gray-500">
            Define rules for moving between stages
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-gray-50">
            {transitionArray.fields.length} transitions
          </Badge>
          <Button
            type="button"
            size="sm"
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
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Transition
          </Button>
        </div>
      </div>

      {transitionArray.fields.length === 0 && (
        <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center">
          <Settings className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            No transitions defined
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Add transitions to connect stages in your workflow
          </p>
          <Button
            type="button"
            size="sm"
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
            <Plus className="h-4 w-4 mr-2" />
            Add First Transition
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {transitionArray.fields.map((_: any, index: number) => (
          <TransitionCard
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
      </div>
    </div>
  );
}
