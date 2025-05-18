import { Agenda } from "agenda";
import { Frequency } from "./models/subscribtion.model";
import { doWeatherJob } from "./jobs/sendWeatherEmail";

const mongoConnectionString =
  process.env.MONGO_URI || "mongodb://localhost:27017/weather";

export const agenda = new Agenda({
  db: { address: mongoConnectionString, collection: "jobs" },
});

agenda.define("send hourly emails", async () => {
  await doWeatherJob(Frequency.DAILY);
});

agenda.define("send daily emails", async () => {
  await doWeatherJob(Frequency.HOURLY);
});

export const startAgenda = async () => {
  await agenda.start();
  await agenda.every("0 * * * *", "send hourly emails"); // каждый час
  await agenda.every("0 8 * * *", "send daily emails"); // каждый день в 8 утра
};
