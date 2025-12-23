export const safe = (v) => JSON.parse(JSON.stringify(v));
export function cleanUndefined(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
}
//# sourceMappingURL=sanitize.js.map