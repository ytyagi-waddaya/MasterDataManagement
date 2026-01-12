import { MoreVertical, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function NodeCard({
  title,
  icon: Icon,
  data,
  children,
  className = "",
  glowColor = "#6366f1",
}: any) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);

  // Auto-close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showContextMenu) setShowContextMenu(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showContextMenu]);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (data?.onToggleMenu) {
      data.onToggleMenu();
    } else {
      setShowContextMenu(!showContextMenu);
    }
  };

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    data?.onDuplicate?.();
    setShowContextMenu(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    data?.onDelete?.();
    setShowContextMenu(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Card Container */}
      <div
        className={`
        relative w-[320px] rounded-2xl bg-white/95 backdrop-blur-sm
        border border-slate-200/80 shadow-lg hover:shadow-xl 
        transition-all duration-300
        ${isDragging ? "shadow-2xl scale-[1.02] border-blue-300" : ""}
        ${data?.showMenu || showContextMenu ? "ring-2 ring-blue-500/20" : ""}
        overflow-hidden
      `}
      >
        {/* Glow Effect Border */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, transparent, ${glowColor}08, transparent)`,
            boxShadow: `inset 0 0 0 1px ${glowColor}15`,
          }}
        />

        {/* Header */}
        <div
          className={`
            relative px-5 py-4 border-b border-slate-100/80 
            drag-handle cursor-move rounded-t-2xl
            transition-all duration-200
            ${
              isDragging
                ? "bg-gradient-to-r from-slate-50/90 to-blue-50/90"
                : "bg-gradient-to-r from-slate-50/80 to-white/80"
            }
            hover:bg-gradient-to-r hover:from-slate-50/90 hover:to-blue-50/90
          `}
          draggable={!data?.readOnly}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {/* Drag Indicator Dots */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-60">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-slate-400" />
            ))}
          </div>

          <div className="flex items-center justify-between pl-4">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div
                className={`
                relative p-2 rounded-xl
                bg-gradient-to-br from-slate-100 to-white
                border border-slate-200/60 shadow-sm
                group-hover:shadow transition-shadow duration-200
              `}
              >
                {Icon && (
                  <Icon className="h-5 w-5 text-slate-700 group-hover:text-blue-600 transition-colors" />
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900 tracking-tight">
                  {title}
                </span>
                <span className="text-xs text-slate-500 font-medium mt-0.5">
                  Stage
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:bg-slate-100/80 transition-colors"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-slate-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                )}
              </button>

              {!data?.readOnly && (
                <button
                  onClick={handleMenuClick}
                  className={`
                    p-1.5 rounded-lg transition-all duration-200 relative
                    hover:bg-slate-100/80 active:scale-95
                    ${
                      data?.showMenu || showContextMenu
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-500"
                    }
                  `}
                  title="Actions"
                >
                  <MoreVertical className="h-4 w-4" />
                  {(data?.showMenu || showContextMenu) && (
                    <div className="absolute inset-0 rounded-lg bg-blue-500/10 animate-ping" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Context Menu (removed: Press ESC to close) */}
        {(data?.showMenu || showContextMenu) && !data?.readOnly && (
          <div className="absolute right-4 top-16 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="w-48 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-lg shadow-2xl overflow-hidden">
              <div className="px-4 py-2.5 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-white">
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Stage Actions
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {title || "Stage"}
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={handleDuplicate}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50/80 transition-all duration-150 group"
                >
                  <div className="p-1.5 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Duplicate</div>
                    <div className="text-xs text-slate-500">Create a copy</div>
                  </div>
                </button>

                <div className="mx-4 my-1 h-px bg-slate-100" />

                <button
                  onClick={handleDelete}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50/80 transition-all duration-150 group"
                >
                  <div className="p-1.5 rounded-lg bg-rose-50 group-hover:bg-rose-100 transition-colors">
                    <svg
                      className="w-4 h-4 text-rose-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Delete</div>
                    <div className="text-xs text-rose-500/80">Remove this stage</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Collapsible Content (removed: Last updated + Editable block) */}
        <div
          className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          <div className="px-5 py-4">
            <div className="space-y-4">{children}</div>
          </div>
        </div>

        {/* Bottom Toggle (removed: Show more / Show less text) */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 border-t border-slate-100/80 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50/50 transition-colors flex items-center justify-center"
          title={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
        </button>
      </div>

      {/* Drag Handle Indicator */}
      {isDragging && (
        <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-blue-400 bg-blue-50/20 pointer-events-none" />
      )}
    </div>
  );
}
