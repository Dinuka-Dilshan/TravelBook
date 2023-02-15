import { Grid, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { BusinessPlace } from "../../models/BusinessPlace";
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
      <LinearProgress
        sx={{
          background: "linear-gradient(to right, red, purple)",
          height: "0.1rem",
        }}
      />
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
