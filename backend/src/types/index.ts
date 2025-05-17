import { Frequency } from "../models/subscribtion.model";

export type TUser = {
  email: string;
  subscription: string[];
};

export type Subscription = {
  city: string;
  period: Frequency;
};

export type City = {
  city: string;
  location: {
    lat: number;
    lon: number;
  };
};

export type TGeoCity = {
  name: string;
  lat: number;
  lon: number;
};

export type TWeather = {
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
};

export type TWeatherResponse = {
  temperature: number;
  humidity: number;
  description: string;
};
