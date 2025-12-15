export const safe = (v: any) => JSON.parse(JSON.stringify(v));

export function cleanUndefined<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  ) as T;
}
