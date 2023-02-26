import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useMemo } from "react";
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
import RecentTransactionCard from "../../components/ADMIN/RecentTransactionCard";
import Loader from "../../components/Loader";
import useFetch from "../../hooks/useFetch";
import { AdminDashBoardResponse } from "../../models/Admin";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";
import { greet } from "../../utils/date";
import { DataCard } from "../business/Dashboard";

const AdminDashBoard = () => {
  const user = useAppSelector(selectUser);
  const {
    data: dashBoardData,
    error,
    fetchData,
    isLoading,
  } = useFetch<AdminDashBoardResponse>();

  useEffect(() => {
    fetchData("admin/dashboard", { method: "GET", type: "authenticated" });
  }, []);

  const genderData = useMemo(() => {
    return [
      { name: "Female", value: dashBoardData?.genderWise.female || 0 },
      { name: "Male", value: dashBoardData?.genderWise.male || 0 },
    ];
  }, [dashBoardData]);

  const lookToBook = useMemo(() => {
    return [
      { name: "Look", value: dashBoardData?.views || 0 },
      { name: "Book", value: dashBoardData?.customerBookings.length || 0 },
    ];
  }, [dashBoardData]);

  const lookToBookTotal = useMemo(() => {
    return (
      (dashBoardData?.views || 0) +
      (dashBoardData?.customerBookings.length || 0)
    );
  }, [dashBoardData]);

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
        {greet()} !
      </Typography>
      <Grid container mt="2rem" gap={4} justifyContent="space-between">
        <DataCard
          title="Total Users"
          value={dashBoardData?.totalCustomers || 0}
        />
        <DataCard title="Total Views" value={dashBoardData?.views || 0} />
        <DataCard
          title="Total Hotels"
          value={dashBoardData?.totalHotels || 0}
        />
        <DataCard
          title="Total Places"
          value={dashBoardData?.totalPlaces || 0}
        />
        <DataCard
          title="Total Bookings"
          value={dashBoardData?.totalBookings || 0}
        />
      </Grid>
      <Grid container mt="2rem" gap={2}>
        <Typography fontSize="1rem" fontWeight="bold">
          Recent Transactions (LKR)
        </Typography>
        {dashBoardData?.bookings.slice(0, 4).map((booking) => (
          <Grid item key={booking._id} xs={12}>
            <RecentTransactionCard booking={booking} />
          </Grid>
        ))}
      </Grid>
      <Typography fontSize="1rem" fontWeight="bold" mt="2rem">
        Monthly Transactions (LKR)
      </Typography>
      <Grid item xs={12} height="600px" mt="2rem" justifyContent="center">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={dashBoardData?.monthlyBookings || []}
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
      <Grid container justifyContent="space-between" px="2rem" mt="2rem">
        <Grid item xs={5} height="400px">
          <Typography fontSize="1rem" fontWeight="bold">
            Gender Wise Sales
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={genderData}
                dataKey="value"
                cx="50%"
                cy="50%"
                fill="#FF385C"
                label={({ index }) =>
                  `${genderData[index].name} ${(
                    (genderData[index].value /
                      (dashBoardData?.customerBookings.length || 0)) *
                    100
                  ).toFixed(0)} %`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item xs={6} height="400px">
          <Typography fontSize="1rem" fontWeight="bold">
            Look to Book Ratio
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={lookToBook}
                dataKey="value"
                cx="50%"
                cy="50%"
                fill="#4B9FFF"
                label={({ index }) =>
                  `${lookToBook[index].name} 
                  ${((lookToBook[index].value / lookToBookTotal) * 100).toFixed(
                    0
                  )} %`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
      <Typography fontSize="1rem" fontWeight="bold" mt="2rem">
        Monthly Hotel Views
      </Typography>
      <Grid item xs={12} height="600px" mt="2rem" justifyContent="center">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={dashBoardData?.monthlyBusinessViews || []}
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

      <Typography fontSize="1rem" fontWeight="bold" mt="2rem">
        Monthly Place Views
      </Typography>
      <Grid item xs={12} height="600px" mt="2rem" justifyContent="center">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={dashBoardData?.monthlyPlaceViews || []}
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
    </Box>
  );
};

export default AdminDashBoard;
