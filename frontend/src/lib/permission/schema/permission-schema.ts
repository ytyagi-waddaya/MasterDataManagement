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

export const updatePermissionConditionSchema = z.object({
  conditions: z
    .record(z.string(), z.any())
    .optional()
    .transform((val) => val ?? null),
    
  expression: z
    .string()
    .optional()
    .transform((val) => val ?? null),
});


export const updatePermissionSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,

  isActive: z.boolean().optional(),
  isSystem: z.boolean().optional(),

});

export type UpdatePermissionInput = z.infer<typeof updatePermissionSchema>;
export type UpdatePermissionConditionInput = z.infer<
  typeof updatePermissionConditionSchema
>;
