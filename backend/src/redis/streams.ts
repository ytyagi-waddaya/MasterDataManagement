// // src/redis/streams.ts
// import { redis } from "./client.js";
// import { config } from "../config/app.config.js";
// import { logger } from "../utils/logger.js";

// const STREAM = config.STREAM_KEY;
// const GROUP = config.STREAM_DGROUP;
// const DLQ = config.STREAM_DLG;

// /**
//  * Create consumer group if missing (idempotent).
//  */
// export async function ensureGroup() {
//   try {
//     await redis.xgroup("CREATE", STREAM, GROUP, "0", "MKSTREAM");
//     logger.info("[streams] group created");
//   } catch (err: any) {
//     if (String(err).includes("BUSYGROUP")) {
//       logger.info("[streams] group already exists");
//       return;
//     }
//     logger.error("[streams] xgroup error", err);
//     throw err;
//   }
// }

// /**
//  * Add JSON object to stream
//  */
// export async function addToStream(data: Record<string, any>) {
//   const flat = Object.entries(data).flatMap(([k, v]) => [
//     k,
//     typeof v === "string" ? v : JSON.stringify(v),
//   ]);

//   try {
//     return redis.xadd(STREAM, "*", ...flat);
//   } catch (err) {
//     logger.error("[streams] xadd error", err);
//     throw err;
//   }
// }

// /**
//  * Read messages using consumer group
//  */
// export async function readGroup(
//   consumer: string,
//   count = 10,
//   blockMs = 2000,
//   streamKey = STREAM   // NEW PARAM
// ) {
//   return redis.xreadgroup(
//     "GROUP",
//     GROUP,
//     consumer,
//     "COUNT",
//     count,
//     "BLOCK",
//     blockMs,
//     "STREAMS",
//     streamKey,  // use the provided stream
//     ">"
//   );
// }


// /**
//  * Acknowledge a message
//  */
// export async function ack(msgId: string) {
//   try {
//     await redis.xack(STREAM, GROUP, msgId);
//   } catch (err) {
//     logger.error("[streams] ack error", err);
//   }
// }

// /**
//  * Move a failed event to DLQ
//  */
// export async function moveToDLQ(msgId: string, payload: any, reason: string) {
//   try {
//     await redis.xadd(
//       DLQ,
//       "*",
//       "payload",
//       JSON.stringify(payload),
//       "reason",
//       reason,
//       "originalId",
//       msgId
//     );
//     await ack(msgId);
//   } catch (err) {
//     logger.error("[streams] moveToDLQ error", err);
//   }
// }

// /**
//  * Claim messages stuck in PEL (Pending Entries List)
//  */
// export async function claimStuckMessages(
//   consumer: string,
//   minIdleMs = 60000,
//   count = 100
// ) {
//   try {
//     const pending = (await redis.xpending(
//       STREAM,
//       GROUP,
//       "-",
//       "+",
//       count
//     )) as any[]; // important fix

//     const staleIds =
//       pending
//         ?.filter((p: any[]) => p && p[2] > minIdleMs) // p[2] = idle time
//         ?.map((p: any[]) => p[0]) ?? [];             // p[0] = messageId

//     if (!staleIds.length) return [];

//     return redis.xclaim(
//       STREAM,
//       GROUP,
//       consumer,
//       minIdleMs,
//       ...staleIds,
//       "JUSTID"
//     );
//   } catch (err) {
//     logger.error("[streams] claimStuckMessages error", err);
//     return [];
//   }
// }

import { redis, USE_REDIS } from "./client.js";
import { config } from "../config/app.config.js";
import { logger } from "../utils/logger.js";

const STREAM = config.STREAM_KEY;
const GROUP = config.STREAM_DGROUP;
const DLQ = config.STREAM_DLG;

export async function ensureGroup() {
  if (!USE_REDIS || !redis) {
    logger.warn("[streams] redis disabled, skipping ensureGroup");
    return;
  }

  try {
    await redis.xgroup("CREATE", STREAM, GROUP, "0", "MKSTREAM");
    logger.info("[streams] group created");
  } catch (err: any) {
    if (String(err).includes("BUSYGROUP")) return;
    logger.error("[streams] xgroup error", err);
    throw err;
  }
}

export async function addToStream(data: Record<string, any>) {
  if (!USE_REDIS || !redis) {
    logger.warn("[streams] redis disabled, skipping addToStream");
    return null;
  }

  const flat = Object.entries(data).flatMap(([k, v]) => [
    k,
    typeof v === "string" ? v : JSON.stringify(v),
  ]);

  return redis.xadd(STREAM, "*", ...flat);
}

export function readGroup(
  consumer: string,
  count = 10,
  blockMs = 2000,
  streamKey = STREAM
) {
  if (!USE_REDIS || !redis) {
    logger.warn("[streams] redis disabled, skipping readGroup");
    return null;
  }

  return redis.xreadgroup(
    "GROUP",
    GROUP,
    consumer,
    "COUNT",
    count,
    "BLOCK",
    blockMs,
    "STREAMS",
    streamKey,
    ">"
  );
}

export async function ack(msgId: string) {
  if (!USE_REDIS || !redis) return;

  try {
    await redis.xack(STREAM, GROUP, msgId);
  } catch (err) {
    logger.error("[streams] ack error", err);
  }
}
