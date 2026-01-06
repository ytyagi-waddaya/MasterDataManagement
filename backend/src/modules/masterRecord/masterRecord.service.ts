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
  // createRecord: async (
  //   masterObjectId: string,
  //   data: any,
  //   meta?: ActorMeta
  // ) => {
  //   const userId = meta?.actorId;
  //   if (!userId) throw new BadRequestException("UserId is required");

  //   /* ===============================
  //      1️⃣ Get published schema
  //   =============================== */
  //   const schema = await prisma.masterObjectSchema.findFirst({
  //     where: {
  //       masterObjectId,
  //       status: SchemaStatus.PUBLISHED,
  //     },
  //     orderBy: { version: "desc" },
  //   });

  //   if (!schema) {
  //     throw new BadRequestException(
  //       "No published schema found for this MasterObject"
  //     );
  //   }

  //   /* ===============================
  //      2️⃣ Get masterObject (for key)
  //   =============================== */
  //   const masterObject = await prisma.masterObject.findUnique({
  //     where: { id: masterObjectId },
  //     select: { key: true },
  //   });

  //   if (!masterObject) {
  //     throw new BadRequestException("MasterObject not found");
  //   }

  //   /* ===============================
  //      3️⃣ Get workflow + initial stage
  //   =============================== */
  //   const resource = await prisma.resource.findFirst({
  //     where: { masterObjectId },
  //     include: { workflows: true },
  //   });

  //   let initialStage = null;

  //   if (resource?.workflows?.length) {
  //     const workflow = resource.workflows
  //       .filter((w) => w.isActive)
  //       .sort((a, b) => b.version - a.version)[0];

  //     if (workflow) {
  //       initialStage = await prisma.workflowStage.findFirst({
  //         where: {
  //           workflowId: workflow.id,
  //           isInitial: true,
  //         },
  //       });
  //     }
  //   }

  //   /* ===============================
  //      4️⃣ TRANSACTION (SAFE CODE GEN)
  //   =============================== */
  //   return prisma.$transaction(async (tx) => {
  //     // 🔢 Increment counter atomically
  //     const counter = await tx.masterObjectCounter.upsert({
  //       where: { masterObjectId },
  //       update: { lastNumber: { increment: 1 } },
  //       create: { masterObjectId, lastNumber: 1 },
  //     });

  //     const recordNumber = counter.lastNumber;
  //     const recordCode = `${masterObject.key}-${String(recordNumber).padStart(
  //       6,
  //       "0"
  //     )}`;

  //     /* ===============================
  //        5️⃣ Create record
  //     =============================== */
  //     const createdRecord = await tx.masterRecord.create({
  //       data: {
  //         code: recordCode,

  //         masterObject: { connect: { id: masterObjectId } },
  //         schema: { connect: { id: schema.id } },

  //         data,
  //         isActive: data.isActive ?? true,

  //         createdBy: { connect: { id: userId } },

  //         ...(initialStage && {
  //           currentStage: { connect: { id: initialStage.id } },
  //         }),
  //       },
  //     });

  //     /* ===============================
  //        6️⃣ Audit log
  //     =============================== */
  //     await tx.auditLog.create({
  //       data: {
  //         userId,
  //         entity: AuditEntity.MASTER_RECORD,
  //         action: AuditAction.CREATE,
  //         comment: `Record created (${recordCode})`,
  //         after: createdRecord,
  //         ipAddress: meta?.ipAddress ?? null,
  //         userAgent: meta?.userAgent ?? null,
  //         performedBy: meta?.performedBy ?? PerformedByType.USER,
  //       },
  //     });

  //     return createdRecord;
  //   });
  // },

  createRecord: async (masterObjectId: string, data: any, meta?: ActorMeta) => {
    const userId = meta?.actorId;
    if (!userId) throw new BadRequestException("UserId is required");

    // 1️⃣ Fetch published schema
    const schema = await prisma.masterObjectSchema.findFirst({
      where: {
        masterObjectId,
        status: SchemaStatus.PUBLISHED,
      },
      orderBy: { version: "desc" },
    });

    if (!schema) {
      throw new BadRequestException(
        "No published schema found for this MasterObject"
      );
    }

    // 2️⃣ Fetch MasterObject (prefix required)
    const masterObject = await prisma.masterObject.findUnique({
      where: { id: masterObjectId },
      select: { codePrefix: true },
    });

    if (!masterObject?.codePrefix) {
      throw new BadRequestException(
        "Code prefix not configured for this MasterObject"
      );
    }

    // 3️⃣ TRANSACTION (CRITICAL)
    return prisma.$transaction(async (tx) => {
      // 🔒 Lock counter row
      const counter = await tx.masterObjectCounter.upsert({
        where: { masterObjectId },
        update: { lastNumber: { increment: 1 } },
        create: {
          masterObjectId,
          lastNumber: 1,
        },
      });

      const nextNumber = counter.lastNumber;

      // 🧠 Generate code → ITEM-000123
      const code = `${masterObject.codePrefix}-${String(nextNumber).padStart(
        6,
        "0"
      )}`;

      // 4️⃣ Create record
      const record = await tx.masterRecord.create({
        data: {
          code,
          masterObject: { connect: { id: masterObjectId } },
          schema: { connect: { id: schema.id } },
          data,
          createdBy: { connect: { id: userId } },
        },
      });

      // 5️⃣ Audit log
      await tx.auditLog.create({
        data: {
          userId,
          entity: AuditEntity.MASTER_RECORD,
          action: AuditAction.CREATE,
          comment: `Record created (${code})`,
          after: record,
          ipAddress: meta?.ipAddress ?? null,
          userAgent: meta?.userAgent ?? null,
          performedBy: meta?.performedBy ?? PerformedByType.USER,
        },
      });

      return record;
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
