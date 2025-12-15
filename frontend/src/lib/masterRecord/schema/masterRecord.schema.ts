import { z } from "zod";

export const allowedMasterRecordSortColumns = [
  "createdAt",
  "updatedAt",
  "status",
  "id",
] as const;

export const masterRecordFilterSchema = z
  .object({
    masterObjectId: z.string().uuid(),

    search: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v?.length ? v : undefined)),

    status: z
      .enum(["all", "Draft", "PendingApproval", "Approved", "Rejected"])
      .default("all"),

    isActive: z.enum(["all", "active", "inactive"]).default("all"),

    createdFrom: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), "Invalid date"),

    createdTo: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), "Invalid date"),

    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),

    sortBy: z.enum(allowedMasterRecordSortColumns).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .strict();

export type MasterRecordFilterInput = z.infer<typeof masterRecordFilterSchema>;


export type MasterRecordSortColumn = (typeof allowedMasterRecordSortColumns)[number];
