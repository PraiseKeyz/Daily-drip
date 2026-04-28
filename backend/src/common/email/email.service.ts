import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;
  private readonly fromName = 'DailyDrip';
  private readonly primaryColor = '#22b06e';
  private readonly appUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.appUrl = this.configService.get<string>('APP_URL') || 'http://localhost:3001';

    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: this.configService.get<number>('SMTP_PORT') === 465,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  private getBaseTemplate(content: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DailyDrip</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f4f0;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4f0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header / Logo -->
          <tr>
            <td align="center" style="padding:0 0 24px 0;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:${this.primaryColor};border-radius:12px;padding:10px 12px;vertical-align:middle;">
                    <span style="font-size:20px;color:#fff;">💧</span>
                  </td>
                  <td style="padding-left:10px;vertical-align:middle;">
                    <span style="font-size:22px;font-weight:700;color:#1c1a17;letter-spacing:-0.5px;">DailyDrip</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;padding:40px;border:1px solid #e8e4dc;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 0 0 0;">
              <p style="margin:0;font-size:12px;color:#888;line-height:1.6;">
                You're receiving this email because you signed up for DailyDrip.<br/>
                If you didn't, you can safely ignore this email.
              </p>
              <p style="margin:12px 0 0 0;font-size:12px;color:#aaa;">
                © 2025 DailyDrip. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }

  async sendWelcomeEmail(to: string, firstName: string): Promise<void> {
    const content = `
      <h1 style="margin:0 0 8px 0;font-size:26px;font-weight:700;color:#1c1a17;">
        Welcome to DailyDrip, ${firstName}! 💧
      </h1>
      <p style="margin:0 0 24px 0;font-size:15px;color:#6b6560;line-height:1.7;">
        You've just taken a powerful step towards financial discipline. DailyDrip helps you 
        lock your money into envelopes and release it to yourself daily — so you never 
        overspend your budget again.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px 0;">
        <tr>
          <td style="background:#f0fdf6;border-left:3px solid ${this.primaryColor};border-radius:8px;padding:16px 20px;">
            <p style="margin:0;font-size:14px;color:#166534;font-weight:600;">Here's how it works:</p>
            <ul style="margin:8px 0 0 0;padding:0 0 0 18px;font-size:14px;color:#15803d;line-height:1.8;">
              <li>Transfer money into your DailyDrip wallet</li>
              <li>Create an envelope (e.g. "Transport for June")</li>
              <li>Set a daily release amount and sit back</li>
              <li>Every day, your money drips into your available balance</li>
            </ul>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 28px 0;font-size:15px;color:#6b6560;line-height:1.7;">
        But first — please verify your email address to unlock your account.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <a href="${this.appUrl}/dashboard"
               style="display:inline-block;background:${this.primaryColor};color:#fff;text-decoration:none;
                      font-size:15px;font-weight:600;padding:14px 36px;border-radius:10px;letter-spacing:0.2px;">
              Go to Dashboard →
            </a>
          </td>
        </tr>
      </table>`;

    await this.transporter.sendMail({
      from: `"${this.fromName}" <noreply@dailydrip.com>`,
      to,
      subject: `Welcome to DailyDrip, ${firstName}! 💧`,
      html: this.getBaseTemplate(content),
    });
  }

  async sendVerificationEmail(to: string, firstName: string, token: string): Promise<void> {
    const verifyUrl = `${this.appUrl}/verify-email?token=${token}`;

    const content = `
      <h1 style="margin:0 0 8px 0;font-size:24px;font-weight:700;color:#1c1a17;">
        Verify your email address
      </h1>
      <p style="margin:0 0 28px 0;font-size:15px;color:#6b6560;line-height:1.7;">
        Hi ${firstName}, click the button below to verify your email address and 
        activate your DailyDrip account. This link expires in <strong>24 hours</strong>.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px 0;">
        <tr>
          <td align="center">
            <a href="${verifyUrl}"
               style="display:inline-block;background:${this.primaryColor};color:#fff;text-decoration:none;
                      font-size:15px;font-weight:600;padding:14px 36px;border-radius:10px;letter-spacing:0.2px;">
              Verify Email Address
            </a>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 8px 0;font-size:13px;color:#9c958e;">Or copy and paste this link into your browser:</p>
      <p style="margin:0;font-size:12px;color:${this.primaryColor};word-break:break-all;">${verifyUrl}</p>`;

    await this.transporter.sendMail({
      from: `"${this.fromName}" <noreply@dailydrip.com>`,
      to,
      subject: 'Verify your DailyDrip email address',
      html: this.getBaseTemplate(content),
    });
  }

  async sendPasswordResetEmail(to: string, firstName: string, token: string): Promise<void> {
    const resetUrl = `${this.appUrl}/reset-password?token=${token}`;

    const content = `
      <h1 style="margin:0 0 8px 0;font-size:24px;font-weight:700;color:#1c1a17;">
        Reset your password
      </h1>
      <p style="margin:0 0 24px 0;font-size:15px;color:#6b6560;line-height:1.7;">
        Hi ${firstName}, we received a request to reset your DailyDrip password.
        Click the button below to choose a new one. This link expires in <strong>1 hour</strong>.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px 0;">
        <tr>
          <td style="background:#fff8f0;border-left:3px solid #f97316;border-radius:8px;padding:14px 18px;">
            <p style="margin:0;font-size:13px;color:#9a3412;">
              ⚠️ If you didn't request a password reset, you can safely ignore this email. Your password will not change.
            </p>
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px 0;">
        <tr>
          <td align="center">
            <a href="${resetUrl}"
               style="display:inline-block;background:#dc2626;color:#fff;text-decoration:none;
                      font-size:15px;font-weight:600;padding:14px 36px;border-radius:10px;letter-spacing:0.2px;">
              Reset My Password
            </a>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 8px 0;font-size:13px;color:#9c958e;">Or copy and paste this link into your browser:</p>
      <p style="margin:0;font-size:12px;color:#dc2626;word-break:break-all;">${resetUrl}</p>`;

    await this.transporter.sendMail({
      from: `"${this.fromName}" <noreply@dailydrip.com>`,
      to,
      subject: 'Reset your DailyDrip password',
      html: this.getBaseTemplate(content),
    });
  }
}
