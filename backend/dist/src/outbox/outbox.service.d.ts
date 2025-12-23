export declare const OutboxService: {
    /**
     * Use inside tx:
     * await tx.$transaction(async (tx) => {
     *   await OutboxService.createOutboxEvent(tx, {...});
     * });
     */
    createOutboxEvent: (tx: any, opts: {
        entity: string;
        action: string;
        payload: any;
        tenantId?: string | null;
        targetUsers?: string[] | null;
        maxAttempts?: number;
    }) => Promise<any>;
};
//# sourceMappingURL=outbox.service.d.ts.map