"use client";

import { Controller, useWatch } from "react-hook-form";
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


/* ---------------------------------------------
   CATEGORY LABELS (UX POLISH)
---------------------------------------------- */
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

const CATEGORIES = Object.keys(CATEGORY_LABELS);

/* ======================================================
   STAGES STEP
====================================================== */

export function StagesStep({ form, stageArray }: any) {
  const { register, control, setValue } = form;

  /* ✅ Correct RHF subscription */
  const stages = useWatch({
    control,
    name: "stages",
  });

  /* --------------------------------------------------
     AUTO-ENFORCE INITIAL / FINAL RULES (SAFE)
  -------------------------------------------------- */
  useEffect(() => {
    if (!stages?.length) return;

    // Only the first DRAFT becomes initial
    const draftIndex = stages.findIndex(
      (s: any) => s.category === "DRAFT"
    );

    stages.forEach((stage: any, index: number) => {
      const shouldBeInitial =
        stage.category === "DRAFT" && index === draftIndex;

      const shouldBeFinal =
        stage.category === "COMPLETED";

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
    <Card className="p-6 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Workflow Stages
          </h2>
          <p className="text-sm text-muted-foreground">
            Define the stages of your workflow.
            Initial and Final stages are auto-managed based on category.
          </p>
        </div>

        <Button
          type="button"
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
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Stage
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>Stage Name</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Initial</TableHead>
              <TableHead className="text-center">Final</TableHead>
              <TableHead className="text-center">Order</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {stageArray.fields.map((field: any, index: number) => (
              <TableRow key={field.id}>
                {/* Stage Name */}
                <TableCell>
                  <Input
                    placeholder="Stage name"
                    {...register(`stages.${index}.name`, {
                      required: true,
                    })}
                  />
                </TableCell>

                {/* Category */}
                <TableCell className="text-center">
                  <Controller
                    name={`stages.${index}.category`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-40 mx-auto">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>
                              {CATEGORY_LABELS[c]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </TableCell>

                {/* Initial */}
                <TableCell className="text-center">
                  <Controller
                    name={`stages.${index}.isInitial`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox checked={field.value} disabled />
                    )}
                  />
                </TableCell>

                {/* Final */}
                <TableCell className="text-center">
                  <Controller
                    name={`stages.${index}.isFinal`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox checked={field.value} disabled />
                    )}
                  />
                </TableCell>

                {/* Order (derived) */}
                <TableCell className="text-center">
                  <Input
                    type="number"
                    value={index}
                    disabled
                    className="w-16 text-center bg-slate-100"
                  />
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={stageArray.fields.length === 1}
                    onClick={() => stageArray.remove(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

