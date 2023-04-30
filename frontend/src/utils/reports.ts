import { InsightReportResponse } from "../models/Admin";

export const getInsightFacts = (report: InsightReportResponse | undefined) => {
  if (!report)
    return {
      ageGroup: "",
      country: "",
      gender: "",
      homeCountryViews: "",
    };
  const ageGroup = [...report.ageViews].sort((a, b) => b.views - a.views);
  const country = [...report.countryViews].sort((a, b) => b.views - a.views);
  const gender = [...report.genderViews].sort((a, b) => b.views - a.views);
  const totalViews = report.ageViews.reduce((acc, item) => acc + item.views, 0);
  const homeCountryViews =
    report.countryViews.find(
      (view) => view._id?.toLowerCase() === report.place.country?.toLowerCase()
    )?.views || 0;
  return {
    ageGroup: ageGroup[0]?._id,
    country: country[0]?._id,
    gender: gender[0]?._id,
    homeCountryViews: `${((homeCountryViews / totalViews) * 100).toFixed(0)}%`,
  };
};
