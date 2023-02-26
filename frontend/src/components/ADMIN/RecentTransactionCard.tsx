import { Avatar, Chip, Grid, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { Booking } from "../../models/Booking";
import { getColor } from "../Bookings";

type Props = {
  booking: Booking;
};

const RecentTransactionCard: React.FC<Props> = ({ booking }) => {
  return (
    <Grid
      container
      p="1rem"
      alignItems="center"
      justifyContent="space-between"
      border={"1px solid #EAE9EE"}
      borderRadius={3}
    >
      <Grid item xs={1}>
        <Avatar src={booking.place?.photos[0]} />
      </Grid>
      <Grid item xs={2}>
        <Typography>{booking.place?.name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>
          {format(parseISO(booking.placedOn), "dd MMM, yyyy")}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography fontWeight="600">LKR {booking.totalPrice}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Chip
          label={booking.status}
          color={getColor(booking.status)}
          sx={{ width: "100px" }}
        />
      </Grid>
    </Grid>
  );
};

export default RecentTransactionCard;
