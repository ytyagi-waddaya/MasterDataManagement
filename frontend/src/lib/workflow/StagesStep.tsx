// "use client";

// import { Controller, useWatch } from "react-hook-form";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { Trash2, Plus } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useEffect } from "react";

// /* ---------------------------------------------
//    CATEGORY LABELS (UX POLISH)
// ---------------------------------------------- */
// const CATEGORY_LABELS: Record<string, string> = {
//   DRAFT: "Draft",
//   NORMAL: "Normal",
//   SUBMITTED: "Submitted",
//   UNDER_REVIEW: "Under Review",
//   APPROVAL: "Approval",
//   CORRECTION: "Correction",
//   ON_HOLD: "On Hold",
//   REJECTED: "Rejected",
//   COMPLETED: "Completed",
// };

// const CATEGORIES = Object.keys(CATEGORY_LABELS);

// /* ======================================================
//    STAGES STEP
// ====================================================== */

// export function StagesStep({ form, stageArray }: any) {
//   const { register, control, setValue } = form;

//   /* ✅ Correct RHF subscription */
//   const stages = useWatch({
//     control,
//     name: "stages",
//   });

//   /* --------------------------------------------------
//      AUTO-ENFORCE INITIAL / FINAL RULES (SAFE)
//   -------------------------------------------------- */
//   useEffect(() => {
//     if (!stages?.length) return;

//     // Only the first DRAFT becomes initial
//     const draftIndex = stages.findIndex(
//       (s: any) => s.category === "DRAFT"
//     );

//     stages.forEach((stage: any, index: number) => {
//       const shouldBeInitial =
//         stage.category === "DRAFT" && index === draftIndex;

//       const shouldBeFinal =
//         stage.category === "COMPLETED";

//       if (stage.isInitial !== shouldBeInitial) {
//         setValue(`stages.${index}.isInitial`, shouldBeInitial, {
//           shouldDirty: true,
//         });
//       }

//       if (stage.isFinal !== shouldBeFinal) {
//         setValue(`stages.${index}.isFinal`, shouldBeFinal, {
//           shouldDirty: true,
//         });
//       }
//     });
//   }, [stages, setValue]);

//   return (
//     <Card className="p-6 space-y-3">
//       {/* Header */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h2 className="text-lg font-semibold text-slate-900">
//             Workflow Stages
//           </h2>
//           <p className="text-sm text-muted-foreground">
//             Define the stages of your workflow.
//             Initial and Final stages are auto-managed based on category.
//           </p>
//         </div>

//         <Button
//           type="button"
//           onClick={() =>
//             stageArray.append({
//               tempId: crypto.randomUUID(),
//               name: "",
//               category: "NORMAL",
//               isInitial: false,
//               isFinal: false,
//               order: stageArray.fields.length,
//               allowedNextCategories: [],
//             })
//           }
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add Stage
//         </Button>
//       </div>

//       {/* Table */}
//       <div className="border rounded-lg overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-slate-50">
//               <TableHead>Stage Name</TableHead>
//               <TableHead className="text-center">Category</TableHead>
//               <TableHead className="text-center">Initial</TableHead>
//               <TableHead className="text-center">Final</TableHead>
//               <TableHead className="text-center">Order</TableHead>
//               <TableHead />
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {stageArray.fields.map((field: any, index: number) => (
//               <TableRow key={field.id}>
//                 {/* Stage Name */}
//                 <TableCell>
//                   <Input
//                     placeholder="Stage name"
//                     {...register(`stages.${index}.name`, {
//                       required: true,
//                     })}
//                   />
//                 </TableCell>

//                 {/* Category */}
//                 <TableCell className="text-center">
//                   <Controller
//                     name={`stages.${index}.category`}
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         value={field.value}
//                         onValueChange={field.onChange}
//                       >
//                         <SelectTrigger className="w-40 mx-auto">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {CATEGORIES.map((c) => (
//                             <SelectItem key={c} value={c}>
//                               {CATEGORY_LABELS[c]}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 </TableCell>

//                 {/* Initial */}
//                 <TableCell className="text-center">
//                   <Controller
//                     name={`stages.${index}.isInitial`}
//                     control={control}
//                     render={({ field }) => (
//                       <Checkbox checked={field.value} disabled />
//                     )}
//                   />
//                 </TableCell>

//                 {/* Final */}
//                 <TableCell className="text-center">
//                   <Controller
//                     name={`stages.${index}.isFinal`}
//                     control={control}
//                     render={({ field }) => (
//                       <Checkbox checked={field.value} disabled />
//                     )}
//                   />
//                 </TableCell>

//                 {/* Order (derived) */}
//                 <TableCell className="text-center">
//                   <Input
//                     type="number"
//                     value={index}
//                     disabled
//                     className="w-16 text-center bg-slate-100"
//                   />
//                 </TableCell>

//                 {/* Actions */}
//                 <TableCell className="text-right">
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     disabled={stageArray.fields.length === 1}
//                     onClick={() => stageArray.remove(index)}
//                   >
//                     <Trash2 className="h-4 w-4 text-red-500" />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </Card>
//   );
// }

// "use client";

// import { Controller, useWatch } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Trash2, Plus, Hash } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useEffect } from "react";

// const CATEGORY_LABELS: Record<string, string> = {
//   DRAFT: "Draft",
//   NORMAL: "Normal",
//   SUBMITTED: "Submitted",
//   UNDER_REVIEW: "Under Review",
//   APPROVAL: "Approval",
//   CORRECTION: "Correction",
//   ON_HOLD: "On Hold",
//   REJECTED: "Rejected",
//   COMPLETED: "Completed",
// };

// const CATEGORY_OPTIONS = Object.keys(CATEGORY_LABELS).map((k) => ({
//   value: k,
//   label: CATEGORY_LABELS[k],
// }));

// const CATEGORIES = Object.keys(CATEGORY_LABELS);

// export function StagesStep({ form, stageArray }: any) {
//   const { register, control, setValue } = form;
//   const stages = useWatch({ control, name: "stages" });

//   useEffect(() => {
//     if (!stages?.length) return;
//     const draftIndex = stages.findIndex((s: any) => s.category === "DRAFT");

//     stages.forEach((stage: any, index: number) => {
//       const shouldBeInitial =
//         stage.category === "DRAFT" && index === draftIndex;
//       const shouldBeFinal = stage.category === "COMPLETED";

//       if (stage.isInitial !== shouldBeInitial) {
//         setValue(`stages.${index}.isInitial`, shouldBeInitial, {
//           shouldDirty: true,
//         });
//       }
//       if (stage.isFinal !== shouldBeFinal) {
//         setValue(`stages.${index}.isFinal`, shouldBeFinal, {
//           shouldDirty: true,
//         });
//       }
//     });
//   }, [stages, setValue]);

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="text-sm font-medium text-gray-900">
//             Stages ({stageArray.fields.length})
//           </h3>
//           <p className="text-xs text-gray-500">
//             Define workflow stages in order
//           </p>
//         </div>
//         <Button
//           type="button"
//           size="sm"
//           variant="outline"
//           onClick={() =>
//             stageArray.append({
//               tempId: crypto.randomUUID(),
//               name: "",
//               category: "NORMAL",
//               isInitial: false,
//               isFinal: false,
//               order: stageArray.fields.length,
//               allowedNextCategories: [],
//             })
//           }
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Add
//         </Button>
//       </div>

//       <div className="space-y-2">
//         {stageArray.fields.map((field: any, index: number) => {
//           const isInitial = stages?.[index]?.isInitial;
//           const isFinal = stages?.[index]?.isFinal;

//           return (
//             <div
//               key={field.id}
//               className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg"
//             >
//               <div className="shrink-0 h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
//                 <span className="text-sm font-medium text-gray-700">
//                   {index + 1}
//                 </span>
//               </div>

//               <div className="flex-1">
//                 <Input
//                   placeholder="Stage name"
//                   {...register(`stages.${index}.name`, { required: true })}
//                   className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
//                 />
//               </div>

//               <Controller
//                 name={`stages.${index}.category`}
//                 control={control}
//                 render={({ field }) => (
//                   <Select value={field.value} onValueChange={field.onChange}>
//                     <SelectTrigger className="w-32 border-0 bg-transparent px-0">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {CATEGORIES.map((c) => (
//                         <SelectItem key={c} value={c}>
//                           {CATEGORY_LABELS[c]}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 )}
//               />

//               {/* Allowed Next Categories */}
//               <Controller
//                 name={`stages.${index}.allowedNextCategories`}
//                 control={control}
//                 render={({ field }) => (
//                   <div className="flex-1 min-w-[220px]">
//                     <Select
//                       value={""} // dummy value – we manage via checkboxes
//                       onValueChange={() => {}}
//                     >
//                       <SelectTrigger className="border-0 bg-transparent px-0">
//                         <SelectValue placeholder="Next categories" />
//                       </SelectTrigger>

//                       <SelectContent>
//                         {CATEGORY_OPTIONS.map((opt) => {
//                           const checked = field.value?.includes(opt.value);

//                           return (
//                             <div
//                               key={opt.value}
//                               className="flex items-center gap-2 px-2 py-1.5 cursor-pointer"
//                               onClick={() => {
//                                 const current = field.value ?? [];
//                                 field.onChange(
//                                   checked
//                                     ? current.filter(
//                                         (v: string) => v !== opt.value
//                                       )
//                                     : [...current, opt.value]
//                                 );
//                               }}
//                             >
//                               <Checkbox checked={checked} />
//                               <span className="text-sm">{opt.label}</span>
//                             </div>
//                           );
//                         })}
//                       </SelectContent>
//                     </Select>

//                     <p className="text-[11px] text-gray-400 mt-1">
//                       Leave empty to allow all categories
//                     </p>
//                   </div>
//                 )}
//               />

//               <div className="flex items-center gap-2">
//                 {isInitial && (
//                   <Badge className="text-xs bg-green-100 text-green-700">
//                     Initial
//                   </Badge>
//                 )}
//                 {isFinal && (
//                   <Badge className="text-xs bg-blue-100 text-blue-700">
//                     Final
//                   </Badge>
//                 )}
//               </div>

//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="sm"
//                 disabled={stageArray.fields.length === 1}
//                 onClick={() => stageArray.remove(index)}
//                 className="h-8 w-8 p-0 text-gray-400"
//               >
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


"use client";

import { Controller, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  Plus,
  Hash,
  Circle,
  CheckCircle,
  ArrowRight,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const CATEGORY_LABELS: Record<string, string> = {
  DRAFT: "Draft",
  NORMAL: "Normal",
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  APPROVAL: "Approval",
  CORRECTION: "Correction",
  ON_HOLD: "On Hold",
  REJECTED: "Rejected",
  COMPLETED: "Completed",
};

const CATEGORY_OPTIONS = Object.keys(CATEGORY_LABELS).map((k) => ({
  value: k,
  label: CATEGORY_LABELS[k],
}));

const CATEGORIES = Object.keys(CATEGORY_LABELS);

export function StagesStep({ form, stageArray }: any) {
  const { register, control, setValue } = form;
  const stages = useWatch({ control, name: "stages" });

  useEffect(() => {
    if (!stages?.length) return;
    const draftIndex = stages.findIndex((s: any) => s.category === "DRAFT");

    stages.forEach((stage: any, index: number) => {
      const shouldBeInitial =
        stage.category === "DRAFT" && index === draftIndex;
      const shouldBeFinal =
        stage.category === "COMPLETED" ;

      if (stage.isInitial !== shouldBeInitial) {
        setValue(`stages.${index}.isInitial`, shouldBeInitial, {
          shouldDirty: true,
        });
      }
      if (stage.isFinal !== shouldBeFinal) {
        setValue(`stages.${index}.isFinal`, shouldBeFinal, {
          shouldDirty: true,
        });
      }
    });
  }, [stages, setValue]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Stages</h3>
          <p className="text-xs text-gray-500">
            Define the sequence of stages in your workflow
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-gray-50">
            {stageArray.fields.length} stages
          </Badge>
          <Button
            type="button"
            size="sm"
            onClick={() =>
              stageArray.append({
                tempId: crypto.randomUUID(),
                name: "",
                category: "NORMAL",
                isInitial: false,
                isFinal: false,
                order: stageArray.fields.length,
                allowedNextCategories: [],
              })
            }
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Stage
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span>Initial (first Draft stage)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span>Final (Completed category)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="h-3 w-3" />
          <span>Restrict next categories</span>
        </div>
      </div>

      {/* Stages List */}
      <div className="space-y-2">
        {stageArray.fields.map((field: any, index: number) => {
          const isInitial = stages?.[index]?.isInitial;
          const isFinal = stages?.[index]?.isFinal;
          const allowedNextCategories =
            stages?.[index]?.allowedNextCategories || [];

          return (
            <div
              key={field.id}
              className="group relative p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              {/* Stage Number */}
              <div className="absolute left-4 top-4 flex items-center">
                <div className="h-6 w-6 rounded bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <span className="text-xs font-medium text-gray-700">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="pl-10 space-y-4">
                {/* Name and Category */}
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter stage name"
                      {...register(`stages.${index}.name`, { required: true })}
                      className="border-0 px-0 text-sm font-medium shadow-none focus-visible:ring-0"
                    />
                  </div>

                  <div className="w-40">
                    <Controller
                      name={`stages.${index}.category`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="border-gray-300 text-sm">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((c) => (
                              <SelectItem key={c} value={c}>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`h-2 w-2 rounded-full ${
                                      c === "DRAFT"
                                        ? "bg-green-500"
                                        : c === "COMPLETED"
                                        ? "bg-blue-500"
                                        : "bg-gray-300"
                                    }`}
                                  />

                                  {CATEGORY_LABELS[c]}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* Delete Button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={stageArray.fields.length === 1}
                    onClick={() => stageArray.remove(index)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Type Badges */}
                <div className="flex items-center gap-2">
                  {isInitial && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-green-50 text-green-700 border-green-200"
                    >
                      <Circle className="h-3 w-3 mr-1 fill-green-600" />
                      Initial Stage
                    </Badge>
                  )}
                  {isFinal && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Final Stage
                    </Badge>
                  )}
                </div>

                {/* Allowed Next Categories */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0">
                      <Filter className="h-4 w-4 text-gray-400 mt-1" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-700 mb-2">
                        Restrict next stages to specific categories
                      </div>

                      <Controller
                        name={`stages.${index}.allowedNextCategories`}
                        control={control}
                        render={({ field }) => (
                          <div className="flex flex-wrap gap-2">
                            {CATEGORY_OPTIONS.map((opt) => {
                              const checked = field.value?.includes(opt.value);
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => {
                                    const current = field.value ?? [];
                                    field.onChange(
                                      checked
                                        ? current.filter(
                                            (v: string) => v !== opt.value
                                          )
                                        : [...current, opt.value]
                                    );
                                  }}
                                  className={`
                                    px-3 py-1.5 rounded-full border text-xs transition-all
                                    ${
                                      checked
                                        ? "bg-gray-900 text-white border-gray-900"
                                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                                    }
                                  `}
                                >
                                  {opt.label}
                                </button>
                              );
                            })}

                            {/* Clear Selection */}
                            {(field.value?.length || 0) > 0 && (
                              <button
                                type="button"
                                onClick={() => field.onChange([])}
                                className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:text-gray-900 hover:border-gray-300 bg-white"
                              >
                                Clear all
                              </button>
                            )}
                          </div>
                        )}
                      />

                      <p className="text-xs text-gray-500 mt-2">
                        {allowedNextCategories.length === 0
                          ? "No restrictions – all categories are allowed"
                          : `Only ${allowedNextCategories.length} categor${
                              allowedNextCategories.length === 1 ? "y" : "ies"
                            } allowed`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {stageArray.fields.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <Hash className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            No stages added
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Add stages to build your workflow sequence
          </p>
          <Button
            type="button"
            size="sm"
            onClick={() =>
              stageArray.append({
                tempId: crypto.randomUUID(),
                name: "",
                category: "NORMAL",
                isInitial: false,
                isFinal: false,
                order: 0,
                allowedNextCategories: [],
              })
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Stage
          </Button>
        </div>
      )}

      {/* Validation Note */}
      {stageArray.fields.length > 0 && stageArray.fields.length < 2 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-xs font-medium text-amber-600">!</span>
            </div>
            <div className="text-xs text-amber-700">
              At least <span className="font-semibold">2 stages</span> are
              required to create transitions
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
