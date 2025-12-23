import { z } from "zod";
export declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    type: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        INTERNAL: "INTERNAL";
        EXTERNAL: "EXTERNAL";
        SERVICE: "SERVICE";
    }>>>;
    department: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | null, string | undefined>>;
    location: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | null, string | undefined>>;
}, z.core.$strip>;
export declare const updateUserSchema: z.ZodObject<{
    name: z.ZodString;
    password: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        INTERNAL: "INTERNAL";
        EXTERNAL: "EXTERNAL";
        SERVICE: "SERVICE";
    }>>;
    department: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | null, string | undefined>>;
    location: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | null, string | undefined>>;
    status: z.ZodOptional<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        INACTIVE: "INACTIVE";
        SUSPENDED: "SUSPENDED";
        LOCKED: "LOCKED";
    }>>;
}, z.core.$strip>;
export declare const userIdSchema: z.ZodObject<{
    userId: z.ZodUUID;
}, z.core.$strip>;
export declare const userIdsSchema: z.ZodObject<{
    userIds: z.ZodArray<z.ZodUUID>;
}, z.core.$strip>;
export declare const userEmailOnlySchema: z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strip>;
export declare const allowedSortColumns: readonly ["name", "email", "department", "location", "status", "type", "createdAt", "updatedAt"];
export declare const userFilterSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    department: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        INACTIVE: "INACTIVE";
        SUSPENDED: "SUSPENDED";
        LOCKED: "LOCKED";
    }>>;
    type: z.ZodOptional<z.ZodEnum<{
        INTERNAL: "INTERNAL";
        EXTERNAL: "EXTERNAL";
        SERVICE: "SERVICE";
    }>>;
    skip: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    take: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | undefined, string | undefined>>;
    createdFrom: z.ZodOptional<z.ZodString>;
    createdTo: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        email: "email";
        type: "type";
        createdAt: "createdAt";
        name: "name";
        department: "department";
        location: "location";
        status: "status";
        updatedAt: "updatedAt";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strict>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserId = z.infer<typeof userIdSchema>;
export type UserIds = z.infer<typeof userIdsSchema>;
export type UserEmail = z.infer<typeof userEmailOnlySchema>;
export type userFilterInput = z.infer<typeof userFilterSchema>;
export type SortColumn = (typeof allowedSortColumns)[number];
//# sourceMappingURL=user.dto.d.ts.map