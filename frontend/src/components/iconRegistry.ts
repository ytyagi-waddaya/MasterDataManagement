import {
  Type,
  Mail,
  Key,
  AlignLeft,
  Hash,
  IndianRupee,
  Percent,
  ChevronDown,
  ListPlus,
  ListChecks,
  ToggleLeft,
  Calendar,
  CalendarClock,
  Upload,
  Image,
  Star,
  Link,
  Columns,
  NotebookTabs,
  ChevronsUpDown,
  Repeat,
  SeparatorHorizontal,
  MoveVertical,
  Square,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* ======================================================
   STRICT ICON REGISTRY (JSX-SAFE)
====================================================== */

export const ICONS: Record<string, LucideIcon> = {
  Type,
  Mail,
  Key,
  AlignLeft,
  Hash,
  IndianRupee,
  Percent,
  ChevronDown,
  ListPlus,
  ListChecks,
  ToggleLeft,
  Calendar,
  CalendarClock,
  Upload,
  Image,
  Star,
  Link,
  Columns,
  NotebookTabs,
  ChevronsUpDown,
  Repeat,
  SeparatorHorizontal,
  MoveVertical,
};

/* ---------- fallback ---------- */
export const FALLBACK_ICON: LucideIcon = Square;
