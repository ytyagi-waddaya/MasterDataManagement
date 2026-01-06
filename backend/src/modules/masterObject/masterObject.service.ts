import {
  AuditAction,
  AuditEntity,
  PerformedByType,
  Prisma,
} from "../../../prisma/generated/client.js";
import { ActorMeta } from "../../types/action.types.js";
import {
  BadRequestException,
  NotFoundException,
} from "../../utils/appError.js";
import { createAuditLog } from "../../utils/auditLog.js";
import {
  masterObjectFilterInput,
  masterObjectFilterSchema,
  masterObjectId,
  masterObjectIdSchema,
  updateMasterObjectSchema,
} from "./dto/masterObject.dto.js";
import { prisma } from "../../lib/prisma.js";
import masterObjectRepository from "./masterobject.repository.js";
import { generateKey } from "../../common/utils/generate-key.js";
import { applyFieldDiff, publishSchemaWithDiff } from "../../runTimeEngine/fieldDiff.engine.js";
import crypto from "crypto";
const masterObjectService = {
  getMasterObjects: async (options?: Partial<masterObjectFilterInput>) => {
    const filters = masterObjectFilterSchema.parse(options || {});

    return await masterObjectRepository.read(filters);
  },

  getMasterObject: async ({ masterObjectId }: masterObjectId) => {
    const parsedId = masterObjectIdSchema.parse({ masterObjectId });

    const obj = await masterObjectRepository.findByIdObj(
      parsedId.masterObjectId
    );

    if (!obj) {
      throw new NotFoundException("MasterObject not found");
    }

    return obj;
  },

  // updateMasterObject: async (
  //   { masterObjectId }: masterObjectId,
  //   data: unknown,
  //   meta?: ActorMeta
  // ) => {
  //   const parsedId = masterObjectIdSchema.parse({ masterObjectId });
  //   const validatedData = updateMasterObjectSchema.parse(data);

  //   const existing = await masterObjectRepository.findById(
  //     parsedId.masterObjectId
  //   );

  //   if (!existing) {
  //     throw new NotFoundException("MasterObject not found");
  //   }

  //   if (existing.isSystem) {
  //     throw new BadRequestException("System MasterObject cannot be modified.");
  //   }

  //   const hasAnyChange =
  //     validatedData.name !== undefined ||
  //     validatedData.isActive !== undefined ||
  //     validatedData.schema !== undefined ||
  //     validatedData.fieldConfig !== undefined ||
  //     validatedData.publish !== undefined;

  //   if (!hasAnyChange) {
  //     throw new BadRequestException("No changes provided");
  //   }

  //   return prisma.$transaction(async (tx) => {
  //     /* =====================================================
  //      1️⃣ UPDATE MASTEROBJECT METADATA (SAFE)
  //   ===================================================== */

  //     const updateData: Prisma.MasterObjectUpdateInput = {};

  //     if (validatedData.name !== undefined) {
  //       updateData.name = validatedData.name;
  //     }

  //     if (validatedData.isActive !== undefined) {
  //       updateData.isActive = validatedData.isActive;
  //     }

  //     if (Object.keys(updateData).length > 0) {
  //       await tx.masterObject.update({
  //         where: { id: parsedId.masterObjectId },
  //         data: updateData,
  //       });
  //     }

  //     /* =====================================================
  //      2️⃣ SCHEMA UPDATE (ONLY VIA DIFF ENGINE)
  //   ===================================================== */

  //     let newSchema: {
  //       id: string;
  //       version: number;
  //       status: string;
  //       publishedAt: Date | null;
  //     } | null = null;

  //     /* -------- PUBLISH GUARDS -------- */

  //     if (validatedData.publish && !validatedData.schema) {
  //       throw new BadRequestException(
  //         "Schema payload is required when publishing"
  //       );
  //     }

  //     if (validatedData.schema) {
  //       if (
  //         !validatedData.schema.sections ||
  //         validatedData.schema.sections.length === 0
  //       ) {
  //         throw new BadRequestException(
  //           "Schema must contain at least one section"
  //         );
  //       }

  //       // Prevent unsafe draft edits when records exist
  //       const recordCount = await tx.masterRecord.count({
  //         where: {
  //           masterObjectId: parsedId.masterObjectId,
  //           deletedAt: null,
  //         },
  //       });

  //       if (recordCount > 0 && !validatedData.publish) {
  //         throw new BadRequestException(
  //           "Schema changes must be published when records already exist"
  //         );
  //       }

  //       // Prevent editing published schema without version bump
  //       const publishedSchema = await tx.masterObjectSchema.findFirst({
  //         where: {
  //           masterObjectId: parsedId.masterObjectId,
  //           status: "PUBLISHED",
  //         },
  //       });

  //       if (publishedSchema && !validatedData.publish) {
  //         throw new BadRequestException(
  //           "Published schema cannot be modified without publishing a new version"
  //         );
  //       }

  //       // Create new schema version + apply diff
  //       const schema = await publishSchemaWithDiff({
  //         tx,
  //         masterObjectId: parsedId.masterObjectId,
  //         schemaJson: validatedData.schema,
  //         publish: Boolean(validatedData.publish),
  //         createdById: meta?.actorId ?? null,
  //       });

  //       newSchema = {
  //         id: schema.id,
  //         version: schema.version,
  //         status: schema.status,
  //         publishedAt: schema.publishedAt,
  //       };
  //     }

  //     /* =====================================================
  //      3️⃣ AUDIT LOG (SINGLE SOURCE OF TRUTH)
  //   ===================================================== */

  //     await createAuditLog({
  //       userId: meta?.actorId ?? null,
  //       entity: AuditEntity.MASTER_OBJECT,
  //       action: AuditAction.UPDATE,
  //       comment: "MasterObject updated",
  //       performedBy: meta?.performedBy ?? PerformedByType.USER,
  //       ipAddress: meta?.ipAddress ?? null,
  //       userAgent: meta?.userAgent ?? null,
  //       before: existing,
  //       after: {
  //         name: validatedData.name ?? existing.name,
  //         isActive: validatedData.isActive ?? existing.isActive,
  //         schemaUpdated: Boolean(validatedData.schema),
  //         schemaPublished: Boolean(validatedData.publish),
  //       },
  //     });

  //     /* =====================================================
  //      4️⃣ RETURN (FRONTEND FRIENDLY)
  //   ===================================================== */

  //     return {
  //       success: true,
  //       schema: newSchema,
  //     };
  //   });
  // },

  updateMasterObject: async (
    { masterObjectId }: masterObjectId,
    data: unknown,
    meta?: ActorMeta
  ) => {
    const parsedId = masterObjectIdSchema.parse({ masterObjectId });
    const validatedData = updateMasterObjectSchema.parse(data);

    const existing = await masterObjectRepository.findById(
      parsedId.masterObjectId
    );

    if (!existing) {
      throw new NotFoundException("MasterObject not found");
    }

    if (existing.isSystem) {
      throw new BadRequestException("System MasterObject cannot be modified.");
    }

    const hasAnyChange =
      validatedData.name !== undefined ||
      validatedData.isActive !== undefined ||
      validatedData.schema !== undefined ||
      validatedData.fieldConfig !== undefined ||
      validatedData.publish !== undefined;

    if (!hasAnyChange) {
      throw new BadRequestException("No changes provided");
    }

    /* =====================================================
     🚨 INVARIANT GUARD (CRITICAL)
  ===================================================== */

    if (validatedData.schema && !validatedData.fieldConfig) {
      throw new BadRequestException(
        "fieldConfig is required whenever schema is provided"
      );
    }

    return prisma.$transaction(async (tx) => {
      /* =====================================================
       1️⃣ UPDATE MASTEROBJECT METADATA
    ===================================================== */

      const updateData: Prisma.MasterObjectUpdateInput = {};

      if (validatedData.name !== undefined) {
        updateData.name = validatedData.name;
      }

      if (validatedData.isActive !== undefined) {
        updateData.isActive = validatedData.isActive;
      }

      if (Object.keys(updateData).length > 0) {
        await tx.masterObject.update({
          where: { id: parsedId.masterObjectId },
          data: updateData,
        });
      }

      /* =====================================================
       2️⃣ SCHEMA UPDATE (DRAFT / PUBLISH)
    ===================================================== */

      let newSchema: {
        id: string;
        version: number;
        status: string;
        publishedAt: Date | null;
      } | null = null;

      if (validatedData.publish && !validatedData.schema) {
        throw new BadRequestException(
          "Schema payload is required when publishing"
        );
      }

      if (validatedData.schema) {
        if (
          !validatedData.schema.layout?.sections ||
          validatedData.schema.layout?.sections.length === 0
        ) {
          throw new BadRequestException(
            "Schema must contain at least one section"
          );
        }

        const recordCount = await tx.masterRecord.count({
          where: {
            masterObjectId: parsedId.masterObjectId,
            deletedAt: null,
          },
        });

        if (recordCount > 0 && !validatedData.publish) {
          throw new BadRequestException(
            "Schema changes must be published when records already exist"
          );
        }

        const publishedSchema = await tx.masterObjectSchema.findFirst({
          where: {
            masterObjectId: parsedId.masterObjectId,
            status: "PUBLISHED",
          },
        });

        if (publishedSchema && !validatedData.publish) {
          throw new BadRequestException(
            "Published schema cannot be modified without publishing a new version"
          );
        }

        if (validatedData.publish && !validatedData.fieldConfig) {
          throw new BadRequestException(
            "Both schema and fieldConfig are required when publishing"
          );
        }

        const schema = await publishSchemaWithDiff({
          tx,
          masterObjectId: parsedId.masterObjectId,
          layoutSchema: validatedData.schema.layout,
          fieldConfigs: validatedData.fieldConfig!,
          publish: Boolean(validatedData.publish),
          createdById: meta?.actorId ?? null,
        });

        newSchema = {
          id: schema.id,
          version: schema.version,
          status: schema.status,
          publishedAt: schema.publishedAt,
        };
      }

      /* =====================================================
       3️⃣ AUDIT LOG
    ===================================================== */

      const schemaChanged = Boolean(newSchema);

      await createAuditLog({
        userId: meta?.actorId ?? null,
        entity: AuditEntity.MASTER_OBJECT,
        action: AuditAction.UPDATE,
        comment: "MasterObject updated",
        performedBy: meta?.performedBy ?? PerformedByType.USER,
        ipAddress: meta?.ipAddress ?? null,
        userAgent: meta?.userAgent ?? null,
        before: existing,
        after: {
          name: validatedData.name ?? existing.name,
          isActive: validatedData.isActive ?? existing.isActive,
          schemaUpdated: schemaChanged,
          schemaPublished: Boolean(validatedData.publish && schemaChanged),
        },
      });

      /* =====================================================
       4️⃣ RESPONSE
    ===================================================== */

      return {
        id: parsedId.masterObjectId,
        name: validatedData.name ?? existing.name,
        isActive: validatedData.isActive ?? existing.isActive,
        schema: newSchema,
      };
    });
  },

  archivemasterObject: async (
    { masterObjectId }: masterObjectId,
    meta?: ActorMeta
  ) => {
    const parsedId = masterObjectIdSchema.parse({ masterObjectId });

    const existing = await masterObjectRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("masterObject not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System masterObjects cannot be archived.");
    }
    const archived = await masterObjectRepository.archive(parsedId);
    if (!archived) throw new NotFoundException("masterObject not found.");

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.RESOURCE,
      action: AuditAction.DEACTIVATE,
      comment: "masterObject archived",
      before: existing,
      after: archived,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return archived;
  },

  restoremasterObject: async (
    { masterObjectId }: masterObjectId,
    meta?: ActorMeta
  ) => {
    const parsedId = masterObjectIdSchema.parse({ masterObjectId });

    const existing = await masterObjectRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("masterObject not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System masterObjects cannot be archived.");
    }
    const restored = await masterObjectRepository.restore(parsedId);
    if (!restored) throw new NotFoundException("masterObject not found.");

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.RESOURCE,
      action: AuditAction.RESTORE,
      comment: "masterObject restored",
      before: existing,
      after: restored,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return restored;
  },

  deletemasterObject: async (
    { masterObjectId }: masterObjectId,
    meta?: ActorMeta
  ) => {
    const parsedId = masterObjectIdSchema.parse({ masterObjectId });

    const existing = await masterObjectRepository.readOne(parsedId);

    if (!existing) throw new NotFoundException("masterObject not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System masterObject cannot be deleted.");
    }

    const deleted = await masterObjectRepository.delete(parsedId);

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.RESOURCE,
      action: AuditAction.DELETE,
      comment: "masterObject permanently deleted",
      before: existing,
      after: null,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return deleted;
  },

duplicateSchema: async (
  { masterObjectId }: { masterObjectId: string },
  meta?: ActorMeta
) => {
  const parsed = masterObjectIdSchema.parse({ masterObjectId });

  return prisma.$transaction(async (tx) => {
    /* =====================================================
       1️⃣ GET SOURCE SCHEMA (LATEST)
    ===================================================== */

    const sourceSchema = await tx.masterObjectSchema.findFirst({
      where: { masterObjectId: parsed.masterObjectId },
      orderBy: { version: "desc" },
      include: {
        fieldDefinitions: {
          where: { deletedAt: null },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!sourceSchema) {
      throw new BadRequestException("No schema available to duplicate");
    }

    /* =====================================================
       2️⃣ BUILD CANONICAL FIELD CONFIG (UNLOCKED)
    ===================================================== */

    const fieldConfigs = sourceSchema.fieldDefinitions.map((f) => ({
      meta: {
        key: f.key,
        label: f.label,
        category: f.category,
        system: f.isSystem,
        locked: false,              // ✅ always unlock on duplicate
        deprecated: false,
      },
      data: {
        type: f.dataType,
      },
      ui: (f.config as any)?.ui,
      validation: (f.config as any)?.validation,
      visibility: (f.config as any)?.visibility,
      permissions: (f.config as any)?.permissions,
      behavior: (f.config as any)?.behavior,
      integration: (f.config as any)?.integration,
    }));

    /* =====================================================
       3️⃣ CREATE NEW DRAFT SCHEMA
    ===================================================== */

    const checksum = crypto
      .createHash("sha256")
      .update(
        JSON.stringify({
          layout: sourceSchema.layout,
          fieldConfigs,
        })
      )
      .digest("hex");

    const newSchema = await tx.masterObjectSchema.create({
      data: {
        masterObjectId: parsed.masterObjectId,
        version: sourceSchema.version + 1,
        status: "DRAFT",
        layout: sourceSchema.layout as Prisma.InputJsonValue,
        checksum,
        createdById: meta?.actorId ?? null,
        publishedAt: null,
      },
    });

    /* =====================================================
       4️⃣ REBUILD FIELD DEFINITIONS (NO PREVIOUS)
    ===================================================== */

    await applyFieldDiff({
      tx,
      masterObjectId: parsed.masterObjectId,
      previousSchemaId: null,     // ✅ important
      newSchemaId: newSchema.id,
      schemaJson: fieldConfigs,
    });

    /* =====================================================
       5️⃣ AUDIT LOG
    ===================================================== */

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.MASTER_OBJECT,
      action: AuditAction.CREATE, // ✅ correct semantic
      comment: "Schema duplicated",
      performedBy: meta?.performedBy ?? PerformedByType.USER,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      before: { schemaId: sourceSchema.id },
      after: { schemaId: newSchema.id },
    });

    /* =====================================================
       6️⃣ RESPONSE
    ===================================================== */

    return {
      id: newSchema.id,
      version: newSchema.version,
      status: newSchema.status,
      publishedAt: newSchema.publishedAt,
    };
  });
},

};

export default masterObjectService;

// auth/capabilities.ts
export function canViewDraftSchema(
  user: {
    roles?: string[];
  } | null
): boolean {
  if (!user?.roles) return false;

  return user.roles.includes("ADMIN") || user.roles.includes("SYSTEM_ADMIN");
}
