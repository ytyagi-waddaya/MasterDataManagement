"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  Handle,
  Position,
  ConnectionMode,
  useNodesState,
  useEdgesState,
  applyEdgeChanges,
  EdgeChange,
  EdgeRemoveChange,
} from "reactflow";
import "reactflow/dist/style.css";

import { UseFormReturn, useWatch } from "react-hook-form";
import {
  Eye,
  FileText,
  GitBranch,
  Globe,
  LucideIcon,
  Minus,
  MoreVertical,
  Plus,
  XCircle,
  Send,
  Edit3,
  PauseCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ================= TYPES ================= */

type WorkflowCanvasProps = {
  WorkflowStatus: string;
  form: UseFormReturn<any>;
  stageArray: any;
  transitionArray: any;
  mode?: "create" | "edit" | "view";
};

const getSafePosition = (
  pos: { x: number; y: number } | undefined,
  index: number
) => pos ?? { x: 200 + index * 380, y: 300 };

type BadgeVariant = "green" | "gray" | "blue" | "red";
type Badge = {
  label: string;
  variant?: BadgeVariant;
};

// const categoryVariantMap: Record<StageCategory, BadgeVariant> = {
//   DRAFT: "gray",
//   NORMAL: "blue",
//   COMPLETED: "green",
//   REJECTED: "red",
// } as const;

type WorkflowNodeCardProps = {
  title: string;
  icon?: LucideIcon;
  badges?: Badge[];
  data: any;
  children: React.ReactNode;
};

type StageCategory =
  | "DRAFT"
  | "SUBMITTED"
  | "NORMAL"
  | "UNDER_REVIEW"
  | "APPROVAL"
  | "CORRECTION"
  | "REJECTED"
  | "ON_HOLD"
  | "COMPLETED";

type StageTemplate = {
  category: StageCategory;
  label: string;
  icon: LucideIcon;
  isInitial?: boolean;
  isFinal?: boolean;
  defaultName: string;
};

const STAGE_LIBRARY: StageTemplate[] = [
  {
    category: "DRAFT",
    label: "Draft",
    icon: FileText, // ✍️ editable draft
    isInitial: true,
    defaultName: "Draft",
  },
  {
    category: "SUBMITTED",
    label: "Submitted",
    icon: Send, // 📤 sent for processing
    defaultName: "Submitted",
  },
  {
    category: "UNDER_REVIEW",
    label: "Under Review",
    icon: Eye, // 👀 being reviewed
    defaultName: "Under Review",
  },
  {
    category: "NORMAL",
    label: "Normal",
    icon: GitBranch, // 🔀 generic workflow step
    defaultName: "Normal",
  },
  {
    category: "CORRECTION",
    label: "Correction",
    icon: Edit3, // ✏️ needs changes
    defaultName: "Correction",
  },
  {
    category: "ON_HOLD",
    label: "On Hold",
    icon: PauseCircle, // ⏸ paused
    defaultName: "On Hold",
  },
  {
    category: "APPROVAL",
    label: "Approval",
    icon: ShieldCheck, // 🛡 authority approval
    defaultName: "Approval",
  },
  {
    category: "COMPLETED",
    label: "Completed",
    icon: CheckCircle2, // ✅ successfully finished
    isFinal: true,
    defaultName: "Completed",
  },
  {
    category: "REJECTED",
    label: "Rejected",
    icon: XCircle, // ❌ failed / rejected
    isFinal: true,
    defaultName: "Rejected",
  },
];

// type StageGroup = {
//   title: string;
//   categories: StageCategory[];
// };

// const STAGE_GROUPS: StageGroup[] = [
//   {
//     title: "Draft & Start",
//     categories: ["DRAFT"],
//   },
//   {
//     title: "Review Flow",
//     categories: ["SUBMITTED", "UNDER_REVIEW", "CORRECTION", "ON_HOLD"],
//   },
//   {
//     title: "Decision",
//     categories: ["APPROVAL", "REJECTED"],
//   },
//   {
//     title: "End States",
//     categories: ["COMPLETED"],
//   },
// ];

/* ================= NODE UI ================= */

function WorkflowNodeCard({
  title,
  icon: Icon,
  badges = [],
  data,
  children,
}: WorkflowNodeCardProps) {
  return (
    <div className="w-[340px] rounded-xl border-2 border-green-500 bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-2 border-b drag-handle cursor-move">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-green-600" />}
          <span className="text-sm font-semibold">{title}</span>
        </div>

        <div className="flex items-center gap-1">
          {badges.map((badge, i) => (
            <span
              key={i}
              className={`rounded-full px-2 py-0.5 text-xs font-medium
                ${
                  badge.variant === "green"
                    ? "bg-green-100 text-green-700"
                    : badge.variant === "blue"
                    ? "bg-blue-100 text-blue-700"
                    : badge.variant === "red"
                    ? "bg-red-100 text-red-700"
                    : "bg-slate-200 text-slate-700"
                }
              `}
            >
              {badge.label}
            </span>
          ))}
        </div>
        <div className="relative">
          <button
            type="button"
            className="p-1 rounded hover:bg-slate-100"
            onClick={(e) => {
              e.stopPropagation();
              data.onToggleMenu();
            }}
          >
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </button>

          {data.showMenu && (
            <div className="absolute right-0 mt-1 w-32 rounded-md border bg-white shadow z-50">
              <button
                className="block w-full px-3 py-2 text-sm hover:bg-slate-100"
                onClick={data.onDuplicate}
              >
                Duplicate
              </button>
              <button
                className="block w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                onClick={data.onDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-100 rounded-b-xl">{children}</div>
    </div>
  );
}

function NodeInputField({
  label,
  value,
  placeholder,
  helper,
  required,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  helper?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1">
      {/* Label */}
      <label className="text-xs font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {/* Input look */}
      <div className="rounded-md border bg-white px-3 py-2 text-sm text-slate-800">
        {value ? value : <span className="text-slate-400">{placeholder}</span>}
      </div>

      {/* Helper */}
      {helper && <p className="text-[11px] text-slate-400">{helper}</p>}
    </div>
  );
}

/* ================= NODE TYPES ================= */

function DefinitionNode({ data }: any) {
  return (
    <div>
      <WorkflowNodeCard
        title="Workflow"
        icon={Globe}
        data={data}
        badges={[
          { label: "DEFINATION", variant: "green" },
          { label: "START", variant: "gray" },
        ]}
      >
        <NodeInputField
          label="Name"
          required
          value={data.name}
          placeholder="Enter value here"
          helper="eg: Item Approval Flow"
        />
        <NodeInputField
          label="Resource"
          required
          value={data.resourceName}
          placeholder="Enter value here"
          helper="eg: Item"
        />
      </WorkflowNodeCard>

      <Handle
        type="source"
        position={Position.Right}
        className="bg-green-500! border-green-700! w-3! h-3!"
      />
    </div>
  );
}

function StageNode({ data }: any) {
  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        className="bg-blue-500! border-blue-700! w-3! h-3!"
      />

      <WorkflowNodeCard
        title={data.name}
        icon={GitBranch}
        data={data}
        badges={[
          {
            label: data.category,
            variant: data.category ?? "gray",
          },
        ]}
      >
        <NodeInputField
          label="Stage Name"
          required
          value={data.name}
          placeholder="Enter value here"
          helper="eg: Draft"
        />

        <div className="flex gap-2 text-xs">
          {data.isInitial && (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">
              Initial
            </span>
          )}
          {data.isFinal && (
            <span className="rounded-full bg-slate-200 px-2 py-0.5">Final</span>
          )}
        </div>
      </WorkflowNodeCard>

      {/* OUTGOING */}
      <Handle
        type="source"
        position={Position.Right}
        className="bg-green-500! border-green-700! w-3! h-3!"
        isConnectable={!data.isFinal}
      />
    </div>
  );
}

function NodeLibrary({
  open,
  onToggle,
  onSelect,
}: {
  open: boolean;
  onToggle: () => void;
  onSelect: (template: StageTemplate) => void;
}) {
  return (
    <div
      className="absolute left-4 top-4 z-50"
      onClick={(e) => e.stopPropagation()} // 🔥 critical
    >
      {/* Floating Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // 🔥 critical
          onToggle();
        }}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700"
      >
        +
      </button>

      {/* Expanded Menu */}
      {open && (
        <div className="mt-2 w-60 rounded-xl border bg-white shadow-xl">
          <div className="px-3 py-2 text-sm font-semibold border-b">
            Add Stage
          </div>

          <div className="p-2 space-y-1">
            {STAGE_LIBRARY.map((t) => (
              <button
                key={t.category}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-slate-100"
                onClick={() => {
                  onSelect(t);
                  onToggle(); // auto close
                }}
              >
                <t.icon className="h-4 w-4 text-slate-600" />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FloatingNodeLibrary({
  open,
  position,
  onToggle,
  onMove,
  onSelect,
}: {
  open: boolean;
  position: { x: number; y: number };
  onToggle: () => void;
  onMove: (pos: { x: number; y: number }) => void;
  onSelect: (t: StageTemplate) => void;
}) {
  const startRef = React.useRef<{ x: number; y: number } | null>(null);

  return (
    <div
      style={{
        left: position.x,
        top: position.y,
      }}
      className="fixed z-50 select-none"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header (DRAG HANDLE) */}
      <div
        className="flex items-center justify-between rounded-t-xl bg-green-600 px-3 py-2 text-white cursor-move"
        onMouseDown={(e) => {
          startRef.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
          };

          const move = (ev: MouseEvent) => {
            if (!startRef.current) return;
            onMove({
              x: ev.clientX - startRef.current.x,
              y: ev.clientY - startRef.current.y,
            });
          };

          const up = () => {
            startRef.current = null;
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", up);
          };

          window.addEventListener("mousemove", move);
          window.addEventListener("mouseup", up);
        }}
      >
        <span className="text-sm font-semibold">Stages</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="text-lg leading-none"
        >
          {open ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Plus className="ml-2 h-4 w-4" />
          )}
        </button>
      </div>

      {/* Body */}
      {open && (
        <div className="w-52 rounded-b-xl border bg-white shadow-xl">
          <div className="p-2 space-y-1">
            {STAGE_LIBRARY.map((t) => (
              <button
                key={t.category}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-slate-100"
                onClick={() => {
                  onSelect(t);
                  onToggle();
                }}
              >
                <t.icon className="h-4 w-4 text-slate-600" />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const nodeTypes = {
  definition: DefinitionNode,
  stage: StageNode,
};

export default function WorkflowCanvas({
  WorkflowStatus,
  form,
  stageArray,
  transitionArray,
  mode = "create",
}: WorkflowCanvasProps) {
  const [menuNodeId, setMenuNodeId] = useState<string | null>(null);
  const [selectedTransitionIndex, setSelectedTransitionIndex] = useState<
    number | null
  >(null);

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [rfEdges, setRfEdges] = useEdgesState<Edge[]>([]);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [libraryPos, setLibraryPos] = useState({ x: 280, y: 160 });
  const [dragging, setDragging] = useState(false);
  const isReadOnly = mode === "view" || WorkflowStatus !== "DRAFT";

  const name = useWatch({ control: form.control, name: "name" });
  const resourceId = useWatch({ control: form.control, name: "resourceId" });
  // const stages = useWatch({ control: form.control, name: "stages" }) ?? [];
  const stages = stageArray.fields;

  const transitions =
    useWatch({ control: form.control, name: "transitions" }) ?? [];

  /* ---------- ADD STAGE ---------- */
  const addStageByCategory = useCallback(
    (template: StageTemplate) => {
      if (isReadOnly) return;
      stageArray.append({
        tempId: crypto.randomUUID(),
        name: template.defaultName,
        category: template.category,
        isInitial: template.isInitial,
        isFinal: template.isFinal,
        order: stages.length,
        position: {
          x: 200 + stages.length * 380,
          y: 300,
        },
      });
    },
    [stageArray, stages.length, isReadOnly]
  );

  /* ---------- FORM → CANVAS (NODES) ---------- */
  // useEffect(() => {
  //   const nextNodes: Node[] = [
  //     {
  //       id: "workflow-definition",
  //       type: "definition",
  //       position: { x: 200, y: 80 },
  //       draggable: false,
  //       selectable: false,
  //       data: { name, resourceName: resourceId },
  //     },
  //     ...stages.map((s: any, i: number) => {
  //       const position = getSafePosition(s.position, i);

  //       return {
  //         id: s.tempId,
  //         type: "stage",
  //         position,
  //         dragHandle: ".drag-handle",
  //               draggable: !isReadOnly,
  //         data: {
  //           ...s,
  //           showMenu: menuNodeId === s.tempId,
  //           onToggleMenu: () =>{
  //             if(isReadOnly) return
  //             setMenuNodeId(menuNodeId === s.tempId ? null : s.tempId)},
  //           onDelete: () => {
  //             if(isReadOnly) return;
  //             setMenuNodeId(null);

  //             const stageId = s.tempId;

  //             const stageIndex = stages.findIndex(
  //               (x: any) => x.tempId === stageId
  //             );
  //             if (stageIndex !== -1) stageArray.remove(stageIndex);

  //             const transitionIndexes = transitions
  //               .map((t: any, i: number) =>
  //                 t.fromStageId === stageId || t.toStageId === stageId ? i : -1
  //               )
  //               .filter((i: number) => i !== -1)
  //               .reverse();

  //             transitionIndexes.forEach((i: number) =>
  //               transitionArray.remove(i)
  //             );
  //           },

  //           onDuplicate: () => {
  //             if(isReadOnly) return;
  //             setMenuNodeId(null);

  //             const oldId = s.tempId;
  //             const newId = crypto.randomUUID();

  //             stageArray.append({
  //               ...s,
  //               tempId: newId,
  //               name: `${s.name} Copy`,
  //               isInitial: false,
  //               isFinal: false,
  //               position: {
  //                 x: position.x + 40,
  //                 y: position.y + 40,
  //               },
  //             });

  //             transitions
  //               .filter((t: any) => t.fromStageId === oldId)
  //               .forEach((t: any) => {
  //                 transitionArray.append({
  //                   tempId: crypto.randomUUID(),
  //                   fromStageId: newId,
  //                   toStageId: t.toStageId,
  //                   transitionType: t.transitionType ?? "NORMAL",
  //                 });
  //               });
  //           },
  //         },
  //       };
  //     }),
  //   ];

  //   setRfNodes(nextNodes);
  // }, [stages, name, resourceId, menuNodeId]);

  useEffect(() => {
    setRfNodes((prev) => {
      const existing = new Map(prev.map((n) => [n.id, n]));

      return [
        {
          id: "workflow-definition",
          type: "definition",
          position: { x: 200, y: 80 },
          draggable: false,
          selectable: false,
          data: { name, resourceName: resourceId },
        },
        ...stages.map((s: any, i: number) => {
          const prevNode = existing.get(s.tempId);
          const currentPosition =
            prevNode?.position ?? getSafePosition(s.position, i);

          return {
            id: s.tempId,
            type: "stage",
            position: prevNode?.position ?? getSafePosition(s.position, i),
            dragHandle: ".drag-handle",
            draggable: !isReadOnly,
            data: {
              ...s,
              showMenu: menuNodeId === s.tempId,
              onToggleMenu: () =>
                !isReadOnly &&
                setMenuNodeId(menuNodeId === s.tempId ? null : s.tempId),
              onDelete: () => {
                if (isReadOnly) return;
                setMenuNodeId(null);

                const stageId = s.tempId;

                const stageIndex = stages.findIndex(
                  (x: any) => x.tempId === stageId
                );
                if (stageIndex !== -1) stageArray.remove(stageIndex);

                const transitionIndexes = transitions
                  .map((t: any, i: number) =>
                    t.fromStageId === stageId || t.toStageId === stageId
                      ? i
                      : -1
                  )
                  .filter((i: number) => i !== -1)
                  .reverse();

                transitionIndexes.forEach((i: number) =>
                  transitionArray.remove(i)
                );
              },

              onDuplicate: () => {
                if (isReadOnly) return;
                setMenuNodeId(null);

                const oldId = s.tempId;
                const newId = crypto.randomUUID();

                stageArray.append({
                  ...s,
                  tempId: newId,
                  name: `${s.name} Copy`,
                  isInitial: false,
                  isFinal: false,
                  position: {
                    x: currentPosition.x + 40,
                    y: currentPosition.y + 40,
                  },
                });

                transitions
                  .filter((t: any) => t.fromStageId === oldId)
                  .forEach((t: any) => {
                    transitionArray.append({
                      tempId: crypto.randomUUID(),
                      fromStageId: newId,
                      toStageId: t.toStageId,
                      transitionType: t.transitionType ?? "NORMAL",
                    });
                  });
              },
            },
          };
        }),
      ];
    });
  }, [stages, name, resourceId, menuNodeId, isReadOnly]);

  /* ---------- FORM → CANVAS (EDGES, SINGLE SOURCE) ---------- */
  useEffect(() => {
    const edges: Edge[] = [];

    // 🔹 workflow → initial stage (visual only)
    const initialStage = stages.find((s: any) => s.isInitial);
    if (initialStage) {
      edges.push({
        id: "workflow-to-initial",
        source: "workflow-definition",
        target: initialStage.tempId,
        animated: true,
        deletable: false,
        type: "default",
      });
    }

    // 🔹 real transitions
    transitions.forEach((t: any) => {
      edges.push({
        id: t.tempId,
        source: t.fromStageId,
        target: t.toStageId,
        type: "default",
      });
    });

    setRfEdges(edges);
  }, [stages, transitions]);

  /* ---------- CLOSE MENU ON OUTSIDE CLICK ---------- */
  useEffect(() => {
    const closeMenu = () => setMenuNodeId(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  useEffect(() => {
    const close = () => setIsLibraryOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("node-library-pos");
    if (saved) setLibraryPos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("node-library-pos", JSON.stringify(libraryPos));
  }, [libraryPos]);

  /* ---------- SAVE POSITION ---------- */
  const onNodeDragStop = useCallback(
    (_: any, node: Node) => {
      if (isReadOnly) return;
      const idx = stages.findIndex((s: any) => s.tempId === node.id);
      if (idx !== -1) {
        form.setValue(`stages.${idx}.position`, node.position, {
          shouldDirty: true,
        });
      }
    },
    [stages, form, isReadOnly]
  );

  useEffect(() => {
    const firstDraftIndex = stages.findIndex(
      (s: any) => s.category === "DRAFT"
    );

    stages.forEach((s: any, i: number) => {
      const shouldBeInitial = s.category === "DRAFT" && i === firstDraftIndex;

      if (s.isInitial !== shouldBeInitial) {
        form.setValue(`stages.${i}.isInitial`, shouldBeInitial, {
          shouldDirty: true,
        });
      }
    });
  }, [stages, form]);

  useEffect(() => {
    stages.forEach((s: any, i: number) => {
      const shouldBeFinal =
        s.category === "COMPLETED" || s.category === "REJECTED";

      if (s.isFinal !== shouldBeFinal) {
        form.setValue(`stages.${i}.isFinal`, shouldBeFinal, {
          shouldDirty: true,
        });
      }
    });
  }, [stages, form]);

  useEffect(() => {
    transitions.forEach((t: any, i: number) => {
      if (t.transitionType === "AUTO" && t.triggerStrategy !== "SYSTEM_ONLY") {
        form.setValue(`transitions.${i}.triggerStrategy`, "SYSTEM_ONLY", {
          shouldDirty: true,
        });
      }
    });
  }, [transitions, form]);

  /* ---------- EDGE DELETE ---------- */
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      if (isReadOnly) return;
      const deletedEdgeIds = changes
        .filter((c): c is EdgeRemoveChange => c.type === "remove" && "id" in c)
        .map((c) => c.id)
        .filter((id) => id !== "workflow-to-initial");

      if (deletedEdgeIds.length) {
        const indexesToRemove = transitions
          .map((t: any, i: number) =>
            deletedEdgeIds.includes(t.tempId) ? i : -1
          )
          .filter((i: any) => i !== -1)
          .reverse();

        indexesToRemove.forEach((i: any) => transitionArray.remove(i));
      }

      setRfEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [transitions, transitionArray]
  );

  /* ---------- CREATE EDGE ---------- */
  const onConnect = useCallback(
    (c: Connection) => {
      if (isReadOnly) return;
      if (!c.source || !c.target) return;
      if (c.source === "workflow-definition") return;

      transitionArray.append({
        tempId: crypto.randomUUID(),
        fromStageId: c.source,
        toStageId: c.target,
        transitionType: "NORMAL",
      });
    },
    [transitionArray, isReadOnly]
  );

  /* ---------- EDGE CLICK ---------- */
  const onEdgeClick = useCallback(
    (_: any, edge: Edge) => {
      if (edge.id === "workflow-to-initial") return;

      const index = transitions.findIndex((t: any) => t.tempId === edge.id);

      if (index !== -1) setSelectedTransitionIndex(index);
    },
    [transitions]
  );

  /* ---------- RENDER ---------- */
  return (
    <div className="relative h-full w-full">
      {!isReadOnly && (
        <FloatingNodeLibrary
          open={isLibraryOpen}
          position={libraryPos}
          onToggle={() => setIsLibraryOpen((v) => !v)}
          onMove={setLibraryPos}
          onSelect={addStageByCategory}
        />
      )}
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onNodeDragStop={onNodeDragStop}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Strict}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}

// Mental Model (Very Important)
// [ Incoming ]  →  [   NODE   ]  →  [ Outgoing ]
