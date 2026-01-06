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

export const createResourceSchema = z
  .object({
    name: nameSchema,
    codePrefix: z
      .string()
      .trim()
      .transform((v) => v.toUpperCase())
      .refine(
        (v) => /^[A-Z]{2,6}$/.test(v),
        "codePrefix must be 2–6 uppercase letters (e.g. INC, ITEM)"
      ),
    description: descriptionSchema,
    isActive: z.boolean().optional().default(true),
    isSystem: z.boolean().optional().default(false),

    moduleId: z
      .string()
      .uuid()
      .optional()
      .or(z.literal("")) // allow empty string
      .transform((val) => (val === "" ? undefined : val)),
  })
  .strict();

export const updateResourceSchema = z
  .object({
    name: nameSchema,
    description: descriptionSchema,
    isActive: z.boolean().optional(),
    isSystem: z.boolean().optional(),
  })
  .strict();

export type CreateResourceInput = z.infer<typeof createResourceSchema>;
export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;
