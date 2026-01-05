// D:\Raghav\MasterDataManagement\frontend\src\lib\workflow\builder\WorkflowCanvas.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import ReactFlow, {
  Background,
  Controls,
  Connection,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

import FlowEdge from "./edges/FlowEdge";
import DefinitionNode from "./nodes/DefinitionNode";
import StageNode from "./nodes/StageNode";
import FloatingStageLibrary from "./library/FloatingStageLibrary";
import { TransitionPanel } from "./transitions/TransitionPanel";

const NODE_TYPES = {
  definition: DefinitionNode,
  stage: StageNode,
};

const EDGE_TYPES = {
  flow: FlowEdge,
};

function makeId() {
  // @ts-ignore
  return globalThis?.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function getStagePosition(index: number) {
  const COLS = 4;
  const GAP_X = 380;
  const GAP_Y = 260;
  const START_X = 200;
  const START_Y = 300;

  const col = index % COLS;
  const row = Math.floor(index / COLS);

  return { x: START_X + col * GAP_X, y: START_Y + row * GAP_Y };
}

// ✅ default colors per stage category (optional)
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

export default function WorkflowCanvas({
  form,
  stageArray,
  transitionArray,
  WorkflowStatus,
  mode,
  roleList = [],
  userList = [],
}: any) {
  const isReadOnly = mode === "view";

  // ✅ stop ReactFlow warning: keep stable references
  const nodeTypesRef = useRef(NODE_TYPES);
  const edgeTypesRef = useRef(EDGE_TYPES);
  const snapGridRef = useRef<[number, number]>([20, 20]);

  const stages =
    useWatch({
      control: form?.control,
      name: "stages",
    }) || [];

  const transitions =
    useWatch({
      control: form?.control,
      name: "transitions",
    }) || [];

  const [menuNodeId, setMenuNodeId] = useState<string | null>(null);
  const [libraryOpen, setLibraryOpen] = useState(false);

  const [transitionPanelOpen, setTransitionPanelOpen] = useState(false);
  const [activeTransitionIndex, setActiveTransitionIndex] = useState<number | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const activeTransition = useMemo(() => {
    if (activeTransitionIndex == null) return null;
    return transitions?.[activeTransitionIndex] ?? null;
  }, [activeTransitionIndex, transitions]);

  const openTransitionIndex = useCallback((index: number) => {
    setActiveTransitionIndex(index);
    setTransitionPanelOpen(true);
  }, []);

  const createTransitionAndOpen = useCallback(
    (fromStageId: string, toStageId: string) => {
      const index = transitions.length;

      transitionArray.append({
        tempId: makeId(),
        label: "",
        fromStageId,
        toStageId,
        transitionType: "NORMAL",
        triggerStrategy: "ANY_ALLOWED",
        approvalStrategy: "ALL",
        approvalConfig: undefined,
        allowedRoleIds: [],
        allowedUserIds: [],
        autoTrigger: false,
      });

      setTimeout(() => openTransitionIndex(index), 0);
    },
    [transitionArray, transitions.length, openTransitionIndex]
  );

  /* ✅ normalize ids/positions once */
  const didNormalize = useRef(false);
  useEffect(() => {
    if (!form || didNormalize.current) return;
    didNormalize.current = true;

    const s = form.getValues?.("stages") ?? [];
    s.forEach((st: any, i: number) => {
      if (!st?.tempId) {
        form.setValue(`stages.${i}.tempId`, String(st?.id ?? st?.stageId ?? makeId()), {
          shouldDirty: false,
        });
      }
      if (!st?.position) {
        form.setValue(`stages.${i}.position`, getStagePosition(i), { shouldDirty: false });
      }
    });

    const tr = form.getValues?.("transitions") ?? [];
    tr.forEach((t: any, i: number) => {
      if (!t?.tempId) {
        form.setValue(`transitions.${i}.tempId`, String(t?.id ?? t?.transitionId ?? makeId()), {
          shouldDirty: false,
        });
      }
    });
  }, [form]);

  /* AUTO INITIAL (FIRST DRAFT) */
  useEffect(() => {
    if (!Array.isArray(stages) || !form) return;

    const firstDraftIndex = stages.findIndex((s: any) => s?.category === "DRAFT");

    stages.forEach((s: any, i: number) => {
      const shouldBeInitial = s?.category === "DRAFT" && i === firstDraftIndex;
      if (s?.isInitial !== shouldBeInitial) {
        form.setValue(`stages.${i}.isInitial`, shouldBeInitial, { shouldDirty: true });
      }
    });
  }, [stages, form]);

  /* FORM → CANVAS (NODES) */
  useEffect(() => {
    if (!form) return;

    const workflowNode: Node = {
      id: "workflow",
      type: "definition",
      position: { x: 200, y: 80 },
      draggable: false,
      selectable: false,
      data: {
        name: form.watch?.("name") ?? "",
        resourceName: form.watch?.("resourceId") ?? "",
        readOnly: true,
      },
    };

    const stageNodes: Node[] = stages
      .filter((s: any) => !!s?.tempId)
      .map((s: any, i: number) => ({
        id: String(s.tempId),
        type: "stage",
        position: s.position ?? getStagePosition(i),
        draggable: !isReadOnly,
        selectable: true,
        dragHandle: ".drag-handle",
        data: {
          ...s,
          readOnly: isReadOnly,
          showMenu: menuNodeId === s.tempId,

          onNameChange: (value: string) => {
            form.setValue(`stages.${i}.name`, value, { shouldDirty: true });
          },

          onToggleMenu: () => setMenuNodeId(menuNodeId === s.tempId ? null : s.tempId),

          onDelete: () => {
            setMenuNodeId(null);

            const index = stageArray.fields.findIndex((x: any) => x.tempId === s.tempId);
            if (index !== -1) stageArray.remove(index);

            const removeTransitionIndexes = transitions
              .map((t: any, ti: number) =>
                String(t.fromStageId) === String(s.tempId) || String(t.toStageId) === String(s.tempId)
                  ? ti
                  : -1
              )
              .filter((x: number) => x !== -1)
              .reverse();

            removeTransitionIndexes.forEach((ti: number) => transitionArray.remove(ti));
          },

          onDuplicate: () => {
            setMenuNodeId(null);
            stageArray.append({
              ...s,
              tempId: makeId(),
              name: `${s.name} Copy`,
              isInitial: false,
              isFinal: false,
              position: {
                x: (s.position?.x ?? getStagePosition(i).x) + 40,
                y: (s.position?.y ?? getStagePosition(i).y) + 40,
              },
            });
          },
        },
      }));

    setNodes([workflowNode, ...stageNodes]);
  }, [stages, menuNodeId, isReadOnly, form, stageArray, transitionArray, transitions, setNodes]);

  /* ✅ FORM → CANVAS (EDGES)  (FULL FIX: label + color + parallelIndex) */
  useEffect(() => {
    const initialStage = stages.find((s: any) => s?.isInitial);

    const baseEdges: Edge[] = initialStage?.tempId
      ? [
          {
            id: "workflow-to-initial",
            source: "workflow",
            target: String(initialStage.tempId),
            deletable: false,
            type: "flow",
            data: {
              live: true,
              kind: "initial",
              label: "Start", // optional
              layout: "horizontal",
              parallelIndex: 1,
            },
          },
        ]
      : [];

    const findStage = (id: any) =>
      stages.find((s: any) => String(s?.tempId) === String(id));

    // ✅ count parallel edges per pair
    const seen: Record<string, number> = {};

    const transitionEdges: Edge[] = transitions
      .filter((t: any) => t?.tempId && t?.fromStageId && t?.toStageId)
      .map((t: any) => {
        const from = findStage(t.fromStageId);
        const to = findStage(t.toStageId);

        // ✅ label priority: transition.label then other fallbacks
        const label = String(
          t?.label ??
            t?.actionLabel ??
            t?.action ??
            t?.transitionLabel ??
            ""
        ).trim();

        // ✅ edge stroke priority:
        // 1) t.stroke (if you store)
        // 2) fromStage.color (if you store)
        // 3) category map
        const stroke =
          (t?.stroke as string) ||
          (from?.color as string) ||
          CATEGORY_COLOR[String(from?.category ?? "")] ||
          undefined;

        // ✅ parallel index for same from->to pair
        const key = `${String(t.fromStageId)}→${String(t.toStageId)}`;
        const pi = (seen[key] ?? 0) + 1;
        seen[key] = pi;

        return {
          id: String(t.tempId),
          source: String(t.fromStageId),
          target: String(t.toStageId),
          type: "flow",
          data: {
            live: true,
            label, // ✅ THIS makes label box appear in builder view
            ...(stroke ? { stroke } : {}), // ✅ stage based color line
            layout: "horizontal",
            parallelIndex: pi,
          },
          style:
            activeTransition?.tempId === t.tempId
              ? { strokeWidth: 3 }
              : undefined,
        } as Edge;
      });

    setEdges([...baseEdges, ...transitionEdges]);
  }, [stages, transitions, activeTransition, setEdges]);

  /* CONNECT STAGES */
  const onConnect = useCallback(
    (c: Connection) => {
      if (isReadOnly || !c.source || !c.target) return;
      if (c.source === "workflow") return;

      createTransitionAndOpen(String(c.source), String(c.target));
    },
    [isReadOnly, createTransitionAndOpen]
  );

  /* DOUBLE CLICK NODE → open first outgoing transition */
  const onNodeDoubleClick = useCallback(
    (_: any, node: Node) => {
      if (isReadOnly) return;
      if (!node?.id || node.id === "workflow") return;

      const idx = transitions.findIndex((t: any) => String(t?.fromStageId) === String(node.id));
      if (idx !== -1) {
        openTransitionIndex(idx);
        return;
      }

      const index = transitions.length;
      transitionArray.append({
        tempId: makeId(),
        label: "",
        fromStageId: node.id,
        toStageId: "",
        transitionType: "NORMAL",
        triggerStrategy: "ANY_ALLOWED",
        approvalStrategy: "ALL",
        approvalConfig: undefined,
        allowedRoleIds: [],
        allowedUserIds: [],
        autoTrigger: false,
      });

      setTimeout(() => openTransitionIndex(index), 0);
    },
    [isReadOnly, transitions, transitionArray, openTransitionIndex]
  );

  /* CLICK EDGE → open that transition */
  const onEdgeClick = useCallback(
    (e: any, edge: Edge) => {
      e?.stopPropagation?.();
      const idx = transitions.findIndex((t: any) => String(t?.tempId) === String(edge.id));
      if (idx !== -1) openTransitionIndex(idx);
    },
    [transitions, openTransitionIndex]
  );

  /* SAVE POSITION */
  const onNodeDragStop = useCallback(
    (_: any, node: Node) => {
      if (node.id === "workflow") return;

      const index = stages.findIndex((s: any) => String(s.tempId) === String(node.id));
      if (index !== -1) {
        form.setValue(`stages.${index}.position`, node.position, { shouldDirty: true });
      }
    },
    [stages, form]
  );

  const handleAddStage = useCallback(
    (t: any) => {
      const pos = getStagePosition(stages.length);

      stageArray.append({
        tempId: makeId(),
        name: t.defaultName,
        category: t.category,
        isInitial: t.category === "DRAFT",
        isFinal: !!t.isFinal,
        position: pos,

        // ✅ OPTIONAL: auto set stage color by category
        color: CATEGORY_COLOR[t.category] ?? null,
      });

      setLibraryOpen(false);
    },
    [stageArray, stages.length]
  );

  return (
    <div className="h-full w-full relative">
      {!isReadOnly && (
        <FloatingStageLibrary
          open={libraryOpen}
          onToggle={() => setLibraryOpen((v: boolean) => !v)}
          onSelect={handleAddStage}
        />
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypesRef.current}
        edgeTypes={edgeTypesRef.current}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodeDoubleClick={onNodeDoubleClick}
        onEdgeClick={onEdgeClick}
        snapToGrid
        snapGrid={snapGridRef.current}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      <TransitionPanel
        open={transitionPanelOpen}
        onClose={() => setTransitionPanelOpen(false)}
        activeIndex={activeTransitionIndex}
        onSelectIndex={openTransitionIndex}
        form={form}
        transitionArray={transitionArray}
        stages={stages}
        roleList={roleList}
        userList={userList}
      />
    </div>
  );
}
