// src/outbox/outbox.repository.ts
import { prisma } from "../lib/prisma.js";
export const OutboxRepository = {
    /**
     * Create OutboxEvent inside the SAME transaction as domain write.
     */
    create: (tx, event) => {
        return tx.outboxEvent.create({
            data: {
                eventName: event.eventName,
                entity: event.entity,
                action: event.action,
                payload: event.payload, // Prisma.Json OK
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
    `);
    },
    lock: (id) => prisma.outboxEvent.update({
        where: { id },
        data: { lockedAt: new Date() }
    }),
    markProcessed: (id) => prisma.outboxEvent.update({
        where: { id },
        data: { processedAt: new Date(), lockedAt: null }
    }),
    incrementAttempts: (id) => prisma.outboxEvent.update({
        where: { id },
        data: { attempts: { increment: 1 }, lockedAt: null }
    }),
    /**
     * Mark event as failed (moves to DLQ via worker)
     */
    moveToFailed: (id) => prisma.outboxEvent.update({
        where: { id },
        data: { processedAt: new Date(), lockedAt: null }
    }),
    writeEventLog: (data) => prisma.eventLog.create({ data }),
};
//# sourceMappingURL=outbox.repository.js.map