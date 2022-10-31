import {
  Container,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useEffect, useState } from "react";
import ShareLocation from "../components/ShareLocation/ShareLocation";
import StarIcon from "@mui/icons-material/Star";
import AddRating from "../components/AddRating";
import ViewLocation from "../components/ViewLocation/ViewLocation";
import useFetch from "../hooks/useFetch";
import { Place } from "../models/Place";
import ErrorFS from "../components/ErrorFS";
import LoaderFS from "../components/LoaderFS";
import CommentSecton from "../components/CommentSection";

const srcset = (image: string, size: number, rows = 1, cols = 1) => {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
};

const PlaceDetails = () => {
  const { id } = useParams();
  const {
    isLoading,
    data: place,
    fetchData,
    isError,
    error,
  } = useFetch<Place>();
  const [iconButtonStatus, setIconButtonStatus] = useState({
    isShareOpen: false,
    isRaingOpen: false,
    isHeartClicked: false,
    isLocationOpen: false,
  });

  const shareClickHandler = () => {
    setIconButtonStatus((prev) => ({
      ...prev,
      isShareOpen: !prev.isShareOpen,
    }));
  };

  const heartClickHandler = () => {
    setIconButtonStatus((prev) => ({
      ...prev,
      isHeartClicked: !prev.isHeartClicked,
    }));
  };

  const ratingClickHandler = () => {
    setIconButtonStatus((prev) => ({
      ...prev,
      isRaingOpen: !prev.isRaingOpen,
    }));
  };

  const locationClickHandler = () => {
    setIconButtonStatus((prev) => ({
      ...prev,
      isLocationOpen: !prev.isLocationOpen,
    }));
  };

  useEffect(() => {
    fetchData(`place/${id}`, { method: "GET", useToken: true });
  }, []);

  if (isError) {
    return <ErrorFS error={error} />;
  }

  return (
    <Container sx={{ px: "4rem", pt: "1.5rem" }}>
      {isLoading && <LoaderFS />}
      {iconButtonStatus.isShareOpen && (
        <ShareLocation
          link={window.location.href}
          onClose={() => {
            setIconButtonStatus((prev) => ({
              ...prev,
              isShareOpen: false,
            }));
          }}
        />
      )}

      {iconButtonStatus.isRaingOpen && (
        <AddRating
          onClose={() => {
            setIconButtonStatus((prev) => ({
              ...prev,
              isRaingOpen: false,
            }));
          }}
        />
      )}

      {iconButtonStatus.isLocationOpen && (
        <ViewLocation
          onClose={() => {
            setIconButtonStatus((prev) => ({
              ...prev,
              isLocationOpen: false,
            }));
          }}
        />
      )}
      <Grid container mb="2rem">
        <Grid item xs={12} lg={6}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize="1.5rem">{place?.name}</Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              gap={2}
              alignItems="center"
            >
              <IconButton>
                <AddAPhotoIcon />
              </IconButton>
              <IconButton onClick={locationClickHandler}>
                <LocationOnIcon />
              </IconButton>
              <IconButton onClick={heartClickHandler}>
                <FavoriteIcon
                  sx={{
                    color: iconButtonStatus.isHeartClicked ? "#FF5D7A" : "",
                  }}
                />
              </IconButton>
              <IconButton onClick={ratingClickHandler}>
                <StarIcon />
              </IconButton>
              <IconButton onClick={shareClickHandler}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
          {place && (
            <ImageList
              sx={{ width: "100%", height: 500 }}
              variant="quilted"
              cols={4}
              rowHeight={121}
            >
              {place.photos.map((photo, index) => (
                <ImageListItem key={index} cols={2} rows={3}>
                  <img {...srcset(photo, 121, 1, 1)} alt={""} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <Box display="flex" alignItems="center" gap={1} mb="1rem">
            <StarIcon fontSize="small" />
            <Typography fontSize="0.8rem">4.5</Typography>
          </Box>
          <Typography>{place?.description}</Typography>
        </Grid>
        <Grid item xs={6} mt="2rem">
          {place?._id && <CommentSecton placeID={place._id} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceDetails;
