// src/utils/logger.ts
import fs from "fs";
import path from "path";
import morgan from "morgan";
import chalk from "chalk";
import stripAnsi from "strip-ansi";

import { createLogger, format, transports, Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { config } from "../config/app.config.js"; // adjust path

const { combine, timestamp, printf, errors } = format;

// Ensure logs directory exists
const logDir = path.resolve("logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

// NOTE:
// Chalk auto-detects color support and respects the FORCE_COLOR env var.
// If you want to force color in non-TTY environments, set FORCE_COLOR=1 when launching node:
//    FORCE_COLOR=1 node dist/index.js
//
// Avoid using `new Chalk(...)` to keep TypeScript typings simple and compatible with Chalk v5.

// --- Types ---
interface HttpMeta {
  component: "http";
  method: string;
  url: string;
  status: number;
  responseTime: string;
  requestId?: string;
  ip?: string;
}

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }
}

// --- Helpers ---
const formatTimestamp = (iso: string) => {
  const d = new Date(iso);
  const YYYY = d.getFullYear();
  const MM = String(d.getMonth() + 1).padStart(2, "0");
  const DD = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `[${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}]`;
};

const levelColors: Record<string, (s: string) => string> = {
  INFO: chalk.green,
  WARN: chalk.yellow,
  ERROR: chalk.red,
  DEBUG: chalk.blue,
  VERBOSE: chalk.magenta,
};

const colorStatus = (status: number) => {
  if (status >= 500) return chalk.red(String(status));
  if (status >= 400) return chalk.redBright(String(status));
  if (status >= 300) return chalk.yellow(String(status));
  if (status >= 200) return chalk.green(String(status));
  return chalk.white(String(status));
};

function isHttpMeta(obj: unknown): obj is HttpMeta {
  if (!obj || typeof obj !== "object") return false;
  const o = obj as any;
  return (
    o.component === "http" &&
    typeof o.method === "string" &&
    typeof o.url === "string" &&
    typeof o.status === "number" &&
    typeof o.responseTime === "string"
  );
}

// create a printf formatter. Returns a winston Format element when invoked
const createPrintf = (stripAnsiCodes = false) =>
  printf(({ level, message, timestamp: ts, stack, ...meta }: any) => {
    const levelKey = (level || "info").toUpperCase();
    const tsVal = typeof ts === "string" ? ts : new Date().toISOString();
    const colorFn = levelColors[levelKey] ?? ((s: string) => s);

    // HTTP structured logs
    if (isHttpMeta(meta)) {
      const m = meta as HttpMeta;
      const line = [
        `[${colorFn(levelKey)}]`,
        formatTimestamp(tsVal),
        ":",
        chalk.cyan(m.method),
        chalk.green(m.url),
        colorStatus(m.status as number),
        chalk.magenta(m.responseTime),
        `reqId=${chalk.blue(m.requestId ?? "-")}`,
        `IP=${m.ip ?? "-"}`,
      ].join(" ");
      return stripAnsiCodes ? stripAnsi(line) : line;
    }

    // Generic logs
    const metaEntries =
      meta && Object.keys(meta).length
        ? " " +
          Object.entries(meta)
            .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
            .join(" ")
        : "";

    const main = stack || message;
    const line = `[${colorFn(levelKey)}] ${formatTimestamp(tsVal)} : ${main}${metaEntries}`;
    return stripAnsiCodes ? stripAnsi(line) : line;
  });

// --- Logger instance ---
const isProd = config.NODE_ENV === "production";

const logger: Logger = createLogger({
  level: config.LOG_LEVEL || "info",
  format: combine(timestamp(), errors({ stack: true })), // timestamp provided for printf
  transports: [
    // Info+ file (ANSI stripped)
    new DailyRotateFile({
      filename: path.join(logDir, "application-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      zippedArchive: true,
      level: "info",
      format: combine(timestamp(), createPrintf(true)),
    }),
    // Errors file
    new DailyRotateFile({
      filename: path.join(logDir, "error-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      zippedArchive: true,
      level: "error",
      format: combine(timestamp(), createPrintf(true)),
    }),
  ],
});

// Console transport -- explicit about stripping or preserving ANSI
logger.add(
  new transports.Console({
    level: config.LOG_LEVEL || "info",
    format: combine(timestamp(), createPrintf(isProd)), // strip ANSI in prod (isProd=true)
  })
);

// Exceptions logging
logger.exceptions.handle(
  new DailyRotateFile({
    filename: path.join(logDir, "exceptions-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    maxFiles: "30d",
    zippedArchive: true,
    format: combine(timestamp(), createPrintf(true)),
  })
);

// --- Morgan HTTP middleware helper ---
export function httpLogger() {
  return morgan((tokens: any, req: any, res: any) => {
    try {
      const responseTimeToken = tokens["response-time"];
      const responseTimeRaw =
        typeof responseTimeToken === "function" ? responseTimeToken(req, res) : undefined;
      const responseTime = responseTimeRaw != null ? `${responseTimeRaw}ms` : "-";

      const methodToken = tokens.method;
      const urlToken = tokens.url;
      const statusToken = tokens.status;
      const remoteAddrToken = tokens["remote-addr"];

      const method =
        typeof methodToken === "function" ? methodToken(req, res) ?? req.method : req.method;
      const url =
        typeof urlToken === "function" ? urlToken(req, res) ?? req.originalUrl : req.originalUrl;

      const statusFromToken =
        typeof statusToken === "function" ? statusToken(req, res) : undefined;
      const status = Number(statusFromToken ?? res.statusCode ?? 0) || 0;

      const ip =
        typeof remoteAddrToken === "function"
          ? remoteAddrToken(req, res) ?? req.ip
          : req.ip ?? "-";

      const meta: HttpMeta = {
        component: "http",
        method,
        url,
        status,
        responseTime,
        ip,
        requestId: (req as any).requestId,
      };

      logger.info("HTTP request", meta);
    } catch (e) {
      logger.warn("HTTP logging failed", { err: e });
    }
    return "";
  });
}

/**
 * captureConsole
 * Call this early (before libraries like redis are imported) to forward console.* -> winston.
 * Returns a restore function to put back original console methods.
 */
export function captureConsole() {
  const origLog = console.log;
  const origWarn = console.warn;
  const origError = console.error;
  const origDebug = console.debug;

  console.log = (...args: any[]) => {
    logger.info(args.map(argToString).join(" "));
    origLog(...args);
  };
  console.warn = (...args: any[]) => {
    logger.warn(args.map(argToString).join(" "));
    origWarn(...args);
  };
  console.error = (...args: any[]) => {
    logger.error(args.map(argToString).join(" "));
    origError(...args);
  };
  console.debug = (...args: any[]) => {
    logger.debug(args.map(argToString).join(" "));
    origDebug(...args);
  };

  return function restoreConsole() {
    console.log = origLog;
    console.warn = origWarn;
    console.error = origError;
    console.debug = origDebug;
  };
}

function argToString(a: any) {
  try {
    if (typeof a === "string") return a;
    return JSON.stringify(a, null, 2);
  } catch {
    return String(a);
  }
}

export default logger;
export { logger };
