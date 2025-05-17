import { City, ICity } from "../../models/city.model ";

export const retrieveCity = async (city: string): Promise<ICity | null> => {
  const query = City.where({ city: city });
  const isCity = await query.findOne();
  // console.log("++++++++", isCity);
  if (!isCity) return null;
  return isCity;
};
