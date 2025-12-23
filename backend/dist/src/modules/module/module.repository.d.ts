import { Prisma } from "../../../prisma/generated/client.js";
import { ModuleFilterInput, ModuleId } from "./dto/module.dto.js";
declare const moduleRepository: {
    create: (data: Prisma.ModuleCreateInput) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }>;
    read: (filters: ModuleFilterInput) => Promise<{
        data: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            description: string | null;
            key: string;
            isSystem: boolean;
        }[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    update: ({ moduleId }: ModuleId, data: Prisma.ModuleUpdateInput) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }>;
    archive: ({ moduleId }: ModuleId) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }>;
    restore: ({ moduleId }: ModuleId) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }>;
    delete: ({ moduleId }: ModuleId) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }>;
    readOne: ({ moduleId }: ModuleId) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    } | null>;
    findByKey: (key: string) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    } | null>;
    findByNameAndTenant: (name: string) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    } | null>;
    isDuplicateName: (name: string, moduleId: string) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    } | null>;
    findManyByIds: (moduleIds: string[]) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }[]>;
};
export default moduleRepository;
//# sourceMappingURL=module.repository.d.ts.map