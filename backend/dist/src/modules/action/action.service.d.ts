import { ActorMeta } from "../../types/action.types.js";
import { CreateActionInput, UpdateActionInput, ActionId, ActionIds, ActionFilterInput } from "./dto/action.dto.js";
declare const actionsService: {
    createAction: (data: CreateActionInput, meta?: ActorMeta) => Promise<{
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
    getActions: (options?: Partial<ActionFilterInput>) => Promise<{
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
    getActionById: ({ actionId }: ActionId) => Promise<{
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
    updateActionById: (id: ActionId, data: UpdateActionInput, meta?: ActorMeta) => Promise<{
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
    archiveAction: ({ actionId }: ActionId, meta?: ActorMeta) => Promise<{
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
    restoreAction: ({ actionId }: ActionId, meta?: ActorMeta) => Promise<{
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
    deleteAction: ({ actionId }: ActionId, meta?: ActorMeta) => Promise<{
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
    archiveActions: (ids: ActionIds, meta?: ActorMeta) => Promise<{
        count: number;
        archived: string[];
    }>;
    restoreActions: (ids: ActionIds, meta?: ActorMeta) => Promise<{
        count: number;
        restored: string[];
    }>;
    deleteActions: (ids: ActionIds, meta?: ActorMeta) => Promise<{
        count: number;
        deleted: string[];
        skippedSystemActions: string[];
    }>;
};
export default actionsService;
//# sourceMappingURL=action.service.d.ts.map