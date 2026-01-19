// "use client";

// import React, { useEffect, useMemo } from "react";
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
// import { MultiSelect } from "../../multiselect";
// import { cn } from "@/lib/utils";

// const TRIGGER_STRATEGIES = [
//   { value: "ANY_ALLOWED", label: "Anyone (allowed roles/users)" },
//   { value: "CREATOR_ONLY", label: "Only creator" },
//   { value: "ASSIGNEE_ONLY", label: "Only assignee" },
//   { value: "APPROVER_ONLY", label: "Only approvers (Approval)" },
//   { value: "SYSTEM_ONLY", label: "System only (Auto)" },
// ] as const;

// function normalizeOptions(list: any[]) {
//   return (list || [])
//     .map((x) => ({
//       label: String(x?.label ?? x?.name ?? x?.title ?? ""),
//       value: String(x?.value ?? x?.id ?? x?._id ?? ""),
//       roleIds: Array.isArray(x?.roleIds) ? x.roleIds.map(String) : undefined,
//     }))
//     .filter((o) => o.label && o.value);
// }

// function normalizeValueArray(v: any) {
//   if (!Array.isArray(v)) return [];
//   return v
//     .map((x) => {
//       if (typeof x === "string" || typeof x === "number") return String(x);
//       return String(x?.value ?? x?.id ?? x?._id ?? "");
//     })
//     .filter((x) => Boolean(String(x).trim()));
// }

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
//     <div className="rounded-2xl border bg-white/70 backdrop-blur p-4 shadow-sm space-y-3">
//       <div>
//         <div className="text-sm font-semibold">{title}</div>
//         {description ? (
//           <div className="text-xs text-muted-foreground">{description}</div>
//         ) : null}
//       </div>
//       {children}
//     </div>
//   );
// }

// function ApprovalLevelsEditor({ control, name, roleOptions, userOptions, errors, index }: any) {
//   const { fields, append, remove } = useFieldArray({ control, name });

//   return (
//     <div className="space-y-3">
//       <div className="flex items-center justify-between">
//         <Label className="text-sm font-semibold">Approval Levels</Label>
//         <Button
//           type="button"
//           size="sm"
//           variant="outline"
//           className="rounded-xl"
//           onClick={() =>
//             append({ order: fields.length + 1, roleIds: [], userIds: [] })
//           }
//         >
//           <Plus className="h-4 w-4 mr-1" />
//           Add Level
//         </Button>
//       </div>

//       {fields.map((lvl: any, i: number) => {
//         const lvlErr =
//           errors?.transitions?.[index]?.approvalConfig?.levels?.[i]?.message ||
//           errors?.transitions?.[index]?.approvalConfig?.levels?.[i]?.type;

//         return (
//           <Card
//             key={lvl.id}
//             className="p-4 rounded-2xl border bg-linear-to-b from-white to-slate-50 space-y-3"
//           >
//             <div className="flex items-center justify-between">
//               <div className="text-sm font-medium">Level {i + 1}</div>
//               <Button
//                 type="button"
//                 size="icon"
//                 variant="ghost"
//                 onClick={() => remove(i)}
//               >
//                 <Trash2 className="h-4 w-4 text-destructive" />
//               </Button>
//             </div>

//             <Controller
//               name={`${name}.${i}.roleIds`}
//               control={control}
//               render={({ field }) => (
//                 <MultiSelect
//                   options={roleOptions}
//                   value={normalizeValueArray(field.value)}
//                   onChange={(v: any) => field.onChange(normalizeValueArray(v))}
//                   placeholder="Approver roles"
//                 />
//               )}
//             />

//             <Controller
//               name={`${name}.${i}.userIds`}
//               control={control}
//               render={({ field }) => (
//                 <MultiSelect
//                   options={userOptions}
//                   value={normalizeValueArray(field.value)}
//                   onChange={(v: any) => field.onChange(normalizeValueArray(v))}
//                   placeholder="Specific users"
//                 />
//               )}
//             />

//             {lvlErr ? <p className="text-xs text-destructive">{String(lvlErr)}</p> : null}
//           </Card>
//         );
//       })}
//     </div>
//   );
// }

// export function TransitionRow({
//   index,
//   control,
//   register,
//   setValue,
//   remove,
//   normalizedStages,
//   roleList,
//   userList,
//   errors,
//   onDelete,
// }: any) {
//   const transitionType = useWatch({
//     control,
//     name: `transitions.${index}.transitionType`,
//   });

//   const triggerStrategy = useWatch({
//     control,
//     name: `transitions.${index}.triggerStrategy`,
//   });

//   const fromStage = useWatch({ control, name: `transitions.${index}.fromStageId` });
//   const toStage = useWatch({ control, name: `transitions.${index}.toStageId` });

//   const approvalConfig = useWatch({
//     control,
//     name: `transitions.${index}.approvalConfig`,
//   });

//   const approvalMode = approvalConfig?.mode;

//   const approvalLevels = useWatch({
//     control,
//     name: `transitions.${index}.approvalConfig.levels`,
//   });

//   const allowedRoleIdsRaw = useWatch({
//     control,
//     name: `transitions.${index}.allowedRoleIds`,
//   });

//   const allowedUserIdsRaw = useWatch({
//     control,
//     name: `transitions.${index}.allowedUserIds`,
//   });

//   const requiresApproval = transitionType === "APPROVAL";
//   const isAuto = transitionType === "AUTO";

//   const showTriggerStrategy =
//     transitionType === "NORMAL" ||
//     transitionType === "REVIEW" ||
//     transitionType === "SEND_BACK";

//   const showTriggerPermissions =
//     showTriggerStrategy && (triggerStrategy ?? "ANY_ALLOWED") === "ANY_ALLOWED";

//   const roleOptions = useMemo(() => normalizeOptions(roleList), [roleList]);

//   const allowedRoleIds = useMemo(
//     () => normalizeValueArray(allowedRoleIdsRaw),
//     [allowedRoleIdsRaw]
//   );

//   const filteredUsersRaw = useMemo(() => {
//     const users = normalizeOptions(userList);
//     if (!allowedRoleIds.length) return users;

//     const hasRoleMeta = users.some((u: any) => Array.isArray(u?.roleIds));
//     if (!hasRoleMeta) return users;

//     return users.filter((u: any) =>
//       (u.roleIds || []).some((rid: string) => allowedRoleIds.includes(String(rid)))
//     );
//   }, [userList, allowedRoleIds]);

//   const userOptionsFiltered = useMemo(
//     () => filteredUsersRaw.map((u: any) => ({ label: u.label, value: u.value })),
//     [filteredUsersRaw]
//   );

//   const userOptionsAll = useMemo(
//     () => normalizeOptions(userList).map((u: any) => ({ label: u.label, value: u.value })),
//     [userList]
//   );

//   // ✅ wipe approval only when not APPROVAL
//   useEffect(() => {
//     if (transitionType === "APPROVAL") return;

//     if (approvalConfig !== undefined) {
//       setValue(`transitions.${index}.approvalConfig`, undefined, { shouldDirty: true });
//     }

//     const curStrategy = control?._formValues?.transitions?.[index]?.approvalStrategy;
//     if (curStrategy !== undefined) {
//       setValue(`transitions.${index}.approvalStrategy`, undefined, { shouldDirty: true });
//     }
//   }, [transitionType, index, setValue, approvalConfig, control]);

//   // ✅ AUTO => enforce system only
//   useEffect(() => {
//     if (!isAuto) {
//       const cur = control?._formValues?.transitions?.[index]?.autoTrigger;
//       if (cur === true) setValue(`transitions.${index}.autoTrigger`, false, { shouldDirty: true });
//       return;
//     }

//     if (triggerStrategy !== "SYSTEM_ONLY") {
//       setValue(`transitions.${index}.triggerStrategy`, "SYSTEM_ONLY", { shouldDirty: true });
//     }
//     setValue(`transitions.${index}.autoTrigger`, true, { shouldDirty: true });
//     setValue(`transitions.${index}.allowedRoleIds`, [], { shouldDirty: true });
//     setValue(`transitions.${index}.allowedUserIds`, [], { shouldDirty: true });
//   }, [isAuto, triggerStrategy, index, setValue, control]);

//   // Prevent from=to
//   useEffect(() => {
//     if (fromStage && toStage && fromStage === toStage) {
//       setValue(`transitions.${index}.toStageId`, "", { shouldDirty: true });
//     }
//   }, [fromStage, toStage, index, setValue]);

//   // ✅ Approval init (ALWAYS include levels)
//   useEffect(() => {
//     if (!requiresApproval) return;

//     if (triggerStrategy !== "APPROVER_ONLY") {
//       setValue(`transitions.${index}.triggerStrategy`, "APPROVER_ONLY", { shouldDirty: true });
//     }

//     if (!approvalConfig) {
//       setValue(`transitions.${index}.approvalStrategy`, "ALL", { shouldDirty: true });
//       setValue(
//         `transitions.${index}.approvalConfig`,
//         {
//           mode: "PARALLEL",
//           levels: [{ order: 1, roleIds: [], userIds: [] }], // ✅ always valid
//         },
//         { shouldDirty: true }
//       );
//       return;
//     }

//     // if approvalConfig exists but levels missing → repair
//     const levels = approvalConfig?.levels;
//     if (!Array.isArray(levels) || levels.length === 0) {
//       setValue(
//         `transitions.${index}.approvalConfig.levels`,
//         [{ order: 1, roleIds: [], userIds: [] }],
//         { shouldDirty: true }
//       );
//     }

//     // if mode missing → default
//     if (!approvalConfig?.mode) {
//       setValue(`transitions.${index}.approvalConfig.mode`, "PARALLEL", { shouldDirty: true });
//     }
//   }, [requiresApproval, triggerStrategy, approvalConfig, index, setValue]);

//   // ✅ Normal/review/send_back should not keep APPROVER_ONLY/SYSTEM_ONLY
//   useEffect(() => {
//     if (!showTriggerStrategy) return;

//     if (triggerStrategy === "APPROVER_ONLY" || triggerStrategy === "SYSTEM_ONLY") {
//       setValue(`transitions.${index}.triggerStrategy`, "ANY_ALLOWED", { shouldDirty: true });
//     }

//     if (!Array.isArray(allowedRoleIdsRaw)) {
//       setValue(`transitions.${index}.allowedRoleIds`, [], { shouldDirty: true });
//     }
//     if (!Array.isArray(allowedUserIdsRaw)) {
//       setValue(`transitions.${index}.allowedUserIds`, [], { shouldDirty: true });
//     }
//   }, [showTriggerStrategy, triggerStrategy, index, setValue, allowedRoleIdsRaw, allowedUserIdsRaw]);

//   // ✅ Normalize approval levels orders / arrays (works for PARALLEL & SEQUENTIAL)
//   useEffect(() => {
//     if (!requiresApproval) return;
//     const levels = Array.isArray(approvalLevels) ? approvalLevels : [];

//     if (levels.length === 0) {
//       setValue(
//         `transitions.${index}.approvalConfig.levels`,
//         [{ order: 1, roleIds: [], userIds: [] }],
//         { shouldDirty: true }
//       );
//       return;
//     }

//     const normalized = levels.map((lvl: any, i: number) => ({
//       order: typeof lvl?.order === "number" ? lvl.order : i + 1,
//       roleIds: Array.isArray(lvl?.roleIds) ? lvl.roleIds : [],
//       userIds: Array.isArray(lvl?.userIds) ? lvl.userIds : [],
//     }));

//     const changed = levels.some((lvl: any, i: number) => {
//       const n = normalized[i];
//       return (
//         lvl?.order !== n.order ||
//         !Array.isArray(lvl?.roleIds) ||
//         !Array.isArray(lvl?.userIds)
//       );
//     });

//     if (changed) {
//       setValue(`transitions.${index}.approvalConfig.levels`, normalized, { shouldDirty: true });
//     }
//   }, [requiresApproval, approvalLevels, index, setValue]);

//   // ✅ Cleanup selected users when role filter changes
//   useEffect(() => {
//     if (!allowedRoleIds.length) return;

//     const selected = normalizeValueArray(allowedUserIdsRaw);
//     if (!selected.length) return;

//     const allowedSet = new Set(userOptionsFiltered.map((u: any) => u.value));
//     const cleaned = selected.filter((id) => allowedSet.has(String(id)));

//     if (cleaned.length !== selected.length) {
//       setValue(`transitions.${index}.allowedUserIds`, cleaned, { shouldDirty: true });
//     }
//   }, [allowedRoleIds, allowedUserIdsRaw, userOptionsFiltered, index, setValue]);

//   const labelError =
//     errors?.transitions?.[index]?.label?.message || errors?.transitions?.[index]?.label?.type;

//   const triggerOptions = useMemo(() => {
//     if (transitionType === "APPROVAL")
//       return TRIGGER_STRATEGIES.filter((x) => x.value === "APPROVER_ONLY");
//     if (transitionType === "AUTO")
//       return TRIGGER_STRATEGIES.filter((x) => x.value === "SYSTEM_ONLY");
//     if (showTriggerStrategy) {
//       return TRIGGER_STRATEGIES.filter(
//         (x) =>
//           x.value === "ANY_ALLOWED" ||
//           x.value === "CREATOR_ONLY" ||
//           x.value === "ASSIGNEE_ONLY"
//       );
//     }
//     return TRIGGER_STRATEGIES.filter((x) => x.value === "ANY_ALLOWED");
//   }, [transitionType, showTriggerStrategy]);

//   return (
//     <Card
//       className={cn(
//         "rounded-3xl border p-5 shadow-md space-y-5",
//         "bg-linear-to-br from-indigo-50/40 via-white to-rose-50/40",
//         "hover:shadow-lg transition"
//       )}
//     >
//       <div className="flex items-start justify-between gap-3">
//         <div className="space-y-1">
//           <div className="text-sm font-semibold flex items-center gap-2">
//             Transition <span className="text-muted-foreground">#{index + 1}</span>
//             <span className="text-[11px] px-2 py-0.5 rounded-full border bg-white/70">
//               {transitionType || "NORMAL"}
//             </span>
//           </div>
//           <div className="text-xs text-muted-foreground">
//             Configure action, flow, and rules
//           </div>
//         </div>

//         <Button
//           type="button"
//           size="icon"
//           variant="ghost"
//           onClick={() => {
//             if (typeof onDelete === "function") return onDelete();
//             return remove(index);
//           }}
//         >
//           <Trash2 className="h-4 w-4 text-destructive" />
//         </Button>
//       </div>

//       {/* Action */}
//       <Section title="Action" description="Action label cannot be empty">
//         <Input
//           placeholder="e.g. Submit for approval"
//           aria-invalid={!!labelError}
//           className={cn("rounded-xl", !!labelError ? "border-destructive" : "")}
//           {...register(`transitions.${index}.label`, {
//             required: "Action label is required",
//             validate: (v: any) =>
//               String(v ?? "").trim().length > 0 || "Action label is required",
//           })}
//         />
//         {labelError ? (
//           <p className="text-xs text-destructive">{String(labelError)}</p>
//         ) : null}
//       </Section>

//       {/* Flow */}
//       <Section title="Flow" description="From → To + Transition Type">
//         <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
//           <Controller
//             name={`transitions.${index}.fromStageId`}
//             control={control}
//             render={({ field }) => (
//               <div className="space-y-2">
//                 <Label className="text-xs">From</Label>
//                 <Select value={field.value ?? ""} onValueChange={field.onChange}>
//                   <SelectTrigger className="rounded-xl bg-white">
//                     <SelectValue placeholder="From stage" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {normalizedStages.map((s: any) => (
//                       <SelectItem key={s.id} value={String(s.id)}>
//                         {s.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}
//           />

//           <div className="pb-2">
//             <ArrowRight className="h-4 w-4 text-muted-foreground" />
//           </div>

//           <Controller
//             name={`transitions.${index}.toStageId`}
//             control={control}
//             render={({ field }) => (
//               <div className="space-y-2">
//                 <Label className="text-xs">To</Label>
//                 <Select value={field.value ?? ""} onValueChange={field.onChange}>
//                   <SelectTrigger className="rounded-xl bg-white">
//                     <SelectValue placeholder="To stage" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {normalizedStages.map((s: any) => (
//                       <SelectItem key={s.id} value={String(s.id)}>
//                         {s.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}
//           />
//         </div>

//         <div className="mt-4">
//           <Controller
//             name={`transitions.${index}.transitionType`}
//             control={control}
//             render={({ field }) => (
//               <div className="space-y-2">
//                 <Label className="text-xs">Transition Type</Label>
//                 <Select value={field.value ?? "NORMAL"} onValueChange={field.onChange}>
//                   <SelectTrigger className="rounded-xl bg-white">
//                     <SelectValue placeholder="Type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="NORMAL">Normal</SelectItem>
//                     <SelectItem value="APPROVAL">Approval</SelectItem>
//                     <SelectItem value="SEND_BACK">Send Back</SelectItem>
//                     <SelectItem value="REVIEW">Review</SelectItem>
//                     <SelectItem value="AUTO">Automatic</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}
//           />
//         </div>
//       </Section>

//       {/* Who can trigger */}
//       {showTriggerStrategy && (
//         <>
//           <Section title="Who can trigger" description="Specify who can perform this action">
//             <Controller
//               name={`transitions.${index}.triggerStrategy`}
//               control={control}
//               render={({ field }) => (
//                 <Select value={field.value ?? "ANY_ALLOWED"} onValueChange={field.onChange}>
//                   <SelectTrigger className="rounded-xl bg-white">
//                     <SelectValue placeholder="Select trigger strategy" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {triggerOptions.map((strategy) => (
//                       <SelectItem key={strategy.value} value={strategy.value}>
//                         {strategy.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//           </Section>

//           {showTriggerPermissions && (
//             <Section title="Who is allowed to perform this action" description="Limit who can use this transition">
//               <div className="space-y-4">
//                 <Controller
//                   name={`transitions.${index}.allowedRoleIds`}
//                   control={control}
//                   render={({ field }) => (
//                     <MultiSelect
//                       options={roleOptions}
//                       value={normalizeValueArray(field.value)}
//                       onChange={(v: any) => field.onChange(normalizeValueArray(v))}
//                       placeholder="Select allowed roles"
//                     />
//                   )}
//                 />

//                 <Controller
//                   name={`transitions.${index}.allowedUserIds`}
//                   control={control}
//                   render={({ field }) => (
//                     <MultiSelect
//                       options={userOptionsFiltered}
//                       value={normalizeValueArray(field.value)}
//                       onChange={(v: any) => field.onChange(normalizeValueArray(v))}
//                       placeholder={
//                         allowedRoleIds.length
//                           ? userOptionsFiltered.length
//                             ? "Select specific users (filtered by roles)"
//                             : "No users for selected roles"
//                           : "Select specific users"
//                       }
//                       className={cn(
//                         allowedRoleIds.length && userOptionsFiltered.length === 0
//                           ? "border-destructive/40"
//                           : ""
//                       )}
//                     />
//                   )}
//                 />
//               </div>
//             </Section>
//           )}
//         </>
//       )}

//       {/* Approval Configuration (SYNCED SHAPE) */}
//       {requiresApproval && approvalConfig && (
//         <Section title="Approval Configuration" description="Parallel or Sequential approvals">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <Controller
//               name={`transitions.${index}.approvalStrategy`}
//               control={control}
//               render={({ field }) => (
//                 <div className="space-y-2">
//                   <Label className="text-xs">Approval strategy</Label>
//                   <Select value={field.value ?? "ALL"} onValueChange={field.onChange}>
//                     <SelectTrigger className="rounded-xl bg-white">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="ALL">All</SelectItem>
//                       <SelectItem value="ANY">Any</SelectItem>
//                       <SelectItem value="MAJORITY">Majority</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}
//             />

//             <Controller
//               name={`transitions.${index}.approvalConfig.mode`}
//               control={control}
//               render={({ field }) => (
//                 <div className="space-y-2">
//                   <Label className="text-xs">Mode</Label>
//                   <Select value={field.value ?? "PARALLEL"} onValueChange={field.onChange}>
//                     <SelectTrigger className="rounded-xl bg-white">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="PARALLEL">Parallel</SelectItem>
//                       <SelectItem value="SEQUENTIAL">Sequential</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}
//             />
//           </div>

//           {/* ✅ SAME editor for both modes so TransitionsStep & Canvas stay synced */}
//           <div className="mt-4">
//             <ApprovalLevelsEditor
//               control={control}
//               name={`transitions.${index}.approvalConfig.levels`}
//               roleOptions={roleOptions}
//               userOptions={userOptionsAll}
//               errors={errors}
//               index={index}
//             />
//           </div>
//         </Section>
//       )}
//     </Card>
//   );
// }

/////////////////////////////
// "use client";

// import React, { useEffect, useMemo } from "react";
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
// import {
//   Trash2,
//   Plus,
//   ChevronRight,
//   Users,
//   User,
//   Shield,
//   Settings,
//   CheckCircle,
//   Zap,
//   Send,
//   Eye,
//   ArrowRightCircle
// } from "lucide-react";
// import { MultiSelect } from "../../multiselect";
// import { cn } from "@/lib/utils";

// const TRIGGER_STRATEGIES = [
//   { value: "ANY_ALLOWED", label: "Anyone allowed" },
//   { value: "CREATOR_ONLY", label: "Creator only" },
//   { value: "ASSIGNEE_ONLY", label: "Assignee only" },
//   { value: "APPROVER_ONLY", label: "Approvers only" },
//   { value: "SYSTEM_ONLY", label: "System only" },
// ] as const;

// const TRANSITION_TYPES = [
//   {
//     value: "NORMAL",
//     label: "Normal",
//     description: "Standard transition between stages",
//     icon: ArrowRightCircle,
//     color: "text-gray-600 bg-gray-50 border-gray-200"
//   },
//   {
//     value: "APPROVAL",
//     label: "Approval",
//     description: "Requires approval before moving forward",
//     icon: CheckCircle,
//     color: "text-blue-600 bg-blue-50 border-blue-200"
//   },
//   {
//     value: "SEND_BACK",
//     label: "Send Back",
//     description: "Return to previous stage",
//     icon: Send,
//     color: "text-amber-600 bg-amber-50 border-amber-200"
//   },
//   {
//     value: "REVIEW",
//     label: "Review",
//     description: "Review before proceeding",
//     icon: Eye,
//     color: "text-purple-600 bg-purple-50 border-purple-200"
//   },
//   {
//     value: "AUTO",
//     label: "Automatic",
//     description: "Automatically triggered by system",
//     icon: Zap,
//     color: "text-green-600 bg-green-50 border-green-200"
//   },
// ] as const;

// function normalizeOptions(list: any[]) {
//   return (list || [])
//     .map((x) => ({
//       label: String(x?.label ?? x?.name ?? x?.title ?? ""),
//       value: String(x?.value ?? x?.id ?? x?._id ?? ""),
//       roleIds: Array.isArray(x?.roleIds) ? x.roleIds.map(String) : undefined,
//     }))
//     .filter((o) => o.label && o.value);
// }

// function normalizeValueArray(v: any) {
//   if (!Array.isArray(v)) return [];
//   return v
//     .map((x) => {
//       if (typeof x === "string" || typeof x === "number") return String(x);
//       return String(x?.value ?? x?.id ?? x?._id ?? "");
//     })
//     .filter((x) => Boolean(String(x).trim()));
// }

// function Section({
//   title,
//   description,
//   children,
//   icon: Icon,
//   noIcon = false,
// }: {
//   title: string;
//   description?: string;
//   children: React.ReactNode;
//   icon?: React.ComponentType<{ className?: string }>;
//   noIcon?: boolean;
// }) {
//   return (
//     <div className="space-y-3">
//       <div className="flex items-start gap-3">
//         {!noIcon && Icon && (
//           <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded">
//             <Icon className="h-3.5 w-3.5 text-gray-500" />
//           </div>
//         )}
//         <div className="flex-1">
//           <h4 className="text-sm font-medium text-gray-900">{title}</h4>
//           {description && (
//             <p className="mt-0.5 text-xs text-gray-500">{description}</p>
//           )}
//         </div>
//       </div>
//       <div className={cn("space-y-3", !noIcon && "pl-8")}>{children}</div>
//     </div>
//   );
// }

// function ApprovalLevelsEditor({ control, name, roleOptions, userOptions, errors, index }: any) {
//   const { fields, append, remove } = useFieldArray({ control, name });

//   return (
//     <div className="space-y-3">
//       <div className="flex items-center justify-between">
//         <Label className="text-sm font-medium text-gray-900">Approval Levels</Label>
//         <Button
//           type="button"
//           size="sm"
//           variant="ghost"
//           className="h-7 rounded-md text-xs"
//           onClick={() =>
//             append({ order: fields.length + 1, roleIds: [], userIds: [] })
//           }
//         >
//           <Plus className="h-3 w-3 mr-1.5" />
//           Add Level
//         </Button>
//       </div>

//       <div className="space-y-2">
//         {fields.map((lvl: any, i: number) => {
//           const lvlErr =
//             errors?.transitions?.[index]?.approvalConfig?.levels?.[i]?.message ||
//             errors?.transitions?.[index]?.approvalConfig?.levels?.[i]?.type;

//           return (
//             <div
//               key={lvl.id}
//               className="rounded-lg border border-gray-200 bg-white p-3 space-y-2"
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="flex h-5 w-5 items-center justify-center rounded bg-gray-100 text-xs font-medium text-gray-700">
//                     {i + 1}
//                   </div>
//                   <span className="text-xs font-medium text-gray-700">Level {i + 1}</span>
//                 </div>
//                 <Button
//                   type="button"
//                   size="icon"
//                   variant="ghost"
//                   onClick={() => remove(i)}
//                   className="h-6 w-6"
//                 >
//                   <Trash2 className="h-3 w-3 text-gray-400 hover:text-red-500" />
//                 </Button>
//               </div>

//               <div className="space-y-2">
//                 <Controller
//                   name={`${name}.${i}.roleIds`}
//                   control={control}
//                   render={({ field }) => (
//                     <MultiSelect
//                       options={roleOptions}
//                       value={normalizeValueArray(field.value)}
//                       onChange={(v: any) => field.onChange(normalizeValueArray(v))}
//                       placeholder="Approver roles"

//                     />
//                   )}
//                 />

//                 <Controller
//                   name={`${name}.${i}.userIds`}
//                   control={control}
//                   render={({ field }) => (
//                     <MultiSelect
//                       options={userOptions}
//                       value={normalizeValueArray(field.value)}
//                       onChange={(v: any) => field.onChange(normalizeValueArray(v))}
//                       placeholder="Specific users"

//                     />
//                   )}
//                 />
//               </div>

//               {lvlErr && <p className="text-xs text-red-500">{String(lvlErr)}</p>}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function TransitionTypeRadio({ value, label, description, icon: Icon, color, isSelected, onChange }: any) {
//   return (
//     <label className={cn(
//       "relative flex cursor-pointer rounded-lg border p-3 transition-all hover:bg-gray-50",
//       isSelected ? "border-gray-300 bg-gray-50 ring-1 ring-gray-300" : "border-gray-200",
//       "hover:border-gray-300"
//     )}>
//       <input
//         type="radio"
//         name="transitionType"
//         value={value}
//         checked={isSelected}
//         onChange={() => onChange(value)}
//         className="sr-only"
//       />
//       <div className="flex items-start gap-3">
//         <div className={cn(
//           "mt-0.5 flex h-8 w-8 items-center justify-center rounded-md",
//           color.split(" ")[1] // Get the background color class
//         )}>
//           <Icon className={cn("h-4 w-4", color.split(" ")[0])} />
//         </div>
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium text-gray-900">{label}</span>
//             <span className={cn(
//               "text-xs font-medium px-1.5 py-0.5 rounded-full border",
//               color
//             )}>
//               {value}
//             </span>
//           </div>
//           <p className="mt-1 text-xs text-gray-500">{description}</p>
//         </div>
//         <div className={cn(
//           "flex h-4 w-4 items-center justify-center rounded-full border",
//           isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
//         )}>
//           {isSelected && (
//             <div className="h-2 w-2 rounded-full bg-white"></div>
//           )}
//         </div>
//       </div>
//     </label>
//   );
// }

// export function TransitionRow({
//   index,
//   control,
//   register,
//   setValue,
//   remove,
//   normalizedStages,
//   roleList,
//   userList,
//   errors,
//   onDelete,
// }: any) {
//   const transitionType = useWatch({
//     control,
//     name: `transitions.${index}.transitionType`,
//   });

//   const triggerStrategy = useWatch({
//     control,
//     name: `transitions.${index}.triggerStrategy`,
//   });

//   const fromStage = useWatch({ control, name: `transitions.${index}.fromStageId` });
//   const toStage = useWatch({ control, name: `transitions.${index}.toStageId` });

//   const approvalConfig = useWatch({
//     control,
//     name: `transitions.${index}.approvalConfig`,
//   });

//   const approvalMode = approvalConfig?.mode;

//   const approvalLevels = useWatch({
//     control,
//     name: `transitions.${index}.approvalConfig.levels`,
//   });

//   const allowedRoleIdsRaw = useWatch({
//     control,
//     name: `transitions.${index}.allowedRoleIds`,
//   });

//   const allowedUserIdsRaw = useWatch({
//     control,
//     name: `transitions.${index}.allowedUserIds`,
//   });

//   const requiresApproval = transitionType === "APPROVAL";
//   const isAuto = transitionType === "AUTO";

//   const showTriggerStrategy =
//     transitionType === "NORMAL" ||
//     transitionType === "REVIEW" ||
//     transitionType === "SEND_BACK";

//   const showTriggerPermissions =
//     showTriggerStrategy && (triggerStrategy ?? "ANY_ALLOWED") === "ANY_ALLOWED";

//   const roleOptions = useMemo(() => normalizeOptions(roleList), [roleList]);

//   const allowedRoleIds = useMemo(
//     () => normalizeValueArray(allowedRoleIdsRaw),
//     [allowedRoleIdsRaw]
//   );

//   const filteredUsersRaw = useMemo(() => {
//     const users = normalizeOptions(userList);
//     if (!allowedRoleIds.length) return users;

//     const hasRoleMeta = users.some((u: any) => Array.isArray(u?.roleIds));
//     if (!hasRoleMeta) return users;

//     return users.filter((u: any) =>
//       (u.roleIds || []).some((rid: string) => allowedRoleIds.includes(String(rid)))
//     );
//   }, [userList, allowedRoleIds]);

//   const userOptionsFiltered = useMemo(
//     () => filteredUsersRaw.map((u: any) => ({ label: u.label, value: u.value })),
//     [filteredUsersRaw]
//   );

//   const userOptionsAll = useMemo(
//     () => normalizeOptions(userList).map((u: any) => ({ label: u.label, value: u.value })),
//     [userList]
//   );

//   useEffect(() => {
//     if (transitionType === "APPROVAL") return;

//     if (approvalConfig !== undefined) {
//       setValue(`transitions.${index}.approvalConfig`, undefined, { shouldDirty: true });
//     }

//     const curStrategy = control?._formValues?.transitions?.[index]?.approvalStrategy;
//     if (curStrategy !== undefined) {
//       setValue(`transitions.${index}.approvalStrategy`, undefined, { shouldDirty: true });
//     }
//   }, [transitionType, index, setValue, approvalConfig, control]);

//   useEffect(() => {
//     if (!isAuto) {
//       const cur = control?._formValues?.transitions?.[index]?.autoTrigger;
//       if (cur === true) setValue(`transitions.${index}.autoTrigger`, false, { shouldDirty: true });
//       return;
//     }

//     if (triggerStrategy !== "SYSTEM_ONLY") {
//       setValue(`transitions.${index}.triggerStrategy`, "SYSTEM_ONLY", { shouldDirty: true });
//     }
//     setValue(`transitions.${index}.autoTrigger`, true, { shouldDirty: true });
//     setValue(`transitions.${index}.allowedRoleIds`, [], { shouldDirty: true });
//     setValue(`transitions.${index}.allowedUserIds`, [], { shouldDirty: true });
//   }, [isAuto, triggerStrategy, index, setValue, control]);

//   useEffect(() => {
//     if (fromStage && toStage && fromStage === toStage) {
//       setValue(`transitions.${index}.toStageId`, "", { shouldDirty: true });
//     }
//   }, [fromStage, toStage, index, setValue]);

//   useEffect(() => {
//     if (!requiresApproval) return;

//     if (triggerStrategy !== "APPROVER_ONLY") {
//       setValue(`transitions.${index}.triggerStrategy`, "APPROVER_ONLY", { shouldDirty: true });
//     }

//     if (!approvalConfig) {
//       setValue(`transitions.${index}.approvalStrategy`, "ALL", { shouldDirty: true });
//       setValue(
//         `transitions.${index}.approvalConfig`,
//         {
//           mode: "PARALLEL",
//           levels: [{ order: 1, roleIds: [], userIds: [] }],
//         },
//         { shouldDirty: true }
//       );
//       return;
//     }

//     const levels = approvalConfig?.levels;
//     if (!Array.isArray(levels) || levels.length === 0) {
//       setValue(
//         `transitions.${index}.approvalConfig.levels`,
//         [{ order: 1, roleIds: [], userIds: [] }],
//         { shouldDirty: true }
//       );
//     }

//     if (!approvalConfig?.mode) {
//       setValue(`transitions.${index}.approvalConfig.mode`, "PARALLEL", { shouldDirty: true });
//     }
//   }, [requiresApproval, triggerStrategy, approvalConfig, index, setValue]);

//   useEffect(() => {
//     if (!showTriggerStrategy) return;

//     if (triggerStrategy === "APPROVER_ONLY" || triggerStrategy === "SYSTEM_ONLY") {
//       setValue(`transitions.${index}.triggerStrategy`, "ANY_ALLOWED", { shouldDirty: true });
//     }

//     if (!Array.isArray(allowedRoleIdsRaw)) {
//       setValue(`transitions.${index}.allowedRoleIds`, [], { shouldDirty: true });
//     }
//     if (!Array.isArray(allowedUserIdsRaw)) {
//       setValue(`transitions.${index}.allowedUserIds`, [], { shouldDirty: true });
//     }
//   }, [showTriggerStrategy, triggerStrategy, index, setValue, allowedRoleIdsRaw, allowedUserIdsRaw]);

//   useEffect(() => {
//     if (!requiresApproval) return;
//     const levels = Array.isArray(approvalLevels) ? approvalLevels : [];

//     if (levels.length === 0) {
//       setValue(
//         `transitions.${index}.approvalConfig.levels`,
//         [{ order: 1, roleIds: [], userIds: [] }],
//         { shouldDirty: true }
//       );
//       return;
//     }

//     const normalized = levels.map((lvl: any, i: number) => ({
//       order: typeof lvl?.order === "number" ? lvl.order : i + 1,
//       roleIds: Array.isArray(lvl?.roleIds) ? lvl.roleIds : [],
//       userIds: Array.isArray(lvl?.userIds) ? lvl.userIds : [],
//     }));

//     const changed = levels.some((lvl: any, i: number) => {
//       const n = normalized[i];
//       return (
//         lvl?.order !== n.order ||
//         !Array.isArray(lvl?.roleIds) ||
//         !Array.isArray(lvl?.userIds)
//       );
//     });

//     if (changed) {
//       setValue(`transitions.${index}.approvalConfig.levels`, normalized, { shouldDirty: true });
//     }
//   }, [requiresApproval, approvalLevels, index, setValue]);

//   useEffect(() => {
//     if (!allowedRoleIds.length) return;

//     const selected = normalizeValueArray(allowedUserIdsRaw);
//     if (!selected.length) return;

//     const allowedSet = new Set(userOptionsFiltered.map((u: any) => u.value));
//     const cleaned = selected.filter((id) => allowedSet.has(String(id)));

//     if (cleaned.length !== selected.length) {
//       setValue(`transitions.${index}.allowedUserIds`, cleaned, { shouldDirty: true });
//     }
//   }, [allowedRoleIds, allowedUserIdsRaw, userOptionsFiltered, index, setValue]);

//   const labelError =
//     errors?.transitions?.[index]?.label?.message || errors?.transitions?.[index]?.label?.type;

//   const triggerOptions = useMemo(() => {
//     if (transitionType === "APPROVAL")
//       return TRIGGER_STRATEGIES.filter((x) => x.value === "APPROVER_ONLY");
//     if (transitionType === "AUTO")
//       return TRIGGER_STRATEGIES.filter((x) => x.value === "SYSTEM_ONLY");
//     if (showTriggerStrategy) {
//       return TRIGGER_STRATEGIES.filter(
//         (x) =>
//           x.value === "ANY_ALLOWED" ||
//           x.value === "CREATOR_ONLY" ||
//           x.value === "ASSIGNEE_ONLY"
//       );
//     }
//     return TRIGGER_STRATEGIES.filter((x) => x.value === "ANY_ALLOWED");
//   }, [transitionType, showTriggerStrategy]);

//   const getTypeColor = (type: string) => {
//     const found = TRANSITION_TYPES.find(t => t.value === type);
//     return found ? found.color : "text-gray-600 bg-gray-50 border-gray-200";
//   };

//   const handleTransitionTypeChange = (value: string) => {
//     setValue(`transitions.${index}.transitionType`, value, { shouldDirty: true });
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between pb-2 border-b border-gray-100">
//         <div className="space-y-1">
//           <div className="flex items-center gap-2">
//             <h3 className="text-base font-semibold text-gray-900">Transition</h3>
//             <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getTypeColor(transitionType)}`}>
//               {transitionType || "NORMAL"}
//             </span>
//           </div>
//           <p className="text-xs text-gray-500">Configure rules and permissions</p>
//         </div>
//         <Button
//           type="button"
//           size="icon"
//           variant="ghost"
//           onClick={() => {
//             if (typeof onDelete === "function") return onDelete();
//             return remove(index);
//           }}
//           className="h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-red-50"
//         >
//           <Trash2 className="h-3.5 w-3.5" />
//         </Button>
//       </div>

//       <div className="space-y-5">
//         {/* Basic Info */}
//         <Section
//           title="Basic Information"
//           description="Configure the transition details"
//           icon={Settings}
//         >
//           <div className="space-y-3">
//             <div className="space-y-1.5">
//               <Label className="text-xs font-medium text-gray-700">Action Label *</Label>
//               <Input
//                 placeholder="Submit for approval, Review, etc."
//                 aria-invalid={!!labelError}
//                 className={cn(
//                   "rounded-md text-sm h-9",
//                   !!labelError
//                     ? "border-red-300 focus:border-red-300 focus:ring-red-200"
//                     : "border-gray-300"
//                 )}
//                 {...register(`transitions.${index}.label`, {
//                   required: "Action label is required",
//                   validate: (v: any) =>
//                     String(v ?? "").trim().length > 0 || "Action label is required",
//                 })}
//               />
//               {labelError && (
//                 <p className="text-xs text-red-500">{String(labelError)}</p>
//               )}
//             </div>
//           </div>
//         </Section>

//         {/* Flow */}
//         <Section
//           title="Flow"
//           description="Define the stage transition"
//           icon={ArrowRightCircle}
//         >
//           <div className="space-y-3">
//             <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
//               <Controller
//                 name={`transitions.${index}.fromStageId`}
//                 control={control}
//                 render={({ field }) => (
//                   <div className="space-y-1.5">
//                     <Label className="text-xs font-medium text-gray-700">From</Label>
//                     <Select value={field.value ?? ""} onValueChange={field.onChange}>
//                       <SelectTrigger className="rounded-md h-9 text-sm">
//                         <SelectValue placeholder="Select source" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {normalizedStages.map((s: any) => (
//                           <SelectItem key={s.id} value={String(s.id)}>
//                             {s.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 )}
//               />

//               <div className="pt-6">
//                 <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
//               </div>

//               <Controller
//                 name={`transitions.${index}.toStageId`}
//                 control={control}
//                 render={({ field }) => (
//                   <div className="space-y-1.5">
//                     <Label className="text-xs font-medium text-gray-700">To</Label>
//                     <Select value={field.value ?? ""} onValueChange={field.onChange}>
//                       <SelectTrigger className="rounded-md h-9 text-sm">
//                         <SelectValue placeholder="Select destination" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {normalizedStages.map((s: any) => (
//                           <SelectItem key={s.id} value={String(s.id)}>
//                             {s.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 )}
//               />
//             </div>
//           </div>
//         </Section>

//         {/* Transition Type - Now as Radio Selection */}
//         <Section
//           title="Transition Type"
//           description="Choose the type of transition"
//           icon={Settings}
//         >
//           <div className="space-y-2">
//             {TRANSITION_TYPES.map((type) => (
//               <TransitionTypeRadio
//                 key={type.value}
//                 value={type.value}
//                 label={type.label}
//                 description={type.description}
//                 icon={type.icon}
//                 color={type.color}
//                 isSelected={transitionType === type.value}
//                 onChange={handleTransitionTypeChange}
//               />
//             ))}
//           </div>
//         </Section>

//         {/* Who can trigger */}
//         {showTriggerStrategy && (
//           <>
//             <Section
//               title="Trigger Permissions"
//               description="Control who can initiate this transition"
//               icon={Users}
//             >
//               <div className="space-y-3">
//                 <div className="space-y-1.5">
//                   <Label className="text-xs font-medium text-gray-700">Trigger Strategy</Label>
//                   <Controller
//                     name={`transitions.${index}.triggerStrategy`}
//                     control={control}
//                     render={({ field }) => (
//                       <Select value={field.value ?? "ANY_ALLOWED"} onValueChange={field.onChange}>
//                         <SelectTrigger className="rounded-md h-9 text-sm">
//                           <SelectValue placeholder="Select strategy" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {triggerOptions.map((strategy) => (
//                             <SelectItem key={strategy.value} value={strategy.value}>
//                               {strategy.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 </div>
//               </div>
//             </Section>

//             {showTriggerPermissions && (
//               <Section
//                 title="Allowed Users"
//                 description="Restrict to specific roles and users"
//                 icon={User}
//               >
//                 <div className="space-y-3">
//                   <div className="space-y-1.5">
//                     <Label className="text-xs font-medium text-gray-700">Allowed Roles</Label>
//                     <Controller
//                       name={`transitions.${index}.allowedRoleIds`}
//                       control={control}
//                       render={({ field }) => (
//                         <MultiSelect
//                           options={roleOptions}
//                           value={normalizeValueArray(field.value)}
//                           onChange={(v: any) => field.onChange(normalizeValueArray(v))}
//                           placeholder="Select allowed roles"

//                         />
//                       )}
//                     />
//                   </div>

//                   <div className="space-y-1.5">
//                     <Label className="text-xs font-medium text-gray-700">Allowed Users</Label>
//                     <Controller
//                       name={`transitions.${index}.allowedUserIds`}
//                       control={control}
//                       render={({ field }) => (
//                         <MultiSelect
//                           options={userOptionsFiltered}
//                           value={normalizeValueArray(field.value)}
//                           onChange={(v: any) => field.onChange(normalizeValueArray(v))}
//                           placeholder={
//                             allowedRoleIds.length
//                               ? userOptionsFiltered.length
//                                 ? "Select specific users (filtered by roles)"
//                                 : "No users for selected roles"
//                               : "Select specific users"
//                           }

//                           className={cn(
//                             allowedRoleIds.length && userOptionsFiltered.length === 0
//                               ? "border-red-300"
//                               : ""
//                           )}
//                         />
//                       )}
//                     />
//                     {allowedRoleIds.length && userOptionsFiltered.length === 0 && (
//                       <p className="text-xs text-red-500">No users found for the selected roles</p>
//                     )}
//                   </div>
//                 </div>
//               </Section>
//             )}
//           </>
//         )}

//         {/* Approval Configuration */}
//         {requiresApproval && approvalConfig && (
//           <Section
//             title="Approval Configuration"
//             description="Set up approval workflow rules"
//             icon={Shield}
//           >
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="space-y-1.5">
//                   <Label className="text-xs font-medium text-gray-700">Approval Strategy</Label>
//                   <Controller
//                     name={`transitions.${index}.approvalStrategy`}
//                     control={control}
//                     render={({ field }) => (
//                       <Select value={field.value ?? "ALL"} onValueChange={field.onChange}>
//                         <SelectTrigger className="rounded-md h-9 text-sm">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="ALL">All</SelectItem>
//                           <SelectItem value="ANY">Any</SelectItem>
//                           <SelectItem value="MAJORITY">Majority</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 </div>

//                 <div className="space-y-1.5">
//                   <Label className="text-xs font-medium text-gray-700">Mode</Label>
//                   <Controller
//                     name={`transitions.${index}.approvalConfig.mode`}
//                     control={control}
//                     render={({ field }) => (
//                       <Select value={field.value ?? "PARALLEL"} onValueChange={field.onChange}>
//                         <SelectTrigger className="rounded-md h-9 text-sm">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="PARALLEL">Parallel</SelectItem>
//                           <SelectItem value="SEQUENTIAL">Sequential</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 </div>
//               </div>

//               <ApprovalLevelsEditor
//                 control={control}
//                 name={`transitions.${index}.approvalConfig.levels`}
//                 roleOptions={roleOptions}
//                 userOptions={userOptionsAll}
//                 errors={errors}
//                 index={index}
//               />
//             </div>
//           </Section>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useMemo } from "react";
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
import {
  Trash2,
  Plus,
  ChevronRight,
  Users,
  User,
  Shield,
  Settings,
  CheckCircle,
  Zap,
  Send,
  Eye,
  ArrowRightCircle,
} from "lucide-react";
import { MultiSelect } from "../../multiselect";
import { cn } from "@/lib/utils";
import { useTransitionRules } from "../../useTransitionRules";
import { filterDestinationStages } from "../../transitionFilters";

const TRIGGER_STRATEGIES = [
  { value: "ANY_ALLOWED", label: "Anyone allowed" },
  { value: "CREATOR_ONLY", label: "Creator only" },
  { value: "ASSIGNEE_ONLY", label: "Assignee only" },
  { value: "APPROVER_ONLY", label: "Approvers only" },
  { value: "SYSTEM_ONLY", label: "System only" },
] as const;

const TRANSITION_TYPES = [
  {
    value: "NORMAL",
    label: "Normal",
    description: "Standard transition",
    icon: ArrowRightCircle,
    color: "text-gray-600 bg-gray-50 border-gray-200",
    bgColor: "bg-gray-50",
  },
  {
    value: "APPROVAL",
    label: "Approval",
    description: "Requires approval",
    icon: CheckCircle,
    color: "text-blue-600 bg-blue-50 border-blue-200",
    bgColor: "bg-blue-50",
  },
  {
    value: "SEND_BACK",
    label: "Send Back / Reopen",
    description: "Send back or reopen a completed item",
    icon: Send,
    color: "text-amber-600 bg-amber-50 border-amber-200",
    bgColor: "bg-amber-50",
  },
  {
    value: "REVIEW",
    label: "Review",
    description: "Review required",
    icon: Eye,
    color: "text-purple-600 bg-purple-50 border-purple-200",
    bgColor: "bg-purple-50",
  },
  // {
  //   value: "AUTO",
  //   label: "Automatic",
  //   description: "System triggered",
  //   icon: Zap,
  //   color: "text-green-600 bg-green-50 border-green-200",
  //   bgColor: "bg-green-50"
  // },
] as const;

function normalizeOptions(list: any[]) {
  return (list || [])
    .map((x) => ({
      label: String(x?.label ?? x?.name ?? x?.title ?? ""),
      value: String(x?.value ?? x?.id ?? x?._id ?? ""),
      roleIds: Array.isArray(x?.roleIds) ? x.roleIds.map(String) : undefined,
    }))
    .filter((o) => o.label && o.value);
}

function normalizeValueArray(v: any) {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => {
      if (typeof x === "string" || typeof x === "number") return String(x);
      return String(x?.value ?? x?.id ?? x?._id ?? "");
    })
    .filter((x) => Boolean(String(x).trim()));
}

function Section({
  title,
  description,
  children,
  icon: Icon,
  noIcon = false,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  noIcon?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        {!noIcon && Icon && (
          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded">
            <Icon className="h-3.5 w-3.5 text-gray-500" />
          </div>
        )}
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          {description && (
            <p className="mt-0.5 text-xs text-gray-500">{description}</p>
          )}
        </div>
      </div>
      <div className={cn("space-y-3", !noIcon && "pl-8")}>{children}</div>
    </div>
  );
}

function ApprovalLevelsEditor({
  control,
  name,
  roleOptions,
  userOptions,
  errors,
  index,
}: any) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-900">
          Approval Levels
        </Label>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-7 rounded-md text-xs"
          onClick={() =>
            append({ order: fields.length + 1, roleIds: [], userIds: [] })
          }
        >
          <Plus className="h-3 w-3 mr-1.5" />
          Add Level
        </Button>
      </div>

      <div className="space-y-2">
        {fields.map((lvl: any, i: number) => {
          const lvlErr =
            errors?.transitions?.[index]?.approvalConfig?.levels?.[i]
              ?.message ||
            errors?.transitions?.[index]?.approvalConfig?.levels?.[i]?.type;

          return (
            <div
              key={lvl.id}
              className="rounded-lg border border-gray-200 bg-white p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-gray-100 text-xs font-medium text-gray-700">
                    {i + 1}
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    Level {i + 1}
                  </span>
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => remove(i)}
                  className="h-6 w-6"
                >
                  <Trash2 className="h-3 w-3 text-gray-400 hover:text-red-500" />
                </Button>
              </div>

              <div className="space-y-2">
                <Controller
                  name={`${name}.${i}.roleIds`}
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={roleOptions}
                      value={normalizeValueArray(field.value)}
                      onChange={(v: any) =>
                        field.onChange(normalizeValueArray(v))
                      }
                      placeholder="Approver roles"
                      // size="sm"
                    />
                  )}
                />

                <Controller
                  name={`${name}.${i}.userIds`}
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={userOptions}
                      value={normalizeValueArray(field.value)}
                      onChange={(v: any) =>
                        field.onChange(normalizeValueArray(v))
                      }
                      placeholder="Specific users"
                      // size="sm"
                    />
                  )}
                />
              </div>

              {lvlErr && (
                <p className="text-xs text-red-500">{String(lvlErr)}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TransitionTypeCard({
  value,
  label,
  description,
  icon: Icon,
  bgColor,
  isSelected,
  onChange,
}: any) {
  return (
    <label
      className={cn(
        "relative flex flex-col cursor-pointer rounded-lg border p-3 transition-all hover:bg-gray-50",
        isSelected
          ? "border-gray-300 bg-gray-50 ring-1 ring-gray-300"
          : "border-gray-200 hover:border-gray-300",
        "flex-1 min-w-0"
      )}
    >
      <input
        type="radio"
        name="transitionType"
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="sr-only"
      />

      <div className="flex items-start gap-2 mb-2">
        <div
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded",
            bgColor
          )}
        >
          <Icon
            className={cn(
              "h-3.5 w-3.5",
              bgColor.includes("blue")
                ? "text-blue-600"
                : bgColor.includes("green")
                ? "text-green-600"
                : bgColor.includes("amber")
                ? "text-amber-600"
                : bgColor.includes("purple")
                ? "text-purple-600"
                : "text-gray-600"
            )}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">{label}</span>
            <span className="text-xs font-medium text-gray-500">{value}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{description}</p>

      <div
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded-full border ml-auto",
          isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
        )}
      >
        {isSelected && (
          <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
        )}
      </div>
    </label>
  );
}

export function TransitionRow({
  index,
  control,
  register,
  setValue,
  remove,
  normalizedStages,
  stages,
  roleList,
  userList,
  errors,
  onDelete,
}: any) {
  const transitionType = useWatch({
    control,
    name: `transitions.${index}.transitionType`,
  });

  const triggerStrategy = useWatch({
    control,
    name: `transitions.${index}.triggerStrategy`,
  });

  const fromStage = useWatch({
    control,
    name: `transitions.${index}.fromStageId`,
  });
  const toStage = useWatch({ control, name: `transitions.${index}.toStageId` });

  const approvalConfig = useWatch({
    control,
    name: `transitions.${index}.approvalConfig`,
  });

  const approvalMode = approvalConfig?.mode;

  const approvalLevels = useWatch({
    control,
    name: `transitions.${index}.approvalConfig.levels`,
  });

  const allowedRoleIdsRaw = useWatch({
    control,
    name: `transitions.${index}.allowedRoleIds`,
  });

  const allowedUserIdsRaw = useWatch({
    control,
    name: `transitions.${index}.allowedUserIds`,
  });

  const requiresApproval = transitionType === "APPROVAL";
  const isAuto = transitionType === "AUTO";

  const showTriggerStrategy =
    transitionType === "NORMAL" || transitionType === "SEND_BACK";

  const showTriggerPermissions =
    showTriggerStrategy && (triggerStrategy ?? "ANY_ALLOWED") === "ANY_ALLOWED";

  const roleOptions = useMemo(() => normalizeOptions(roleList), [roleList]);

  const allowedRoleIds = useMemo(
    () => normalizeValueArray(allowedRoleIdsRaw),
    [allowedRoleIdsRaw]
  );

  const filteredUsersRaw = useMemo(() => {
    const users = normalizeOptions(userList);
    if (!allowedRoleIds.length) return users;

    const hasRoleMeta = users.some((u: any) => Array.isArray(u?.roleIds));
    if (!hasRoleMeta) return users;

    return users.filter((u: any) =>
      (u.roleIds || []).some((rid: string) =>
        allowedRoleIds.includes(String(rid))
      )
    );
  }, [userList, allowedRoleIds]);

  const userOptionsFiltered = useMemo(
    () =>
      filteredUsersRaw.map((u: any) => ({ label: u.label, value: u.value })),
    [filteredUsersRaw]
  );

  const userOptionsAll = useMemo(
    () =>
      normalizeOptions(userList).map((u: any) => ({
        label: u.label,
        value: u.value,
      })),
    [userList]
  );

  useEffect(() => {
    if (transitionType === "APPROVAL") return;

    if (transitionType !== "APPROVAL") {
      setValue(`transitions.${index}.approvalConfig`, undefined, {
        shouldDirty: true,
      });
      setValue(`transitions.${index}.approvalStrategy`, undefined, {
        shouldDirty: true,
      });
    }

    const curStrategy =
      control?._formValues?.transitions?.[index]?.approvalStrategy;
    if (curStrategy !== undefined) {
      setValue(`transitions.${index}.approvalStrategy`, undefined, {
        shouldDirty: true,
      });
    }
  }, [transitionType, index, setValue, approvalConfig, control]);

  useEffect(() => {
    if (!isAuto) {
      const cur = control?._formValues?.transitions?.[index]?.autoTrigger;
      if (cur === true)
        setValue(`transitions.${index}.autoTrigger`, false, {
          shouldDirty: true,
        });
      return;
    }

    if (triggerStrategy !== "SYSTEM_ONLY") {
      setValue(`transitions.${index}.triggerStrategy`, "SYSTEM_ONLY", {
        shouldDirty: true,
      });
    }
    setValue(`transitions.${index}.autoTrigger`, true, { shouldDirty: true });
    setValue(`transitions.${index}.allowedRoleIds`, [], { shouldDirty: true });
    setValue(`transitions.${index}.allowedUserIds`, [], { shouldDirty: true });
  }, [isAuto, triggerStrategy, index, setValue, control]);

  useEffect(() => {
    if (fromStage && toStage && fromStage === toStage) {
      setValue(`transitions.${index}.toStageId`, "", { shouldDirty: true });
    }
  }, [fromStage, toStage, index, setValue]);

  useEffect(() => {
    if (!requiresApproval) return;

    if (triggerStrategy !== "APPROVER_ONLY") {
      setValue(`transitions.${index}.triggerStrategy`, "APPROVER_ONLY", {
        shouldDirty: true,
      });
    }

    if (!approvalConfig) {
      setValue(`transitions.${index}.approvalStrategy`, "ALL", {
        shouldDirty: true,
      });
      setValue(
        `transitions.${index}.approvalConfig`,
        {
          mode: "PARALLEL",
          levels: [{ order: 1, roleIds: [], userIds: [] }],
        },
        { shouldDirty: true }
      );
      return;
    }

    const levels = approvalConfig?.levels;
    if (!Array.isArray(levels) || levels.length === 0) {
      setValue(
        `transitions.${index}.approvalConfig.levels`,
        [{ order: 1, roleIds: [], userIds: [] }],
        { shouldDirty: true }
      );
    }

    if (!approvalConfig?.mode) {
      setValue(`transitions.${index}.approvalConfig.mode`, "PARALLEL", {
        shouldDirty: true,
      });
    }
  }, [requiresApproval, triggerStrategy, approvalConfig, index, setValue]);

  useEffect(() => {
    if (!showTriggerStrategy) return;

    if (
      triggerStrategy === "APPROVER_ONLY" ||
      triggerStrategy === "SYSTEM_ONLY"
    ) {
      setValue(`transitions.${index}.triggerStrategy`, "ANY_ALLOWED", {
        shouldDirty: true,
      });
    }

    if (!Array.isArray(allowedRoleIdsRaw)) {
      setValue(`transitions.${index}.allowedRoleIds`, [], {
        shouldDirty: true,
      });
    }
    if (!Array.isArray(allowedUserIdsRaw)) {
      setValue(`transitions.${index}.allowedUserIds`, [], {
        shouldDirty: true,
      });
    }
  }, [
    showTriggerStrategy,
    triggerStrategy,
    index,
    setValue,
    allowedRoleIdsRaw,
    allowedUserIdsRaw,
  ]);

  useEffect(() => {
    if (!requiresApproval) return;
    const levels = Array.isArray(approvalLevels) ? approvalLevels : [];

    if (levels.length === 0) {
      setValue(
        `transitions.${index}.approvalConfig.levels`,
        [{ order: 1, roleIds: [], userIds: [] }],
        { shouldDirty: true }
      );
      return;
    }

    const normalized = levels.map((lvl: any, i: number) => ({
      order: typeof lvl?.order === "number" ? lvl.order : i + 1,
      roleIds: Array.isArray(lvl?.roleIds) ? lvl.roleIds : [],
      userIds: Array.isArray(lvl?.userIds) ? lvl.userIds : [],
    }));

    const changed = levels.some((lvl: any, i: number) => {
      const n = normalized[i];
      return (
        lvl?.order !== n.order ||
        !Array.isArray(lvl?.roleIds) ||
        !Array.isArray(lvl?.userIds)
      );
    });

    if (changed) {
      setValue(`transitions.${index}.approvalConfig.levels`, normalized, {
        shouldDirty: true,
      });
    }
  }, [requiresApproval, approvalLevels, index, setValue]);

  useEffect(() => {
    if (transitionType === "REVIEW" && fromStage) {
      setValue(`transitions.${index}.toStageId`, fromStage, {
        shouldDirty: true,
      });
    }
  }, [transitionType, fromStage, index, setValue]);

  useEffect(() => {
    if (transitionType !== "SEND_BACK") return;
    if (!fromStage || !toStage) return;

    const fromIndex = normalizedStages.findIndex(
      (s: any) => String(s.id) === String(fromStage)
    );
    const toIndex = normalizedStages.findIndex(
      (s: any) => String(s.id) === String(toStage)
    );

    // SEND_BACK must go to an earlier stage
    if (toIndex >= fromIndex) {
      setValue(`transitions.${index}.toStageId`, "", { shouldDirty: true });
    }
  }, [transitionType, fromStage, toStage, index, setValue, normalizedStages]);

  useEffect(() => {
    if (!allowedRoleIds.length) return;

    const selected = normalizeValueArray(allowedUserIdsRaw);
    if (!selected.length) return;

    const allowedSet = new Set(userOptionsFiltered.map((u: any) => u.value));
    const cleaned = selected.filter((id) => allowedSet.has(String(id)));

    if (cleaned.length !== selected.length) {
      setValue(`transitions.${index}.allowedUserIds`, cleaned, {
        shouldDirty: true,
      });
    }
  }, [allowedRoleIds, allowedUserIdsRaw, userOptionsFiltered, index, setValue]);

  const labelError =
    errors?.transitions?.[index]?.label?.message ||
    errors?.transitions?.[index]?.label?.type;

  const triggerOptions = useMemo(() => {
    if (transitionType === "APPROVAL")
      return TRIGGER_STRATEGIES.filter((x) => x.value === "APPROVER_ONLY");
    if (transitionType === "AUTO")
      return TRIGGER_STRATEGIES.filter((x) => x.value === "SYSTEM_ONLY");
    if (showTriggerStrategy) {
      return TRIGGER_STRATEGIES.filter(
        (x) =>
          x.value === "ANY_ALLOWED" ||
          x.value === "CREATOR_ONLY" ||
          x.value === "ASSIGNEE_ONLY"
      );
    }
    return TRIGGER_STRATEGIES.filter((x) => x.value === "ANY_ALLOWED");
  }, [transitionType, showTriggerStrategy]);

  const getTypeColor = (type: string) => {
    const found = TRANSITION_TYPES.find((t) => t.value === type);
    return found ? found.color : "text-gray-600 bg-gray-50 border-gray-200";
  };

  const handleTransitionTypeChange = (value: string) => {
    setValue(`transitions.${index}.transitionType`, value, {
      shouldDirty: true,
    });
  };

  // Group transition types into rows of 2
  const transitionTypeRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < TRANSITION_TYPES.length; i += 2) {
      rows.push(TRANSITION_TYPES.slice(i, i + 2));
    }
    return rows;
  }, []);

  useTransitionRules({
    index,
    transitionType,
    triggerStrategy,
    fromStageId: fromStage,
    toStageId: toStage,
    approvalConfig,
    normalizedStages,
    setValue,
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-900">
              Transition
            </h3>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getTypeColor(
                transitionType
              )}`}
            >
              {transitionType || "NORMAL"}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Configure rules and permissions
          </p>
        </div>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => {
            if (typeof onDelete === "function") return onDelete();
            return remove(index);
          }}
          className="h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-red-50"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="space-y-5">
        {/* Basic Info */}
        <Section
          title="Basic Information"
          description="Configure the transition details"
          icon={Settings}
        >
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-700">
                Action Label *
              </Label>
              <Input
                placeholder="Submit for approval, Review, etc."
                aria-invalid={!!labelError}
                className={cn(
                  "rounded-md text-sm h-9",
                  !!labelError
                    ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                    : "border-gray-300"
                )}
                {...register(`transitions.${index}.label`, {
                  required: "Action label is required",
                  validate: (v: any) =>
                    String(v ?? "").trim().length > 0 ||
                    "Action label is required",
                })}
              />
              {labelError && (
                <p className="text-xs text-red-500">{String(labelError)}</p>
              )}
            </div>
          </div>
        </Section>

        {/* Flow */}
        <Section
          title="Flow"
          description="Define the stage transition"
          icon={ArrowRightCircle}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <Controller
                name={`transitions.${index}.fromStageId`}
                control={control}
                render={({ field }) => (
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-700">
                      From
                    </Label>
                    <Select
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="rounded-md h-9 text-sm">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        {normalizedStages
                          .filter((s: any) => {
                            const stage = stages?.find(
                              (st: any) => String(st.tempId) === String(s.id)
                            );

                            // allow all non-final stages
                            if (!stage?.isFinal) return true;

                            // allow final stage ONLY for SEND_BACK
                            return transitionType === "SEND_BACK";
                          })
                          .map((s: any) => (
                            <SelectItem key={s.id} value={String(s.id)}>
                              {s.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              <div className="pt-6">
                <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              </div>

              <Controller
                name={`transitions.${index}.toStageId`}
                control={control}
                render={({ field }) => (
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-700">
                      To
                    </Label>
                    <Select
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="rounded-md h-9 text-sm">
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      {/* <SelectContent>
                        {normalizedStages.map((s: any) => (
                          <SelectItem key={s.id} value={String(s.id)}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent> */}
                      <SelectContent>
                        {filterDestinationStages({
                          stages: normalizedStages,
                          fromStageId: fromStage,
                          transitionType,
                        }).map((s) => (
                          <SelectItem key={s.id} value={String(s.id)}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>
          </div>
        </Section>

        {/* Transition Type - Horizontal Grid with 2 per row */}
        <Section
          title="Transition Type"
          description="Choose the type of transition"
          icon={Settings}
        >
          <div className="space-y-2">
            {transitionTypeRows.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-2 gap-2">
                {row.map((type) => (
                  <TransitionTypeCard
                    key={type.value}
                    value={type.value}
                    label={type.label}
                    description={type.description}
                    icon={type.icon}
                    bgColor={type.bgColor}
                    isSelected={transitionType === type.value}
                    onChange={handleTransitionTypeChange}
                  />
                ))}
              </div>
            ))}
          </div>
        </Section>

        {/* Who can trigger */}
        {showTriggerStrategy && (
          <>
            <Section
              title="Trigger Permissions"
              description="Control who can initiate this transition"
              icon={Users}
            >
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-700">
                    Trigger Strategy
                  </Label>
                  <Controller
                    name={`transitions.${index}.triggerStrategy`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value ?? "ANY_ALLOWED"}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="rounded-md h-9 text-sm">
                          <SelectValue placeholder="Select strategy" />
                        </SelectTrigger>
                        <SelectContent>
                          {triggerOptions.map((strategy) => (
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
              </div>
            </Section>

            {showTriggerPermissions && (
              <Section
                title="Allowed Users"
                description="Restrict to specific roles and users"
                icon={User}
              >
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-700">
                      Allowed Roles
                    </Label>
                    <Controller
                      name={`transitions.${index}.allowedRoleIds`}
                      control={control}
                      render={({ field }) => (
                        <MultiSelect
                          options={roleOptions}
                          value={normalizeValueArray(field.value)}
                          onChange={(v: any) =>
                            field.onChange(normalizeValueArray(v))
                          }
                          placeholder="Select allowed roles"
                          // size="sm"
                        />
                      )}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-700">
                      Allowed Users
                    </Label>
                    <Controller
                      name={`transitions.${index}.allowedUserIds`}
                      control={control}
                      render={({ field }) => (
                        <MultiSelect
                          options={userOptionsFiltered}
                          value={normalizeValueArray(field.value)}
                          onChange={(v: any) =>
                            field.onChange(normalizeValueArray(v))
                          }
                          placeholder={
                            allowedRoleIds.length
                              ? userOptionsFiltered.length
                                ? "Select specific users (filtered by roles)"
                                : "No users for selected roles"
                              : "Select specific users"
                          }
                          // size="sm"
                          className={cn(
                            allowedRoleIds.length &&
                              userOptionsFiltered.length === 0
                              ? "border-red-300"
                              : ""
                          )}
                        />
                      )}
                    />
                    {allowedRoleIds.length &&
                      userOptionsFiltered.length === 0 && (
                        <p className="text-xs text-red-500">
                          No users found for the selected roles
                        </p>
                      )}
                  </div>
                </div>
              </Section>
            )}
          </>
        )}

        {/* Approval Configuration */}
        {requiresApproval && approvalConfig && (
          <Section
            title="Approval Configuration"
            description="Set up approval workflow rules"
            icon={Shield}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-700">
                    Approval Strategy
                  </Label>
                  <Controller
                    name={`transitions.${index}.approvalStrategy`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value ?? "ALL"}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="rounded-md h-9 text-sm">
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
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-700">
                    Mode
                  </Label>
                  <Controller
                    name={`transitions.${index}.approvalConfig.mode`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value ?? "PARALLEL"}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="rounded-md h-9 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PARALLEL">Parallel</SelectItem>
                          <SelectItem value="SEQUENTIAL">Sequential</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <ApprovalLevelsEditor
                control={control}
                name={`transitions.${index}.approvalConfig.levels`}
                roleOptions={roleOptions}
                userOptions={userOptionsAll}
                errors={errors}
                index={index}
              />
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}
