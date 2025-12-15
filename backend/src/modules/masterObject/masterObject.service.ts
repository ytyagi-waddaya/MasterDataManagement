import {
  AuditAction,
  AuditEntity,
  PerformedByType,
  Prisma,
} from "../../../prisma/generated/client.js";
import { ActorMeta } from "../../types/action.types.js";
import { BadRequestException, NotFoundException } from "../../utils/appError.js";
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

const masterObjectService = {
  getMasterObjects: async (options?: Partial<masterObjectFilterInput>) => {
    const filters = masterObjectFilterSchema.parse(options || {});

    return await masterObjectRepository.read(filters);
  },

  getMasterObject: async ({ masterObjectId }: masterObjectId) => {
    const parsed = masterObjectIdSchema.parse({ masterObjectId });
    const obj = await masterObjectRepository.findById(parsed.masterObjectId);
    if (!obj) throw new NotFoundException("MasterObject not found");
    return obj;
  },

  updateMasterObject: async (
    { masterObjectId }: masterObjectId,
    data: any,
    meta?: ActorMeta
  ) => {
    const parsedId = masterObjectIdSchema.parse({ masterObjectId });
    const validatedData = updateMasterObjectSchema.parse(data);

    const existing = await masterObjectRepository.findById(
      parsedId.masterObjectId
    );
    if (!existing) throw new NotFoundException("MasterObject not found");

    if (existing.isSystem) {
      throw new BadRequestException("System MasterObject cannot be modified.");
    }

    if (validatedData.name && validatedData.name !== existing.name) {
      const duplicate = await masterObjectRepository.isDuplicateName(
        validatedData.name,
        parsedId.masterObjectId
      );
      if (duplicate)
        throw new BadRequestException("masterObject name already exists.");
    }

    let dataToUpdate: Prisma.MasterObjectUpdateInput = {};
    if (validatedData.name !== undefined) {
      dataToUpdate.name = { set: validatedData.name };
    }

    if (validatedData.isActive !== undefined) {
      dataToUpdate.isActive = { set: validatedData.isActive };
    }

    if (validatedData.fields !== undefined) {
      dataToUpdate.fields = { set: validatedData.fields }; 
    }

    if (validatedData.name && validatedData.name !== existing.name) {
      const newKey = generateKey(validatedData.name);
      dataToUpdate.key = { set: newKey };
    }

    const updated = await prisma.$transaction(async (tx) => {
      const result = await tx.masterObject.update({
        where: { id: parsedId.masterObjectId },
        data: dataToUpdate,
      });

      await createAuditLog({
        userId: meta?.actorId ?? null,
        entity: AuditEntity.MASTER_RECORD,
        action: AuditAction.UPDATE,
        comment: "MasterObject updated",
        before: existing,
        after: result,
        ipAddress: meta?.ipAddress ?? null,
        userAgent: meta?.userAgent ?? null,
        performedBy: meta?.performedBy ?? PerformedByType.USER,
      });

      return result;
    });

    return updated;
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
};

export default masterObjectService;
