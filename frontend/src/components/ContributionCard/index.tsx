import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  capitalizeEachFirst,
  getRandomItemFromStringArray,
} from "../../utils/string";
import Like from "../Like";

interface Props {
  image: string[];
  addedOn: string;
  name: string;
  country: string;
  id: string;
  likes: number;
}

const ContributionCard: React.FC<Props> = ({
  image,
  addedOn,
  country,
  name,
  id,
  likes,
}) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/places/${id}`);
  console.log(id);
  return (
    <Box
      sx={{ cursor: "pointer" }}
      my="1rem"
      display="flex"
      alignItems="center"
    >
      <Grid container width="100%" p={"0.5rem"}>
        <Grid item xs={12} onClick={handleClick}>
          <img
            width={"100%"}
            height="550px"
            style={{ objectFit: "cover" }}
            src={image?.length !== 0 ? getRandomItemFromStringArray(image) : ""}
            alt=""
          />
        </Grid>

        <Grid item xs={6}>
          <Typography
            fontSize="1.2rem"
            fontWeight="600"
            pl="0.4rem"
            fontFamily={"Poor Story, cursive"}
          >
            {capitalizeEachFirst(name)}
          </Typography>
          <Typography fontSize="0.7rem" pl="0.5rem" color={"#CACACA"}>
            {formatDistanceToNow(parseISO(addedOn), { addSuffix: true })}
          </Typography>
        </Grid>

        <Grid
          item
          xs={6}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Typography fontWeight="500" mr={"1rem"}>
            {likes} likes
          </Typography>
          {/* <Like placeID={id} p="0" /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContributionCard;
