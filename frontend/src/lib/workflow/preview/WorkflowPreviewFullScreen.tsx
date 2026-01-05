// D:\Raghav\MasterDataManagement\frontend\src\lib\workflow\preview\WorkflowPreviewFullScreen.tsx
"use client";

import * as React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Edge,
  type Node,
  Position,
  type ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

import { Button } from "@/components/ui/button";
import { X, Eye, Maximize2, Minimize2, RotateCcw } from "lucide-react";

import FlowEdge from "@/lib/workflow/builder/edges/FlowEdge";
import StageNode from "@/lib/workflow/builder/nodes/StageNode";

type LayoutMode = "horizontal" | "vertical";

const nodeTypes = { stage: StageNode };
const edgeTypes = { flow: FlowEdge };

/* ✅ same as builder (optional) */
const CATEGORY_COLOR: Record<string, string> = {
  DRAFT: "#64748b",
  SUBMITTED: "#0ea5e9",
  UNDER_REVIEW: "#f59e0b",
  NORMAL: "#6366f1",
  CORRECTION: "#a855f7",
  ON_HOLD: "#f97316",
  APPROVAL: "#10b981",
  COMPLETED: "#22c55e",
  REJECTED: "#ef4444",
};

/* ===================== SAFE HELPERS ===================== */
function safeStageName(stage: any): string {
  if (!stage) return "—";
  if (typeof stage === "string") return stage;

  if (typeof stage === "object") {
    if (typeof stage.name === "string") return stage.name;
    if (typeof stage.name === "object" && stage.name?.name) return stage.name.name;
  }
  return "—";
}

function getStageId(s: any, fallback: string) {
  return String(s?.id ?? s?.tempId ?? fallback);
}

function buildStageIndex(sortedStages: any[]) {
  const stageIds = sortedStages.map((s, i) => getStageId(s, `stage-${i}`));
  const idSet = new Set(stageIds);

  const nameToId = new Map<string, string>();
  for (let i = 0; i < sortedStages.length; i++) {
    const id = stageIds[i];
    const nm = safeStageName(sortedStages[i]);
    const key = String(nm).trim().toLowerCase();
    if (!nameToId.has(key)) nameToId.set(key, id);
  }

  const resolveStageRef = (ref: any): string | undefined => {
    if (ref == null) return undefined;

    if (typeof ref === "number" || typeof ref === "string") {
      const s = String(ref);
      if (idSet.has(s)) return s;
      return nameToId.get(s.trim().toLowerCase());
    }

    if (typeof ref === "object") {
      const direct = ref?.id ?? ref?.tempId;
      if (direct != null) {
        const s = String(direct);
        if (idSet.has(s)) return s;
      }
      const nm = safeStageName(ref);
      return nameToId.get(String(nm).trim().toLowerCase());
    }

    return undefined;
  };

  return { stageIds, idSet, nameToId, resolveStageRef };
}

/* ===================== RANK (LEVELS) ===================== */
function computeRank(sortedStages: any[], transitions: any[]) {
  const { stageIds, resolveStageRef } = buildStageIndex(sortedStages);

  const outgoing = new Map<string, string[]>();
  const incoming = new Map<string, string[]>();

  const addEdge = (fromId: string, toId: string) => {
    if (!outgoing.has(fromId)) outgoing.set(fromId, []);
    outgoing.get(fromId)!.push(toId);

    if (!incoming.has(toId)) incoming.set(toId, []);
    incoming.get(toId)!.push(fromId);
  };

  for (const t of transitions || []) {
    const fromId =
      resolveStageRef(t?.fromStageId) ??
      resolveStageRef(t?.fromStage?.id) ??
      resolveStageRef(t?.fromStage);

    const toId =
      resolveStageRef(t?.toStageId) ??
      resolveStageRef(t?.toStage?.id) ??
      resolveStageRef(t?.toStage);

    if (!fromId || !toId) continue;
    addEdge(fromId, toId);
  }

  const byId = new Map<string, any>();
  stageIds.forEach((id, i) => byId.set(id, sortedStages[i]));
  const initialIds = stageIds.filter((id) => !!byId.get(id)?.isInitial);
  const startIds = initialIds.length ? initialIds : [stageIds[0]].filter(Boolean);

  const NEG = -1e9;
  const rank = new Map<string, number>();
  stageIds.forEach((id) => rank.set(id, NEG));
  startIds.forEach((id) => rank.set(id, 0));

  const N = stageIds.length;
  for (let iter = 0; iter < N; iter++) {
    let changed = false;

    for (const [from, kids] of outgoing.entries()) {
      const rFrom = rank.get(from) ?? NEG;
      if (rFrom <= NEG / 2) continue;

      for (const to of kids) {
        const cur = rank.get(to) ?? NEG;
        const next = rFrom + 1;
        if (next > cur) {
          rank.set(to, next);
          changed = true;
        }
      }
    }

    if (!changed) break;
  }

  let maxFinite = 0;
  for (const id of stageIds) {
    const v = rank.get(id) ?? NEG;
    if (v > NEG / 2) maxFinite = Math.max(maxFinite, v);
  }
  let tail = maxFinite + 1;
  for (const id of stageIds) {
    if ((rank.get(id) ?? NEG) <= NEG / 2) rank.set(id, tail++);
  }

  const uniq = Array.from(new Set(stageIds.map((id) => rank.get(id) ?? 0))).sort((a, b) => a - b);
  const compress = new Map<number, number>();
  uniq.forEach((v, i) => compress.set(v, i));
  stageIds.forEach((id) => rank.set(id, compress.get(rank.get(id) ?? 0) ?? 0));

  for (const [from, kids] of outgoing.entries()) {
    outgoing.set(from, [...kids]);
  }

  return { rank, outgoing, incoming, stageIds, startIds, byId };
}

/* ===================== LANES ===================== */
function assignLaneValues(params: {
  stageIds: string[];
  outgoing: Map<string, string[]>;
  incoming: Map<string, string[]>;
  startIds: string[];
  rank: Map<string, number>;
}) {
  const { stageIds, outgoing, incoming, startIds, rank } = params;

  const lane = new Map<string, number>();
  startIds.forEach((id, idx) => lane.set(id, idx));

  const ordered = [...stageIds].sort((a, b) => (rank.get(a) ?? 0) - (rank.get(b) ?? 0));

  for (const from of ordered) {
    const base = lane.get(from);
    if (base == null) continue;

    const kids = outgoing.get(from) ?? [];
    kids.forEach((to, idx) => {
      if (lane.has(to)) return;
      lane.set(to, base + (idx === 0 ? 0 : idx));
    });
  }

  for (const id of ordered) {
    if (lane.has(id)) continue;
    const parents = incoming.get(id) ?? [];
    const vals = parents.map((p) => lane.get(p)).filter((v) => typeof v === "number") as number[];
    if (vals.length) lane.set(id, vals.reduce((a, b) => a + b, 0) / vals.length);
    else lane.set(id, 0);
  }

  for (let iter = 0; iter < 4; iter++) {
    let changed = false;

    for (const id of ordered) {
      const parents = incoming.get(id) ?? [];
      if (parents.length < 2) continue;

      const vals = parents.map((p) => lane.get(p)).filter((v) => typeof v === "number") as number[];
      if (vals.length < 2) continue;

      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      const cur = lane.get(id) ?? 0;

      const next = cur * 0.35 + avg * 0.65;
      if (Math.abs(next - cur) > 1e-4) {
        lane.set(id, next);
        changed = true;
      }
    }

    if (!changed) break;
  }

  return lane;
}

/* ===================== GRAPH BUILD ===================== */
function buildPreviewGraph(workflow: any, layout: LayoutMode): { nodes: Node[]; edges: Edge[] } {
  const stages = Array.isArray(workflow?.stages) ? workflow.stages : [];
  const transitions = Array.isArray(workflow?.transitions) ? workflow.transitions : [];

  const sortedStages = [...stages].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const { rank, outgoing, incoming, stageIds, startIds, byId } = computeRank(sortedStages, transitions);
  const laneVal = assignLaneValues({ stageIds, outgoing, incoming, startIds, rank });

  const NODE_W = 320;
  const NODE_H = 130;

  const MAIN_GAP = layout === "horizontal" ? NODE_W + 220 : NODE_H + 220;
  const LANE_GAP = layout === "horizontal" ? NODE_H + 210 : NODE_W + 260;

  const START_X = 180;
  const START_Y = 140;

  const { resolveStageRef } = buildStageIndex(sortedStages);

  const nodes: Node[] = sortedStages.map((s: any, idx: number) => {
    const id = getStageId(s, `stage-${idx}`);
    const name = safeStageName(s);

    const r = rank.get(id) ?? idx;
    const lv = laneVal.get(id) ?? 0;

    const position =
      layout === "horizontal"
        ? { x: START_X + r * MAIN_GAP, y: START_Y + lv * LANE_GAP }
        : { x: START_X + lv * LANE_GAP, y: START_Y + r * MAIN_GAP };

    return {
      id,
      type: "stage",
      position,
      draggable: false,
      selectable: false,
      sourcePosition: layout === "horizontal" ? Position.Right : Position.Bottom,
      targetPosition: layout === "horizontal" ? Position.Left : Position.Top,
      data: {
        name,
        isInitial: !!s?.isInitial,
        isFinal: !!s?.isFinal,
        category: s?.category,
        stage: s,
        preview: true,
        readOnly: true,
      },
    };
  });

  const nodeIdSet = new Set(nodes.map((n) => n.id));

  const pairCount = new Map<string, number>();
  const pairKey = (a: string, b: string) => `${a}__${b}`;

  const edges: Edge[] = transitions
    .map((t: any, idx: number) => {
      const fromId =
        resolveStageRef(t?.fromStageId) ??
        resolveStageRef(t?.fromStage?.id) ??
        resolveStageRef(t?.fromStage);

      const toId =
        resolveStageRef(t?.toStageId) ??
        resolveStageRef(t?.toStage?.id) ??
        resolveStageRef(t?.toStage);

      if (!fromId || !toId) return null;
      if (!nodeIdSet.has(fromId) || !nodeIdSet.has(toId)) return null;

      const key = pairKey(fromId, toId);
      const c = (pairCount.get(key) ?? 0) + 1;
      pairCount.set(key, c);

      // ✅ IMPORTANT FIX: label fallback (same like builder)
      const label = String(
        t?.label ??
          t?.actionLabel ??
          t?.action ??
          t?.transitionLabel ??
          ""
      ).trim();

      // ✅ stage-based color line
      const fromStage = byId.get(fromId);
      const stroke =
        (t?.stroke as string) ||
        (fromStage?.color as string) ||
        CATEGORY_COLOR[String(fromStage?.category ?? "")] ||
        undefined;

      return {
        id: String(t?.id ?? t?.tempId ?? `edge-${idx}`),
        type: "flow",
        source: fromId,
        target: toId,
        selectable: false,
        data: {
          label, // ✅ now label box will show
          transition: t,
          preview: true,
          readOnly: true,
          live: true,
          parallelIndex: c,
          layout,
          ...(stroke ? { stroke } : {}),
        },
      } as Edge;
    })
    .filter(Boolean) as Edge[];

  return { nodes, edges };
}

/* ===================== COMPONENT ===================== */
export function WorkflowPreviewFullScreen({
  open,
  onOpenChange,
  workflow,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflow: any;
}) {
  const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);

  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [layout, setLayout] = React.useState<LayoutMode>("horizontal");

  const rf = React.useRef<ReactFlowInstance | null>(null);

  const { nodes, edges } = React.useMemo(() => buildPreviewGraph(workflow, layout), [workflow, layout]);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  React.useEffect(() => {
    if (!open) {
      setIsFullScreen(false);
      setLayout("horizontal");
    }
  }, [open]);

  const fit = React.useCallback(() => {
    rf.current?.fitView({
      padding: layout === "vertical" ? 0.42 : 0.30,
      duration: 250,
    });
  }, [layout]);

  React.useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => fit());
  }, [open, layout, nodes.length, edges.length, fit]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className={
          isFullScreen
            ? "absolute inset-0 bg-white"
            : "absolute left-1/2 top-1/2 w-[94vw] max-w-7xl h-[84vh] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl border shadow-2xl overflow-hidden"
        }
      >
        {/* Header */}
        <div className="h-14 border-b px-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
              <Eye className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold truncate">{workflow?.name ?? "Workflow Preview"}</div>
              <div className="text-xs text-muted-foreground truncate">
                Drag to pan • Scroll to zoom • Use reset if view looks tight
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-xl border bg-slate-50 p-1 shadow-sm">
              <Button
                type="button"
                size="sm"
                variant={layout === "horizontal" ? "default" : "ghost"}
                className="h-8 px-3 rounded-lg"
                onClick={() => setLayout("horizontal")}
              >
                Horizontal
              </Button>
              <Button
                type="button"
                size="sm"
                variant={layout === "vertical" ? "default" : "ghost"}
                className="h-8 px-3 rounded-lg"
                onClick={() => setLayout("vertical")}
              >
                Vertical
              </Button>
            </div>

            <Button type="button" variant="outline" size="icon" onClick={fit} title="Reset view">
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setIsFullScreen((v) => !v)}
              aria-label={isFullScreen ? "Exit full screen" : "Full screen"}
              title={isFullScreen ? "Exit full screen" : "Full screen"}
            >
              {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>

            <Button type="button" variant="ghost" size="icon" onClick={close} aria-label="Close" title="Close">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className={isFullScreen ? "h-[calc(100dvh-56px)] w-full" : "h-[calc(84vh-56px)] w-full"}>
          <ReactFlow
            className="bg-gradient-to-br from-slate-50 via-white to-slate-100"
            onInit={(inst) => {
              rf.current = inst;
              inst.fitView({ padding: layout === "vertical" ? 0.42 : 0.30, duration: 0 });
            }}
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={{
              type: "flow",
              animated: false,
              style: { stroke: "rgba(15,23,42,0.55)", strokeWidth: 2 },
            }}
            fitView
            fitViewOptions={{ padding: layout === "vertical" ? 0.42 : 0.30 }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            selectNodesOnDrag={false}
            zoomOnDoubleClick={false}
            panOnDrag
            zoomOnScroll
            zoomOnPinch
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={"dots" as any} gap={24} size={1} />
            <MiniMap zoomable pannable />
            <Controls position="bottom-right" />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
