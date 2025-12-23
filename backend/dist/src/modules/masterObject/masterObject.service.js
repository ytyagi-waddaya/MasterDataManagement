import { AuditAction, AuditEntity, PerformedByType, } from "../../../prisma/generated/client.js";
import { BadRequestException, NotFoundException, } from "../../utils/appError.js";
import { createAuditLog } from "../../utils/auditLog.js";
import { masterObjectFilterSchema, masterObjectIdSchema, updateMasterObjectSchema, } from "./dto/masterObject.dto.js";
import { prisma } from "../../lib/prisma.js";
import masterObjectRepository from "./masterobject.repository.js";
import { publishSchemaWithDiff } from "../../runTimeEngine/fieldDiff.engine.js";
const masterObjectService = {
    getMasterObjects: async (options) => {
        const filters = masterObjectFilterSchema.parse(options || {});
        return await masterObjectRepository.read(filters);
    },
    getMasterObject: async ({ masterObjectId }) => {
        const parsedId = masterObjectIdSchema.parse({ masterObjectId });
        const obj = await masterObjectRepository.findByIdObj(parsedId.masterObjectId);
        if (!obj) {
            throw new NotFoundException("MasterObject not found");
        }
        return obj;
    },
    updateMasterObject: async ({ masterObjectId }, data, meta) => {
        const parsedId = masterObjectIdSchema.parse({ masterObjectId });
        const validatedData = updateMasterObjectSchema.parse(data);
        const existing = await masterObjectRepository.findById(parsedId.masterObjectId);
        if (!existing) {
            throw new NotFoundException("MasterObject not found");
        }
        if (existing.isSystem) {
            throw new BadRequestException("System MasterObject cannot be modified.");
        }
        const hasAnyChange = validatedData.name !== undefined ||
            validatedData.isActive !== undefined ||
            validatedData.schema !== undefined;
        if (!hasAnyChange) {
            throw new BadRequestException("No changes provided");
        }
        return prisma.$transaction(async (tx) => {
            /* =====================================================
               1️⃣ UPDATE MASTEROBJECT METADATA (SAFE)
            ===================================================== */
            const updateData = {};
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
               2️⃣ SCHEMA UPDATE (ONLY VIA DIFF ENGINE)
            ===================================================== */
            let newSchema = null;
            /* -------- PUBLISH GUARDS -------- */
            if (validatedData.publish && !validatedData.schema) {
                throw new BadRequestException("Schema payload is required when publishing");
            }
            if (validatedData.schema) {
                if (validatedData.schema.length === 0) {
                    throw new BadRequestException("Schema must contain at least one field");
                }
                // Prevent unsafe draft edits when records exist
                const recordCount = await tx.masterRecord.count({
                    where: {
                        masterObjectId: parsedId.masterObjectId,
                        deletedAt: null,
                    },
                });
                if (recordCount > 0 && !validatedData.publish) {
                    throw new BadRequestException("Schema changes must be published when records already exist");
                }
                // Prevent editing published schema without version bump
                const publishedSchema = await tx.masterObjectSchema.findFirst({
                    where: {
                        masterObjectId: parsedId.masterObjectId,
                        status: "PUBLISHED",
                    },
                });
                if (publishedSchema && !validatedData.publish) {
                    throw new BadRequestException("Published schema cannot be modified without publishing a new version");
                }
                // Create new schema version + apply diff
                const schema = await publishSchemaWithDiff({
                    tx,
                    masterObjectId: parsedId.masterObjectId,
                    schemaJson: validatedData.schema,
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
               3️⃣ AUDIT LOG (SINGLE SOURCE OF TRUTH)
            ===================================================== */
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
                    schemaUpdated: Boolean(validatedData.schema),
                    schemaPublished: Boolean(validatedData.publish),
                },
            });
            /* =====================================================
               4️⃣ RETURN (FRONTEND FRIENDLY)
            ===================================================== */
            return {
                success: true,
                schema: newSchema,
            };
        });
    },
    archivemasterObject: async ({ masterObjectId }, meta) => {
        const parsedId = masterObjectIdSchema.parse({ masterObjectId });
        const existing = await masterObjectRepository.readOne(parsedId);
        if (!existing)
            throw new NotFoundException("masterObject not found.");
        if (existing.isSystem) {
            throw new BadRequestException("System masterObjects cannot be archived.");
        }
        const archived = await masterObjectRepository.archive(parsedId);
        if (!archived)
            throw new NotFoundException("masterObject not found.");
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
    restoremasterObject: async ({ masterObjectId }, meta) => {
        const parsedId = masterObjectIdSchema.parse({ masterObjectId });
        const existing = await masterObjectRepository.readOne(parsedId);
        if (!existing)
            throw new NotFoundException("masterObject not found.");
        if (existing.isSystem) {
            throw new BadRequestException("System masterObjects cannot be archived.");
        }
        const restored = await masterObjectRepository.restore(parsedId);
        if (!restored)
            throw new NotFoundException("masterObject not found.");
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
    deletemasterObject: async ({ masterObjectId }, meta) => {
        const parsedId = masterObjectIdSchema.parse({ masterObjectId });
        const existing = await masterObjectRepository.readOne(parsedId);
        if (!existing)
            throw new NotFoundException("masterObject not found.");
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
// auth/capabilities.ts
export function canViewDraftSchema(user) {
    if (!user?.roles)
        return false;
    return user.roles.includes("ADMIN") || user.roles.includes("SYSTEM_ADMIN");
}
//# sourceMappingURL=masterObject.service.js.map