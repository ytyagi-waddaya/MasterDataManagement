"use client";

import * as React from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { GitBranch, Zap, Lock, Unlock } from "lucide-react";
import NodeCard from "./NodeCard";

/* ---------------------------------- Utils --------------------------------- */

function badgeClass(category?: string) {
  switch (String(category || "").toUpperCase()) {
    case "APPROVAL":
      return "bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 border border-rose-200 shadow-sm";
    case "UNDER_REVIEW":
      return "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 border border-indigo-200 shadow-sm";
    case "ON_HOLD":
      return "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 border border-amber-200 shadow-sm";
    case "DRAFT":
      return "bg-gradient-to-r from-sky-50 to-cyan-50 text-sky-700 border border-sky-200 shadow-sm";
    case "COMPLETED":
      return "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200 shadow-sm";
    case "REJECTED":
      return "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200 shadow-sm";
    default:
      return "bg-gradient-to-r from-slate-50 to-gray-50 text-slate-700 border border-slate-200 shadow-sm";
  }
}

function getHandleStyle(
  position: Position,
  isHovered: boolean,
  isConnectable = true
) {
  const base =
    "!border-2 !border-white !w-4 !h-4 transition-all duration-300 shadow-lg";

  const hover =
    isHovered && isConnectable
      ? "!w-5 !h-5 !shadow-xl scale-110"
      : "";

  const disabled = !isConnectable
    ? "opacity-60 !bg-gradient-to-br from-slate-400 to-slate-500"
    : "";

  switch (position) {
    case Position.Left:
      return `${base} !bg-gradient-to-br from-blue-500 to-blue-600 ${hover} ${disabled}`;
    case Position.Top:
      return `${base} !bg-gradient-to-br from-purple-500 to-purple-600 ${hover} ${disabled}`;
    case Position.Right:
      return `${base} !bg-gradient-to-br from-green-500 to-emerald-600 ${hover} ${disabled}`;
    case Position.Bottom:
      return `${base} !bg-gradient-to-br from-orange-500 to-amber-600 ${hover} ${disabled}`;
    default:
      return base;
  }
}

const HANDLE_POSITIONS = [
  { position: Position.Left, type: "target" as const, id: "left-target" },
  { position: Position.Left, type: "source" as const, id: "left-source" },
  { position: Position.Top, type: "target" as const, id: "top-target" },
  { position: Position.Top, type: "source" as const, id: "top-source" },
  { position: Position.Right, type: "target" as const, id: "right-target" },
  { position: Position.Right, type: "source" as const, id: "right-source" },
  { position: Position.Bottom, type: "target" as const, id: "bottom-target" },
  { position: Position.Bottom, type: "source" as const, id: "bottom-source" },
];

/* -------------------------------- Component -------------------------------- */

export default function StageNode({ data }: NodeProps) {
  const [localName, setLocalName] = React.useState<string>(data?.name || "");
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    setLocalName(data?.name || "");
  }, [data?.name]);

  const category = String(data?.category || "NORMAL").toUpperCase();
  const isFinal = data?.isFinal;
  const isInitial = data?.isInitial;

  const save = React.useCallback(() => {
    if (!data?.readOnly) {
      data?.onNameChange?.(localName);
    }
  }, [data, localName]);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background Glow */}
      <div
        className="absolute -inset-4 rounded-3xl pointer-events-none transition-all duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at center,
            ${(data?.color || "#6366f1")}15 0%,
            ${(data?.color || "#6366f1")}08 30%,
            transparent 70%)`,
        }}
      />

      {/* Animated Border */}
      {hovered && (
        <div
          className="absolute -inset-3 rounded-2xl pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${(data?.color ||
              "#6366f1")}20, transparent)`,
            animation: "rotate 3s linear infinite",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "2px",
          }}
        />
      )}

      {/* Handles */}
      {HANDLE_POSITIONS.map((h) => {
        const isSource = h.type === "source";
        const isConnectable = !(isSource && isFinal);

        return (
          <Handle
            key={h.id}
            id={h.id}
            type={h.type}
            position={h.position}
            isConnectable={isConnectable}
            className={getHandleStyle(h.position, hovered, isConnectable)}
            style={{
              ...(h.position === Position.Left && { left: -8 }),
              ...(h.position === Position.Top && { top: -8 }),
              ...(h.position === Position.Right && { right: -8 }),
              ...(h.position === Position.Bottom && { bottom: -8 }),
            }}
          />
        );
      })}

      <NodeCard
        title={localName || "Unnamed Stage"}
        icon={GitBranch}
        data={data}
        glowColor={data?.color}
        className="relative z-10 backdrop-blur-sm bg-white/95"
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide shadow-sm ${badgeClass(
                category
              )}`}
            >
              {category === "DRAFT" && <Unlock className="w-3 h-3" />}
              {category === "APPROVAL" && <Zap className="w-3 h-3" />}
              {category === "COMPLETED" && "✓"}
              {category.replace(/_/g, " ")}
            </span>

            <div className="flex items-center gap-1">
              {isInitial && (
                <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-green-100 text-green-700">
                  INITIAL
                </span>
              )}
              {isFinal && (
                <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-slate-200 text-slate-700">
                  FINAL
                </span>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">
              Stage Name <span className="text-red-500">*</span>
            </label>

            {data?.readOnly ? (
              <div className="rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold">
                <div className="flex justify-between">
                  <span>{localName || "—"}</span>
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            ) : (
              <input
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                onBlur={save}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    (e.target as HTMLInputElement).blur();
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                placeholder="Enter stage name"
                className={`
                  nodrag nopan w-full rounded-xl
                  border-2 border-slate-200 bg-white/80
                  px-4 py-3 text-sm font-semibold text-slate-900
                  outline-none transition-all duration-300
                  hover:border-slate-300 hover:bg-white hover:shadow-lg
                  focus:border-blue-500 focus:bg-white focus:shadow-xl
                  focus:ring-4 focus:ring-blue-500/10
                  placeholder:text-slate-400/60
                `}
              />
            )}
          </div>
        </div>
      </NodeCard>

      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
