"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ArrowLeft,
  Edit,
  Workflow as WorkflowIcon,
  GitBranch,
  Route,
  Calendar,
  User,
  Shield,
  CheckCircle,
  Circle,
  ArrowRight,
  Check,
  Zap,
} from "lucide-react";
interface WorkflowDetailProps {
  workflow: {
    id?: string;
    name: string;
    description?: string;
    resourceId?: string;
    resource:{
      id:string,
      name:string
    };

    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;

    stages: {
      name: string;
      order: number;
      isInitial: boolean;
      isFinal: boolean;
    }[];

    transitions: {
      label: string;
      fromStage: string;
      toStage: string;
      allowedRoleIds: string[];
      allowedUserIds: string[];
      requiresApproval: boolean;
      autoTrigger: boolean;
    }[];
  };
  onEdit?: () => void;
  onBack?: () => void;
}

export function WorkflowDetail({ workflow, onEdit, onBack }: WorkflowDetailProps) {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="w-full max-w-7xl mx-auto space-y-6">

        {/* ------------------------ HEADER ------------------------ */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              {onBack && (
                <Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <h1 className="text-slate-900 font-semibold">{workflow.name}</h1>
            </div>

            <p className="text-slate-600 ml-12">
              {workflow.description || "No description provided"}
            </p>
          </div>

          {/* {onEdit && (
            <Button onClick={onEdit} className="bg-slate-900 hover:bg-slate-800 h-10">
              <Edit className="h-4 w-4 mr-2" />
              Edit Workflow
            </Button>
          )} */}
        </div>

        {/* ------------------------ WORKFLOW INFORMATION ------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b bg-slate-50 border-slate-200 flex items-center gap-2">
            <WorkflowIcon className="h-5 w-5 text-slate-700" />
            <h2 className="text-slate-900">Workflow Information</h2>
          </div>

          <div className="p-6 grid gap-4 md:grid-cols-2">
            <InfoBlock label="Workflow ID" value={workflow.id || "N/A"} />
            <InfoBlock label="Resource" value={workflow.resource.name || "N/A"} />

            {workflow.createdAt && (
              <InfoBlock
                label="Created At"
                icon={<Calendar className="h-4 w-4 text-slate-400" />}
                value={new Date(workflow.createdAt).toLocaleDateString()}
              />
            )}

            {workflow.updatedAt && (
              <InfoBlock
                label="Last Updated"
                icon={<Calendar className="h-4 w-4 text-slate-400" />}
                value={new Date(workflow.updatedAt).toLocaleDateString()}
              />
            )}

            {workflow.createdBy && (
              <InfoBlock
                label="Created By"
                icon={<User className="h-4 w-4 text-slate-400" />}
                value={workflow.createdBy}
              />
            )}
          </div>
        </div>

        {/* ------------------------ STAGES ------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <SectionHeader
            icon={<GitBranch className="h-5 w-5 text-slate-700" />}
            title="Stages"
            count={workflow.stages.length}
          />

          <div className="p-6">
            <Table className="border border-slate-200 rounded-lg">
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Stage Name</TableHead>
                  <TableHead className="text-center w-24">Order</TableHead>
                  <TableHead className="w-32">Type</TableHead>
                  <TableHead className="w-32">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {workflow.stages
                  .sort((a, b) => a.order - b.order)
                  .map((stage, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100">
                            {stage.order + 1}
                          </div>
                          {stage.name}
                        </div>
                      </TableCell>

                      <TableCell className="text-center text-slate-600">
                        {stage.order}
                      </TableCell>

                      <TableCell>
                        {stage.isInitial ? (
                          <BadgeStage type="initial" />
                        ) : stage.isFinal ? (
                          <BadgeStage type="final" />
                        ) : (
                          <BadgeStage type="intermediate" />
                        )}
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline" className="bg-slate-50 border-slate-200">
                          Active
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* ------------------------ FLOW DIAGRAM ------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <SectionHeader
            icon={<Route className="h-5 w-5 text-slate-700" />}
            title="Workflow Flow"
          />

          <div className="p-6 flex items-center gap-4 overflow-x-auto pb-4">
            {workflow.stages.map((stage, index) => (
              <React.Fragment key={index}>
                <FlowStage stage={stage} />

                {index < workflow.stages.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-slate-400 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ------------------------ TRANSITIONS ------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <SectionHeader
            icon={<Route className="h-5 w-5 text-slate-700" />}
            title="Transitions"
            count={workflow.transitions.length}
          />

          <div className="p-6 space-y-4">
            {workflow.transitions.length === 0 ? (
              <EmptyTransitions />
            ) : (
              workflow.transitions.map((t, idx) => <TransitionCard key={idx} t={t} index={idx} />)
            )}
          </div>
        </div>

        {/* ------------------------ SUMMARY ------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <SectionHeader title="Summary" />

          <div className="p-6 grid gap-6 md:grid-cols-3">
            <SummaryBlock label="Total Stages" value={workflow.stages.length} />
            <SummaryBlock label="Total Transitions" value={workflow.transitions.length} />
            <SummaryBlock
              label="Initial Stages"
              value={workflow.stages.filter((s) => s.isInitial).length}
            />
          </div>
        </div>
      </div>
    </div>
    
  );
}

/* ------------------------ REUSABLE COMPONENTS ------------------------ */

function InfoBlock({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <span className="text-sm text-slate-600">{label}</span>
      <div className="flex items-center gap-2 mt-1">
        {icon}
        <p className="text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  icon,
  count,
}: {
  title: string;
  icon?: React.ReactNode;
  count?: number;
}) {
  return (
    <div className="px-6 py-4 border-b bg-slate-50 border-slate-200 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-slate-900">{title}</h2>
      </div>
      {count !== undefined && <span className="text-sm text-slate-600">{count}</span>}
    </div>
  );
}

function BadgeStage({ type }: { type: "initial" | "final" | "intermediate" }) {
  if (type === "initial")
    return (
      <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
        <Circle className="h-3 w-3 mr-1 fill-green-600 text-green-600" />
        Initial
      </Badge>
    );

  if (type === "final")
    return (
      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
        <CheckCircle className="h-3 w-3 mr-1" />
        Final
      </Badge>
    );

  return <Badge variant="outline">Intermediate</Badge>;
}

function FlowStage({ stage }: any) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[140px]">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full border-2 ${
          stage.isInitial
            ? "border-green-500 bg-green-50"
            : stage.isFinal
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 bg-slate-50"
        }`}
      >
        {stage.isInitial ? (
          <Circle className="h-6 w-6 text-green-600 fill-green-600" />
        ) : stage.isFinal ? (
          <CheckCircle className="h-6 w-6 text-blue-600" />
        ) : (
          <span className="text-slate-700">{stage.order + 1}</span>
        )}
      </div>
      <div className="text-center">
        <p className="text-sm text-slate-900">{stage.name}</p>
      </div>
    </div>
  );
}

function EmptyTransitions() {
  return (
    <div className="text-center py-12 text-slate-500">
      <Route className="h-12 w-12 mx-auto mb-3 text-slate-300" />
      <p>No transitions defined</p>
    </div>
  );
}

function TransitionCard({ t, index }: any) {
  return (
    <div className="p-5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
            {index + 1}
          </div>

          <div>
            <h3 className="text-slate-900">{t.label}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
              <span>{t.fromStage}</span>
              <ArrowRight className="h-3 w-3" />
              <span>{t.toStage}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {t.requiresApproval && (
            <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
              <Check className="h-3 w-3 mr-1" />
              Approval Required
            </Badge>
          )}

          {t.autoTrigger && (
            <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700">
              <Zap className="h-3 w-3 mr-1" />
              Auto Trigger
            </Badge>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-slate-100">
        <div>
          <LabelWithIcon label="Allowed Roles" icon={<Shield className="h-4 w-4" />} />
          <IdList list={t.allowedRoleIds} />
        </div>

        <div>
          <LabelWithIcon label="Allowed Users" icon={<User className="h-4 w-4" />} />
          <IdList list={t.allowedUserIds} />
        </div>
      </div>
    </div>
  );
}

function LabelWithIcon({ label, icon }: any) {
  return (
    <div className="flex items-center gap-2 mb-2 text-sm text-slate-600">
      {icon}
      {label}
    </div>
  );
}

function IdList({ list }: { list: string[] }) {
  return list && list.length > 0 ? (
    <div className="flex flex-wrap gap-1.5">
      {list.map((id) => (
        <Badge key={id} variant="outline" className="bg-slate-50">
          {id}
        </Badge>
      ))}
    </div>
  ) : (
    <p className="text-sm text-slate-400">No restrictions</p>
  );
}

function SummaryBlock({ label, value }: any) {
  return (
    <div className="text-center p-4 rounded-lg bg-slate-50 border border-slate-200">
      <div className="text-3xl text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  );
}
