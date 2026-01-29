// "use client";

// import { useEffect, useMemo, useCallback } from "react";
// import { useWatch } from "react-hook-form";
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { Plus, X } from "lucide-react";
// import { TransitionRow } from "./TransitionRow";

// function makeId() {
//   // @ts-ignore
//   return globalThis?.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
// }

// function normalizeStages(stages: any[]) {
//   return (stages || [])
//     .filter((s: any) => s?.tempId)
//     .map((s: any) => ({
//       id: String(s.tempId),
//       name: String(s.name ?? ""),
//     }));
// }

// export function TransitionPanel({
//   open,
//   onClose,
//   activeIndex,
//   onSelectIndex,
//   form,
//   transitionArray,
//   stages,
//   roleList: rawRoleList = [],
//   userList: rawUserList = [],
//   activeStageId, // optional: stage node click -> pass tempId
// }: any) {
//   const roleList = Array.isArray(rawRoleList) ? rawRoleList : [];
//   const userList = Array.isArray(rawUserList) ? rawUserList : [];

//   // ✅ always watch transitions from form (single source of truth)
//   const allTransitions =
//     useWatch({ control: form?.control, name: "transitions" }) || [];

//   const normalizedStages = useMemo(() => normalizeStages(stages), [stages]);

//   const stageMap = useMemo(() => {
//     const m = new Map<string, string>();
//     normalizedStages.forEach((s: any) => m.set(String(s.id), String(s.name ?? "")));
//     return m;
//   }, [normalizedStages]);

//   const focusStageId = String(activeStageId ?? "").trim();

//   const relatedIndexes = useMemo(() => {
//     if (!focusStageId) return [];
//     const sid = String(focusStageId);
//     const idxs: number[] = [];
//     for (let i = 0; i < allTransitions.length; i++) {
//       const t = allTransitions[i];
//       if (String(t?.fromStageId ?? "") === sid || String(t?.toStageId ?? "") === sid) {
//         idxs.push(i);
//       }
//     }
//     return idxs;
//   }, [allTransitions, focusStageId]);

//   const safeIndex =
//     typeof activeIndex === "number" && activeIndex >= 0 ? activeIndex : -1;

//   const activeTransition =
//     safeIndex >= 0 && safeIndex < allTransitions.length ? allTransitions[safeIndex] : null;

//   const fromName = stageMap.get(String(activeTransition?.fromStageId)) ?? "—";
//   const toName = stageMap.get(String(activeTransition?.toStageId)) ?? "—";
//   const focusedStageName = focusStageId ? stageMap.get(focusStageId) ?? "—" : "";

//   // ✅ If stage clicked & panel open -> auto open first related transition
//   useEffect(() => {
//     if (!open) return;
//     if (!focusStageId) return;
//     if (!relatedIndexes.length) return;

//     // if already a related transition open, don't change
//     if (safeIndex >= 0 && relatedIndexes.includes(safeIndex)) return;

//     onSelectIndex?.(relatedIndexes[0]);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open, focusStageId, relatedIndexes, safeIndex]);

//   // ✅ If activeIndex is invalid due to deletion -> close or reselect
//   useEffect(() => {
//     if (!open) return;

//     // if index beyond length, pick nearest or close
//     if (safeIndex >= allTransitions.length) {
//       if (!allTransitions.length) {
//         onSelectIndex?.(-1);
//         onClose?.();
//       } else {
//         onSelectIndex?.(allTransitions.length - 1);
//       }
//     }
//   }, [open, safeIndex, allTransitions.length, onClose, onSelectIndex]);

//   const addTransitionAndOpen = useCallback(() => {
//     const index = transitionArray?.fields?.length ?? allTransitions.length;

//     transitionArray?.append?.({
//       tempId: makeId(),
//       label: "",
//       fromStageId: focusStageId || "",
//       toStageId: "",
//       transitionType: "NORMAL",
//       triggerStrategy: "ANY_ALLOWED",
//       approvalStrategy: "ALL",
//       approvalConfig: undefined,
//       allowedRoleIds: [],
//       allowedUserIds: [],
//       autoTrigger: false,
//     });

//     // open newly created transition
//     setTimeout(() => onSelectIndex?.(index), 0);
//   }, [transitionArray, allTransitions.length, onSelectIndex, focusStageId]);

//   const handleDeleteFromPanel = useCallback(() => {
//     if (safeIndex < 0) return;

//     const deletingIndex = safeIndex;
//     transitionArray?.remove?.(deletingIndex);

//     setTimeout(() => {
//       // ✅ IMPORTANT: use form.getValues (NOT useWatch inside setTimeout)
//       const current = (form?.getValues?.("transitions") as any[]) || [];
//       const newLen = current.length;

//       if (newLen <= 0) {
//         onSelectIndex?.(-1);
//         onClose?.();
//         return;
//       }

//       // if stage focused -> open first related
//       if (focusStageId) {
//         const sid = String(focusStageId);
//         for (let i = 0; i < newLen; i++) {
//           const t = current[i];
//           if (!t) continue;
//           if (String(t?.fromStageId ?? "") === sid || String(t?.toStageId ?? "") === sid) {
//             onSelectIndex?.(i);
//             return;
//           }
//         }
//       }

//       // fallback: open nearest
//       const nextIndex = Math.min(deletingIndex, newLen - 1);
//       onSelectIndex?.(nextIndex);
//     }, 0);
//   }, [safeIndex, transitionArray, form, onSelectIndex, onClose, focusStageId]);

//   if (!open) return null;

//   // ✅ empty state: panel open but no active transition selected
//   if (safeIndex === -1 || !activeTransition) {
//     // if stage focused but no related transitions
//     const noRelatedButFocused = focusStageId && relatedIndexes.length === 0;

//     return (
//       <Sheet open={open} onOpenChange={(v) => !v && onClose?.()}>
//         <SheetContent
//           side="right"
//           className={[
//             "w-[450px]! max-w-none! p-0",
//             "[&>button.absolute.right-4.top-4]:hidden",
//           ].join(" ")}
//           style={{ maxWidth: "95vw" }}
//         >
//           <SheetHeader className="border-b px-5 py-4">
//             <div className="flex items-start justify-between gap-3">
//               <div>
//                 <SheetTitle>Transition Editor</SheetTitle>
//                 <div className="mt-1 text-sm text-muted-foreground">
//                   {noRelatedButFocused ? (
//                     <>
//                       Stage:{" "}
//                       <span className="font-medium text-foreground">{focusedStageName}</span>{" "}
//                       <span className="ml-2 text-xs">({relatedIndexes.length} transitions)</span>
//                     </>
//                   ) : (
//                     <>Select a transition to edit</>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Button
//                   type="button"
//                   size="icon"
//                   variant="outline"
//                   onClick={addTransitionAndOpen}
//                   title="Add transition"
//                 >
//                   <Plus className="h-4 w-4" />
//                 </Button>
//                 <Button type="button" size="icon" variant="ghost" onClick={onClose} title="Close">
//                   <X className="h-5 w-5" />
//                 </Button>
//               </div>
//             </div>
//           </SheetHeader>

//           <div className="h-[calc(100vh-90px)] overflow-y-auto p-5">
//             <div className="rounded-2xl border bg-muted/30 p-6 text-sm text-muted-foreground">
//               <button type="button" className="underline font-medium" onClick={addTransitionAndOpen}>
//                 + Add Transition
//               </button>
//             </div>
//           </div>
//         </SheetContent>
//       </Sheet>
//     );
//   }

//   return (
//     <Sheet open={open} onOpenChange={(v) => !v && onClose?.()}>
//       <SheetContent
//         side="right"
//         className={[
//           "w-[450px]! max-w-none! p-0",
//           "[&>button.absolute.right-4.top-4]:hidden",
//         ].join(" ")}
//         style={{ maxWidth: "95vw" }}
//       >
//         <SheetHeader className="border-b px-5 py-4">
//           <div className="flex items-start justify-between gap-3">
//             <div>
//               <SheetTitle>Transition Editor</SheetTitle>
//               <div className="mt-1 text-sm text-muted-foreground">
//                 <span className="font-medium text-foreground">{fromName}</span> →{" "}
//                 <span className="font-medium text-foreground">{toName}</span>

//                 {focusStageId ? (
//                   <span className="ml-2 text-xs text-muted-foreground">
//                     • Stage:{" "}
//                     <span className="font-medium text-foreground">{focusedStageName}</span>{" "}
//                     ({relatedIndexes.length})
//                   </span>
//                 ) : null}
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <Button
//                 type="button"
//                 size="icon"
//                 variant="outline"
//                 onClick={addTransitionAndOpen}
//                 title="Add transition"
//               >
//                 <Plus className="h-4 w-4" />
//               </Button>

//               <Button type="button" size="icon" variant="ghost" onClick={onClose} title="Close">
//                 <X className="h-5 w-5" />
//               </Button>
//             </div>
//           </div>
//         </SheetHeader>

//         <div className="h-[calc(100vh-90px)] overflow-y-auto p-5">
//           <TransitionRow
//             index={safeIndex}
//             control={form.control}
//             register={form.register}
//             setValue={form.setValue}
//             remove={transitionArray.remove}
//             normalizedStages={normalizedStages}
//             roleList={roleList}
//             userList={userList}
//             errors={form?.formState?.errors}
//             onDelete={handleDeleteFromPanel}
//           />
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }

"use client";

import { useEffect, useMemo, useCallback } from "react";
import { useWatch } from "react-hook-form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus, X, ArrowRight } from "lucide-react";
import { TransitionRow } from "./TransitionRow";
import { makeId } from "@/utils/id";


function normalizeStages(stages: any[]) {
  return (stages || [])
    .filter((s: any) => s?.tempId)
    .map((s: any) => ({
      id: String(s.tempId),
      name: String(s.name ?? ""),
    }));
}

export function TransitionPanel({
  open,
  onClose,
  activeIndex,
  onSelectIndex,
  form,
  transitionArray,
  stages,
  roleList: rawRoleList = [],
  userList: rawUserList = [],
  activeStageId,
}: any) {
  const roleList = Array.isArray(rawRoleList) ? rawRoleList : [];
  const userList = Array.isArray(rawUserList) ? rawUserList : [];

  const allTransitions =
    useWatch({ control: form?.control, name: "transitions" }) || [];

  const normalizedStages = useMemo(() => normalizeStages(stages), [stages]);

  const stageMap = useMemo(() => {
    const m = new Map<string, string>();
    normalizedStages.forEach((s: any) => m.set(String(s.id), String(s.name ?? "")));
    return m;
  }, [normalizedStages]);

  const focusStageId = String(activeStageId ?? "").trim();

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

  const safeIndex =
    typeof activeIndex === "number" && activeIndex >= 0 ? activeIndex : -1;

  const activeTransition =
    safeIndex >= 0 && safeIndex < allTransitions.length ? allTransitions[safeIndex] : null;

  const fromName = stageMap.get(String(activeTransition?.fromStageId)) ?? "—";
  const toName = stageMap.get(String(activeTransition?.toStageId)) ?? "—";
  const focusedStageName = focusStageId ? stageMap.get(focusStageId) ?? "—" : "";

  useEffect(() => {
    if (!open) return;
    if (!focusStageId) return;
    if (!relatedIndexes.length) return;

    if (safeIndex >= 0 && relatedIndexes.includes(safeIndex)) return;

    onSelectIndex?.(relatedIndexes[0]);
  }, [open, focusStageId, relatedIndexes, safeIndex, onSelectIndex]);

  useEffect(() => {
    if (!open) return;

    if (safeIndex >= allTransitions.length) {
      if (!allTransitions.length) {
        onSelectIndex?.(-1);
        onClose?.();
      } else {
        onSelectIndex?.(allTransitions.length - 1);
      }
    }
  }, [open, safeIndex, allTransitions.length, onClose, onSelectIndex]);

  const addTransitionAndOpen = useCallback(() => {
    const index = transitionArray?.fields?.length ?? allTransitions.length;

    transitionArray?.append?.({
      tempId: makeId(),
      label: "",
      fromStageId: focusStageId || "",
      toStageId: "",
      transitionType: "NORMAL",
      triggerStrategy: "ANY_ALLOWED",
      approvalStrategy: "ALL",
      approvalConfig: undefined,
      allowedRoleIds: [],
      allowedUserIds: [],
      autoTrigger: false,
    });

    setTimeout(() => onSelectIndex?.(index), 0);
  }, [transitionArray, allTransitions.length, onSelectIndex, focusStageId]);

  const handleDeleteFromPanel = useCallback(() => {
    if (safeIndex < 0) return;

    const deletingIndex = safeIndex;
    transitionArray?.remove?.(deletingIndex);

    setTimeout(() => {
      const current = (form?.getValues?.("transitions") as any[]) || [];
      const newLen = current.length;

      if (newLen <= 0) {
        onSelectIndex?.(-1);
        onClose?.();
        return;
      }

      if (focusStageId) {
        const sid = String(focusStageId);
        for (let i = 0; i < newLen; i++) {
          const t = current[i];
          if (!t) continue;
          if (String(t?.fromStageId ?? "") === sid || String(t?.toStageId ?? "") === sid) {
            onSelectIndex?.(i);
            return;
          }
        }
      }

      const nextIndex = Math.min(deletingIndex, newLen - 1);
      onSelectIndex?.(nextIndex);
    }, 0);
  }, [safeIndex, transitionArray, form, onSelectIndex, onClose, focusStageId]);

  if (!open) return null;

  if (safeIndex === -1 || !activeTransition) {
    const noRelatedButFocused = focusStageId && relatedIndexes.length === 0;

    return (
      <Sheet open={open} onOpenChange={(v) => !v && onClose?.()}>
        <SheetContent
          side="right"
          className="w-[420px] max-w-[95vw] p-0 border-l"
          style={{ maxWidth: "95vw" }}
        >
          <div className="h-full flex flex-col">
            <div className="px-6 py-5 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Transitions</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {noRelatedButFocused ? (
                      <>
                        Stage: <span className="font-medium text-gray-900">{focusedStageName}</span>
                      </>
                    ) : (
                      "Select a transition to edit"
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={addTransitionAndOpen}
                    className="h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={onClose}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">No transition selected</h4>
                <p className="text-sm text-gray-500 mb-4">
                  {noRelatedButFocused
                    ? "This stage has no transitions yet"
                    : "Select a transition or create a new one"}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addTransitionAndOpen}
                  className="rounded-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Transition
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose?.()}>
      <SheetContent
        side="right"
        className="w-[620px]! max-w-[95vw]! p-0 border-l"
        style={{ maxWidth: "95vw" }}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-5 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {fromName} → {toName}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Transition #{safeIndex + 1}
                  {focusStageId && (
                    <>
                      {" "}
                      • Stage: <span className="font-medium text-gray-900">{focusedStageName}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={addTransitionAndOpen}
                  className="h-8 w-8 mr-32"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TransitionRow
              index={safeIndex}
              control={form.control}
              register={form.register}
              setValue={form.setValue}
              remove={transitionArray.remove}
              normalizedStages={normalizedStages}
              stages={stages}   
              roleList={roleList}
              userList={userList}
              errors={form?.formState?.errors}
              onDelete={handleDeleteFromPanel}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}