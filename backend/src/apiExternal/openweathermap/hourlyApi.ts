import { ICity } from "../../models/subscribtion.model";
import { TWeather, TWeatherResponse } from "../../types";

const API_WETHER = process.env.API_WETHER || "";
export const weatherApi = async (
  lat: number,
  lon: number,
): Promise<TWeather> => {
  const hourlyApi = `https://pro.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_WETHER}&units=metric`;

  const res: TWeatherResponse = await fetchFunc(hourlyApi);
  const result: TWeather = {
    temperature: res.main.temp,
    humidity: res.main.humidity,
    description: res.weather[0].description,
  };
  return result;
};

export const getCity = async (
  cityName: string,
  stateCode: string = "",
  countryCode: string = "",
  limit: number = 2,
): Promise<ICity | null> => {
  if (!cityName) return null;
  const geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${API_WETHER}`;

  const res = await fetchFunc(geoApi);
  const firstCity = res[0];
  return firstCity;
};

const fetchFunc = async (url: string) => {
  const paramRequest = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, paramRequest);
  if (!response.ok) {
    const err = await response.json();
    throw new Error(`HTTP error! status: ${response.status}, ${err.message}`);
  }
  const data = await response.json();
  return data;
};
