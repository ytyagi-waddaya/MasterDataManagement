import { useCallback, useState } from "react";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

const MAX_HISTORY = 50;

/* ======================================================
   UNDO / REDO HOOK (WITH RESET)
====================================================== */
export function useUndoRedo<T>(initial: T): {
  state: T;
  setState: SetState<T>;
  reset: (next: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
} {
  const [history, setHistory] = useState<HistoryState<T>>({
    past: [],
    present: initial,
    future: [],
  });

  /* ---------- SET (pushes to history) ---------- */
  const setState: SetState<T> = useCallback((value) => {
    setHistory((h) => {
      const next =
        typeof value === "function"
          ? (value as (prev: T) => T)(h.present)
          : value;

      // 🔒 Avoid pushing identical references
      if (Object.is(next, h.present)) return h;

      const past =
        h.past.length >= MAX_HISTORY
          ? [...h.past.slice(1), h.present]
          : [...h.past, h.present];

      return {
        past,
        present: next,
        future: [],
      };
    });
  }, []);

  /* ---------- RESET (hard replace, clears history) ---------- */
  const reset = useCallback((next: T) => {
    setHistory({
      past: [],
      present: next,
      future: [],
    });
  }, []);

  /* ---------- UNDO ---------- */
  const undo = useCallback(() => {
    setHistory((h) => {
      if (!h.past.length) return h;

      const previous = h.past[h.past.length - 1];
      const past = h.past.slice(0, -1);

      return {
        past,
        present: previous,
        future: [h.present, ...h.future],
      };
    });
  }, []);

  /* ---------- REDO ---------- */
  const redo = useCallback(() => {
    setHistory((h) => {
      if (!h.future.length) return h;

      const [next, ...future] = h.future;

      return {
        past: [...h.past, h.present],
        present: next,
        future,
      };
    });
  }, []);

  return {
    state: history.present,
    setState,
    reset, // ✅ THIS FIXES THE CANVAS ISSUE
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
}
