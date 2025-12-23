// src/notifications/channels/email.channel.ts
import nodemailer from "nodemailer";
import { logger } from "../../utils/logger.js";
/**
 * Simple nodemailer wrapper. Replace with your templating + provider integration.
 * In production, use connection pooling, retries, and proper templates.
 */
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "localhost",
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
export async function sendEmail(to, subject, html) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html,
        });
    }
    catch (err) {
        logger.error("[email.channel] sendEmail failed", err);
        throw err;
    }
}
//# sourceMappingURL=email.channel.js.map