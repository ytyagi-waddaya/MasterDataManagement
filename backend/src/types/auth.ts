
export interface UserJwtPayload {
  id: string;
  email: string;

  type: string;        // INTERNAL | EXTERNAL
  status: string;      // ACTIVE | SUSPENDED
  departmentIds: string[];
  location?: string | null;
  attributes?: any;

  iat?: number;
  exp?: number;
}