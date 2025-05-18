import { Frequency, ICity } from "../models/subscribtion.model";
import { checkCity } from "./checkCity";

export const checkInternetData = async (
  email: string,
  city: string,
  frequency: Frequency,
): Promise<{
  internetData: boolean;
  message?: { [key: string]: string };
  city?: ICity;
}> => {
  const isEmail = checkEmail(email);
  const isCity = await checkCity(city);
  const isFrequency = checkFrequency(frequency);

  const message: { [key: string]: string } = {};
  if (isEmail && isCity.isCity && isFrequency)
    return { internetData: true, message: message, city: isCity.city };

  if (!isEmail) message.email = `Email: "${email}" is not valid"`;

  if (!isFrequency)
    message.frequency = `Frequency can be only: "${Frequency.HOURLY}" or "${Frequency.DAILY}"`;

  if (!isCity.isCity) message.city = isCity.message || "";
  return { internetData: false, message: message };
};

const checkEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const checkFrequency = (frequency: Frequency): boolean => {
  if (frequency === Frequency.DAILY || frequency === Frequency.HOURLY)
    return true;
  return false;
};
