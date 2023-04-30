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
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Place } from "../../models/Place";
import {
  capitalizeEachFirst,
  getRandomItemFromStringArray,
  removeWhiteSpacesWith,
  truncate,
} from "../../utils/string";
import AvatarLink from "../Avatar";
import ShareLocation from "../ShareLocation/ShareLocation";

const PlaceCard: React.FC<Place> = ({
  name,
  description,
  _id,
  photos,
  addedBy,
  likedBy,
  addedOn,
  isLiked,
}) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const navigate = useNavigate();

  const shareClickHandler = () => {
    setIsShareOpen(true);
  };

  const clickHandler = () => {
    navigate(`/places/${_id}`);
  };

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
              {truncate(capitalizeEachFirst(name), 18)}
            </Typography>
            {/* <Rating readOnly value={5} /> */}
          </Box>
          <Typography mt="0.3rem">{truncate(description, 210)}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "space-between", p: 0, mt: 0 }}>
        <Box display="flex" alignItems="center">
          <AvatarLink
            size="30px"
            image={addedBy.profilePicture}
            userID={addedBy._id}
            name={addedBy.name}
          />
          <Box pl="0.7rem">
            <Typography fontSize="0.9rem" fontWeight="600" pl="0.4rem">
              {removeWhiteSpacesWith(addedBy.name.toLocaleLowerCase(), "_")}
            </Typography>
            <Typography fontSize="0.7rem" pl="0.5rem" color={"#CACACA"}>
              {formatDistanceToNow(parseISO(addedOn), { addSuffix: true })}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          flexDirection="row"
          gap={1}
          alignSelf={"stretch"}
        >
          <Typography>{likedBy?.length} likes</Typography>

          <IconButton onClick={shareClickHandler} sx={{ p: 0 }}>
            <ShareIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default memo(PlaceCard);
