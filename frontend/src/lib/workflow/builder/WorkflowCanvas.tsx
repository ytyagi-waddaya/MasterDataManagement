// // D:\Raghav\MasterDataManagement\frontend\src\lib\workflow\builder\WorkflowCanvas.tsx
// "use client";

// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { useWatch } from "react-hook-form";
// import ReactFlow, {
//   Background,
//   Controls,
//   Connection,
//   Node,
//   Edge,
//   ConnectionMode,
//   addEdge,
//   useNodesState,
//   useEdgesState,
// } from "reactflow";
// import "reactflow/dist/style.css";

// import FlowEdge from "./edges/FlowEdge";
// import DefinitionNode from "./nodes/DefinitionNode";
// import StageNode from "./nodes/StageNode";
// import FloatingStageLibrary from "./library/FloatingStageLibrary";
// import { TransitionPanel } from "./transitions/TransitionPanel";

// // ✅ Use your stageLibrary colors (single source of truth)
// import { getStageColor } from "./library/stageLibrary";

// const NODE_TYPES = {
//   definition: DefinitionNode,
//   stage: StageNode,
// };

// const EDGE_TYPES = {
//   flow: FlowEdge,
// };

// function makeId() {
//   // @ts-ignore
//   return globalThis?.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
// }

// function getStagePosition(index: number) {
//   const COLS = 4;
//   const GAP_X = 380;
//   const GAP_Y = 260;
//   const START_X = 200;
//   const START_Y = 300;

//   const col = index % COLS;
//   const row = Math.floor(index / COLS);

//   return { x: START_X + col * GAP_X, y: START_Y + row * GAP_Y };
// }

// const DEFAULT_COLOR = "#64748b";

// // ✅ never allow null/empty colors
// function safeColor(category?: any, color?: any) {
//   if (typeof color === "string" && color.trim()) return color;
//   return getStageColor(category) || DEFAULT_COLOR;
// }

// // Helper: choose best source handle based on node positions
// function getOptimalHandle(
//   sourcePos: { x: number; y: number },
//   targetPos: { x: number; y: number }
// ) {
//   const dx = targetPos.x - sourcePos.x;
//   const dy = targetPos.y - sourcePos.y;
//   const absDx = Math.abs(dx);
//   const absDy = Math.abs(dy);

//   if (absDx > absDy) return dx > 0 ? "right-source" : "left-source";
//   return dy > 0 ? "bottom-source" : "top-source";
// }

// export default function WorkflowCanvas({
//   form,
//   stageArray,
//   transitionArray,
//   WorkflowStatus,
//   mode,
//   roleList = [],
//   userList = [],
// }: any) {
//   const isReadOnly = mode === "view";

//   // ✅ stable refs
//   const nodeTypesRef = useRef(NODE_TYPES);
//   const edgeTypesRef = useRef(EDGE_TYPES);
//   const snapGridRef = useRef<[number, number]>([20, 20]);

//   const stages =
//     useWatch({
//       control: form?.control,
//       name: "stages",
//     }) || [];

//   const transitions =
//     useWatch({
//       control: form?.control,
//       name: "transitions",
//     }) || [];

//   const [menuNodeId, setMenuNodeId] = useState<string | null>(null);
//   const [libraryOpen, setLibraryOpen] = useState(false);

//   const [transitionPanelOpen, setTransitionPanelOpen] = useState(false);
//   const [activeTransitionIndex, setActiveTransitionIndex] = useState<number | null>(null);

//   const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

//   const activeTransition = useMemo(() => {
//     if (activeTransitionIndex == null) return null;
//     return transitions?.[activeTransitionIndex] ?? null;
//   }, [activeTransitionIndex, transitions]);

//   const openTransitionIndex = useCallback((index: number) => {
//     setActiveTransitionIndex(index);
//     setTransitionPanelOpen(true);
//   }, []);

//   // ✅ store handle ids (left/top/right/bottom)
//   const createTransitionAndOpen = useCallback(
//     (
//       fromStageId: string,
//       toStageId: string,
//       sourceHandle?: string | null,
//       targetHandle?: string | null
//     ) => {
//       const index = transitions.length;

//       transitionArray.append({
//         tempId: makeId(),
//         label: "",
//         fromStageId,
//         toStageId,
//         sourceHandle: sourceHandle ?? null,
//         targetHandle: targetHandle ?? null,
//         transitionType: "NORMAL",
//         triggerStrategy: "ANY_ALLOWED",
//         approvalStrategy: "ALL",
//         approvalConfig: undefined,
//         allowedRoleIds: [],
//         allowedUserIds: [],
//         autoTrigger: false,
//       });

//       setTimeout(() => openTransitionIndex(index), 0);
//     },
//     [transitionArray, transitions.length, openTransitionIndex]
//   );

//   /* ✅ normalize ids/positions/colors ONCE */
//   const didNormalize = useRef(false);
//   useEffect(() => {
//     if (!form || didNormalize.current) return;
//     didNormalize.current = true;

//     const s = form.getValues?.("stages") ?? [];
//     s.forEach((st: any, i: number) => {
//       if (!st?.tempId) {
//         form.setValue(`stages.${i}.tempId`, String(st?.id ?? st?.stageId ?? makeId()), {
//           shouldDirty: false,
//         });
//       }
//       if (!st?.position) {
//         form.setValue(`stages.${i}.position`, getStagePosition(i), { shouldDirty: false });
//       }

//       // ✅ CRITICAL FIX: set color in BOTH form + fieldArray (payload uses fieldArray)
//       const fixedColor = safeColor(st?.category, st?.color);
//       if (st?.color !== fixedColor) {
//         form.setValue(`stages.${i}.color`, fixedColor, { shouldDirty: false });

//         if (typeof stageArray?.update === "function") {
//           stageArray.update(i, { ...st, color: fixedColor });
//         }
//       }
//     });

//     const tr = form.getValues?.("transitions") ?? [];
//     tr.forEach((t: any, i: number) => {
//       if (!t?.tempId) {
//         form.setValue(
//           `transitions.${i}.tempId`,
//           String(t?.id ?? t?.transitionId ?? makeId()),
//           { shouldDirty: false }
//         );
//       }
//     });
//   }, [form, stageArray]);

//   /* ✅ EXTRA SAFETY: whenever stages change, repair null/empty color (form + fieldArray) */
//   useEffect(() => {
//     if (!form || !Array.isArray(stages)) return;

//     stages.forEach((st: any, i: number) => {
//       const bad = st?.color == null || typeof st?.color !== "string" || !String(st.color).trim();
//       if (!bad) return;

//       const fixedColor = safeColor(st?.category, st?.color);
//       form.setValue(`stages.${i}.color`, fixedColor, { shouldDirty: true });

//       if (typeof stageArray?.update === "function") {
//         const current = stageArray?.fields?.[i];
//         stageArray.update(i, { ...(current ?? st), color: fixedColor });
//       }
//     });
//   }, [stages, form, stageArray]);

//   /* AUTO INITIAL */
//   useEffect(() => {
//     if (!Array.isArray(stages) || !form) return;

//     const firstDraftIndex = stages.findIndex(
//       (s: any) => String(s?.category).toUpperCase() === "DRAFT"
//     );

//     stages.forEach((s: any, i: number) => {
//       const shouldBeInitial = String(s?.category).toUpperCase() === "DRAFT" && i === firstDraftIndex;
//       if (s?.isInitial !== shouldBeInitial) {
//         form.setValue(`stages.${i}.isInitial`, shouldBeInitial, { shouldDirty: true });
//       }
//     });
//   }, [stages, form]);

//   /* FORM → CANVAS (NODES) */
//   useEffect(() => {
//     if (!form) return;

//     const workflowNode: Node = {
//       id: "workflow",
//       type: "definition",
//       position: { x: 200, y: 80 },
//       draggable: false,
//       selectable: false,
//       data: {
//         name: form.watch?.("name") ?? "",
//         resourceName: form.watch?.("resourceId") ?? "",
//         readOnly: true,
//       },
//     };

//     const stageNodes: Node[] = stages
//       .filter((s: any) => !!s?.tempId)
//       .map((s: any, i: number) => {
//         const fixedColor = safeColor(s?.category, s?.color);

//         return {
//           id: String(s.tempId),
//           type: "stage",
//           position: s.position ?? getStagePosition(i),
//           draggable: !isReadOnly,
//           selectable: true,
//           dragHandle: ".drag-handle",
//           data: {
//             ...s,
//             color: fixedColor, // ✅ always string
//             readOnly: isReadOnly,
//             showMenu: menuNodeId === s.tempId,

//             onNameChange: (value: string) =>
//               form.setValue(`stages.${i}.name`, value, { shouldDirty: true }),

//             onToggleMenu: () => setMenuNodeId(menuNodeId === s.tempId ? null : s.tempId),

//             onDelete: () => {
//               setMenuNodeId(null);

//               const index = stageArray.fields.findIndex((x: any) => x.tempId === s.tempId);
//               if (index !== -1) stageArray.remove(index);

//               const removeTransitionIndexes = transitions
//                 .map((t: any, ti: number) =>
//                   String(t.fromStageId) === String(s.tempId) ||
//                   String(t.toStageId) === String(s.tempId)
//                     ? ti
//                     : -1
//                 )
//                 .filter((x: number) => x !== -1)
//                 .reverse();

//               removeTransitionIndexes.forEach((ti: number) => transitionArray.remove(ti));
//             },

//             onDuplicate: () => {
//               setMenuNodeId(null);

//               stageArray.append({
//                 ...s,
//                 tempId: makeId(),
//                 name: `${s.name} Copy`,
//                 isInitial: false,
//                 isFinal: false,
//                 position: {
//                   x: (s.position?.x ?? getStagePosition(i).x) + 40,
//                   y: (s.position?.y ?? getStagePosition(i).y) + 40,
//                 },
//                 color: safeColor(s?.category, s?.color),
//               });
//             },
//           },
//         };
//       });

//     setNodes([workflowNode, ...stageNodes]);
//   }, [stages, menuNodeId, isReadOnly, form, stageArray, transitionArray, transitions, setNodes]);

//   /* FORM → CANVAS (EDGES) */
//   useEffect(() => {
//     const initialStage = stages.find((s: any) => s?.isInitial);

//     const baseEdges: Edge[] = initialStage?.tempId
//       ? [
//           {
//             id: "workflow-to-initial",
//             source: "workflow",
//             target: String(initialStage.tempId),
//             deletable: false,
//             type: "flow",
//             sourceHandle: "right-source",
//             targetHandle: "left-target",
//             data: {
//               live: true,
//               kind: "initial",
//               label: "Start",
//               layout: "horizontal",
//               parallelIndex: 1,
//             },
//           },
//         ]
//       : [];

//     const findStage = (id: any) => stages.find((s: any) => String(s?.tempId) === String(id));
//     const seen: Record<string, number> = {};

//     const transitionEdges: Edge[] = transitions
//       .filter((t: any) => t?.tempId && t?.fromStageId && t?.toStageId)
//       .map((t: any) => {
//         const from = findStage(t.fromStageId);
//         const to = findStage(t.toStageId);

//         const label = String(t?.label ?? t?.actionLabel ?? t?.action ?? t?.transitionLabel ?? "").trim();

//         const stroke =
//           (t?.stroke as string) || safeColor(from?.category, from?.color) || DEFAULT_COLOR;

//         const key = `${String(t.fromStageId)}→${String(t.toStageId)}`;
//         const pi = (seen[key] ?? 0) + 1;
//         seen[key] = pi;

//         return {
//           id: String(t.tempId),
//           source: String(t.fromStageId),
//           target: String(t.toStageId),

//           sourceHandle:
//             t?.sourceHandle ||
//             getOptimalHandle(from?.position || { x: 0, y: 0 }, to?.position || { x: 0, y: 0 }),

//           // ✅ if not saved, just keep a sane default
//           targetHandle: t?.targetHandle || "left-target",

//           type: "flow",
//           data: {
//             live: true,
//             label,
//             stroke,
//             layout: "horizontal",
//             parallelIndex: pi,
//           },
//           style: activeTransition?.tempId === t.tempId ? { strokeWidth: 3 } : undefined,
//         } as Edge;
//       });

//     setEdges([...baseEdges, ...transitionEdges]);
//   }, [stages, transitions, activeTransition, setEdges]);

//   /* CONNECT (4 sides) */
//   const onConnect = useCallback(
//     (c: Connection) => {
//       if (isReadOnly || !c.source || !c.target || !c.sourceHandle) return;
//       if (c.source === "workflow") return;

//       // visual feedback
//       setEdges((eds) =>
//         addEdge(
//           {
//             ...c,
//             id: `temp-${Date.now()}`,
//             type: "flow",
//             data: { live: true, layout: "horizontal", parallelIndex: 1 },
//           },
//           eds
//         )
//       );

//       // target handle (same side as source side)
//       let targetHandle = "left-target";
//       if (c.sourceHandle.includes("top")) targetHandle = "top-target";
//       else if (c.sourceHandle.includes("right")) targetHandle = "right-target";
//       else if (c.sourceHandle.includes("bottom")) targetHandle = "bottom-target";
//       else if (c.sourceHandle.includes("left")) targetHandle = "left-target";

//       createTransitionAndOpen(String(c.source), String(c.target), c.sourceHandle, targetHandle);
//     },
//     [isReadOnly, createTransitionAndOpen, setEdges]
//   );

//   /* DOUBLE CLICK NODE */
//   const onNodeDoubleClick = useCallback(
//     (_: any, node: Node) => {
//       if (isReadOnly) return;
//       if (!node?.id || node.id === "workflow") return;

//       const idx = transitions.findIndex((t: any) => String(t?.fromStageId) === String(node.id));
//       if (idx !== -1) {
//         openTransitionIndex(idx);
//         return;
//       }

//       const index = transitions.length;
//       transitionArray.append({
//         tempId: makeId(),
//         label: "",
//         fromStageId: node.id,
//         toStageId: "",
//         sourceHandle: "right-source",
//         targetHandle: null,
//         transitionType: "NORMAL",
//         triggerStrategy: "ANY_ALLOWED",
//         approvalStrategy: "ALL",
//         approvalConfig: undefined,
//         allowedRoleIds: [],
//         allowedUserIds: [],
//         autoTrigger: false,
//       });

//       setTimeout(() => openTransitionIndex(index), 0);
//     },
//     [isReadOnly, transitions, transitionArray, openTransitionIndex]
//   );

//   /* CLICK EDGE */
//   const onEdgeClick = useCallback(
//     (e: any, edge: Edge) => {
//       e?.stopPropagation?.();
//       const idx = transitions.findIndex((t: any) => String(t?.tempId) === String(edge.id));
//       if (idx !== -1) openTransitionIndex(idx);
//     },
//     [transitions, openTransitionIndex]
//   );

//   /* SAVE POSITION */
//   const onNodeDragStop = useCallback(
//     (_: any, node: Node) => {
//       if (node.id === "workflow") return;

//       const index = stages.findIndex((s: any) => String(s.tempId) === String(node.id));
//       if (index !== -1) {
//         form.setValue(`stages.${index}.position`, node.position, { shouldDirty: true });
//       }
//     },
//     [stages, form]
//   );

//   const handleAddStage = useCallback(
//     (t: any) => {
//       const pos = getStagePosition(stages.length);

//       stageArray.append({
//         tempId: makeId(),
//         name: t.defaultName,
//         category: t.category,
//         isInitial: t.category === "DRAFT",
//         isFinal: !!t.isFinal,
//         position: pos,
//         color: safeColor(t.category, t.color),
//       });

//       setLibraryOpen(false);
//     },
//     [stageArray, stages.length]
//   );

//   // keep default reactflow-ish connection line (simple)
//   const connectionLineStyle = {
//     strokeWidth: 2,
//     stroke: "#94a3b8",
//   };

//   return (
//     <div className="h-full w-full relative">
//       {!isReadOnly && (
//         <FloatingStageLibrary
//           open={libraryOpen}
//           onToggle={() => setLibraryOpen((v: boolean) => !v)}
//           onSelect={handleAddStage}
//         />
//       )}

//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         nodeTypes={nodeTypesRef.current}
//         edgeTypes={edgeTypesRef.current}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onNodeDragStop={onNodeDragStop}
//         onNodeDoubleClick={onNodeDoubleClick}
//         onEdgeClick={onEdgeClick}
//         snapToGrid
//         snapGrid={snapGridRef.current}
//         fitView
//         connectionMode={ConnectionMode.Loose}
//         connectionLineStyle={connectionLineStyle}
//         defaultEdgeOptions={{
//           type: "flow",
//           animated: false,
//           style: { strokeWidth: 2, stroke: "#94a3b8" },
//         }}
//       >
//         {/* ✅ Default ReactFlow background (same feel as original) */}
//         <Background />
//         <Controls />
//       </ReactFlow>

//       <TransitionPanel
//         open={transitionPanelOpen}
//         onClose={() => setTransitionPanelOpen(false)}
//         activeIndex={activeTransitionIndex}
//         onSelectIndex={openTransitionIndex}
//         form={form}
//         transitionArray={transitionArray}
//         stages={stages}
//         roleList={roleList}
//         userList={userList}
//       />
//     </div>
//   );
// }



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
  ConnectionMode,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

import FlowEdge from "./edges/FlowEdge";
import DefinitionNode from "./nodes/DefinitionNode";
import StageNode from "./nodes/StageNode";
import FloatingStageLibrary from "./library/FloatingStageLibrary";
import { TransitionPanel } from "./transitions/TransitionPanel";

// ✅ Use your stageLibrary colors (single source of truth)
import { getStageColor } from "./library/stageLibrary";

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

const DEFAULT_COLOR = "#64748b";

// ✅ never allow null/empty colors
function safeColor(category?: any, color?: any) {
  if (typeof color === "string" && color.trim()) return color;
  return getStageColor(category) || DEFAULT_COLOR;
}

function isValidPos(p: any) {
  return (
    p &&
    typeof p === "object" &&
    typeof p.x === "number" &&
    typeof p.y === "number" &&
    Number.isFinite(p.x) &&
    Number.isFinite(p.y)
  );
}

// Helper: choose best source handle based on node positions
function getOptimalHandle(
  sourcePos: { x: number; y: number },
  targetPos: { x: number; y: number }
) {
  const dx = targetPos.x - sourcePos.x;
  const dy = targetPos.y - sourcePos.y;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  if (absDx > absDy) return dx > 0 ? "right-source" : "left-source";
  return dy > 0 ? "bottom-source" : "top-source";
}

export default function WorkflowCanvas({
  form,
  stageArray,
  transitionArray,
  WorkflowStatus, // unused but kept for compatibility
  mode,
  roleList = [],
  userList = [],
}: any) {
  const isReadOnly = mode === "view";

  // ✅ stable refs
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

  // ✅ store handle ids (left/top/right/bottom)
  const createTransitionAndOpen = useCallback(
    (
      fromStageId: string,
      toStageId: string,
      sourceHandle?: string | null,
      targetHandle?: string | null
    ) => {
      const index = transitions.length;

      transitionArray.append({
        tempId: makeId(),
        label: "",
        fromStageId,
        toStageId,
        sourceHandle: sourceHandle ?? null,
        targetHandle: targetHandle ?? null,
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

  /**
   * ✅ CRITICAL FIX (EDIT MODE):
   * - Backend expects stages[i].position as object
   * - In edit payload, position can be null (e.g., Completed.position = null)
   * - Payload often comes from stageArray.fields (fieldArray), not only form values
   * So: normalize & sync BOTH (form + fieldArray) using replace/update.
   */
  const syncingStagesRef = useRef(false);
  useEffect(() => {
    if (!form || !Array.isArray(stages)) return;
    if (syncingStagesRef.current) return;

    syncingStagesRef.current = true;
    try {
      const normalized = stages.map((st: any, i: number) => {
        const tempId = st?.tempId
          ? String(st.tempId)
          : String(st?.id ?? st?.stageId ?? makeId());

        const position = isValidPos(st?.position) ? st.position : getStagePosition(i);

        const allowedNextCategories = Array.isArray(st?.allowedNextCategories)
          ? st.allowedNextCategories
          : [];

        const color = safeColor(st?.category, st?.color);

        return {
          ...st,
          tempId,
          position,
          allowedNextCategories,
          color,
        };
      });

      // ✅ Keep FORM correct (UI/watch)
      normalized.forEach((ns: any, i: number) => {
        const cur = stages[i];

        if (String(cur?.tempId ?? "") !== String(ns.tempId)) {
          form.setValue(`stages.${i}.tempId`, ns.tempId, { shouldDirty: false });
        }

        if (!isValidPos(cur?.position)) {
          form.setValue(`stages.${i}.position`, ns.position, { shouldDirty: false });
        }

        if (!Array.isArray(cur?.allowedNextCategories)) {
          form.setValue(`stages.${i}.allowedNextCategories`, ns.allowedNextCategories, {
            shouldDirty: false,
          });
        }

        const badColor =
          cur?.color == null || typeof cur?.color !== "string" || !String(cur.color).trim();

        if (badColor) {
          form.setValue(`stages.${i}.color`, ns.color, { shouldDirty: false });
        }
      });

      // ✅ Keep FIELD ARRAY correct (payload often uses this)
      if (typeof stageArray?.replace === "function") {
        const fa = stageArray?.fields ?? [];

        const needsReplace =
          fa.length !== normalized.length ||
          normalized.some((ns: any, i: number) => {
            const f: any = fa[i];
            if (!f) return true;
            if (String(f.tempId ?? "") !== String(ns.tempId)) return true;
            if (!isValidPos(f.position)) return true;
            if (!Array.isArray(f.allowedNextCategories)) return true;
            if (typeof f.color !== "string" || !String(f.color).trim()) return true;
            return false;
          });

        if (needsReplace) {
          stageArray.replace(normalized);
        }
      } else if (typeof stageArray?.update === "function") {
        // fallback if replace not available
        normalized.forEach((ns: any, i: number) => {
          const currentFA = stageArray?.fields?.[i] ?? ns;
          stageArray.update(i, { ...currentFA, ...ns });
        });
      }
    } finally {
      syncingStagesRef.current = false;
    }
  }, [stages, form, stageArray]);

  // ✅ Ensure transitions have tempId as well (helps edit mode)
  const syncingTransitionsRef = useRef(false);
  useEffect(() => {
    if (!form || !Array.isArray(transitions)) return;
    if (syncingTransitionsRef.current) return;

    syncingTransitionsRef.current = true;
    try {
      transitions.forEach((t: any, i: number) => {
        if (t?.tempId) return;

        const tid = String(t?.id ?? t?.transitionId ?? makeId());
        form.setValue(`transitions.${i}.tempId`, tid, { shouldDirty: false });

        if (typeof transitionArray?.update === "function") {
          const currentFA = transitionArray?.fields?.[i] ?? t;
          transitionArray.update(i, { ...currentFA, tempId: tid });
        }
      });
    } finally {
      syncingTransitionsRef.current = false;
    }
  }, [transitions, form, transitionArray]);

  /* AUTO INITIAL */
  useEffect(() => {
    if (!Array.isArray(stages) || !form) return;

    const firstDraftIndex = stages.findIndex(
      (s: any) => String(s?.category).toUpperCase() === "DRAFT"
    );

    stages.forEach((s: any, i: number) => {
      const shouldBeInitial =
        String(s?.category).toUpperCase() === "DRAFT" && i === firstDraftIndex;
      if (s?.isInitial !== shouldBeInitial) {
        form.setValue(`stages.${i}.isInitial`, shouldBeInitial, { shouldDirty: true });
      }
    });
  }, [stages, form]);

  // ✅ helper: update stage in BOTH form + fieldArray (keeps sync everywhere)
  const updateStageByTempId = useCallback(
    (tempId: any, patch: any) => {
      const idx = stages.findIndex((x: any) => String(x?.tempId) === String(tempId));
      if (idx === -1) return;

      Object.keys(patch || {}).forEach((key) => {
        form.setValue(`stages.${idx}.${key}`, patch[key], { shouldDirty: true });
      });

      if (typeof stageArray?.update === "function") {
        const current = stageArray?.fields?.[idx] ?? stages[idx];
        stageArray.update(idx, { ...current, ...patch });
      }
    },
    [stages, form, stageArray]
  );

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
      .map((s: any, i: number) => {
        const fixedColor = safeColor(s?.category, s?.color);

        return {
          id: String(s.tempId),
          type: "stage",
          position: isValidPos(s.position) ? s.position : getStagePosition(i),
          draggable: !isReadOnly,
          selectable: true,
          dragHandle: ".drag-handle",
          data: {
            ...s,
            color: fixedColor, // ✅ always string
            readOnly: isReadOnly,

            // ✅ IMPORTANT: show builder UI only in builder mode
            mode: isReadOnly ? "view" : "builder",

            // ✅ ensure array
            allowedNextCategories: Array.isArray(s?.allowedNextCategories)
              ? s.allowedNextCategories
              : [],

            showMenu: menuNodeId === s.tempId,

            onNameChange: (value: string) => {
              updateStageByTempId(s.tempId, { name: value });
            },

            // ✅ StageNode -> form + stages step sync
            onAllowedNextCategoriesChange: (next: string[]) => {
              updateStageByTempId(s.tempId, {
                allowedNextCategories: Array.isArray(next) ? next : [],
              });
            },

            // ✅ patch updater
            onChange: (patch: any) => {
              if (!patch) return;
              updateStageByTempId(s.tempId, patch);
            },

            onToggleMenu: () =>
              setMenuNodeId(menuNodeId === s.tempId ? null : s.tempId),

            onDelete: () => {
              setMenuNodeId(null);

              const index = stageArray.fields.findIndex((x: any) => x.tempId === s.tempId);
              if (index !== -1) stageArray.remove(index);

              const removeTransitionIndexes = transitions
                .map((t: any, ti: number) =>
                  String(t.fromStageId) === String(s.tempId) ||
                  String(t.toStageId) === String(s.tempId)
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
                  x: (isValidPos(s.position) ? s.position.x : getStagePosition(i).x) + 40,
                  y: (isValidPos(s.position) ? s.position.y : getStagePosition(i).y) + 40,
                },
                color: safeColor(s?.category, s?.color),
                allowedNextCategories: Array.isArray(s?.allowedNextCategories)
                  ? s.allowedNextCategories
                  : [],
              });
            },
          },
        };
      });

    setNodes([workflowNode, ...stageNodes]);
  }, [
    stages,
    menuNodeId,
    isReadOnly,
    form,
    stageArray,
    transitionArray,
    transitions,
    setNodes,
    updateStageByTempId,
  ]);

  /* FORM → CANVAS (EDGES) */
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
            sourceHandle: "right-source",
            targetHandle: "left-target",
            data: {
              live: true,
              kind: "initial",
              label: "Start",
              layout: "horizontal",
              parallelIndex: 1,
            },
          },
        ]
      : [];

    const findStage = (id: any) =>
      stages.find((s: any) => String(s?.tempId) === String(id));

    const seen: Record<string, number> = {};

    const transitionEdges: Edge[] = transitions
      .filter((t: any) => t?.tempId && t?.fromStageId && t?.toStageId)
      .map((t: any) => {
        const from = findStage(t.fromStageId);
        const to = findStage(t.toStageId);

        const label = String(
          t?.label ?? t?.actionLabel ?? t?.action ?? t?.transitionLabel ?? ""
        ).trim();

        const stroke =
          (t?.stroke as string) || safeColor(from?.category, from?.color) || DEFAULT_COLOR;

        const key = `${String(t.fromStageId)}→${String(t.toStageId)}`;
        const pi = (seen[key] ?? 0) + 1;
        seen[key] = pi;

        const fromPos = isValidPos(from?.position) ? from.position : { x: 0, y: 0 };
        const toPos = isValidPos(to?.position) ? to.position : { x: 0, y: 0 };

        return {
          id: String(t.tempId),
          source: String(t.fromStageId),
          target: String(t.toStageId),

          sourceHandle: t?.sourceHandle || getOptimalHandle(fromPos, toPos),
          targetHandle: t?.targetHandle || "left-target",

          type: "flow",
          data: {
            live: true,
            label,
            stroke,
            layout: "horizontal",
            parallelIndex: pi,
          },
          style: activeTransition?.tempId === t.tempId ? { strokeWidth: 3 } : undefined,
        } as Edge;
      });

    setEdges([...baseEdges, ...transitionEdges]);
  }, [stages, transitions, activeTransition, setEdges]);

  /* CONNECT (4 sides) */
  const onConnect = useCallback(
    (c: Connection) => {
      if (isReadOnly || !c.source || !c.target || !c.sourceHandle) return;
      if (c.source === "workflow") return;

      // visual feedback
      setEdges((eds) =>
        addEdge(
          {
            ...c,
            id: `temp-${Date.now()}`,
            type: "flow",
            data: { live: true, layout: "horizontal", parallelIndex: 1 },
          },
          eds
        )
      );

      // target handle (same side as source side)
      let targetHandle = "left-target";
      if (c.sourceHandle.includes("top")) targetHandle = "top-target";
      else if (c.sourceHandle.includes("right")) targetHandle = "right-target";
      else if (c.sourceHandle.includes("bottom")) targetHandle = "bottom-target";
      else if (c.sourceHandle.includes("left")) targetHandle = "left-target";

      createTransitionAndOpen(String(c.source), String(c.target), c.sourceHandle, targetHandle);
    },
    [isReadOnly, createTransitionAndOpen, setEdges]
  );

  /* DOUBLE CLICK NODE */
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
        sourceHandle: "right-source",
        targetHandle: null,
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

  /* CLICK EDGE */
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

        // keep fieldArray in sync (important for payload)
        if (typeof stageArray?.update === "function") {
          const current = stageArray?.fields?.[index] ?? stages[index];
          stageArray.update(index, { ...current, position: node.position });
        }
      }
    },
    [stages, form, stageArray]
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
        color: safeColor(t.category, t.color),
        allowedNextCategories: [],
      });

      setLibraryOpen(false);
    },
    [stageArray, stages.length]
  );

  // keep default reactflow-ish connection line (simple)
  const connectionLineStyle = {
    strokeWidth: 2,
    stroke: "#94a3b8",
  };

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
        connectionMode={ConnectionMode.Loose}
        connectionLineStyle={connectionLineStyle}
        defaultEdgeOptions={{
          type: "flow",
          animated: false,
          style: { strokeWidth: 2, stroke: "#94a3b8" },
        }}
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
