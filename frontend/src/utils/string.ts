export const capitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.toLowerCase().slice(1, str.length)}`;

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

export const removeWhiteSpacesWith = (str: string, char?: string) =>
  str.replace(/\s/g, char ? char : "_");

export const getRandomItemFromStringArray = (arr: string[]) =>
  arr[Math.ceil(Math.random() * (arr.length - 1))];
