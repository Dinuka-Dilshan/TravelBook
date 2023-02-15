import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { differenceInDays, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { Booking } from "../../../models/Booking";
import { BusinessPlace } from "../../../models/BusinessPlace";
import { getDate } from "../../../utils/date";
import Modal from "../../Modal/Modal";

interface Props {
  onClose: () => void;
  place?: BusinessPlace;
}

const PlaceBooking: React.FC<Props> = ({ onClose, place }) => {
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [startDate, setStartDate] = useState(getDate());
  const [endDate, setEndDate] = useState(getDate(2));
  const navigate = useNavigate();
  const { data, error, fetchData, isError, isLoading } = useFetch<Booking>();

  const dateDifference = differenceInDays(
    parseISO(endDate),
    parseISO(startDate)
  );
  const totalPrice = place?.packages
    ? place.packages[selectedPackageIndex].dailyPrice *
      (dateDifference === 0 ? 1 : dateDifference)
    : 0;

  const handleBooking = () => {
    fetchData("booking/add", {
      method: "POST",
      body: {
        package: place?.packages ? place.packages[selectedPackageIndex] : {},
        place: place?._id,
        startDate,
        endDate,
      },
      type: "authenticated",
    });
  };

  useEffect(() => {
    if (data?.status) {
      navigate("/bookings");
    }
  }, [data]);

  if (!place) {
    return (
      <Box>
        <Typography>Unknown Error</Typography>
      </Box>
    );
  }

  return (
    <Modal onClose={onClose} width={"600px"}>
      <Box>
        <Typography
          mb={"1rem"}
          fontWeight={"bold"}
          fontFamily={"Poor Story, cursive"}
          sx={{ fontSize: { lg: "1.5rem", xs: "1.3rem" } }}
        >
          Total LKR{" "}
          {totalPrice > 0
            ? totalPrice
            : 0}
          /=
        </Typography>
        <Typography fontSize={"1rem"}>Select A Package</Typography>
        {place?.packages?.map((pkg, index) => {
          return (
            <Box
              key={index}
              bgcolor={selectedPackageIndex === index ? "#EBF5FF" : ""}
              border={"0.1rem solid #EFEFEF"}
              my="0.5rem"
              p="1rem"
              mb="2rem"
              onClick={() => {
                setSelectedPackageIndex(index);
              }}
            >
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
                    {pkg.name}
                  </Typography>
                </Box>
                <Typography fontSize="1.2rem">
                  LKR {pkg.dailyPrice}
                  <Typography
                    component={"span"}
                    fontFamily={"Poor Story, cursive"}
                  >
                    {" "}
                    Per day
                  </Typography>
                </Typography>
              </Box>

              <Typography>
                Only {pkg.guestSize} {pkg.guestSize === 1 ? "Guest" : "Guests"}{" "}
                Allowed
              </Typography>
              <Typography>
                You will have {pkg.numberOfBeds}{" "}
                {pkg.numberOfBeds === 1 ? "Bed" : "Beds"} to Sleep
              </Typography>
              <Typography>
                Package Includes {pkg.numberOfRooms}{" "}
                {pkg.numberOfRooms === 1 ? "Room" : "Rooms"}
              </Typography>
            </Box>
          );
        })}
        <Typography fontSize={"1rem"}>CheckIn Date</Typography>
        <TextField
          inputProps={{ min: getDate(0) }}
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
          size="small"
          type="date"
          fullWidth
        />
        <Typography mt="1rem" fontSize={"1rem"}>
          CheckOut Date
        </Typography>
        <TextField
          value={endDate}
          inputProps={{ min: getDate() }}
          onChange={(e) => setEndDate(e.target.value)}
          size="small"
          type="date"
          fullWidth
        />
        <Button
          disabled={
            isLoading ||
            differenceInDays(parseISO(endDate), parseISO(startDate)) < 0
          }
          onClick={handleBooking}
          fullWidth
          variant="contained"
          sx={{
            mt: "1rem",
            bgcolor: "#FF385C",
            boxShadow: 0,
            borderRadius: 1,
            p: "0.5rem",
            "&:hover": {
              backgroundColor: "#FF385C",
            },
          }}
        >
          Book Place
          {isLoading && (
            <CircularProgress
              color="inherit"
              size={"1.3rem"}
              sx={{ ml: "1rem" }}
            />
          )}
        </Button>
      </Box>
    </Modal>
  );
};

export default PlaceBooking;
