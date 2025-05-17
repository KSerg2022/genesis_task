import { Router } from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Frequency, Subscription } from "../models/subscribtion.model";
import { retrieveCity } from "../db/action/retrieveCity";
import { ICity } from "../models/city.model ";
import { TGeoCity } from "../types";
import { saveCity } from "../db/action/saveCity";
import { getCity } from "../apiExternal/openweathermap/hourlyApi";
import mongoose from "mongoose";
import { User } from "../models/user.model";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email",
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post("/subscribe", async (req, res) => {
  const { email, city, frequency } = req.body;

  const isInternetData = await checkInternetData(email, city, frequency);
  if (!isInternetData.internetData)
    return res.status(500).json({
      message: "Invalid request data.",
      info: isInternetData.message,
    });

  const token = jwt.sign(
    { email, cityId: isInternetData.cityId, frequency },
    JWT_SECRET,
    { expiresIn: "1h" },
  );
  const confirmUrl = `${BASE_URL}/api/confirm?token=${token}`;

  try {
    await transporter.sendMail({
      from: '"No Reply" <noreply@example.com>',
      to: email,
      subject: "Please confirm your subscription",
      html: `<div>
      <p>The link is valid for one hour!</p>
      <p>Click to confirm: <a href="${confirmUrl}">${confirmUrl}</a></p>
      </din>`,
    });
    return res.json({ message: `Confirmation email sent ${confirmUrl}` });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send email", error });
  }
});

export default router;

export const checkInternetData = async (
  email: string,
  city: string,
  frequency: Frequency,
): Promise<{
  internetData: boolean;
  message: { [key: string]: string };
  cityId?: mongoose.Types.ObjectId | null;
}> => {
  const isEmail = checkEmail(email);
  const isCity = await checkCity(city);
  const isFrequency = checkFrequency(frequency);

  const message: { [key: string]: string } = {};
  if (isEmail && isCity.isCity && isFrequency)
    return { internetData: true, message: message, cityId: isCity.cityId };
  if (!isEmail) message.email = `Email: "${email}" is not valid"`;
  if (!isFrequency)
    message.frequency = `Frequency can be only: "${Frequency.HOURLY}" or "${Frequency.DAILY}"`;
  if (!isCity.isCity) message.city = isCity.message;
  return { internetData: false, message: message, cityId: isCity.cityId };
};

const checkEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const checkFrequency = (frequency: Frequency): boolean => {
  if (frequency === Frequency.DAILY || frequency === Frequency.HOURLY)
    return true;
  return false;
};

const checkCity = async (
  city: string,
): Promise<{
  isCity: boolean;
  message: string;
  cityId: mongoose.Types.ObjectId | null;
}> => {
  let geoCity: ICity | TGeoCity | null = null;
  try {
    geoCity = await retrieveCity(city as string);
    if (!geoCity) {
      geoCity = await getCity(city);
      if (!geoCity)
        return {
          isCity: false,
          message: "Invalid request. City is not correct",
          cityId: null,
        };
      if ("name" in geoCity) {
        const isCityInDb: ICity | null = await retrieveCity(geoCity.name);
        if (!isCityInDb) {
          const newCity = await saveCity(geoCity);
          return {
            isCity: true,
            message: "",
            cityId:
              newCity && "_id" in newCity
                ? (newCity._id as mongoose.Types.ObjectId)
                : null,
          };
        }

        return {
          isCity: true,
          message: "",
          cityId:
            isCityInDb && "_id" in isCityInDb
              ? (isCityInDb._id as mongoose.Types.ObjectId)
              : null,
        };
      }
    }
    return {
      isCity: true,
      message: "",
      cityId:
        geoCity && "_id" in geoCity
          ? (geoCity._id as mongoose.Types.ObjectId)
          : null,
    };
  } catch (err) {
    return { isCity: false, message: `Server error: ${err}`, cityId: null };
  }
};
