/**
 * Higher-level NotificationService:
 * - transactional notify (writes outbox inside tx)
 * - non-transactional convenience notify (creates deliveries directly)
 */
export declare const NotificationService: {
    /**
     * Non-transactional convenience
     */
    notifyUsers: (opts: {
        userIds: string[];
        title: string;
        message: string;
        data?: any;
        channels?: string[];
        tenantId?: string | null;
        actorId?: string | null;
    }) => Promise<string[]>;
    /**
     * Transactional notification that uses Outbox:
     * Use inside domain tx so event only created on commit.
     *
     * Example usage:
     * await prisma.$transaction(async (tx) => {
     *   await tx.module.update(...);
     *   await NotificationService.notifyUsersTransactional(tx, {...});
     * });
     */
    notifyUsersTransactional: (tx: any, opts: {
        userIds: string[];
        title: string;
        message: string;
        data?: any;
        tenantId?: string | null;
        actorId?: string | null;
    }) => Promise<any>;
};
//# sourceMappingURL=notification.service.d.ts.map