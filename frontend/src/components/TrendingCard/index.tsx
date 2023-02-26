import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Place } from "../../models/Place";
import {
  capitalizeEachFirst,
  getRandomItemFromStringArray,
  truncate,
} from "../../utils/string";

interface Props {
  place: Place;
  index: number;
  type: "Business" | "Place";
}

const TrendingCard: React.FC<Props> = ({ place, index, type }) => {
  const navigate = useNavigate();
  return (
    <CardActionArea
      onClick={() =>
        navigate(`/${type === "Business" ? "hotels" : "places"}/${place._id}`)
      }
    >
      <Card sx={{ boxShadow: "0", borderRadius: 2, my: 2 }}>
        <Grid container>
          <Grid item xs={1} p="0.5rem">
            <Typography fontSize="1.8rem" fontWeight="600" color="#808080">
              #{index}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <CardMedia
              component="img"
              alt=""
              height="250"
              sx={{ borderRadius: 2 }}
              src={getRandomItemFromStringArray(place.photos)}
            />
          </Grid>
          <Grid item xs={6} px="1rem">
            <Typography fontSize="1.2rem" fontWeight="600">
              {capitalizeEachFirst(place.name)}
            </Typography>
            <Typography fontSize="1rem" fontWeight="400" mt="1rem" mb="1rem">
              {truncate(place.description, 300)}
            </Typography>
            {/* @ts-ignore */}
            <ShowRating rating={place.rating} views={place.views} />
          </Grid>
        </Grid>
      </Card>
    </CardActionArea>
  );
};

export default TrendingCard;

const ShowRating = ({
  rating,
  views,
}: {
  rating: number | undefined;
  views: number | undefined;
}) => {
  return (
    <Box display={"flex"} justifyContent="flex-end" alignItems="center" gap={2}>
      <Box display={"flex"} justifyContent="space-between" alignItems="center">
        <AiOutlineEye color="#1877F2" size="20" />
        <Typography
          fontSize="1rem"
          fontWeight="bold"
          color="primary"
          textAlign="right"
        >
          {views}
        </Typography>
      </Box>

      {rating && (
        <Typography
          component={"span"}
          fontSize="1.3rem"
          fontWeight="bold"
          color="#FF5D7A"
          textAlign="right"
        >
          {rating}
          <Typography component="span" fontSize="0.7rem">
            /5
          </Typography>
        </Typography>
      )}
    </Box>
  );
};
