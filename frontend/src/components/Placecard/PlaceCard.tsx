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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";
import ShareLocation from "../ShareLocation/ShareLocation";
import { useNavigate } from "react-router-dom";
import { Place } from "../../models/Place";
import { capitalizeEachFirst } from "../../utils/string";

const PlaceCard: React.FC<Place> = ({ name, description, _id, photos }) => {
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
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize="1.5rem" component="div">
              {capitalizeEachFirst(name)}
            </Typography>
            <Rating readOnly value={5} />
          </Box>
          <Typography>{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
        <Button>
          <LocationOnIcon />
        </Button>
        <Button>
          <FavoriteIcon />
        </Button>
        <Button onClick={shareClickHandler}>
          <ShareIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceCard;
