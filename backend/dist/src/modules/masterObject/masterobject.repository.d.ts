import { Prisma } from "../../../prisma/generated/client.js";
import { masterObjectFilterInput, masterObjectId } from "./dto/masterObject.dto.js";
declare const masterObjectRepository: {
    create: (data: Prisma.MasterObjectCreateInput) => Prisma.Prisma__MasterObjectClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    read: (filters: masterObjectFilterInput) => Promise<{
        data: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            key: string;
            isSystem: boolean;
        }[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    readOne: ({ masterObjectId }: masterObjectId) => Prisma.Prisma__MasterObjectClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findById: (id: string) => Prisma.Prisma__MasterObjectClient<({
        resources: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            masterObjectId: string | null;
            description: string | null;
            key: string;
            isSystem: boolean;
            moduleId: string | null;
            category: string | null;
        }[];
        schemas: {
            id: string;
            createdAt: Date;
            status: import("../../../prisma/generated/enums.js").SchemaStatus;
            version: number;
            updatedAt: Date;
            deletedAt: Date | null;
            masterObjectId: string;
            createdById: string | null;
            layout: import("@prisma/client/runtime/client").JsonValue;
            checksum: string;
            publishedAt: Date | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findByIdObj: (id: string) => Prisma.Prisma__MasterObjectClient<({
        recordPermissions: ({
            user: {
                email: string;
                type: import("../../../prisma/generated/enums.js").UserType;
                password: string;
                id: string;
                createdAt: Date;
                name: string;
                department: string | null;
                location: string | null;
                status: import("../../../prisma/generated/enums.js").UserStatus;
                updatedAt: Date;
                attributes: import("@prisma/client/runtime/client").JsonValue | null;
                deletedAt: Date | null;
            } | null;
            role: {
                id: string;
                createdAt: Date;
                name: string;
                updatedAt: Date;
                deletedAt: Date | null;
                isActive: boolean;
                description: string | null;
                key: string;
                isSystem: boolean;
            } | null;
        } & {
            userId: string | null;
            id: string;
            createdAt: Date;
            deletedAt: Date | null;
            roleId: string | null;
            masterObjectId: string;
            canRead: boolean;
            canWrite: boolean;
            canDelete: boolean;
            condition: import("@prisma/client/runtime/client").JsonValue | null;
        })[];
        resources: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            masterObjectId: string | null;
            description: string | null;
            key: string;
            isSystem: boolean;
            moduleId: string | null;
            category: string | null;
        }[];
        schemas: ({
            fieldDefinitions: ({
                fieldPermissions: ({
                    user: {
                        email: string;
                        type: import("../../../prisma/generated/enums.js").UserType;
                        password: string;
                        id: string;
                        createdAt: Date;
                        name: string;
                        department: string | null;
                        location: string | null;
                        status: import("../../../prisma/generated/enums.js").UserStatus;
                        updatedAt: Date;
                        attributes: import("@prisma/client/runtime/client").JsonValue | null;
                        deletedAt: Date | null;
                    } | null;
                    role: {
                        id: string;
                        createdAt: Date;
                        name: string;
                        updatedAt: Date;
                        deletedAt: Date | null;
                        isActive: boolean;
                        description: string | null;
                        key: string;
                        isSystem: boolean;
                    } | null;
                } & {
                    userId: string | null;
                    id: string;
                    createdAt: Date;
                    deletedAt: Date | null;
                    roleId: string | null;
                    canRead: boolean;
                    canWrite: boolean;
                    condition: import("@prisma/client/runtime/client").JsonValue | null;
                    fieldId: string;
                })[];
                fieldFormula: {
                    id: string;
                    createdAt: Date;
                    deletedAt: Date | null;
                    fieldId: string;
                    expression: string;
                    dependencies: string[];
                } | null;
                fieldReference: ({
                    targetObject: {
                        id: string;
                        name: string;
                        key: string;
                    };
                } & {
                    id: string;
                    createdAt: Date;
                    deletedAt: Date | null;
                    fieldId: string;
                    targetObjectId: string;
                    displayFieldKey: string;
                    relationType: import("../../../prisma/generated/enums.js").ReferenceRelationType;
                    allowMultiple: boolean;
                    onDeleteBehavior: import("../../../prisma/generated/enums.js").ReferenceDeleteBehavior;
                }) | null;
                fieldValidationRules: {
                    type: import("../../../prisma/generated/enums.js").FieldValidationType;
                    id: string;
                    createdAt: Date;
                    deletedAt: Date | null;
                    fieldId: string;
                    order: number;
                    rule: import("@prisma/client/runtime/client").JsonValue;
                    errorMessage: string;
                    severity: import("../../../prisma/generated/enums.js").ValidationSeverity;
                }[];
                fieldConditionBindings: {
                    id: string;
                    createdAt: Date;
                    deletedAt: Date | null;
                    fieldId: string;
                    conditionKey: string;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                isActive: boolean;
                masterObjectId: string;
                schemaId: string;
                key: string;
                isSystem: boolean;
                category: import("../../../prisma/generated/enums.js").FieldCategory;
                fieldType: import("../../../prisma/generated/enums.js").FieldType;
                order: number;
                label: string;
                dataType: import("../../../prisma/generated/enums.js").FieldDataType;
                config: import("@prisma/client/runtime/client").JsonValue;
                isRequired: boolean;
                isLocked: boolean;
            })[];
            schemaChanges: {
                type: import("../../../prisma/generated/enums.js").SchemaChangeType;
                id: string;
                createdAt: Date;
                deletedAt: Date | null;
                schemaId: string;
                payload: import("@prisma/client/runtime/client").JsonValue;
            }[];
        } & {
            id: string;
            createdAt: Date;
            status: import("../../../prisma/generated/enums.js").SchemaStatus;
            version: number;
            updatedAt: Date;
            deletedAt: Date | null;
            masterObjectId: string;
            createdById: string | null;
            layout: import("@prisma/client/runtime/client").JsonValue;
            checksum: string;
            publishedAt: Date | null;
        })[];
        formEventHooks: {
            id: string;
            createdAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            masterObjectId: string;
            config: import("@prisma/client/runtime/client").JsonValue;
            event: import("../../../prisma/generated/enums.js").FormEventType;
            handlerType: import("../../../prisma/generated/enums.js").FormEventHandlerType;
        }[];
        fieldReferences: ({
            field: {
                id: string;
                key: string;
                label: string;
            };
        } & {
            id: string;
            createdAt: Date;
            deletedAt: Date | null;
            fieldId: string;
            targetObjectId: string;
            displayFieldKey: string;
            relationType: import("../../../prisma/generated/enums.js").ReferenceRelationType;
            allowMultiple: boolean;
            onDeleteBehavior: import("../../../prisma/generated/enums.js").ReferenceDeleteBehavior;
        })[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findByIdWithSchema: ({ id, includeDraft, }: {
        id: string;
        includeDraft: boolean;
    }) => Prisma.Prisma__MasterObjectClient<({
        resources: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            masterObjectId: string | null;
            description: string | null;
            key: string;
            isSystem: boolean;
            moduleId: string | null;
            category: string | null;
        }[];
        schemas: {
            id: string;
            createdAt: Date;
            status: import("../../../prisma/generated/enums.js").SchemaStatus;
            version: number;
            updatedAt: Date;
            deletedAt: Date | null;
            masterObjectId: string;
            createdById: string | null;
            layout: import("@prisma/client/runtime/client").JsonValue;
            checksum: string;
            publishedAt: Date | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findMany: () => Prisma.PrismaPromise<({
        resources: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            masterObjectId: string | null;
            description: string | null;
            key: string;
            isSystem: boolean;
            moduleId: string | null;
            category: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    })[]>;
    findByName: (name: string) => Prisma.Prisma__MasterObjectClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    isDuplicateName: (name: string, id: string) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    } | null>;
    update: (id: string, data: Prisma.MasterObjectUpdateInput) => Prisma.Prisma__MasterObjectClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    archive: ({ masterObjectId }: masterObjectId) => Prisma.Prisma__MasterObjectClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    restore: ({ masterObjectId }: masterObjectId) => Prisma.Prisma__MasterObjectClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    delete: ({ masterObjectId }: masterObjectId) => Prisma.Prisma__MasterObjectClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findManyByIds: (ids: string[]) => Prisma.PrismaPromise<({
        resources: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            masterObjectId: string | null;
            description: string | null;
            key: string;
            isSystem: boolean;
            moduleId: string | null;
            category: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    })[]>;
};
export default masterObjectRepository;
//# sourceMappingURL=masterobject.repository.d.ts.map