import { z } from "zod";
export const allowedMasterRecordSortColumns = [
    "createdAt",
    "updatedAt",
    "id",
    "currentStageId",
    "currentStageName",
];
export const masterRecordFilterSchema = z
    .object({
    masterObjectId: z.string().uuid(),
    skip: z.coerce.number().int().min(0).default(0),
    take: z.coerce.number().int().min(1).max(100).default(10),
    search: z
        .string()
        .trim()
        .optional()
        .transform((v) => (v?.length ? v : undefined)),
    stageId: z.string().uuid().optional(),
    isActive: z.enum(["all", "active", "inactive"]).default("all"),
    createdFrom: z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), "Invalid date"),
    createdTo: z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), "Invalid date"),
    sortBy: z.enum(allowedMasterRecordSortColumns).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
})
    .strict();
//# sourceMappingURL=masterRecord.dto.js.map