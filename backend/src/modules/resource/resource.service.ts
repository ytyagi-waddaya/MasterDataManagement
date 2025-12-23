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
  CreateResourceInput,
  createResourceSchema,
  ResourceFilterInput,
  resourceFilterSchema,
  ResourceId,
  ResourceIds,
  resourceIdSchema,
  resourceIdsSchema,
  UpdateResourceInput,
  updateResourceSchema,
} from "./dto/resource.dto.js";
import resourcesRepository from "./resource.repository.js";
import { generateKey } from "../../common/utils/generate-key.js";
import { prisma } from "../../lib/prisma.js";
import { OutboxService } from "../../outbox/outbox.service.js";
import { safe } from "../../common/utils/sanitize.js";

const actionsService = {
  // createResource: async (data: CreateResourceInput, meta?: ActorMeta) => {
  //   const validatedData = createResourceSchema.parse(data);
  //   const key = generateKey(validatedData.name);
  //   const existing = await resourcesRepository.findByNameAndTenant(
  //     validatedData.name
  //   );
  //   if (existing) {
  //     throw new BadRequestException(
  //       `Resource "${validatedData.name}" already exists.`
  //     );
  //   }

  //   const toCreate: Prisma.ResourceCreateInput = {
  //     name: validatedData.name,
  //     key,
  //     description: validatedData.description ?? null,
  //     isActive: validatedData.isActive ?? true,
  //     isSystem: validatedData.isSystem ?? false,
  //     ...(validatedData.moduleId && {
  //       module: { connect: { id: validatedData.moduleId } },
  //     }),
  //   };

  //   try {
  //     const resource = await resourcesRepository.create(toCreate);

  //     await createAuditLog({
  //       userId: meta?.actorId ?? null,
  //       entity: AuditEntity.RESOURCE,
  //       action: AuditAction.CREATE,
  //       comment: "Resource created",
  //       after: resource,
  //       ipAddress: meta?.ipAddress ?? null,
  //       userAgent: meta?.userAgent ?? null,
  //       performedBy: meta?.performedBy ?? PerformedByType.USER,
  //     });
  //     return resource;
  //   } catch (err: unknown) {
  //     if ((err as any)?.code === "P2002") {
  //       const target = ((err as any).meta as any)?.target ?? [];
  //       if (target.includes("key")) {
  //         throw new BadRequestException(`Module key "${key}" already exists.`);
  //       }
  //       if (target.includes("name")) {
  //         throw new BadRequestException(`Module name already exists.`);
  //       }
  //     }
  //     throw err;
  //   }
  // },

  //   createResource: async (data: CreateResourceInput, meta?: ActorMeta) => {
  //   const validatedData = createResourceSchema.parse(data);
  //   const key = generateKey(validatedData.name);

  //   // Check duplicate resource
  //   const existing = await resourcesRepository.findByNameAndTenant(
  //     validatedData.name
  //   );
  //   if (existing) {
  //     throw new BadRequestException(
  //       `Resource "${validatedData.name}" already exists.`
  //     );
  //   }

  //   try {
  //     const resource = await prisma.$transaction(async (tx) => {
  //       // ⭐ 1. Create MasterObject for this Resource
  //       const masterObject = await tx.masterObject.create({
  //         data: {
  //           name: validatedData.name,
  //           key,         // same key as resource
  //           fields: {},  // empty schema, to be designed later
  //         },
  //       });

  //       // ⭐ 2. Create Resource and connect to MasterObject
  //       const toCreate: Prisma.ResourceCreateInput = {
  //         name: validatedData.name,
  //         key,
  //         description: validatedData.description ?? null,
  //         isActive: validatedData.isActive ?? true,
  //         isSystem: validatedData.isSystem ?? false,

  //         ...(validatedData.moduleId && {
  //           module: { connect: { id: validatedData.moduleId } },
  //         }),

  //         masterObject: {
  //           connect: { id: masterObject.id },
  //         },
  //       };

  //       const createdResource = await tx.resource.create({ data: toCreate });

  //       // ⭐ 3. Audit Log
  //       await tx.auditLog.create({
  //         data: {
  //           userId: meta?.actorId ?? null,
  //           entity: AuditEntity.RESOURCE,
  //           action: AuditAction.CREATE,
  //           comment: "Resource created",
  //           after: createdResource,
  //           ipAddress: meta?.ipAddress ?? null,
  //           userAgent: meta?.userAgent ?? null,
  //           performedBy: meta?.performedBy ?? PerformedByType.USER,
  //         },
  //       });

  //       return createdResource;
  //     });

  //     return resource;
  //   } catch (err: any) {
  //     // Handle unique constraint errors
  //     if (err?.code === "P2002") {
  //       const target = err?.meta?.target ?? [];
  //       if (target.includes("key")) {
  //         throw new BadRequestException(`Resource key "${key}" already exists.`);
  //       }
  //       if (target.includes("name")) {
  //         throw new BadRequestException("Resource name already exists.");
  //       }
  //     }
  //     throw err;
  //   }
  // },

  // createResource: async (data: CreateResourceInput, meta?: ActorMeta) => {
  //   const validatedData = createResourceSchema.parse(data);
  //   const key = generateKey(validatedData.name);

  //   // Check duplicate resource
  //   const existing = await resourcesRepository.findByNameAndTenant(
  //     validatedData.name
  //   );
  //   if (existing) {
  //     throw new BadRequestException(
  //       `Resource "${validatedData.name}" already exists.`
  //     );
  //   }

  //   try {
  //     const resource = await prisma.$transaction(async (tx) => {
  //       let masterObjectId: string | null = null;

  //       // ⭐ RULE:
  //       // Create MasterObject ONLY IF this is a business resource
  //       // (i.e., moduleId is present)
  //       if (validatedData.moduleId) {
  //         const masterObject = await tx.masterObject.create({
  //           data: {
  //             name: validatedData.name,
  //             key, // same resource key
  //             fields: {}, // empty schema; updated later in UI
  //           },
  //         });
  //         masterObjectId = masterObject.id;
  //       }

  //       // ⭐ Create the Resource
  //       const toCreate: Prisma.ResourceCreateInput = {
  //         name: validatedData.name,
  //         key,
  //         description: validatedData.description ?? null,
  //         isActive: validatedData.isActive ?? true,
  //         isSystem: validatedData.isSystem ?? false,

  //         ...(validatedData.moduleId && {
  //           module: { connect: { id: validatedData.moduleId } },
  //         }),

  //         ...(masterObjectId && {
  //           masterObject: { connect: { id: masterObjectId } },
  //         }),
  //       };

  //       const createdResource = await tx.resource.create({ data: toCreate });

  //       // ⭐ Audit Log
  //       await tx.auditLog.create({
  //         data: {
  //           userId: meta?.actorId ?? null,
  //           entity: AuditEntity.RESOURCE,
  //           action: AuditAction.CREATE,
  //           comment: "Resource created",
  //           after: createdResource,
  //           ipAddress: meta?.ipAddress ?? null,
  //           userAgent: meta?.userAgent ?? null,
  //           performedBy: meta?.performedBy ?? PerformedByType.USER,
  //         },
  //       });

  //       return createdResource;
  //     });

  //     return resource;
  //   } catch (err: any) {
  //     if (err?.code === "P2002") {
  //       const target = err?.meta?.target ?? [];
  //       if (target.includes("key")) {
  //         throw new BadRequestException(
  //           `Resource key "${key}" already exists.`
  //         );
  //       }
  //       if (target.includes("name")) {
  //         throw new BadRequestException("Resource name already exists.");
  //       }
  //     }
  //     throw err;
  //   }
  // },

  createResource: async (data: CreateResourceInput, meta?: ActorMeta) => {
  const validatedData = createResourceSchema.parse(data);
  const key = generateKey(validatedData.name);

  // Check duplicate resource
  const existing = await resourcesRepository.findByNameAndTenant(
    validatedData.name
  );

  if (existing) {
    throw new BadRequestException(
      `Resource "${validatedData.name}" already exists.`
    );
  }

  try {
    const resource = await prisma.$transaction(async (tx) => {
      let masterObjectId: string | null = null;

      // ⭐ Create MasterObject ONLY IF moduleId exists
      if (validatedData.moduleId) {
        const masterObject = await tx.masterObject.create({
          data: {
            name: validatedData.name,
            key,
          },
        });

        masterObjectId = masterObject.id;
      }

      // ⭐ Prepare ResourceCreateInput safely
      const toCreate: Prisma.ResourceCreateInput = {
        name: validatedData.name,
        key,
        description: validatedData.description ?? null,
        isActive: validatedData.isActive ?? true,
        isSystem: validatedData.isSystem ?? false,
      };

      // Add module only if provided
      if (validatedData.moduleId) {
        toCreate.module = { connect: { id: validatedData.moduleId } };
      }

      // Add masterObject only if created
      if (masterObjectId) {
        toCreate.masterObject = { connect: { id: masterObjectId } };
      }

      const createdResource = await tx.resource.create({
        data: toCreate,
      });

      // ⭐ Audit log
      await tx.auditLog.create({
        data: {
          userId: meta?.actorId ?? null,
          entity: AuditEntity.RESOURCE,
          action: AuditAction.CREATE,
          comment: "Resource created",
          after: createdResource,
          ipAddress: meta?.ipAddress ?? null,
          userAgent: meta?.userAgent ?? null,
          performedBy: meta?.performedBy ?? PerformedByType.USER,
        },
      });

      return createdResource;
    });

    return resource;
  } catch (err: any) {
    if (err?.code === "P2002") {
      const target = err?.meta?.target ?? [];
      if (target.includes("key")) {
        throw new BadRequestException(
          `Resource key "${key}" already exists.`
        );
      }
      if (target.includes("name")) {
        throw new BadRequestException("Resource name already exists.");
      }
    }
    throw err;
  }
},

  getResources: async (options?: Partial<ResourceFilterInput>) => {
    const filters = resourceFilterSchema.parse(options || {});

    return await resourcesRepository.read(filters);
  },

  getResourceById: async ({ resourceId }: ResourceId) => {
    const parsedResourceId = resourceIdSchema.parse({ resourceId });

    const resource = await resourcesRepository.getById(parsedResourceId);
    if (!resource) throw new NotFoundException("Resource not found.");

    return resource;
  },

  updateResourceById: async (
    id: ResourceId,
    data: UpdateResourceInput,
    meta?: ActorMeta
  ) => {
    const parsedId = resourceIdSchema.parse(id);
    const validatedData = updateResourceSchema.parse(data);

    const existing = await resourcesRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("Resource not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System resources cannot be modified.");
    }

    if (validatedData.name && validatedData.name !== existing.name) {
      const duplicate = await resourcesRepository.isDuplicateName(
        validatedData.name,
        parsedId.resourceId
      );
      if (duplicate)
        throw new BadRequestException("resource name already exists.");
    }

    let dataToUpdate: Prisma.ResourceUpdateInput = {};
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
      const mod = await tx.resource.update({
        where: { id: parsedId.resourceId },
        data: dataToUpdate,
      });

      await tx.auditLog.create({
        data: {
          userId: meta?.actorId ?? null,
          entity: AuditEntity.RESOURCE,
          action: AuditAction.UPDATE,
          comment: "Resource updated",
          before: existing,
          after: mod,
          ipAddress: meta?.ipAddress ?? null,
          userAgent: meta?.userAgent ?? null,
          performedBy: meta?.performedBy ?? PerformedByType.USER,
        },
      });

      await OutboxService.createOutboxEvent(tx, {
        entity: "resource",
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

  archiveResource: async ({ resourceId }: ResourceId, meta?: ActorMeta) => {
    const parsedId = resourceIdSchema.parse({ resourceId });

    const existing = await resourcesRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("Resource not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System resources cannot be archived.");
    }
    const archived = await resourcesRepository.archive(parsedId);
    if (!archived) throw new NotFoundException("Resource not found.");

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.RESOURCE,
      action: AuditAction.DEACTIVATE,
      comment: "Resource archived",
      before: existing,
      after: archived,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return archived;
  },

  restoreResource: async ({ resourceId }: ResourceId, meta?: ActorMeta) => {
    const parsedId = resourceIdSchema.parse({ resourceId });

    const existing = await resourcesRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("Resource not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System resources cannot be archived.");
    }
    const restored = await resourcesRepository.restore(parsedId);
    if (!restored) throw new NotFoundException("Resource not found.");

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.RESOURCE,
      action: AuditAction.RESTORE,
      comment: "Resource restored",
      before: existing,
      after: restored,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return restored;
  },

  deleteResource: async ({ resourceId }: ResourceId, meta?: ActorMeta) => {
    const parsedId = resourceIdSchema.parse({ resourceId });

    const existing = await resourcesRepository.readOne(parsedId);

    if (!existing) throw new NotFoundException("Resource not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System resource cannot be deleted.");
    }

    const deleted = await resourcesRepository.delete(parsedId);

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.RESOURCE,
      action: AuditAction.DELETE,
      comment: "Resource permanently deleted",
      before: existing,
      after: null,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return deleted;
  },

  archiveResources: async (ids: ResourceIds, meta?: ActorMeta) => {
    const { resourceIds } = resourceIdsSchema.parse(ids);

    const existingResponses = await resourcesRepository.findManyByIds(
      resourceIds
    );
    const activeResponses = existingResponses.filter((r) => !r.deletedAt);

    if (activeResponses.length === 0) {
      throw new BadRequestException(
        "No active resources found for the provided IDs."
      );
    }

    const nonSystemActive = activeResponses.filter((r) => !r.isSystem);
    if (nonSystemActive.length === 0) {
      throw new BadRequestException(
        "All selected resources are system resources and cannot be archived."
      );
    }

    const idsToArchive = nonSystemActive.map((r) => r.id);
    const result = await prisma.$transaction(async (tx) => {
      const updatedRecords = await Promise.all(
        idsToArchive.map(async (id) => {
          const updated = await tx.resource.update({
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
              entity: AuditEntity.RESOURCE,
              action: AuditAction.ARCHIVE,
              comment: "Resource archived",
              before: safe(existingResponses.find((r) => r.id === updated.id)),
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

  restoreResources: async (ids: ResourceIds, meta?: ActorMeta) => {
    const { resourceIds } = resourceIdsSchema.parse(ids);

    const existingResources = await resourcesRepository.findManyByIds(
      resourceIds
    );

    const inactiveResources = existingResources.filter((r) => r.deletedAt);
    if (inactiveResources.length === 0) {
      throw new BadRequestException(
        "No archived resources found for the provided IDs."
      );
    }

    const idsToRestore = inactiveResources.map((r) => r.id);

    const result = await prisma.$transaction(async (tx) => {
      const updatedRecords = await Promise.all(
        idsToRestore.map(async (id) => {
          const updated = await tx.resource.update({
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
              entity: AuditEntity.RESOURCE,
              action: AuditAction.RESTORE,
              comment: "Resource restored",
              before: safe(existingResources.find((r) => r.id === updated.id)),
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

  deleteResources: async (ids: ResourceIds, meta?: ActorMeta) => {
    const { resourceIds } = resourceIdsSchema.parse(ids);

    const existingResources = await resourcesRepository.findManyByIds(
      resourceIds
    );

    if (existingResources.length === 0) {
      throw new BadRequestException("No resources found for the provided IDs.");
    }

    const deletable = existingResources.filter((r) => !r.isSystem);
    const systemResources = existingResources.filter((r) => r.isSystem);

    if (deletable.length === 0) {
      throw new BadRequestException(
        "All selected resources are system resources and cannot be deleted."
      );
    }

    const idsToDelete = deletable.map((r) => r.id);
    const result = await prisma.$transaction(async (tx) => {
      const deletedRecords = await Promise.all(
        idsToDelete.map(async (id) => {
          const deleted = await tx.resource.delete({ where: { id } });
          return deleted;
        })
      );

      // audit logs
      await Promise.all(
        deletedRecords.map((d) =>
          tx.auditLog.create({
            data: {
              userId: meta?.actorId ?? null,
              entity: AuditEntity.RESOURCE,
              action: AuditAction.DELETE,
              comment: "Module permanently deleted",
              before: safe(existingResources.find((r) => r.id === d.id)),
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
        skippedSystemResources: systemResources.map((r) => r.name),
      };
    });

    return result;
  },
};

export default actionsService;
