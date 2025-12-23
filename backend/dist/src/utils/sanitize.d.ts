/**
 * Omit sensitive fields from an object
 * @param obj Object to sanitize
 * @param fields Fields to remove (default: ["password"])
 */
export declare function sanitize<T extends Record<string, any>>(obj: T, fields?: (keyof T)[]): Omit<T, keyof T>;
/**
 * Sanitize an array of objects
 * @param arr Array of objects
 * @param fields Fields to remove (default: ["password"])
 */
export declare function sanitizeArray<T extends Record<string, any>>(arr: T[], fields?: (keyof T)[]): Omit<T, keyof T>[];
export declare function sanitizeArrayShallow<T extends Record<string, any>>(arr: T[], fields?: (keyof T)[]): T[];
//# sourceMappingURL=sanitize.d.ts.map