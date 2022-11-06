import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Place } from "../../models/Place";
import { capitalizeEachFirst, truncate } from "../../utils/string";
import AvatarLink from "../Avatar";
import ShareLocation from "../ShareLocation/ShareLocation";

const PlaceCard: React.FC<Place> = ({
  name,
  description,
  _id,
  photos,
  addedBy,
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
    <Card>
      {isShareOpen && (
        <ShareLocation
          link={`${window.location.href}/${_id}`}
          onClose={() => {
            setIsShareOpen(false);
          }}
        />
      )}
      <CardActionArea onClick={clickHandler}>
        <CardMedia component="img" alt="" height="220" src={photos[0]} />
        <CardContent sx={{ minHeight: "10rem" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize="1.5rem" component="div">
              {truncate(capitalizeEachFirst(name), 18)}
            </Typography>
            <Rating readOnly value={5} />
          </Box>
          <Typography>{truncate(description, 250)}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{ justifyContent: "space-between", pt: 0, pl: "1rem" }}
      >
        <Box display="flex" alignItems="center">
          <AvatarLink
            size="30px"
            image={addedBy.profilePicture}
            userID={addedBy._id}
            name={addedBy.name}
          />
          <Typography fontSize="0.9rem" fontWeight="bold" pl="0.5rem">
            {addedBy.name}
          </Typography>
        </Box>
        <Box>
          <Button>
            <FavoriteIcon />
          </Button>
          <Button onClick={shareClickHandler}>
            <ShareIcon />
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PlaceCard;
