import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z
    .string()
    .min(2, "Department name must be at least 2 characters")
    .max(50, "Department name cannot exceed 50 characters"),

  code: z
    .string()
    .min(2, "Code must be at least 2 characters")
    .max(20, "Code cannot exceed 20 characters"),

  description: z.string().optional().transform(val => val ?? null),

  status: z.enum(["ACTIVE", "INACTIVE"]).optional().default("ACTIVE"),
});

export const updateDepartmentSchema = createDepartmentSchema.partial();

export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>;
export type UpdateDepartmentInput = z.infer<typeof updateDepartmentSchema>;

export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}
