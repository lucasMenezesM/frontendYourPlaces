import { useEffect, useState } from "react";
import axios from "axios";

export function useGetPlaces(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    async function getPlaces() {
      try {
        setIsLoading(true);
        const response = await axios.get(url);
        setData(response);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        console.log(err);
        setIsLoading(false);
      }
    }
    getPlaces();
  }, [url]);

  return { isLoading, err, data };
}
