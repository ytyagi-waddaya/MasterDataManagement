export interface UserJwtPayload {
    id: string;
    email: string;
    type: string;
    status: string;
    department?: string | null;
    location?: string | null;
    attributes?: any;
    iat?: number;
    exp?: number;
}
//# sourceMappingURL=auth.d.ts.map