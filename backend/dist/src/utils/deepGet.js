/**
 * Safely access nested object properties using dot-notation.
 * Example:
 * deepGet(obj, "user.department")
 * deepGet(obj, "resource.invoice.total")
 */
export function deepGet(obj, path) {
    if (!obj || !path)
        return undefined;
    const parts = path.split(".");
    let current = obj;
    for (const part of parts) {
        if (current == null ||
            typeof current !== "object" ||
            !(part in current)) {
            return undefined; // safe fail
        }
        current = current[part];
    }
    return current;
}
//# sourceMappingURL=deepGet.js.map