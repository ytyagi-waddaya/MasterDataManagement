import http from "http";
import express from "express";
export declare function createSocketServer(app: express.Express): {
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    shutdown: () => Promise<void>;
};
//# sourceMappingURL=socket.server.d.ts.map