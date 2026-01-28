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
  publishSchemaSchema,
  updateMasterObjectSchema,
} from "./dto/masterObject.dto.js";
import { prisma } from "../../lib/prisma.js";
import masterObjectRepository from "./masterobject.repository.js";
import { generateKey } from "../../common/utils/generate-key.js";
import {
  applyFieldDiff,
  publishSchemaWithDiff,
} from "../../runTimeEngine/fieldDiff.engine.js";
import crypto from "crypto";
const masterObjectService = {
  getMasterObjects: async (options?: Partial<masterObjectFilterInput>) => {
    const filters = masterObjectFilterSchema.parse(options || {});

    return await masterObjectRepository.read(filters);
  },

  getMasterObject: async ({ masterObjectId }: masterObjectId) => {
    const parsedId = masterObjectIdSchema.parse({ masterObjectId });

    const obj = await masterObjectRepository.findByIdObj(
      parsedId.masterObjectId,
    );

    if (!obj) {
      throw new NotFoundException("MasterObject not found");
    }

    return obj;
  },

  // updateMasterObject: async (
  //   { masterObjectId }: masterObjectId,
  //   data: unknown,
  //   meta?: ActorMeta,
  // ) => {
  //   const parsedId = masterObjectIdSchema.parse({ masterObjectId });
  //   const validatedData = updateMasterObjectSchema.parse(data);

  //   const existing = await masterObjectRepository.findById(
  //     parsedId.masterObjectId,
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
  //     validatedData.fieldConfig !== undefined

  //   if (!hasAnyChange) {
  //     throw new BadRequestException("No changes provided");
  //   }

  //   /* =====================================================
  //    🚨 INVARIANT GUARD (CRITICAL)
  // ===================================================== */

  //   if (validatedData.schema && !validatedData.fieldConfig) {
  //     throw new BadRequestException(
  //       "fieldConfig is required whenever schema is provided",
  //     );
  //   }

  //   if (validatedData.publish && !validatedData.schema) {
  //     throw new BadRequestException("Nothing to publish");
  //   }

  //   return prisma.$transaction(async (tx) => {
  //     /* =====================================================
  //      1️⃣ UPDATE MASTEROBJECT METADATA
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
  //      2️⃣ SCHEMA UPDATE (DRAFT / PUBLISH)
  //   ===================================================== */

  //     let newSchema: {
  //       id: string;
  //       version: number;
  //       status: string;
  //       publishedAt: Date | null;
  //     } | null = null;

  //     if (validatedData.schema) {
  //       if (
  //         !validatedData.schema.layout?.sections ||
  //         validatedData.schema.layout?.sections.length === 0
  //       ) {
  //         throw new BadRequestException(
  //           "Schema must contain at least one section",
  //         );
  //       }

  //       const recordCount = await tx.masterRecord.count({
  //         where: {
  //           masterObjectId: parsedId.masterObjectId,
  //           deletedAt: null,
  //         },
  //       });

  //       if (recordCount > 0 && !validatedData.publish) {
  //         throw new BadRequestException(
  //           "Schema changes must be published when records already exist",
  //         );
  //       }

  //       const publishedSchema = await tx.masterObjectSchema.findFirst({
  //         where: {
  //           masterObjectId: parsedId.masterObjectId,
  //           status: "PUBLISHED",
  //         },
  //       });

  //       if (publishedSchema && !validatedData.publish) {
  //         throw new BadRequestException(
  //           "Published schema cannot be modified without publishing a new version",
  //         );
  //       }

  //       if (validatedData.publish && !validatedData.fieldConfig) {
  //         throw new BadRequestException(
  //           "Both schema and fieldConfig are required when publishing",
  //         );
  //       }

  //       if (
  //         validatedData.publish &&
  //         validatedData.schema &&
  //         !validatedData.fieldConfig?.length
  //       ) {
  //         throw new BadRequestException(
  //           "Publishing requires at least one field definition",
  //         );
  //       }

  //       const schema = await publishSchemaWithDiff({
  //         tx,
  //         masterObjectId: parsedId.masterObjectId,
  //         layoutSchema: validatedData.schema.layout,
  //         fieldConfigs: validatedData.fieldConfig!,
  //         publish: false,
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
  //      3️⃣ AUDIT LOG
  //   ===================================================== */

  //     const schemaChanged = Boolean(newSchema);

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
  //         schemaUpdated: schemaChanged,
  //         schemaPublished: Boolean(validatedData.publish && schemaChanged),
  //       },
  //     });

  //     /* =====================================================
  //      4️⃣ RESPONSE
  //   ===================================================== */

  //     return {
  //       id: parsedId.masterObjectId,
  //       name: validatedData.name ?? existing.name,
  //       isActive: validatedData.isActive ?? existing.isActive,
  //       ...(newSchema ? { schema: newSchema } : {}),
  //     };
  //   });
  // },

  updateMasterObject: async (
    { masterObjectId }: masterObjectId,
    data: unknown,
    meta?: ActorMeta,
  ) => {
    const parsedId = masterObjectIdSchema.parse({ masterObjectId });
    const validatedData = updateMasterObjectSchema.parse(data);

    const existing = await masterObjectRepository.findById(
      parsedId.masterObjectId,
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
      validatedData.fieldConfig !== undefined;

    if (!hasAnyChange) {
      throw new BadRequestException("No changes provided");
    }

    if (validatedData.schema && !validatedData.fieldConfig) {
      throw new BadRequestException(
        "fieldConfig is required whenever schema is provided",
      );
    }

    if (validatedData.schema && !validatedData.fieldConfig?.length) {
      throw new BadRequestException("Draft must have at least one field");
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
       2️⃣ SAVE DRAFT SCHEMA (ALWAYS DRAFT)
    ===================================================== */

      let newSchema: {
        id: string;
        version: number;
        status: string;
        publishedAt: Date | null;
      } | null = null;

      if (validatedData.schema) {
        if (
          !validatedData.schema.layout?.sections ||
          validatedData.schema.layout.sections.length === 0
        ) {
          throw new BadRequestException(
            "Schema must contain at least one section",
          );
        }
        /* =====================================================
            ARCHIVE OLD DRAFTS (SINGLE DRAFT RULE)
          ===================================================== */
        const recordCount = await tx.masterRecord.count({
          where: {
            masterObjectId: parsedId.masterObjectId,
            deletedAt: null,
          },
        });

        if (recordCount > 0) {
          const published = await tx.masterObjectSchema.findFirst({
            where: {
              masterObjectId: parsedId.masterObjectId,
              status: "PUBLISHED",
            },
          });

          if (published) {
            throw new BadRequestException(
              "Records already exist. Create a new schema version by duplicating the published schema.",
            );
          }
        }

        await tx.masterObjectSchema.updateMany({
          where: {
            masterObjectId: parsedId.masterObjectId,
            status: "DRAFT",
          },
          data: {
            status: "ARCHIVED",
          },
        });

        const schema = await publishSchemaWithDiff({
          tx,
          masterObjectId: parsedId.masterObjectId,
          layoutSchema: validatedData.schema.layout,
          fieldConfigs: validatedData.fieldConfig!,
          publish: false, // 👈 DRAFT ONLY
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

      await createAuditLog({
        userId: meta?.actorId ?? null,
        entity: AuditEntity.MASTER_OBJECT,
        action: AuditAction.UPDATE,
        comment: "Draft saved",
        performedBy: meta?.performedBy ?? PerformedByType.USER,
        ipAddress: meta?.ipAddress ?? null,
        userAgent: meta?.userAgent ?? null,
        before: existing,
        after: {
          name: validatedData.name ?? existing.name,
          isActive: validatedData.isActive ?? existing.isActive,
          draftUpdated: Boolean(newSchema),
        },
      });

      /* =====================================================
       4️⃣ RESPONSE
    ===================================================== */

      return {
        id: parsedId.masterObjectId,
        name: validatedData.name ?? existing.name,
        isActive: validatedData.isActive ?? existing.isActive,
        ...(newSchema ? { schema: newSchema } : {}),
      };
    });
  },

  publishSchema: async (
  { masterObjectId }: masterObjectId,
  data: unknown,
  meta?: ActorMeta,
) => {
  const parsedId = masterObjectIdSchema.parse({ masterObjectId });
  const { draftSchemaId } = publishSchemaSchema.parse(data);

  return prisma.$transaction(async (tx) => {
    /* =====================================================
       1️⃣ LOAD DRAFT BY ID (SOURCE OF TRUTH)
    ===================================================== */
    const draft = await tx.masterObjectSchema.findUnique({
      where: {
        id: draftSchemaId,
        masterObjectId: parsedId.masterObjectId,
        status: "DRAFT",
      },
    });

    if (!draft) {
      throw new BadRequestException("Draft not found or already published");
    }

    /* =====================================================
       2️⃣ ENSURE IT IS LATEST VERSION
    ===================================================== */
    const maxVersion = await tx.masterObjectSchema.aggregate({
      where: { masterObjectId: parsedId.masterObjectId },
      _max: { version: true },
    });

    if (draft.version !== maxVersion._max.version) {
      throw new BadRequestException("Only latest draft can be published");
    }

    /* =====================================================
       3️⃣ ARCHIVE OLD PUBLISHED
    ===================================================== */
    await tx.masterObjectSchema.updateMany({
      where: {
        masterObjectId: parsedId.masterObjectId,
        status: "PUBLISHED",
      },
      data: { status: "ARCHIVED" },
    });

    /* =====================================================
       4️⃣ PROMOTE DRAFT → PUBLISHED
    ===================================================== */
    const published = await tx.masterObjectSchema.update({
      where: { id: draft.id },
      data: {
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });

    /* =====================================================
       5️⃣ APPLY FIELD DIFF (FROM PREVIOUS PUBLISHED)
    ===================================================== */
    // await applyFieldDiff({
    //   tx,
    //   masterObjectId: parsedId.masterObjectId,
    //   previousSchemaId: null, // resolved internally if needed
    //   newSchemaId: published.id,
    //   schemaJson: await tx.fieldDefinition.findMany({
    //     where: { schemaId: draft.id },
    //   }),
    //   publish: true,
    // });

    /* =====================================================
       6️⃣ AUDIT LOG
    ===================================================== */
    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.MASTER_OBJECT,
      action: AuditAction.PUBLISH,
      comment: "Schema published",
      performedBy: meta?.performedBy ?? PerformedByType.USER,
      ipAddress: meta?.ipAddress ?? null,
      userAgent: meta?.userAgent ?? null,
      before: { draftSchemaId },
      after: { publishedSchemaId: published.id },
    });

    return {
      id: published.id,
      version: published.version,
      status: published.status,
      publishedAt: published.publishedAt,
    };
  });
},

  // publishSchema: async (
  //   { masterObjectId }: masterObjectId,
  //   data: unknown,
  //   meta?: ActorMeta,
  // ) => {
  //   const parsedId = masterObjectIdSchema.parse({ masterObjectId });
  //   const validatedData = publishSchemaSchema.parse(data);

  //   return prisma.$transaction(async (tx) => {
  //     /* =====================================================
  //      1️⃣ ENSURE DRAFT EXISTS
  //   ===================================================== */
  //     const draftChecksum = crypto
  //       .createHash("sha256")
  //       .update(
  //         JSON.stringify({
  //           layout: validatedData.schema.layout,
  //           fieldConfigs: validatedData.fieldConfig,
  //         }),
  //       )
  //       .digest("hex");
  //     const latestDraft = await tx.masterObjectSchema.findFirst({
  //       where: {
  //         masterObjectId: parsedId.masterObjectId,
  //         status: "DRAFT",
  //       },
  //       orderBy: { version: "desc" },
  //     });

  //     if (!latestDraft) {
  //       throw new BadRequestException("No draft schema to publish");
  //     }

  //     const maxVersion = await tx.masterObjectSchema.aggregate({
  //       where: { masterObjectId: parsedId.masterObjectId },
  //       _max: { version: true },
  //     });

  //     if (latestDraft.version !== maxVersion._max.version) {
  //       throw new BadRequestException("Only latest draft can be published");
  //     }

  //     if (latestDraft.checksum !== draftChecksum) {
  //       throw new BadRequestException(
  //         "Draft is outdated. Please save draft before publishing.",
  //       );
  //     }

  //     /* =====================================================
  //      2️⃣ PUBLISH NEW VERSION
  //   ===================================================== */
  //     await tx.masterObjectSchema.updateMany({
  //       where: {
  //         masterObjectId: parsedId.masterObjectId,
  //         status: "DRAFT",
  //         id: { not: latestDraft.id },
  //       },
  //       data: { status: "ARCHIVED" },
  //     });

  //     const schema = await publishSchemaWithDiff({
  //       tx,
  //       masterObjectId: parsedId.masterObjectId,
  //       layoutSchema: validatedData.schema.layout,
  //       fieldConfigs: validatedData.fieldConfig,
  //       publish: true, // 👈 ONLY HERE
  //       createdById: meta?.actorId ?? null,
  //     });

  //     /* =====================================================
  //      3️⃣ AUDIT LOG
  //   ===================================================== */

  //     await createAuditLog({
  //       userId: meta?.actorId ?? null,
  //       entity: AuditEntity.MASTER_OBJECT,
  //       action: AuditAction.PUBLISH,
  //       comment: "Schema published",
  //       performedBy: meta?.performedBy ?? PerformedByType.USER,
  //       ipAddress: meta?.ipAddress ?? null,
  //       userAgent: meta?.userAgent ?? null,
  //       before: { draftSchemaId: latestDraft.id },
  //       after: { publishedSchemaId: schema.id },
  //     });

  //     return {
  //       id: schema.id,
  //       version: schema.version,
  //       status: schema.status,
  //       publishedAt: schema.publishedAt,
  //     };
  //   });
  // },

  // archivemasterObject: async (
  //   { masterObjectId }: masterObjectId,
  //   meta?: ActorMeta,
  // ) => {
  //   const parsedId = masterObjectIdSchema.parse({ masterObjectId });

  //   const existing = await masterObjectRepository.readOne(parsedId);
  //   if (!existing) throw new NotFoundException("masterObject not found.");

  //   if (existing.isSystem) {
  //     throw new BadRequestException("System masterObjects cannot be archived.");
  //   }
  //   const archived = await masterObjectRepository.archive(parsedId);
  //   if (!archived) throw new NotFoundException("masterObject not found.");

  //   await createAuditLog({
  //     userId: meta?.actorId ?? null,
  //     entity: AuditEntity.RESOURCE,
  //     action: AuditAction.DEACTIVATE,
  //     comment: "masterObject archived",
  //     before: existing,
  //     after: archived,
  //     ipAddress: meta?.ipAddress ?? null,
  //     userAgent: meta?.userAgent ?? null,
  //     performedBy: meta?.performedBy ?? PerformedByType.USER,
  //   });

  //   return archived;
  // },
  archivemasterObject: async (
    { masterObjectId }: masterObjectId,
    meta?: ActorMeta,
  ) => {
    const parsedId = masterObjectIdSchema.parse({ masterObjectId });

    const existing = await masterObjectRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("masterObject not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System masterObjects cannot be archived.");
    }

    return prisma.$transaction(async (tx) => {
      const archived = await tx.masterObject.update({
        where: { id: parsedId.masterObjectId },
        data: {
          deletedAt: new Date(),
          isActive: false,
        },
      });

      // 🔒 archive all schemas
      await tx.masterObjectSchema.updateMany({
        where: { masterObjectId: parsedId.masterObjectId },
        data: { status: "ARCHIVED" },
      });

      // 🔒 deactivate records
      await tx.masterRecord.updateMany({
        where: { masterObjectId: parsedId.masterObjectId },
        data: { isActive: false },
      });

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
    });
  },

  // restoremasterObject: async (
  //   { masterObjectId }: masterObjectId,
  //   meta?: ActorMeta,
  // ) => {
  //   const parsedId = masterObjectIdSchema.parse({ masterObjectId });

  //   const existing = await masterObjectRepository.readOne(parsedId);
  //   if (!existing) throw new NotFoundException("masterObject not found.");

  //   if (existing.isSystem) {
  //     throw new BadRequestException("System masterObjects cannot be archived.");
  //   }
  //   const restored = await masterObjectRepository.restore(parsedId);
  //   if (!restored) throw new NotFoundException("masterObject not found.");

  //   await createAuditLog({
  //     userId: meta?.actorId ?? null,
  //     entity: AuditEntity.RESOURCE,
  //     action: AuditAction.RESTORE,
  //     comment: "masterObject restored",
  //     before: existing,
  //     after: restored,
  //     ipAddress: meta?.ipAddress ?? null,
  //     userAgent: meta?.userAgent ?? null,
  //     performedBy: meta?.performedBy ?? PerformedByType.USER,
  //   });

  //   return restored;
  // },
  restoremasterObject: async (
    { masterObjectId }: masterObjectId,
    meta?: ActorMeta,
  ) => {
    const parsedId = masterObjectIdSchema.parse({ masterObjectId });

    const existing = await masterObjectRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("masterObject not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System masterObjects cannot be restored.");
    }

    return prisma.$transaction(async (tx) => {
      /* =====================================================
     1️⃣ RESTORE MASTER OBJECT
    ===================================================== */

      const restored = await tx.masterObject.update({
        where: { id: parsedId.masterObjectId },
        data: {
          deletedAt: null,
          isActive: true,
        },
      });

      /* =====================================================
     2️⃣ FIND LAST VALID PUBLISHED SCHEMA (HISTORICAL)
    ===================================================== */

      const lastPublished = await tx.masterObjectSchema.findFirst({
        where: {
          masterObjectId: parsedId.masterObjectId,
          publishedAt: { not: null }, // ✅ correct
        },
        orderBy: { publishedAt: "desc" },
      });

      if (!lastPublished) {
        throw new BadRequestException("No published schema exists to restore");
      }

      /* =====================================================
     3️⃣ ARCHIVE ANY CURRENTLY PUBLISHED SCHEMAS
    ===================================================== */

      await tx.masterObjectSchema.updateMany({
        where: {
          masterObjectId: parsedId.masterObjectId,
          status: "PUBLISHED",
        },
        data: { status: "ARCHIVED" },
      });

      /* =====================================================
     4️⃣ RE-PUBLISH LAST VALID SCHEMA
    ===================================================== */

      await tx.masterObjectSchema.update({
        where: { id: lastPublished.id },
        data: { status: "PUBLISHED" },
      });

      /* =====================================================
     5️⃣ RESTORE RECORDS
    ===================================================== */

      await tx.masterRecord.updateMany({
        where: {
          masterObjectId: parsedId.masterObjectId,
        },
        data: { isActive: true },
      });

      /* =====================================================
     6️⃣ AUDIT LOG
    ===================================================== */

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
    });
  },

  // deletemasterObject: async (
  //   { masterObjectId }: masterObjectId,
  //   meta?: ActorMeta,
  // ) => {
  //   const parsedId = masterObjectIdSchema.parse({ masterObjectId });

  //   const existing = await masterObjectRepository.readOne(parsedId);

  //   if (!existing) throw new NotFoundException("masterObject not found.");

  //   if (existing.isSystem) {
  //     throw new BadRequestException("System masterObject cannot be deleted.");
  //   }

  //   const deleted = await masterObjectRepository.delete(parsedId);

  //   await createAuditLog({
  //     userId: meta?.actorId ?? null,
  //     entity: AuditEntity.RESOURCE,
  //     action: AuditAction.DELETE,
  //     comment: "masterObject permanently deleted",
  //     before: existing,
  //     after: null,
  //     ipAddress: meta?.ipAddress ?? null,
  //     userAgent: meta?.userAgent ?? null,
  //     performedBy: meta?.performedBy ?? PerformedByType.USER,
  //   });

  //   return deleted;
  // },

  deletemasterObject: async (
    { masterObjectId }: masterObjectId,
    meta?: ActorMeta,
  ) => {
    const parsedId = masterObjectIdSchema.parse({ masterObjectId });

    const existing = await masterObjectRepository.readOne(parsedId);
    if (!existing) throw new NotFoundException("masterObject not found.");

    if (existing.isSystem) {
      throw new BadRequestException("System masterObject cannot be deleted.");
    }

    return prisma.$transaction(async (tx) => {
      await tx.fieldDefinition.deleteMany({
        where: { masterObjectId: parsedId.masterObjectId },
      });

      await tx.masterObjectSchema.deleteMany({
        where: { masterObjectId: parsedId.masterObjectId },
      });

      await tx.masterRecord.deleteMany({
        where: { masterObjectId: parsedId.masterObjectId },
      });

      const deleted = await tx.masterObject.delete({
        where: { id: parsedId.masterObjectId },
      });

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
    });
  },

  duplicateSchema: async (
    { masterObjectId }: { masterObjectId: string },
    meta?: ActorMeta,
  ) => {
    const parsed = masterObjectIdSchema.parse({ masterObjectId });

    return prisma.$transaction(async (tx) => {
      /* =====================================================
       1️⃣ GET SOURCE SCHEMA (LATEST)
    ===================================================== */

      const sourceSchema = await tx.masterObjectSchema.findFirst({
        where: { masterObjectId: parsed.masterObjectId, status: "PUBLISHED" },
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
          locked: false, // ✅ always unlock on duplicate
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
          }),
        )
        .digest("hex");
      const latestVersion = await tx.masterObjectSchema.aggregate({
        where: { masterObjectId: parsed.masterObjectId },
        _max: { version: true },
      });

      await tx.masterObjectSchema.updateMany({
        where: {
          masterObjectId: parsed.masterObjectId,
          status: "DRAFT",
        },
        data: { status: "ARCHIVED" },
      });

      const newSchema = await tx.masterObjectSchema.create({
        data: {
          masterObjectId: parsed.masterObjectId,
          version: (latestVersion._max.version ?? 0) + 1,
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
        previousSchemaId: null, // ✅ important
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
  } | null,
): boolean {
  if (!user?.roles) return false;

  return user.roles.includes("ADMIN") || user.roles.includes("SYSTEM_ADMIN");
}
