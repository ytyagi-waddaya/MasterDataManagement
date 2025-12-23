import z from "zod";
export declare const loginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
export type LoginInput = z.infer<typeof loginSchema>;
//# sourceMappingURL=auth.types.d.ts.map