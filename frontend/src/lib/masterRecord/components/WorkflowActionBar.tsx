import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useWorkflowActions } from "@/lib/workflow/hooks";

export function WorkflowActionBar({
  record,
  onCompleted,
}: {
  record: any;
  onCompleted: () => void;
}) {
  const { actions } = useWorkflowActions(record.workflowInstanceId);

  // Send for approval
  async function handleSendForApproval() {
    await api.post(`/workflows/${record.workflowId}/instance`, {
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
            api.post(`/workflow/instance/${record.workflowInstanceId}/transition`, {
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
