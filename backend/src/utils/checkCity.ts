import { getCity } from "../apiExternal/openweathermap/hourlyApi";
import { TGeoCity } from "../types";

export const checkCity = async (
  city: string,
): Promise<{
  isCity: boolean;
  city?: TGeoCity;
  message?: string;
}> => {
  if (!city) return { isCity: false, message: "Invalid request. City is not" };

  if (typeof city !== "string")
    return {
      isCity: false,
      message: `Invalid request. City: "${city}" - is not string`,
    };

  try {
    const geoCity: TGeoCity | null = await getCity(city);
    if (!geoCity)
      return {
        isCity: false,
        message: `Invalid request. City: "${city}" - is not correct`,
      };
    return {
      isCity: true,
      city: {
        name: geoCity.name,
        lat: geoCity.lat,
        lon: geoCity.lon,
      },
    };
  } catch (err) {
    return { isCity: false, message: `Server error: ${err}` };
  }
};
