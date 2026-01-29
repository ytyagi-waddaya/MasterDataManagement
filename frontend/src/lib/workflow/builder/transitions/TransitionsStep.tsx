"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useWatch } from "react-hook-form";
import { makeId } from "@/utils/id";



export function TransitionsStep({
  form,
  transitionArray,
  stages,
  onEdit,      // (index:number)=>void
  activeIndex, // current open editor index (optional)
}: any) {
  const transitions = useWatch({ control: form.control, name: "transitions" }) || [];

  const stageMap = new Map(
    (stages || [])
      .filter((s: any) => s?.tempId)
      .map((s: any) => [String(s.tempId), String(s.name ?? "")])
  );

  const handleDelete = (index: number) => {
    const prevLen = transitions.length;
    transitionArray.remove(index);

    setTimeout(() => {
      if (typeof onEdit !== "function") return;

      const current = (form.getValues("transitions") as any[]) || [];
      const newLen = current.length;

      if (newLen <= 0) {
        onEdit(-1);
        return;
      }

      if (typeof activeIndex !== "number") return;

      // if deleted was open -> open nearest
      if (activeIndex === index) {
        onEdit(Math.min(index, newLen - 1));
        return;
      }

      // if open after deleted -> shift left
      if (activeIndex > index) {
        onEdit(activeIndex - 1);
      }
    }, 0);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Workflow Transitions</h2>
          <p className="text-sm text-muted-foreground">
            Add transitions and open editor for advanced rules.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => {
            const index = transitions.length;
            transitionArray.append({
              tempId: makeId(),
              label: "",
              fromStageId: "",
              toStageId: "",
              transitionType: "NORMAL",
              triggerStrategy: "ANY_ALLOWED",
              approvalStrategy: "ALL",
              approvalConfig: undefined,
              allowedRoleIds: [],
              allowedUserIds: [],
              autoTrigger: false,
            });
            onEdit?.(index);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Transition
        </Button>
      </div>

      <div className="space-y-3">
        {transitionArray.fields.map((field: any, index: number) => {
          const t = transitions[index] || {};
          const fromName = String(stageMap.get(String(t.fromStageId)) ?? "—");
          const toName = String(stageMap.get(String(t.toStageId)) ?? "—");

          return (
            <div
              key={field.id}
              className="flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold truncate">
                    {t.label?.trim() ? t.label : `Transition ${index + 1}`}
                  </span>
                  <span className="text-[11px] rounded-full border px-2 py-0.5 text-muted-foreground">
                    {t.transitionType || "NORMAL"}
                  </span>
                </div>

                <div className="mt-1 text-xs text-muted-foreground">
                  {fromName} → {toName}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button type="button" size="sm" variant="outline" onClick={() => onEdit?.(index)}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>

                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(index)}
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          );
        })}

        {!transitionArray.fields.length ? (
          <div className="rounded-2xl border bg-muted/30 p-6 text-sm text-muted-foreground">
            No transitions yet. Click <b>Add Transition</b>.
          </div>
        ) : null}
      </div>
    </Card>
  );
}
