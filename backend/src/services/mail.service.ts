import { transporter } from '../lib/mailer';

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@mystory.edu';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

/**
 * Send temporary credentials to a newly provisioned user.
 *
 * IMPORTANT: This function NEVER throws. A failed email delivery is logged
 * and silently ignored so that the user-creation transaction is never blocked.
 * Admins can use the "Resend Credentials" action to retry.
 */
export class MailService {
  static async sendCredentialsEmail(
    to: string,
    firstName: string,
    tempPassword: string
  ): Promise<void> {
    try {
      await transporter.sendMail({
        from: `"Academix Portal" <${FROM_EMAIL}>`,
        to,
        subject: 'Your Academix Portal Credentials',
        html: `
          <div style="font-family: 'Hanken Grotesk', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f8fafc; padding: 32px 24px; border-radius: 12px;">
            <div style="background: #00522E; border-radius: 8px 8px 0 0; padding: 24px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">Academix Portal</h1>
              <p style="color: #a7f3d0; margin: 6px 0 0; font-size: 13px;">College Academic Analytics System</p>
            </div>
            <div style="background: white; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; padding: 32px 24px;">
              <p style="color: #1e293b; font-size: 15px; margin: 0 0 16px;">Hi <strong>${firstName}</strong>,</p>
              <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
                An account has been created for you on the Academix College Portal. Use the credentials below to sign in for the first time.
              </p>
              <div style="background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Your Login Email</p>
                <p style="margin: 0 0 20px; font-size: 15px; font-weight: 700; color: #0f172a;">${to}</p>
                <p style="margin: 0 0 8px; font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Temporary Password</p>
                <p style="margin: 0; font-size: 20px; font-weight: 700; color: #00522E; letter-spacing: 0.08em; font-family: monospace;">${tempPassword}</p>
              </div>
              <p style="color: #ef4444; font-size: 13px; margin: 0 0 24px;">
                ⚠️ You will be prompted to change your password on first login. This temporary password cannot be reused after that.
              </p>
              <a href="${FRONTEND_URL}/signin"
                 style="display: inline-block; background: #00522E; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                Sign In to Portal →
              </a>
              <p style="color: #94a3b8; font-size: 12px; margin: 32px 0 0;">
                If you did not expect this email, please contact your institution's administrator.
              </p>
            </div>
          </div>
        `,
      });

      console.log(`✅ Credentials email sent to ${to}`);
    } catch (err) {
      // Log but never re-throw — email failure must not block user creation
      console.error(`❌ Failed to send credentials email to ${to}:`, err);
    }
  }
}
