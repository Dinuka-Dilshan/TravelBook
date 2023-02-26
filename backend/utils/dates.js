export function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const monthlyReport = {
  January: 0,
  February: 0,
  March: 0,
  April: 0,
  May: 0,
  June: 0,
  July: 0,
  August: 0,
  September: 0,
  October: 0,
  November: 0,
  December: 0,
};

const monthNames = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//get full report with month names but as an object
const getReportWithMonthNames = (report) =>
  report.reduce((report, monthly) => {
    const month = monthNames[monthly._id];
    return { ...report, [month]: monthly };
  }, monthlyReport);

export const formatMonthlyReport = (report) => {
  const reportWithMonthNames = getReportWithMonthNames(report);
  //convert object to array
  return Object.keys(reportWithMonthNames).map((month) => {
    return {
      ...reportWithMonthNames[month],
      month,
    };
  });
};
