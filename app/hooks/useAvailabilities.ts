import { useState } from "react";
import axios from "axios";

export default function useAvailabilities() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<
    { time: string; available: boolean }[] | null
  >(null);

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: {
    slug: string;
    partySize: string;
    day: string;
    time: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/sport/${slug}/availability`,
        {
          // params is used to pass query parameters to the API route
          // exmaple: /api/sport/sport-slug/availability?day=2021-10-10&time=18:00&partySize=2
          // the query parameters are accessed in the API route via req.query.day, req.query.time, req.query.partySize
          params: {
            day,
            time,
            partySize,
          },
          // or you can use string interpolation to build the URL
          // example: `http://localhost:3000/api/sport/${slug}/availability?day=${day}&time=${time}&partySize=${partySize}`,
        }
      );
      console.log(response);
      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };

  return { loading, data, error, fetchAvailabilities };
}
