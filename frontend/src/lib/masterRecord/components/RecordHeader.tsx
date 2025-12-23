import { WorkflowBadge } from "./WorkflowBadge";
import { WorkflowActionBar } from "./WorkflowActionBar";

export function RecordHeader({
  record,
  onRefresh,
}: {
  record: any;
  onRefresh: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold">{record.title ?? "Record"}</h1>
        <WorkflowBadge stage={record.currentStage} />
      </div>

      <WorkflowActionBar record={record} onCompleted={onRefresh} />
    </div>
  );
}
