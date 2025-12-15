import {
  AuditAction,
  AuditEntity,
  PerformedByType,
  Prisma,
} from "../../../prisma/generated/client.js";
import { ActorMeta } from "../../types/action.types.js";
import permissionRepository from "./permission.repository.js";
import {
  updatePermissionSchema,
  updatePermissionConditionSchema,
  UpdatePermissionConditionInput,
  UpdatePermissionInput,
  permissionIdSchema,
  permissionIdsSchema,
  permissionFilterSchema,
  PermissionId,
  PermissionIds,
  PermissionFilterInput,
} from "./dto/permission.dto.js";
import { NotFoundException, BadRequestException } from "../../utils/appError.js";
import { createAuditLog } from "../../utils/auditLog.js";
import { prisma } from "../../lib/prisma.js";
import { ResourceId, resourceIdSchema } from "../resource/dto/resource.dto.js";
import { ActionId, actionIdSchema } from "../action/dto/action.dto.js";
import { generateKey } from "../../common/utils/generate-key.js";
import { OutboxService } from "../../outbox/outbox.service.js";
import { safe } from "../../common/utils/sanitize.js";
import resourcesRepository from "../resource/resource.repository.js";
import actionsRepository from "../action/action.repository.js";
import { RoleId, roleIdSchema } from "../role/dto/role.dto.js";
import roleRepository from "../role/role.repository.js";

const permissionService = {
generatePermissions: async () => {
  const [actions, resources] = await Promise.all([
    prisma.action.findMany({ where: { isActive: true } }),
    prisma.resource.findMany({ where: { isActive: true } }),
  ]);

  const existingPermissions = await prisma.permission.findMany({
    select: { key: true },
  });

  const existingKeys = new Set(existingPermissions.map((p) => p.key));

  const toCreate: Prisma.PermissionCreateManyInput[] = [];

  for (const action of actions) {
    for (const resource of resources) {
      const key = `${action.key}__${resource.key}`;

      if (existingKeys.has(key)) continue;

      // Generate concise description
      const actionName = action.name.trim();
      const resourceName = resource.name.trim();

      const description =
        resourceName.toLowerCase().startsWith(actionName.toLowerCase())
          ? `Permission to ${resourceName}.`
          : `Allows a user to ${actionName} ${resourceName}.`;

      toCreate.push({
        name: `${actionName} ${resourceName}`,
        key,
        category: resource.category ?? null,
        description: description,
        resourceId: resource.id,
        actionId: action.id,
        isSystem: true,
        isActive: true,
      });
    }
  }

  if (toCreate.length === 0) {
    return { created: 0 };
  }

  await prisma.$transaction(async (tx) => {
    await tx.permission.createMany({
      data: toCreate,
      skipDuplicates: true,
    });
  });

  return {
    created: toCreate.length,
  };
},


  getPermissions: async (options?: Partial<PermissionFilterInput>) => {
    const filters = permissionFilterSchema.parse(options ?? {});
    return permissionRepository.read(filters);
  },

  getPermissionById: async ({ permissionId }: PermissionId) => {
    const parsedId = permissionIdSchema.parse({ permissionId });
    const permission = await permissionRepository.permissionById(parsedId);
    if (!permission) throw new NotFoundException("Permission not found");
    return permission;
  },

  updatePermissionById: async (
    id: PermissionId,
    data: UpdatePermissionInput,
    meta?: ActorMeta
  ) => {
    const parsedId = permissionIdSchema.parse(id);
    const validatedData = updatePermissionSchema.parse(data);

    const existing = await permissionRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("Permission not found");

    if (existing.isSystem)
      throw new BadRequestException("System permissions cannot be modified.");

    if (validatedData.name && validatedData.name !== existing.name) {
      const duplicate = await permissionRepository.isDuplicateName(
        validatedData.name,
        parsedId.permissionId
      );

      if (duplicate)
        throw new BadRequestException("action name already exists.");
    }

    let dataToUpdate: Prisma.PermissionUpdateInput = {};
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
      const mod = await tx.permission.update({
        where: { id: parsedId.permissionId },
        data: dataToUpdate,
      });

      await tx.auditLog.create({
        data: {
          userId: meta?.actorId ?? null,
          entity: AuditEntity.PERMISSION,
          action: AuditAction.UPDATE,
          comment: "permission updated",
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

  updatePermissionCondition: async (
    id: PermissionId,
    input: UpdatePermissionConditionInput,
    meta?: ActorMeta
  ) => {
    const parsedId = permissionIdSchema.parse(id);
    const validated = updatePermissionConditionSchema.parse(input);

    const existing = await permissionRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("Permission not found");

    if (existing.isSystem)
      throw new BadRequestException("System permissions cannot be modified.");

    const updated = await prisma.$transaction(async (tx) => {
      const record = await tx.permission.update({
        where: { id: parsedId.permissionId },
        data: {
          conditions: validated.conditions ?? Prisma.JsonNull,
          expression: validated.expression ?? null,
        },
      });

      await tx.auditLog.create({
        data: {
          userId: meta?.actorId ?? null,
          entity: AuditEntity.PERMISSION,
          action: AuditAction.UPDATE,
          comment: "permission conditions updated",
          before: existing,
          after: record,
          ipAddress: meta?.ipAddress ?? null,
          userAgent: meta?.userAgent ?? null,
          performedBy: meta?.performedBy ?? PerformedByType.USER,
        },
      });

      return record;
    });

    return updated;
  },

  archivePermission: async (
    { permissionId }: PermissionId,
    meta?: ActorMeta
  ) => {
    const parsedId = permissionIdSchema.parse({ permissionId });
    const existing = await permissionRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("Permission not found");

    if (existing.isSystem)
      throw new BadRequestException("System permissions cannot be archived.");

    const archived = await permissionRepository.archive(parsedId);
    if (!archived) throw new NotFoundException("Permission not found.");

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.PERMISSION,
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

  restorePermission: async (
    { permissionId }: PermissionId,
    meta?: ActorMeta
  ) => {
    const parsedId = permissionIdSchema.parse({ permissionId });
    const existing = await permissionRepository.readOne(parsedId);

    if (!existing) throw new NotFoundException("Permission not found");
    if (existing.isSystem)
      throw new BadRequestException("System permissions cannot be archived.");

    const restored = await permissionRepository.restore(parsedId);
    if (!restored) throw new NotFoundException("Permission not found.");

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.PERMISSION,
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

  deletePermission: async (
    { permissionId }: PermissionId,
    meta?: ActorMeta
  ) => {
    const parsedId = permissionIdSchema.parse({ permissionId });
    const existing = await permissionRepository.readOne(parsedId);

    if (!existing) throw new NotFoundException("Permission not found");
    if (existing.isSystem)
      throw new BadRequestException("System permissions cannot be deleted.");

    const deleted = await permissionRepository.delete(parsedId);
    if (!deleted) throw new NotFoundException("Permission not found.");

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.PERMISSION,
      action: AuditAction.DELETE,
      before: existing,
      after: null,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return deleted;
  },

  archivePermissions: async (ids: PermissionIds, meta?: ActorMeta) => {
    const { permissionIds } = permissionIdsSchema.parse(ids);

    const existingPermissions = await permissionRepository.findManyByIds(
      permissionIds
    );
    const activePermissions = existingPermissions.filter((p) => !p.deletedAt);

    if (activePermissions.length === 0) {
      throw new BadRequestException(
        "No active permissions found for the provided IDs."
      );
    }

    const nonSystemActive = activePermissions.filter((p) => !p.isSystem);
    if (nonSystemActive.length === 0) {
      throw new BadRequestException(
        "All selected permissions are system permissions and cannot be archived."
      );
    }

    const idsToArchive = nonSystemActive.map((p) => p.id);
    const result = await prisma.$transaction(async (tx) => {
      const updatedRecords = await Promise.all(
        idsToArchive.map(async (id) => {
          const updated = await tx.permission.update({
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
              entity: AuditEntity.PERMISSION,
              action: AuditAction.ARCHIVE,
              comment: "Resource archived",
              before: safe(
                existingPermissions.find((p) => p.id === updated.id)
              ),
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

  restorePermissions: async (ids: PermissionIds, meta?: ActorMeta) => {
    const { permissionIds } = permissionIdsSchema.parse(ids);

    const existingPermissions = await permissionRepository.findManyByIds(
      permissionIds
    );
    const inactivePermissions = existingPermissions.filter((p) => p.deletedAt);

    if (inactivePermissions.length === 0) {
      throw new BadRequestException(
        "No active permissions found for the provided IDs."
      );
    }

    const idsToRestore = inactivePermissions.map((p) => p.id);

    const result = await prisma.$transaction(async (tx) => {
      const updatedRecords = await Promise.all(
        idsToRestore.map(async (id) => {
          const updated = await tx.permission.update({
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
              entity: AuditEntity.PERMISSION,
              action: AuditAction.RESTORE,
              comment: "Resource restored",
              before: safe(
                existingPermissions.find((p) => p.id === updated.id)
              ),
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

  deletePermissions: async (ids: PermissionIds, meta?: ActorMeta) => {
    const { permissionIds } = permissionIdsSchema.parse(ids);

    const existingPermissions = await permissionRepository.findManyByIds(
      permissionIds
    );

    if (existingPermissions.length === 0) {
      throw new BadRequestException(
        "No permissions found for the provided IDs."
      );
    }

    const deletable = existingPermissions.filter((p) => !p.isSystem);
    const systemPermissions = existingPermissions.filter((p) => p.isSystem);

    if (deletable.length === 0) {
      throw new BadRequestException(
        "All selected permissions are system permissions and cannot be deleted."
      );
    }

    const idsToDelete = deletable.map((a) => a.id);
    const result = await prisma.$transaction(async (tx) => {
      const deletedRecords = await Promise.all(
        idsToDelete.map(async (id) => {
          const deleted = await tx.permission.delete({ where: { id } });
          return deleted;
        })
      );

      await Promise.all(
        deletedRecords.map((d) =>
          tx.auditLog.create({
            data: {
              userId: meta?.actorId ?? null,
              entity: AuditEntity.PERMISSION,
              action: AuditAction.DELETE,
              comment: "Module permanently deleted",
              before: safe(existingPermissions.find((p) => p.id === d.id)),
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
        deleted: deletedRecords.map((p) => p.id),
        skippedSystemPermissions: systemPermissions.map((p) => p.name),
      };
    });

    return result;
  },

  assignPermissionsToRole: async ({
    roleId,
    permissionIds,
  }: {
    roleId: string;
    permissionIds: string[];
  }) => {
    await prisma.rolePermission.createMany({
      data: permissionIds.map((pid) => ({
        roleId,
        permissionId: pid,
      })),
      skipDuplicates: true,
    });

    return { assigned: permissionIds.length };
  },

  getPermissionsByRole: async ({ roleId }: RoleId) => {
    const parsedRoleId = roleIdSchema.parse({ roleId });

    const role = await roleRepository.readOne(parsedRoleId);
    if (!role) throw new NotFoundException("Role not found.");

    return role;
  },

  getPermissionsByResource: async ({ resourceId }: ResourceId) => {
    const parsedResourceId = resourceIdSchema.parse({ resourceId });

    const resource = await resourcesRepository.readOne(parsedResourceId);
    if (!resource) throw new NotFoundException("Resource not found.");

    return resource;
  },

  getPermissionsByAction: async ({ actionId }: ActionId) => {
   const parsedActionId = actionIdSchema.parse({ actionId });

    const action = await actionsRepository.readOne(parsedActionId);
    if (!action) throw new NotFoundException("Action not found.");

    return action;
  },
};

export default permissionService;
