import { format } from "date-fns";

export const greet = () => {
  const hours = new Date().getHours();

  if (hours < 12) {
    return "Good Morning";
  }

  if (hours < 18) {
    return "Good Afternoon";
  }

  if (hours < 24) {
    return "Good Evening";
  }
};

export const getDate = (distanceFromToday: number = 1) => {
  return format(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * distanceFromToday),
    "yyyy-MM-dd"
  );
};
