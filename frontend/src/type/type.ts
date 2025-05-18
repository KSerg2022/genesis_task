export const Frequency = {
  HOURLY: "hourly",
  DAILY: "daily",
} as const;

export type TFrequency = (typeof Frequency)[keyof typeof Frequency];

export type TSubscribe = {
  email: string;
  city: string;
  frequency: TFrequency;
};
