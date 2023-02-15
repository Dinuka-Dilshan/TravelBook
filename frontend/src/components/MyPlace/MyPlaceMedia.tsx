import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { BusinessPlace } from "../../models/BusinessPlace";
import ReactGallery from "../Photo-Grid/ReactGallery";
import PlaceImageUpload from "../PlaceImageUpload";
import DeleteImages from "./DeleteImages";

const MyPlaceMedia = () => {
  const {
    isLoading,
    data: businessPlace,
    fetchData,
    isError,
    error,
  } = useFetch<BusinessPlace>();
  const [refetch, setRefetch] = useState(false);

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isPhotoDeleteModalOpen, setIsPhotoDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchData("business/user/place", { method: "GET", type: "authenticated" });
  }, [refetch]);
  return (
    <Box p="2rem" mt={"4rem"}>
      <ReactGallery
        height={500}
        width="100%"
        images={businessPlace?.photos.map((img) => ({ src: img })) || []}
      />
      <Grid container my="1rem" gap={0.5}>
        <Grid item xs={5.9}>
          <Button
            fullWidth
            onClick={() => setIsPhotoModalOpen((p) => !p)}
            variant="contained"
            sx={{
              backgroundColor: "#FF385C",
              borderRadius: 1,
              boxShadow: "none",
              px: "2rem",
              py: "0.5rem",
              "&:hover": {
                backgroundColor: "#FF385C",
              },
            }}
          >
            Add Photos
          </Button>
        </Grid>
        <Grid item xs={5.9}>
          <Button
            fullWidth
            onClick={() => setIsPhotoDeleteModalOpen((p) => !p)}
            variant="contained"
            sx={{
              backgroundColor: "#FF385C",
              borderRadius: 1,
              boxShadow: "none",
              px: "2rem",
              py: "0.5rem",
              "&:hover": {
                backgroundColor: "#FF385C",
              },
            }}
          >
            Delete Photos
          </Button>
        </Grid>
      </Grid>
      {isPhotoModalOpen && (
        <PlaceImageUpload
          isBusiness={true}
          onClose={() => setIsPhotoModalOpen(false)}
          onSuccess={() => {
            setIsPhotoModalOpen(false);
            setRefetch((p) => !p);
          }}
          placeName={businessPlace?.name || ""}
          placeID={""}
        />
      )}
      {isPhotoDeleteModalOpen && (
        <DeleteImages
          onClose={() => {
            setIsPhotoDeleteModalOpen(false);
          }}
          onSuccess={() => {
            setIsPhotoDeleteModalOpen(false);
            setRefetch((p) => !p);
          }}
          images={businessPlace?.photos || []}
        />
      )}
    </Box>
  );
};

export default MyPlaceMedia;
