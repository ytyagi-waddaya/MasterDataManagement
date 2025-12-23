import { Prisma } from "../../prisma/generated/client.js";
import { ForbiddenException } from "../utils/appError.js";

export async function enforceTransitionPermission(
  userId: string,
  transition: any,
  tx: Prisma.TransactionClient
) {
  if (
    transition.allowedUsers.length === 0 &&
    transition.allowedRoles.length === 0
  ) {
    return;
  }

  if (transition.allowedUsers.some((u: any) => u.userId === userId)) {
    return;
  }

  const userRoles = await tx.userRole.findMany({
    where: { userId },
    select: { roleId: true },
  });

  const roleIds = userRoles.map((r) => r.roleId);
  const allowedRoleIds = transition.allowedRoles.map((r: any) => r.roleId);

  if (!roleIds.some((r) => allowedRoleIds.includes(r))) {
    throw new ForbiddenException("Not allowed to perform this transition");
  }
}

export function evaluateCondition(condition: any, resourceId: string): boolean {
  // placeholder → plug rule engine later
  return true;
}

export async function moveToNextStage({
  tx,
  instance,
  transition,
  actorId,
  comment,
}: any) {
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
      performedById: actorId,
      actionType: "TRANSITION",
      actionLabel: transition.label ?? "transition",
      notes: comment ?? null,
    },
  });
}

export async function handleApprovalTransition({
  tx,
  instance,
  transition,
  input,
  actorId,
}: any) {
  if (!input.action)
    throw new ForbiddenException("Approval action required");

  return moveToNextStage({
    tx,
    instance,
    transition,
    actorId,
    comment: input.comment,
  });
}
