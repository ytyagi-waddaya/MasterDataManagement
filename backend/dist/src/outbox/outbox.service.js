// src/outbox/outbox.service.ts
import { OutboxRepository } from "./outbox.repository.js";
export const OutboxService = {
    /**
     * Use inside tx:
     * await tx.$transaction(async (tx) => {
     *   await OutboxService.createOutboxEvent(tx, {...});
     * });
     */
    createOutboxEvent: async (tx, opts) => {
        const eventName = `${opts.entity}.${opts.action}`;
        return OutboxRepository.create(tx, {
            eventName,
            entity: opts.entity,
            action: opts.action,
            payload: opts.payload,
            tenantId: opts.tenantId ?? null,
            targetUsers: opts.targetUsers ?? null,
            maxAttempts: opts.maxAttempts ?? 5,
        });
    },
};
//# sourceMappingURL=outbox.service.js.map