import {
  Avatar,
  Chip,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { differenceInDays, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Booking } from "../../models/Booking";
import Loader from "../Loader";
import BookingStateModal from "./BookingStateModal";

const ViewMyBookingsBusiness = () => {
  const { data, error, fetchData, isError, isLoading } = useFetch<Booking[]>();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData("booking", { method: "GET", type: "authenticated" });
  }, [refetch]);

  return (
    <>
      {isLoading && data && (
        <LinearProgress
          sx={{
            background: "linear-gradient(to right, red, purple)",
            height: "0.4rem",
          }}
        />
      )}
      {isOpen && data && (
        <BookingStateModal
          booking={data[selectedIndex]}
          onClose={() => {
            setIsOpen(false);
            setRefetch((p) => !p);
          }}
        />
      )}
      <Box p={"1rem"} px="5rem">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="2rem"
        >
          <Typography
            fontWeight={"bold"}
            fontFamily={"Poor Story, cursive"}
            sx={{ fontSize: { lg: "1.5rem", xs: "1.3rem" } }}
          >
            Bookings
          </Typography>
          <TextField
            size="small"
            placeholder="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Box>

        {isLoading && !data && (
          <Loader
            styles={{
              width: "100%",
              height: "600px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        )}
        {data?.length === 0 && (
          <Box
            width={"100%"}
            height="80vh"
            display={"flex"}
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              fontSize={"1.5rem"}
              fontWeight={"bold"}
              fontFamily={"Poor Story, cursive"}
            >
              You haven't book any places yet!
            </Typography>
          </Box>
        )}
        <Grid container gap={2}>
          {data && (
            <Grid container alignItems="center">
              <Grid item xs={0.8}></Grid>
              <Grid item xs={1.2}>
                <Typography>Booking ID</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Customer Name</Typography>
              </Grid>
              <Grid item xs={0.8}>
                <Typography>Package</Typography>
              </Grid>
              <Grid item xs={1.4}>
                <Typography>From</Typography>
              </Grid>
              <Grid item xs={1.4}>
                <Typography>To</Typography>
              </Grid>
              <Grid item xs={1.4}>
                <Typography>Status</Typography>
              </Grid>
              <Grid item xs={1.2}>
                <Typography>Daily Price</Typography>
              </Grid>
              <Grid item xs={1.8}>
                <Typography>Total Amount</Typography>
              </Grid>
            </Grid>
          )}
          {data
            ?.filter((booking) => filterData({ booking, searchText }))
            .map((booking, index) => {
              return (
                <Grid xs={12} key={index} item>
                  <BookingCard
                    booking={booking}
                    onSelect={() => {
                      setSelectedIndex(index);
                      setIsOpen(true);
                    }}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
};

export default ViewMyBookingsBusiness;

const BookingCard = ({
  booking,
  onSelect,
}: {
  booking: Booking;
  onSelect: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={onSelect}
      my="0.1rem"
      border={1}
      borderColor="#EAE9EE"
      p="0.5rem"
      borderRadius={2}
      sx={{
        "&:hover": {
          backgroundColor: "#EBF5FF",
          color: "#2598FF",
        },
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={0.8}>
          <Avatar src={booking.customer?.profilePicture} />
        </Grid>
        <Grid item xs={1.2}>
          <Typography fontWeight={"500"} fontSize="1rem">
            {booking._id.slice(0, 9)}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography fontSize="1rem">{booking.customer?.name}</Typography>
        </Grid>
        <Grid item xs={0.8}>
          <Typography fontSize="1rem">{booking.package.name}</Typography>
        </Grid>
        <Grid item xs={1.4}>
          <Typography>{booking?.startDate?.split("T")[0]}</Typography>
        </Grid>
        <Grid item xs={1.4}>
          <Typography>{booking?.endDate?.split("T")[0]}</Typography>
        </Grid>
        <Grid item xs={1.4}>
          <Chip
            label={booking.status}
            color={getColor(booking.status)}
            sx={{ width: "100px" }}
          />
        </Grid>
        <Grid item xs={1.2}>
          <Typography>LKR {booking.package.dailyPrice}</Typography>
        </Grid>
        <Grid item xs={1.8}>
          <Typography fontWeight={"500"} fontSize="1rem">
            LKR{" "}
            {booking.package.dailyPrice *
              (differenceInDays(
                parseISO(booking.endDate),
                parseISO(booking.startDate)
              ) || 1)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const getColor = (status: string) => {
  if (status === "pending") return "warning";
  else if (status === "approved") return "secondary";
  else if (status === "checkedIn") return "info";
  else if (status === "checkedOut") return "success";
  else return "error";
};

const filterData = ({
  booking,
  searchText,
}: {
  searchText: string;
  booking: Booking;
}): boolean | undefined =>
  booking?.customer?.name.toLowerCase().includes(searchText.toLowerCase()) ||
  booking._id.includes(searchText) ||
  booking.package.name.toLowerCase().includes(searchText.toLowerCase()) ||
  booking.status.toLowerCase().includes(searchText.toLowerCase()) ||
  booking.package.dailyPrice.toString().includes(searchText);
