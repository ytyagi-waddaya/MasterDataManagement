import { ActorMeta } from "../../types/action.types.js";
import { CreateModuleInput, ModuleFilterInput, ModuleId, ModuleIds, UpdateModuleInput } from "./dto/module.dto.js";
declare const moduleService: {
    createModule: (data: CreateModuleInput, meta?: ActorMeta) => Promise<{
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
    getModules: (options?: Partial<ModuleFilterInput>) => Promise<{
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
    getModuleById: ({ moduleId }: ModuleId) => Promise<{
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
    updateModuleById: (id: ModuleId, data: UpdateModuleInput, meta?: ActorMeta) => Promise<{
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
    archiveModule: ({ moduleId }: ModuleId, meta?: ActorMeta) => Promise<{
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
    restoreModule: ({ moduleId }: ModuleId, meta?: ActorMeta) => Promise<{
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
    deleteModule: ({ moduleId }: ModuleId, meta?: ActorMeta) => Promise<{
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
    archiveModules: (ids: ModuleIds, meta?: ActorMeta) => Promise<{
        count: number;
        archived: string[];
    }>;
    restoreModules: (ids: ModuleIds, meta?: ActorMeta) => Promise<{
        count: number;
        restored: string[];
    }>;
    deleteModules: (ids: ModuleIds, meta?: ActorMeta) => Promise<{
        count: number;
        deleted: string[];
        skippedSystemModules: string[];
    }>;
};
export default moduleService;
//# sourceMappingURL=module.service.d.ts.map