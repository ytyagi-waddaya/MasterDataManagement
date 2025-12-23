// runtime/mappers/mapFields.ts
export function mapFields(fields) {
    return fields.map((f) => {
        const visibility = getVisibilityFromConfig(f.config);
        return {
            key: f.key,
            label: f.label,
            config: typeof f.config === "object" && f.config !== null ? f.config : {},
            isSystem: f.isSystem,
            isLocked: f.isLocked,
            isRequired: f.isRequired,
            order: f.order,
            permissions: f.fieldPermissions.map((p) => ({
                roleId: p.roleId,
                userId: p.userId,
                canRead: p.canRead,
                canWrite: p.canWrite,
                condition: typeof p.condition === "object" && p.condition !== null
                    ? p.condition
                    : undefined,
            })),
            visibility,
        };
    });
}
/* ---------------------------------------------
   SAFE JSON EXTRACTION
--------------------------------------------- */
function getVisibilityFromConfig(config) {
    if (typeof config === "object" &&
        config !== null &&
        !Array.isArray(config) &&
        "visibility" in config) {
        const v = config.visibility;
        if (typeof v === "object" && v !== null && !Array.isArray(v)) {
            return v;
        }
    }
    return { visible: true };
}
//# sourceMappingURL=mapFields.js.map