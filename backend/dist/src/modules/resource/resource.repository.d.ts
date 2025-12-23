import { Prisma } from "../../../prisma/generated/client.js";
import { ResourceFilterInput, ResourceId } from "./dto/resource.dto.js";
declare const resourcesRepository: {
    create: (data: Prisma.ResourceCreateInput) => Prisma.Prisma__ResourceClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    read: (filters: ResourceFilterInput) => Promise<{
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
    update: ({ resourceId }: ResourceId, data: Prisma.ResourceUpdateInput) => Prisma.Prisma__ResourceClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    archive: ({ resourceId }: ResourceId) => Prisma.Prisma__ResourceClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    restore: ({ resourceId }: ResourceId) => Prisma.Prisma__ResourceClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    delete: ({ resourceId }: ResourceId) => Prisma.Prisma__ResourceClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    readOne: ({ resourceId }: ResourceId) => Prisma.Prisma__ResourceClient<{
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    getById: ({ resourceId }: ResourceId) => Promise<({
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
    }) | null>;
    findByKey: (key: string) => Promise<{
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
    } | null>;
    findByNameAndTenant: (name: string) => Prisma.Prisma__ResourceClient<{
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findManyByIds: (ResourceIds: string[]) => Prisma.PrismaPromise<{
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
    }[]>;
    isDuplicateName: (name: string, resourceId: string) => Promise<{
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
    } | null>;
};
export default resourcesRepository;
//# sourceMappingURL=resource.repository.d.ts.map