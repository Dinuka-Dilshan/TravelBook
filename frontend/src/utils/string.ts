export const capitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1, str.length)}`;

export const capitalizeEachFirst = (str: string) => {
  return str.split(" ").reduce((newStr, currentStr) => {
    return `${newStr} ${capitalize(currentStr)}`;
  }, "");
};

export const truncate = (str: string, length: number) => {
  if (str.length < length) {
    return str;
  } else {
    return `${str.slice(0, length)}...`;
  }
};

