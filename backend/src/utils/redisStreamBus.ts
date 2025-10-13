// src/utils/redisStreamBus.ts
import { redisClient, redisConfig } from "./redis";
import Redis from "ioredis";
import logger from "./logger";

/**
 * Registry for active stream consumers so they can be stopped during shutdown.
 */
const activeStreamConsumers = new Set<{ stop: () => Promise<void> }>();

export function registerStreamConsumer(ctrl: { stop: () => Promise<void> }) {
  activeStreamConsumers.add(ctrl);
  // wrap stop so the controller removes itself from the registry once stopped
  const origStop = ctrl.stop.bind(ctrl);
  ctrl.stop = async () => {
    try {
      await origStop();
    } finally {
      activeStreamConsumers.delete(ctrl);
    }
  };
  return ctrl;
}

export async function stopAllStreamConsumers() {
  const copy = [...activeStreamConsumers];
  for (const c of copy) {
    try {
      await c.stop();
    } catch (err) {
      logger.warn("[RedisStreamBus] Failed to stop a consumer", { err });
    }
  }
}

/**
 * Publish to a Redis Stream (uses shared client).
 */
export const RedisStreamBus = {
  async publish(stream: string, event: Record<string, any>) {
    try {
      await redisClient.xadd(stream, "*", "data", JSON.stringify(event));
      logger.debug(`[RedisStreamBus] Event published to stream "${stream}"`);
    } catch (err) {
      logger.error(`[RedisStreamBus] Failed to publish to ${stream}`, { err });
      throw err;
    }
  },

  /**
   * Start a consumer that reads via XREADGROUP with BLOCK.
   * Returns a controller with stop() to gracefully exit the loop.
   *
   * Usage:
   * const { stop } = await consumeStream({ stream, group, consumer, handler });
   * // later on shutdown: await stop();
   */
  async consumeStream(options: {
    stream: string;
    group: string;
    consumer: string;
    handler: (event: any) => Promise<void>;
    blockMs?: number; // optional blocking timeout, default 5s
    count?: number; // how many messages to read at once
  }) {
    const { stream, group, consumer, handler, blockMs = 5000, count = 10 } = options;
    const client = new Redis(redisConfig);

    client.on("error", (err) =>
      logger.error(`[RedisStreamBus] consumer error`, { stream, group, consumer, err })
    );
    client.on("end", () =>
      logger.info(`[RedisStreamBus] consumer disconnected`, { stream, group, consumer })
    );

    // Ensure group exists
    try {
      await client.xgroup("CREATE", stream, group, "$", "MKSTREAM");
      logger.info(`[RedisStreamBus] Created group "${group}" for stream "${stream}"`);
    } catch (err: any) {
      // BUSYGROUP means group already exists
      if (!err.message?.includes?.("BUSYGROUP")) {
        logger.error(`[RedisStreamBus] Failed to create group`, { err, stream, group });
        client.disconnect();
        throw err;
      }
    }

    let running = true;
    const stop = async () => {
      running = false;
      try {
        // quit politely
        await client.quit();
      } catch {
        try {
          client.disconnect();
        } catch {}
      }
      logger.info(`[RedisStreamBus] consumer stopped`, { stream, group, consumer });
    };

    // Consumer loop (async)
    (async function loop() {
      while (running) {
        try {
          const entries = (await (client as any).xreadgroup(
            "GROUP",
            group,
            consumer,
            "BLOCK",
            blockMs,
            "COUNT",
            count,
            "STREAMS",
            stream,
            ">"
          )) as [string, [string, string[]][]][] | null;

          if (entries) {
            for (const [, messages] of entries) {
              for (const [id, fields] of messages) {
                try {
                  const dataIndex = fields.findIndex((f) => f === "data");
                  const raw = dataIndex !== -1 ? fields[dataIndex + 1] : null;
                  const payload = raw ? JSON.parse(raw) : null;

                  if (payload) {
                    await handler(payload);
                    await client.xack(stream, group, id);
                    logger.debug(`[RedisStreamBus] Acked message ${id} from ${stream}`);
                  } else {
                    // Nothing to process, ack to avoid blocking repeated reads if you want
                    await client.xack(stream, group, id);
                  }
                } catch (err) {
                  logger.error(`[RedisStreamBus] Handler failed`, { err, stream, id });
                  // Optionally push to dead-letter stream
                  try {
                    await client.xadd(
                      `${stream}-dead`,
                      "*",
                      "failed",
                      JSON.stringify({ id, error: String(err) })
                    );
                  } catch (e) {
                    logger.error(`[RedisStreamBus] Failed to push to dead-letter`, { err: e });
                  }
                }
              }
            }
          }
        } catch (err) {
          logger.warn(`[RedisStreamBus] xreadgroup error — backing off`, { err, stream, group });
          // backoff to avoid tight loop on Redis error
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
    })();

    // register controller so shutdown can stop this consumer
    const controller = { stop };
    registerStreamConsumer(controller);

    return controller;
  },
};
