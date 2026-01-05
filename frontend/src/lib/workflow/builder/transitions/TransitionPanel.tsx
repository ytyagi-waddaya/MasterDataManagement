// D:\Raghav\MasterDataManagement\frontend\src\lib\workflow\builder\transitions\TransitionPanel.tsx
"use client";

import { useEffect, useMemo, useCallback } from "react";
import { useWatch } from "react-hook-form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { TransitionRow } from "./TransitionRow";

function makeId() {
  // @ts-ignore
  return globalThis?.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function normalizeStages(stages: any[]) {
  return (stages || [])
    .filter((s: any) => s?.tempId) // ✅ keep same as your current logic
    .map((s: any) => ({
      id: String(s.tempId),
      name: String(s.name ?? ""),
    }));
}

export function TransitionPanel({
  open,
  onClose,
  activeIndex,
  onSelectIndex, // ✅ parent controlled index
  form,
  transitionArray,
  stages,
  roleList: rawRoleList = [],
  userList: rawUserList = [],

  // ✅ NEW: stage node click se pass karo (tempId)
  activeStageId,
}: any) {
  const roleList = Array.isArray(rawRoleList) ? rawRoleList : [];
  const userList = Array.isArray(rawUserList) ? rawUserList : [];

  const allTransitions = useWatch({ control: form?.control, name: "transitions" }) || [];

  const safeIndex = typeof activeIndex === "number" && activeIndex >= 0 ? activeIndex : -1;
  const activeTransition = safeIndex >= 0 ? allTransitions[safeIndex] : null;

  const normalizedStages = useMemo(() => normalizeStages(stages), [stages]);

  const stageMap = useMemo(() => {
    const m = new Map<string, string>();
    normalizedStages.forEach((s: any) => m.set(String(s.id), String(s.name ?? "")));
    return m;
  }, [normalizedStages]);

  // ✅ stage focus (node click)
  const focusStageId = String(activeStageId ?? "").trim();

  // ✅ related transitions for selected stage (from or to)
  const relatedIndexes = useMemo(() => {
    if (!focusStageId) return [];
    const sid = String(focusStageId);
    const idxs: number[] = [];
    for (let i = 0; i < allTransitions.length; i++) {
      const t = allTransitions[i];
      if (String(t?.fromStageId ?? "") === sid || String(t?.toStageId ?? "") === sid) {
        idxs.push(i);
      }
    }
    return idxs;
  }, [allTransitions, focusStageId]);

  // ✅ When user clicks a stage node -> open first related transition automatically
  useEffect(() => {
    if (!open) return;
    if (!focusStageId) return;
    if (!relatedIndexes.length) return;

    // if current open transition is already related, don't change
    if (safeIndex >= 0 && relatedIndexes.includes(safeIndex)) return;

    onSelectIndex?.(relatedIndexes[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, focusStageId, relatedIndexes.join(","), safeIndex]);

  const fromName =
    stageMap.get(String(activeTransition?.fromStageId)) ?? "—";

  const toName =
    stageMap.get(String(activeTransition?.toStageId)) ?? "—";

  const focusedStageName = focusStageId ? stageMap.get(focusStageId) ?? "—" : "";

  // Safety: if index goes out of range (after deletion), close panel
  useEffect(() => {
    if (!open) return;
    if (safeIndex === -1) return;
    if (safeIndex > allTransitions.length - 1) onClose?.();
  }, [open, safeIndex, allTransitions.length, onClose]);

  const addTransitionAndOpen = useCallback(() => {
    const index = transitionArray?.fields?.length ?? allTransitions.length;

    transitionArray?.append?.({
      tempId: makeId(),
      label: "",
      fromStageId: focusStageId || "", // ✅ stage click ka benefit
      toStageId: "",
      transitionType: "NORMAL",
      triggerStrategy: "ANY_ALLOWED",
      approvalStrategy: "ALL",
      approvalConfig: undefined,
      allowedRoleIds: [],
      allowedUserIds: [],
      autoTrigger: false,
    });

    // open new transition form
    setTimeout(() => {
      onSelectIndex?.(index);
    }, 0);
  }, [transitionArray, allTransitions.length, onSelectIndex, focusStageId]);

  // ✅ if stage has no related transitions and panel is open -> allow adding quickly
  const noRelatedButFocused = open && focusStageId && relatedIndexes.length === 0;

  // If panel opened but no activeTransition and stage has related -> open first
  useEffect(() => {
    if (!open) return;
    if (activeTransition) return;
    if (!relatedIndexes.length) return;
    onSelectIndex?.(relatedIndexes[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, relatedIndexes.join(","), !!activeTransition]);

  if (!open) return null;

  // If stage selected but no transition exists -> show panel + allow add
  if (safeIndex === -1 || !activeTransition) {
    if (noRelatedButFocused) {
      return (
        <Sheet open={open} onOpenChange={(v) => !v && onClose?.()}>
          <SheetContent
            side="right"
            className={[
              "w-[760px] max-w-[95vw] p-0",
              "[&>button.absolute.right-4.top-4]:hidden",
            ].join(" ")}
          >
            <SheetHeader className="border-b px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <SheetTitle>Transition Editor</SheetTitle>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Stage: <span className="font-medium text-foreground">{focusedStageName}</span>{" "}
                    <span className="ml-2 text-xs">({relatedIndexes.length} transitions)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={addTransitionAndOpen}
                    title="Add transition"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>

                  <Button type="button" size="icon" variant="ghost" onClick={onClose} title="Close">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </SheetHeader>

            <div className="h-[calc(100vh-90px)] overflow-y-auto p-5">
              <div className="rounded-2xl border bg-muted/30 p-6 text-sm text-muted-foreground">
                Is stage ke liye abhi koi transition nahi hai.{" "}
                <button
                  type="button"
                  className="underline font-medium"
                  onClick={addTransitionAndOpen}
                >
                  + Add Transition
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      );
    }

    return null;
  }

  const handleDeleteFromPanel = () => {
    const deletingIndex = safeIndex;
    const prevLen = allTransitions.length;

    transitionArray?.remove?.(deletingIndex);

    setTimeout(() => {
      const newLen = prevLen - 1;

      if (newLen <= 0) {
        onSelectIndex?.(-1);
        onClose?.();
        return;
      }

      // ✅ if stage is focused, open nearest related transition
      if (focusStageId) {
        const sid = String(focusStageId);
        for (let i = 0; i < newLen; i++) {
          const t = (useWatch({ control: form?.control, name: "transitions" }) || [])[i] ?? null;
          if (!t) continue;
          if (String(t?.fromStageId ?? "") === sid || String(t?.toStageId ?? "") === sid) {
            onSelectIndex?.(i);
            return;
          }
        }
      }

      // fallback
      const nextIndex = Math.min(deletingIndex, newLen - 1);
      onSelectIndex?.(nextIndex);
    }, 0);
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose?.()}>
      <SheetContent
        side="right"
        className={[
          "w-[760px] max-w-[95vw] p-0",
          "[&>button.absolute.right-4.top-4]:hidden",
        ].join(" ")}
      >
        <SheetHeader className="border-b px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <SheetTitle>Transition Editor</SheetTitle>

              <div className="mt-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{fromName}</span> →{" "}
                <span className="font-medium text-foreground">{toName}</span>

                {/* ✅ stage info only (UI minimal) */}
                {focusStageId ? (
                  <span className="ml-2 text-xs text-muted-foreground">
                    • Stage: <span className="font-medium text-foreground">{focusedStageName}</span>{" "}
                    ({relatedIndexes.length})
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* ✅ + icon added (UI same, just icon) */}
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={addTransitionAndOpen}
                title="Add transition"
              >
                <Plus className="h-4 w-4" />
              </Button>

              <Button type="button" size="icon" variant="ghost" onClick={onClose} title="Close">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className="h-[calc(100vh-90px)] overflow-y-auto p-5">
          <TransitionRow
            index={safeIndex}
            control={form.control}
            register={form.register}
            setValue={form.setValue}
            remove={transitionArray.remove}
            normalizedStages={normalizedStages}
            roleList={roleList}
            userList={userList}
            errors={form?.formState?.errors}
            onDelete={handleDeleteFromPanel}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
