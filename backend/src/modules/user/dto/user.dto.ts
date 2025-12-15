import { z } from "zod";

const nameSchema = z
  .string({ message: "Module name is required" })
  .min(2, { message: "Module name must be at least 2 characters long" })
  .max(50, { message: "Module name cannot exceed 50 characters" });

export const createUserSchema = z.object({
  name: nameSchema,
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 special character"
    ),
  type: z
    .enum(["INTERNAL", "EXTERNAL", "SERVICE"])
    .optional()
    .default("INTERNAL"),
  department: z
    .string()
    .optional()
    .transform((val) => val ?? null),
  location: z
    .string()
    .optional()
    .transform((val) => val ?? null),
});

export const updateUserSchema = z.object({
  name: nameSchema,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least 1 special character")
    .optional(),
  type: z.enum(["INTERNAL", "EXTERNAL", "SERVICE"]).optional(),
  department: z
    .string()
    .optional()
    .transform((val) => val ?? null),
  location: z
    .string()
    .optional()
    .transform((val) => val ?? null),
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED", "LOCKED"]).optional(),
  
});

// URL params
export const userIdSchema = z.object({
  userId: z.uuid("Invalid User ID format"),
});

export const userIdsSchema = z.object({
  userIds: z
    .array(z.uuid("Invalid User ID format"))
    .nonempty("At least one User ID is required"),
});

export const userEmailOnlySchema = z.object({
  email: z.email("Invalid email format"),
});

export const allowedSortColumns = [
  "name",
  "email",
  "department",
  "location",
  "status",
  "type",
  "createdAt",
  "updatedAt",
] as const;

export const userFilterSchema = z
  .object({
    email: z.string().email().optional(),
    role: z.string().optional(),
    department: z.string().optional(),
    location: z.string().optional(),

    status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED", "LOCKED"]).optional(),

    type: z.enum(["INTERNAL", "EXTERNAL", "SERVICE"]).optional(),

    skip: z.coerce.number().int().min(0).default(0),
    take: z.coerce.number().int().min(1).max(100).default(10),

    search: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v?.length ? v : undefined)),

    createdFrom: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), "Invalid date format"),

    createdTo: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), "Invalid date format"),

    sortBy: z.enum(allowedSortColumns).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .strict();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserId = z.infer<typeof userIdSchema>;
export type UserIds = z.infer<typeof userIdsSchema>;
export type UserEmail = z.infer<typeof userEmailOnlySchema>;
export type userFilterInput = z.infer<typeof userFilterSchema>;
export type SortColumn = (typeof allowedSortColumns)[number];
