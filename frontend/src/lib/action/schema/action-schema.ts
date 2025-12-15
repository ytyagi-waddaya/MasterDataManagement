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
  .default(null);

export const createActionSchema = z
  .object({
    name: nameSchema,
    description: descriptionSchema,
    isActive: z.boolean().optional().default(true),
    isSystem: z.boolean().default(false),
  })
  .strict();

export const updateActionSchema = z
  .object({
    name: nameSchema,

    description: descriptionSchema,
    isActive: z.boolean().optional(),
    isSystem: z.boolean().optional(),
  })
  .strict();


export type CreateActionInput = z.infer<typeof createActionSchema>;
export type UpdateActionInput = z.infer<typeof updateActionSchema>;

