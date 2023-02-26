import { Avatar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { formatDistanceToNow, parseISO } from "date-fns";
import { AiFillLike } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import { Place } from "../../models/Place";

interface Props {
  onClick: () => void;
  place: Place;
  isSelected?: boolean;
}

const InsightResultCard: React.FC<Props> = ({ onClick, place, isSelected }) => {
  return (
    <Box
      border={"1px solid #EAE9EE"}
      borderRadius={3}
      p="1rem"
      my="1rem"
      onClick={onClick}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#EBF5FF",
          color: "#2598FF",
        },
        backgroundColor: isSelected ? "#EBF5FF" : "",
        color: isSelected ? "#2598FF" : "",
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={1}>
          <Avatar src={place.photos[0]} />
        </Grid>
        <Grid item xs={2}>
          <Typography fontSize="1rem">{place.name}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography fontSize="1rem">
            <FiEye /> {place.viewRecords.length}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography fontSize="1rem">
            <AiFillLike /> {place.likedBy.length}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography fontSize="1rem">{place.country}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography fontSize="1rem">
            {formatDistanceToNow(parseISO(place.addedOn))}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InsightResultCard;
