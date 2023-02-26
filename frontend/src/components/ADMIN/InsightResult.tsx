import { Alert, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useMemo } from "react";
import { BsBookmarkStar } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useFetch from "../../hooks/useFetch";
import { InsightReportResponse } from "../../models/Admin";
import { getInsightFacts } from "../../utils/reports";
import { capitalizeEachFirst } from "../../utils/string";
import Loader from "../Loader";

const InsightResult = () => {
  const [searchParams] = useSearchParams();

  const { data, error, fetchData, isLoading } =
    useFetch<InsightReportResponse>();

  useEffect(() => {
    fetchData(
      `admin/${
        searchParams.get("type") === "Normal" ? "place" : "business"
      }/${searchParams.get("id")}`,
      {
        method: "GET",
        type: "authenticated",
      }
    );
  }, []);

  const facts = useMemo(() => getInsightFacts(data), [data]);

  if (isLoading) {
    return (
      <Box
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Loader />
      </Box>
    );
  }

  return (
    <Box p="2rem">
      <Typography fontSize="1.2rem" fontWeight="bold">
        {capitalizeEachFirst(data?.place.name || "")}
      </Typography>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
        py="1rem"
      >
        <BsBookmarkStar size={20} />
        <Typography fontSize="1rem" fontWeight="bold">
          Facts
        </Typography>
      </Box>
      <Alert severity="info" sx={{ my: "1rem", fontSize: "1rem" }}>
        This place is highly popular among {facts.ageGroup} age group
      </Alert>
      <Alert severity="success" sx={{ my: "1rem", fontSize: "1rem" }}>
        This place is highly popular among the viewers from {facts.country}
      </Alert>
      <Alert severity="warning" sx={{ my: "1rem", fontSize: "1rem" }}>
        This place is more popular among {facts.gender} viewers than{" "}
        {facts.gender === "male" ? "female" : "male"} viewers
      </Alert>
      <Alert severity="error" sx={{ my: "1rem", fontSize: "1rem" }}>
        {facts.homeCountryViews} of the viewes are from its home country{" "}
        {data?.place?.country}
      </Alert>
      <Grid container mt="2rem" gap={1} justifyContent="space-between">
        <Grid
          item
          xs={12}
          height="500px"
          border={"1px solid #EAE9EE"}
          borderRadius={3}
          p="1rem"
        >
          <Typography fontSize="1rem" fontWeight="bold">
            Views By Age Groups
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data?.ageViews}
                dataKey="views"
                cx="50%"
                cy="50%"
                fill="#FF385C"
                labelLine={false}
                label={({ _id, percent }) =>
                  `(${_id} years) : ${(percent * 100).toFixed(0)}%`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
        <Grid
          item
          xs={12}
          height="500px"
          border={"1px solid #EAE9EE"}
          borderRadius={3}
          p="1rem"
        >
          <Typography fontSize="1rem" fontWeight="bold">
            Views By Gender
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data?.genderViews}
                dataKey="views"
                cx="50%"
                cy="50%"
                fill="#069C60"
                labelLine={false}
                label={({ _id, percent }) =>
                  `${_id} : ${(percent * 100).toFixed(0)}%`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
        <Grid
          item
          xs={12}
          height="500px"
          border={"1px solid #EAE9EE"}
          borderRadius={3}
          p="1rem"
        >
          <Typography fontSize="1rem" fontWeight="bold">
            Views By Countries
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data?.countryViews}
                dataKey="views"
                cx="50%"
                cy="50%"
                fill="#B13786"
                labelLine={false}
                label={({ _id, percent }) =>
                  `${_id} : ${(percent * 100).toFixed(0)}%`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
        <Grid
          item
          xs={12}
          height="500px"
          border={"1px solid #EAE9EE"}
          borderRadius={3}
          p="1rem"
        >
          <Typography fontSize="1rem" fontWeight="bold" mt="2rem">
            Monthly Views
          </Typography>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data?.monthlyPlaceViews || []}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#2598FF"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
        {data?.monthlyBookings && (
          <Grid
            item
            xs={12}
            height="500px"
            border={"1px solid #EAE9EE"}
            borderRadius={3}
            p="1rem"
          >
            <Typography fontSize="1rem" fontWeight="bold" mt="2rem">
              Monthly Bookings
            </Typography>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={data?.monthlyBookings || []}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#2598FF"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default InsightResult;
