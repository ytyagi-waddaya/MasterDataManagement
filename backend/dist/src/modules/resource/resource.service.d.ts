import { ActorMeta } from "../../types/action.types.js";
import { CreateResourceInput, ResourceFilterInput, ResourceId, ResourceIds, UpdateResourceInput } from "./dto/resource.dto.js";
declare const actionsService: {
    createResource: (data: CreateResourceInput, meta?: ActorMeta) => Promise<{
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
    }>;
    getResources: (options?: Partial<ResourceFilterInput>) => Promise<{
        data: ({
            module: {
                id: string;
                name: string;
            } | null;
        } & {
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
        })[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    getResourceById: ({ resourceId }: ResourceId) => Promise<{
        masterObject: {
            id: string;
            name: string;
            fieldDefinitions: {
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
            }[];
            key: string;
        } | null;
        module: {
            id: string;
            name: string;
        } | null;
    } & {
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
    }>;
    updateResourceById: (id: ResourceId, data: UpdateResourceInput, meta?: ActorMeta) => Promise<{
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
    }>;
    archiveResource: ({ resourceId }: ResourceId, meta?: ActorMeta) => Promise<{
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
    }>;
    restoreResource: ({ resourceId }: ResourceId, meta?: ActorMeta) => Promise<{
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
    }>;
    deleteResource: ({ resourceId }: ResourceId, meta?: ActorMeta) => Promise<{
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
    }>;
    archiveResources: (ids: ResourceIds, meta?: ActorMeta) => Promise<{
        count: number;
        archived: string[];
    }>;
    restoreResources: (ids: ResourceIds, meta?: ActorMeta) => Promise<{
        count: number;
        restored: string[];
    }>;
    deleteResources: (ids: ResourceIds, meta?: ActorMeta) => Promise<{
        count: number;
        deleted: string[];
        skippedSystemResources: string[];
    }>;
};
export default actionsService;
//# sourceMappingURL=resource.service.d.ts.map