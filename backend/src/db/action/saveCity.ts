import { City, ICity } from "../../models/city.model ";
import { TGeoCity } from "../../types";

export const saveCity = async (city: TGeoCity): Promise<ICity> => {
  const newCity = new City({
    city: city.name,
    location: {
      lat: city.lat,
      lon: city.lon,
    },
  });

  return await newCity.save();
};
