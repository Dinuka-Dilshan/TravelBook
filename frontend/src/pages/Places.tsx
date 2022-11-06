import AddIcon from "@mui/icons-material/Add";
import { Fab, Grid, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorFS from "../components/ErrorFS";
import LoaderFS from "../components/LoaderFS";
import PlaceCard from "../components/Placecard/PlaceCard";
import useFetch from "../hooks/useFetch";
import { Place } from "../models/Place";

const Places = () => {
  const { isLoading, data, fetchData, isError, error } = useFetch<Place[]>();
  const navigate = useNavigate();

  const handleAddPlaceClick = () => navigate("/addplace");

  useEffect(() => {
    fetchData("place", { method: "GET", type: "authenticated" });
  }, []);

  if (isError) {
    return <ErrorFS error={error} />;
  }

  return (
    <Box px="1rem" mb='2rem'>
      {isLoading && <LoaderFS />}
      <Tooltip title={"Add Place"}>
        <Fab
          onClick={handleAddPlaceClick}
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: "5%", right: "5%" }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Grid container px={{ xs: 0, lg: 15 }} pt={5} spacing={5}>
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
