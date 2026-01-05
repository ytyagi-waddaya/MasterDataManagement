


"use client";

import { useMemo } from "react";
import { useFieldArray } from "react-hook-form";
import WorkflowCanvas from "./WorkflowCanvas";
import { Button } from "@/components/ui/button";

type Opt = { label: string; value: string };

export default function WorkflowCanvasWithForm({
  form,
  WorkflowStatus,
  onBack,
  roleList = [],
  userList = [],
}: any) {
  const stageArray = useFieldArray({ control: form.control, name: "stages" });
  const transitionArray = useFieldArray({ control: form.control, name: "transitions" });

  const headerRight = useMemo(() => {
    const rolesCount = Array.isArray(roleList) ? roleList.length : 0;
    const usersCount = Array.isArray(userList) ? userList.length : 0;

    return (
      <span className="text-xs text-muted-foreground">
       
      </span>
    );
  }, [roleList, userList]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold">Workflow Visual Builder</h2>
          {headerRight}
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" onClick={onBack}>Back</Button>
          <Button onClick={onBack}>Save</Button>
        </div>
      </div>

      <div className="flex-1">
        <WorkflowCanvas
          form={form}
          stageArray={stageArray}
          transitionArray={transitionArray}
          WorkflowStatus={WorkflowStatus}
          mode="edit"
          roleList={roleList}   // ✅ forwarded
          userList={userList}   // ✅ forwarded
        />
      </div>
    </div>
  );
}
