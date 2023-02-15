import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  differenceInDays,
  format,
  formatDistanceToNow,
  parseISO,
} from "date-fns";
import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Booking } from "../../models/Booking";
import Modal from "../Modal/Modal";

interface Props {
  booking: Booking;
  onClose: () => void;
}

const BookingStateModal: React.FC<Props> = ({ booking, onClose }) => {
  const [bookingStatus, setBookingStatus] = useState(() => booking.status);
  const BOOKING_STATUS = getStatusNames(booking.status);
  const { data, error, fetchData, isError, isLoading } = useFetch();

  const clickHandler = () => {
    if (bookingStatus !== "pending") {
      fetchData(`booking/${getUrl(bookingStatus)}/${booking._id}`, {
        method: "GET",
        type: "authenticated",
        autoErrorNotify: true,
      });
    }
  };

  useEffect(() => {
    if (!isLoading && data) {
      onClose()
    }
  }, [data, isLoading]);

  return (
    <Modal
      onClose={onClose}
      width={"550px"}
      height={booking.status !== 'cancelled'?'600px':'500px'}
      title="Order Details"
    >
      <Box maxHeight="500px" overflow="scroll" px="1rem" mt="0.5rem">
        <Typography>General Details</Typography>
        <TextField
          sx={{
            my: "0.5rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          size="small"
          disabled
          label="Booking ID"
          fullWidth
          value={booking._id}
        />
        <TextField
          sx={{
            my: "0.5rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          size="small"
          disabled
          label="Total Amount"
          fullWidth
          value={`LKR ${
            booking.package.dailyPrice *
            (differenceInDays(
              parseISO(booking.endDate),
              parseISO(booking.startDate)
            ) || 1)
          } /=`}
        />
        <TextField
          sx={{
            my: "0.5rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          size="small"
          disabled
          label="Placed On"
          fullWidth
          value={format(parseISO(booking.placedOn), "yyyy-MM-dd")}
        />
        <TextField
          sx={{
            my: "0.5rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          size="small"
          disabled
          label="Duration"
          fullWidth
          value={`${format(
            parseISO(booking.startDate),
            "yyyy-MM-dd"
          )} to ${format(parseISO(booking.endDate), "yyyy-MM-dd")}`}
        />
        <Typography>Package Details</Typography>
        <TextField
          sx={{
            my: "0.5rem",
            mt: "1rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          size="small"
          disabled
          label="Package Name"
          fullWidth
          value={booking.package.name}
        />
        <TextField
          sx={{
            my: "0.5rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          size="small"
          disabled
          label="Dalily Price"
          fullWidth
          value={`LKR ${booking.package.dailyPrice} /=`}
        />
        <TextField
          sx={{
            my: "0.5rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          size="small"
          disabled
          label="Guest Size"
          fullWidth
          value={booking.package.guestSize}
        />
        <TextField
          sx={{
            my: "0.5rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          size="small"
          disabled
          label="Are Pets Allowed?"
          fullWidth
          value={booking.package.isPetsAllowed ? "YES" : "NO"}
        />
        <TextField
          sx={{
            my: "0.5rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          size="small"
          disabled
          label="Number of Beds"
          fullWidth
          value={booking.package.numberOfBeds}
        />
        <TextField
          sx={{
            my: "0.5rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          size="small"
          disabled
          label="Number of Rooms"
          fullWidth
          value={booking.package.numberOfRooms}
        />
        <Typography>Customer Details</Typography>
        <TextField
          sx={{
            my: "0.5rem",
            mt: "1rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          size="small"
          disabled
          label="Name"
          fullWidth
          value={booking.customer?.name}
        />
        <TextField
          sx={{
            my: "0.5rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          size="small"
          disabled
          label="Country"
          fullWidth
          value={booking.customer?.country}
        />
        <TextField
          sx={{
            my: "0.5rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          size="small"
          disabled
          label="State"
          fullWidth
          value={booking.customer?.state}
        />
        <TextField
          sx={{
            my: "0.5rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          size="small"
          disabled
          label="Gender"
          fullWidth
          value={booking.customer?.gender}
        />
        <TextField
          sx={{
            my: "0.5rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          size="small"
          disabled
          label="Email"
          fullWidth
          value={booking.customer?.email}
        />

        {booking.customer?.joinedDate && (
          <TextField
            sx={{
              my: "0.5rem",
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000",
              },
            }}
            size="small"
            disabled
            label="Member for"
            fullWidth
            value={formatDistanceToNow(parseISO(booking.customer?.joinedDate))}
          />
        )}
      </Box>
      {booking.status !== 'cancelled' && <Box px="1rem">
        <FormControl fullWidth sx={{ mt: "0.5rem" }}>
          <InputLabel id="b-s-label">Update Booking Status</InputLabel>
          <Select
            labelId="b-s-label"
            MenuProps={{
              style: { zIndex: 35001 },
            }}
            label="Update Booking Status"
            value={bookingStatus}
            size="small"
            onChange={(e) => setBookingStatus(e.target.value)}
          >
            {BOOKING_STATUS.map((status) => (
              <MenuItem key={status} value={status} sx={{ width: "100%" }}>
                {status.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          onClick={clickHandler}
          fullWidth
          disabled={isLoading}
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
          Update Booking Status
          {isLoading && (
            <CircularProgress
              color="inherit"
              size={"1.3rem"}
              sx={{ ml: "1rem" }}
            />
          )}
        </Button>
      </Box>}
    </Modal>
  );
};

export default BookingStateModal;

const getStatusNames = (current: string): string[] => {
  if (current === "pending") return ["pending", "approved","cancelled"];
  if (current === "approved") return ["approved", "checkedIn"];
  if (current === "checkedIn") return ["checkedIn", "checkedOut"];
  return ["checkedOut"];
};

const getUrl = (status: string): string => {
  if (status === "approved") return "approve";
  if (status === "checkedIn") return "checkin";
  if (status === "cancelled") return "cancel";
  return "checkout";
};
