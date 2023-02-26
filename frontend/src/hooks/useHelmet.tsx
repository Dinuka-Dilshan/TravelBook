import { useEffect, useRef } from "react";
import { capitalizeEachFirst } from "../utils/string";

const useHelmet = (title: string | undefined | ((title:string) => string)) => {
  const titleRef = useRef<string>();

  useEffect(() => {
    if (!titleRef.current) {
      titleRef.current = document.title;
    }
    if (title && typeof title === "string") {
      document.title = capitalizeEachFirst(title);
    }
    if (title && typeof title === "function") {
      document.title = capitalizeEachFirst(title(document.title));
    }

    return () => {
      if (titleRef.current) {
        document.title = titleRef.current;
      }
    };
  }, [title]);
};

export default useHelmet;
