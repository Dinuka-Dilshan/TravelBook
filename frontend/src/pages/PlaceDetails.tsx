import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import {
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { formatRelative, parseISO } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddRating from "../components/AddRating";
import AvatarLink from "../components/Avatar";
import CommentSecton from "../components/CommentSection";
import ErrorFS from "../components/ErrorFS";
import Like from "../components/Like";
import LoaderFS from "../components/LoaderFS";
import ViewLocation from "../components/Location";
import ReactGallery from "../components/Photo-Grid/ReactGallery";
import ImageUpload from "../components/PlaceImageUpload";
import PlaceLocationDetailsCard from "../components/PlaceLocationDetailsCard";
import ShareLocation from "../components/ShareLocation/ShareLocation";
import useFetch from "../hooks/useFetch";
import useHelmet from "../hooks/useHelmet";
import { Place } from "../models/Place";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/slices/authSlice";
import { capitalizeEachFirst, removeWhiteSpacesWith } from "../utils/string";
const srcset = (image: string, size: number, rows = 1, cols = 1) => {
  return {
    src: `${image}`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
};

const PlaceDetails = () => {
  const { id } = useParams();
  const { _id } = useAppSelector(selectUser);

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
  const { fetchData: notifyViewRecord } = useFetch();
  useHelmet(place?.name);

  const iconButtonClickhandler = (key: keyof typeof iconButtonStatus) => {
    setIconButtonStatus((prev) => {
      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };

  const refetchPlaceDetails = useCallback(() => setRefetch((p) => !p), []);

  useEffect(() => {
    fetchData(`place/${id}`, { method: "GET", type: "authenticated" });
  }, [refetch]);

  useEffect(() => {
    notifyViewRecord(`place/${id}/view`, {
      method: "POST",
      type: "authenticated",
    });
  }, []);

  if (isError) {
    return <ErrorFS error={error} />;
  }

  if (isLoading && !place) {
    return (
      <LinearProgress
        sx={{
          background: "linear-gradient(to right, red, purple)",
          height: "0.1rem",
        }}
      />
    );
  }

  return (
    <Container sx={{ px: { lg: "0", xs: "1rem" }, pt: "0" }}>
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
            refetchPlaceDetails();
          }}
          place={place}
          rating={place?.ratings.find((rate) => rate.user === _id)?.amount}
          refresh={refetchPlaceDetails}
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
          {place && (
            <Box mb="1rem">
              <ReactGallery
                images={place.photos.map((p) => ({ src: p }))}
                height={500}
                width={"100%"}
              />
            </Box>
            // <ImageList
            //   sx={{ width: "100%", maxHeight: 500 }}
            //   variant="quilted"
            //   cols={4}
            //   rowHeight={121}
            // >
            //   {place.photos.map((photo, index) => (
            //     <ImageListItem key={index} cols={4} rows={4}>
            //       <img {...srcset(photo, 121, 2, 1)} alt={""} loading="lazy" />
            //     </ImageListItem>
            //   ))}
            // </ImageList>
          )}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pb={"1rem"}
            border={"0.1rem solid #EFEFEF"}
            borderTop={0}
            borderLeft={0}
            borderRight={0}
            boxSizing={"border-box"}
            mr={"0.5rem"}
          >
            <Typography
              fontWeight={"bold"}
              fontFamily={"Poor Story, cursive"}
              sx={{ fontSize: { lg: "1.5rem", xs: "1.3rem" } }}
            >
              {capitalizeEachFirst(place?.name || "")}{" "}
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{ gap: { lg: 2, xs: 1 } }}
              alignItems="center"
            >
              <ShowRating
                rating={place?.ratings.reduce((acc, val, index) => {
                  if (index === place.ratings.length - 1) {
                    return (acc + val.amount) / place.ratings.length;
                  } else {
                    return acc + val.amount;
                  }
                }, 0)}
              />
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

              <Like
                placeID={place?._id || ""}
                isLiked={place?.isLiked || false}
              />

              <IconButton onClick={() => iconButtonClickhandler("isRaingOpen")}>
                <StarIcon />
              </IconButton>
              <IconButton onClick={() => iconButtonClickhandler("isShareOpen")}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>

          <Typography letterSpacing={1.2} py={"1rem"}>
            {place?.description}
          </Typography>
          <PlaceLocationDetailsCard
            country={place?.country || ""}
            state={place?.state || ""}
            longitude={place?.longitude || 0}
            latitude={place?.latitude || 0}
          />
          <Box display="flex" mb="1rem" justifyContent={"space-between"}>
            <Box display="flex" alignItems="center" gap={1}>
              <AvatarLink
                image={place?.addedBy.profilePicture || ""}
                userID={place?.addedBy._id || ""}
                name={place?.addedBy.name || ""}
              />
              <Box>
                <Typography fontWeight={"bold"} fontSize="0.9rem">
                  {removeWhiteSpacesWith(
                    place?.addedBy.name?.toLowerCase() || "",
                    "_"
                  )}
                </Typography>
                {place?.addedOn && (
                  <Typography fontSize="0.8rem" color={"#CACACA"}>
                    {formatRelative(parseISO(place.addedOn), new Date())}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6} mt="2rem">
          {place?._id && <CommentSecton placeID={place._id} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceDetails;

const ShowRating = ({ rating }: { rating: number | undefined }) => {
  return (
    <Tooltip title={'Average Rating'}>
      <Typography
        fontSize="1.1rem"
        fontWeight="bold"
        component="span"
        color="#FF5D7A"
      >
        {rating}
        <Typography component="span" fontSize="0.7rem">
          /5
        </Typography>
      </Typography>
    </Tooltip>
  );
};
