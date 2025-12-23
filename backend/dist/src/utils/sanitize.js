// utils/sanitize.ts
/**
 * Omit sensitive fields from an object
 * @param obj Object to sanitize
 * @param fields Fields to remove (default: ["password"])
 */
export function sanitize(obj, fields = ["password"]) {
    if (!obj)
        return obj;
    const sanitized = { ...obj };
    fields.forEach((f) => delete sanitized[f]);
    return sanitized;
}
/**
 * Sanitize an array of objects
 * @param arr Array of objects
 * @param fields Fields to remove (default: ["password"])
 */
export function sanitizeArray(arr, fields = ["password"]) {
    if (!arr || !Array.isArray(arr))
        return arr;
    return arr.map((item) => sanitize(item, fields));
}
export function sanitizeArrayShallow(arr, fields = ["password"]) {
    return arr.map((item) => {
        const sanitized = { ...item };
        for (const field of fields) {
            delete sanitized[field];
        }
        return sanitized;
    });
}
//# sourceMappingURL=sanitize.js.map