// D:\Raghav\MasterDataManagement\frontend\src\lib\workflow\preview\WorkflowPreviewFullScreen.tsx
"use client";

import * as React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Edge,
  type Node,
  type ReactFlowInstance,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";

import { Button } from "@/components/ui/button";
import {
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  LayoutDashboard,
  LayoutList,
  ZoomIn,
  ZoomOut,
  Grid3x3,
  GitBranch,
  GitFork,
  Network,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import FlowEdge from "@/lib/workflow/builder/edges/FlowEdge";
import StageNode from "@/lib/workflow/builder/nodes/StageNode";

type LayoutMode = "horizontal" | "vertical" | "radial";

const nodeTypes = { stage: StageNode };
const edgeTypes = { flow: FlowEdge };

/* ✅ Color themes */
const THEMES = {
  light: {
    background: "bg-gradient-to-br from-slate-50 via-white to-blue-50/30",
    headerBg: "bg-gradient-to-r from-white to-slate-50",
    border: "border-slate-200",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
  },
  dark: {
    background: "bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/20",
    headerBg: "bg-gradient-to-r from-slate-800 to-slate-900",
    border: "border-slate-700",
    textPrimary: "text-white",
    textSecondary: "text-slate-300",
  },
  blue: {
    background: "bg-gradient-to-br from-blue-50 via-sky-50/50 to-indigo-50",
    headerBg: "bg-gradient-to-r from-blue-50 to-sky-50",
    border: "border-blue-200",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
  },
};

/** ✅ For EDGE stroke (CSS color) */
const CATEGORY_STROKE: Record<string, string> = {
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

/* ===================== SMALL UI ===================== */
const SimpleProgress = ({ value }: { value: number }) => (
  <div className="w-full bg-slate-200 rounded-full h-2">
    <div
      className="bg-slate-600 h-2 rounded-full transition-all duration-200"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

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

/** ✅ IMPORTANT: tempId first */
function getStageId(s: any, fallback: string) {
  return String(s?.tempId ?? s?.id ?? fallback);
}

function isNum(v: any) {
  return typeof v === "number" && Number.isFinite(v);
}

/** Try to read saved positions from stage (builder saved) */
function getSavedPos(stage: any): { x: number; y: number } | null {
  const p = stage?.position ?? stage?.pos ?? stage?.ui?.position ?? null;
  if (p && isNum(p.x) && isNum(p.y)) return { x: p.x, y: p.y };

  if (isNum(stage?.x) && isNum(stage?.y)) return { x: stage.x, y: stage.y };
  if (isNum(stage?.posX) && isNum(stage?.posY)) return { x: stage.posX, y: stage.posY };

  return null;
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
      const direct = ref?.tempId ?? ref?.id;
      if (direct != null) {
        const s = String(direct);
        if (idSet.has(s)) return s;
      }
      const nm = safeStageName(ref);
      return nameToId.get(String(nm).trim().toLowerCase());
    }

    return undefined;
  };

  return { stageIds, resolveStageRef };
}

/* ===================== RANK ===================== */
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
      resolveStageRef(t?.fromStage?.tempId) ??
      resolveStageRef(t?.fromStage);

    const toId =
      resolveStageRef(t?.toStageId) ??
      resolveStageRef(t?.toStage?.id) ??
      resolveStageRef(t?.toStage?.tempId) ??
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

/* ===================== COLOR NORMALIZER ===================== */
function normalizeStroke(input?: any): string | undefined {
  if (!input) return undefined;
  const s = String(input).trim();

  if (s.includes("bg-") || s.includes("border-") || s.includes("text-")) return undefined;

  if (s.startsWith("#") || s.startsWith("rgb") || s.startsWith("hsl")) return s;
  if (/^[a-zA-Z]+$/.test(s)) return s;

  return undefined;
}

/* ===================== RADIAL POSITIONS (FORCE + ANTI OVERLAP) ===================== */
function buildRadialPositionsForce(opts: {
  stageIds: string[];
  rank: Map<string, number>;
  laneVal: Map<string, number>;
  outgoing: Map<string, string[]>;
  centerX: number;
  centerY: number;
}) {
  const { stageIds, rank, laneVal, outgoing, centerX, centerY } = opts;

  const BASE_R = 420;
  const RING_GAP = 320;
  const LANE_SCALE = 70;

  const MIN_DIST = 360;

  const ITER = 220;
  const DAMP = 0.86;
  const REPULSE = 0.12;
  const RADIAL_K = 0.06;

  const SPRING_K = 0.02;
  const DESIRED_EDGE = 320;

  const edgePairs: Array<[string, string]> = [];
  for (const [from, kids] of outgoing.entries()) {
    for (const to of kids) edgePairs.push([from, to]);
  }

  const byRank = new Map<number, string[]>();
  for (const id of stageIds) {
    const r = rank.get(id) ?? 0;
    if (!byRank.has(r)) byRank.set(r, []);
    byRank.get(r)!.push(id);
  }
  const ranks = [...byRank.keys()].sort((a, b) => a - b);

  const pos = new Map<string, { x: number; y: number }>();
  const vel = new Map<string, { x: number; y: number }>();
  const targetR = new Map<string, number>();

  for (const r of ranks) {
    const ids = (byRank.get(r) ?? []).slice();
    ids.sort((a, b) => (laneVal.get(a) ?? 0) - (laneVal.get(b) ?? 0));
    const n = Math.max(1, ids.length);

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const lv = laneVal.get(id) ?? 0;

      const tr = BASE_R + r * RING_GAP + lv * LANE_SCALE;
      const angle = -Math.PI / 2 + (i / n) * Math.PI * 2 + r * 0.18;

      pos.set(id, { x: centerX + Math.cos(angle) * tr, y: centerY + Math.sin(angle) * tr });
      vel.set(id, { x: 0, y: 0 });
      targetR.set(id, tr);
    }
  }

  const ids = [...stageIds];

  for (let it = 0; it < ITER; it++) {
    const fx = new Map<string, number>();
    const fy = new Map<string, number>();
    for (const id of ids) {
      fx.set(id, 0);
      fy.set(id, 0);
    }

    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const aId = ids[i];
        const bId = ids[j];
        const a = pos.get(aId);
        const b = pos.get(bId);
        if (!a || !b) continue;

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (dist < MIN_DIST) {
          const push = (MIN_DIST - dist) * REPULSE;
          const ux = dx / dist;
          const uy = dy / dist;

          fx.set(aId, (fx.get(aId) ?? 0) - ux * push);
          fy.set(aId, (fy.get(aId) ?? 0) - uy * push);
          fx.set(bId, (fx.get(bId) ?? 0) + ux * push);
          fy.set(bId, (fy.get(bId) ?? 0) + uy * push);
        }
      }
    }

    for (const [aId, bId] of edgePairs) {
      const a = pos.get(aId);
      const b = pos.get(bId);
      if (!a || !b) continue;

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      const ux = dx / dist;
      const uy = dy / dist;

      const diff = dist - DESIRED_EDGE;
      const pull = diff * SPRING_K;

      fx.set(aId, (fx.get(aId) ?? 0) + ux * pull);
      fy.set(aId, (fy.get(aId) ?? 0) + uy * pull);
      fx.set(bId, (fx.get(bId) ?? 0) - ux * pull);
      fy.set(bId, (fy.get(bId) ?? 0) - uy * pull);
    }

    for (const id of ids) {
      const p = pos.get(id);
      if (!p) continue;

      const dx = p.x - centerX;
      const dy = p.y - centerY;
      const rNow = Math.sqrt(dx * dx + dy * dy) || 1;
      const tr = targetR.get(id) ?? rNow;

      const err = tr - rNow;
      const ux = dx / rNow;
      const uy = dy / rNow;

      const k = err * RADIAL_K;
      fx.set(id, (fx.get(id) ?? 0) + ux * k);
      fy.set(id, (fy.get(id) ?? 0) + uy * k);
    }

    for (const id of ids) {
      const v = vel.get(id);
      const p = pos.get(id);
      if (!v || !p) continue;

      v.x = (v.x + (fx.get(id) ?? 0)) * DAMP;
      v.y = (v.y + (fy.get(id) ?? 0)) * DAMP;

      p.x += v.x;
      p.y += v.y;
    }
  }

  return pos;
}

/* ===================== HANDLE PICKER ===================== */
function pickHandleFromTransition(t: any, kind: "source" | "target"): string | undefined {
  const keys =
    kind === "source"
      ? ["sourceHandle", "fromHandle", "fromPort", "fromConnector", "fromAnchor", "sourcePort"]
      : ["targetHandle", "toHandle", "toPort", "toConnector", "toAnchor", "targetPort"];

  for (const k of keys) {
    const v = t?.[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }

  const nested = kind === "source" ? t?.from : t?.to;
  if (nested) {
    const v = nested?.handle ?? nested?.port ?? nested?.connector ?? nested?.anchor;
    if (typeof v === "string" && v.trim()) return v.trim();
  }

  return undefined;
}

function guessHandles(params: { layout: LayoutMode; fromPos: { x: number; y: number }; toPos: { x: number; y: number } }) {
  const { layout, fromPos, toPos } = params;
  const dx = toPos.x - fromPos.x;
  const dy = toPos.y - fromPos.y;

  if (layout === "vertical") {
    return {
      sourceHandle: dy >= 0 ? "bottom-source" : "top-source",
      targetHandle: dy >= 0 ? "top-target" : "bottom-target",
    };
  }

  if (layout === "horizontal") {
    return {
      sourceHandle: dx >= 0 ? "right-source" : "left-source",
      targetHandle: dx >= 0 ? "left-target" : "right-target",
    };
  }

  if (Math.abs(dx) > Math.abs(dy)) {
    return {
      sourceHandle: dx >= 0 ? "right-source" : "left-source",
      targetHandle: dx >= 0 ? "left-target" : "right-target",
    };
  }

  return {
    sourceHandle: dy >= 0 ? "bottom-source" : "top-source",
    targetHandle: dy >= 0 ? "top-target" : "bottom-target",
  };
}

/* ===================== GRAPH BUILD ===================== */
function buildPreviewGraph(workflow: any, layout: LayoutMode): { nodes: Node[]; edges: Edge[] } {
  const stages = Array.isArray(workflow?.stages) ? workflow.stages : [];
  const transitions = Array.isArray(workflow?.transitions) ? workflow.transitions : [];

  const sortedStages = [...stages].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const savedPositions = sortedStages.map(getSavedPos);
  const savedCount = savedPositions.filter(Boolean).length;
  const useSavedLayout = savedCount >= Math.max(2, Math.ceil(sortedStages.length * 0.7));

  const { rank, outgoing, incoming, stageIds, startIds, byId } = computeRank(sortedStages, transitions);
  const laneVal = assignLaneValues({ stageIds, outgoing, incoming, startIds, rank });

  const NODE_W = 320;
  const NODE_H = 130;

  let MAIN_GAP = NODE_W + 220;
  let LANE_GAP = NODE_H + 210;

  if (layout === "vertical") {
    MAIN_GAP = NODE_H + 220;
    LANE_GAP = NODE_W + 260;
  }

  const START_X = 180;
  const START_Y = 140;

  const { resolveStageRef } = buildStageIndex(sortedStages);

  const radialPos =
    layout === "radial"
      ? buildRadialPositionsForce({
          stageIds,
          rank,
          laneVal,
          outgoing,
          centerX: 0,
          centerY: 0,
        })
      : null;

  const nodes: Node[] = sortedStages.map((s: any, idx: number) => {
    const id = getStageId(s, `stage-${idx}`);
    const name = safeStageName(s);

    let position: { x: number; y: number };

    if (useSavedLayout) {
      position = getSavedPos(s) ?? { x: 0, y: 0 };
    } else {
      const r = rank.get(id) ?? idx;
      const lv = laneVal.get(id) ?? 0;

      if (layout === "horizontal") position = { x: START_X + r * MAIN_GAP, y: START_Y + lv * LANE_GAP };
      else if (layout === "vertical") position = { x: START_X + lv * LANE_GAP, y: START_Y + r * MAIN_GAP };
      else position = radialPos?.get(id) ?? { x: 0, y: 0 };
    }

    return {
      id,
      type: "stage",
      position,
      draggable: false,
      selectable: false,
      data: {
        name,
        isInitial: !!s?.isInitial,
        isFinal: !!s?.isFinal,
        category: s?.category,
        stage: s,
        preview: true,
        readOnly: true,
        layout,
      },
    };
  });

  const nodeIdSet = new Set(nodes.map((n) => n.id));
  const nodePos = new Map<string, { x: number; y: number }>();
  nodes.forEach((n) => nodePos.set(n.id, n.position));

  const pairCount = new Map<string, number>();
  const pairKey = (a: string, b: string) => `${a}__${b}`;

  const edges: Edge[] = transitions
    .map((t: any, idx: number) => {
      const fromId =
        resolveStageRef(t?.fromStageId) ??
        resolveStageRef(t?.fromStage?.id) ??
        resolveStageRef(t?.fromStage?.tempId) ??
        resolveStageRef(t?.fromStage);

      const toId =
        resolveStageRef(t?.toStageId) ??
        resolveStageRef(t?.toStage?.id) ??
        resolveStageRef(t?.toStage?.tempId) ??
        resolveStageRef(t?.toStage);

      if (!fromId || !toId) return null;
      if (!nodeIdSet.has(fromId) || !nodeIdSet.has(toId)) return null;

      const key = pairKey(fromId, toId);
      const c = (pairCount.get(key) ?? 0) + 1;
      pairCount.set(key, c);

      const label = String(t?.label ?? t?.actionLabel ?? t?.action ?? t?.transitionLabel ?? "").trim();

      const fromStage = byId.get(fromId);
      const catKey = String(fromStage?.category ?? "").toUpperCase();

      const stroke =
        normalizeStroke(t?.stroke) ||
        normalizeStroke(fromStage?.color) ||
        CATEGORY_STROKE[catKey] ||
        undefined;

      const savedSourceHandle = pickHandleFromTransition(t, "source");
      const savedTargetHandle = pickHandleFromTransition(t, "target");

      const fromP = nodePos.get(fromId) ?? { x: 0, y: 0 };
      const toP = nodePos.get(toId) ?? { x: 0, y: 0 };
      const guessed = guessHandles({ layout, fromPos: fromP, toPos: toP });

      const sourceHandle = savedSourceHandle ?? guessed.sourceHandle;
      const targetHandle = savedTargetHandle ?? guessed.targetHandle;

      return {
        id: String(t?.tempId ?? t?.id ?? `edge-${idx}`),
        type: "flow",
        source: fromId,
        target: toId,
        sourceHandle,
        targetHandle,
        selectable: false,
        ...(stroke ? { style: { stroke, strokeWidth: 2.5 } } : {}),
        data: {
          label,
          transition: t,
          preview: true,
          readOnly: true,
          live: true,
          parallelIndex: c,
          layout,
          ...(stroke ? { stroke } : {}),
          sourceHandle,
          targetHandle,
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

  // ✅ Default open radial
  const [layout, setLayout] = React.useState<LayoutMode>("radial");

  const [theme, setTheme] = React.useState<keyof typeof THEMES>("light");
  const [zoomLevel, setZoomLevel] = React.useState(1);

  const rf = React.useRef<ReactFlowInstance | null>(null);

  const { nodes, edges } = React.useMemo(() => buildPreviewGraph(workflow, layout), [workflow, layout]);

  const stats = React.useMemo(() => {
    const stages = Array.isArray(workflow?.stages) ? workflow.stages : [];
    const transitions = Array.isArray(workflow?.transitions) ? workflow.transitions : [];

    const initialStages = stages.filter((s: any) => s?.isInitial);
    const finalStages = stages.filter((s: any) => s?.isFinal);

    const categoryCount: Record<string, number> = {};
    stages.forEach((s: any) => {
      const cat = s?.category || "UNCATEGORIZED";
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    return {
      totalStages: stages.length,
      totalTransitions: transitions.length,
      initialStages: initialStages.length,
      finalStages: finalStages.length,
      categoryCount,
    };
  }, [workflow]);

  const fit = React.useCallback(() => {
    rf.current?.fitView({
      padding: layout === "vertical" ? 0.55 : layout === "radial" ? 0.35 : 0.45,
      duration: 250,
      includeHiddenNodes: true,
    });
    setZoomLevel((z) => (z <= 0 ? 1 : z));
  }, [layout]);

  const zoomIn = React.useCallback(() => {
    rf.current?.zoomIn({ duration: 200 });
    setZoomLevel((prev) => Math.min(prev + 0.1, 2.5));
  }, []);

  const zoomOut = React.useCallback(() => {
    rf.current?.zoomOut({ duration: 200 });
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.05));
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.ctrlKey && e.key === "0") fit();
      if (e.ctrlKey && (e.key === "=" || e.key === "+")) zoomIn();
      if (e.ctrlKey && e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close, fit, zoomIn, zoomOut]);

  React.useEffect(() => {
    if (!open) {
      setIsFullScreen(false);
      setLayout("radial"); // ✅ reset radial
      setTheme("light");
      setZoomLevel(1);
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => fit());
  }, [open, layout, nodes.length, edges.length, fit]);

  if (!open) return null;

  return (
    <TooltipProvider>
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-all duration-300"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div
          className={
            isFullScreen
              ? `absolute inset-0 ${THEMES[theme].background} transition-all duration-300`
              : `absolute left-1/2 top-1/2 w-[96vw] max-w-8xl h-[88vh] -translate-x-1/2 -translate-y-1/2 ${THEMES[theme].background} rounded-2xl border ${THEMES[theme].border} shadow-2xl overflow-hidden transition-all duration-300`
          }
        >
          {/* Header */}
          <div className={`h-16 border-b ${THEMES[theme].border} px-6 flex items-center justify-between ${THEMES[theme].headerBg}`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white flex items-center justify-center shadow-lg">
                <Network className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className={`font-bold text-lg truncate ${THEMES[theme].textPrimary}`}>{workflow?.name ?? "Workflow Preview"}</div>
                <div className={`text-xs truncate flex items-center gap-2 ${THEMES[theme].textSecondary}`}>
                  <span>Drag to pan • Scroll to zoom</span>
                  <Badge variant="outline" className="text-xs font-medium">
                    {stats.totalStages} stages • {stats.totalTransitions} transitions
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme */}
              <div className="flex items-center gap-1 rounded-xl border bg-white/50 p-1 shadow-sm">
                <Button type="button" size="sm" variant={theme === "light" ? "default" : "ghost"} className="h-8 px-3 rounded-lg" onClick={() => setTheme("light")}>
                  Light
                </Button>
                {/* <Button type="button" size="sm" variant={theme === "blue" ? "default" : "ghost"} className="h-8 px-3 rounded-lg" onClick={() => setTheme("blue")}>
                  Blue
                </Button>
                <Button type="button" size="sm" variant={theme === "dark" ? "default" : "ghost"} className="h-8 px-3 rounded-lg" onClick={() => setTheme("dark")}>
                  Dark
                </Button> */}
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Layout */}
              <div className="flex items-center gap-1 rounded-xl border bg-white/50 p-1 shadow-sm">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="button" size="sm" variant={layout === "horizontal" ? "default" : "ghost"} className="h-8 w-8 p-0 rounded-lg" onClick={() => setLayout("horizontal")}>
                      <LayoutDashboard className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Horizontal</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="button" size="sm" variant={layout === "vertical" ? "default" : "ghost"} className="h-8 w-8 p-0 rounded-lg" onClick={() => setLayout("vertical")}>
                      <LayoutList className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Vertical</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="button" size="sm" variant={layout === "radial" ? "default" : "ghost"} className="h-8 w-8 p-0 rounded-lg" onClick={() => setLayout("radial")}>
                      <GitFork className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Radial</TooltipContent>
                </Tooltip>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Zoom */}
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="button" variant="outline" size="icon" onClick={zoomOut} disabled={zoomLevel <= 0.06} className="h-8 w-8">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom Out (Ctrl -)</TooltipContent>
                </Tooltip>

                <div className="w-24 flex flex-col items-center">
                  <SimpleProgress value={zoomLevel * 40} />
                  <div className="text-xs mt-1 text-slate-600">{Math.round(zoomLevel * 100)}%</div>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="button" variant="outline" size="icon" onClick={zoomIn} disabled={zoomLevel >= 2.45} className="h-8 w-8">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom In (Ctrl +)</TooltipContent>
                </Tooltip>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Actions */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" variant="outline" size="icon" onClick={fit} className="hover:bg-slate-100 h-8 w-8">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reset View (Ctrl 0)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" variant="outline" size="icon" onClick={() => setIsFullScreen((v) => !v)} className="hover:bg-slate-100 h-8 w-8">
                    {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isFullScreen ? "Exit Full Screen" : "Full Screen"}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" variant="ghost" size="icon" onClick={close} className="hover:bg-red-50 hover:text-red-600 h-8 w-8">
                    <X className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Close (Esc)</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Stats Bar */}
          <div className={`h-10 border-b ${THEMES[theme].border} bg-white/80 backdrop-blur-sm flex items-center px-6 gap-6 text-sm`}>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-medium text-slate-700">Initial:</span>
              <span className="text-slate-600">{stats.initialStages}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span className="font-medium text-slate-700">Final:</span>
              <span className="text-slate-600">{stats.finalStages}</span>
            </div>

            <div className="flex items-center gap-2">
              <Grid3x3 className="h-4 w-4 text-slate-500" />
              <span className="font-medium text-slate-700">Stages:</span>
              <span className="text-slate-600">{stats.totalStages}</span>
            </div>

            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-slate-500" />
              <span className="font-medium text-slate-700">Transitions:</span>
              <span className="text-slate-600">{stats.totalTransitions}</span>
            </div>
          </div>

          {/* Canvas */}
          <div className={isFullScreen ? "h-[calc(100dvh-104px)] w-full relative" : "h-[calc(88vh-104px)] w-full relative"}>
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, rgba(100, 116, 139, 0.3) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <ReactFlow
              className={`${THEMES[theme].background} transition-colors duration-300`}
              onInit={(inst) => {
                rf.current = inst;
                inst.fitView({
                  padding: layout === "vertical" ? 0.55 : layout === "radial" ? 0.35 : 0.45,
                  duration: 0,
                  includeHiddenNodes: true,
                });
              }}
              onMoveEnd={() => {
                const viewport = rf.current?.getViewport();
                setZoomLevel(viewport?.zoom || 1);
              }}
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              defaultEdgeOptions={{
                type: "flow",
                animated: false,
                style: {
                  stroke: theme === "dark" ? "rgba(226, 232, 240, 0.4)" : "rgba(15, 23, 42, 0.3)",
                  strokeWidth: 2.5,
                },
              }}
              fitView
              fitViewOptions={{
                padding: layout === "vertical" ? 0.55 : layout === "radial" ? 0.35 : 0.45,
                includeHiddenNodes: true,
              }}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              selectNodesOnDrag={false}
              zoomOnDoubleClick={false}
              panOnDrag
              zoomOnScroll
              zoomOnPinch
              minZoom={0.05}
              maxZoom={2.5}
              proOptions={{ hideAttribution: true }}
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={32}
                size={1.2}
                color={theme === "dark" ? "rgba(148, 163, 184, 0.15)" : "rgba(100, 116, 139, 0.1)"}
              />

              <MiniMap zoomable pannable className="bg-white/90 backdrop-blur-sm border rounded-lg shadow-lg" />

              <Controls position="bottom-right" className="border bg-white/90 backdrop-blur-sm shadow-lg rounded-lg" showInteractive={false} />
            </ReactFlow>
          </div>

          {/* Footer */}
        </div>
      </div>
    </TooltipProvider>
  );
}
