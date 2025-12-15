// src/socket/socket.server.ts
import http from "http";
import express from "express";
import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { config } from "../config/app.config.js";
import { logger } from "../utils/logger.js";
import { redisSub, redisPub } from "../redis/client.js";
import { createAdapter } from "@socket.io/redis-adapter";
import { USER_ROOM, TENANT_ROOM, GLOBAL_ROOM } from "../events/event.rooms.js";
import { markOnline, markOffline, getOnlineUsers } from "./presence.js";

type JwtPayload = {
  id: string;
  tenantId?: string | null;
  iat?: number;
  exp?: number;
  [k: string]: any;
};

export function createSocketServer(app: express.Express) {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: config.FRONTEND_ORIGIN, credentials: true },
    // pingInterval / pingTimeout etc can be tuned here
    transports: ["websocket", "polling"],
  });

  // If redis adapter available, use it for scaling / multi-instance
  try {
    // redisPub & redisSub are ioredis instances
    io.adapter(createAdapter(redisPub.duplicate(), redisSub.duplicate()));
    logger.info("[socket] redis adapter enabled");
  } catch (err) {
    logger.warn("[socket] redis adapter not enabled", err);
  }

  // Authentication middleware
  io.use((socket, next) => {
    try {
      const token =
        (socket.handshake.auth as any)?.token ||
        (socket.handshake.query && (socket.handshake.query.token as string));
      logger.info("[socket] handshake token", {
        tokenPresent: !!token,
      });
      if (!token) {
        return next(new Error("Authentication token required"));
      }

      const payload = jwt.verify(
        String(token),
        config.JWT_SECRET
      ) as JwtPayload;
      // attach user info to socket
      (socket as any).user = payload;
      return next();
    } catch (err) {
      logger.warn("[socket] auth failed", err);
      return next(new Error("Invalid token"));
    }
  });

  // On connection: join rooms
  // io.on("connection", (socket: Socket) => {
  //   const user = (socket as any).user as JwtPayload;
  //   if (!user || !user.id) {
  //     logger.warn("[socket] connected without user payload");
  //     socket.disconnect(true);
  //     return;
  //   }

  //     // 🔹 Check active connections for this user
  // const sockets = await io.in(USER_ROOM(user.id)).fetchSockets();

  // // 🔥 First connection → user came ONLINE
  // if (sockets.length === 1) {
  //   io.to(GLOBAL_ROOM).emit("user.online", {
  //     userId: user.id,
  //     at: new Date().toISOString(),
  //   });
  // }
  //   const userRoom = USER_ROOM(user.id);
  //   socket.join(userRoom);
  //   logger.info("[socket] user joined room", userRoom);

  //   if (user.tenantId) {
  //     const tenantRoom = TENANT_ROOM(String(user.tenantId));
  //     socket.join(tenantRoom);
  //     logger.info("[socket] user joined tenant room", tenantRoom);
  //   } else {
  //     socket.join(GLOBAL_ROOM);
  //     logger.info("[socket] user joined global room");
  //   }

  //   // Optional: allow clients to join resource rooms explicitly (e.g. watchers)
  //   // socket.on("join:resource", (roomName: string) => {
  //   //   try {
  //   //     // sanitize input in real code
  //   //     socket.join(roomName);
  //   //     logger.info("[socket] joined resource room", roomName, "user", user.id);
  //   //   } catch (err) {
  //   //     logger.warn("[socket] join resource failed", err);
  //   //   }
  //   // });

  //   // socket.on("leave:resource", (roomName: string) => {
  //   //   try {
  //   //     socket.leave(roomName);
  //   //     logger.info("[socket] left resource room", roomName, "user", user.id);
  //   //   } catch (err) {
  //   //     logger.warn("[socket] leave resource failed", err);
  //   //   }
  //   // });

  //   socket.on("disconnect", (reason) => {
  //     if (reason === "transport close") return;
  //       const remaining = await io.in(USER_ROOM(user.id)).fetchSockets();

  // // 🔥 No active sockets → user went OFFLINE
  // if (remaining.length === 0) {
  //   io.to(GLOBAL_ROOM).emit("user.offline", {
  //     userId: user.id,
  //     at: new Date().toISOString(),
  //   });
  // }
  //     logger.info("[socket] disconnect", { user: user.id, reason });
  //   });
  // });

  io.on("connection", async (socket: Socket) => {
    const user = (socket as any).user as JwtPayload;
    if (!user?.id) {
      socket.disconnect(true);
      return;
    }

    const userRoom = USER_ROOM(user.id);
    const tenantRoom = user.tenantId
      ? TENANT_ROOM(String(user.tenantId))
      : GLOBAL_ROOM;

        socket.on("join:resource", (resource: string) => {
    socket.join(`resource:${resource}`);
    logger.info("[socket] joined resource", {
      userId: user.id,
      resource,
    });
  });

  socket.on("leave:resource", (resource: string) => {
    socket.leave(`resource:${resource}`);
    logger.info("[socket] left resource", {
      userId: user.id,
      resource,
    });
  });
    /* ------------------------------------------------
     1️⃣ JOIN ROOMS FIRST
  ------------------------------------------------ */
    socket.join(userRoom);
    socket.join(tenantRoom);

    logger.info("[socket] user joined rooms", {
      user: user.id,
      userRoom,
      tenantRoom,
    });

    const becameOnline = await markOnline(user.id);

    if (becameOnline) {
      io.to(GLOBAL_ROOM).emit("user.online", {
        userId: user.id,
        at: new Date().toISOString(),
      });
    }

    socket.on("presence.request", async () => {
      const users = await getOnlineUsers();
      socket.emit("presence.snapshot", { users });
    });

    /* ------------------------------------------------
     4️⃣ DISCONNECT HANDLER
  ------------------------------------------------ */
    socket.on("disconnect", async (reason) => {
      logger.info("[socket] disconnect", { user: user.id, reason });

      const becameOffline = await markOffline(user.id);

      if (becameOffline) {
        io.to(GLOBAL_ROOM).emit("user.offline", {
          userId: user.id,
          at: new Date().toISOString(),
        });
      }
    });
  });

  // Subscribe to per-user pubsub channels: notifications:user:{userId}
  // Using psubscribe to receive any user channel published from other processes.
  (async function subscribeUserChannels() {
    try {
      await redisSub.psubscribe("notifications:user:*");
      logger.info("[socket] psubscribed to notifications:user:*");
    } catch (err) {
      logger.error("[socket] psubscribe notifications:user:* failed", err);
    }

    redisSub.on(
      "pmessage",
      (_pattern: string, channel: string, message: string) => {
        // 🚫 IGNORE Socket.IO internal traffic
        if (!channel.startsWith("notifications:user:")) {
          return;
        }

        if (!message) {
          logger.warn("[socket] empty redis message", { channel });
          return;
        }

        try {
          const payload = JSON.parse(message);

          const userId = channel.split(":")[2];
          if (!userId) return;

          io.to(USER_ROOM(userId)).emit("notification", payload);
        } catch (err) {
          logger.error("[socket] redis message parse error", {
            channel,
            message,
            err,
          });
        }
      }
    );
  })();

  // Subscribe to event bus channel for entity events (erp:events)
  // (async function subscribeEventBus() {
  //   try {
  //     await redisSub.subscribe("erp:events");
  //     logger.info("[socket] subscribed to erp:events");
  //   } catch (err) {
  //     logger.error("[socket] subscribe erp:events failed", err);
  //   }

  //   redisSub.on("message", ({ _channel, msg }: any) => {
  //     try {
  //       const evt = JSON.parse(msg);
  //       // evt has: { event, payload, tenantId, targetUsers }
  //       const tenantRoom = evt.tenantId
  //         ? TENANT_ROOM(String(evt.tenantId))
  //         : GLOBAL_ROOM;

  //       // 1) tenant-wide broadcast
  //       if (evt.tenantId) {
  //         io.to(tenantRoom).emit(evt.event, evt.payload);
  //       } else {
  //         // global broadcast
  //         io.to(GLOBAL_ROOM).emit(evt.event, evt.payload);
  //       }

  //       // 2) targeted users (array)
  //       if (Array.isArray(evt.targetUsers) && evt.targetUsers.length) {
  //         for (const u of evt.targetUsers) {
  //           io.to(USER_ROOM(String(u))).emit(evt.event, evt.payload);
  //         }
  //       }
  //     } catch (err) {
  //       logger.error("[socket] erp:events message parse error", err);
  //     }
  //   });
  // })();
  (async function subscribeEventBus() {
  try {
    await redisSub.subscribe("erp:events");
    logger.info("[socket] subscribed to erp:events");
  } catch (err) {
    logger.error("[socket] subscribe erp:events failed", err);
  }

  redisSub.on("message", (_channel: string, message: string) => {
    try {
        logger.info("[RT][socket] redis message received", { message });

      const evt = JSON.parse(message);

      // 🔥 CENTRALIZED ROUTING
      broadcast(io, evt);

    } catch (err) {
      logger.error("[socket] erp:events message parse error", {
        message,
        err,
      });
    }
  });
})();


  // Graceful shutdown helper
  async function shutdown() {
    logger.info("[socket] shutting down...");
    try {
      await io.close();
      redisSub.quit();
      redisPub.quit();
      redisSub.disconnect();
      redisPub.disconnect();
    } catch (err) {
      logger.error("[socket] shutdown error", err);
    }
  }

  return {
    server,
    shutdown,
  };
}

function broadcast(io: Server, evt: any) {
    logger.info("[RT][socket] broadcasting", {
    event: evt.event,
    tenantRoom: evt.tenantId ? `tenant:${evt.tenantId}` : "tenant:global",
    resourceRoom: evt.payload?.resource,
    targetUsers: evt.targetUsers,
  });
  const tenantRoom = evt.tenantId
    ? TENANT_ROOM(String(evt.tenantId))
    : GLOBAL_ROOM;

  io.to(tenantRoom).emit(evt.event, evt);

  if (evt.payload?.resource) {
    io.to(`resource:${evt.payload.resource}`).emit(evt.event, evt);
  }

  if (Array.isArray(evt.targetUsers)) {
    evt.targetUsers.forEach((uid: string) => {
      io.to(USER_ROOM(uid)).emit(evt.event, evt);
    });
  }
}

