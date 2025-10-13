// // src/socket/index.ts
// import http from "http";
// import { Server as IOServer } from "socket.io";
// import { redisConfig } from "../utils/redis"; // from earlier shared config
// import { createClient } from "redis";
// import { createAdapter } from "@socket.io/redis-adapter";
// import logger from "../utils/logger";

// /**
//  * Initialize Socket.IO with Redis adapter for horizontal scaling.
//  * Returns the io instance and a shutdown helper.
//  */
// export async function setupSocketIO(server: http.Server) {
//   const io = new IOServer(server, {
//     cors: {
//       origin: process.env.SOCKET_ORIGINS?.split(",") ?? "*", // set proper origins in prod
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//     pingTimeout: 30000,
//     pingInterval: 25000,
//     transports: ["websocket", "polling"],
//   });

//   // create adapter pub/sub clients using node-redis (not ioredis)
//   const pubClient = createClient({
//     socket: { host: redisConfig.host as string, port: redisConfig.port as number },
//     password: (redisConfig as any).password,
//   });
//   const subClient = pubClient.duplicate();

//   pubClient.on("error", (err) => logger.error("socket redis pubClient error", { err }));
//   subClient.on("error", (err) => logger.error("socket redis subClient error", { err }));

//   await Promise.all([pubClient.connect(), subClient.connect()]);
//   io.adapter(createAdapter(pubClient, subClient));

//   // Simple auth example: token-based from query (use proper auth in prod)
//   io.use((socket, next) => {
//     try {
//       const token = socket.handshake.auth?.token ?? socket.handshake.query?.token;
//       // validate token and set socket.data.user
//       if (!token) return next(); // allow anonymous if you want
//       // TODO: verify token (JWT, session)
//       socket.data.user = { id: token }; // replace with real decode
//       return next();
//     } catch (err) {
//       return next(err as any);
//     }
//   });

//   io.on("connection", (socket) => {
//     logger.info("socket connected", { id: socket.id, user: socket.data.user });

//     // Optionally join user-specific room
//     if (socket.data.user?.id) {
//       socket.join(`user_${socket.data.user.id}`);
//     }

//     socket.on("join", (room) => socket.join(room));
//     socket.on("leave", (room) => socket.leave(room));

//     socket.on("disconnect", (reason) => {
//       logger.info("socket disconnected", { id: socket.id, reason });
//     });
//   });

//   async function shutdown() {
//     try {
//       await io.close();
//       await pubClient.disconnect();
//       await subClient.disconnect();
//       logger.info("Socket.IO shutdown complete");
//     } catch (err) {
//       logger.warn("Socket.IO shutdown error", { err });
//     }
//   }

//   return { io, shutdown };
// }

// src/socket/index.ts (replace adapter creation block)
import http from "http";
import { Server as IOServer } from "socket.io";
import { redisConfig } from "../utils/redis"; // from earlier shared config
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import logger from "../utils/logger";

/**
 * Initialize Socket.IO with Redis adapter for horizontal scaling.
 * Returns the io instance and a shutdown helper.
 */
export async function setupSocketIO(server: http.Server) {
  const io = new IOServer(server, {
    cors: {
      origin: process.env.SOCKET_ORIGINS?.split(",") ?? "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
    pingTimeout: 30000,
    pingInterval: 25000,
    transports: ["websocket", "polling"],
  });

  // Build node-redis client options carefully (only include password if set)
  const pubClientOpts: any = {};
  if (redisConfig.host) pubClientOpts.socket = pubClientOpts.socket || {};
  if (redisConfig.host) pubClientOpts.socket.host = String(redisConfig.host);
  if (redisConfig.port) pubClientOpts.socket = pubClientOpts.socket || {};
  if (redisConfig.port) pubClientOpts.socket.port = Number(redisConfig.port);
  // only include password when it's a non-empty string
  const suppliedPassword = (redisConfig as any).password;
  if (typeof suppliedPassword === "string" && suppliedPassword.length > 0) {
    pubClientOpts.password = suppliedPassword;
  }

  // Create pub/sub clients
  const pubClient = createClient(pubClientOpts);
  const subClient = pubClient.duplicate();

  // attach more informative error handlers
  const attachHandlers = (c: any, name: string) => {
    c.on("error", (err: any) => {
      try {
        // try to extract meaningful message
        const info = { message: err?.message ?? String(err), stack: err?.stack };
        logger.error(`socket redis ${name} error`, { err: info });
      } catch {
        logger.error(`socket redis ${name} error (uninspectable error)`);
      }
    });
    c.on("connect", () => logger.info(`socket redis ${name} connect`));
    c.on("ready", () => logger.info(`socket redis ${name} ready`));
    c.on("end", () => logger.info(`socket redis ${name} end`));
    c.on("reconnecting", () => logger.warn(`socket redis ${name} reconnecting`));
  };

  attachHandlers(pubClient, "pubClient");
  attachHandlers(subClient, "subClient");

  try {
    // try connecting and fail fast with useful logs
    await pubClient.connect();
    await subClient.connect();
    logger.info("Socket.IO redis pub/sub clients connected");
  } catch (err) {
    // if socket.io adapter depends on redis being available, decide if you should throw or continue.
    logger.error("Failed to connect socket.io redis clients", {
      err: { message: (err as any)?.message ?? String(err), stack: (err as any)?.stack },
    });
    // close clients if partially connected
    try { await pubClient.disconnect(); } catch {}
    try { await subClient.disconnect(); } catch {}
    // rethrow to let startup decide (or return io and continue if sockets are optional)
    throw err;
  }

  io.adapter(createAdapter(pubClient, subClient));

  // ... auth, event handlers, etc (unchanged) ...

  async function shutdown() {
    try {
      await io.close();
      try { await pubClient.disconnect(); } catch (e) { logger.debug("pubClient disconnect failed", { e }); }
      try { await subClient.disconnect(); } catch (e) { logger.debug("subClient disconnect failed", { e }); }
      logger.info("Socket.IO shutdown complete");
    } catch (err) {
      logger.warn("Socket.IO shutdown error", { err });
    }
  }

  return { io, shutdown };
}
