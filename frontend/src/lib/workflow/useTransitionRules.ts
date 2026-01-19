import { useEffect } from "react";
import { NormalizedStage } from "./TransitionsStep";

type Params = {
  index: number;
  transitionType: string;
  triggerStrategy: string;
  fromStageId?: string;
  toStageId?: string;
  approvalConfig?: any;
  normalizedStages:NormalizedStage[];
  setValue: (name: string, value: any, opts?: any) => void;
};

export function useTransitionRules({
  index,
  transitionType,
  triggerStrategy,
  fromStageId,
  toStageId,
  approvalConfig,
  normalizedStages,
  setValue,
}: Params) {
  /* --------------------------------------------------
     1. APPROVAL → force approver trigger
  -------------------------------------------------- */
  useEffect(() => {
    if (transitionType === "APPROVAL") {
      setValue(`transitions.${index}.triggerStrategy`, "APPROVER_ONLY");
    }
  }, [transitionType]);

  /* --------------------------------------------------
     2. Non-approval cannot be APPROVER_ONLY
  -------------------------------------------------- */
  useEffect(() => {
    if (transitionType !== "APPROVAL" && triggerStrategy === "APPROVER_ONLY") {
      setValue(`transitions.${index}.triggerStrategy`, "ANY_ALLOWED");
    }
  }, [transitionType, triggerStrategy]);

  /* --------------------------------------------------
     3. REVIEW → self loop
  -------------------------------------------------- */
  useEffect(() => {
    if (transitionType === "REVIEW" && fromStageId) {
      setValue(`transitions.${index}.toStageId`, fromStageId);
    }
  }, [transitionType, fromStageId]);

  /* --------------------------------------------------
     4. SEND_BACK → cannot go to same stage
  -------------------------------------------------- */
  useEffect(() => {
    if (transitionType !== "SEND_BACK") return;
    if (!fromStageId || !toStageId) return;

    if (String(fromStageId) === String(toStageId)) {
      setValue(`transitions.${index}.toStageId`, "");
    }
  }, [transitionType, fromStageId, toStageId]);

  /* --------------------------------------------------
     5. SEND_BACK → never SYSTEM_ONLY
  -------------------------------------------------- */
  useEffect(() => {
    if (transitionType === "SEND_BACK" && triggerStrategy === "SYSTEM_ONLY") {
      setValue(`transitions.${index}.triggerStrategy`, "ANY_ALLOWED");
    }
  }, [transitionType, triggerStrategy]);

  /* --------------------------------------------------
     6. APPROVAL defaults
  -------------------------------------------------- */
  useEffect(() => {
    if (transitionType === "APPROVAL" && !approvalConfig) {
      setValue(`transitions.${index}.approvalStrategy`, "ALL");
      setValue(`transitions.${index}.approvalConfig`, {
        mode: "PARALLEL",
        levels: [{ order: 1, roleIds: [], userIds: [] }],
      });
    }
  }, [transitionType, approvalConfig]);

  /* --------------------------------------------------
     7. Remove approval when not APPROVAL
  -------------------------------------------------- */
  useEffect(() => {
    if (transitionType !== "APPROVAL") {
      setValue(`transitions.${index}.approvalStrategy`, undefined);
      setValue(`transitions.${index}.approvalConfig`, undefined);
    }
  }, [transitionType]);
}
