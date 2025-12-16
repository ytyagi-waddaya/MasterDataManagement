// "use client";

// import { Controller } from "react-hook-form";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
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

// export function StagesStep({ form, stageArray }: any) {
//   const { register, control } = form;
//   const category = form.watch(`stages.${index}.category`);

// useEffect(() => {
//   if (!category) return;

//   // Auto-set initial stage
//   if (category === "DRAFT") {
//     form.setValue(`stages.${index}.isInitial`, true);
//   }

//   // Auto-set final stage
//   if (category === "COMPLETED") {
//     form.setValue(`stages.${index}.isFinal`, true);
//   }

// }, [category]);

//   return (
//     <Card className="p-6 space-y-2">
//       <div className="flex justify-between">
//         <div>
//           <h2 className="text-slate-900 mb-1">Workflow Stages</h2>
//           <p className="text-slate-600">Define the stages of your workflow</p>
//         </div>

//         <Button
//           type="button"
//           onClick={() =>
//             stageArray.append({
//               name: "",
//               isInitial: false,
//               isFinal: false,
//               order: stageArray.fields.length,
//             })
//           }
//         >
//           <Plus className="w-4 h-4 mr-2" /> Add Stage
//         </Button>
//       </div>

//       <div className="border rounded-lg overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-slate-50">
//               <TableHead>Stage Name</TableHead>
//               <TableHead className="text-center">Initial</TableHead>
//               <TableHead className="text-center">Final</TableHead>
//               <TableHead className="text-center">Order</TableHead>
//               <TableHead className="text-center">Category</TableHead>
//               <TableHead></TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {stageArray.fields.map((field: any, index: number) => (
//               <TableRow key={field.id}>
//                 <TableCell>
//                   <Input
//                     placeholder="Stage name"
//                     {...register(`stages.${index}.name`, { required: true })}
//                   />
//                 </TableCell>

//                 <TableCell className="text-center">
//                   <Controller
//                     name={`stages.${index}.isInitial`}
//                     control={control}
//                     render={({ field }) => (
//                       <Checkbox
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                       />
//                     )}
//                   />
//                 </TableCell>

//                 <TableCell className="text-center">
//                   <Controller
//                     name={`stages.${index}.isFinal`}
//                     control={control}
//                     render={({ field }) => (
//                       <Checkbox
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                       />
//                     )}
//                   />
//                 </TableCell>

//                 <TableCell className="text-center">
//                   <Input
//                     type="number"
//                     className="w-16 text-center"
//                     {...register(`stages.${index}.order`, {
//                       valueAsNumber: true,
//                       required: true,
//                     })}
//                   />
//                 </TableCell>
//                 <TableCell className="text-center">
//                   <Controller
//                     name={`stages.${index}.category`}
//                     control={control}
//                     defaultValue="NORMAL"
//                     render={({ field }) => (
//                       <Select
//                         onValueChange={field.onChange}
//                         value={field.value}
//                       >
//                         <SelectTrigger className="w-32">
//                           <SelectValue placeholder="Category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="DRAFT">Draft</SelectItem>
//                           <SelectItem value="NORMAL">Normal</SelectItem>
//                           <SelectItem value="SUBMITTED">Submitted</SelectItem>
//                           <SelectItem value="ON_HOLD">Hold</SelectItem>
//                           <SelectItem value="REJECTED">Rejected</SelectItem>
//                           <SelectItem value="COMPLETED">Completed</SelectItem>
//                           <SelectItem value="UNDER_REVIEW">Review</SelectItem>
//                           <SelectItem value="CORRECTION">Correction</SelectItem>
//                           <SelectItem value="APPROVAL">Approval</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 </TableCell>

//                 <TableCell>
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     className="hover:text-red-600"
//                     disabled={stageArray.fields.length === 1}
//                     onClick={() => stageArray.remove(index)}
//                   >
//                     <Trash2 className="h-4 w-4" />
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

"use client";

import { Controller } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Trash2, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

export function StagesStep({ form, stageArray }: any) {
  const { register, control } = form;

  // ✅ FIX: Watch ALL categories at once
  const categories = form.watch("stages");

  // ✅ FIX: Single effect updates auto-initial/final
  useEffect(() => {
    if (!categories) return;

    categories.forEach((stage: any, index: number) => {
      if (stage?.category === "DRAFT") {
        form.setValue(`stages.${index}.isInitial`, true);
      }
      if (stage?.category === "COMPLETED") {
        form.setValue(`stages.${index}.isFinal`, true);
      }
    });
  }, [categories]);

  return (
    <Card className="p-6 space-y-2">
      <div className="flex justify-between">
        <div>
          <h2 className="text-slate-900 mb-1">Workflow Stages</h2>
          <p className="text-slate-600">Define the stages of your workflow</p>
        </div>

        <Button
          type="button"
          onClick={() =>
            stageArray.append({
              name: "",
              isInitial: false,
              isFinal: false,
              category: "NORMAL",
              order: stageArray.fields.length,
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" /> Add Stage
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>Stage Name</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Initial</TableHead>
              <TableHead className="text-center">Final</TableHead>
              <TableHead className="text-center">Order</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {stageArray.fields.map((field: any, index: number) => {
              const category = categories?.[index]?.category;

              return (
                <TableRow key={field.id}>
                  <TableCell>
                    <Input
                      placeholder="Stage name"
                      {...register(`stages.${index}.name`, { required: true })}
                    />
                  </TableCell>

                  <TableCell className="text-center">
                    <Controller
                      name={`stages.${index}.category`}
                      control={control}
                      defaultValue="NORMAL"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                            <SelectItem value="NORMAL">Normal</SelectItem>
                            <SelectItem value="SUBMITTED">Submitted</SelectItem>
                            <SelectItem value="ON_HOLD">Hold</SelectItem>
                            <SelectItem value="REJECTED">Rejected</SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                            <SelectItem value="UNDER_REVIEW">Review</SelectItem>
                            <SelectItem value="CORRECTION">
                              Correction
                            </SelectItem>
                            <SelectItem value="APPROVAL">Approval</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </TableCell>

                  <TableCell className="text-center">
                    <Controller
                      name={`stages.${index}.isInitial`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          disabled={category === "DRAFT"}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </TableCell>

                  <TableCell className="text-center">
                    <Controller
                      name={`stages.${index}.isFinal`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          disabled={category === "COMPLETED"}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </TableCell>

                  <TableCell className="text-center">
                    <Input
                      type="number"
                      className="w-16 text-center"
                      {...register(`stages.${index}.order`, {
                        valueAsNumber: true,
                        required: true,
                      })}
                    />
                  </TableCell>

                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="hover:text-red-600"
                      disabled={stageArray.fields.length === 1}
                      onClick={() => stageArray.remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
