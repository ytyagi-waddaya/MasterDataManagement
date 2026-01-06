// app/components/workflow/WorkflowCreationGuide.tsx
"use client";

import React from "react";
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
} from "lucide-react";

interface WorkflowCreationGuideProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function WorkflowBuilderGuide({
  open,
  onOpenChange,
  children,
}: WorkflowCreationGuideProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="gap-2">
            <HelpCircle className="h-4 w-4" />
            Workflow Guide
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="min-w-6xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="px-8 py-6 border-b bg-linear-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Terminal className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Workflow Creation Guide
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                Production-ready workflows for everyone — no technical knowledge required
              </p>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="basics" className="h-full">
          <div className="border-b">
            <TabsList className="h-14 px-8 bg-transparent">
              <TabsTrigger value="basics" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                <Play className="h-4 w-4" />
                Basics
              </TabsTrigger>
              <TabsTrigger value="stages" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                <Flag className="h-4 w-4" />
                Stages
              </TabsTrigger>
              <TabsTrigger value="transitions" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                <ArrowRight className="h-4 w-4" />
                Transitions
              </TabsTrigger>
              <TabsTrigger value="approvals" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                <Shield className="h-4 w-4" />
                Approvals
              </TabsTrigger>
              <TabsTrigger value="validation" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                <CheckCircle className="h-4 w-4" />
                Validation
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[calc(90vh-12rem)]">
            <div className="px-8 py-6">
              
              {/* BASICS TAB */}
              <TabsContent value="basics" className="space-y-6">
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    What Makes a Production-Ready Workflow?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Check className="h-5 w-5 text-green-600" />
                        <h4 className="font-semibold">Must Have</h4>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Circle className="h-3 w-3 text-green-500 mt-1" />
                          Every stage is reachable
                        </li>
                        <li className="flex items-start gap-2">
                          <Circle className="h-3 w-3 text-green-500 mt-1" />
                          No circular forward flows
                        </li>
                        <li className="flex items-start gap-2">
                          <Circle className="h-3 w-3 text-green-500 mt-1" />
                          Exactly one start and end
                        </li>
                        <li className="flex items-start gap-2">
                          <Circle className="h-3 w-3 text-green-500 mt-1" />
                          Clear approval paths
                        </li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <h4 className="font-semibold">Must Avoid</h4>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Circle className="h-3 w-3 text-red-500 mt-1" />
                          Dead ends (no exit)
                        </li>
                        <li className="flex items-start gap-2">
                          <Circle className="h-3 w-3 text-red-500 mt-1" />
                          Infinite loops
                        </li>
                        <li className="flex items-start gap-2">
                          <Circle className="h-3 w-3 text-red-500 mt-1" />
                          Unreachable stages
                        </li>
                        <li className="flex items-start gap-2">
                          <Circle className="h-3 w-3 text-red-500 mt-1" />
                          Orphaned approvals
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <Separator />

                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">The Two Building Blocks</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Flag className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Stages</h4>
                          <p className="text-sm text-gray-500">Steps in your process</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {["Draft", "Submitted", "Review", "Approved", "Completed"].map((stage, i) => (
                          <Badge 
                            key={stage} 
                            variant={i === 0 ? "default" : i === 4 ? "secondary" : "outline"}
                            className={i === 0 ? "bg-blue-600" : i === 4 ? "bg-green-600" : ""}
                          >
                            {stage}
                            {i === 0 && " (Initial)"}
                            {i === 4 && " (Final)"}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">
                        Think of stages as boxes where work sits. Each item can only be in one stage at a time.
                      </p>
                    </div>

                    <div className="border rounded-lg p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <ArrowRight className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Transitions</h4>
                          <p className="text-sm text-gray-500">Rules to move between stages</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">Draft</Badge>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          <Badge variant="outline">Submitted</Badge>
                          <span className="text-xs text-gray-500 ml-2">NORMAL</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">Submitted</Badge>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          <Badge variant="outline">Approved</Badge>
                          <span className="text-xs text-gray-500 ml-2">APPROVAL</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">Approved</Badge>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          <Badge variant="outline">Completed</Badge>
                          <span className="text-xs text-gray-500 ml-2">AUTO</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Transitions are the arrows that move work forward (or backward) through your process.
                      </p>
                    </div>
                  </div>
                </section>
              </TabsContent>

              {/* STAGES TAB */}
              <TabsContent value="stages" className="space-y-6">
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Flag className="h-5 w-5 text-blue-600" />
                    Creating Stages (The Right Way)
                  </h3>
                  <p className="text-gray-600">
                    Follow these rules strictly to avoid validation errors.
                  </p>
                </section>

                <div className="space-y-4">
                  {[
                    {
                      rule: "Rule 1 — Always create ONE start stage",
                      content: "Mark exactly one stage as Initial = true",
                      example: "Example: Draft Request",
                      icon: "1️⃣",
                      type: "required"
                    },
                    {
                      rule: "Rule 2 — Always create ONE final stage",
                      content: "Mark exactly one stage as Final = true",
                      example: "Example: Completed",
                      icon: "2️⃣",
                      type: "required"
                    },
                    {
                      rule: "Rule 3 — Final stage has NO forward transitions",
                      content: "From the final stage, no transitions are allowed forward",
                      details: "❌ No NORMAL ❌ No APPROVAL ❌ No AUTO ✔ Only allowed: none",
                      icon: "3️⃣",
                      type: "critical"
                    },
                    {
                      rule: "Rule 4 — Every non-final stage must have a way out",
                      content: "Each stage must have at least one transition going out",
                      details: "If a stage has no exit → ❌ error 'Stage X has no outgoing transitions'",
                      icon: "4️⃣",
                      type: "required"
                    },
                    {
                      rule: "Rule 5 — Rejected is NOT final",
                      content: "If you want correction later, create a correction loop",
                      details: "Rejected → Correction → Submitted So: Rejected ❌ not final Correction ❌ not final",
                      icon: "5️⃣",
                      type: "pattern"
                    }
                  ].map((item, index) => (
                    <div key={index} className={`border rounded-lg p-4 ${item.type === 'critical' ? 'border-red-200 bg-red-50' : ''}`}>
                      <div className="flex items-start gap-3">
                        <div className="text-xl">{item.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{item.rule}</h4>
                            {item.type === 'critical' && (
                              <Badge variant="destructive" className="text-xs">Critical</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{item.content}</p>
                          {item.details && (
                            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded mt-2">
                              {item.details}
                            </div>
                          )}
                          {item.example && (
                            <div className="text-xs text-blue-600 font-medium mt-2">
                              {item.example}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* TRANSITIONS TAB */}
              <TabsContent value="transitions" className="space-y-6">
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">Transition Types</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { type: "NORMAL", meaning: "User clicks a button", color: "blue" },
                      { type: "APPROVAL", meaning: "Needs approval", color: "amber" },
                      { type: "SEND_BACK", meaning: "Goes backward", color: "orange" },
                      { type: "REVIEW", meaning: "Comment only (no move)", color: "purple" },
                      { type: "AUTO", meaning: "System moves it", color: "green" },
                    ].map((item) => (
                      <div key={item.type} className="border rounded-lg p-4">
                        <Badge 
                          className={`mb-2 ${
                            item.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                            item.color === 'amber' ? 'bg-amber-100 text-amber-800' :
                            item.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                            item.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
                          }`}
                        >
                          {item.type}
                        </Badge>
                        <p className="text-sm">{item.meaning}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <Separator />

                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">Golden Rules for Transitions</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="p-2 bg-blue-100 rounded">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Rule 1 — Every stage must be reachable</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          From the initial stage, you must be able to reach every other stage by following transitions.
                        </p>
                        <div className="text-xs text-red-600 bg-red-50 p-2 rounded mt-2">
                          If any stage cannot be reached → ❌ error "Unreachable stages: X"
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="p-2 bg-red-100 rounded">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Rule 2 — No forward loops</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          You must NOT create circular forward flows.
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <span className="text-red-600">❌ A → B → C → A</span>
                          <span className="text-gray-400">(Not allowed)</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                          <span className="text-green-600">✔ C → B (SEND_BACK)</span>
                          <span className="text-gray-400">(Allowed)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="p-2 bg-green-100 rounded">
                        <RefreshCw className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Rule 3 — SEND_BACK does NOT count as forward flow</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          SEND_BACK transitions are allowed for corrections and are not counted in cycle checks.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </TabsContent>

              {/* APPROVALS TAB */}
              <TabsContent value="approvals" className="space-y-6">
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Approval Rules (Industry Grade)
                  </h3>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900">
                          When to Use APPROVAL Transitions
                        </h4>
                        <ul className="list-disc list-inside text-sm text-blue-700 mt-2 space-y-1">
                          <li>Manager must approve</li>
                          <li>Finance must approve</li>
                          <li>Any formal decision is needed</li>
                          <li>Compliance requirements exist</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="font-semibold">Approval Configuration</h4>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <h5 className="font-medium">Approval always needs at least ONE level</h5>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Even for PARALLEL approvals, you MUST define levels:
                    </p>
                    <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                      {`levels: [\n  { order: 1, roleIds: [...], userIds: [...] }\n]`}
                    </div>
                    <p className="text-xs text-red-600 mt-2">
                      No levels → ❌ backend error
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-4 w-4 text-green-600" />
                        <h5 className="font-medium">Parallel Approvals</h5>
                      </div>
                      <p className="text-sm text-gray-600">
                        Everyone approves together. Use when:
                      </p>
                      <ul className="list-disc list-inside text-xs text-gray-600 mt-2 space-y-1">
                        <li>Committee approval</li>
                        <li>Manager group approval</li>
                        <li>Department consensus</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <ListOrdered className="h-4 w-4 text-blue-600" />
                        <h5 className="font-medium">Sequential Approvals</h5>
                      </div>
                      <p className="text-sm text-gray-600">
                        One after another. Use when:
                      </p>
                      <ul className="list-disc list-inside text-xs text-gray-600 mt-2 space-y-1">
                        <li>Manager → Director → CEO</li>
                        <li>Tiered approval process</li>
                        <li>Escalation paths</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Correction Loop (Safe Pattern)
                  </h4>
                  
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-3">
                      Always use this structure for rejection handling:
                    </p>
                    
                    <div className="flex flex-col items-center space-y-2">
                      <div className="text-center">
                        <Badge variant="outline">Manager Review</Badge>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-xs text-green-600 mb-1">Approve</div>
                          <ArrowRight className="h-4 w-4 mx-auto rotate-90" />
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-red-600 mb-1">Reject</div>
                          <ArrowRight className="h-4 w-4 mx-auto rotate-90" />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <Badge variant="secondary">Next Stage</Badge>
                        </div>
                        <div className="text-center">
                          <Badge variant="outline">Rejected</Badge>
                        </div>
                      </div>
                      <div className="text-center">
                        <ArrowRight className="h-4 w-4 rotate-90" />
                      </div>
                      <div className="text-center">
                        <Badge variant="outline">Correction</Badge>
                      </div>
                      <div className="text-center">
                        <ArrowRight className="h-4 w-4 rotate-90" />
                      </div>
                      <div className="text-center">
                        <Badge variant="outline">Submitted</Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm">
                      <p className="font-medium mb-2">Required transitions:</p>
                      <ol className="list-decimal list-inside space-y-1 text-gray-600">
                        <li>Manager Review → Rejected (APPROVAL)</li>
                        <li>Rejected → Correction (NORMAL or SEND_BACK)</li>
                        <li>Correction → Submitted (NORMAL)</li>
                      </ol>
                    </div>
                  </div>
                </section>
              </TabsContent>

              {/* VALIDATION TAB */}
              <TabsContent value="validation" className="space-y-6">
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Validation Checklist
                  </h3>
                  <p className="text-gray-600">
                    Before you click "Save Workflow", check these items:
                  </p>
                </section>

                <Accordion type="multiple" className="space-y-3">
                  <AccordionItem value="stage-checks" className="border rounded-lg">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4" />
                        <span>Stage Checks</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <ul className="space-y-2">
                        {[
                          "✅ Only one Initial stage",
                          "✅ Only one Final stage",
                          "✅ Final stage has NO forward transitions",
                          "✅ Every stage has at least one outgoing transition",
                          "✅ Rejected stages are not marked as final",
                          "✅ All stage names are unique",
                        ].map((check, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Check className="h-3 w-3 text-green-600" />
                            {check}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="transition-checks" className="border rounded-lg">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4" />
                        <span>Transition Checks</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <ul className="space-y-2">
                        {[
                          "✅ Every stage is reachable from Initial",
                          "✅ No NORMAL/APPROVAL forward loops",
                          "✅ SEND_BACK only used for backward moves",
                          "✅ REVIEW is self-loop (From = To)",
                          "✅ AUTO has SYSTEM_ONLY trigger",
                          "✅ No duplicate transitions between same stages",
                        ].map((check, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Check className="h-3 w-3 text-green-600" />
                            {check}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="approval-checks" className="border rounded-lg">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Approval Checks</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <ul className="space-y-2">
                        {[
                          "✅ Every APPROVAL has at least one level",
                          "✅ Each level has at least one role or user",
                          "✅ Mode chosen: PARALLEL or SEQUENTIAL",
                          "✅ Strategy defined: ALL/ANY/MAJORITY",
                          "✅ No approval from final stage",
                          "✅ Approval paths have correction loops",
                        ].map((check, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Check className="h-3 w-3 text-green-600" />
                            {check}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <section className="space-y-4">
                  <h4 className="font-semibold">Perfect Workflow Example</h4>
                  
                  <div className="border rounded-lg p-4 bg-linear-to-r from-gray-50 to-blue-50">
                    <div className="text-center space-y-1 font-mono text-sm">
                      <div>Draft</div>
                      <ArrowRight className="h-4 w-4 mx-auto" />
                      <div>Submit</div>
                      <ArrowRight className="h-4 w-4 mx-auto" />
                      <div>Manager Review</div>
                      <div className="flex justify-center gap-8 mt-2">
                        <div className="text-center">
                          <div className="text-xs text-green-600">Approve</div>
                          <ArrowRight className="h-4 w-4 mx-auto rotate-90" />
                          <div>Procurement</div>
                          <ArrowRight className="h-4 w-4 mx-auto rotate-90" />
                          <div>Finance</div>
                          <ArrowRight className="h-4 w-4 mx-auto rotate-90" />
                          <div>Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-red-600">Reject</div>
                          <ArrowRight className="h-4 w-4 mx-auto rotate-90" />
                          <div>Correction</div>
                          <ArrowRight className="h-4 w-4 mx-auto rotate-90" />
                          <div>Resubmit</div>
                          <ArrowRight className="h-4 w-4 mx-auto rotate-90" />
                          <div>Manager Review</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        { label: "Reachable", icon: "✅" },
                        { label: "No cycles", icon: "✅" },
                        { label: "No dead ends", icon: "✅" },
                        { label: "Production safe", icon: "✅" },
                      ].map((item, index) => (
                        <div key={index} className="text-center p-2 bg-white rounded border">
                          <div className="text-lg">{item.icon}</div>
                          <div className="text-xs">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Golden Rule to Remember
                  </h4>
                  <p className="text-sm text-gray-700">
                    If you can draw your workflow on paper from Start to End without getting 
                    stuck or looping forever, your system will accept it.
                  </p>
                  <div className="mt-2 p-3 bg-white rounded border">
                    <p className="text-sm font-medium text-center">
                      If paper flow works → system will work
                    </p>
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