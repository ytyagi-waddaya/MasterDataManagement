// // every minute or via a dedicated scheduler
// const due = await prisma.notificationDelivery.findMany({
//   where: {
//     scheduledAt: { lte: new Date() },
//     sentAt: null,
//   }
// });
// for (const d of due) {
//   await RedisStreamBus.publish("notifications-stream", { deliveryId: d.id, userId: d.userId, channels: d.channels });
// }
