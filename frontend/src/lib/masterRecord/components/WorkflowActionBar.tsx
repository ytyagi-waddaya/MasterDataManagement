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

import { Button } from "@/components/ui/button";
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
  const instance = record.workflowInstance; // latest instance
  const instanceId = instance?.id;
 console.log("Instance Id Id:", instanceId);
  const hasInstance = !!record.workflowInstance;

  // 🔹 record itself is the resource
  const resourceId = record.id;

  // 🔹 fetch runtime actions only if instance exists
  const { data: actions = [] } = useWorkflowActions(instanceId ?? "");
  
  const actionMutation = useWorkflowInstanceAction(instanceId ?? "");
  console.log("ACTIONS:", actionMutation);
  const startWorkflow = useWorkflowInstance();

  function handleSendForApproval() {
    startWorkflow.mutate(
      {
        workflowId: record.masterObject?.resources?.[0]?.workflows?.[0]?.id,
        resourceId,
        resourceType: "MASTER_RECORD",
      },
      {
        onSuccess: onCompleted,
      }
    );
  }

  /* ------------------------------------------------
     1️⃣ BEFORE WORKFLOW STARTED → SHOW SEND BUTTON
  ------------------------------------------------ */
  if (!hasInstance) {
    return <Button onClick={handleSendForApproval}>Send for approval</Button>;
  }

  /* ------------------------------------------------
     2️⃣ WORKFLOW RUNNING → SHOW RUNTIME ACTIONS
  ------------------------------------------------ */
  if (!actions.length) return null;

  return (
    <div className="flex gap-2">
      {actions.map((action: any) => (
        <Button
          key={action.transitionId}
          disabled={actionMutation.isPending}
          onClick={() =>
            actionMutation.mutate(
              {
                transitionId: action.transitionId,
                action: action.actions[0], // EXECUTE / APPROVE
              },
              {
                onSuccess: onCompleted,
              }
            )
          }
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
