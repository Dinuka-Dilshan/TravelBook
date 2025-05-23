import { Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { differenceInDays, parseISO } from "date-fns";
import { useEffect } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import RateBusinessPlace from "@/components/Bookings/RateBusinessPlace";
import useFetch from "@/hooks/useFetch";
import { Booking } from "@/models/Booking";

const ViewMyBookings = () => {
  const { data, error, fetchData, isError, isLoading } = useFetch<{
    bookings: Booking[];
    ratings: { amount: number; placeID: string }[];
  }>();

  useEffect(() => {
    fetchData("booking/customer", { method: "GET", type: "authenticated" });
  }, []);

  return (
    <Box p={"1rem"} px="5rem">
      <Typography
        fontWeight={"bold"}
        fontFamily={"Poor Story, cursive"}
        sx={{ fontSize: { lg: "1.5rem", xs: "1.3rem" } }}
      >
        My Bookings
      </Typography>
      {data?.bookings.length === 0 && (
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
      <Grid container justifyContent="center" gap={2}>
        {data?.bookings.map((booking, index) => {
          return (
            <Grid xs={6} key={index} item>
              <BookingCard
                booking={booking}
                rating={data.ratings.find(
                  (rate) => rate.placeID === booking.place?._id
                )}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ViewMyBookings;

const BookingCard = ({
  booking,
  rating,
}: {
  booking: Booking;
  rating: { amount: number; placeID: string } | undefined;
}) => {
  const navigate = useNavigate();

  return (
    <Box my="1rem" border={1} borderColor="#EAE9EE" p="2rem" borderRadius={2}>
      <Grid container>
        <Grid item xs={6}>
          <Chip label={booking.status} color={getColor(booking.status)} />
          <Typography fontWeight={"500"} fontSize="1.2rem">
            LKR{" "}
            {booking.package.dailyPrice *
              differenceInDays(
                parseISO(booking.endDate),
                parseISO(booking.startDate)
              )}
          </Typography>
          <Typography fontSize="1rem">
            {`From: ${booking?.startDate?.split("T")[0]}  To: ${
              booking?.endDate?.split("T")[0]
            }`}
          </Typography>
          <Typography fontWeight={"500"} fontSize="1.2rem">
            <Box my="0.5rem" mb="2rem">
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                justifyContent="space-between"
                mb="0.5rem"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <HiOutlineHome size={"1.5rem"} />
                  <Typography
                    fontWeight={"500"}
                    fontFamily={"Poor Story, cursive"}
                    fontSize="1.3rem"
                  >
                    {booking.package.name}
                  </Typography>
                </Box>
              </Box>

              <Typography>
                Only {booking.package.guestSize}{" "}
                {booking.package.guestSize === 1 ? "Guest" : "Guests"} Allowed
              </Typography>
              <Typography>
                You will have {booking.package.numberOfBeds}{" "}
                {booking.package.numberOfBeds === 1 ? "Bed" : "Beds"} to Sleep
              </Typography>
              <Typography>
                Package Includes {booking.package.numberOfRooms}{" "}
                {booking.package.numberOfRooms === 1 ? "Room" : "Rooms"}
              </Typography>
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img src={booking.place?.photos[0]} width="100%" height={"100%"} />
        </Grid>
        {booking.status === "checkedOut" && (
          <RateBusinessPlace booking={booking} rating={rating?.amount} />
        )}
      </Grid>
    </Box>
  );
};

const getColor = (status: string) => {
  if (status === "pending") return "warning";
  else if (status === "approved") return "success";
  else if (status === "checkedIn") return "info";
  else return "error";
};
