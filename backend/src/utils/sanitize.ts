// utils/sanitize.ts

/**
 * Omit sensitive fields from an object
 * @param obj Object to sanitize
 * @param fields Fields to remove (default: ["password"])
 */
export function sanitize<T extends Record<string, any>>(
  obj: T,
  fields: (keyof T)[] = ["password"]
): Omit<T, keyof T> {
  if (!obj) return obj;
  const sanitized = { ...obj };
  fields.forEach((f) => delete sanitized[f]);
  return sanitized;
}

/**
 * Sanitize an array of objects
 * @param arr Array of objects
 * @param fields Fields to remove (default: ["password"])
 */
export function sanitizeArray<T extends Record<string, any>>(
  arr: T[],
  fields: (keyof T)[] = ["password"]
): Omit<T, keyof T>[] {
  if (!arr || !Array.isArray(arr)) return arr;
  return arr.map((item) => sanitize(item, fields));
}


export function sanitizeArrayShallow<T extends Record<string, any>>(
  arr: T[],
  fields: (keyof T)[] = ["password"]
): T[] {
  return arr.map((item) => {
    const sanitized = { ...item };
    for (const field of fields) {
      delete sanitized[field];
    }
    return sanitized;
  });
}
