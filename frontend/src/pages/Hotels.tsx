import { Grid, TextField, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import ErrorFS from "../components/ErrorFS";
import LoaderFS from "../components/LoaderFS";
import PlaceCard from "../components/Business/PlaceCard/PlaceCard";
import useFetch from "../hooks/useFetch";
import { BusinessPlace } from "../models/BusinessPlace";
import { Place } from "../models/Place";

const Hotels = () => {
  const { isLoading, data, fetchData, isError, error } =
    useFetch<BusinessPlace[]>();
  // const [filter, setFilter] = useState("");
  // const [filteredData, setFilteredData] = useState<Place[]>();

  useEffect(() => {
    fetchData("business", { method: "GET", type: "authenticated" });
  }, [fetchData]);

  // useEffect(() => {
  //   setFilteredData(
  //     data?.filter((place) =>
  //       place.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  //     )
  //   );
  // }, [data, filter]);

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
