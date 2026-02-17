import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z.string().min(2),
  code: z.string().min(2),
  description: z.string().nullable().optional(),
  parentId: z.string().uuid().nullable().optional(),
});

export const updateDepartmentSchema = z.object({
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  parentId: z.string().uuid().nullable().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const departmentIdSchema = z.object({
  departmentId: z.string().uuid(),
});

export const departmentIdsSchema = z.object({
  departmentIds: z.array(z.string().uuid()),
});

export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>;
export type UpdateDepartmentInput = z.infer<typeof updateDepartmentSchema>;
export type DepartmentId = z.infer<typeof departmentIdSchema>;
export type DepartmentIds = z.infer<typeof departmentIdsSchema>;
