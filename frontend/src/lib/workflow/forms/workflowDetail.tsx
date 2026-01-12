// "use client";

// import { useRouter } from "next/navigation";
// import { WorkflowDetail } from "@/lib/workflow/WorkflowDetail";
// import { useWorkflow } from "@/lib/workflow/hooks";

// import { Button } from "@/components/ui/button";
// import { GitBranch, UploadCloud } from "lucide-react";
// import { usePublishWorkflow } from "../hooks/useWorkflow";

// export default function WorkflowDetailPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const router = useRouter();

//   const { data: workflowData, isLoading } = useWorkflow(params.id);
//   const publishWorkflow = usePublishWorkflow(params.id);

//   if (isLoading) return <div>Loading workflow...</div>;
//   if (!workflowData) return <div>Workflow not found.</div>;

//   const isDraft = workflowData.status === "DRAFT";

//   const formattedWorkflow = {
//     id: workflowData.id,
//     name: workflowData.name,
//     description: workflowData.description,
//     resourceId: workflowData.resource?.id ?? workflowData.resourceId ?? "",
//     resource: workflowData.resource,
//     createdAt: workflowData.createdAt,
//     updatedAt: workflowData.updatedAt,
//     createdBy: workflowData.createdBy?.name ?? "Unknown",
//     stages: workflowData.stages ?? [],
//     transitions: workflowData.transitions ?? [],
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-4">
//       {/* ACTION BAR */}
//       <div className="flex justify-end gap-2 mb-4">
//         {isDraft && (
//           <Button
//             variant="outline"
//             onClick={() => publishWorkflow.mutate()
//             }
//             disabled={publishWorkflow.isPending}
//           >
//             <UploadCloud className="mr-2 h-4 w-4" />
//             {publishWorkflow.isPending
//               ? "Publishing..."
//               : "Publish"}
//           </Button>
//         )}

//         <Button
//           onClick={() =>
//             router.push(`/create-workflow/${params.id}`)
//           }
//         >
//           <GitBranch className="mr-2 h-4 w-4" />
//           Build Workflow
//         </Button>
//       </div>

//       {/* DETAILS */}
//       <WorkflowDetail
//         workflow={formattedWorkflow}
//         onBack={() => router.back()}
//       />
//     </div>
//   );
// }

// "use client";

// import * as React from "react";
// import { useRouter } from "next/navigation";
// import { WorkflowDetail } from "@/lib/workflow/WorkflowDetail";
// import { useWorkflow } from "@/lib/workflow/hooks";

// import { Button } from "@/components/ui/button";
// import { GitBranch, UploadCloud, Eye } from "lucide-react";
// import { usePublishWorkflow } from "../hooks/useWorkflow";

// import { WorkflowPreviewFullScreen } from "@/lib/workflow/preview/WorkflowPreviewFullScreen";

// export default function WorkflowDetailPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const router = useRouter();

//   const { data: workflowData, isLoading } = useWorkflow(params.id);
//   const publishWorkflow = usePublishWorkflow(params.id);

//   const [previewOpen, setPreviewOpen] = React.useState(false);

//   if (isLoading) return <div>Loading workflow...</div>;
//   if (!workflowData) return <div>Workflow not found.</div>;

//   // ✅ Draft check
//   const isDraft = workflowData.status === "DRAFT";

//   // ✅ Published check (safe)
//   const isPublished =
//     workflowData.publish === true || (!isDraft && workflowData.publish !== false);

//   const formattedWorkflow = {
//     id: workflowData.id,
//     name: workflowData.name,
//     description: workflowData.description,
//     resourceId: workflowData.resource?.id ?? workflowData.resourceId ?? "",
//     resource: workflowData.resource,
//     createdAt: workflowData.createdAt,
//     updatedAt: workflowData.updatedAt,
//     createdBy: workflowData.createdBy?.name ?? "Unknown",
//     stages: workflowData.stages ?? [],
//     transitions: workflowData.transitions ?? [],
//     publish: workflowData.publish,
//     status: workflowData.status,
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-4">
//       {/* ACTION BAR */}
//       <div className="flex justify-end gap-2 mb-4">
//         {/* ✅ Preview only when Published isPublished && */}
//         {isPublished && (
//           <Button variant="outline" onClick={() => setPreviewOpen(true)}>
//             <Eye className="mr-2 h-4 w-4" />
//             Preview
//           </Button>
//         )}
//         {/* {(
//           <Button variant="outline" onClick={() => setPreviewOpen(true)}>
//             <Eye className="mr-2 h-4 w-4" />
//             Preview
//           </Button>
//         )} */}

//         {/* ✅ Publish only when DRAFT */}
//         {isDraft && (
//           <Button
//             variant="outline"
//             onClick={() => publishWorkflow.mutate()}
//             disabled={publishWorkflow.isPending}
//           >
//             <UploadCloud className="mr-2 h-4 w-4" />
//             {publishWorkflow.isPending ? "Publishing..." : "Publish"}
//           </Button>
//         )}

//         {/* ✅ Build Workflow only when DRAFT */}
//         {isDraft && (
//           <Button onClick={() => router.push(`/create-workflow/${params.id}`)}>
//             <GitBranch className="mr-2 h-4 w-4" />
//             Build Workflow
//           </Button>
//         )}
//       </div>

//       {/* ✅ PREVIEW MODAL (only opens when Published) */}
//       <WorkflowPreviewFullScreen
//         open={previewOpen}
//         onOpenChange={setPreviewOpen}
//         workflow={formattedWorkflow as any}
//       />

//       {/* DETAILS */}
//       <WorkflowDetail workflow={formattedWorkflow as any} onBack={() => router.back()} />
//     </div>
//   );
// }

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { WorkflowDetail } from "@/lib/workflow/WorkflowDetail";
import { useWorkflow } from "@/lib/workflow/hooks";

import { Button } from "@/components/ui/button";
import {
  GitBranch,
  UploadCloud,
  Eye,
  ArrowLeft,
  Loader2,
  WorkflowIcon,
} from "lucide-react";
import { usePublishWorkflow } from "../hooks/useWorkflow";

import { WorkflowPreviewFullScreen } from "@/lib/workflow/preview/WorkflowPreviewFullScreen";
import { Badge } from "@/components/ui/badge";

export default function WorkflowDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const { data: workflowData, isLoading } = useWorkflow(params.id);
  const publishWorkflow = usePublishWorkflow(params.id);

  const [previewOpen, setPreviewOpen] = React.useState(false);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );

  if (!workflowData)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-slate-600 mb-4">Workflow not found</div>
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );

  // Status checks
  const isDraft = workflowData.status === "DRAFT";
  const isPublished =
    workflowData.publish === true ||
    (!isDraft && workflowData.publish !== false);

  const formattedWorkflow = {
    id: workflowData.id,
    name: workflowData.name,
    description: workflowData.description,
    resourceId: workflowData.resource?.id ?? workflowData.resourceId ?? "",
    resource: workflowData.resource,
    createdAt: workflowData.createdAt,
    updatedAt: workflowData.updatedAt,
    createdBy: workflowData.createdBy?.name ?? "Unknown",
    stages: workflowData.stages ?? [],
    transitions: workflowData.transitions ?? [],
    publish: workflowData.publish,
    status: workflowData.status,
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-slate-50/50">
      {/* Minimal Header */}
      <div className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                   onClick={() => router.push("/workflow")}
                  className="h-8 w-8 p-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                    <WorkflowIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900">
                      {workflowData.name}
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {workflowData.description || "No description provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Status Badge */}
              <Badge
                variant={isDraft ? "outline" : "default"}
                className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${
                    isDraft
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }
                `}
              >
                {isDraft ? "Draft" : "Published"}
              </Badge>
              {/* ///////// */}
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {isPublished &&(
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPreviewOpen(true)}
                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}

                {isDraft && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => publishWorkflow.mutate()}
                      disabled={publishWorkflow.isPending}
                      className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    >
                      {publishWorkflow.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <UploadCloud className="h-4 w-4" />
                      )}
                    </Button>

                    <Button
                      size="sm"
                      onClick={() =>
                        router.push(`/create-workflow/${params.id}`)
                      }
                      className="bg-slate-900 hover:bg-slate-800 text-white"
                    >
                      <GitBranch className="h-4 w-4 mr-2" />
                      Build
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-2 py-6">
        <WorkflowDetail
          workflow={formattedWorkflow as any}
          onBack={() => router.back()}
        />
      </div>

      {/* Preview Modal */}
      <WorkflowPreviewFullScreen
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        workflow={formattedWorkflow as any}
      />
    </div>
  );
}
