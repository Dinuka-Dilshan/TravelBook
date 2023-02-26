import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import PlaceCard from "../components/Business/PlaceCard/PlaceCard";
import ErrorFS from "../components/ErrorFS";
import LoaderFS from "../components/LoaderFS";
import useFetch from "../hooks/useFetch";
import useHelmet from "../hooks/useHelmet";
import { BusinessPlace } from "../models/BusinessPlace";

const Hotels = () => {
  const { isLoading, data, fetchData, isError, error } =
    useFetch<BusinessPlace[]>();

  useEffect(() => {
    fetchData("business", { method: "GET", type: "authenticated" });
  }, [fetchData]);

  useHelmet((title) => `${title} | Hotels`);

  if (isError) {
    return <ErrorFS error={error} />;
  }

  if (isLoading && !data) {
    return <LoaderFS />;
  }

  return (
    <Box px="1rem" mb="2rem">
      <Grid container px={{ xs: 0, lg: 15 }} pt={{ xs: 2, lg: 4 }} spacing={5}>
        {data
          ?.filter((place) => {
            //do not list hotels that haven't got any packages
            return place?.packages && place.packages.length > 0;
          })
          ?.map((place, index) => (
            <Grid item xs={12} lg={4} key={index}>
              <PlaceCard {...place} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Hotels;
