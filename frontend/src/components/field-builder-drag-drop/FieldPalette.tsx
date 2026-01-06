
// "use client";

// import { useMemo, useState } from "react";
// import * as Icons from "lucide-react";
// import type { LucideIcon } from "lucide-react";
// import { useDraggable } from "@dnd-kit/core";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// import { FIELD_PALETTE } from "./fieldPalette.data";
// import { PaletteGroup, PaletteItem } from "./contracts/fieldPalette.contract";
// import { FALLBACK_ICON, ICONS } from "../iconRegistry";


// /* ======================================================
//    FIELD PALETTE (GROUP-COLLAPSIBLE)
// ====================================================== */

// export function FieldPalette() {
//   const [query, setQuery] = useState("");
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

//   const groups = useMemo(() => {
//     if (!query.trim()) return FIELD_PALETTE;

//     const q = query.toLowerCase();
//     return FIELD_PALETTE.map((group) => ({
//       ...group,
//       items: group.items.filter((item) =>
//         item.label.toLowerCase().includes(q)
//       ),
//     })).filter((g) => g.items.length > 0);
//   }, [query]);

//   return (
//     <aside
//       className={`
//         border-r bg-background flex flex-col h-full
//         transition-all duration-200
//         ${isCollapsed ? "w-14" : "w-72"}
//       `}
//     >
//       {/* ================= HEADER ================= */}
//       <div className="flex items-center gap-2 p-2 border-b">
//         {!isCollapsed && (
//           <input
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search"
//             className="flex-1 rounded border px-2 py-1 text-sm"
//           />
//         )}

//         <button
//           onClick={() => {
//             setIsCollapsed((v) => !v);
//             setExpandedGroup(null);
//           }}
//           className="p-1 rounded hover:bg-muted"
//         >
//           {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
//         </button>
//       </div>

//       {/* ================= CONTENT ================= */}
//       <div className="flex-1 overflow-y-auto p-2 space-y-4">
//         {groups.map((group) => (
//           <PaletteGroupView
//             key={group.group}
//             group={group}
//             isCollapsed={isCollapsed}
//             expanded={expandedGroup === group.group}
//             onToggle={() =>
//               setExpandedGroup((g) =>
//                 g === group.group ? null : group.group
//               )
//             }
//           />
//         ))}
//       </div>
//     </aside>
//   );
// }

// /* ======================================================
//    GROUP VIEW
// ====================================================== */

// function PaletteGroupView({
//   group,
//   isCollapsed,
//   expanded,
//   onToggle,
// }: {
//   group: PaletteGroup;
//   isCollapsed: boolean;
//   expanded: boolean;
//   onToggle: () => void;
// }) {
//   const GroupIcon = resolveIcon(group.items[0]?.icon);

//   /* -------- COLLAPSED MODE -------- */
//   if (isCollapsed && !expanded) {
//     return (
//       <button
//         onClick={onToggle}
//         title={group.group}
//         className="flex items-center justify-center h-10 rounded hover:bg-muted"
//       >
//         <GroupIcon className="h-5 w-5 text-muted-foreground" />
//       </button>
//     );
//   }

//   return (
//     <section className="space-y-2">
//       <button
//         onClick={onToggle}
//         className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground"
//       >
//         <GroupIcon className="h-4 w-4" />
//         {!isCollapsed && group.group}
//       </button>

//       <div
//         className={`grid gap-2 ${
//           isCollapsed ? "grid-cols-1" : "grid-cols-3"
//         }`}
//       >
//         {group.items.map((item) => (
//           <PaletteItemTile
//             key={item.id}
//             item={item}
//             hideLabel={isCollapsed}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }


// /* ======================================================
//    ITEM TILE
// ====================================================== */

// function PaletteItemTile({
//   item,
//   hideLabel,
// }: {
//   item: PaletteItem;
//   hideLabel: boolean;
// }) {
//   const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
//     id: `palette:${item.id}`,
//     data: {
//       type: item.kind === "FIELD" ? "PALETTE_FIELD" : "PALETTE_LAYOUT",
//       item,
//     },
//   });

//   const Icon = Icons[item.icon] as LucideIcon;

//   return (
//     <div
//       ref={setNodeRef}
//       {...listeners}
//       {...attributes}
//       title={item.label}
//       className={`
//         flex flex-col items-center justify-center gap-1
//         rounded-md border p-2 text-xs cursor-grab
//         transition hover:bg-muted
//         ${isDragging ? "opacity-50" : ""}
//       `}
//     >
//       <Icon className="h-5 w-5" />
//       {!hideLabel && <span className="text-center">{item.label}</span>}
//     </div>
//   );
// }


// export function resolveIcon(name?: string): LucideIcon {
//   if (!name) return FALLBACK_ICON;
//   return ICONS[name] ?? FALLBACK_ICON;
// }
"use client";

import { useMemo, useState } from "react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { Search, ChevronLeft, ChevronRight, Menu, Grid, Plus } from "lucide-react";

import { FIELD_PALETTE } from "./fieldPalette.data";
import { PaletteGroup, PaletteItem } from "./contracts/fieldPalette.contract";
import { FALLBACK_ICON, ICONS } from "../iconRegistry";

/* ======================================================
   FIELD PALETTE (ULTRA MINIMAL DESIGN)
====================================================== */

export function FieldPalette() {
  const [query, setQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const groups = useMemo(() => {
    if (!query.trim()) return FIELD_PALETTE;

    const q = query.toLowerCase();
    return FIELD_PALETTE.map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(q)
      ),
    })).filter((g) => g.items.length > 0);
  }, [query]);

  const handleCollapseToggle = () => {
    setIsCollapsed((v) => !v);
    setExpandedGroup(null);
    setActiveGroup(null);
  };

  return (
    <aside
      className={`
        flex flex-col h-full bg-white dark:bg-gray-900
        border-r border-gray-100 dark:border-gray-800
        transition-all duration-200
        ${isCollapsed ? "w-12" : "w-64"}
      `}
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-center p-2 border-b border-gray-100 dark:border-gray-800">
        {!isCollapsed ? (
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full pl-8 pr-2 py-1.5 text-xs rounded
                bg-gray-50 dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700
                focus:outline-none focus:ring-0 focus:border-gray-300
                placeholder:text-gray-400"
            />
          </div>
        ) : (
          <button
            onClick={handleCollapseToggle}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Expand palette"
          >
            <Plus className="h-4 w-4 text-gray-500" />
          </button>
        )}

        {!isCollapsed && (
          <button
            onClick={handleCollapseToggle}
            className="ml-2 w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Collapse palette"
          >
            <ChevronLeft className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 overflow-y-auto p-2">
        {!isCollapsed && groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <Search className="h-6 w-6 text-gray-300 mb-1.5" />
            <p className="text-xs text-gray-400">No results</p>
          </div>
        ) : isCollapsed ? (
          /* ===== COLLAPSED MODE ===== */
          <div className="space-y-1">
            {groups.map((group) => (
              <CollapsedGroupItem
                key={group.group}
                group={group}
                isActive={activeGroup === group.group}
                onClick={() => setActiveGroup(group.group)}
              />
            ))}
          </div>
        ) : (
          /* ===== EXPANDED MODE ===== */
          <div className="space-y-3">
            {groups.map((group) => (
              <ExpandedGroupView
                key={group.group}
                group={group}
                expanded={expandedGroup === group.group}
                onToggle={() =>
                  setExpandedGroup((g) =>
                    g === group.group ? null : group.group
                  )
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* ================= COLLAPSED STATS ================= */}
      {isCollapsed && (
        <div className="p-2 border-t border-gray-100 dark:border-gray-800">
          <div className="text-center">
            <div className="text-[10px] text-gray-400 mb-0.5">
              {groups.length}G
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-800"></div>
          </div>
        </div>
      )}
    </aside>
  );
}

/* ======================================================
   COLLAPSED GROUP ITEM (ULTRA MINIMAL)
====================================================== */

function CollapsedGroupItem({
  group,
  isActive,
  onClick,
}: {
  group: PaletteGroup;
  isActive: boolean;
  onClick: () => void;
}) {
  const GroupIcon = resolveIcon(group.items[0]?.icon);

  return (
    <button
      onClick={onClick}
      className={`
        relative w-full aspect-square flex items-center justify-center
        rounded transition-colors
        ${isActive 
          ? "bg-gray-100 dark:bg-gray-800" 
          : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
        }
      `}
      title={group.group}
    >
      <GroupIcon 
        className={`
          h-4 w-4 transition-colors
          ${isActive 
            ? "text-gray-700 dark:text-gray-300" 
            : "text-gray-500 dark:text-gray-400"
          }
        `} 
      />
      
      {/* Active indicator dot */}
      {isActive && (
        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
      )}
    </button>
  );
}

/* ======================================================
   EXPANDED GROUP VIEW
====================================================== */

function ExpandedGroupView({
  group,
  expanded,
  onToggle,
}: {
  group: PaletteGroup;
  expanded: boolean;
  onToggle: () => void;
}) {
  const GroupIcon = resolveIcon(group.items[0]?.icon);

  return (
    <div className="space-y-1.5">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 w-full px-1 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
      >
        <GroupIcon className="h-3.5 w-3.5" />
        <span className="flex-1 text-left">{group.group}</span>
        <div className={`transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}>
          <ChevronRight className="h-3 w-3" />
        </div>
      </button>

      {expanded && (
        <div className="grid grid-cols-2 gap-1 pl-4">
          {group.items.map((item) => (
            <ExpandedItemTile
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ======================================================
   EXPANDED ITEM TILE
====================================================== */

function ExpandedItemTile({
  item,
}: {
  item: PaletteItem;
}) {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: `palette:${item.id}`,
    data: {
      type: item.kind === "FIELD" ? "PALETTE_FIELD" : "PALETTE_LAYOUT",
      item,
    },
  });

  const Icon = Icons[item.icon] as LucideIcon;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        flex flex-col items-center p-1.5 rounded border
        bg-white dark:bg-gray-900
        border-gray-200 dark:border-gray-800
        hover:border-gray-300 dark:hover:border-gray-700
        hover:bg-gray-50 dark:hover:bg-gray-800
        cursor-grab active:cursor-grabbing
        transition-all duration-150
        ${isDragging ? "opacity-30" : ""}
      `}
    >
      <Icon className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400 mb-1" />
      <span className="text-[10px] text-gray-600 dark:text-gray-400 text-center truncate w-full">
        {item.label}
      </span>
    </div>
  );
}

/* ======================================================
   COLLAPSED PREVIEW MODAL (FLOATING)
====================================================== */

function CollapsedPreviewModal({
  group,
  onClose,
}: {
  group: PaletteGroup;
  onClose: () => void;
}) {
  const GroupIcon = resolveIcon(group.items[0]?.icon);
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: `preview:${group.group}`,
    data: { type: "GROUP_PREVIEW", group },
  });

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div 
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="absolute top-16 left-14 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 w-48"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-100 dark:border-gray-800">
          <GroupIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {group.group}
          </span>
        </div>

        {/* Items */}
        <div className="p-2">
          <div className="grid grid-cols-2 gap-1">
            {group.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center p-1.5 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {/* <Icons[item.icon] as LucideIcon className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400 mb-1" /> */}
                <span className="text-[10px] text-gray-600 dark:text-gray-400 text-center truncate w-full">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function resolveIcon(name?: string): LucideIcon {
  if (!name) return FALLBACK_ICON;
  return ICONS[name] ?? FALLBACK_ICON;
}