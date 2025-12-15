"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function ReviewStep({ form }: any) {
  const data = form.watch();

  return (
    <Card className="p-6">
      <div>
        <h2 className="text-slate-900 mb-1">Review & Submit</h2>
        <p className="text-slate-600">Review your workflow configuration</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 p-5 rounded-lg bg-slate-50 border">
          <div className="flex gap-12">
            <span className="text-slate-600">Workflow Name</span>
            <span className="text-slate-900">{data.name || "—"}</span>
          </div>

          <div className="flex gap-20">
            <span className="text-slate-600">Total Stages</span>
            <span className="text-slate-900">{data.stages.length}</span>
          </div>

          <div className="flex gap-20">
            <span className="text-slate-600">Description</span>
            <span className="text-slate-900">{data.description || "—"}</span>
          </div>

          <div className="flex gap-13">
            <span className="text-slate-600">Total Transitions</span>
            <span className="text-slate-900">{data.transitions.length}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Complete Configuration</Label>
          <div className="rounded-lg border bg-slate-900 p-4 overflow-auto max-h-[400px]">
            <pre className="text-green-400 text-xs">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </Card>
  );
}
