// app/components/workflow/WorkflowRulebookGuide.tsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle,
  Circle,
  Flag,
  HelpCircle,
  Info,
  ListChecks,
  ListOrdered,
  Lock,
  Play,
  RefreshCw,
  Shield,
  Sparkles,
  Terminal,
  Users,
  XCircle,
  Zap,
  Ban,
  Settings,
  GitBranch,
  Cpu,
  UserCheck,
  AlertTriangle,
  BookOpen,
  ChevronRight,
  Clock,
  FileCheck,
  GitCommit,
  GitPullRequest,
  LockKeyhole,
  ShieldCheck,
  Workflow,
  Table,
  Filter,
  Eye,
  Sliders,
  TreeDeciduous,
  LayoutDashboard,
  Layers,
} from "lucide-react";

interface WorkflowRulebookGuideProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function WorkflowBuilderGuide({
  open,
  onOpenChange,
  children,
}: WorkflowRulebookGuideProps) {
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  // Matrix Data
  const matrixData = [
    {
      from: "DRAFT",
      meaning: "item is being created",
      rules: [
        { to: "SUBMITTED", normal: "✅", approval: "❌", sendBack: "❌", review: "❌", auto: "❌", why: "First real step" },
        { to: "UNDER_REVIEW", normal: "✅", approval: "❌", sendBack: "❌", review: "❌", auto: "❌", why: "Send for checking" },
        { to: "APPROVAL", normal: "❌", approval: "❌", sendBack: "❌", review: "❌", auto: "❌", why: "Must review first" },
        { to: "CORRECTION", normal: "❌", approval: "❌", sendBack: "❌", review: "❌", auto: "❌", why: "Nothing to correct" },
        { to: "ON_HOLD", normal: "✅", approval: "❌", sendBack: "❌", review: "⚠️", auto: "⚠️", why: "Pause allowed" },
        { to: "REJECTED", normal: "❌", approval: "❌", sendBack: "❌", review: "❌", auto: "❌", why: "Can't reject draft" },
        { to: "NORMAL", normal: "✅", approval: "❌", sendBack: "❌", review: "⚠️", auto: "❌", why: "Internal step" },
        { to: "COMPLETED", normal: "❌", approval: "❌", sendBack: "❌", review: "❌", auto: "❌", why: "Cannot skip process" },
      ]
    },
    {
      from: "SUBMITTED",
      meaning: "item has been sent forward",
      rules: [
        { to: "UNDER_REVIEW", normal: "✅", approval: "❌", sendBack: "❌", review: "❌", auto: "⚠️", why: "Standard flow" },
        { to: "APPROVAL", normal: "❌", approval: "✅", sendBack: "❌", review: "❌", auto: "❌", why: "Needs decision" },
        { to: "CORRECTION", normal: "❌", approval: "❌", sendBack: "✅", review: "❌", auto: "❌", why: "Needs fix" },
        { to: "REJECTED", normal: "❌", approval: "❌", sendBack: "✅", review: "❌", auto: "❌", why: "Decline" },
        { to: "ON_HOLD", normal: "✅", approval: "❌", sendBack: "❌", review: "⚠️", auto: "⚠️", why: "Pause" },
        { to: "COMPLETED", normal: "❌", approval: "❌", sendBack: "❌", review: "❌", auto: "❌", why: "Must approve first" },
      ]
    },
    {
      from: "UNDER_REVIEW",
      meaning: "someone is checking it",
      rules: [
        { to: "APPROVAL", normal: "❌", approval: "✅", sendBack: "❌", review: "❌", auto: "⚠️", why: "Escalate" },
        { to: "CORRECTION", normal: "❌", approval: "❌", sendBack: "✅", review: "❌", auto: "❌", why: "Needs changes" },
        { to: "SUBMITTED", normal: "❌", approval: "❌", sendBack: "✅", review: "❌", auto: "❌", why: "Rollback" },
        { to: "REJECTED", normal: "✅", approval: "❌", sendBack: "❌", review: "❌", auto: "❌", why: "Reviewer rejects" },
        { to: "UNDER_REVIEW", normal: "❌", approval: "❌", sendBack: "❌", review: "✅", auto: "❌", why: "Re-check" },
        { to: "ON_HOLD", normal: "✅", approval: "❌", sendBack: "❌", review: "⚠️", auto: "⚠️", why: "Pause" },
        { to: "COMPLETED", normal: "❌", approval: "❌", sendBack: "❌", review: "❌", auto: "❌", why: "Needs approval" },
      ]
    },
    {
      from: "APPROVAL",
      meaning: "waiting for decision",
      rules: [
        { to: "COMPLETED", normal: "❌", approval: "✅", sendBack: "❌", review: "❌", auto: "⚠️", why: "Finalize" },
        { to: "REJECTED", normal: "✅", approval: "❌", sendBack: "❌", review: "❌", auto: "⚠️", why: "Declined" },
        { to: "CORRECTION", normal: "❌", approval: "❌", sendBack: "✅", review: "❌", auto: "❌", why: "Needs fix" },
        { to: "UNDER_REVIEW", normal: "❌", approval: "❌", sendBack: "✅", review: "❌", auto: "❌", why: "Re-review" },
        { to: "ON_HOLD", normal: "✅", approval: "❌", sendBack: "❌", review: "⚠️", auto: "⚠️", why: "Pause" },
        { to: "APPROVAL", normal: "❌", approval: "❌", sendBack: "❌", review: "⚠️", auto: "❌", why: "Audit only" },
      ]
    },
    {
      from: "CORRECTION",
      meaning: "item needs fixing",
      rules: [
        { to: "SUBMITTED", normal: "✅", approval: "❌", sendBack: "❌", review: "❌", auto: "❌", why: "Resend" },
        { to: "UNDER_REVIEW", normal: "✅", approval: "❌", sendBack: "❌", review: "❌", auto: "❌", why: "Recheck" },
        { to: "APPROVAL", normal: "❌", approval: "✅", sendBack: "❌", review: "❌", auto: "❌", why: "Needs decision" },
        { to: "ON_HOLD", normal: "✅", approval: "❌", sendBack: "❌", review: "⚠️", auto: "⚠️", why: "Pause" },
        { to: "REJECTED", normal: "❌", approval: "❌", sendBack: "❌", review: "❌", auto: "❌", why: "Must review first" },
        { to: "COMPLETED", normal: "❌", approval: "❌", sendBack: "❌", review: "❌", auto: "❌", why: "Must approve" },
      ]
    },
    {
      from: "ON_HOLD",
      meaning: "process paused",
      rules: [
        { to: "NORMAL", normal: "✅", approval: "❌", sendBack: "❌", review: "⚠️", auto: "❌", why: "Resume" },
        { to: "UNDER_REVIEW", normal: "✅", approval: "❌", sendBack: "❌", review: "⚠️", auto: "❌", why: "Resume review" },
        { to: "CORRECTION", normal: "❌", approval: "❌", sendBack: "✅", review: "❌", auto: "❌", why: "Fix first" },
        { to: "APPROVAL", normal: "❌", approval: "✅", sendBack: "❌", review: "❌", auto: "❌", why: "Resume approval" },
        { to: "ON_HOLD", normal: "❌", approval: "❌", sendBack: "❌", review: "⚠️", auto: "❌", why: "Note only" },
        { to: "COMPLETED", normal: "❌", approval: "❌", sendBack: "❌", review: "❌", auto: "❌", why: "Must approve" },
      ]
    }
  ];

  // UI Decision Tree Data
  const transitionTypeRules = {
    draft: { normal: "✅", approval: "❌", sendBack: "❌", review: "⚠️", auto: "❌" },
    submitted: { normal: "✅", approval: "✅", sendBack: "✅", review: "⚠️", auto: "⚠️" },
    underReview: { normal: "✅", approval: "✅", sendBack: "✅", review: "✅", auto: "⚠️" },
    approval: { normal: "✅", approval: "❌", sendBack: "✅", review: "⚠️", auto: "⚠️" },
    correction: { normal: "✅", approval: "✅", sendBack: "❌", review: "⚠️", auto: "❌" },
    onHold: { normal: "✅", approval: "✅", sendBack: "✅", review: "⚠️", auto: "⚠️" },
    rejected: { normal: "❌", approval: "❌", sendBack: "❌", review: "❌", auto: "❌" },
    completed: { normal: "❌", approval: "❌", sendBack: "❌", review: "❌", auto: "❌" },
  };

  const branches = [
    {
      id: "normal",
      name: "NORMAL Transition",
      description: "Simple move. No approval. No automation.",
      icon: "➡️",
      uiRules: [
        "❌ Hide approval fields",
        "❌ Hide autoTrigger",
        "❌ Do NOT allow: APPROVER_ONLY, SYSTEM_ONLY",
        "✅ Show Trigger Strategy",
        "✅ Allow: ANY_ALLOWED, ALL_ALLOWED, CREATOR_ONLY, ASSIGNEE_ONLY",
        "✅ Show Permissions: allowedRoleIds, allowedUserIds"
      ],
      toStageExamples: "From UNDER_REVIEW → Allow: REJECTED, ON_HOLD, NORMAL"
    },
    {
      id: "approval",
      name: "APPROVAL Transition",
      description: "Decision gate before moving.",
      icon: "🛡️",
      uiRules: [
        "✅ Force: triggerStrategy = APPROVER_ONLY",
        "❌ Hide trigger selector",
        "❌ Hide allowed roles/users (they come from approval config)",
        "✅ Show Approval Settings",
        "✅ Approval Strategy: ALL, ANY, MAJORITY",
        "✅ Approval Mode: PARALLEL, SEQUENTIAL",
        "✅ Approval Levels: Each must have roleIds OR userIds"
      ],
      validationRules: [
        "If mode = SEQUENTIAL → ❌ Disable MAJORITY",
        "If no levels → ❌ Show error",
        "Allowed To Stages: APPROVAL, COMPLETED"
      ]
    },
    {
      id: "sendBack",
      name: "SEND_BACK Transition",
      description: "Rollback / correction / rejection.",
      icon: "↩️",
      uiRules: [
        "❌ No approval fields",
        "❌ No autoTrigger",
        "❌ Do NOT allow: SYSTEM_ONLY",
        "✅ Show Trigger Strategy",
        "✅ Allow: ANY_ALLOWED, ALL_ALLOWED, CREATOR_ONLY, ASSIGNEE_ONLY, APPROVER_ONLY",
        "✅ Show Permissions: allowedRoleIds, allowedUserIds",
        "✅ To Stage must go backward: DRAFT, SUBMITTED, CORRECTION, REJECTED",
        "❌ Never: APPROVAL, COMPLETED"
      ]
    },
    {
      id: "review",
      name: "REVIEW Transition",
      description: "Action without stage change.",
      icon: "👁️",
      uiRules: [
        "✅ Force: toStageId = fromStageId",
        "❌ Hide approval",
        "❌ Hide auto",
        "❌ Do NOT allow: SYSTEM_ONLY",
        "✅ Show Trigger Strategy",
        "✅ Allow: ANY_ALLOWED, ALL_ALLOWED, CREATOR_ONLY, ASSIGNEE_ONLY",
        "✅ Use cases: Comment, Audit, Re-check, Log action"
      ]
    },
    {
      id: "auto",
      name: "AUTO Transition",
      description: "System decides.",
      icon: "🤖",
      uiRules: [
        "✅ Force: triggerStrategy = SYSTEM_ONLY",
        "✅ Force: autoTrigger = true",
        "❌ Hide: Approval settings, Trigger selector, Allowed roles/users",
        "✅ To Stages allowed: SUBMITTED, UNDER_REVIEW, ON_HOLD, COMPLETED (only from APPROVAL)"
      ]
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Workflow Rulebook
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="min-w-7xl max-h-[95vh] p-0 overflow-hidden">
        <DialogHeader className="px-8 py-6 border-b bg-gradient-to-r from-blue-50 to-indigo-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Workflow className="h-8 w-8 text-blue-700" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Workflow Rulebook
              </DialogTitle>
              <p className="text-sm text-gray-700 mt-1">
                Complete Guide to Stages, Transitions, Approvals & Permissions
              </p>
            </div>
            {/* <Badge variant="outline" className="bg-white">
              v2.1 Production
            </Badge> */}
          </div>
        </DialogHeader>

        <Tabs defaultValue="decision-tree" className="h-full">
          <div className="border-b bg-white">
            <TabsList className="h-14 px-8 bg-transparent">
              <TabsTrigger value="decision-tree" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold">
                <TreeDeciduous className="h-4 w-4" />
                UI Decision Tree
              </TabsTrigger>
              <TabsTrigger value="matrix" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold">
                <Table className="h-4 w-4" />
                Transition Matrix
              </TabsTrigger>
              <TabsTrigger value="basics" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold">
                <Play className="h-4 w-4" />
                What is Workflow?
              </TabsTrigger>
              <TabsTrigger value="blocks" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold">
                <Settings className="h-4 w-4" />
                Building Blocks
              </TabsTrigger>
              <TabsTrigger value="stages" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold">
                <Flag className="h-4 w-4" />
                Stage Rules
              </TabsTrigger>
              <TabsTrigger value="transitions" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold">
                <GitBranch className="h-4 w-4" />
                Transitions
              </TabsTrigger>
              <TabsTrigger value="approvals" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold">
                <ShieldCheck className="h-4 w-4" />
                Approvals
              </TabsTrigger>
              <TabsTrigger value="permissions" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold">
                <LockKeyhole className="h-4 w-4" />
                Permissions
              </TabsTrigger>
              <TabsTrigger value="validation" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold">
                <CheckCircle className="h-4 w-4" />
                Validation
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[calc(95vh-12rem)]">
            <div className="px-8 py-6">
             
              {/* UI DECISION TREE TAB */}
              <TabsContent value="decision-tree" className="space-y-8">
                <section className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold flex items-center gap-3 mb-4">
                      <TreeDeciduous className="h-6 w-6 text-green-700" />
                      🌳 Workflow Builder — UI Decision Tree
                    </h3>
                    <p className="text-gray-700 mb-4">
                      This tree starts from what the user actually does in the UI.
                    </p>
                  </div>
                 
                  {/* STEP 1 - Select From Stage */}
                  <div className="border rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 border-b">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-lg">
                          1
                        </div>
                        <div>
                          <h4 className="text-lg font-bold">STEP 1 — User selects From Stage</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            👉 You already know: <strong>fromStage.category</strong>
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-700">
                        Everything else depends on this.
                      </p>
                    </div>
                  </div>
                 
                  {/* STEP 2 - Transition Types Allowed */}
                  <div className="border rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 border-b">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-lg">
                          2
                        </div>
                        <div>
                          <h4 className="text-lg font-bold">STEP 2 — Decide Which Transition Types are allowed</h4>
                          <p className="text-sm text-purple-700 mt-1">
                            Use this table to show/hide transition type buttons.
                          </p>
                        </div>
                      </div>
                    </div>
                   
                    <div className="p-5">
                      <h5 className="font-bold mb-4">Transition Types allowed by Stage Category</h5>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="text-left py-3 px-4 font-semibold">From Category</th>
                              <th className="text-left py-3 px-4 font-semibold text-center">NORMAL</th>
                              <th className="text-left py-3 px-4 font-semibold text-center">APPROVAL</th>
                              <th className="text-left py-3 px-4 font-semibold text-center">SEND_BACK</th>
                              <th className="text-left py-3 px-4 font-semibold text-center">REVIEW</th>
                              <th className="text-left py-3 px-4 font-semibold text-center">AUTO</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {Object.entries(transitionTypeRules).map(([category, rules]) => (
                              <tr key={category} className="hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium">
                                  <Badge variant="outline" className="uppercase">
                                    {category}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`text-lg ${rules.normal === "✅" ? "text-green-600" : rules.normal === "⚠️" ? "text-amber-600" : "text-red-600"}`}>
                                    {rules.normal}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`text-lg ${rules.approval === "✅" ? "text-green-600" : rules.approval === "⚠️" ? "text-amber-600" : "text-red-600"}`}>
                                    {rules.approval}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`text-lg ${rules.sendBack === "✅" ? "text-green-600" : rules.sendBack === "⚠️" ? "text-amber-600" : "text-red-600"}`}>
                                    {rules.sendBack}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`text-lg ${rules.review === "✅" ? "text-green-600" : rules.review === "⚠️" ? "text-amber-600" : "text-red-600"}`}>
                                    {rules.review}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`text-lg ${rules.auto === "✅" ? "text-green-600" : rules.auto === "⚠️" ? "text-amber-600" : "text-red-600"}`}>
                                    {rules.auto}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded">
                        <p className="text-sm text-amber-800">
                          ⚠️ = allowed only for special cases (audit / pause / SLA / system flows)
                        </p>
                      </div>
                    </div>
                  </div>
                 
                  {/* STEP 3 - User selects Transition Type */}
                  <div className="border rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-50 to-amber-100 p-5 border-b">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold text-lg">
                          3
                        </div>
                        <div>
                          <h4 className="text-lg font-bold">STEP 3 — User selects Transition Type</h4>
                          <p className="text-sm text-orange-700 mt-1">
                            Now the UI branches.
                          </p>
                        </div>
                      </div>
                    </div>
                   
                    <div className="p-5">
                      {/* Branch Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                        {branches.map((branch) => (
                          <Button
                            key={branch.id}
                            variant={activeBranch === branch.id ? "default" : "outline"}
                            className={`h-auto py-3 ${activeBranch === branch.id ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                            onClick={() => setActiveBranch(branch.id === activeBranch ? null : branch.id)}
                          >
                            <div className="text-center">
                              <div className="text-2xl mb-1">{branch.icon}</div>
                              <div className="text-xs font-medium">{branch.name.split(" ")[0]}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                     
                      {/* Branch Details */}
                      {activeBranch ? (
                        <div className="border rounded-lg p-5 bg-gradient-to-r from-gray-50 to-white">
                          {branches
                            .filter(branch => branch.id === activeBranch)
                            .map((branch) => (
                              <div key={branch.id} className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <div className="text-3xl">{branch.icon}</div>
                                  <div>
                                    <h5 className="text-lg font-bold">{branch.name}</h5>
                                    <p className="text-gray-600">{branch.description}</p>
                                  </div>
                                </div>
                               
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  <div>
                                    <h6 className="font-bold mb-2 flex items-center gap-2">
                                      <Layers className="h-4 w-4" />
                                      UI Rules
                                    </h6>
                                    <ul className="space-y-2">
                                      {branch.uiRules.map((rule, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm">
                                          {rule.startsWith("✅") ? (
                                            <Check className="h-4 w-4 text-green-600 mt-0.5" />
                                          ) : rule.startsWith("❌") ? (
                                            <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                                          ) : (
                                            <Circle className="h-4 w-4 text-gray-400 mt-0.5" />
                                          )}
                                          <span>{rule}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                 
                                  {branch.validationRules && (
                                    <div>
                                      <h6 className="font-bold mb-2 flex items-center gap-2">
                                        <Shield className="h-4 w-4" />
                                        Validation Rules
                                      </h6>
                                      <ul className="space-y-2">
                                        {branch.validationRules.map((rule, index) => (
                                          <li key={index} className="flex items-start gap-2 text-sm">
                                            {rule.includes("❌") ? (
                                              <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                                            ) : (
                                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                                            )}
                                            <span>{rule}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                 
                                  {branch.toStageExamples && (
                                    <div className="lg:col-span-2">
                                      <h6 className="font-bold mb-2">To Stage Options Example:</h6>
                                      <div className="text-sm p-3 bg-blue-50 border border-blue-200 rounded">
                                        {branch.toStageExamples}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="text-center p-8 border rounded-lg bg-gradient-to-r from-gray-50 to-white">
                          <div className="text-4xl mb-4">👉</div>
                          <p className="text-gray-600">Click on a transition type to see its rules</p>
                        </div>
                      )}
                    </div>
                  </div>
                 
                  {/* STEP 4-6 - Decision Trees */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* STEP 4 - Trigger Strategy */}
                    <div className="border rounded-xl overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-100 p-4 border-b">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                            4
                          </div>
                          <h5 className="font-bold">STEP 4 — Trigger Strategy Decision Tree</h5>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="font-mono text-sm bg-gray-900 text-gray-100 p-3 rounded mb-3">
                          {`IF type = APPROVAL\n   trigger = APPROVER_ONLY (forced)\n\nELSE IF type = AUTO\n   trigger = SYSTEM_ONLY (forced)\n\nELSE\n   allow:\n     ANY_ALLOWED\n     ALL_ALLOWED\n     CREATOR_ONLY\n     ASSIGNEE_ONLY`}
                        </div>
                      </div>
                    </div>
                   
                    {/* STEP 5 - Approval Settings */}
                    <div className="border rounded-xl overflow-hidden">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-4 border-b">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 font-bold text-sm">
                            5
                          </div>
                          <h5 className="font-bold">STEP 5 — Approval Settings Decision Tree</h5>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="font-mono text-sm bg-gray-900 text-gray-100 p-3 rounded mb-3">
                          {`IF transitionType !== APPROVAL\n   hide approvalStrategy\n   hide approvalConfig\n\nELSE\n   show approvalStrategy\n   show approvalMode\n   show approvalLevels\n\n   IF mode = SEQUENTIAL\n      disable MAJORITY\n\n   IF no levels\n      show error`}
                        </div>
                      </div>
                    </div>
                   
                    {/* STEP 6 - Final Validation */}
                    <div className="border rounded-xl overflow-hidden">
                      <div className="bg-gradient-to-r from-red-50 to-rose-100 p-4 border-b">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-sm">
                            6
                          </div>
                          <h5 className="font-bold">STEP 6 — Final Validation Tree</h5>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                            <span>IF stage is COMPLETED → block all transitions</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                            <span>IF stage is REJECTED → block all transitions</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                            <span>IF type = REVIEW AND from !== to → error</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                            <span>IF type = AUTO AND trigger ≠ SYSTEM_ONLY → error</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                            <span>IF type = APPROVAL AND trigger ≠ APPROVER_ONLY → error</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                            <span>IF type = SEND_BACK AND approvalConfig exists → error</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                  {/* UI Flow Summary */}
                  <div className="border border-purple-200 rounded-xl p-6 bg-purple-50">
                    <h4 className="font-bold text-lg flex items-center gap-2 mb-4">
                      <LayoutDashboard className="h-5 w-5 text-purple-600" />
                      🎯 One-page UI Flow Summary
                    </h4>
                   
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="flex flex-col items-center space-y-4">
                          {[
                            "Select From Stage",
                            "↓",
                            "Read Category",
                            "↓",
                            "Show allowed Transition Types",
                            "↓",
                            "User selects Transition Type",
                            "↓",
                            "Apply rules for that type:\n   - force trigger?\n   - show approval?\n   - allow auto?",
                            "↓",
                            "Filter To Stages",
                            "↓",
                            "Show valid triggers",
                            "↓",
                            "Show valid permissions",
                            "↓",
                            "Validate",
                            "↓",
                            "Save"
                          ].map((step, index) => (
                            <div key={index} className="flex items-center">
                              <div className={`px-4 py-2 rounded-lg ${step.startsWith("Select") || step.startsWith("User") || step.includes("Apply rules") || step.startsWith("Save") ? "bg-white border border-purple-200 shadow-sm" : ""}`}>
                                <pre className="whitespace-pre-wrap font-sans">{step}</pre>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                 
                  {/* Mental Model */}
                  <div className="border border-blue-200 rounded-xl p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h4 className="font-bold text-lg flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                      🧠 Mental Model for Designers & Devs
                    </h4>
                   
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { term: "Stage category", meaning: "where you are", icon: "📍" },
                        { term: "Transition type", meaning: "how you move", icon: "➡️" },
                        { term: "Trigger strategy", meaning: "who can move", icon: "👤" },
                        { term: "Approval strategy", meaning: "how decisions are counted", icon: "✅" },
                        { term: "AUTO", meaning: "system moves", icon: "🤖" },
                        { term: "REVIEW", meaning: "no movement", icon: "👁️" },
                        { term: "SEND_BACK", meaning: "backward", icon: "↩️" },
                        { term: "APPROVAL", meaning: "decision gate", icon: "🛡️" },
                        { term: "NORMAL", meaning: "simple move", icon: "📤" },
                      ].map((item, index) => (
                        <div key={index} className="bg-white border rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{item.icon}</div>
                            <div>
                              <div className="font-semibold">{item.term}</div>
                              <div className="text-sm text-gray-600">{item.meaning}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                   
                    <div className="mt-6 p-4 bg-white border rounded-lg">
                      <div className="text-center text-sm font-medium text-gray-700">
                        This mental model helps everyone speak the same language
                      </div>
                    </div>
                  </div>
                </section>
              </TabsContent>

              {/* MATRIX TAB */}
              <TabsContent value="matrix" className="space-y-8">
                <section className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold flex items-center gap-3 mb-4">
                      <Table className="h-6 w-6 text-blue-700" />
                      Transition Matrix - How to Read This
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-bold">Design Process:</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 bg-white border rounded-lg">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold">
                              1
                            </div>
                            <div>
                              <p className="font-medium">Pick a Stage Category</p>
                              <p className="text-sm text-gray-600">Where the record is now</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-white border rounded-lg">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold">
                              2
                            </div>
                            <div>
                              <p className="font-medium">Add a Transition from this stage</p>
                              <p className="text-sm text-gray-600">Define how it moves</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-white border rounded-lg">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold">
                              3
                            </div>
                            <div>
                              <p className="font-medium">Choose:</p>
                              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                                <li>• To category</li>
                                <li>• Transition Type</li>
                                <li>• Trigger strategy</li>
                                <li>• Approval settings (if any)</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-blue-700 font-medium">
                          This matrix tells you what is allowed at step 3.
                        </p>
                      </div>
                     
                      <div className="space-y-4">
                        <h4 className="font-bold">LEGEND</h4>
                        <div className="space-y-3">
                          <div>
                            <h5 className="font-medium mb-2">Transition Types</h5>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { type: "NORMAL", desc: "simple move", icon: "➡️" },
                                { type: "APPROVAL", desc: "needs decision", icon: "🛡️" },
                                { type: "SEND_BACK", desc: "rollback", icon: "↩️" },
                                { type: "REVIEW", desc: "same stage", icon: "👁️" },
                                { type: "AUTO", desc: "system moves", icon: "🤖" },
                              ].map((item) => (
                                <div key={item.type} className="flex items-center gap-2 p-2 border rounded">
                                  <span>{item.icon}</span>
                                  <div>
                                    <div className="text-xs font-medium">{item.type}</div>
                                    <div className="text-xs text-gray-500">{item.desc}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                         
                          <div>
                            <h5 className="font-medium mb-2">Status Indicators</h5>
                            <div className="flex items-center gap-4">
                              {[
                                { status: "✅", meaning: "Allowed" },
                                { status: "❌", meaning: "Not allowed" },
                                { status: "⚠️", meaning: "Allowed only with conditions" },
                              ].map((item) => (
                                <div key={item.status} className="flex items-center gap-2">
                                  <span className="text-lg">{item.status}</span>
                                  <span className="text-sm">{item.meaning}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                  {/* Master Rules */}
                  <div className="border border-amber-200 rounded-xl p-5 bg-amber-50">
                    <h4 className="font-bold text-lg flex items-center gap-2 mb-4">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      MASTER RULES (apply everywhere)
                    </h4>
                    <p className="text-sm text-amber-800 mb-3">
                      These override everything above:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "APPROVAL → trigger must be APPROVER_ONLY",
                        "AUTO → trigger must be SYSTEM_ONLY",
                        "AUTO → ❌ no approval",
                        "SEND_BACK → ❌ no approval",
                        "REVIEW → ❌ no approval",
                        "COMPLETED stage → ❌ no forward transitions",
                        "REVIEW → fromStage = toStage",
                      ].map((rule, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-white border rounded">
                          <Ban className="h-4 w-4 text-amber-600 mt-0.5" />
                          <span className="text-sm">{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                 
                  {/* Terminal Stages */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-red-200 rounded-xl p-5 bg-red-50">
                      <h4 className="font-bold text-lg flex items-center gap-2 mb-3">
                        <XCircle className="h-5 w-5 text-red-600" />
                        7️⃣ From REJECTED
                      </h4>
                      <p className="text-red-700 mb-2">
                        <strong>Meaning:</strong> final decision
                      </p>
                      <div className="text-center p-3 bg-white border border-red-200 rounded mb-3">
                        <p className="font-mono text-sm">ANY → ❌ ❌ ❌ ❌ ❌</p>
                      </div>
                      <p className="text-sm text-red-800">
                        <strong>➡ REJECTED is terminal</strong><br/>
                        Only allowed if you explicitly design a Reopen flow.
                      </p>
                    </div>
                   
                    <div className="border border-green-200 rounded-xl p-5 bg-green-50">
                      <h4 className="font-bold text-lg flex items-center gap-2 mb-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        8️⃣ From COMPLETED
                      </h4>
                      <p className="text-green-700 mb-2">
                        <strong>Meaning:</strong> process finished
                      </p>
                      <div className="text-center p-3 bg-white border border-green-200 rounded mb-3">
                        <p className="font-mono text-sm">ANY → ❌ ❌ ❌ ❌ ❌</p>
                      </div>
                      <p className="text-sm text-green-800">
                        <strong>➡ COMPLETED is terminal</strong><br/>
                        Only SEND_BACK / REVIEW if you intentionally allow auditing.
                      </p>
                    </div>
                  </div>
                 
                  {/* UI Flow Integration */}
                  <div className="border border-blue-200 rounded-xl p-5 bg-blue-50">
                    <h4 className="font-bold text-lg flex items-center gap-2 mb-4">
                      <Sliders className="h-5 w-5 text-blue-600" />
                      How This Fits Your UI Flow
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white border rounded">
                          <Eye className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">When user is in Transitions step:</p>
                          <ol className="text-sm text-gray-700 mt-2 space-y-2 list-decimal list-inside">
                            <li>They select <strong>From Stage</strong></li>
                            <li>You read its <strong>Category</strong></li>
                            <li>You show only:
                              <ul className="ml-6 mt-1 space-y-1">
                                <li>• Valid Transition Types</li>
                                <li>• Valid To Categories</li>
                              </ul>
                            </li>
                            <li>Then unlock:
                              <ul className="ml-6 mt-1 space-y-1">
                                <li>• TriggerStrategy options</li>
                                <li>• Approval settings (only if APPROVAL)</li>
                              </ul>
                            </li>
                          </ol>
                        </div>
                      </div>
                     
                      <Separator />
                     
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-white border rounded">
                          <Filter className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <p className="font-medium">Your frontend filters</p>
                        </div>
                        <div className="text-center p-4 bg-white border rounded">
                          <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <p className="font-medium">Your backend validators</p>
                        </div>
                        <div className="text-center p-4 bg-white border rounded">
                          <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                          <p className="font-medium">Your developer handbook</p>
                        </div>
                      </div>
                     
                      <div className="mt-4 p-3 bg-white border rounded">
                        <p className="text-center font-medium">
                          This matrix becomes your business rulebook
                        </p>
                      </div>
                    </div>
                  </div>
                 
                  {/* Mental Model */}
                  <div className="border border-purple-200 rounded-xl p-5 bg-purple-50">
                    <h4 className="font-bold text-lg flex items-center gap-2 mb-3">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      One-line Mental Model
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        { title: "Stage category", desc: "tells where you are", icon: "📍" },
                        { title: "Transition type", desc: "tells how you move", icon: "➡️" },
                        { title: "Trigger strategy", desc: "tells who can move", icon: "👤" },
                        { title: "Approval strategy", desc: "tells how decisions are counted", icon: "✅" },
                      ].map((item, index) => (
                        <div key={index} className="text-center p-4 bg-white border rounded">
                          <div className="text-2xl mb-2">{item.icon}</div>
                          <h5 className="font-medium mb-1">{item.title}</h5>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
               
                {/* Transition Matrices */}
                <section className="space-y-8">
                  <h3 className="text-xl font-bold">Transition Matrix by Category</h3>
                 
                  {matrixData.map((category, index) => (
                    <div key={index} className="border rounded-xl overflow-hidden">
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b">
                        <h4 className="font-bold text-lg flex items-center gap-2">
                          <span className="text-xl">{index + 1}️⃣</span>
                          From {category.from}
                          <Badge variant="outline" className="ml-2">
                            {category.meaning}
                          </Badge>
                        </h4>
                      </div>
                     
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="text-left py-3 px-4 font-semibold">To Category</th>
                              <th className="text-left py-3 px-4 font-semibold text-center">NORMAL</th>
                              <th className="text-left py-3 px-4 font-semibold text-center">APPROVAL</th>
                              <th className="text-left py-3 px-4 font-semibold text-center">SEND_BACK</th>
                              <th className="text-left py-3 px-4 font-semibold text-center">REVIEW</th>
                              <th className="text-left py-3 px-4 font-semibold text-center">AUTO</th>
                              <th className="text-left py-3 px-4 font-semibold">Why</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {category.rules.map((rule, ruleIndex) => (
                              <tr key={ruleIndex} className="hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium">
                                  <Badge variant="outline">{rule.to}</Badge>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`text-lg ${rule.normal === "✅" ? "text-green-600" : rule.normal === "⚠️" ? "text-amber-600" : "text-red-600"}`}>
                                    {rule.normal}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`text-lg ${rule.approval === "✅" ? "text-green-600" : rule.approval === "⚠️" ? "text-amber-600" : "text-red-600"}`}>
                                    {rule.approval}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`text-lg ${rule.sendBack === "✅" ? "text-green-600" : rule.sendBack === "⚠️" ? "text-amber-600" : "text-red-600"}`}>
                                    {rule.sendBack}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`text-lg ${rule.review === "✅" ? "text-green-600" : rule.review === "⚠️" ? "text-amber-600" : "text-red-600"}`}>
                                    {rule.review}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`text-lg ${rule.auto === "✅" ? "text-green-600" : rule.auto === "⚠️" ? "text-amber-600" : "text-red-600"}`}>
                                    {rule.auto}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-gray-600">
                                  {rule.why}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </section>
              </TabsContent>

              {/* BASICS TAB */}
              <TabsContent value="basics" className="space-y-8">
                <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold flex items-center gap-3 mb-4">
                    <Workflow className="h-6 w-6 text-blue-700" />
                    What is a Workflow?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    A workflow defines the complete lifecycle of a record through:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { icon: <Flag className="h-5 w-5" />, title: "Stages", desc: "Where a record is in its life cycle" },
                      { icon: <GitBranch className="h-5 w-5" />, title: "Transitions", desc: "How it moves between stages" },
                      { icon: <Users className="h-5 w-5" />, title: "Who can act", desc: "Permissions & roles" },
                      { icon: <ShieldCheck className="h-5 w-5" />, title: "Approvals", desc: "When approval is needed" },
                      { icon: <Cpu className="h-5 w-5" />, title: "Automation", desc: "When the system acts automatically" },
                      { icon: <GitPullRequest className="h-5 w-5" />, title: "Flow Control", desc: "Rules and constraints" },
                    ].map((item, index) => (
                      <div key={index} className="bg-white border rounded-lg p-4 flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    Universal Workflow Rules
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="border border-green-200 rounded-xl p-5 bg-green-50">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <h4 className="font-bold text-green-800">✅ Always Required</h4>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-1" />
                          <span>Exactly <strong>1 initial stage</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-1" />
                          <span>Exactly <strong>1 final stage</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-1" />
                          <span>Every non-final stage must have at least one outgoing transition</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-1" />
                          <span>Final stage can only have SEND_BACK / REVIEW / AUTO transitions</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border border-red-200 rounded-xl p-5 bg-red-50">
                      <div className="flex items-center gap-3 mb-4">
                        <Ban className="h-6 w-6 text-red-600" />
                        <h4 className="font-bold text-red-800">❌ Never Allowed</h4>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-600 mt-1" />
                          <span>Cycles in forward flow (except SEND_BACK)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-600 mt-1" />
                          <span>Approval fields on non-APPROVAL transitions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-600 mt-1" />
                          <span>AUTO transitions with approval config</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-600 mt-1" />
                          <span>APPROVER_ONLY on non-APPROVAL transitions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </TabsContent>

              {/* BUILDING BLOCKS TAB */}
              <TabsContent value="blocks" className="space-y-8">
                <section className="space-y-6">
                  <h3 className="text-xl font-bold">Core Building Blocks</h3>
                 
                  <div className="space-y-6">
                    <div className="border rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Flag className="h-5 w-5 text-purple-600" />
                        </div>
                        <h4 className="text-lg font-bold">Stage Categories</h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-semibold bg-gray-50">Category</th>
                              <th className="text-left py-3 px-4 font-semibold bg-gray-50">Meaning</th>
                              <th className="text-left py-3 px-4 font-semibold bg-gray-50">Color Code</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {[
                              { category: "DRAFT", meaning: "Work not yet submitted", color: "🔵", bg: "bg-blue-100" },
                              { category: "SUBMITTED", meaning: "Ready for processing", color: "🟡", bg: "bg-yellow-100" },
                              { category: "UNDER_REVIEW", meaning: "Being reviewed", color: "🟠", bg: "bg-orange-100" },
                              { category: "APPROVAL", meaning: "Waiting for approval", color: "🟣", bg: "bg-purple-100" },
                              { category: "CORRECTION", meaning: "Needs fixes", color: "🔴", bg: "bg-red-100" },
                              { category: "ON_HOLD", meaning: "Temporarily paused", color: "⚪", bg: "bg-gray-100" },
                              { category: "REJECTED", meaning: "Stopped permanently", color: "⚫", bg: "bg-gray-800 text-white" },
                              { category: "NORMAL", meaning: "Regular working state", color: "🟤", bg: "bg-amber-100" },
                              { category: "COMPLETED", meaning: "Finished (final)", color: "🟢", bg: "bg-green-100" },
                            ].map((item, index) => (
                              <tr key={index}>
                                <td className="py-3 px-4">
                                  <Badge className={`${item.bg} border-0`}>
                                    {item.category}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4">{item.meaning}</td>
                                <td className="py-3 px-4 text-2xl">{item.color}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="border rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <GitBranch className="h-5 w-5 text-green-600" />
                          </div>
                          <h4 className="text-lg font-bold">Transition Types</h4>
                        </div>
                        <div className="space-y-3">
                          {[
                            { type: "NORMAL", purpose: "Simple forward move", icon: "➡️" },
                            { type: "APPROVAL", purpose: "Needs approval to proceed", icon: "🛡️" },
                            { type: "SEND_BACK", purpose: "Rollback / correction", icon: "↩️" },
                            { type: "REVIEW", purpose: "Review without stage change", icon: "👁️" },
                            { type: "AUTO", purpose: "System-triggered move", icon: "🤖" },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <span className="text-lg">{item.icon}</span>
                                <Badge variant="outline">{item.type}</Badge>
                              </div>
                              <span className="text-sm text-gray-600">{item.purpose}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <UserCheck className="h-5 w-5 text-blue-600" />
                          </div>
                          <h4 className="text-lg font-bold">Trigger Strategies</h4>
                        </div>
                        <div className="space-y-3">
                          {[
                            { strategy: "ANY_ALLOWED", who: "Anyone (subject to role rules)" },
                            { strategy: "ALL_ALLOWED", who: "Everyone must act" },
                            { strategy: "CREATOR_ONLY", who: "Only creator" },
                            { strategy: "ASSIGNEE_ONLY", who: "Only assignee" },
                            { strategy: "APPROVER_ONLY", who: "Only approvers" },
                            { strategy: "SYSTEM_ONLY", who: "Only system" },
                          ].map((item, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="font-mono text-sm font-semibold mb-1">{item.strategy}</div>
                              <div className="text-sm text-gray-600">{item.who}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <FileCheck className="h-5 w-5 text-red-600" />
                        </div>
                        <h4 className="text-lg font-bold">Approval Strategies</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { strategy: "ALL", rule: "Everyone must approve", icon: "👥" },
                          { strategy: "ANY", rule: "One approval is enough", icon: "👤" },
                          { strategy: "MAJORITY", rule: "More than half must approve", icon: "📊" },
                        ].map((item, index) => (
                          <div key={index} className="border rounded-lg p-4 text-center">
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <Badge className="mb-2">{item.strategy}</Badge>
                            <p className="text-sm text-gray-600">{item.rule}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </TabsContent>

              {/* STAGE RULES TAB */}
              <TabsContent value="stages" className="space-y-8">
                <section className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Flag className="h-5 w-5 text-blue-600" />
                    Category-Wise Stage Rules
                  </h3>
                  <p className="text-gray-600">
                    What you can do from each stage category
                  </p>
                </section>

                <Accordion type="multiple" className="space-y-4">
                  {[
                    {
                      category: "DRAFT",
                      color: "blue",
                      rules: [
                        { transition: "NORMAL → SUBMITTED", allowed: true },
                        { transition: "NORMAL → UNDER_REVIEW", allowed: true },
                        { transition: "APPROVAL → APPROVAL", allowed: false },
                        { transition: "SEND_BACK", allowed: false, note: "(already start)" },
                        { transition: "REVIEW", allowed: true, note: "(self)" },
                        { transition: "AUTO → SUBMITTED", allowed: true },
                      ]
                    },
                    {
                      category: "SUBMITTED",
                      color: "yellow",
                      rules: [
                        { transition: "NORMAL → UNDER_REVIEW", allowed: true },
                        { transition: "NORMAL → APPROVAL", allowed: false, note: "(must go via review)" },
                        { transition: "SEND_BACK → DRAFT", allowed: true },
                        { transition: "REVIEW", allowed: true },
                        { transition: "AUTO → UNDER_REVIEW", allowed: true },
                      ]
                    },
                    {
                      category: "UNDER_REVIEW",
                      color: "orange",
                      rules: [
                        { transition: "NORMAL → APPROVAL", allowed: true },
                        { transition: "SEND_BACK → CORRECTION", allowed: true },
                        { transition: "SEND_BACK → REJECTED", allowed: true },
                        { transition: "REVIEW", allowed: true },
                        { transition: "AUTO → APPROVAL", allowed: false },
                      ]
                    },
                    {
                      category: "APPROVAL",
                      color: "purple",
                      rules: [
                        { transition: "APPROVAL → COMPLETED", allowed: true },
                        { transition: "SEND_BACK → CORRECTION", allowed: true },
                        { transition: "SEND_BACK → REJECTED", allowed: true },
                        { transition: "REVIEW", allowed: false },
                        { transition: "AUTO", allowed: false },
                      ]
                    },
                    {
                      category: "CORRECTION",
                      color: "red",
                      rules: [
                        { transition: "NORMAL → SUBMITTED", allowed: true },
                        { transition: "NORMAL → UNDER_REVIEW", allowed: true },
                        { transition: "SEND_BACK → REJECTED", allowed: true },
                        { transition: "REVIEW", allowed: true },
                      ]
                    },
                    {
                      category: "ON_HOLD",
                      color: "gray",
                      rules: [
                        { transition: "NORMAL → UNDER_REVIEW", allowed: true },
                        { transition: "NORMAL → APPROVAL", allowed: false },
                        { transition: "AUTO → UNDER_REVIEW", allowed: true },
                        { transition: "SEND_BACK", allowed: false },
                      ]
                    },
                    {
                      category: "REJECTED",
                      color: "black",
                      rules: [
                        { transition: "NORMAL", allowed: false },
                        { transition: "SEND_BACK", allowed: false },
                        { transition: "REVIEW", allowed: false },
                        { transition: "AUTO", allowed: false },
                      ],
                      note: "Rejected is terminal (unless you design reopen flow)"
                    },
                    {
                      category: "COMPLETED",
                      color: "green",
                      rules: [{ transition: "Any", allowed: false }],
                      note: "Completed is final"
                    },
                  ].map((category, index) => (
                    <AccordionItem key={index} value={category.category} className="border rounded-lg">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <div className="flex items-center gap-3">
                          <Badge className={`${
                            category.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                            category.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                            category.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                            category.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                            category.color === 'red' ? 'bg-red-100 text-red-800' :
                            category.color === 'gray' ? 'bg-gray-100 text-gray-800' :
                            category.color === 'black' ? 'bg-gray-800 text-white' :
                            'bg-green-100 text-green-800'
                          } border-0`}>
                            {category.category}
                          </Badge>
                          <span className="font-semibold">Transition Rules</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-2">
                          {category.rules.map((rule, ruleIndex) => (
                            <div key={ruleIndex} className="flex items-center justify-between p-2 border rounded">
                              <span className="font-mono text-sm">{rule.transition}</span>
                              <div className="flex items-center gap-2">
                                {/* {rule.note && <span className="text-xs text-gray-500">{rule.note}</span>} */}
                                {rule.allowed ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        {category.note && (
                          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
                            ℹ️ {category.note}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              {/* TRANSITIONS TAB */}
              <TabsContent value="transitions" className="space-y-8">
                <section className="space-y-6">
                  <h3 className="text-xl font-bold">Transition Rules (Global)</h3>
                 
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        type: "NORMAL Transition",
                        icon: "➡️",
                        description: "Moves record forward",
                        rules: [
                          "No approval",
                          "No system-only",
                          "Allowed triggers: ANY_ALLOWED, CREATOR_ONLY, ASSIGNEE_ONLY, ALL_ALLOWED"
                        ]
                      },
                      {
                        type: "APPROVAL Transition",
                        icon: "🛡️",
                        description: "Blocks until approved",
                        rules: [
                          "Must have approvalStrategy",
                          "Must have approvalConfig.levels[]",
                          "Trigger must be APPROVER_ONLY"
                        ]
                      },
                      {
                        type: "SEND_BACK Transition",
                        icon: "↩️",
                        description: "Rolls record backward",
                        rules: [
                          "Used for correction / rejection",
                          "No approval config allowed"
                        ]
                      },
                      {
                        type: "REVIEW Transition",
                        icon: "👁️",
                        description: "Must be self-loop",
                        rules: [
                          "No stage change",
                          "No approval",
                          "Used for comments, reviews, checks"
                        ]
                      },
                      {
                        type: "AUTO Transition",
                        icon: "🤖",
                        description: "System-triggered",
                        rules: [
                          "Trigger must be SYSTEM_ONLY",
                          "No approval config",
                          "No allowed users/roles",
                          "Used for automation"
                        ]
                      },
                    ].map((transition, index) => (
                      <div key={index} className="border rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-2xl">{transition.icon}</div>
                          <div>
                            <h4 className="font-bold text-lg">{transition.type}</h4>
                            <p className="text-sm text-gray-600">{transition.description}</p>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {transition.rules.map((rule, ruleIndex) => (
                            <li key={ruleIndex} className="flex items-start gap-2 text-sm">
                              <ChevronRight className="h-3 w-3 text-gray-400 mt-1" />
                              {rule}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="border border-blue-200 rounded-xl p-5 bg-blue-50">
                  <h4 className="font-bold text-lg flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                    Golden Rules (Memorize These)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      "❗ Only APPROVAL transitions have approval config",
                      "❗ AUTO is always SYSTEM_ONLY",
                      "❗ REVIEW never changes stage",
                      "❗ SEND_BACK always goes backward",
                      "❗ COMPLETED never moves",
                      "❗ REJECTED never revives",
                      "❗ NORMAL is your everyday working state"
                    ].map((rule, index) => (
                      <div key={index} className="bg-white border rounded-lg p-3 flex items-start gap-2">
                        <div className="text-yellow-500 font-bold">!</div>
                        <span className="text-sm">{rule}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </TabsContent>

              {/* APPROVALS TAB */}
              <TabsContent value="approvals" className="space-y-8">
                <section className="space-y-6">
                  <h3 className="text-xl font-bold">Approval System – How it Works</h3>
                 
                  <div className="border rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-6">
                      <Settings className="h-6 w-6 text-purple-600" />
                      <h4 className="text-lg font-bold">Approval Configuration</h4>
                    </div>
                   
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-4">
                      <pre>{`approvalConfig = {
  mode: "PARALLEL" | "SEQUENTIAL",
  levels: [
    { order: 1, roleIds: [], userIds: [] },
    { order: 2, roleIds: [], userIds: [] }
  ]
}`}</pre>
                    </div>
                   
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="h-5 w-5 text-green-600" />
                          <h5 className="font-bold">🔹 PARALLEL</h5>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Everyone in level can approve anytime.</p>
                        <p className="text-sm text-gray-600">Strategy decides outcome.</p>
                        <div className="mt-3 p-2 bg-green-50 rounded">
                          <p className="text-xs font-semibold text-green-800">Use when:</p>
                          <ul className="text-xs text-green-700 mt-1 list-disc list-inside">
                            <li>Committee decisions</li>
                            <li>Peer reviews</li>
                            <li>Any order is fine</li>
                          </ul>
                        </div>
                      </div>
                     
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <ListOrdered className="h-5 w-5 text-blue-600" />
                          <h5 className="font-bold">🔹 SEQUENTIAL</h5>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Level 1 must finish → then Level 2 → etc.</p>
                        <p className="text-sm text-gray-600">Rejection at any level stops workflow.</p>
                        <div className="mt-3 p-2 bg-blue-50 rounded">
                          <p className="text-xs font-semibold text-blue-800">Use when:</p>
                          <ul className="text-xs text-blue-700 mt-1 list-disc list-inside">
                            <li>Manager → Director → CEO</li>
                            <li>Escalation paths</li>
                            <li>Tiered approvals</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                   
                    <Separator className="my-6" />
                   
                    <h5 className="font-bold mb-4">🔹 Strategy Resolution</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { strategy: "ALL", result: "All must approve", icon: "✅✅✅" },
                        { strategy: "ANY", result: "First approval wins", icon: "✅🚫🚫" },
                        { strategy: "MAJORITY", result: "More than half approve", icon: "✅✅🚫" },
                      ].map((item, index) => (
                        <div key={index} className="border rounded-lg p-4 text-center">
                          <div className="text-2xl mb-2">{item.icon}</div>
                          <Badge className="mb-2">{item.strategy}</Badge>
                          <p className="text-sm">{item.result}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </TabsContent>

              {/* PERMISSIONS TAB */}
              <TabsContent value="permissions" className="space-y-8">
                <section className="space-y-6">
                  <h3 className="text-xl font-bold">Permission System</h3>
                 
                  <div className="border rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-6">
                      <LockKeyhole className="h-6 w-6 text-gray-700" />
                      <h4 className="text-lg font-bold">Trigger Strategy Logic</h4>
                    </div>
                   
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold bg-gray-50">Strategy</th>
                            <th className="text-left py-3 px-4 font-semibold bg-gray-50">Enforced by</th>
                            <th className="text-left py-3 px-4 font-semibold bg-gray-50">Example</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {[
                            { strategy: "SYSTEM_ONLY", enforced: "System jobs only", example: "Auto-archive after 30 days" },
                            { strategy: "CREATOR_ONLY", enforced: "Record creator", example: "Submit draft for review" },
                            { strategy: "ASSIGNEE_ONLY", enforced: "Assigned user", example: "Complete assigned task" },
                            { strategy: "APPROVER_ONLY", enforced: "Approval flow", example: "Approve purchase request" },
                            { strategy: "ANY_ALLOWED", enforced: "Role / user list", example: "Anyone in team can review" },
                          ].map((item, index) => (
                            <tr key={index}>
                              <td className="py-3 px-4 font-mono">{item.strategy}</td>
                              <td className="py-3 px-4">{item.enforced}</td>
                              <td className="py-3 px-4 text-gray-600">{item.example}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
               
                <section className="border rounded-xl p-5">
                  <h4 className="font-bold text-lg mb-4">Workflow Execution Flow (Runtime)</h4>
                  <div className="space-y-4">
                    {[
                      { step: "1. Start Workflow", actions: ["Instance created", "Initial stage set", "History written"] },
                      { step: "2. User Clicks Action", actions: ["Permission check", "Instance locked", "Transition validated"] },
                      { step: "3. If APPROVAL", actions: ["Approval entry created", "Strategy evaluated", "If approved → move stage"] },
                      { step: "4. If NORMAL / SEND_BACK", actions: ["Stage changes", "History saved"] },
                      { step: "5. If AUTO", actions: ["System moves stage", "Repeats until no AUTO left"] },
                    ].map((item, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                            {index + 1}
                          </div>
                          <h5 className="font-bold">{item.step}</h5>
                        </div>
                        <ul className="space-y-1 ml-9">
                          {item.actions.map((action, actionIndex) => (
                            <li key={actionIndex} className="flex items-center gap-2 text-sm text-gray-600">
                              <Circle className="h-2 w-2 text-gray-400" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </TabsContent>

              {/* VALIDATION TAB */}
              <TabsContent value="validation" className="space-y-8">
                <section className="space-y-6">
                  <h3 className="text-xl font-bold">Graph Validation Rules</h3>
                  <p className="text-gray-600">
                    Before publish, system validates these rules:
                  </p>
                 
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { rule: "✔ One initial stage", icon: "🚀" },
                      { rule: "✔ One final stage", icon: "🏁" },
                      { rule: "✔ No cycles", icon: "🌀" },
                      { rule: "✔ All stages reachable", icon: "📍" },
                      { rule: "✔ No dead-ends", icon: "⛔" },
                      { rule: "✔ Final stage has no outgoing", icon: "🔚" },
                      { rule: "✔ Approval fields only on APPROVAL", icon: "🛡️" },
                    ].map((item, index) => (
                      <div key={index} className="border rounded-lg p-4 flex items-center gap-3">
                        <div className="text-2xl">{item.icon}</div>
                        <span className="font-medium">{item.rule}</span>
                      </div>
                    ))}
                  </div>
                </section>
               
                <section className="border rounded-xl p-5">
                  <h4 className="font-bold text-lg mb-4">UI Builder Rules</h4>
                  <p className="text-gray-600 mb-4">What your code enforces:</p>
                 
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold bg-gray-50">UI Action</th>
                          <th className="text-left py-3 px-4 font-semibold bg-gray-50">What system does</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[
                          { action: "Select APPROVAL", system: "Forces trigger = APPROVER_ONLY" },
                          { action: "Change from APPROVAL → NORMAL", system: "Clears approval config" },
                          { action: "Select REVIEW", system: "Forces self-loop" },
                          { action: "Select AUTO", system: "Forces SYSTEM_ONLY + clears approval" },
                          { action: "Remove approval", system: "Clears levels & strategy" },
                          { action: "Levels missing", system: "Auto-adds Level 1" },
                        ].map((item, index) => (
                          <tr key={index}>
                            <td className="py-3 px-4 font-medium">{item.action}</td>
                            <td className="py-3 px-4 text-gray-600">{item.system}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
               
                <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-4">Layman Explanation</h4>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📁</div>
                    <div>
                      <p className="text-gray-700 mb-3">
                        Think of your workflow like an office file:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                        {[
                          { stage: "Draft", desc: "you write it" },
                          { stage: "Submitted", desc: "you hand it in" },
                          { stage: "Under Review", desc: "someone checks it" },
                          { stage: "Approval", desc: "boss signs it" },
                          { stage: "Completed", desc: "work done" },
                          { stage: "Correction", desc: "fix mistakes" },
                          { stage: "Rejected", desc: "file closed" },
                          { stage: "On Hold", desc: "waiting" },
                        ].map((item, index) => (
                          <div key={index} className="bg-white border rounded p-2">
                            <div className="font-medium">{item.stage}</div>
                            <div className="text-xs text-gray-500">{item.desc}</div>
                          </div>
                        ))}
                      </div>
                      <p className="text-gray-700">
                        Each button you see is a transition. Each button has rules about:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                        <li>Who can press it</li>
                        <li>Whether approval is needed</li>
                        <li>Where the file goes next</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
