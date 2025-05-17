import { Router } from "express";
import { getCity, weatherApi } from "../apiExternal/openweathermap/hourlyApi";
import { ICity } from "../models/city.model ";
import { TGeoCity, TWeatherResponse } from "../types";
import { retrieveCity } from "../db/action/retrieveCity";
import { saveCity } from "../db/action/saveCity";
const router = Router();

router.get("/", async (req, res) => {
  const { city } = req.query;
  console.log(city);
  if (!city) return res.status(400).json({ message: "Invalid request" });
  let geoCity: ICity | TGeoCity | null = null;
  try {
    geoCity = await retrieveCity(city as string);
    if (!geoCity) {
      geoCity = await getCity(city as string);
      if (!geoCity)
        return res
          .status(400)
          .json({ message: "Invalid request. City is not correct" });
    }
    try {
      let weather: TWeatherResponse | null = null;
      if ("name" in geoCity) {
        const isCityInDb: ICity | null = await retrieveCity(geoCity.name);
        if (!isCityInDb) await saveCity(geoCity);
        weather = await weatherApi(geoCity.lat, geoCity.lon);
      } else {
        weather = await weatherApi(geoCity.location.lat, geoCity.location.lon);
      }
      // console.log("wether ----", weather);
      res.json(weather);
    } catch (err) {
      res.status(500).json({ message: `Server error: ${err}` });
    }
  } catch (err) {
    res.status(500).json({ message: `Server error: ${err}` });
  }
});

export default router;
