"use client";

import { useParams } from "next/navigation";
import WorkflowDetailPage from "@/lib/workflow/forms/workflowDetail";
import { useRouter } from "next/navigation";
export default function WorkflowDetailsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  return (
      <div className="p-2">
      <WorkflowDetailPage params={{ id }} />
      </div>

  );
}

