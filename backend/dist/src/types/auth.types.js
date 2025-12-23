import z from "zod";
export const loginSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
        .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
        .regex(/[0-9]/, "Password must contain at least 1 number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least 1 special character"),
});
//# sourceMappingURL=auth.types.js.map