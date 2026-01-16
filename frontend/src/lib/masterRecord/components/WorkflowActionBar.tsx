// import { Button } from "@/components/ui/button";
// import {
//   useWorkflowActions,
//   useWorkflowInstance,
//   useWorkflowInstanceAction,
// } from "@/lib/workflow/hooks/useWorkflow";

// export function WorkflowActionBar({
//   record,
//   onCompleted,
// }: {
//   record: any;
//   onCompleted: () => void;
// }) {
//   const instanceId = record.workflowInstance.id;
//   const resourceId =
//   record.masterObject?.resources?.[0]?.id;

//   // ✅ fetch available actions
//   const { data: actions = [] } = useWorkflowActions(instanceId);
// console.log("Actions:", actions);

//   // ✅ mutation for executing action
//   const actionMutation = useWorkflowInstanceAction(instanceId);

//   const startWorkflow = useWorkflowInstance();

//   function handleSendForApproval() {
//     startWorkflow.mutate(
//       {
//         workflowId: record.workflowId,
//         recordId: record.id,
//         resourceId:resourceId,
//         resourceType: "MASTER_RECORD",
//       },
//       {
//         onSuccess: onCompleted,
//       }
//     );
//   }
//   // Show only in DRAFT
//   if (!record.currentStageId || record.currentStage?.category === "DRAFT") {
//     return <Button onClick={handleSendForApproval}>Send for approval</Button>;
//   }

//   // Runtime actions
//   return (
//     <div className="flex gap-2">
//       {actions.map((action: any) => (
//         <Button
//           key={action.transitionId}
//           disabled={actionMutation.isPending}
//           onClick={() =>
//             actionMutation.mutate(
//               {
//                 transitionId: action.transitionId,
//                 action: action.actions[0], // APPROVE / EXECUTE
//               },
//               {
//                 onSuccess: onCompleted,
//               }
//             )
//           }
//         >
//           {action.label}
//         </Button>
//       ))}
//     </div>
//   );
// }

// import { Button } from "@/components/ui/button";
// import {
//   useWorkflowActions,
//   useWorkflowInstance,
//   useWorkflowInstanceAction,
// } from "@/lib/workflow/hooks/useWorkflow";

// export function WorkflowActionBar({
//   record,
//   onCompleted,
// }: {
//   record: any;
//   onCompleted: () => void;
// }) {
//   const instance = record.workflowInstance; // latest instance
//   const instanceId = instance?.id;
//   console.log("Instance Id Id:", instanceId);
//   const hasInstance = !!record.workflowInstance;
//   const isCompleted = record?.currentStage?.code === "COMPLETED";

//   // 🔹 record itself is the resource
//   const resourceId = record.id;

//   // 🔹 fetch runtime actions only if instance exists
//   const { data: actions = [] } = useWorkflowActions(instanceId ?? "");

//   const actionMutation = useWorkflowInstanceAction(instanceId ?? "");
//   console.log("ACTIONS:", actionMutation);
//   const startWorkflow = useWorkflowInstance();

//   function handleSendForApproval() {
//     startWorkflow.mutate(
//       {
//         workflowId: record.masterObject?.resources?.[0]?.workflows?.[0]?.id,
//         resourceId,
//         resourceType: "MASTER_RECORD",
//       },
//       {
//         onSuccess: onCompleted,
//       }
//     );
//   }

//   /* ------------------------------------------------
//      1️⃣ BEFORE WORKFLOW STARTED → SHOW SEND BUTTON
//   ------------------------------------------------ */
//   if (isCompleted) {
//     return <div>Workflow Completed</div>;
//   }
//   if (!hasInstance) {
//     return <Button onClick={handleSendForApproval}>Send for approval</Button>;
//   }

//   // {
//   //   isCompleted ? (
//   //     <div>Workflow Completed</div>
//   //   ) : !hasInstance ? (
//   //     <Button onClick={handleSendForApproval}>Send for approval</Button>
//   //   ) : null
//   // }

//   /* ------------------------------------------------
//      2️⃣ WORKFLOW RUNNING → SHOW RUNTIME ACTIONS
//   ------------------------------------------------ */
//   if (!actions.length) return null;

//   return (
//     <div className="flex gap-2">
//       {/* {actions.map((action: any) => (
//         <Button
//           key={action.transitionId}
//           disabled={actionMutation.isPending}
//           onClick={() =>
//             actionMutation.mutate(
//               {
//                 transitionId: action.transitionId,
//                 action: action.actions[0], // EXECUTE / APPROVE
//               },
//               {
//                 onSuccess: onCompleted,
//               }
//             )
//           }
//         >
//           {action.label}
//         </Button>
//       ))} */}
//       {actions.map((action: any) => {
//         const displayLabel =
//           action.type === "SEND_BACK" && instance.currentStage?.isFinal
//             ? "Reopen"
//             : action.label;

//         return (
//           <Button
//             key={action.transitionId}
//             disabled={actionMutation.isPending}
//             onClick={() =>
//               actionMutation.mutate(
//                 {
//                   transitionId: action.transitionId,
//                   action: action.actions[0], // EXECUTE / APPROVE / REJECT
//                 },
//                 {
//                   onSuccess: onCompleted,
//                 }
//               )
//             }
//           >
//             {displayLabel}
//           </Button>
//         );
//       })}
//     </div>
//   );
// }
//////////
// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   useWorkflowActions,
//   useWorkflowInstance,
//   useWorkflowInstanceAction,
// } from "@/lib/workflow/hooks/useWorkflow";

// export function WorkflowActionBar({
//   record,
//   onCompleted,
// }: {
//   record: any;
//   onCompleted: () => void;
// }) {
//   const instance = record.workflowInstance;
//   const instanceId = instance?.id;

//   const hasInstance = !!instance;
//   const isCompleted = record?.currentStage?.code === "COMPLETED";

//   const resourceId = record.id;

//   // 🔹 runtime actions
//   const { data: actions = [] } = useWorkflowActions(instanceId ?? "");

//   // 🔹 mutations
//   const actionMutation = useWorkflowInstanceAction(instanceId ?? "");
//   const startWorkflow = useWorkflowInstance();

//   // 🔹 local UI state for comments
//   const [activeAction, setActiveAction] = useState<any>(null);
//   const [comment, setComment] = useState("");
//   const [clicked, setClicked] = useState(false);

//   /* ------------------------------------------------
//      START WORKFLOW
//   ------------------------------------------------ */
//   function handleSendForApproval() {
//     startWorkflow.mutate(
//       {
//         // workflowId: record.masterObject?.resources?.[0]?.workflows?.[0]?.id,
//         resourceId,
//         resourceType: "MASTER_RECORD",
//       },
//       {
//         onSuccess: onCompleted,
//       }
//     );
//   }

//   /* ------------------------------------------------
//      1️⃣ COMPLETED → JUST SHOW TEXT
//   ------------------------------------------------ */
//   if (isCompleted) {
//     return <div className="text-sm text-gray-500">Workflow Completed</div>;
//   }

//   /* ------------------------------------------------
//      2️⃣ NO INSTANCE → SHOW START BUTTON
//   ------------------------------------------------ */
//   if (!hasInstance) {
//     return <Button onClick={handleSendForApproval}>Send for approval</Button>;
//   }

//   /* ------------------------------------------------
//      3️⃣ WORKFLOW RUNNING → SHOW ACTIONS
//   ------------------------------------------------ */
//   if (!actions.length) return null;

//   return (
//     <div className="space-y-2">
//       {/* ---------------- COMMENT BOX ---------------- */}
//       {activeAction && (
//         <div className="space-y-2">
//           <textarea
//             className="w-full border rounded-md p-2 text-sm"
//             placeholder="Add a comment..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />

//           <div className="flex gap-2">
//             <Button
//               disabled={clicked || actionMutation.isPending}
//               onClick={() => {
//                 actionMutation.mutate(
//                   {
//                     transitionId: activeAction.transitionId,
//                     action: activeAction.actions[0],
//                     comment, // ✅ sent to backend
//                   },
//                   {
//                     onSuccess: () => {
//                       setComment("");
//                       setActiveAction(null);
//                       onCompleted();
//                     },
//                   }
//                 );
//               }}
//             >
//               Confirm
//             </Button>

//             <Button
//               variant="ghost"
//               onClick={() => {
//                 setComment("");
//                 setActiveAction(null);
//               }}
//             >
//               Cancel
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* ---------------- ACTION BUTTONS ---------------- */}
//       <div className="flex gap-2 flex-wrap">
//         {actions.map((action: any) => {
//           const needsComment =
//             action.type === "SEND_BACK" || action.actions?.includes("REJECT");

//           // 🔹 Reopen label logic
//           const displayLabel =
//             action.type === "SEND_BACK" && instance?.currentStage?.isFinal
//               ? "Reopen"
//               : action.label;

//           return (
//             <Button
//               key={action.transitionId}
//               disabled={actionMutation.isPending}
//               onClick={() => {
//                 // 🔹 if comment required → open comment UI
//                 if (needsComment) {
//                   setActiveAction(action);
//                   return;
//                 }

//                 // 🔹 otherwise execute directly
//                 actionMutation.mutate(
//                   {
//                     transitionId: action.transitionId,
//                     action: action.actions[0], // EXECUTE / APPROVE
//                   },
//                   {
//                     onSuccess: onCompleted,
//                   }
//                 );
//               }}
//             >
//               {displayLabel}
//             </Button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Check, X, RotateCcw, MessageSquare } from "lucide-react";
import {
  useWorkflowActions,
  useWorkflowInstance,
  useWorkflowInstanceAction,
} from "@/lib/workflow/hooks/useWorkflow";

export function WorkflowActionBar({
  record,
  onCompleted,
}: {
  record: any;
  onCompleted: () => void;
}) {
  const instance = record.workflowInstance;
  const instanceId = instance?.id;

  const hasInstance = !!instance;
  const isCompleted = record?.currentStage?.code === "COMPLETED";

  const resourceId = record.id;

  const { data: actions = [] } = useWorkflowActions(instanceId ?? "");
  const actionMutation = useWorkflowInstanceAction(instanceId ?? "");
  const startWorkflow = useWorkflowInstance();

  const [activeAction, setActiveAction] = useState<any>(null);
  const [comment, setComment] = useState("");

  /* ------------------------------------------------
     START WORKFLOW
  ------------------------------------------------ */
  function handleSendForApproval() {
    startWorkflow.mutate(
      {
        resourceId,
        resourceType: "MASTER_RECORD",
      },
      {
        onSuccess: onCompleted,
      }
    );
  }

  /* ------------------------------------------------
     1️⃣ COMPLETED → MINIMAL INDICATOR
  ------------------------------------------------ */
  if (isCompleted) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-1 text-xs text-gray-500 bg-gray-50 rounded-full">
        <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
        <span>Completed</span>
      </div>
    );
  }

  /* ------------------------------------------------
     2️⃣ NO INSTANCE → MINIMAL BUTTON
  ------------------------------------------------ */
  if (!hasInstance) {
    return (
      <Button
        onClick={handleSendForApproval}
        size="sm"
        className="h-7 px-3 text-xs font-medium bg-gray-900 text-white hover:bg-gray-800 border-0"
      >
        <Send className="h-3 w-3 mr-1.5" />
        Start Workflow
      </Button>
    );
  }

  /* ------------------------------------------------
     3️⃣ WORKFLOW RUNNING → SHOW ACTIONS
  ------------------------------------------------ */
  if (!actions.length) return null;

  /* ------------------------------------------------
     ACTION ICONS MAPPING
  ------------------------------------------------ */
  const getActionIcon = (action: any) => {
    if (action.type === "SEND_BACK" && instance?.currentStage?.isFinal) {
      return <RotateCcw className="h-3 w-3" />;
    }
    if (action.actions?.includes("APPROVE")) {
      return <Check className="h-3 w-3" />;
    }
    if (action.actions?.includes("REJECT")) {
      return <X className="h-3 w-3" />;
    }
    return null;
  };

  return (
    <div className="space-y-2">
      {/* ---------------- ACTION BUTTONS ---------------- */}
      <div className="flex gap-1.5">
        {actions.map((action: any) => {
          const needsComment =
            action.type === "SEND_BACK" || action.actions?.includes("REJECT");

          const displayLabel =
            action.type === "SEND_BACK" && instance?.currentStage?.isFinal
              ? "Reopen"
              : action.label;

          const Icon = getActionIcon(action);
          const isApprove = action.actions?.includes("APPROVE");
          const isReject = action.actions?.includes("REJECT");
          const isSendBack = action.type === "SEND_BACK";

          if (activeAction?.transitionId === action.transitionId) {
            return (
              <div key={action.transitionId} className="flex-1 min-w-[200px]">
                <div className="p-2 border border-gray-200 rounded-md bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-3 w-3 text-gray-400" />
                    <span className="text-xs font-medium text-gray-700">
                      Comment
                    </span>
                  </div>
                  <textarea
                    className="w-full px-2 py-1.5 text-xs border-0 focus:outline-none resize-none"
                    placeholder="Add a note..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={2}
                    autoFocus
                  />
                  <div className="flex items-center justify-between pt-1 border-t">
                    <div className="text-xs text-gray-400">
                      {comment.length > 0 && `${comment.length}`}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setComment("");
                          setActiveAction(null);
                        }}
                        className="h-6 px-2 text-xs hover:bg-gray-100"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        disabled={actionMutation.isPending}
                        onClick={() => {
                          actionMutation.mutate(
                            {
                              transitionId: action.transitionId,
                              action: action.actions[0],
                              comment,
                            },
                            {
                              onSuccess: () => {
                                setComment("");
                                setActiveAction(null);
                                onCompleted();
                              },
                            }
                          );
                        }}
                        className={`h-6 px-2 text-xs ${
                          isReject
                            ? "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                            : isSendBack
                            ? "bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200"
                            : "bg-gray-900 text-white hover:bg-gray-800"
                        }`}
                      >
                        {actionMutation.isPending ? (
                          <div className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          displayLabel
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <Button
              key={action.transitionId}
              size="sm"
              disabled={actionMutation.isPending || activeAction}
              onClick={() => {
                if (needsComment) {
                  setActiveAction(action);
                  return;
                }

                actionMutation.mutate(
                  {
                    transitionId: action.transitionId,
                    action: action.actions[0],
                  },
                  {
                    onSuccess: onCompleted,
                  }
                );
              }}
              className={`h-7 px-2.5 text-xs font-medium ${
                isApprove
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : isReject
                  ? "text-red-600 hover:bg-red-50 border border-red-200"
                  : isSendBack
                  ? "text-orange-600 hover:bg-orange-50 border border-orange-200"
                  : "text-gray-700 hover:bg-gray-100 border"
              }`}
              variant={isApprove ? "default" : "outline"}
            >
              {Icon && <span className="mr-1">{Icon}</span>}
              {displayLabel}
            </Button>
          );
        })}
      </div>
    </div>
  );
}