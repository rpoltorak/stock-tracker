import { useEffect, useState } from "react";
import axios from "axios";

function useRequest(initialParams, initialData) {
  const [data, setData] = useState(initialData);
  const [params, setParams] = useState(initialParams);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const { data } = await axios(params);

        if (data["Error Message"]) {
          setIsError(true);
        } else {
          setData(data);
        }
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    if (params) {
      fetchData();
    }
  }, [params]);

  return [{ data, isLoading, isError }, setParams, setData];
}

export { useRequest };
