// D:\Raghav\MasterDataManagement\frontend\src\lib\workflow\builder\library\FloatingStageLibrary.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { STAGE_LIBRARY, type StageTemplate, getStageUIColors } from "./stageLibrary";

type FloatingStageLibraryProps = {
  open: boolean;
  onToggle?: () => void;
  onSelect?: (t: StageTemplate) => void;
};

export default function FloatingStageLibrary({ open, onToggle, onSelect }: FloatingStageLibraryProps) {
  const [tip, setTip] = useState<{
    x: number;
    y: number;
    t: StageTemplate;
  } | null>(null);

  return (
    <div className="absolute left-4 top-4 z-50" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle?.();
        }}
        className="
          flex h-12 w-12 items-center justify-center
          rounded-full bg-blue-600 text-white
          shadow-xl transition-all duration-300
          hover:bg-blue-700 hover:scale-110
          active:scale-95
        "
        aria-label="Add stage"
      >
        <Plus className="h-6 w-6 text-white" />
      </button>

      {open && (
        <div
          className="
            mt-3 w-[320px]
            rounded-2xl border border-slate-200
            bg-white shadow-2xl
            overflow-visible
          "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 py-3 text-sm font-semibold border-b border-slate-100">
            Add Stage
          </div>

          {/* ✅ Scroll stays, tooltip won't clip now */}
          <div className="p-2 space-y-1 max-h-[60vh] overflow-y-auto pr-1">
            {STAGE_LIBRARY.map((t) => {
              const Icon = t.icon;
              const ui = getStageUIColors(t.category);

              return (
                <button
                  key={t.category}
                  type="button"
                  className="
                    relative
                    flex w-full items-center gap-3 rounded-xl
                    px-3 py-2 text-sm
                    transition hover:bg-slate-50
                    border border-transparent hover:border-slate-200
                  "
                  onMouseEnter={(e) => {
                    const r = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                    setTip({
                      x: r.right + 12,
                      y: r.top + r.height / 2,
                      t,
                    });
                  }}
                  onMouseLeave={() => setTip(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.(t);
                  }}
                  aria-label={`Add stage ${t.label}`}
                >
                  <div
                    className="h-8 w-8 rounded-xl border border-slate-200 flex items-center justify-center"
                    style={{ background: ui.gradientLight }}
                  >
                    <Icon className="h-4 w-4" style={{ color: ui.text }} />
                  </div>

                  <div className="flex-1 text-left">
                    <div className="font-semibold text-slate-900">{t.label}</div>
                    <div className="text-[11px] text-slate-500 truncate">{t.defaultName}</div>
                  </div>

                  {/* ❌ Agar tum “Final” chip bhi hataana chahte ho, ye block delete kar do */}
                  {t.isFinal === true && (
                    <span className="ml-auto rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                      Final
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ✅ Single tooltip (fixed) */}
          {tip && (
            <div
              className="
                fixed z-[9999]
                w-64 -translate-y-1/2
                rounded-xl border border-slate-200
                bg-white px-3 py-2
                text-xs text-slate-700 shadow-xl
                pointer-events-none
              "
              style={{ left: tip.x, top: tip.y }}
              role="tooltip"
            >
              {(() => {
                const ui = getStageUIColors(tip.t.category);
                return (
                  <>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ background: ui.base }} />
                      <div className="font-semibold">{tip.t.label}</div>
                    </div>
                    <div className="text-slate-500">{tip.t.description}</div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
