import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { BusinessPlace } from "../../models/BusinessPlace";
import Loader from "../Loader";
import MyPlace from "./MyPlace";
import MyPlaceMedia from "./MyPlaceMedia";
import RegisterPlace from "./RegisterPlace";

const PlaceDetails = () => {
  const {
    isLoading,
    data: businessPlace,
    fetchData,
    isError,
    error,
  } = useFetch<BusinessPlace>();

  useEffect(() => {
    fetchData("business/user/place", { method: "GET", type: "authenticated" });
  }, []);


    if (isLoading) {
      return (
        <Box
          width="100%"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Loader />
        </Box>
      );
    }
  

  if (!businessPlace && !isLoading) {
    return <RegisterPlace />;
  }

  if (businessPlace) {
    return (
      <Grid container>
        <Grid item xs={6}>
          <MyPlace />
        </Grid>
        <Grid item xs={6}>
          <MyPlaceMedia />
        </Grid>
      </Grid>
    );
  }
};

export default PlaceDetails;
