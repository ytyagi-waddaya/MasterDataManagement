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

export const createRoleSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  isSystem: z.boolean().default(false),
  isActive: z.boolean().optional().default(true),
});

export const updateRoleSchema = z.object({
  name: nameSchema,

  description: descriptionSchema,
  isActive: z.boolean().optional(),
  isSystem: z.boolean().optional(),
});

export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;


export const ConditionRule = z.object({
  field: z.string().min(1),
  operator: z.enum(["=", "!=", ">", "<", ">=", "<=", "in", "not in", "contains"]),
  value: z.union([z.string(), z.number(), z.boolean(), z.array(z.any())]),
});

export type CompoundCondition = {
  op: "AND" | "OR";
  rules: (z.infer<typeof ConditionRule> | CompoundCondition)[];
};

/**
 * Recursive Zod schema
 */
export const CompoundConditionSchema: z.ZodType<CompoundCondition> = z.lazy(() =>
  z.object({
    op: z.enum(["AND", "OR"]),
    rules: z.array(z.union([ConditionRule, CompoundConditionSchema])),
  })
);

/**
 * Final ABAC Conditions schema
 */
export const ConditionsSchema = z.union([ConditionRule, CompoundConditionSchema]);

export type Conditions = z.infer<typeof ConditionsSchema>;
