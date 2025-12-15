import {
  AuditAction,
  AuditEntity,
  PerformedByType,
  Prisma,
} from "../../../prisma/generated/client.js";
import { ActorMeta } from "../../types/action.types.js";
import { createAuditLog } from "../../utils/auditLog.js";
import {
  BadRequestException,
  NotFoundException,
} from "../../utils/appError.js";
import {
  CreateModuleInput,
  createModuleSchema,
  ModuleFilterInput,
  moduleFilterSchema,
  ModuleId,
  ModuleIds,
  moduleIdSchema,
  moduleIdsSchema,
  UpdateModuleInput,
  updateModuleSchema,
} from "./dto/module.dto.js";
import moduleRepository from "./module.repository.js";
import { generateKey } from "../../common/utils/generate-key.js";
import { prisma } from "../../lib/prisma.js";
import { safe } from "../../common/utils/sanitize.js";
import { OutboxService } from "../../outbox/outbox.service.js";
import logger from "../../utils/logger.js";

const moduleService = {
  createModule: async (data: CreateModuleInput, meta?: ActorMeta) => {
    const validatedData = createModuleSchema.parse(data);

    const key = generateKey(validatedData.name);

    const existingByName = await moduleRepository.findByNameAndTenant(
      validatedData.name
    );
    if (existingByName) {
      throw new BadRequestException(
        `Module "${validatedData.name}" already exists.`
      );
    }

    const existingByKey = await moduleRepository.findByKey(key);
    if (existingByKey) {
      throw new BadRequestException(`Module key "${key}" already exists.`);
    }

    const toCreate: Prisma.ModuleCreateInput = {
      name: validatedData.name,
      key,
      description: validatedData.description ?? null,
      isActive: validatedData.isActive ?? true,
      isSystem: validatedData.isSystem ?? false,
    };

    try {
      const module = await moduleRepository.create(toCreate);

      await createAuditLog({
        userId: meta?.actorId ?? null,
        entity: AuditEntity.MODULE,
        action: AuditAction.CREATE,
        comment: "Module created",
        before: null,
        after: module,
        ipAddress: meta?.ipAddress ?? null,
        userAgent: meta?.userAgent ?? null,
        performedBy: meta?.performedBy ?? PerformedByType.USER,
      });

      return module;
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

  getModules: async (options?: Partial<ModuleFilterInput>) => {
    const filters = moduleFilterSchema.parse(options || {});

    return await moduleRepository.read(filters);
  },

  getModuleById: async ({ moduleId }: ModuleId) => {
    const parsedId = moduleIdSchema.parse({ moduleId });

    const module = await moduleRepository.readOne(parsedId);

    if (!module) throw new NotFoundException("Module not found.");

    return module;
  },

  updateModuleById: async (
    id: ModuleId,
    data: UpdateModuleInput,
    meta?: ActorMeta
  ) => {
    const parsedId = moduleIdSchema.parse(id);
    const validatedData = updateModuleSchema.parse(data);

    const existing = await moduleRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("Module not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System modules cannot be modified.");
    }

    if (validatedData.name && validatedData.name !== existing.name) {
      const duplicate = await moduleRepository.isDuplicateName(
        validatedData.name,
        parsedId.moduleId
      );
      if (duplicate)
        throw new BadRequestException("module name already exists.");
    }

    let dataToUpdate: Prisma.ModuleUpdateInput = {};

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
      const mod = await tx.module.update({
        where: { id: parsedId.moduleId },
        data: dataToUpdate,
      });

      await tx.auditLog.create({
        data: {
          userId: meta?.actorId ?? null,
          entity: AuditEntity.MODULE,
          action: AuditAction.UPDATE,
          comment: "Module updated",
          before: existing,
          after: mod,
          ipAddress: meta?.ipAddress ?? null,
          userAgent: meta?.userAgent ?? null,
          performedBy: meta?.performedBy ?? PerformedByType.USER,
        },
      });
      logger.info("[RT] creating outbox event", {
        entity: "module",
        action: "updated",
        payload: {
          resource: "MODULE",
          moduleId: mod.id,
        },
      });

      await OutboxService.createOutboxEvent(tx, {
        entity: "module",
        action: "updated",
        payload: {
          moduleId: mod.id,
          name: mod.name,
          resource: "MODULE",
        },
        tenantId: null,
      });

      return mod;
    });

    return updated;
  },

  archiveModule: async ({ moduleId }: ModuleId, meta?: ActorMeta) => {
    const parsedId = moduleIdSchema.parse({ moduleId });

    const existing = await moduleRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("Module not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System modules cannot be archived.");
    }

    const archived = await moduleRepository.archive(parsedId);
    if (!archived) throw new NotFoundException("Module not found.");

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.MODULE,
      action: AuditAction.ARCHIVE,
      comment: "Module archived",
      before: existing,
      after: archived,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return archived;
  },

  restoreModule: async ({ moduleId }: ModuleId, meta?: ActorMeta) => {
    const parsedId = moduleIdSchema.parse({ moduleId });

    const existing = await moduleRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("Module not found.");

    const restored = await moduleRepository.restore(parsedId);
    if (!restored) throw new NotFoundException("Module not found.");

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.MODULE,
      action: AuditAction.RESTORE,
      comment: "Module restored",
      before: existing,
      after: restored,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return restored;
  },

  deleteModule: async ({ moduleId }: ModuleId, meta?: ActorMeta) => {
    const parsedId = moduleIdSchema.parse({ moduleId });

    const existing = await moduleRepository.readOne(parsedId);

    if (!existing) throw new NotFoundException("Module not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System module cannot be deleted.");
    }

    const deleted = await moduleRepository.delete(parsedId);

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.MODULE,
      action: AuditAction.DELETE,
      comment: "Module permanently deleted",
      before: existing,
      after: null,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return deleted;
  },

  archiveModules: async (ids: ModuleIds, meta?: ActorMeta) => {
    const { moduleIds } = moduleIdsSchema.parse(ids);

    const existingModules = await moduleRepository.findManyByIds(moduleIds);
    const activeModules = existingModules.filter((m) => !m.deletedAt);

    if (activeModules.length === 0) {
      throw new BadRequestException(
        "No active modules found for the provided IDs."
      );
    }

    const nonSystemActive = activeModules.filter((m) => !m.isSystem);
    if (nonSystemActive.length === 0) {
      throw new BadRequestException(
        "All selected modules are system modules and cannot be archived."
      );
    }

    const idsToArchive = nonSystemActive.map((m) => m.id);

    const result = await prisma.$transaction(async (tx) => {
      const updatedRecords = await Promise.all(
        idsToArchive.map(async (id) => {
          const updated = await tx.module.update({
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
              entity: AuditEntity.MODULE,
              action: AuditAction.ARCHIVE,
              comment: "Module archived",
              before: safe(existingModules.find((m) => m.id === updated.id)),
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
        archived: updatedRecords.map((r) => r.id),
      };
    });

    return result;
  },

  restoreModules: async (ids: ModuleIds, meta?: ActorMeta) => {
    const { moduleIds } = moduleIdsSchema.parse(ids);

    const existingModules = await moduleRepository.findManyByIds(moduleIds);
    const inactiveModules = existingModules.filter((m) => m.deletedAt);

    if (inactiveModules.length === 0) {
      throw new BadRequestException(
        "No archived modules found for the provided IDs."
      );
    }

    const idsToRestore = inactiveModules.map((m) => m.id);

    const result = await prisma.$transaction(async (tx) => {
      const updatedRecords = await Promise.all(
        idsToRestore.map(async (id) => {
          const updated = await tx.module.update({
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
              entity: AuditEntity.MODULE,
              action: AuditAction.RESTORE,
              comment: "Module restored",
              before: safe(existingModules.find((m) => m.id === updated.id)),
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
        restored: updatedRecords.map((r) => r.id),
      };
    });

    return result;
  },

  deleteModules: async (ids: ModuleIds, meta?: ActorMeta) => {
    const { moduleIds } = moduleIdsSchema.parse(ids);

    const existingModules = await moduleRepository.findManyByIds(moduleIds);

    if (existingModules.length === 0) {
      throw new BadRequestException("No modules found for the provided IDs.");
    }

    const deletable = existingModules.filter((m) => !m.isSystem);
    const systemModules = existingModules.filter((m) => m.isSystem);

    if (deletable.length === 0) {
      throw new BadRequestException(
        "All selected modules are system modules and cannot be deleted."
      );
    }

    const idsToDelete = deletable.map((m) => m.id);

    const result = await prisma.$transaction(async (tx) => {
      const deletedRecords = await Promise.all(
        idsToDelete.map(async (id) => {
          const deleted = await tx.module.delete({ where: { id } });
          return deleted;
        })
      );

      // audit logs
      await Promise.all(
        deletedRecords.map((d) =>
          tx.auditLog.create({
            data: {
              userId: meta?.actorId ?? null,
              entity: AuditEntity.MODULE,
              action: AuditAction.DELETE,
              comment: "Module permanently deleted",
              before: safe(existingModules.find((m) => m.id === d.id)),
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
        deleted: deletedRecords.map((r) => r.id),
        skippedSystemModules: systemModules.map((m) => m.name),
      };
    });

    return result;
  },
};

export default moduleService;
