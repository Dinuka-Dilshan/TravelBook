import { useState, useCallback } from "react";

const useFetch = <T extends any>() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<T>();

  const fetchData = useCallback((url: string, body: any) => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/${url}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        setData(data);
      })
      .catch((response) => {
        response.json().then((json: any) => {
          setError(json.message);
        });
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { isError, isLoading, error, data, fetchData };
};

export default useFetch;
