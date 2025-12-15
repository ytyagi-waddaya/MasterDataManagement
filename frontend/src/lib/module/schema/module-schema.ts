import { z } from "zod";

const nameSchema = z
  .string({ message: "Module name is required" })
  .min(2, { message: "Module name must be at least 2 characters long" })
  .max(50, { message: "Module name cannot exceed 50 characters" });

const descriptionSchema = z
  .string()
  .trim()
  .optional()
  .nullable()
  .transform((val) => {
    if (val === undefined || val === null) return null;
    const t = (val as string).trim();
    return t.length === 0 ? null : t;
  })
  .default(null)

export const createModuleSchema = z
  .object({
    name: nameSchema,
    description: descriptionSchema,
    isActive: z.boolean().optional().default(true),
    isSystem: z.boolean().optional().default(false),
  })
  .strict();

export const updateModuleSchema = z
  .object({
    name: nameSchema.optional(),
    description: descriptionSchema,
    isActive: z.boolean().optional(),
    isSystem: z.boolean().optional(),
  })
  .strict();

export type CreateModuleInput = z.infer<typeof createModuleSchema>;
export type UpdateModuleInput = z.infer<typeof updateModuleSchema>;

