import { getCity } from "../apiExternal/openweathermap/hourlyApi";
import { ICity } from "../models/subscribtion.model";

export const checkCity = async (
  city: string,
): Promise<{
  isCity: boolean;
  city?: ICity;
  status: number;
  message?: string;
}> => {
  if (!city)
    return {
      isCity: false,
      status: 400,
      message: "Invalid request. City is not",
    };

  if (typeof city !== "string")
    return {
      isCity: false,
      status: 400,
      message: `Invalid request. City: "${city}" - is not string`,
    };

  try {
    const geoCity: ICity | null = await getCity(city);
    if (!geoCity)
      return {
        isCity: false,
        status: 404,
        message: `Invalid request. City: "${city}" - is not correct`,
      };
    return {
      isCity: true,
      city: {
        name: geoCity.name,
        lat: geoCity.lat,
        lon: geoCity.lon,
      },
      status: 200,
    };
  } catch (err) {
    return { isCity: false, status: 400, message: `Server error: ${err}` };
  }
};
