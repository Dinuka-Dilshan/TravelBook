import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/slices/authSlice";
import { notify } from "../store/slices/notificationSlice";

const useFetch = <T extends any>() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<T>();
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();

  const fetchData = useCallback(
    (
      url: string,
      options: {
        body?: any;
        method: "POST" | "GET" | "DELETE";
        useToken: boolean;
      }
    ) => {
      setIsLoading(true);
      fetch(`${process.env.REACT_APP_API_BASE_URL}/${url}`, {
        method: options.method,
        headers: options.useToken
          ? {
              "content-type": "application/json",
              authorization: `barer ${user.token}`,
            }
          : {
              "content-type": "application/json",
            },
        body: JSON.stringify(options.body),
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
            dispatch(notify({ message: json.message, type: "ERROR" }));
          });
          setIsError(true);
        })
        .catch(() => {
          setIsError(true);
          setError("Unknown Error Occured");
          dispatch(notify({ message: "Unknown Error Occured", type: "ERROR" }));
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    []
  );

  return { isError, isLoading, error, data, fetchData };
};

export default useFetch;
