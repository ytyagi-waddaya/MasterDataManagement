import {
  FileText,
  Send,
  Eye,
  GitBranch,
  Edit3,
  PauseCircle,
  ShieldCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export type StageCategory =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "NORMAL"
  | "CORRECTION"
  | "ON_HOLD"
  | "APPROVAL"
  | "COMPLETED"
  | "REJECTED";

export type StageTemplate = {
  category: StageCategory;
  label: string;
  icon: any;
  defaultName: string;
  description: string;
  isFinal?: boolean;
  color: string; // ✅ stage default color (used for edges too)
};

export const STAGE_LIBRARY: StageTemplate[] = [
  {
    category: "DRAFT",
    label: "Draft",
    icon: FileText,
    defaultName: "Draft",
    description: "Initial stage where record is created and editable.",
    color: "#2563EB", // blue
  },
  {
    category: "SUBMITTED",
    label: "Submitted",
    icon: Send,
    defaultName: "Submitted",
    description: "Record has been submitted for processing.",
    color: "#0EA5E9", // sky
  },
  {
    category: "UNDER_REVIEW",
    label: "Under Review",
    icon: Eye,
    defaultName: "Under Review",
    description: "Record is under review by assigned users.",
    color: "#F59E0B", // amber
  },
  {
    category: "NORMAL",
    label: "Normal",
    icon: GitBranch,
    defaultName: "Normal",
    description: "Standard processing stage.",
    color: "#64748B", // slate
  },
  {
    category: "CORRECTION",
    label: "Correction",
    icon: Edit3,
    defaultName: "Correction",
    description: "Returned for correction or modification.",
    color: "#A855F7", // purple
  },
  {
    category: "ON_HOLD",
    label: "On Hold",
    icon: PauseCircle,
    defaultName: "On Hold",
    description: "Processing is temporarily paused.",
    color: "#E11D48", // rose
  },
  {
    category: "APPROVAL",
    label: "Approval",
    icon: ShieldCheck,
    defaultName: "Approval",
    description: "Waiting for approval from authorized roles.",
    color: "#7C3AED", // violet
  },
  {
    category: "COMPLETED",
    label: "Completed",
    icon: CheckCircle2,
    defaultName: "Completed",
    description: "Final stage. Workflow is successfully completed.",
    isFinal: true, // ✅ ONLY completed is final
    color: "#16A34A", // green
  },
  {
    category: "REJECTED",
    label: "Rejected",
    icon: XCircle,
    defaultName: "Rejected",
    description: "Workflow is rejected and closed.",
    // ✅ isFinal intentionally NOT set
    color: "#EF4444", // red
  },
];

export function getTemplateByCategory(category?: StageCategory | null) {
  if (!category) return undefined;
  return STAGE_LIBRARY.find((s) => s.category === category);
}
