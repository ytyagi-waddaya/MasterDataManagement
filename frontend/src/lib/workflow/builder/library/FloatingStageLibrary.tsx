"use client";

import { useState } from "react";
import { STAGE_LIBRARY, type StageTemplate } from "./stageLibrary";

type FloatingStageLibraryProps = {
  open: boolean;
  onToggle?: () => void;
  onSelect?: (t: StageTemplate) => void;
};

export default function FloatingStageLibrary({
  open,
  onToggle,
  onSelect,
}: FloatingStageLibraryProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="absolute left-4 top-4 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      {/* + BUTTON */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle?.();
        }}
        className="
          flex h-10 w-10 items-center justify-center
          rounded-full bg-green-600 text-white shadow-lg
          transition hover:bg-green-700 hover:scale-105
        "
        aria-label="Add stage"
      >
        +
      </button>

      {/* STAGE LIST */}
      {open && (
        <div
          className="mt-2 w-64 rounded-xl border bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-2 text-sm font-semibold border-b">
            Add Stage
          </div>

          <div className="p-2 space-y-1">
            {STAGE_LIBRARY.map((t) => {
              const Icon = t.icon;

              return (
                <div
                  key={t.category}
                  className="relative"
                  onMouseEnter={() => setHovered(t.category)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <button
                    type="button"
                    className="
                      flex w-full items-center gap-2 rounded-md
                      px-2 py-2 text-sm
                      transition hover:bg-slate-100
                    "
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect?.(t);
                    }}
                    aria-label={`Add stage ${t.label}`}
                  >
                    <Icon className="h-4 w-4 text-slate-600" />
                    <span>{t.label}</span>

                    {/* ✅ Final badge only if isFinal true (Rejected me isFinal nahi hoga) */}
                    {t.isFinal === true && (
                      <span className="ml-auto rounded-full bg-slate-200 px-2 py-0.5 text-[10px]">
                        Final
                      </span>
                    )}
                  </button>

                  {/* ✅ INLINE TOOLTIP */}
                  {hovered === t.category && (
                    <div
                      className="
                        absolute left-full top-1/2 ml-3
                        w-56 -translate-y-1/2
                        rounded-lg border bg-white
                        px-3 py-2 text-xs text-slate-700
                        shadow-lg
                      "
                      role="tooltip"
                    >
                      <div className="font-medium mb-1">{t.label}</div>
                      <div className="text-slate-500">{t.description}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
