import { z } from "zod";
export declare const sendSchema: z.ZodObject<{
    userId: z.ZodString;
    title: z.ZodString;
    message: z.ZodString;
    data: z.ZodOptional<z.ZodAny>;
    scheduledAt: z.ZodOptional<z.ZodString>;
    channels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodEnum<{
        readonly IN_APP: "IN_APP";
        readonly EMAIL: "EMAIL";
        readonly WEB: "WEB";
        readonly SMS: "SMS";
    }>>>>;
}, z.core.$strip>;
export declare const markReadSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const listSchema: z.ZodObject<{
    userId: z.ZodUUID;
    take: z.ZodOptional<z.ZodString>;
    skip: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=notifications.schema.d.ts.map