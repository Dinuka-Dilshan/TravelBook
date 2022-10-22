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

interface Props {
  title: string;
  description: string;
  rating: number;
  id?: number;
}

const PlaceCard: React.FC<Props> = ({
  title,
  description,
  rating,
  id = 123,
}) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const navigate = useNavigate();

  const shareClickHandler = () => {
    setIsShareOpen(true);
  };

  const clickHandler = () => {
    navigate(`/places/${id}`);
  };

  return (
    <Card>
      {isShareOpen && (
        <ShareLocation
          link="test link"
          onClose={() => {
            setIsShareOpen(false);
          }}
        />
      )}
      <CardActionArea onClick={clickHandler}>
        <CardMedia
          component="img"
          alt=""
          height="160"
          src="https://cdn.theculturetrip.com/wp-content/uploads/2017/04/sigiriya-459197_1920.jpg"
        />
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize="1.5rem" component="div">
              {title}
            </Typography>
            <Rating readOnly value={rating} />
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
