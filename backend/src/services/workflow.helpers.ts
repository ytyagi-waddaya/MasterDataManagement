import {
  Prisma,
  ApprovalStatus,
  ApprovalStrategy,
  HistoryAction,
} from "../../prisma/generated/client.js";
import { ForbiddenException } from "../utils/appError.js";

/* ======================================================
   TYPES
====================================================== */

export type ActorMeta = {
  actorId: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  performedBy?: "USER" | "WORKER" | "SYSTEM";
};

/* ======================================================
   PERMISSION CHECK
====================================================== */

export async function enforceTransitionPermission(
  userId: string,
  instance: {
    createdById?: string | null;
  },
  transition: {
    triggerStrategy: string;
    allowedUsers: { userId: string }[];
    allowedRoles: { roleId: string }[];
  },
  tx: Prisma.TransactionClient
) {
  const strategy = transition.triggerStrategy;

  /* SYSTEM_ONLY */
  if (strategy === "SYSTEM_ONLY") {
    throw new ForbiddenException("System-only transition");
  }

  /* CREATOR_ONLY */
  if (strategy === "CREATOR_ONLY") {
    if (instance.createdById !== userId) {
      throw new ForbiddenException("Only creator can perform this transition");
    }
    return;
  }

  /* APPROVER_ONLY handled in approval flow */
  if (strategy === "APPROVER_ONLY") return;

  /* Explicit allow list */
  if (
    transition.allowedUsers.length === 0 &&
    transition.allowedRoles.length === 0
  ) {
    return;
  }

  if (transition.allowedUsers.some((u) => u.userId === userId)) {
    return;
  }

  const roles = await tx.userRole.findMany({
    where: { userId },
    select: { roleId: true },
  });

  const roleIds = roles.map((r) => r.roleId);

  if (!transition.allowedRoles.some((r) => roleIds.includes(r.roleId))) {
    throw new ForbiddenException("Transition not allowed");
  }
}


/* ======================================================
   APPROVAL STRATEGY RESOLVER
====================================================== */

export function resolveApprovalStrategy(
  strategy: ApprovalStrategy,
  approvals: { status: ApprovalStatus }[],
  expectedCount: number
): "APPROVED" | "REJECTED" | "PENDING" {
  const approved = approvals.filter(
    (a) => a.status === ApprovalStatus.APPROVED
  ).length;

  const rejected = approvals.filter(
    (a) => a.status === ApprovalStatus.REJECTED
  ).length;

  switch (strategy) {
    case "ALL":
      if (rejected > 0) return "REJECTED";
      if (approved === expectedCount) return "APPROVED";
      return "PENDING";

    case "ANY":
      if (approved > 0) return "APPROVED";
      if (rejected === expectedCount) return "REJECTED";
      return "PENDING";

    case "MAJORITY":
      if (approved > expectedCount / 2) return "APPROVED";
      if (rejected >= Math.ceil(expectedCount / 2)) return "REJECTED";
      return "PENDING";
  }
}

/* ======================================================
   APPROVAL LEVEL RESOLVER (SEQUENTIAL)
====================================================== */

export function getCurrentApprovalLevel(
  config: { levels: any[] },
  approvals: {
    levelOrder: number | null;
    status: ApprovalStatus;
  }[]
) {
  const levels = [...config.levels].sort((a, b) => a.order - b.order);

  for (const level of levels) {
    const levelApprovals = approvals.filter(
      (a) => a.levelOrder === level.order
    );

    // ❌ Any rejection at this level stops workflow
    const rejected = levelApprovals.some(
      (a) => a.status === ApprovalStatus.REJECTED
    );
    if (rejected) return null;

    const expected =
      (level.userIds?.length ?? 0) + (level.roleIds?.length ?? 0);

    // ⏳ Waiting for remaining approvals at this level
    if (levelApprovals.length < expected) {
      return level;
    }
  }

  // ✅ All levels approved
  return null;
}

/* ======================================================
   MOVE TO STAGE
====================================================== */

export async function moveToStage(
  tx: Prisma.TransactionClient,
  instance: {
    id: string;
    resourceId: string;
  },
  transition: {
    id: string;
    fromStageId: string;
    toStageId: string;
    label?: string | null;
  },
  meta: ActorMeta,
  comment?: string
) {
  await tx.workflowInstance.update({
    where: { id: instance.id },
    data: {
      currentStageId: transition.toStageId,
    },
  });

  await tx.masterRecord.update({
    where: { id: instance.resourceId },
    data: {
      currentStageId: transition.toStageId,
    },
  });

  await tx.workflowHistory.create({
    data: {
      workflowInstanceId: instance.id,
      fromStageId: transition.fromStageId,
      toStageId: transition.toStageId,
      workflowTransitionId: transition.id,
      actionType: HistoryAction.TRANSITION,
      actionLabel: transition.label ?? "Transition",
      performedById: meta.actorId,
      notes: comment ?? null,
    },
  });
}

