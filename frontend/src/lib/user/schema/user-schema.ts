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


export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export interface UserFilters {
  email?: string;
  role?: string;
  department?: string;
  location?: string;

  status?: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "LOCKED";
  type?: "INTERNAL" | "EXTERNAL" | "SERVICE";

  search?: string;

  createdFrom?: string;
  createdTo?: string;

  sortBy?: string;
  sortOrder?: "asc" | "desc";

  [key: string]: any;
}

export interface UserResponse<T> {
  data: T[];
  total: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: "INTERNAL" | "EXTERNAL" | "SERVICE";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "LOCKED";
  department?: UserDepartmentRelation[];
  location?: string | null;
  attributes?: Record<string, any> | null;
  roles?: Array<{ id: string; name: string; key?: string }>;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
export interface UserDepartmentRelation {
  id: string;
  userId: string;
  departmentId: string;
  assignedAt: string;
  department?: {
    id: string;
    name: string;
  };
}


export const USER_STATUS: Record<
  "ACTIVE" | "INACTIVE" | "SUSPENDED" | "LOCKED",
  {
    bg: string;
    text: string;
    border: string;
  }
> = {
  ACTIVE: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-l-4 border-green-500",
  },
  INACTIVE: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-l-4 border-gray-400",
  },
  SUSPENDED: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-l-4 border-yellow-500",
  },
  LOCKED: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-l-4 border-red-600",
  },
};

export const USER_STATUS_COLORS = {
  ACTIVE: "",
  INACTIVE: "bg-gray-100 border-l-4 border-gray-400 text-gray-700",
  SUSPENDED: "bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800",
  LOCKED: "bg-red-50 border-l-4 border-red-600 text-red-700",
} as const;

export type UserStatusKey = keyof typeof USER_STATUS_COLORS;