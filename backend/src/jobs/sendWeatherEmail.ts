import { weatherApi } from "../apiExternal/openweathermap/hourlyApi";
import { sendWeatherEmail } from "../emailService";
import { Frequency, Subscription } from "../models/subscribtion.model";

export const doWeatherJob = async (frequency: Frequency) => {
  const subs = await Subscription.find({ frequency: frequency });

  for (const sub of subs) {
    if (!sub.city || !sub.email || !sub.tokenUnSubscribe) continue;

    const weather = await weatherApi(sub.city.lat, sub.city.lon);

    sendWeatherEmail(sub, weather);
  }
};
