import nodemailer from "nodemailer";
import { TPayload } from "./jwtService";
import { TWeather } from "./types";
import { ISubscription } from "./models/subscribtion.model";

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
  payload: TPayload,
  token: string,
): Promise<void> => {
  const confirmUrl = `${BASE_URL}/api/confirm/${token}`;

  await transporter.sendMail({
    from: '"No Reply" <noreply@example.com>',
    to: payload.email,
    subject: "Please confirm your subscription",
    html: `
    <div>
      <h2>Your subscription:</h2>
        <ul>
          <li>city: ${payload.city.name}</li>
          <li>frequency: ${payload.frequency}</li>
        </ul>
      <hr>
      <h3>The link is valid for one hour!</h3>
      <p>Click to subscribe: <a href="${confirmUrl}">${confirmUrl}</a></p>
    </div>
        `,
  });
};

export const confirmEmail = async (
  payload: TPayload,
  token: string,
): Promise<void> => {
  const confirmUrl = `${BASE_URL}/api/unconfirm/${token}`;

  await transporter.sendMail({
    from: '"No Reply" <noreply@example.com>',
    to: payload.email,
    subject: "Your subscription",
    html: `
    <div>
      <h2>Thank you for confirming your subscription!</h2>
        <h3>Your subscription:</h3>
        <ul>
          <li>city: ${payload.city.name}</li>
          <li>frequency: ${payload.frequency}</li>
        </ul>
      <hr>
      <p>To unsubscribe, click the link: <a href="${confirmUrl}">${confirmUrl}</a></p>
    </div>
    `,
  });
};

export const sendWeatherEmail = async (
  sub: ISubscription,
  weather: TWeather,
): Promise<void> => {
  const confirmUrl = `${BASE_URL}/api/unconfirm/${sub.tokenUnSubscribe}`;

  await transporter.sendMail({
    from: '"No Reply" <noreply@example.com>',
    to: sub.email,
    subject: `Weather in the city ${sub.city.name}.`,
    html: `
      <div>
        <h2>Weather in the city ${sub.city.name}.</h2>
        <h3>Current:</h3>
        <ul>
          <li>Temperature: ${weather.temperature}</li>
          <li>Humidity: ${weather.humidity}</li>
          <li>Description: ${weather.description}</li>
        </ul>
        <hr>
        <h4>Your subscription:</h4>
        <ul>
          <li>city: ${sub.city.name}</li>
          <li>frequency: ${sub.frequency}</li>
        </ul>
        <p>To unsubscribe, click the link:: <a href="${confirmUrl}">${confirmUrl}</a></p>
      </div>
    `,
  });
};
