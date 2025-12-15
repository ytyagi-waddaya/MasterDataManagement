export type AccessLevel = "FULL" | "CONDITIONAL" | "NONE";

export type ABACRule = {
  field: string;
  operator: string;
  value: any;
};

export type ABACGroup = {
  op: "AND" | "OR";
  rules: Array<ABACRule | ABACGroup>;
};

export type PermissionShape = {
  action: string;
  resource: string;
  accessLevel: AccessLevel;
  conditions?: ABACGroup | ABACRule | null;
};

export interface UserMe {
  id: string;
  name?: string;
  email?: string;

  roles?: Array<{ id: string; name?: string; key?: string }>;

  permissions?: PermissionShape[];

  [key: string]: any;
}
