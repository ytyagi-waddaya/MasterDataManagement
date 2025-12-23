import { ActionFilterInput, ActionId } from "./dto/action.dto.js";
import { Prisma } from "../../../prisma/generated/client.js";
declare const actionsRepository: {
    create: (data: Prisma.ActionCreateInput) => Prisma.Prisma__ActionClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    read: (filters: ActionFilterInput) => Promise<{
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
    update: ({ actionId }: ActionId, data: Prisma.ActionUpdateInput) => Prisma.Prisma__ActionClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    archive: ({ actionId }: ActionId) => Prisma.Prisma__ActionClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    restore: ({ actionId }: ActionId) => Prisma.Prisma__ActionClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    delete: ({ actionId }: ActionId) => Prisma.Prisma__ActionClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    readOne: ({ actionId }: ActionId) => Prisma.Prisma__ActionClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
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
    findByNameAndTenant: (name: string) => Prisma.Prisma__ActionClient<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        description: string | null;
        key: string;
        isSystem: boolean;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findByNamesAndTenant: (names: string[]) => Prisma.PrismaPromise<{
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
    isDuplicateName: (name: string, actionId: string) => Promise<{
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
    findManyByIds: (ActionIds: string[]) => Prisma.PrismaPromise<{
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
export default actionsRepository;
//# sourceMappingURL=action.repository.d.ts.map