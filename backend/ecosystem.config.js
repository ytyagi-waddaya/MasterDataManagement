// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "api",
      script: "dist/server.js",
      instances: "max",
      exec_mode: "cluster",
      env: { NODE_ENV: "production" },
    },
    {
      name: "outbox-worker",
      script: "dist/workers/outbox.worker.js",
      instances: 1,
      autorestart: true,
      env: { NODE_ENV: "production" },
    },
    {
      name: "notification-worker",
      script: "dist/workers/notification.worker.js",
      instances: 2,
      autorestart: true,
      env: { NODE_ENV: "production" },
    },
    {
      name: "eventbus-worker",
      script: "dist/workers/eventbus.worker.js",
      instances: 1,
      autorestart: true,
      env: { NODE_ENV: "production" },
    },
    {
      name: "stream-reclaimer",
      script: "dist/workers/stream.reclaimer.worker.js",
      instances: 1,
      autorestart: true,
      env: { NODE_ENV: "production" },
    },
  ],
};
