// src/notifications/channels/sms.channel.ts
import { logger } from "../../utils/logger.js";

/**
 * SMS stub. Replace with Twilio or other provider integration.
 */
export async function sendSms(phoneOrUserId: string, message: string) {
  // TODO: resolve phone from userId if needed
  logger.info("[sms.channel] sending SMS (stub)", phoneOrUserId, message);
  // throw new Error("SMS provider failure"); // example if provider fails
}
