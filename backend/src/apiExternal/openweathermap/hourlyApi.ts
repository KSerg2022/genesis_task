import { TGeoCity, TWeather, TWeatherResponse } from "../../types";

const API_WETHER = process.env.API_WETHER || "";
export const weatherApi = async (
  lat: number,
  lon: number,
): Promise<TWeatherResponse> => {
  const hourlyApi = `https://pro.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_WETHER}&units=metric`;
  console.log(hourlyApi);

  const res: TWeather = await fetchFunc(hourlyApi);
  const result: TWeatherResponse = {
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
): Promise<TGeoCity | null> => {
  if (!cityName) return null;
  const geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${API_WETHER}`;
  console.log(geoApi);

  const res = await fetchFunc(geoApi);
  console.log(res);
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
    console.log(err);
    console.log(err.message);

    throw new Error(`HTTP error! status: ${response.status}, ${err.message}`);
  }
  const data = await response.json();
  return data;
};
