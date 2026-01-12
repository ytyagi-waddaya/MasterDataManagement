"use client";

import { useFieldArray } from "react-hook-form";
import WorkflowCanvas from "./WorkflowCanvas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Save,
  Network,
  Layers,
  GitBranch,
  Shield,
  Users,
  Download,
  Share2,
  Bell,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

export default function WorkflowCanvasWithForm({
  form,
  onBack,
  onSave,
  roleList = [],
  userList = [],
}: any) {
  const stageArray = useFieldArray({ control: form.control, name: "stages" });
  const transitionArray = useFieldArray({ control: form.control, name: "transitions" });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const stages = form.watch("stages") || [];
  const transitions = form.watch("transitions") || [];
  const workflowName = form.watch("name") || "Unnamed Workflow";

  // ✅ SAVE + BACK
  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const data = form.getValues();

      if (!workflowName || workflowName.trim() === "") {
        setSaveStatus("error");
        setIsSaving(false);
        return;
      }

      form.setValue("lastSaved", new Date().toISOString());

      if (typeof onSave === "function") {
        await onSave(data);
      }

      setSaveStatus("success");

      // ✅ Save successful → go back
      if (typeof onBack === "function") {
        onBack();
      }
    } catch (error) {
      console.error("Save failed:", error);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  const workflowStats = {
    totalStages: stages.length,
    totalTransitions: transitions.length,
    initialStages: stages.filter((s: any) => s.isInitial).length,
    finalStages: stages.filter((s: any) => s.isFinal).length,
    activeConnections: transitions.filter((t: any) => t.fromStageId && t.toStageId).length,
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-slate-50/50 to-white">
      {/* ================= NAVBAR ================= */}
      <div className="h-20 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-6 flex items-center justify-between shadow-sm">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="gap-2 hover:bg-slate-50 border-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 border border-indigo-200/50">
              <Network className="h-5 w-5 text-indigo-600" />
            </div>

            <div className="flex flex-col">
              <h1 className="font-bold text-lg text-slate-900 tracking-tight">{workflowName}</h1>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Workflow Builder</span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <Layers className="h-3 w-3" />
                  {workflowStats.totalStages} stages
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <GitBranch className="h-3 w-3" />
                  {workflowStats.totalTransitions} transitions
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Stats */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-slate-700">{workflowStats.initialStages}</span>
            </div>
            <span className="text-xs text-slate-500">Initial</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Shield className="h-3 w-3 text-amber-500" />
              <span className="text-sm font-semibold text-slate-700">{workflowStats.activeConnections}</span>
            </div>
            <span className="text-xs text-slate-500">Active</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-500" />
              <span className="text-sm font-semibold text-slate-700">{workflowStats.finalStages}</span>
            </div>
            <span className="text-xs text-slate-500">Final</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Save status */}
          {saveStatus === "success" && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium mr-2 animate-in slide-in-from-right-2">
              <CheckCircle className="h-4 w-4" />
              Saved
            </div>
          )}

          {saveStatus === "error" && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium mr-2 animate-in slide-in-from-right-2">
              <AlertCircle className="h-4 w-4" />
              Name required
            </div>
          )}

          {/* ✅ ONLY Save button remains */}
          <Button
            variant="default"
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className={`
              gap-2 px-4
              ${isSaving ? "bg-blue-500 hover:bg-blue-600" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"}
              shadow-lg hover:shadow-xl transition-all duration-200
              disabled:opacity-70 disabled:cursor-not-allowed
            `}
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Workflow</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ================= STATS BAR ================= */}
      <div className="bg-gradient-to-r from-white to-slate-50 border-b border-slate-100 px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100">
              <Layers className="h-3 w-3" />
              {workflowStats.totalStages} Stages
            </Badge>

            <Badge variant="secondary" className="gap-1.5 bg-green-50 text-green-700 hover:bg-green-100">
              <GitBranch className="h-3 w-3" />
              {workflowStats.totalTransitions} Transitions
            </Badge>

            <Badge variant="secondary" className="gap-1.5 bg-violet-50 text-violet-700 hover:bg-violet-100">
              <Users className="h-3 w-3" />
              {roleList.length} Roles
            </Badge>

            <Badge variant="secondary" className="gap-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100">
              <Bell className="h-3 w-3" />
              {userList.length} Users
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Click stage to edit</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Drag to connect</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CANVAS ================= */}
      <div className="flex-1 relative overflow-hidden">
        <WorkflowCanvas
          form={form}
          stageArray={stageArray}
          transitionArray={transitionArray}
          mode="edit"
          roleList={roleList}
          userList={userList}
        />
      </div>

      {/* ================= FLOATING ACTIONS (bottom-left) ================= */}
      
    </div>
  );
}
