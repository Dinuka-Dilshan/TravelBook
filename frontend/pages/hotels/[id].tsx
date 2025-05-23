import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import { useParams } from "react-router-dom";
import Booking from "@/components/Business/Booking";
import ErrorFS from "@/components/ErrorFS";
import Like from "@/components/Like";
import LoaderFS from "@/components/LoaderFS";
import ViewLocation from "@/components/Location";
import LocationBox from "@/components/Location/LocationBox";
import FacilityIcons from "@/components/MyPlace/FacilityIconMapper";
import ReactGallery from "@/components/Photo-Grid/ReactGallery";
import PlaceLocationDetailsCard from "@/components/PlaceLocationDetailsCard";
//@ts-ignore
import ShareLocation from "@/components/ShareLocation/ShareLocation";
import useFetch from "@/hooks/useFetch";
import useHelmet from "@/hooks/useHelmet";
import { BusinessPlace } from "@/models/BusinessPlace";
import { capitalizeEachFirst, removeWhiteSpacesWith } from "@/utils/string";

const PlaceDetails = () => {
  const { id } = useParams();

  const {
    isLoading,
    data: place,
    fetchData,
    isError,
    error,
  } = useFetch<BusinessPlace>();
  const [iconButtonStatus, setIconButtonStatus] = useState({
    isShareOpen: false,
    isRaingOpen: false,
    isHeartClicked: false,
    isLocationOpen: false,
  });

  const [refetch, setRefetch] = useState(false);
  const { fetchData: notifyViewRecord } = useFetch();
  useHelmet((title) => `${title} | ${place?.name}`);

  const iconButtonClickhandler = (key: keyof typeof iconButtonStatus) => {
    setIconButtonStatus((prev) => {
      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const refetchPlaceDetails = useCallback(() => setRefetch((p) => !p), []);

  useEffect(() => {
    fetchData(`business/${id}`, { method: "GET", type: "authenticated" });
  }, [refetch]);

  useEffect(() => {
    notifyViewRecord(`business/${id}/view`, {
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
    <Container sx={{ px: { lg: "0", xs: "1rem" }, pt: "1rem" }}>
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
      {isBookingModalOpen && (
        <Booking
          onClose={() => setIsBookingModalOpen((p) => !p)}
          place={place}
        />
      )}
      {/* {iconButtonStatus.isRaingOpen && (
        <AddRating
          onClose={() => {
            setIconButtonStatus((prev) => ({
              ...prev,
              isRaingOpen: false,
            }));
          }}
        />
      )} */}

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
              {capitalizeEachFirst(place?.name || "")}
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{ gap: { lg: 2, xs: 1 } }}
              alignItems="center"
            >
              <IconButton
                onClick={() => iconButtonClickhandler("isLocationOpen")}
              >
                <LocationOnIcon />
              </IconButton>

              <Like
                isBusinessPlace={true}
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
          <Box
            display="flex"
            mb="1rem"
            justifyContent={"space-between"}
            border={"0.1rem solid #EFEFEF"}
            borderTop={0}
            borderLeft={0}
            borderRight={0}
            pb="1rem"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar src={place?.addedBy.profilePicture || ""} />
              <Box>
                <Typography fontWeight={"500"} fontSize="1rem">
                  {place?.name} Hosted By{" "}
                  {removeWhiteSpacesWith(
                    place?.addedBy.name?.toLowerCase() || "",
                    "_"
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Typography
            my="1rem"
            fontWeight={"bold"}
            fontFamily={"Poor Story, cursive"}
            sx={{ fontSize: { lg: "1.5rem", xs: "1.3rem" } }}
          >
            Where you’ll be Stayed At
          </Typography>
          <LocationBox
            height={"400px"}
            width={"100%"}
            location={{
              lat: place?.latitude || 0,
              lng: place?.longitude || 0,
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6} px="2rem">
          <Typography
            fontWeight={"bold"}
            fontFamily={"Poor Story, cursive"}
            sx={{ fontSize: { lg: "1.5rem", xs: "1.3rem" } }}
          >
            What this place offers
          </Typography>
          <Grid container mb="2rem">
            {place?.facilities?.map((facility) => {
              return (
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" py={"1rem"} gap={2}>
                    <FacilityIcons icon={facility} />
                    <Typography fontSize="1rem">{facility}</Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          <Typography
            fontWeight={"bold"}
            fontFamily={"Poor Story, cursive"}
            sx={{ fontSize: { lg: "1.5rem", xs: "1.3rem" } }}
          >
            Packages
          </Typography>
          {place?.packages?.map((pkg) => {
            return (
              <Box
                border={"0.1rem solid #EFEFEF"}
                my="0.5rem"
                p="1rem"
                mb="2rem"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  justifyContent="space-between"
                  mb="0.5rem"
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <HiOutlineHome size={"1.5rem"} />
                    <Typography
                      fontWeight={"500"}
                      fontFamily={"Poor Story, cursive"}
                      fontSize="1.3rem"
                    >
                      {pkg.name}
                    </Typography>
                  </Box>
                  <Typography fontSize="1.2rem">
                    LKR {pkg.dailyPrice}
                    <Typography
                      component={"span"}
                      fontFamily={"Poor Story, cursive"}
                    >
                      {" "}
                      Per day
                    </Typography>
                  </Typography>
                </Box>

                <Typography>
                  Only {pkg.guestSize}{" "}
                  {pkg.guestSize === 1 ? "Guest" : "Guests"} Allowed
                </Typography>
                <Typography>
                  You will have {pkg.numberOfBeds}{" "}
                  {pkg.numberOfBeds === 1 ? "Bed" : "Beds"} to Sleep
                </Typography>
                <Typography>
                  Package Includes {pkg.numberOfRooms}{" "}
                  {pkg.numberOfRooms === 1 ? "Room" : "Rooms"}
                </Typography>
              </Box>
            );
          })}
          <Typography
            fontWeight={"bold"}
            fontFamily={"Poor Story, cursive"}
            sx={{ fontSize: { lg: "1.5rem", xs: "1.3rem" } }}
          >
            Things to know
          </Typography>
          {place?.rules?.map((rule, index) => {
            return (
              <Box
                display="flex"
                alignItems="center"
                py={"1rem"}
                gap={2}
                key={index}
              >
                <FiAlertTriangle />
                <Typography fontSize="1rem">{rule}</Typography>
              </Box>
            );
          })}
          <Button
            onClick={() => {
              setIsBookingModalOpen((p) => !p);
            }}
            fullWidth
            variant="contained"
            sx={{
              mt: "1rem",
              bgcolor: "#FF385C",
              boxShadow: 0,
              borderRadius: 1,
              p: "0.5rem",
              "&:hover": {
                backgroundColor: "#FF385C",
              },
            }}
          >
            Book this place
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceDetails;
