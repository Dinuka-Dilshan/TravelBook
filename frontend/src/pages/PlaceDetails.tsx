import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import {
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
import AvatarLink from "../components/Avatar";
import CommentSecton from "../components/CommentSection";
import ErrorFS from "../components/ErrorFS";
import LoaderFS from "../components/LoaderFS";
import ViewLocation from "../components/Location";
import ImageUpload from "../components/PlaceImageUpload";
import PlaceLocationDetailsCard from "../components/PlaceLocationDetailsCard";
import ShareLocation from "../components/ShareLocation/ShareLocation";
import useFetch from "../hooks/useFetch";
import useHelmet from "../hooks/useHelmet";
import { Place } from "../models/Place";
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
    isAddPhotoOpen: false,
  });

  const [refetch, setRefetch] = useState(false);
  useHelmet(place?.name);

  const iconButtonClickhandler = (key: keyof typeof iconButtonStatus) => {
    setIconButtonStatus((prev) => {
      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };

  const refetchPlaceDetails = () => setRefetch((p) => !p);

  useEffect(() => {
    fetchData(`place/${id}`, { method: "GET", type: "authenticated" });
  }, [refetch]);

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
          location={{
            lat: place?.latitude || 0,
            lng: place?.longitude || 0,
          }}
        />
      )}

      {iconButtonStatus.isAddPhotoOpen && (
        <ImageUpload
          onClose={() => iconButtonClickhandler("isAddPhotoOpen")}
          placeName={place?.name || ""}
          placeID={place?._id || ""}
          onSuccess={refetchPlaceDetails}
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
              <IconButton
                onClick={() => iconButtonClickhandler("isAddPhotoOpen")}
              >
                <AddAPhotoIcon />
              </IconButton>
              <IconButton
                onClick={() => iconButtonClickhandler("isLocationOpen")}
              >
                <LocationOnIcon />
              </IconButton>
              <IconButton
                onClick={() => iconButtonClickhandler("isHeartClicked")}
              >
                <FavoriteIcon
                  sx={{
                    color: iconButtonStatus.isHeartClicked ? "#FF5D7A" : "",
                  }}
                />
              </IconButton>
              <IconButton onClick={() => iconButtonClickhandler("isRaingOpen")}>
                <StarIcon />
              </IconButton>
              <IconButton onClick={() => iconButtonClickhandler("isShareOpen")}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
          {place && (
            <ImageList
              sx={{ width: "100%", maxHeight: 500 }}
              variant="quilted"
              cols={4}
              rowHeight={121}
            >
              {place.photos.map((photo, index) => (
                <ImageListItem key={index} cols={4} rows={4}>
                  <img {...srcset(photo, 121, 2, 1)} alt={""} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <PlaceLocationDetailsCard
            country={place?.country || ""}
            state={place?.state || ""}
            longitude={place?.longitude || 0}
            latitude={place?.latitude || 0}
          />
          <Box
            display="flex"
            p={"1rem"}
            mb="1rem"
            bgcolor="#DEEFFF"
            justifyContent={"space-between"}
            borderRadius={"0.2rem"}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <AvatarLink
                image={place?.addedBy.profilePicture || ""}
                userID={place?.addedBy._id || ""}
                name={place?.addedBy.name || ""}
              />
              <Typography fontWeight={"bold"} fontSize="0.9rem">
                {place?.addedBy.name}
              </Typography>
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
