import { FieldDefinition, FieldPermission } from "../../../prisma/generated/client.js";
import { RuntimeField } from "../domain.js";
type PrismaField = FieldDefinition & {
    fieldPermissions: FieldPermission[];
};
export declare function mapFields(fields: PrismaField[]): RuntimeField[];
export {};
//# sourceMappingURL=mapFields.d.ts.map