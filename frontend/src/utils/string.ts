export const capitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1, str.length)}`;

export const capitalizeEachFirst = (str: string) => {
  // str = str.trim();
  // let capitalizedStr = "";
  // for (let i = 0; i < str.length; i++) {
  //   if (i === 0) {
  //     capitalizedStr = capitalizedStr + str.charAt(i).toUpperCase();
  //   } else if (str.charAt(i - 1) === " ") {
  //     capitalizedStr = capitalizedStr + str.charAt(i).toUpperCase();
  //   } else {
  //     capitalizedStr = capitalizedStr + str.charAt(i);
  //   }
  // }
  // return capitalizedStr;

 return str.split(" ").reduce((newStr, currentStr) => {
    return `${newStr} ${capitalize(currentStr)}`;
  }, "");
};
