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
        <div className="flex gap-4">
          <div>
          {/* <h1 className="text-xl font-semibold">{record.title ?? "Record"}</h1> */}
          <WorkflowBadge stage={record.currentStage} />
          </div>
        </div>
      </div>

      <WorkflowActionBar record={record} onCompleted={onRefresh} />
    </div>
  );
}
