import { Logger } from "winston";
declare global {
    namespace Express {
        interface Request {
            requestId?: string;
        }
    }
}
declare const logger: Logger;
export declare function httpLogger(): (req: any, res: any, callback: (err?: Error) => void) => void;
/**
 * captureConsole
 * Call this early (before libraries like redis are imported) to forward console.* -> winston.
 * Returns a restore function to put back original console methods.
 */
export declare function captureConsole(): () => void;
export default logger;
export { logger };
//# sourceMappingURL=logger.d.ts.map