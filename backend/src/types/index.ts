import { ISubscription } from "../models/subscribtion.model";
import { IWeather } from "../models/weather.model";

export type TSubscription = Pick<
  ISubscription,
  "email" | "city" | "frequency" | "confirmed"
>;

export type TGeoCity = {
  name: string;
  lat: number;
  lon: number;
};

export type TWeather = Pick<
  IWeather,
  "temperature" | "humidity" | "description"
>;

export type TWeatherResponse = {
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
};
