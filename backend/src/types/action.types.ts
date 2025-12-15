import { PerformedByType } from "../../prisma/generated/client.js";

// inside users.service.ts (or wherever ActorMeta is declared)
export type ActorMeta = {
  actorId?: string | null | undefined; // allow undefined explicitly
  ipAddress?: string | null | undefined;
  userAgent?: string | null | undefined;
  performedBy?: PerformedByType | undefined;
};
