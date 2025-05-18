import { Router } from "express";
import { weatherApi } from "../apiExternal/openweathermap/hourlyApi";
import { checkCity } from "../utils/checkCity";

const router = Router();

router.get("/", async (req, res) => {
  const { city } = req.query;

  const isCity = await checkCity(city as string);
  if (!isCity.isCity)
    return res.status(isCity.status).json({ message: isCity.message });

  try {
    if (isCity.city) {
      const weather = await weatherApi(isCity.city?.lat, isCity.city?.lon);
      return res.json(weather);
    }
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err}` });
  }
});

export default router;
