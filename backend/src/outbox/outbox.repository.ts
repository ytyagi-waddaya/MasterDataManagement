// src/outbox/outbox.repository.ts
import { prisma } from "../lib/prisma.js";

export const OutboxRepository = {
  /**
   * Create OutboxEvent inside the SAME transaction as domain write.
   */
  create: (tx: any, event: {
    eventName: string;
    entity: string;
    action: string;
    payload: any;
    tenantId?: string | null;
    targetUsers?: string[] | null;
    maxAttempts?: number;
  }) => {
    return tx.outboxEvent.create({
      data: {
        eventName: event.eventName,
        entity: event.entity,
        action: event.action,
        payload: event.payload,              // Prisma.Json OK
        targetUsers: event.targetUsers ?? null, // Prisma.Json OK (string[] | null)
        maxAttempts: event.maxAttempts ?? 5,
      }
    });
  },

  /**
   * Fetch unprocessed events (SKIP LOCKED avoids double processing)
   */
  fetchPending: async (limit = 50) => {
    return prisma.$queryRawUnsafe(`
      SELECT * FROM "OutboxEvent"
      WHERE "processedAt" IS NULL
      ORDER BY "createdAt" ASC
      LIMIT ${limit}
      FOR UPDATE SKIP LOCKED
    `) as Promise<any[]>;
  },

  lock: (id: string) =>
    prisma.outboxEvent.update({
      where: { id },
      data: { lockedAt: new Date() }
    }),

  markProcessed: (id: string) =>
    prisma.outboxEvent.update({
      where: { id },
      data: { processedAt: new Date(), lockedAt: null }
    }),

  incrementAttempts: (id: string) =>
    prisma.outboxEvent.update({
      where: { id },
      data: { attempts: { increment: 1 }, lockedAt: null }
    }),

  /**
   * Mark event as failed (moves to DLQ via worker)
   */
  moveToFailed: (id: string) =>
    prisma.outboxEvent.update({
      where: { id },
      data: { processedAt: new Date(), lockedAt: null }
    }),

  writeEventLog: (data: {
    outboxId: string;
    eventName: string;
    payload: any;
    result: string;
  }) =>
    prisma.eventLog.create({ data }),
};
