import { Prisma } from "../../../prisma/generated/client.js";
import { prisma } from "../../lib/prisma.js";
import { ResourceFilterInput, ResourceId } from "./dto/resource.dto.js";

const resourcesRepository = {
  create: (data: Prisma.ResourceCreateInput) => {
    return prisma.resource.create({ data });
  },

  read: async (filters: ResourceFilterInput) => {
    const where = buildModuleWhere(filters);

    const [data, total] = await Promise.all([
      prisma.resource.findMany({
        where,
        skip: filters.skip,
        take: filters.take,
        orderBy: {
          [filters.sortBy]: filters.sortOrder,
        },
        include: {
          module: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.resource.count({ where }),
    ]);

    return {
      data,
      total,
      page: Math.floor((filters.skip || 0) / (filters.take || 10)) + 1,
      pageSize: filters.take || 10,
    };
  },

  update: ({ resourceId }: ResourceId, data: Prisma.ResourceUpdateInput) => {
    return prisma.resource.update({
      where: { id: resourceId },
      data,
    });
  },

  archive: ({ resourceId }: ResourceId) => {
    return prisma.resource.update({
      where: { id: resourceId },
      data: { deletedAt: new Date(), isActive: false },
    });
  },

  restore: ({ resourceId }: ResourceId) => {
    return prisma.resource.update({
      where: { id: resourceId },
      data: { deletedAt: null, isActive: true },
    });
  },

  delete: ({ resourceId }: ResourceId) => {
    return prisma.resource.delete({ where: { id: resourceId } });
  },

  readOne: ({ resourceId }: ResourceId) => {
    return prisma.resource.findUnique({ where: { id: resourceId } });
  },

  getById: async ({ resourceId }: ResourceId) => {
    return prisma.resource.findUnique({
      where: { id: resourceId },
      include: {
        module: {
          select: { id: true, name: true },
        },
        masterObject: {
          select: {
            id: true,
            name: true,
            key: true,
            fieldDefinitions: true,
          },
        },
      },
    });
  },

  findByKey: async (key: string) => {
    return prisma.resource.findUnique({ where: { key } });
  },

  findByNameAndTenant: (name: string) => {
    return prisma.resource.findFirst({
      where: { name },
    });
  },

  findManyByIds: (ResourceIds: string[]) => {
    return prisma.resource.findMany({
      where: { id: { in: ResourceIds } },
    });
  },

  isDuplicateName: async (name: string, resourceId: string) => {
    return prisma.resource.findFirst({
      where: {
        name,
        id: { not: resourceId },
      },
    });
  },

  findResourceWithActiveSchema: async (resourceKey: string) => {
    return prisma.resource.findUnique({
      where: { key: resourceKey },
      include: {
        masterObject: {
          include: {
            schemas: {
              where: { status: "PUBLISHED" },
              orderBy: { version: "desc" },
              take: 1,
              include: {
                fieldDefinitions: {
                  include: {
                    fieldReference: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  // //////////////////////////
  // findResourceWithSchema: async (resourceId: string) => {
  //   return prisma.resource.findUnique({
  //     where: { id: resourceId },
  //     include: {
  //       masterObject: {
  //         include: {
  //           fieldDefinitions: {
  //             where: { deletedAt: null },
  //             orderBy: { createdAt: "asc" },
  //           },
  //           schemas: {
  //             where: { status: "PUBLISHED" },
  //             orderBy: { version: "desc" },
  //             take: 1,
  //           },
  //         },
  //       },
  //     },
  //   });
  // },

findResourceWithSchema: async (resourceId: string) => {
  return prisma.resource.findUnique({
    where: { id: resourceId },
    include: {
      masterObject: {
        include: {
          schemas: {
            where: { status: "PUBLISHED" },
            orderBy: { version: "desc" },
            take: 1,
            include: {
              fieldDefinitions: {
                where: {
                  isActive: true,
                  deletedAt: null,
                  
                },
                orderBy: { order: "asc" },
                include: {
                  fieldPermissions: true,
                  fieldValidationRules: true,
                  fieldFormula: true,
                  fieldReference: true,
                  fieldConditionBindings: true,
                },
              },
            },
          },
        },
      },
    },
  });
},
  // fetchReferenceRecords: async (fieldId: string, parentValue?: string) => {
  //   const ref = await prisma.fieldReference.findUnique({
  //     where: { fieldId },
  //     include: { targetObject: true },
  //   });

  //   if (!ref) throw new Error("Reference config not found");

  //   return prisma.masterRecord.findMany({
  //     where: {
  //       masterObjectId: ref.targetObjectId,
  //       ...(parentValue && {
  //         data: { path: ["parent"], equals: parentValue },
  //       }),
  //     },
  //     take: 50,
  //   });
  // },
fetchDistinctFieldValues: async (fieldKey: string) => {
  const records = await prisma.masterRecord.findMany({
    select: { data: true },
    take: 1000,
  });

  const values = new Set<string>();

  for (const r of records) {
    if (
      r.data &&
      typeof r.data === "object" &&
      !Array.isArray(r.data)
    ) {
      const obj = r.data as Prisma.JsonObject;
      const val = obj[fieldKey];

      if (val !== undefined && val !== null && val !== "") {
        values.add(String(val));
      }
    }
  }

  return Array.from(values);
},



  searchReferenceRecords: async (fieldId: string, q: string) => {
    const ref = await prisma.fieldReference.findUnique({
      where: { fieldId },
      select: { displayFieldKey: true },
    });

    if (!ref || !ref.displayFieldKey) {
      throw new Error(
        `Reference misconfigured: displayFieldKey missing for fieldId=${fieldId}`,
      );
    }

    return prisma.recordFieldIndex.findMany({
      where: {
        fieldKey: ref.displayFieldKey, // ✅ guaranteed string
        stringValue: {
          contains: q,
          mode: "insensitive",
        },
      },
      take: 20,
    });
  },

  existsReference: async (fieldId: string, value: string) => {
    const ref = await prisma.fieldReference.findUnique({
      where: { fieldId },
      select: { displayFieldKey: true },
    });

    if (!ref || !ref.displayFieldKey) {
      throw new Error(
        `Reference misconfigured: displayFieldKey missing for fieldId=${fieldId}`,
      );
    }

    return prisma.recordFieldIndex.findFirst({
      where: {
        fieldKey: ref.displayFieldKey, // ✅ guaranteed string
        stringValue: value,
      },
    });
  },
};

export default resourcesRepository;

const buildModuleWhere = (filters: ResourceFilterInput) => {
  const where: any = {};

  // Search
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { key: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  // Name filter
  if (filters.name) {
    where.name = { contains: filters.name, mode: "insensitive" };
  }

  // Active / inactive / archived
  if (filters.isActive === "active") {
    where.isActive = true;
    where.deletedAt = null;
  } else if (filters.isActive === "inactive") {
    where.isActive = false;
    where.deletedAt = { not: null };
  }

  // isSystem
  if (filters.isSystem === "true") where.isSystem = true;
  else if (filters.isSystem === "false") where.isSystem = false;

  // Date filters
  if (filters.createdFrom || filters.createdTo) {
    where.createdAt = {};
    if (filters.createdFrom) {
      where.createdAt.gte = new Date(filters.createdFrom);
    }
    if (filters.createdTo) {
      const end = new Date(filters.createdTo);
      end.setHours(23, 59, 59, 999);
      where.createdAt.lte = end;
    }
  }

  return where;
};

type JsonObject = Prisma.JsonObject;

function isPlainJsonObject(
  value: Prisma.JsonValue | null | undefined,
): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asObject(value: Prisma.JsonValue | null | undefined): JsonObject {
  return isPlainJsonObject(value) ? value : {};
}

function getJsonString(
  obj: Prisma.JsonValue | null | undefined,
  key: string,
): string {
  if (!isPlainJsonObject(obj)) return "";
  const v = obj[key];
  return v == null ? "" : String(v);
}
