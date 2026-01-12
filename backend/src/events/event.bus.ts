// // src/events/event.bus.ts
// import { appPub } from "../redis/client.js";
// import { logger } from "../utils/logger.js";
// import type { BroadcastPayload, EventEntity, EventAction } from "./event.registry.js";

// const CHANNEL = "erp:events";

// /**
//  * Create a strongly-typed broadcast payload.
//  * Use this to build events consistently throughout the app.
//  *
//  * Note: opts fields are permissive (null | undefined) to play nicely with Prisma Json and exactOptionalPropertyTypes.
//  */
// export function createEvent(
//   entity: EventEntity,
//   action: EventAction,
//   payload: any,
//   opts?: {
//     tenantId?: string | null | undefined;
//     targetUsers?: string[] | null | undefined;
//     actorId?: string | null | undefined;
//     outboxId?: string | null | undefined;
//   }
// ): BroadcastPayload {
//   const eventName = `${entity}.${action}` as `${EventEntity}.${EventAction}`;

//   return {
//     entity,
//     action,
//     event: eventName,
//     payload,
//     tenantId: opts?.tenantId ?? null,
//     targetUsers: opts?.targetUsers ?? null,
//     actorId: opts?.actorId ?? null,
//     outboxId: opts?.outboxId ?? null,
//     timestamp: new Date().toISOString(),
//   };
// }

// /**
//  * High-level broadcast. Recommended for application code that needs fast realtime broadcast.
//  * For guaranteed delivery (zero-loss), the outbox → outbox.worker → broadcastEventDirect flow should be used.
//  *
//  * This function is best-effort: it publishes the event to Redis pubsub immediately.
//  */
// export async function broadcastEvent(
//   entity: EventEntity,
//   action: EventAction,
//   payload: any,
//   opts?: {
//     tenantId?: string | null;
//     targetUsers?: string[] | null;
//     actorId?: string | null;
//   }
// ) {
//   const evt = createEvent(entity, action, payload, {
//     tenantId: opts?.tenantId ?? null,
//     targetUsers: opts?.targetUsers ?? null,
//     actorId: opts?.actorId ?? null,
//   });

//   try {
//     await appPub.publish(CHANNEL, JSON.stringify(evt));
//   } catch (err) {
//     logger.error("[event.bus] broadcastEvent failed", err);
//   }
// }

// /**
//  * direct publish used by Outbox worker — accepts already created BroadcastPayload and publishes it.
//  * Outbox worker should call this after reading an OutboxEvent and building the BroadcastPayload.
//  */
// export async function broadcastEventDirect(evt: BroadcastPayload) {
//   try {
//     await appPub.publish(CHANNEL, JSON.stringify(evt));
//   } catch (err) {
//     logger.error("[event.bus] broadcastEventDirect failed", err);
//   }
// }

import { appPub, USE_REDIS } from "../redis/client.js";
import { logger } from "../utils/logger.js";
import type {
  BroadcastPayload,
  EventEntity,
  EventAction,
} from "./event.registry.js";

const CHANNEL = "erp:events";

/* ======================================================
   FACTORY
====================================================== */

export function createEvent(
  entity: EventEntity,
  action: EventAction,
  payload: any,
  opts?: {
    tenantId?: string | null | undefined;
    targetUsers?: string[] | null | undefined;
    actorId?: string | null | undefined;
    outboxId?: string | null | undefined;
  }
): BroadcastPayload {
  const eventName = `${entity}.${action}` as `${EventEntity}.${EventAction}`;

  return {
    entity,
    action,
    event: eventName,
    payload,
    tenantId: opts?.tenantId ?? null,
    targetUsers: opts?.targetUsers ?? null,
    actorId: opts?.actorId ?? null,
    outboxId: opts?.outboxId ?? null,
    timestamp: new Date().toISOString(),
  };
}

/* ======================================================
   BROADCAST (best effort)
====================================================== */

export async function broadcastEvent(
  entity: EventEntity,
  action: EventAction,
  payload: any,
  opts?: {
    tenantId?: string | null;
    targetUsers?: string[] | null;
    actorId?: string | null;
  }
) {
  if (!USE_REDIS || !appPub) {
    logger.warn("[event.bus] redis disabled, skipping broadcastEvent");
    return;
  }

  const evt = createEvent(entity, action, payload, {
    tenantId: opts?.tenantId ?? null,
    targetUsers: opts?.targetUsers ?? null,
    actorId: opts?.actorId ?? null,
  });

  try {
    await appPub.publish(CHANNEL, JSON.stringify(evt));
  } catch (err) {
    logger.error("[event.bus] broadcastEvent failed", err);
  }
}

/* ======================================================
   DIRECT BROADCAST (outbox worker)
====================================================== */

export async function broadcastEventDirect(evt: BroadcastPayload) {
  if (!USE_REDIS || !appPub) {
    logger.warn(
      "[event.bus] redis disabled, skipping broadcastEventDirect"
    );
    return;
  }

  try {
    await appPub.publish(CHANNEL, JSON.stringify(evt));
  } catch (err) {
    logger.error("[event.bus] broadcastEventDirect failed", err);
  }
}
