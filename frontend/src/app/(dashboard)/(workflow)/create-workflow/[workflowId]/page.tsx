// "use client";

// import { Button } from "@/components/ui/button";
// import { ChevronLeft } from "lucide-react";
// import WorkflowBuilder from "@/lib/workflow/forms/workflowForm";
// import { useRouter } from "next/navigation";
// import { use } from "react";

// export default function CreateWorkflowPage({
//   params,
// }: {
//   params: Promise<{ workflowId: string }>;
// }) {
//   const router = useRouter();

//   // ✅ unwrap params
//   const { workflowId } = use(params);
//   return (
//     <div className="flex flex-col gap-4 p-2">
//       <div className="flex items-center gap-2">
//         <Button
//           className="h-8 w-8"
//           onClick={() => router.push(`/workflow/${workflowId}`)}
//           variant="outline"
//         >
//           <ChevronLeft />
//         </Button>

//         <h1 className="text-2xl font-bold">Build Workflow</h1>
//       </div>

//       <div className="p-4">
//         <WorkflowBuilder workflowId={workflowId} />
//       </div>
//     </div>
//   );
// }

"use client";

import WorkflowBuilder from "@/lib/workflow/forms/workflowForm";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function CreateWorkflowPage({
  params,
}: {
  params: Promise<{ workflowId: string }>;
}) {
  const router = useRouter();

  const { workflowId } = use(params);

  return (
    <div className="overflow-hidden">
      <WorkflowBuilder workflowId={workflowId} />
    </div>
  );
}
