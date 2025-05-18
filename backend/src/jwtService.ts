import jwt from "jsonwebtoken";
import { Frequency, ICity } from "./models/subscribtion.model";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export type TPayload = {
  email: string;
  city: ICity;
  frequency: Frequency;
};

export const getToken = (payload: TPayload, time: string | null = null) => {
  const params: { [key: string]: string } = {};
  if (time) params.expiresIn = time;
  return jwt.sign({ ...payload }, JWT_SECRET, params);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
