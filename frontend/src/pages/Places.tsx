import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import ErrorFS from "../components/ErrorFS";
import LoaderFS from "../components/LoaderFS";
import PlaceCard from "../components/Placecard/PlaceCard";
import useFetch from "../hooks/useFetch";
import { Place } from "../models/Place";

const Places = () => {
  const { isLoading, data, fetchData, isError, error } = useFetch<Place[]>();

  useEffect(() => {
    fetchData("place", { method: "GET", useToken: true });
  }, []);

  if (isError) {
    return <ErrorFS error={error} />;
  }

  return (
    <Box px="1rem">
      {isLoading && <LoaderFS />}
      <Grid container px={{ xs: 2, lg: 15 }} pt={5} spacing={5}>
        {data?.map((place, index) => (
          <Grid item xs={12} lg={4} key={index}>
            <PlaceCard {...place} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Places;
