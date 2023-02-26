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
import Loader from "../../components/Loader";
import useFetch from "../../hooks/useFetch";
import { DashboardResponse } from "../../models/BusinessPlace";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";
import { greet } from "../../utils/date";

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

  const genderData = useMemo(() => {
    return [
      { name: "Female", value: dashBoard?.genderWise.female || 0 },
      { name: "Male", value: dashBoard?.genderWise.male || 0 },
    ];
  }, [dashBoard]);

  const lookToBook = useMemo(() => {
    return [
      { name: "Look", value: dashBoard?.views || 0 },
      { name: "Book", value: dashBoard?.customerBookings.length || 0 },
    ];
  }, [dashBoard]);

  const lookToBookTotal = useMemo(() => {
    return (dashBoard?.views || 0) + (dashBoard?.customerBookings.length || 0);
  }, [dashBoard]);

  const packageCount = useMemo(() => {
    return dashBoard?.popularPackages.reduce((acc, i) => acc + i.value, 0) || 0;
  }, [dashBoard]);

  const completeToCancel = useMemo(() => {
    const canceled =
      dashBoard?.customerBookings.filter((b) => b.status === "cancelled")
        .length || 0;
    const completed = (dashBoard?.customerBookings.length || 0) - canceled;
    return [
      { name: "Complete", value: completed },
      { name: "Cancel", value: canceled },
    ];
  }, [dashBoard]);

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
          title="This month income (LKR)"
          value={
            dashBoard?.monthlyBookings.find(
              (booking) => booking._id === new Date().getMonth() + 1
            )?.income || ""
          }
        />
        <DataCard
          title="Total income (LKR)"
          value={dashBoard?.totalIncome || 0}
        />

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
                  `${genderData[index].name} ${
                    (genderData[index].value /
                      (dashBoard?.customerBookings.length || 0)) *
                    100
                  } %`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item xs={5} height="400px">
          <Typography fontSize="1rem" fontWeight="bold">
            Package Popularity
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={dashBoard?.popularPackages}
                dataKey="value"
                cx="50%"
                cy="50%"
                fill="#069C60"
                label={({ index }) =>
                  `${dashBoard?.popularPackages[index].name} ${
                    dashBoard?.popularPackages[index].value
                      ? (dashBoard?.popularPackages[index].value /
                          packageCount) *
                        100
                      : 0
                  } %`
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
        <Grid item xs={5} height="400px">
          <Typography fontSize="1rem" fontWeight="bold">
            Complete to Cancel Ratio
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={completeToCancel}
                dataKey="value"
                cx="50%"
                cy="50%"
                fill="#B13786"
                label={({ index }) =>
                  `${completeToCancel[index].name} ${(
                    (completeToCancel[index].value /
                      (dashBoard?.customerBookings.length || 0)) *
                    100
                  ).toFixed(0)} %`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export const DataCard = ({
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
