import {
  AuditAction,
  AuditEntity,
  PerformedByType,
  Prisma,
} from "../../../prisma/generated/client.js";
import { ActorMeta } from "../../types/action.types.js";
import actionsRepository from "./action.repository.js";
import { createAuditLog } from "../../utils/auditLog.js";

import { BadRequestException, NotFoundException } from "../../utils/appError.js";
import {
  CreateActionInput,
  UpdateActionInput,
  createActionSchema,
  updateActionSchema,
  actionIdSchema,
  actionIdsSchema,
  ActionId,
  ActionIds,
  ActionFilterInput,
  actionFilterSchema,
} from "./dto/action.dto.js";
import { generateKey } from "../../common/utils/generate-key.js";
import { OutboxService } from "../../outbox/outbox.service.js";
import { prisma } from "../../lib/prisma.js";
import { safe } from "../../common/utils/sanitize.js";

const actionsService = {
  createAction: async (data: CreateActionInput, meta?: ActorMeta) => {
    const validatedData = createActionSchema.parse(data);
    const key = generateKey(validatedData.name);
    const existing = await actionsRepository.findByNameAndTenant(
      validatedData.name
    );
    if (existing) {
      throw new BadRequestException(
        `Action "${validatedData.name}" already exists.`
      );
    }

    const toCreate: Prisma.ActionCreateInput = {
      name: validatedData.name,
      key,
      description: validatedData.description ?? null,
      isActive: validatedData.isActive ?? true,
      isSystem: validatedData.isSystem ?? false,
    };
    try {
      const action = await actionsRepository.create(toCreate);

      await createAuditLog({
        userId: meta?.actorId ?? null,
        entity: AuditEntity.ACTION,
        action: AuditAction.CREATE,
        comment: "Action created",
        after: action,
        ipAddress: meta?.ipAddress ?? null,
        userAgent: meta?.userAgent ?? null,
        performedBy: meta?.performedBy ?? PerformedByType.USER,
      });

      return action;
    } catch (err: unknown) {
      if ((err as any)?.code === "P2002") {
        const target = ((err as any).meta as any)?.target ?? [];
        if (target.includes("key")) {
          throw new BadRequestException(`Module key "${key}" already exists.`);
        }
        if (target.includes("name")) {
          throw new BadRequestException(`Module name already exists.`);
        }
      }
      throw err;
    }
  },

  //   createActionsBulk: async (data: CreateActionInput[], meta?: ActorMeta) => {
  //     if (!data?.length)
  //       throw new BadRequestException("No actions provided for bulk creation.");

  //     // Validate input
  //     const validatedData = data.map((d) => createActionSchema.parse(d));

  //     // Check for duplicates
  //     const names = validatedData.map((a) => a.name);
  //     const existing = await actionsRepository.findByNamesAndTenant(names);

  //     if (existing.length > 0) {
  //       const duplicates = existing.map((a) => a.name).join(", ");
  //       throw new BadRequestException(
  //         `Actions already exist with names: [${duplicates}]`
  //       );
  //     }

  //     // Bulk insert using createMany (faster, no full records)
  //     await actionsRepository.createMany(validatedData);

  //     // Return inserted names as minimal info
  //     return validatedData.map((a) => ({
  //       name: a.name,
  //     }));
  //   },

  getActions: async (options?: Partial<ActionFilterInput>) => {
    const filters = actionFilterSchema.parse(options || {});
    return await actionsRepository.read(filters);
  },

  getActionById: async ({ actionId }: ActionId) => {
    const parsedActionId = actionIdSchema.parse({ actionId });

    const action = await actionsRepository.readOne(parsedActionId);
    if (!action) throw new NotFoundException("Action not found.");

    return action;
  },

  updateActionById: async (
    id: ActionId,
    data: UpdateActionInput,
    meta?: ActorMeta
  ) => {
    const parsedId = actionIdSchema.parse(id);
    const validatedData = updateActionSchema.parse(data);

    const existing = await actionsRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("Action not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System actions cannot be modified.");
    }

    if (validatedData.name && validatedData.name !== existing.name) {
      const duplicate = await actionsRepository.isDuplicateName(
        validatedData.name,
        parsedId.actionId
      );

      if (duplicate)
        throw new BadRequestException("action name already exists.");
    }

    let dataToUpdate: Prisma.ActionUpdateInput = {};
    if (validatedData.name !== undefined) {
      dataToUpdate.name = { set: validatedData.name };
    }

    if (validatedData.description !== undefined) {
      dataToUpdate.description = { set: validatedData.description };
    }

    if (validatedData.isActive !== undefined) {
      dataToUpdate.isActive = { set: validatedData.isActive };
    }

    if (validatedData.name && validatedData.name !== existing.name) {
      const newKey = generateKey(validatedData.name);
      dataToUpdate.key = { set: newKey };
    }

    const updated = await prisma.$transaction(async (tx) => {
      const mod = await tx.action.update({
        where: { id: parsedId.actionId },
        data: dataToUpdate,
      });

      await tx.auditLog.create({
        data: {
          userId: meta?.actorId ?? null,
          entity: AuditEntity.ACTION,
          action: AuditAction.UPDATE,
          comment: "action updated",
          before: existing,
          after: mod,
          ipAddress: meta?.ipAddress ?? null,
          userAgent: meta?.userAgent ?? null,
          performedBy: meta?.performedBy ?? PerformedByType.USER,
        },
      });

      await OutboxService.createOutboxEvent(tx, {
        entity: "action",
        action: "updated",
        payload: {
          moduleId: mod.id,
          name: mod.name,
        },
      });

      return mod;
    });

    return updated;
  },

  archiveAction: async ({ actionId }: ActionId, meta?: ActorMeta) => {
    const parsedId = actionIdSchema.parse({ actionId });

    const existing = await actionsRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("Action not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System actions cannot be archived.");
    }

    const archived = await actionsRepository.archive(parsedId);
    if (!archived) throw new NotFoundException("Action not found.");

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.ACTION,
      action: AuditAction.ARCHIVE,
      comment: "Action archived",
      before: existing,
      after: archived,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return archived;
  },

  restoreAction: async ({ actionId }: ActionId, meta?: ActorMeta) => {
    const parsedId = actionIdSchema.parse({ actionId });

    const existing = await actionsRepository.readOne(parsedId);

    if (!existing) throw new NotFoundException("Action not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System actions cannot be archived.");
    }

    const restored = await actionsRepository.restore(parsedId);
    if (!restored) throw new NotFoundException("Action not found.");

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.ACTION,
      action: AuditAction.RESTORE,
      comment: "Action restored",
      before: existing,
      after: restored,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return restored;
  },

  deleteAction: async ({ actionId }: ActionId, meta?: ActorMeta) => {
    const parsedId = actionIdSchema.parse({ actionId });

    const existing = await actionsRepository.readOne(parsedId);

    if (!existing) throw new NotFoundException("Action not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System action cannot be deleted.");
    }
    const deleted = await actionsRepository.delete(parsedId);

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.ACTION,
      action: AuditAction.DELETE,
      comment: "Action permanently deleted",
      before: existing,
      after: null,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return deleted;
  },

  archiveActions: async (ids: ActionIds, meta?: ActorMeta) => {
    const { actionIds } = actionIdsSchema.parse(ids);

    const existingActions = await actionsRepository.findManyByIds(actionIds);
    const activeActions = existingActions.filter((a) => !a.deletedAt);

    if (activeActions.length === 0) {
      throw new BadRequestException(
        "No active actions found for the provided IDs."
      );
    }

    const nonSystemActive = activeActions.filter((a) => !a.isSystem);
    if (nonSystemActive.length === 0) {
      throw new BadRequestException(
        "All selected actions are system actions and cannot be archived."
      );
    }

    const idsToArchive = nonSystemActive.map((a) => a.id);
    const result = await prisma.$transaction(async (tx) => {
      const updatedRecords = await Promise.all(
        idsToArchive.map(async (id) => {
          const updated = await tx.action.update({
            where: { id },
            data: {
              isActive: false,
              deletedAt: new Date(),
            },
          });
          return updated;
        })
      );

      const timestamp = new Date();
      await Promise.all(
        updatedRecords.map((updated) =>
          tx.auditLog.create({
            data: {
              userId: meta?.actorId ?? null,
              entity: AuditEntity.ACTION,
              action: AuditAction.ARCHIVE,
              comment: "Resource archived",
              before: safe(existingActions.find((a) => a.id === updated.id)),
              after: safe({ ...updated }),
              ipAddress: meta?.ipAddress ?? null,
              userAgent: meta?.userAgent ?? null,
              performedBy: meta?.performedBy ?? PerformedByType.USER,
            },
          })
        )
      );
      return {
        count: updatedRecords.length,
        archived: updatedRecords.map((a) => a.id),
      };
    });

    return result;
  },

  restoreActions: async (ids: ActionIds, meta?: ActorMeta) => {
    const { actionIds } = actionIdsSchema.parse(ids);

    const existingActions = await actionsRepository.findManyByIds(actionIds);
    const inactiveActions = existingActions.filter((a) => a.deletedAt);

    if (inactiveActions.length === 0) {
      throw new BadRequestException(
        "No archived actions found for the provided IDs."
      );
    }

    const idsToRestore = inactiveActions.map((a) => a.id);

    const result = await prisma.$transaction(async (tx) => {
      const updatedRecords = await Promise.all(
        idsToRestore.map(async (id) => {
          const updated = await tx.action.update({
            where: { id },
            data: {
              isActive: true,
              deletedAt: null,
            },
          });
          return updated;
        })
      );

      await Promise.all(
        updatedRecords.map((updated) =>
          tx.auditLog.create({
            data: {
              userId: meta?.actorId ?? null,
              entity: AuditEntity.ACTION,
              action: AuditAction.RESTORE,
              comment: "Resource restored",
              before: safe(existingActions.find((a) => a.id === updated.id)),
              after: safe({ ...updated }),
              ipAddress: meta?.ipAddress ?? null,
              userAgent: meta?.userAgent ?? null,
              performedBy: meta?.performedBy ?? PerformedByType.USER,
            },
          })
        )
      );

      return {
        count: updatedRecords.length,
        restored: updatedRecords.map((a) => a.id),
      };
    });

    return result;
  },

  deleteActions: async (ids: ActionIds, meta?: ActorMeta) => {
    const { actionIds } = actionIdsSchema.parse(ids);

    const existingActions = await actionsRepository.findManyByIds(actionIds);

    if (existingActions.length === 0) {
      throw new BadRequestException("No actions found for the provided IDs.");
    }

    const deletable = existingActions.filter((a) => !a.isSystem);
    const systemActions = existingActions.filter((a) => a.isSystem);

    if (deletable.length === 0) {
      throw new BadRequestException(
        "All selected actions are system actions and cannot be deleted."
      );
    }

    const idsToDelete = deletable.map((a) => a.id);
    const result = await prisma.$transaction(async (tx) => {
      const deletedRecords = await Promise.all(
        idsToDelete.map(async (id) => {
          const deleted = await tx.action.delete({ where: { id } });
          return deleted;
        })
      );

      // audit logs
      await Promise.all(
        deletedRecords.map((d) =>
          tx.auditLog.create({
            data: {
              userId: meta?.actorId ?? null,
              entity: AuditEntity.ACTION,
              action: AuditAction.DELETE,
              comment: "Module permanently deleted",
              before: safe(existingActions.find((a) => a.id === d.id)),
              after: Prisma.JsonNull,
              ipAddress: meta?.ipAddress ?? null,
              userAgent: meta?.userAgent ?? null,
              performedBy: meta?.performedBy ?? PerformedByType.USER,
            },
          })
        )
      );

      return {
        count: deletedRecords.length,
        deleted: deletedRecords.map((a) => a.id),
        skippedSystemActions: systemActions.map((a) => a.name),
      };
    });

    return result;
  },
};

export default actionsService;
