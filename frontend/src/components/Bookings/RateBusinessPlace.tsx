import { Box, Rating, Typography } from "@mui/material";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Booking } from "../../models/Booking";
import { BusinessPlace } from "../../models/BusinessPlace";

interface Props {
  booking: Booking;
  rating: number | undefined;
}

const RateBusinessPlace: React.FC<Props> = ({ booking, rating }) => {
  const [rate, setRate] = useState(rating);
  const { fetchData } = useFetch<{
    message: string;
    updatedPlace: BusinessPlace;
  }>();
  const handleRate = (
    _: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    setRate(value || 0);
    fetchData(`business/${booking.place?._id}/rate`, {
      method: "POST",
      type: "authenticated",
      body: { amount: value },
    });
  };

  return (
    <Box>
      <Typography fontWeight="500">Rate Your Experience</Typography>
      <Rating onChange={handleRate} value={rate} />
    </Box>
  );
};

export default RateBusinessPlace;
