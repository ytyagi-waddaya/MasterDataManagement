import { z } from "zod";
export declare const nameSchema: z.ZodString;
export declare const fieldConfigSchema: z.ZodObject<{
    meta: z.ZodObject<{
        key: z.ZodString;
        label: z.ZodString;
        category: z.ZodEnum<{
            SYSTEM: "SYSTEM";
            INPUT: "INPUT";
            REFERENCE: "REFERENCE";
            CALCULATED: "CALCULATED";
        }>;
        system: z.ZodOptional<z.ZodBoolean>;
        locked: z.ZodOptional<z.ZodBoolean>;
        deprecated: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>;
    data: z.ZodObject<{
        type: z.ZodEnum<{
            STRING: "STRING";
            NUMBER: "NUMBER";
            BOOLEAN: "BOOLEAN";
            DATE: "DATE";
            DATETIME: "DATETIME";
            JSON: "JSON";
        }>;
        default: z.ZodOptional<z.ZodAny>;
        nullable: z.ZodOptional<z.ZodBoolean>;
        precision: z.ZodOptional<z.ZodNumber>;
        scale: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>;
    ui: z.ZodOptional<z.ZodObject<{
        widget: z.ZodEnum<{
            NUMBER: "NUMBER";
            DATE: "DATE";
            DATETIME: "DATETIME";
            TEXT: "TEXT";
            SELECT: "SELECT";
            RADIO: "RADIO";
            CHECKBOX: "CHECKBOX";
            TEXTAREA: "TEXTAREA";
            CURRENCY: "CURRENCY";
        }>;
        placeholder: z.ZodOptional<z.ZodString>;
        helpText: z.ZodOptional<z.ZodString>;
        layout: z.ZodOptional<z.ZodObject<{
            width: z.ZodOptional<z.ZodEnum<{
                full: "full";
                half: "half";
                third: "third";
                quarter: "quarter";
                "two-third": "two-third";
            }>>;
            order: z.ZodOptional<z.ZodNumber>;
            section: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    validation: z.ZodOptional<z.ZodObject<{
        required: z.ZodOptional<z.ZodBoolean>;
        rules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<{
                MIN: "MIN";
                REQUIRED: "REQUIRED";
                REQUIRED_IF: "REQUIRED_IF";
                REGEX: "REGEX";
                RANGE: "RANGE";
                MAX: "MAX";
            }>;
            params: z.ZodOptional<z.ZodAny>;
            message: z.ZodString;
            severity: z.ZodOptional<z.ZodEnum<{
                WARN: "WARN";
                ERROR: "ERROR";
            }>>;
        }, z.core.$strict>>>;
    }, z.core.$strict>>;
    visibility: z.ZodOptional<z.ZodObject<{
        visible: z.ZodOptional<z.ZodBoolean>;
        conditions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            field: z.ZodString;
            operator: z.ZodEnum<{
                IN: "IN";
                EQUALS: "EQUALS";
                GT: "GT";
                LT: "LT";
            }>;
            value: z.ZodAny;
        }, z.core.$strict>>>;
    }, z.core.$strict>>;
    permissions: z.ZodOptional<z.ZodObject<{
        read: z.ZodOptional<z.ZodObject<{
            roles: z.ZodOptional<z.ZodArray<z.ZodString>>;
            users: z.ZodOptional<z.ZodArray<z.ZodString>>;
            conditions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                field: z.ZodString;
                equals: z.ZodAny;
            }, z.core.$strict>>>;
        }, z.core.$strict>>;
        write: z.ZodOptional<z.ZodObject<{
            roles: z.ZodOptional<z.ZodArray<z.ZodString>>;
            users: z.ZodOptional<z.ZodArray<z.ZodString>>;
            conditions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                field: z.ZodString;
                equals: z.ZodAny;
            }, z.core.$strict>>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    behavior: z.ZodOptional<z.ZodObject<{
        readOnly: z.ZodOptional<z.ZodBoolean>;
        lockWhen: z.ZodOptional<z.ZodObject<{
            field: z.ZodString;
            equals: z.ZodAny;
        }, z.core.$strict>>;
        formula: z.ZodOptional<z.ZodObject<{
            expression: z.ZodString;
            dependencies: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const updateMasterObjectSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    schema: z.ZodOptional<z.ZodArray<z.ZodObject<{
        meta: z.ZodObject<{
            key: z.ZodString;
            label: z.ZodString;
            category: z.ZodEnum<{
                SYSTEM: "SYSTEM";
                INPUT: "INPUT";
                REFERENCE: "REFERENCE";
                CALCULATED: "CALCULATED";
            }>;
            system: z.ZodOptional<z.ZodBoolean>;
            locked: z.ZodOptional<z.ZodBoolean>;
            deprecated: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>;
        data: z.ZodObject<{
            type: z.ZodEnum<{
                STRING: "STRING";
                NUMBER: "NUMBER";
                BOOLEAN: "BOOLEAN";
                DATE: "DATE";
                DATETIME: "DATETIME";
                JSON: "JSON";
            }>;
            default: z.ZodOptional<z.ZodAny>;
            nullable: z.ZodOptional<z.ZodBoolean>;
            precision: z.ZodOptional<z.ZodNumber>;
            scale: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strict>;
        ui: z.ZodOptional<z.ZodObject<{
            widget: z.ZodEnum<{
                NUMBER: "NUMBER";
                DATE: "DATE";
                DATETIME: "DATETIME";
                TEXT: "TEXT";
                SELECT: "SELECT";
                RADIO: "RADIO";
                CHECKBOX: "CHECKBOX";
                TEXTAREA: "TEXTAREA";
                CURRENCY: "CURRENCY";
            }>;
            placeholder: z.ZodOptional<z.ZodString>;
            helpText: z.ZodOptional<z.ZodString>;
            layout: z.ZodOptional<z.ZodObject<{
                width: z.ZodOptional<z.ZodEnum<{
                    full: "full";
                    half: "half";
                    third: "third";
                    quarter: "quarter";
                    "two-third": "two-third";
                }>>;
                order: z.ZodOptional<z.ZodNumber>;
                section: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        validation: z.ZodOptional<z.ZodObject<{
            required: z.ZodOptional<z.ZodBoolean>;
            rules: z.ZodOptional<z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<{
                    MIN: "MIN";
                    REQUIRED: "REQUIRED";
                    REQUIRED_IF: "REQUIRED_IF";
                    REGEX: "REGEX";
                    RANGE: "RANGE";
                    MAX: "MAX";
                }>;
                params: z.ZodOptional<z.ZodAny>;
                message: z.ZodString;
                severity: z.ZodOptional<z.ZodEnum<{
                    WARN: "WARN";
                    ERROR: "ERROR";
                }>>;
            }, z.core.$strict>>>;
        }, z.core.$strict>>;
        visibility: z.ZodOptional<z.ZodObject<{
            visible: z.ZodOptional<z.ZodBoolean>;
            conditions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                field: z.ZodString;
                operator: z.ZodEnum<{
                    IN: "IN";
                    EQUALS: "EQUALS";
                    GT: "GT";
                    LT: "LT";
                }>;
                value: z.ZodAny;
            }, z.core.$strict>>>;
        }, z.core.$strict>>;
        permissions: z.ZodOptional<z.ZodObject<{
            read: z.ZodOptional<z.ZodObject<{
                roles: z.ZodOptional<z.ZodArray<z.ZodString>>;
                users: z.ZodOptional<z.ZodArray<z.ZodString>>;
                conditions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    field: z.ZodString;
                    equals: z.ZodAny;
                }, z.core.$strict>>>;
            }, z.core.$strict>>;
            write: z.ZodOptional<z.ZodObject<{
                roles: z.ZodOptional<z.ZodArray<z.ZodString>>;
                users: z.ZodOptional<z.ZodArray<z.ZodString>>;
                conditions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    field: z.ZodString;
                    equals: z.ZodAny;
                }, z.core.$strict>>>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        behavior: z.ZodOptional<z.ZodObject<{
            readOnly: z.ZodOptional<z.ZodBoolean>;
            lockWhen: z.ZodOptional<z.ZodObject<{
                field: z.ZodString;
                equals: z.ZodAny;
            }, z.core.$strict>>;
            formula: z.ZodOptional<z.ZodObject<{
                expression: z.ZodString;
                dependencies: z.ZodArray<z.ZodString>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
    }, z.core.$strict>>>;
    publish: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>;
export declare const createMasterObjectSchema: z.ZodObject<{
    name: z.ZodString;
    key: z.ZodString;
}, z.core.$strict>;
export declare const masterObjectIdSchema: z.ZodObject<{
    masterObjectId: z.ZodUUID;
}, z.core.$strip>;
export declare const allowedSortColumns: readonly ["name", "isSystem", "isActive", "id", "createdAt", "updatedAt", "deletedAt"];
export declare const masterObjectFilterSchema: z.ZodObject<{
    skip: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    take: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    isActive: z.ZodDefault<z.ZodEnum<{
        active: "active";
        all: "all";
        inactive: "inactive";
    }>>;
    isSystem: z.ZodDefault<z.ZodEnum<{
        all: "all";
        true: "true";
        false: "false";
    }>>;
    search: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | undefined, string | undefined>>;
    name: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | undefined, string | undefined>>;
    createdFrom: z.ZodOptional<z.ZodString>;
    createdTo: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        id: "id";
        createdAt: "createdAt";
        name: "name";
        updatedAt: "updatedAt";
        deletedAt: "deletedAt";
        isActive: "isActive";
        isSystem: "isSystem";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strict>;
export type CreateMasterObjectInput = z.infer<typeof createMasterObjectSchema>;
export type UpdateMasterObjectInput = z.infer<typeof updateMasterObjectSchema>;
export type masterObjectId = z.infer<typeof masterObjectIdSchema>;
export type masterObjectFilterInput = z.infer<typeof masterObjectFilterSchema>;
export type SortColumn = (typeof allowedSortColumns)[number];
//# sourceMappingURL=masterObject.dto.d.ts.map