import { Box, Rating, Typography } from "@mui/material";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Place } from "../../models/Place";
import Modal from "../Modal/Modal";

interface Props {
  place: Place | undefined;
  rating: number | undefined;
  onClose: () => void;
  refresh: () => void;
}

const AddRating: React.FC<Props> = ({ onClose, place, rating, refresh }) => {
  const [rate, setRate] = useState(rating);
  const { fetchData } = useFetch<{
    message: string;
    updatedPlace: Place;
  }>();
  const handleRate = (
    _: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    setRate(value || 0);
    fetchData(`place/${place?._id}/rate`, {
      method: "POST",
      type: "authenticated",
      body: { amount: value },
    });
  };
  return (
    <Box>
      {/* @ts-ignore  */}
      <Modal onClose={onClose}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={2}
        >
          <Typography fontSize="1.5rem">Add Your Ratings</Typography>
          <Rating
            size="large"
            sx={{ color: "primary.main" }}
            value={rate}
            onChange={handleRate}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default AddRating;
