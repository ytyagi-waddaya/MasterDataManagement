import {
  AuditAction,
  AuditEntity,
  PerformedByType,
  Prisma,
  SchemaStatus,
} from "../../../prisma/generated/client.js";
import { ActorMeta } from "../../types/action.types.js";
import { createAuditLog } from "../../utils/auditLog.js";
import {
  BadRequestException,
  NotFoundException,
} from "../../utils/appError.js";

import masterRecordRepository from "./masterRecord.repository.js";
import { prisma } from "../../lib/prisma.js";
import {
  MasterRecordFilterInput,
  masterRecordFilterSchema,
} from "./dto/masterRecord.dto.js";

const masterRecordService = {

  // createRecord: async (masterObjectId: string, data: any, meta?: ActorMeta) => {
  //   const userId = meta?.actorId;
  //   if (!userId) throw new BadRequestException("UserId is required");

  //   // STEP 1 → Find Resource for this MasterObject
  //   const resource = await prisma.resource.findFirst({
  //     where: { masterObjectId },
  //     include: { workflows: true },
  //   });

  //   // STEP 2 → Select Active Workflow (latest version)
  //   let workflowDef = null;
  //   if (resource?.workflows?.length) {
  //     workflowDef =
  //       resource.workflows
  //         .filter((w) => w.isActive)
  //         .sort((a, b) => b.version - a.version)[0] ?? null;
  //   }

  //   // STEP 3 → Find initial stage
  //   let initialStage = null;

  //   if (workflowDef) {
  //     initialStage = await prisma.workflowStage.findFirst({
  //       where: {
  //         workflowId: workflowDef.id,
  //         isInitial: true,
  //       },
  //     });
  //   }

  //   // STEP 4 → Create record
  //   try {
  //     const record = await prisma.$transaction(async (tx) => {
  //       const toCreate: Prisma.MasterRecordCreateInput = {
  //         masterObject: { connect: { id: masterObjectId } },
  //         data,
  //         createdBy: { connect: { id: userId } },
  //         isActive: data.isActive ?? true,
  //       };

  //       // Attach initial workflow stage ONLY IF a workflow exists
  //       if (initialStage) {
  //         toCreate.currentStage = { connect: { id: initialStage.id } };
  //       }

  //       const createdRecord = await tx.masterRecord.create({ data: toCreate });

  //       // Audit Log
  //       await tx.auditLog.create({
  //         data: {
  //           userId,
  //           entity: AuditEntity.MASTER_RECORD,
  //           action: AuditAction.CREATE,
  //           comment: "Record created",
  //           after: createdRecord,
  //           ipAddress: meta?.ipAddress ?? null,
  //           userAgent: meta?.userAgent ?? null,
  //           performedBy: meta?.performedBy ?? PerformedByType.USER,
  //         },
  //       });

  //       return createdRecord;
  //     });

  //     return record;
  //   } catch (err: any) {
  //     if (err?.code === "P2002")
  //       throw new BadRequestException("Record already exists for unique key.");

  //     throw err;
  //   }
  // },
  
  createRecord: async (masterObjectId: string, data: any, meta?: ActorMeta) => {
  const userId = meta?.actorId;
  if (!userId) throw new BadRequestException("UserId is required");

  // STEP 1 → Find active schema for this MasterObject
  const schema = await prisma.masterObjectSchema.findFirst({
    where: {
      masterObjectId,
      status:SchemaStatus.PUBLISHED
    },
    orderBy: { version: "desc" },
  });

  if (!schema) {
    throw new BadRequestException(
      "No published schema found for this MasterObject"
    );
  }

  // STEP 2 → Find Resource + Workflow
  const resource = await prisma.resource.findFirst({
    where: { masterObjectId },
    include: { workflows: true },
  });

  let workflowDef = null;
  if (resource?.workflows?.length) {
    workflowDef =
      resource.workflows
        .filter((w) => w.isActive)
        .sort((a, b) => b.version - a.version)[0] ?? null;
  }

  // STEP 3 → Find initial stage (if workflow exists)
  let initialStage = null;

  if (workflowDef) {
    initialStage = await prisma.workflowStage.findFirst({
      where: {
        workflowId: workflowDef.id,
        isInitial: true,
      },
    });
  }

  // STEP 4 → Create record (TRANSACTION)
  return prisma.$transaction(async (tx) => {
    const createdRecord = await tx.masterRecord.create({
      data: {
        masterObject: { connect: { id: masterObjectId } },

        // ✅ REQUIRED
        schema: { connect: { id: schema.id } },

        data,
        isActive: data.isActive ?? true,

        createdBy: { connect: { id: userId } },

        ...(initialStage && {
          currentStage: { connect: { id: initialStage.id } },
        }),
      },
    });

    // Audit log
    await tx.auditLog.create({
      data: {
        userId,
        entity: AuditEntity.MASTER_RECORD,
        action: AuditAction.CREATE,
        comment: "Record created",
        after: createdRecord,
        ipAddress: meta?.ipAddress ?? null,
        userAgent: meta?.userAgent ?? null,
        performedBy: meta?.performedBy ?? PerformedByType.USER,
      },
    });

    return createdRecord;
  });
},
  getRecords: async (options?: Partial<MasterRecordFilterInput>) => {
    const parsed = masterRecordFilterSchema.parse(options || {});

    return await masterRecordRepository.read(parsed);
  },

  getRecordById: async (recordId: string) => {
    const record = await masterRecordRepository.getById(recordId);
    if (!record) throw new NotFoundException("Resource not found.");

    return record;
  },

  archiveRecord: async (recordId: string, meta?: ActorMeta) => {
    const existing = await masterRecordRepository.readOne(recordId);
    if (!existing) throw new NotFoundException("Record not found.");

    const archived = await masterRecordRepository.archive(recordId);
    if (!archived) throw new NotFoundException("Record not found.");

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.MASTER_RECORD,
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

  restoreRecord: async (recordId: string, meta?: ActorMeta) => {
    const existing = await masterRecordRepository.readOne(recordId);
    if (!existing) throw new NotFoundException("Record not found.");

    const restored = await masterRecordRepository.restore(recordId);
    if (!restored) throw new NotFoundException("Record not found.");

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.MASTER_RECORD,
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

  deleteRecord: async (recordId: string, meta?: ActorMeta) => {
    const existing = await masterRecordRepository.readOne(recordId);

    if (!existing) throw new NotFoundException("Record not found.");

    const deleted = await masterRecordRepository.delete(recordId);

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.MASTER_RECORD,
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
};

export default masterRecordService;


  // createRecord: async (masterObjectId: string, data: any, meta?: ActorMeta) => {
  //   const userId = meta?.actorId;
  //   if (!userId) {
  //     throw new BadRequestException("UserId is required");
  //   }
  //   const initialStage = await prisma.workflowStage.findFirst({
  //     where: {
  //       workflow: { id: masterObjectId },
  //       isInitial: true,
  //     },
  //   });
  //   try {
  //     const record = await prisma.$transaction(async (tx) => {
  //       // ⭐ 2. Create Resource and connect to MasterObject
  //       const toCreate: Prisma.MasterRecordCreateInput = {
  //         masterObject: {
  //           connect: { id: masterObjectId },
  //         },
  //         data,
  //         currentStage: initialStage
  //           ? { connect: { id: initialStage.id } }
  //           : undefined,
  //         createdBy: {
  //           connect: { id: userId },
  //         },

  //         isActive: data.isActive ?? true,
  //       };

  //       const createdRecord = await tx.masterRecord.create({ data: toCreate });

  //       // ⭐ 3. Audit Log
  //       await tx.auditLog.create({
  //         data: {
  //           userId: meta?.actorId ?? null,
  //           entity: AuditEntity.MASTER_RECORD,
  //           action: AuditAction.CREATE,
  //           comment: "Record created",
  //           after: createdRecord,
  //           ipAddress: meta?.ipAddress ?? null,
  //           userAgent: meta?.userAgent ?? null,
  //           performedBy: meta?.performedBy ?? PerformedByType.USER,
  //         },
  //       });

  //       return createdRecord;
  //     });

  //     return record;
  //   } catch (err: any) {
  //     // Handle unique constraint errors
  //     if (err?.code === "P2002") {
  //       const target = err?.meta?.target ?? [];
  //       if (target.includes("name")) {
  //         throw new BadRequestException("Reecord name already exists.");
  //       }
  //     }
  //     throw err;
  //   }
  // },
