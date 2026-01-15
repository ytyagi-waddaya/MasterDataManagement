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
import { getStageColor } from "./library/stageLibrary";

const NODE_TYPES = { definition: DefinitionNode, stage: StageNode };
const EDGE_TYPES = { flow: FlowEdge };

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

// small signature builder (prevents replace/update loops)
function stageSig(s: any) {
  const id = String(s?.tempId ?? s?.id ?? "");
  const p = s?.position;
  const pos = isValidPos(p) ? `${p.x},${p.y}` : "NA";
  const col = String(s?.color ?? "");
  const anc = Array.isArray(s?.allowedNextCategories) ? s.allowedNextCategories.join("|") : "";
  return `${id}::${pos}::${col}::${anc}::${String(s?.category ?? "")}::${String(s?.isInitial)}`;
}

function transSig(t: any) {
  const id = String(t?.tempId ?? t?.id ?? "");
  const base = [
    id,
    String(t?.label ?? ""),
    String(t?.fromStageId ?? ""),
    String(t?.toStageId ?? ""),
    String(t?.transitionType ?? ""),
    String(t?.triggerStrategy ?? ""),
    String(t?.approvalStrategy ?? ""),
    String(t?.autoTrigger ?? false),
    String(t?.sourceHandle ?? ""),
    String(t?.targetHandle ?? ""),
    JSON.stringify(Array.isArray(t?.allowedRoleIds) ? t.allowedRoleIds : []),
    JSON.stringify(Array.isArray(t?.allowedUserIds) ? t.allowedUserIds : []),
    JSON.stringify(t?.approvalConfig ?? null),
  ];
  return base.join("::");
}

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

  const nodeTypesRef = useRef(NODE_TYPES);
  const edgeTypesRef = useRef(EDGE_TYPES);
  const snapGridRef = useRef<[number, number]>([20, 20]);

  // ✅ transitions UI should reflect TransitionPanel instantly
  const watchedTransitions =
    useWatch({
      control: form?.control,
      name: "transitions",
    }) || [];

  // ✅ stages source of truth: fieldArray (add/delete stable + payload correct)
  const stagesForRender = stageArray?.fields ?? [];

  const transitionsForRender = watchedTransitions;

  const [menuNodeId, setMenuNodeId] = useState<string | null>(null);
  const [libraryOpen, setLibraryOpen] = useState(false);

  const [transitionPanelOpen, setTransitionPanelOpen] = useState(false);
  const [activeTransitionIndex, setActiveTransitionIndex] = useState<number | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const activeTransition = useMemo(() => {
    if (activeTransitionIndex == null) return null;
    return transitionsForRender?.[activeTransitionIndex] ?? null;
  }, [activeTransitionIndex, transitionsForRender]);

  const openTransitionIndex = useCallback((index: number) => {
    setActiveTransitionIndex(index);
    setTransitionPanelOpen(true);
  }, []);

  /**
   * ✅ Normalize stages (ONLY if signature changes)
   * - ensures position not null
   * - ensures tempId exists
   * - ensures color string, allowedNextCategories array
   */
  const lastStageSigRef = useRef<string>("");
  useEffect(() => {
    const fa = stageArray?.fields ?? [];
    if (!Array.isArray(fa) || fa.length === 0) return;

    const sig = fa.map(stageSig).join("||");
    if (sig === lastStageSigRef.current) return;

    const normalized = fa.map((st: any, i: number) => {
      const tempId = st?.tempId
        ? String(st.tempId)
        : String(st?.id ?? st?.stageId ?? makeId());

      const position = isValidPos(st?.position) ? st.position : getStagePosition(i);
      const allowedNextCategories = Array.isArray(st?.allowedNextCategories)
        ? st.allowedNextCategories
        : [];
      const color = safeColor(st?.category, st?.color);

      return { ...st, tempId, position, allowedNextCategories, color };
    });

    // compute normalized sig & only replace if it differs
    const nsig = normalized.map(stageSig).join("||");
    if (nsig === sig) {
      lastStageSigRef.current = sig;
      return;
    }

    lastStageSigRef.current = nsig;

    if (typeof stageArray?.replace === "function") stageArray.replace(normalized);
    else if (typeof stageArray?.update === "function") {
      normalized.forEach((ns: any, i: number) => stageArray.update(i, ns));
    }
  }, [stageArray, stageArray?.fields]);

  /**
   * ✅ Sync watchedTransitions -> transitionArray.fields for payload
   * Guarded by signature to prevent infinite replace loop.
   */
  const lastTransSigRef = useRef<string>("");
  useEffect(() => {
    if (!Array.isArray(watchedTransitions)) return;

    const sig = watchedTransitions.map(transSig).join("||");
    if (sig === lastTransSigRef.current) return;

    const normalized = watchedTransitions.map((t: any, i: number) => {
      const tempId = t?.tempId
        ? String(t.tempId)
        : String(t?.id ?? t?.transitionId ?? makeId());

      const allowedRoleIds = Array.isArray(t?.allowedRoleIds) ? t.allowedRoleIds : [];
      const allowedUserIds = Array.isArray(t?.allowedUserIds) ? t.allowedUserIds : [];

      // only set tempId in form ONCE when missing (no loop)
      if (!t?.tempId) {
        form?.setValue?.(`transitions.${i}.tempId`, tempId, { shouldDirty: false });
      }

      return {
        ...t,
        tempId,
        fromStageId: t?.fromStageId ? String(t.fromStageId) : "",
        toStageId: t?.toStageId ? String(t.toStageId) : "",
        allowedRoleIds,
        allowedUserIds,
        sourceHandle: t?.sourceHandle ?? null,
        targetHandle: t?.targetHandle ?? null,
      };
    });

    const nsig = normalized.map(transSig).join("||");
    lastTransSigRef.current = nsig;

    if (typeof transitionArray?.replace === "function") transitionArray.replace(normalized);
    else if (typeof transitionArray?.update === "function") {
      normalized.forEach((nt: any, i: number) => transitionArray.update(i, nt));
    }
  }, [watchedTransitions, transitionArray, form]);

  // ✅ stage updates only via stageArray (no form.setValue loops)
  const updateStageByTempId = useCallback(
    (tempId: any, patch: any) => {
      const fa = stageArray?.fields ?? [];
      const idx = fa.findIndex((x: any) => String(x?.tempId) === String(tempId));
      if (idx === -1) return;

      const cur = fa[idx];
      if (typeof stageArray?.update === "function") stageArray.update(idx, { ...cur, ...patch });
    },
    [stageArray, stageArray?.fields]
  );

  // ✅ open/create transition for node
  const openOrCreateTransitionForNode = useCallback(
    (nodeId: string) => {
      if (isReadOnly) return;
      if (!nodeId || nodeId === "workflow") return;

      const idx = transitionsForRender.findIndex(
        (t: any) => String(t?.fromStageId) === String(nodeId)
      );
      if (idx !== -1) {
        openTransitionIndex(idx);
        return;
      }

      const index = transitionsForRender.length;
      transitionArray.append({
        tempId: makeId(),
        label: "",
        fromStageId: nodeId,
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

      // open after RHF flush
      requestAnimationFrame(() => requestAnimationFrame(() => openTransitionIndex(index)));
    },
    [isReadOnly, transitionsForRender, transitionArray, openTransitionIndex]
  );

  // ✅ double tap support (mobile)
  const lastTapRef = useRef<{ id: string; time: number } | null>(null);
  const onNodeClick = useCallback(
    (_e: any, node: Node) => {
      if (isReadOnly) return;
      if (!node?.id || node.id === "workflow") return;

      const now = Date.now();
      const last = lastTapRef.current;
      if (last && last.id === node.id && now - last.time < 350) {
        lastTapRef.current = null;
        openOrCreateTransitionForNode(String(node.id));
        return;
      }
      lastTapRef.current = { id: String(node.id), time: now };
    },
    [isReadOnly, openOrCreateTransitionForNode]
  );

  const onNodeDoubleClick = useCallback(
    (_: any, node: Node) => openOrCreateTransitionForNode(String(node.id)),
    [openOrCreateTransitionForNode]
  );

  // ✅ connect create transition
  const createTransitionAndOpen = useCallback(
    (fromStageId: string, toStageId: string, sourceHandle?: any, targetHandle?: any) => {
      const index = transitionsForRender.length;

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

      requestAnimationFrame(() => requestAnimationFrame(() => openTransitionIndex(index)));
    },
    [transitionArray, transitionsForRender.length, openTransitionIndex]
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

    const stageNodes: Node[] = stagesForRender
      .filter((s: any) => !!s?.tempId)
      .map((s: any, i: number) => {
        const fixedColor = safeColor(s?.category, s?.color);
        const pos = isValidPos(s?.position) ? s.position : getStagePosition(i);

        return {
          id: String(s.tempId),
          type: "stage",
          position: pos,
          draggable: !isReadOnly,
          selectable: true,
          dragHandle: ".drag-handle",
          data: {
            ...s,
            color: fixedColor,
            readOnly: isReadOnly,
            mode: isReadOnly ? "view" : "builder",
            allowedNextCategories: Array.isArray(s?.allowedNextCategories)
              ? s.allowedNextCategories
              : [],
            showMenu: menuNodeId === s.tempId,

            onNameChange: (value: string) => updateStageByTempId(s.tempId, { name: value }),
            onAllowedNextCategoriesChange: (next: string[]) =>
              updateStageByTempId(s.tempId, {
                allowedNextCategories: Array.isArray(next) ? next : [],
              }),
            onChange: (patch: any) => patch && updateStageByTempId(s.tempId, patch),

            onToggleMenu: () => setMenuNodeId(menuNodeId === s.tempId ? null : s.tempId),

            onDelete: () => {
              setMenuNodeId(null);

              const idx = (stageArray?.fields ?? []).findIndex(
                (x: any) => String(x?.tempId) === String(s.tempId)
              );
              if (idx !== -1) stageArray.remove(idx);

              // remove transitions connected to this stage
              const tf = transitionArray?.fields ?? [];
              const removeIndexes = tf
                .map((t: any, ti: number) =>
                  String(t?.fromStageId) === String(s.tempId) ||
                  String(t?.toStageId) === String(s.tempId)
                    ? ti
                    : -1
                )
                .filter((x: number) => x !== -1)
                .reverse();

              removeIndexes.forEach((ti: number) => transitionArray.remove(ti));

              // also remove from form transitions (so UI edges disappear immediately)
              const nextFormTransitions = (form.getValues("transitions") ?? []).filter(
                (t: any) =>
                  String(t?.fromStageId) !== String(s.tempId) &&
                  String(t?.toStageId) !== String(s.tempId)
              );
              form.setValue("transitions", nextFormTransitions, { shouldDirty: true });
            },

            onDuplicate: () => {
              setMenuNodeId(null);
              const count = (stageArray?.fields ?? stagesForRender).length;

              stageArray.append({
                ...s,
                tempId: makeId(),
                name: `${s.name} Copy`,
                isInitial: false,
                isFinal: false,
                order: count,
                position: { x: pos.x + 40, y: pos.y + 40 },
                color: fixedColor,
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
    stagesForRender,
    menuNodeId,
    isReadOnly,
    form,
    stageArray,
    transitionArray,
    setNodes,
    updateStageByTempId,
  ]);

  /* FORM → CANVAS (EDGES) */
  useEffect(() => {
    const initialStage = stagesForRender.find((s: any) => s?.isInitial);

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
            data: { live: true, kind: "initial", label: "Start", layout: "horizontal", parallelIndex: 1 },
          },
        ]
      : [];

    const findStage = (id: any) =>
      stagesForRender.find((s: any) => String(s?.tempId) === String(id));

    const seen: Record<string, number> = {};

    const transitionEdges: Edge[] = transitionsForRender
      .filter((t: any) => t?.tempId && t?.fromStageId && t?.toStageId)
      .map((t: any) => {
        const from = findStage(t.fromStageId);
        const to = findStage(t.toStageId);

        const label = String(t?.label ?? t?.actionLabel ?? t?.action ?? t?.transitionLabel ?? "").trim();
        const stroke = (t?.stroke as string) || safeColor(from?.category, from?.color) || DEFAULT_COLOR;

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
          data: { live: true, label, stroke, layout: "horizontal", parallelIndex: pi },
          style: activeTransition?.tempId === t.tempId ? { strokeWidth: 3 } : undefined,
        } as Edge;
      });

    setEdges([...baseEdges, ...transitionEdges]);
  }, [stagesForRender, transitionsForRender, activeTransition, setEdges]);

  const onConnect = useCallback(
    (c: Connection) => {
      if (isReadOnly || !c.source || !c.target || !c.sourceHandle) return;
      if (c.source === "workflow") return;

      setEdges((eds) =>
        addEdge(
          { ...c, id: `temp-${Date.now()}`, type: "flow", data: { live: true, layout: "horizontal", parallelIndex: 1 } },
          eds
        )
      );

      let targetHandle = "left-target";
      if (c.sourceHandle.includes("top")) targetHandle = "top-target";
      else if (c.sourceHandle.includes("right")) targetHandle = "right-target";
      else if (c.sourceHandle.includes("bottom")) targetHandle = "bottom-target";
      else if (c.sourceHandle.includes("left")) targetHandle = "left-target";

      createTransitionAndOpen(String(c.source), String(c.target), c.sourceHandle, targetHandle);
    },
    [isReadOnly, createTransitionAndOpen, setEdges]
  );

  const onEdgeClick = useCallback(
    (e: any, edge: Edge) => {
      e?.stopPropagation?.();
      const idx = transitionsForRender.findIndex((t: any) => String(t?.tempId) === String(edge.id));
      if (idx !== -1) openTransitionIndex(idx);
    },
    [transitionsForRender, openTransitionIndex]
  );

  const onNodeDragStop = useCallback(
    (_: any, node: Node) => {
      if (node.id === "workflow") return;
      const idx = (stageArray?.fields ?? []).findIndex((s: any) => String(s?.tempId) === String(node.id));
      if (idx === -1) return;

      const current = stageArray.fields[idx];
      stageArray.update(idx, { ...current, position: node.position });
    },
    [stageArray]
  );

  const handleAddStage = useCallback(
    (t: any) => {
      const count = (stageArray?.fields ?? stagesForRender).length;
      const pos = getStagePosition(count);

      stageArray.append({
        tempId: makeId(),
        name: t.defaultName,
        category: t.category,
        isInitial: String(t.category).toUpperCase() === "DRAFT",
        isFinal: !!t.isFinal,
        order: count,
        position: pos,
        color: safeColor(t.category, t.color),
        allowedNextCategories: [],
      });

      setLibraryOpen(false);
    },
    [stageArray, stagesForRender]
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
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        onEdgeClick={onEdgeClick}
        snapToGrid
        snapGrid={snapGridRef.current}
        fitView
        connectionMode={ConnectionMode.Loose}
        connectionLineStyle={{ strokeWidth: 2, stroke: "#94a3b8" }}
        defaultEdgeOptions={{ type: "flow", animated: false, style: { strokeWidth: 2, stroke: "#94a3b8" } }}
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
        stages={stagesForRender}
        roleList={roleList}
        userList={userList}
      />
    </div>
  );
}
