// D:\Raghav\MasterDataManagement\frontend\src\lib\workflow\builder\edges\FlowEdge.tsx
"use client";

import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  type EdgeProps,
  getSmoothStepPath,
} from "reactflow";

type LayoutMode = "horizontal" | "vertical";

/* -----------------------------
 * Helpers
 * ----------------------------- */
function hexToRgba(hex: string, alpha: number) {
  if (!hex || typeof hex !== "string") return `rgba(34,197,94,${alpha})`;

  const h = hex.replace("#", "").trim();
  if (h.length !== 3 && h.length !== 6) return `rgba(34,197,94,${alpha})`;

  const fullHex = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;

  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);

  return `rgba(${r},${g},${b},${alpha})`;
}

function normalizeCssColor(input?: any): string | undefined {
  if (!input) return undefined;
  const s = String(input).trim();
  if (!s) return undefined;

  // reject tailwind-ish tokens
  if (s.includes("bg-") || s.includes("border-") || s.includes("text-")) return undefined;

  if (s.startsWith("#") || s.startsWith("rgb") || s.startsWith("hsl")) return s;
  if (/^[a-zA-Z]+$/.test(s)) return s; // named colors

  return undefined;
}

function pickStrokeColor(data: any, style: any, isInitial: boolean): string {
  // ✅ Priority: edge-specific first, then style.stroke, then fallback
  const fromData =
    normalizeCssColor(data?.stroke) ||
    normalizeCssColor(data?.edgeStroke) ||
    normalizeCssColor(data?.color) ||
    normalizeCssColor(data?.edgeColor);

  const fromStyle = normalizeCssColor(style?.stroke);

  return (
    fromData ||
    fromStyle ||
    (isInitial ? "rgba(15,23,42,0.45)" : "#3b82f6")
  );
}

/* -----------------------------
 * Label renderer (Fixed types + black text)
 * ----------------------------- */
function EdgeLabelBox({
  x,
  y,
  text,
  strokeColor,
  onClick,
}: {
  x: number;
  y: number;
  text: string;
  strokeColor?: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  if (!text) return null;

  // ✅ bg should work for rgb/rgba too
  const bgColor = strokeColor
    ? strokeColor.startsWith("#")
      ? `${strokeColor}15`
      : "rgba(59, 130, 246, 0.08)"
    : "rgba(59, 130, 246, 0.08)";

  const borderColor = strokeColor || "rgba(59, 130, 246, 0.3)";

  return (
    <EdgeLabelRenderer>
      <div
        className="nodrag nopan"
        style={{
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${x}px,${y}px)`,
          zIndex: 999999,
          pointerEvents: "all",
          cursor: onClick ? "pointer" : "default",
        }}
        onClick={onClick}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className="rounded-lg px-3 py-1.5 text-xs font-medium shadow-lg backdrop-blur-sm max-w-[220px] truncate transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
          style={{
            backgroundColor: bgColor,
            border: `1px solid ${borderColor}`,
            color: "#000000",
            backdropFilter: "blur(8px)",
          }}
          title={text}
        >
          {text}
          {onClick && (
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          )}
        </div>
      </div>
    </EdgeLabelRenderer>
  );
}

export default function FlowEdge(props: EdgeProps) {
  const {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
    markerStart,
    style,
    data,
    selected,
  } = props;

  const isInteractive = data?.live === true;
  const isInitial = data?.kind === "initial";
  const parallelIndex = Number(data?.parallelIndex ?? 1);
  const layout = (data?.layout as LayoutMode) ?? "horizontal";

  // ✅ Each edge uses its OWN color (transition-level) if provided
  const strokeColor = pickStrokeColor(data, style, isInitial);

  const dotColor = strokeColor.startsWith("#") ? strokeColor : "#22c55e";
  const glowColor = strokeColor.startsWith("#")
    ? hexToRgba(strokeColor, 0.25)
    : "rgba(59, 130, 246, 0.25)";

  const edgeLabelFromProps = String((props as any)?.label ?? "").trim();
  const actionLabel = String(
    data?.label ??
      data?.actionLabel ??
      data?.action ??
      data?.transitionLabel ??
      edgeLabelFromProps ??
      ""
  ).trim();

  const handleLabelClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      data?.onClick?.();
    },
    [data]
  );

  // parallel offset
  const SPREAD = 24;
  const signed = parallelIndex % 2 === 0 ? 1 : -1;
  const stepsAway = Math.ceil((parallelIndex - 1) / 2);
  const delta = signed * stepsAway * SPREAD;

  const sx = layout === "vertical" ? sourceX + delta : sourceX;
  const sy = layout === "horizontal" ? sourceY + delta : sourceY;
  const tx = layout === "vertical" ? targetX + delta : targetX;
  const ty = layout === "horizontal" ? targetY + delta : targetY;

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
    sourcePosition,
    targetPosition,
    borderRadius: 24,
    offset: 32,
  });

  /* 1) NON-LIVE EDGE */
  if (!isInteractive) {
    return (
      <>
        <BaseEdge
          path={edgePath}
          markerEnd={markerEnd}
          markerStart={markerStart}
          style={{
            ...style,
            // ✅ use personal color even in non-live
            stroke: strokeColor,
            strokeWidth: selected ? 2.5 : 1.8,
            strokeDasharray: selected ? "none" : "4,4",
            opacity: selected ? 1 : 0.55,
            transition: "all 0.2s ease",
          }}
        />
        {actionLabel && (
          <EdgeLabelBox
            x={labelX}
            y={labelY}
            text={actionLabel}
            strokeColor={strokeColor}
            onClick={data?.onClick ? handleLabelClick : undefined}
          />
        )}
      </>
    );
  }

  /* 2) INITIAL EDGE */
  if (isInitial) {
    return (
      <>
        <BaseEdge
          path={edgePath}
          markerEnd={markerEnd}
          markerStart={markerStart}
          style={{
            // ✅ initial also uses personal color if provided
            stroke: strokeColor,
            strokeWidth: selected ? 3 : 2,
            strokeDasharray: "6,4",
            strokeLinecap: "round",
            opacity: selected ? 1 : 0.75,
            filter: selected
              ? `drop-shadow(0 0 8px ${
                  strokeColor.startsWith("#") ? hexToRgba(strokeColor, 0.3) : "rgba(15,23,42,0.3)"
                })`
              : "none",
            transition: "all 0.3s ease",
          }}
        />

        <circle r="5" fill={strokeColor.startsWith("#") ? strokeColor : "#0f172a"} pointerEvents="none">
          <animateMotion dur="2.4s" repeatCount="indefinite" path={edgePath} />
          <animate attributeName="r" values="4;6;4" dur="1.2s" repeatCount="indefinite" />
        </circle>

        <circle r="10" fill={strokeColor.startsWith("#") ? hexToRgba(strokeColor, 0.15) : "rgba(15,23,42,0.15)"} pointerEvents="none">
          <animateMotion dur="2.4s" repeatCount="indefinite" path={edgePath} />
          <animate attributeName="r" values="8;12;8" dur="1.2s" repeatCount="indefinite" />
        </circle>

        {actionLabel && (
          <EdgeLabelBox
            x={labelX}
            y={labelY}
            text={actionLabel}
            strokeColor={strokeColor}
            onClick={data?.onClick ? handleLabelClick : undefined}
          />
        )}
      </>
    );
  }

  /* 3) LIVE EDGE */
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={selected ? undefined : markerEnd}
        markerStart={markerStart}
        style={{
          ...style,
          stroke: strokeColor,
          strokeWidth: selected ? 3.5 : 2.5,
          opacity: selected ? 1 : 0.85,
          filter: selected ? `drop-shadow(0 0 12px ${strokeColor}40)` : "none",
          transition: "all 0.3s ease",
        }}
      />

      {selected && markerEnd && (
        <BaseEdge
          path={edgePath}
          markerEnd={markerEnd}
          style={{
            stroke: "transparent",
            strokeWidth: 8,
          }}
        />
      )}

      <circle r="6" fill={dotColor} pointerEvents="none">
        <animateMotion dur="1.8s" repeatCount="indefinite" path={edgePath} />
        <animate attributeName="r" values="5;7;5" dur="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.8;1" dur="1s" repeatCount="indefinite" />
      </circle>

      <circle r="14" fill={glowColor} pointerEvents="none">
        <animateMotion dur="1.8s" repeatCount="indefinite" path={edgePath} />
        <animate attributeName="r" values="12;16;12" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="1.2s" repeatCount="indefinite" />
      </circle>

      <path
        d={edgePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth="20"
        strokeLinecap="round"
        opacity="0"
        pointerEvents="none"
      >
        <animate attributeName="opacity" values="0;0.08;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
      </path>

      {actionLabel && (
        <EdgeLabelBox
          x={labelX}
          y={labelY}
          text={actionLabel}
          strokeColor={strokeColor}
          onClick={data?.onClick ? handleLabelClick : undefined}
        />
      )}
    </>
  );
}
