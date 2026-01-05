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
  const h = hex.replace("#", "").trim();
  if (h.length !== 6) return `rgba(34,197,94,${alpha})`;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* -----------------------------
 * Label renderer (DRY)
 * ----------------------------- */
function EdgeLabelBox({
  x,
  y,
  text,
  borderColor,
}: {
  x: number;
  y: number;
  text: string;
  borderColor?: string;
}) {
  if (!text) return null;

  return (
    <EdgeLabelRenderer>
      <div
        className="nodrag nopan"
        style={{
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${x}px,${y}px)`,
          zIndex: 999999,
          pointerEvents: "none",
        }}
      >
        <div
          className="rounded-md border bg-white/95 px-2 py-1 text-xs shadow-md backdrop-blur max-w-[220px] truncate"
          style={{ borderColor: borderColor || "rgba(148,163,184,0.8)" }}
          title={text}
        >
          {text}
        </div>
      </div>
    </EdgeLabelRenderer>
  );
}

export default function FlowEdge(props: EdgeProps) {
  const {
    source,
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
  } = props;

  const isInitial = data?.kind === "initial";

  // ✅ prevent overlap for multiple edges between same nodes
  const parallelIndex = Number(data?.parallelIndex ?? 1);
  const layout = (data?.layout as LayoutMode) ?? "horizontal";

  const SPREAD = 18;
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
    borderRadius: 18,
    offset: 26,
  });

  // ✅ FINAL COLOR RULE:
  // 1) data.stroke (from stage color) -> BEST
  // 2) data.color
  // 3) fallback slate
  const stroke =
    (data?.stroke as string) ||
    (data?.color as string) ||
    "rgba(15,23,42,0.55)";

  // dot/glow
  const dotColor =
    (data?.dotColor as string) ||
    (stroke.startsWith("#") ? stroke : "rgba(34,197,94,0.95)");

  const glowColor =
    (data?.glowColor as string) ||
    (stroke.startsWith("#") ? hexToRgba(stroke, 0.18) : "rgba(34,197,94,0.18)");

  // ✅ action label (data.label OR edge.label OR other fallbacks)
  const edgeLabelFromProps = String((props as any)?.label ?? "").trim();
  const actionLabel = String(
    data?.label ??
      data?.actionLabel ??
      data?.action ??
      data?.transitionLabel ??
      edgeLabelFromProps ??
      ""
  ).trim();

  /* -----------------------------
   * 1) NON-LIVE EDGE
   * ----------------------------- */
  if (!data?.live) {
    return (
      <>
        <BaseEdge
          path={edgePath}
          markerEnd={markerEnd}
          markerStart={markerStart}
          style={{
            ...style,
            stroke,
            strokeWidth: 2,
          }}
        />
        <EdgeLabelBox x={labelX} y={labelY} text={actionLabel} borderColor={stroke} />
      </>
    );
  }

  /* -----------------------------
   * 2) INITIAL EDGE (dotted)
   * ----------------------------- */
  if (isInitial) {
    return (
      <>
        <BaseEdge
          path={edgePath}
          markerEnd={markerEnd}
          markerStart={markerStart}
          style={{
            stroke: "rgba(15,23,42,0.45)",
            strokeWidth: 2,
            strokeDasharray: "2 6",
            strokeLinecap: "round",
          }}
        />

        <circle r="4" fill="rgba(15,23,42,0.75)" pointerEvents="none">
          <animateMotion dur="2.6s" repeatCount="indefinite" path={edgePath} />
        </circle>

        <EdgeLabelBox
          x={labelX}
          y={labelY}
          text={actionLabel}
          borderColor={"rgba(15,23,42,0.45)"}
        />
      </>
    );
  }

  /* -----------------------------
   * 3) LIVE EDGE (colored)
   * ----------------------------- */
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        markerStart={markerStart}
        style={{
          ...style,
          stroke,
          strokeWidth: 2,
        }}
      />

      <circle r="4" fill={dotColor} pointerEvents="none">
        <animateMotion dur="1.6s" repeatCount="indefinite" path={edgePath} />
      </circle>

      <circle r="7" fill={glowColor} pointerEvents="none">
        <animateMotion dur="1.6s" repeatCount="indefinite" path={edgePath} />
        <animate attributeName="r" values="6;10;6" dur="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.25;0.08;0.25" dur="1s" repeatCount="indefinite" />
      </circle>

      <EdgeLabelBox x={labelX} y={labelY} text={actionLabel} borderColor={stroke} />
    </>
  );
}
