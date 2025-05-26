import { useCallback, useState } from "react";
import { Frequency, type TFrequency, type TSubscribe } from "../type/type";
import { subscribe } from "../api/subscribe";

export const Subscribe = () => {
  const [formData, setFormData] = useState<TSubscribe>({
    email: "",
    city: "",
    frequency: Frequency.HOURLY
  });

  const submitFunc = useCallback(async () => {
    if (formData.city && formData.email && formData.frequency) {
      const response = await subscribe({
        email: formData.email,
        city: formData.city,
        frequency: formData.frequency
      });

      console.log("response", response);
    }
  }, [formData]);

  //   console.log("formData", formData);
  return (
    <div className="p-6 max-w-md mx-auto">
      <form
        className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md"
        onSubmit={e => {
          e.preventDefault();
          submitFunc();
        }}
      >
        <h2 className="text-xl font-semibold text-gray-800">Subscribe</h2>

        <div className="flex flex-col">
          <label htmlFor="Email" className="text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            id="Email"
            type="email"
            className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
            value={formData.email}
            onChange={e => {
              setFormData({
                ...formData,
                email: e.target.value
              });
            }}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="City" className="text-sm font-medium text-gray-700">
            City:
          </label>
          <input
            id="City"
            type="text"
            className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your city"
            required
            value={formData.city}
            onChange={e => {
              setFormData({
                ...formData,
                city: e.target.value
              });
            }}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="Frequency"
            className="text-sm font-medium text-gray-700"
          >
            Frequency:
          </label>
          <select
            id="Frequency"
            className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.frequency}
            onChange={e => {
              console.log(e);
              setFormData({
                ...formData,
                frequency: e.target.value as TFrequency
              });
            }}
          >
            <option value={Frequency.HOURLY}>{Frequency.HOURLY}</option>
            <option value={Frequency.DAILY}>{Frequency.DAILY}</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};
