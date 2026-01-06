import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import apiClient from "@/lib/api/apiClient";
import { useWorkflowInstanceAction } from "@/lib/workflow/hooks/useWorkflow";

export function WorkflowActionBar({
  record,
  onCompleted,
}: {
  record: any;
  onCompleted: () => void;
}) {
  const { actions } = useWorkflowInstanceAction(record.workflowInstanceId);

  console.log("RECORD:", record);
  
  // Send for approval
  async function handleSendForApproval() {
    await apiClient.post(`/workflows/${record.workflowId}/instance`, {
      resourceType: "MASTER_RECORD",
      resourceId: record.id,
    });

    toast.success("Sent for approval");
    onCompleted();
  }

  // Show only in DRAFT
  if (!record.currentStageId || record.currentStage?.category === "DRAFT") {
    return (
      <Button onClick={handleSendForApproval}>
        Send for approval
      </Button>
    );
  }

  // Runtime actions (Approve / Reject / etc.)
  return (
    <div className="flex gap-2">
      {actions.map((action: any) => (
        <Button
          key={action.transitionId}
          onClick={() =>
            apiClient.post(`/workflow/instance/${record.workflowInstanceId}/transition`, {
              transitionId: action.transitionId,
              action: action.actions[0], // APPROVE / EXECUTE
            }).then(onCompleted)
          }
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
