import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
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
import Loader from "../../components/Loader";
import useFetch from "../../hooks/useFetch";
import { DashboardResponse } from "../../models/BusinessPlace";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";
import { greet } from "../../utils/date";

import { genderData, monthlyViews } from "./dummydata";

const DashBoard = () => {
  const user = useAppSelector(selectUser);

  const {
    fetchData: fetchDashBoard,
    data: dashBoard,
    isLoading,
  } = useFetch<DashboardResponse>();

  useEffect(() => {
    fetchDashBoard("business/user/dashboard", {
      method: "GET",
      type: "authenticated",
    });
  }, []);

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
      <Typography fontSize="1rem" fontWeight="bold">
        {greet()} {user.name} !
      </Typography>
      <Grid container mt="2rem" gap={4}>
        <DataCard title="Total Views" value={dashBoard?.views || 0} />
        <DataCard title="Total Likes" value={dashBoard?.likes || 0} />
        <DataCard
          title="Rating"
          color={getRatingColor(dashBoard?.rate || 0)}
          value={dashBoard?.rate || 0}
        />
        <DataCard
          title="This month income"
          value={
            dashBoard?.monthlyBookings.find(
              (booking) => booking._id === new Date().getMonth() + 1
            )?.income || ""
          }
        />
        <DataCard title="Total income" value={dashBoard?.totalIncome || 0} />
        <Typography fontSize="1rem" fontWeight="bold">
          Monthly Income
        </Typography>
        <Grid item xs={12} height="600px">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={dashBoard?.monthlyBookings || []}
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
        <Grid item xs={5} height="400px">
          <Typography fontSize="1rem" fontWeight="bold">
            Gender Wise Impressions
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={genderData}
                dataKey="value"
                cx="50%"
                cy="50%"
                fill="#FF385C"
                label={({ index }) => genderData[index].name}
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item xs={6} height="400px">
          <Typography fontSize="1rem" fontWeight="bold" mb="2rem">
            Customer Distribution By Districts
          </Typography>
          <Typography
            my="0.5rem"
            p="0.8rem"
            border={1}
            borderRadius={1}
            borderColor="#EAE9EE"
          >
            1. Colombo - 50%
          </Typography>
          <Typography
            my="0.5rem"
            p="0.8rem"
            border={1}
            borderRadius={1}
            borderColor="#EAE9EE"
          >
            2. Galle - 22%
          </Typography>
          <Typography
            my="0.5rem"
            p="0.8rem"
            border={1}
            borderRadius={1}
            borderColor="#EAE9EE"
          >
            3. Gampaha - 10%
          </Typography>
          <Typography
            my="0.5rem"
            p="0.8rem"
            border={1}
            borderRadius={1}
            borderColor="#EAE9EE"
          >
            4. Matara - 10%
          </Typography>
          <Typography
            my="0.5rem"
            p="0.8rem"
            border={1}
            borderRadius={1}
            borderColor="#EAE9EE"
          >
            5. Anuradhapura - 8%
          </Typography>
        </Grid>
        <Typography fontSize="1rem" fontWeight="bold">
          Monthly Views
        </Typography>
        <Grid item xs={12} height="600px">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={monthlyViews}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Views" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#FF385C"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

const DataCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color?: string;
}) => {
  return (
    <Grid
      item
      xs={2}
      height={"10rem"}
      bgcolor="#EBF5FF"
      borderRadius={"1rem"}
      p="1rem"
      display={"flex"}
      flexDirection="column"
      justifyContent={"space-around"}
    >
      <Typography fontWeight={"bold"} fontSize="1rem" color={"#2598FF"}>
        {title}
      </Typography>
      <Typography
        fontWeight={"500"}
        fontSize="2.5rem"
        color={color || "#707070"}
      >
        {value}
      </Typography>
    </Grid>
  );
};
export default DashBoard;

const getRatingColor = (rate: number) => {
  if (rate < 3) return "red";
  return "Green";
};
