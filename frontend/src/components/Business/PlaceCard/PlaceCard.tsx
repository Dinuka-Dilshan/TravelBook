import ShareIcon from "@mui/icons-material/Share";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { formatDistanceToNow, parseISO } from "date-fns";
import { memo, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BusinessPlace } from "../../../models/BusinessPlace";
import { Place } from "../../../models/Place";
import {
  capitalizeEachFirst,
  getRandomItemFromStringArray,
  removeWhiteSpacesWith,
  truncate,
} from "../../../utils/string";
import AvatarLink from "../../Avatar";
import ShareLocation from "../../ShareLocation/ShareLocation";

const PlaceCard: React.FC<BusinessPlace> = ({
  name,
  description,
  _id,
  photos,
  addedBy,
  likedBy,
  addedOn,
  isLiked,
  country,
  state,
  packages,
}) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const navigate = useNavigate();
  console.log(name);
  const shareClickHandler = () => {
    setIsShareOpen(true);
  };

  const clickHandler = () => {
    navigate(`/hotels/${_id}`);
  };

  const lowestPrice = useMemo(() => {
    return packages
      ?.map((pkg) => pkg.dailyPrice)
      .reduce((prev, curr) => (curr < prev ? curr : prev));
  }, [packages]);

  return (
    <Card sx={{ boxShadow: "0", borderRadius: 0 }}>
      {isShareOpen && (
        <ShareLocation
          link={`${window.location.href}/${_id}`}
          onClose={() => {
            setIsShareOpen(false);
          }}
        />
      )}
      <CardActionArea onClick={clickHandler}>
        <CardMedia
          component="img"
          alt=""
          height="300"
          src={getRandomItemFromStringArray(photos)}
        />
        <CardContent sx={{ minHeight: "9.7rem", p: 0, pt: "0.7rem" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              fontFamily={"Poor Story, cursive"}
              fontSize="1.2rem"
              fontWeight={"bold"}
              component="div"
            >
              {truncate(capitalizeEachFirst(name), 18)},{state},{country}
            </Typography>
            {/* <Rating readOnly value={5} /> */}
          </Box>
          <Typography mt="0.3rem">{truncate(description, 210)}</Typography>
          <Typography
            mt="0.5rem"
            fontSize="1rem"
            fontWeight="bold"
            fontFamily={"Poor Story, cursive"}
          >
            LKR {lowestPrice}{" "}
            <Typography component="span" fontFamily={"Poor Story, cursive"}>
              Per Day
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default memo(PlaceCard);
