// D:\Raghav\MasterDataManagement\frontend\src\lib\workflow\builder\library\stageLibrary.ts

import type { LucideIcon } from "lucide-react";
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
  Clock,
  AlertCircle,
  Users,
  TrendingUp,
  Zap,
  Lock,
  Unlock,
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

export const STAGE_UI_COLORS: Record<
  StageCategory,
  {
    base: string;
    light: string;
    border: string;
    gradient: string;
    gradientLight: string;
    shadow: string;
    text: string;
  }
> = {
  DRAFT: {
    base: "#2672edff",
    light: "#DBEAFE",
    border: "#93C5FD",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
    gradientLight: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)",
    shadow: "0 4px 14px 0 rgba(59, 130, 246, 0.25)",
    text: "#1E40AF",
  },
  SUBMITTED: {
    base: "#0EA5E9",
    light: "#E0F2FE",
    border: "#7DD3FC",
    gradient: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
    gradientLight: "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)",
    shadow: "0 4px 14px 0 rgba(14, 165, 233, 0.25)",
    text: "#0369A1",
  },
  UNDER_REVIEW: {
    base: "#F59E0B",
    light: "#FEF3C7",
    border: "#FCD34D",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    gradientLight: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
    shadow: "0 4px 14px 0 rgba(245, 158, 11, 0.25)",
    text: "#92400E",
  },
  NORMAL: {
    base: "#64748B",
    light: "#F1F5F9",
    border: "#CBD5E1",
    gradient: "linear-gradient(135deg, #64748B 0%, #475569 100%)",
    gradientLight: "linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)",
    shadow: "0 4px 14px 0 rgba(100, 116, 139, 0.15)",
    text: "#334155",
  },
  CORRECTION: {
    base: "#A855F7",
    light: "#F3E8FF",
    border: "#D8B4FE",
    gradient: "linear-gradient(135deg, #A855F7 0%, #9333EA 100%)",
    gradientLight: "linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)",
    shadow: "0 4px 14px 0 rgba(168, 85, 247, 0.25)",
    text: "#6B21A8",
  },
  ON_HOLD: {
    base: "#E11D48",
    light: "#FFE4E6",
    border: "#FDA4AF",
    gradient: "linear-gradient(135deg, #E11D48 0%, #BE123C 100%)",
    gradientLight: "linear-gradient(135deg, #FFE4E6 0%, #FECDD3 100%)",
    shadow: "0 4px 14px 0 rgba(225, 29, 72, 0.25)",
    text: "#9F1239",
  },
  APPROVAL: {
    base: "#7C3AED",
    light: "#EDE9FE",
    border: "#C4B5FD",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
    gradientLight: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)",
    shadow: "0 4px 14px 0 rgba(124, 58, 237, 0.25)",
    text: "#5B21B6",
  },
  COMPLETED: {
    base: "#16A34A",
    light: "#DCFCE7",
    border: "#86EFAC",
    gradient: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
    gradientLight: "linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)",
    shadow: "0 4px 14px 0 rgba(22, 163, 74, 0.25)",
    text: "#166534",
  },
  REJECTED: {
    base: "#EF4444",
    light: "#FEE2E2",
    border: "#FCA5A5",
    gradient: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
    gradientLight: "linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)",
    shadow: "0 4px 14px 0 rgba(239, 68, 68, 0.25)",
    text: "#991B1B",
  },
};

export type StageTemplate = {
  category: StageCategory;
  label: string;
  icon: LucideIcon;
  secondaryIcon?: LucideIcon;
  defaultName: string;
  description: string;
  isInitial?: boolean;
  isFinal?: boolean;
  color: string;
  badgeColor: string;
  gradient: string;
  usage: string[];
  complexity: "low" | "medium" | "high";
  tips?: string[];
  typicalDuration?: string;
  commonTransitions?: StageCategory[];
  canHaveMultiple?: boolean;
  requiresPermission?: boolean;
};

export const STAGE_LIBRARY: StageTemplate[] = [
  {
    category: "DRAFT",
    label: "Draft",
    icon: FileText,
    secondaryIcon: Unlock,
    defaultName: "Draft",
    description: "Initial stage where records are created, edited, and prepared for submission.",
    isInitial: true,
    color: STAGE_UI_COLORS.DRAFT.base,
    badgeColor:
      "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border border-blue-200 shadow-sm",
    gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
    usage: ["Document Creation", "Initial Draft", "Content Editing"],
    complexity: "low",
    tips: ["Use for initial content creation", "Can be edited multiple times", "Auto-saves work"],
    typicalDuration: "1-3 days",
    commonTransitions: ["SUBMITTED"],
    canHaveMultiple: true,
    requiresPermission: false,
  },
  {
    category: "SUBMITTED",
    label: "Submitted",
    icon: Send,
    secondaryIcon: Clock,
    defaultName: "Submitted for Review",
    description: "Record has been submitted and is awaiting initial review or processing.",
    color: STAGE_UI_COLORS.SUBMITTED.base,
    badgeColor:
      "bg-gradient-to-r from-sky-50 to-sky-100 text-sky-800 border border-sky-200 shadow-sm",
    gradient: "bg-gradient-to-r from-sky-500 to-sky-600",
    usage: ["Formal Submission", "Workflow Initiation", "Queue Processing"],
    complexity: "low",
    tips: ["Triggers notifications", "Can be returned to draft", "Sets submission timestamp"],
    typicalDuration: "24 hours",
    commonTransitions: ["UNDER_REVIEW", "CORRECTION"],
    canHaveMultiple: false,
    requiresPermission: false,
  },
  {
    category: "UNDER_REVIEW",
    label: "Under Review",
    icon: Eye,
    secondaryIcon: Users,
    defaultName: "Under Review",
    description: "Record is being actively reviewed by assigned team members or approvers.",
    color: STAGE_UI_COLORS.UNDER_REVIEW.base,
    badgeColor:
      "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border border-amber-200 shadow-sm",
    gradient: "bg-gradient-to-r from-amber-500 to-amber-600",
    usage: ["Quality Review", "Compliance Check", "Technical Validation"],
    complexity: "medium",
    tips: ["Assign reviewers", "Set deadlines", "Enable comments"],
    typicalDuration: "2-5 days",
    commonTransitions: ["APPROVAL", "CORRECTION", "ON_HOLD"],
    canHaveMultiple: true,
    requiresPermission: true,
  },
  {
    category: "NORMAL",
    label: "Normal Processing",
    icon: GitBranch,
    secondaryIcon: TrendingUp,
    defaultName: "Processing",
    description: "Standard operational stage for routine processing and work activities.",
    color: STAGE_UI_COLORS.NORMAL.base,
    badgeColor:
      "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-800 border border-slate-200 shadow-sm",
    gradient: "bg-gradient-to-r from-slate-500 to-slate-600",
    usage: ["Routine Work", "Data Processing", "Standard Operations"],
    complexity: "low",
  },
  {
    category: "CORRECTION",
    label: "Correction Required",
    icon: Edit3,
    secondaryIcon: AlertCircle,
    defaultName: "Correction Required",
    description: "Record requires fixes, updates, or additional information before proceeding.",
    color: STAGE_UI_COLORS.CORRECTION.base,
    badgeColor:
      "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border border-purple-200 shadow-sm",
    gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
    usage: ["Revisions", "Fix Requests", "Additional Information"],
    complexity: "medium",
  },
  {
    category: "ON_HOLD",
    label: "On Hold",
    icon: PauseCircle,
    secondaryIcon: Clock,
    defaultName: "On Hold",
    description: "Process paused due to dependencies, issues, or awaiting information.",
    color: STAGE_UI_COLORS.ON_HOLD.base,
    badgeColor:
      "bg-gradient-to-r from-rose-50 to-rose-100 text-rose-800 border border-rose-200 shadow-sm",
    gradient: "bg-gradient-to-r from-rose-500 to-rose-600",
    usage: ["Awaiting Response", "External Dependency", "Issue Resolution"],
    complexity: "medium",
  },
  {
    category: "APPROVAL",
    label: "Approval",
    icon: ShieldCheck,
    secondaryIcon: Lock,
    defaultName: "Approval Required",
    description: "Awaiting formal approval from authorized personnel.",
    color: STAGE_UI_COLORS.APPROVAL.base,
    badgeColor:
      "bg-gradient-to-r from-violet-50 to-violet-100 text-violet-800 border border-violet-200 shadow-sm",
    gradient: "bg-gradient-to-r from-violet-500 to-violet-600",
    usage: ["Manager Approval", "Final Authorization"],
    complexity: "high",
  },
  {
    category: "COMPLETED",
    label: "Completed",
    icon: CheckCircle2,
    secondaryIcon: Zap,
    defaultName: "Completed",
    description: "Workflow successfully concluded.",
    isFinal: true,
    color: STAGE_UI_COLORS.COMPLETED.base,
    badgeColor:
      "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border border-green-200 shadow-sm",
    gradient: "bg-gradient-to-r from-green-500 to-green-600",
    usage: ["Completion", "Archive"],
    complexity: "low",
  },
  {
    category: "REJECTED",
    label: "Rejected",
    icon: XCircle,
    secondaryIcon: AlertCircle,
    defaultName: "Rejected",
    description: "Workflow terminated due to rejection.",
    color: STAGE_UI_COLORS.REJECTED.base,
    badgeColor:
      "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border border-red-200 shadow-sm",
    gradient: "bg-gradient-to-r from-red-500 to-red-600",
    usage: ["Rejection", "Closure"],
    complexity: "low",
  },
];

export function getTemplateByCategory(category?: StageCategory | null): StageTemplate | undefined {
  if (!category) return undefined;
  return STAGE_LIBRARY.find((s) => s.category === category);
}

export function getStageColor(category?: StageCategory | null): string {
  return getTemplateByCategory(category)?.color ?? "#94A3B8";
}

export function getStageUIColors(category?: StageCategory | null) {
  const fallback = {
    base: "#94A3B8",
    light: "#F1F5F9",
    border: "#CBD5E1",
    gradient: "linear-gradient(135deg, #94A3B8 0%, #64748B 100%)",
    gradientLight: "linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)",
    shadow: "0 4px 14px 0 rgba(148, 163, 184, 0.15)",
    text: "#475569",
  };
  if (!category) return fallback;
  return STAGE_UI_COLORS[category] || fallback;
}
