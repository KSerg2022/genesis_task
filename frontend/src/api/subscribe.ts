import type { TSubscribe } from "../type/type";

export const subscribe = async ({ email, city, frequency }: TSubscribe) => {
  console.log("subscribe", email, city, frequency);

  const res = await fetch("http://localhost:5000/api/subscribe", {
    method: "POST",
    // headers: { "Content-Type": "application/оыщт" },
    // body: JSON.stringify({ email, city, frequency }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ email, city, frequency }).toString(),
  });

  return await res.json();
};
