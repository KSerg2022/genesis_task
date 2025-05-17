import nodemailer from "nodemailer";
import { TPayload } from "./jwtService";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email",
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const subscribeEmail = async (
  email: string,
  token: string,
): Promise<void> => {
  const confirmUrl = `${BASE_URL}/api/confirm/${token}`;

  await transporter.sendMail({
    from: '"No Reply" <noreply@example.com>',
    to: email,
    subject: "Please confirm your subscription",
    html: `<div>
        <p>The link is valid for one hour!</p>
        <p>Click to subscribe: <a href="${confirmUrl}">${confirmUrl}</a></p>
        </din>`,
  });
};

export const confirmEmail = async (
  email: string,
  token: string,
  payload: TPayload,
): Promise<void> => {
  const confirmUrl = `${BASE_URL}/api/unconfirm/${token}`;

  await transporter.sendMail({
    from: '"No Reply" <noreply@example.com>',
    to: email,
    subject: "Please confirm your subscription",
    html: `<div>
    <p>Thank you for confirming your subscription.!</p>
    <p>Your subscription:
        city: ${payload.city},
        frequency: ${payload.frequency}.
    </p>
    <p>To unsubscribe, click the link:: <a href="${confirmUrl}">${confirmUrl}</a></p>
    </din>`,
  });
};
