import { Badge } from "@/components/ui/badge";

const COLORS: Record<string, string> = {
  DRAFT: "bg-gray-400",
  SUBMITTED: "bg-blue-500",
  APPROVAL: "bg-orange-500",
  COMPLETED: "bg-green-500",
  REJECTED: "bg-red-500",
};

export function WorkflowBadge({ stage }: { stage?: any }) {
  if (!stage) return <Badge variant="outline">Draft</Badge>;

  return (
    <Badge className={COLORS[stage.category]}>
      {stage.name}
    </Badge>
  );
}
