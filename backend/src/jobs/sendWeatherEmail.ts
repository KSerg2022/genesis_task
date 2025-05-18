import { weatherApi } from "../apiExternal/openweathermap/hourlyApi";
import { sendWeatherEmail } from "../emailService";
import { getToken } from "../jwtService";
import { Frequency, Subscription } from "../models/subscribtion.model";

export const doWeatherJob = async (period: Frequency) => {
  const subs = await Subscription.find({ frequency: period });

  for (const sub of subs) {
    if (!sub.city || !sub.email) continue;

    const tokenUnSubscribe = getToken({
      email: sub.email,
      city: sub.city,
      frequency: sub.frequency,
    });

    const weather = await weatherApi(sub.city.lat, sub.city.lon);

    sendWeatherEmail(sub, tokenUnSubscribe, weather);
  }
};
