import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import {
  Avatar,
  Container,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { formatRelative, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddRating from "../components/AddRating";
import CommentSecton from "../components/CommentSection";
import ErrorFS from "../components/ErrorFS";
import LoaderFS from "../components/LoaderFS";
import ShareLocation from "../components/ShareLocation/ShareLocation";
import ViewLocation from "../components/ViewLocation/ViewLocation";
import useFetch from "../hooks/useFetch";
import useHelmet from "../hooks/useHelmet";
import { Place } from "../models/Place";
import PublicIcon from "@mui/icons-material/Public";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { capitalizeEachFirst } from "../utils/string";
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
  useHelmet(place?.name);
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
    fetchData(`place/${id}`, { method: "GET", type: "authenticated" });
  }, []);

  if (isError) {
    return <ErrorFS error={error} />;
  }

  return (
    <Container sx={{ px: { lg: "4rem", xs: "1rem" }, pt: "1.5rem" }}>
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
            <Typography
              fontWeight={"bold"}
              sx={{ fontSize: { lg: "1.5rem", xs: "1.3rem" } }}
            >
              {capitalizeEachFirst(place?.name || "")}
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{ gap: { lg: 2, xs: 1 } }}
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
                  <img {...srcset(photo, 121, 2, 1)} alt={""} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <Box
            display="flex"
            p={"1rem"}
            mb="1rem"
            bgcolor="#DEEFFF"
            justifyContent={"space-between"}
            borderRadius={"0.2rem"}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <PublicIcon />
              <Typography>{place?.country}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <ApartmentIcon />
              <Typography>{place?.state}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <LocationOnIcon />
              <Box display="flex" alignItems="center" gap={2}>
                <Typography>{place?.latitude}° S</Typography>
                <Typography>{place?.longitude}° E</Typography>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            p={"1rem"}
            mb="1rem"
            bgcolor="#DEEFFF"
            justifyContent={"space-between"}
            borderRadius={"0.2rem"}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar src={place?.addedBy.profilePicture} />
              <Typography fontWeight={'bold'} fontSize="0.9rem">{place?.addedBy.name}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarMonthIcon />
              {place?.addedOn && (
                <Typography fontSize="0.9rem">
                  {formatRelative(parseISO(place.addedOn), new Date())}
                </Typography>
              )}
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb="1rem">
            <StarIcon fontSize="small" />
            <Typography fontSize="0.8rem">4.5</Typography>
          </Box>

          <Typography
            bgcolor="custom.gray"
            borderRadius={"0.2rem"}
            p={"0.7rem"}
          >
            {place?.description}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6} mt="2rem">
          {place?._id && <CommentSecton placeID={place._id} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceDetails;
