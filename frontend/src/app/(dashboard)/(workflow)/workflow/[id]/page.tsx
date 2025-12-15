"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {  ChevronLeft } from "lucide-react";
import WorkflowDetailPage from "@/lib/workflow/forms/workflowDetail";

export default function WorkflowDetailsPage() {
  const { id } = useParams() as { id: string };

  return (
    <div className="flex flex-col gap-4 p-2 ">
      <div className="flex items-center gap-2">
        <Button
          className="h-8 w-8"
          onClick={() => window.history.back()}
          variant="outline"
        >
          <ChevronLeft/>
        </Button>
        <h1 className="text-2xl font-bold">Workflow Details</h1>
      </div>
      <div className="p-4">
      <WorkflowDetailPage params={{ id }} />
      </div>
    </div>
  );
}

