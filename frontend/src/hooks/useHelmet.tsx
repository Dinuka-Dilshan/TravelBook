import { useEffect, useRef } from "react";
import { capitalizeEachFirst } from "../utils/string";

const useHelmet = (title: string | undefined) => {
  const titleRef = useRef<string>();

  useEffect(() => {
    if (!titleRef.current) {
      titleRef.current = document.title;
    }
    if (title) {
      document.title = capitalizeEachFirst(title);
    }

    return () => {
      if (titleRef.current) {
        document.title = titleRef.current;
      }
    };
  }, [title]);
};

export default useHelmet;
