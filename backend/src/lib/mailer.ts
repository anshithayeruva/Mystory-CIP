import nodemailer from 'nodemailer';

/**
 * Nodemailer transporter configured from environment variables.
 * Supports any SMTP provider (Gmail, Brevo, Mailgun, etc.)
 */
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});
