import { ActorMeta } from "../../types/action.types.js";
import { masterObjectFilterInput, masterObjectId } from "./dto/masterObject.dto.js";
declare const masterObjectService: {
    getMasterObjects: (options?: Partial<masterObjectFilterInput>) => Promise<{
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
    getMasterObject: ({ masterObjectId }: masterObjectId) => Promise<{
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
    }>;
    updateMasterObject: ({ masterObjectId }: masterObjectId, data: unknown, meta?: ActorMeta) => Promise<{
        success: boolean;
        schema: {
            id: string;
            version: number;
            status: string;
            publishedAt: Date | null;
        } | null;
    }>;
    archivemasterObject: ({ masterObjectId }: masterObjectId, meta?: ActorMeta) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    }>;
    restoremasterObject: ({ masterObjectId }: masterObjectId, meta?: ActorMeta) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    }>;
    deletemasterObject: ({ masterObjectId }: masterObjectId, meta?: ActorMeta) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        key: string;
        isSystem: boolean;
    }>;
};
export default masterObjectService;
export declare function canViewDraftSchema(user: {
    roles?: string[];
} | null): boolean;
//# sourceMappingURL=masterObject.service.d.ts.map