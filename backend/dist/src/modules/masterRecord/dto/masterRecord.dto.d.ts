import { z } from "zod";
export declare const allowedMasterRecordSortColumns: readonly ["createdAt", "updatedAt", "id", "currentStageId", "currentStageName"];
export declare const masterRecordFilterSchema: z.ZodObject<{
    masterObjectId: z.ZodString;
    skip: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    take: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | undefined, string | undefined>>;
    stageId: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodEnum<{
        active: "active";
        all: "all";
        inactive: "inactive";
    }>>;
    createdFrom: z.ZodOptional<z.ZodString>;
    createdTo: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        id: "id";
        createdAt: "createdAt";
        updatedAt: "updatedAt";
        currentStageId: "currentStageId";
        currentStageName: "currentStageName";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strict>;
export type MasterRecordFilterInput = z.infer<typeof masterRecordFilterSchema>;
export type MasterRecordSortColumn = (typeof allowedMasterRecordSortColumns)[number];
//# sourceMappingURL=masterRecord.dto.d.ts.map