import { Grid, TextField, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import ErrorFS from "@/components/ErrorFS";
import LoaderFS from "@/components/LoaderFS";
import PlaceCard from "@/components/Placecard/PlaceCard";
import useFetch from "@/hooks/useFetch";
import { Place } from "@/models/Place";

const Places = () => {
  const { isLoading, data, fetchData, isError, error } = useFetch<Place[]>();
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState<Place[]>();

  useEffect(() => {
    fetchData("place", { method: "GET", type: "authenticated" });
  }, [fetchData]);

  useEffect(() => {
    setFilteredData(
      data?.filter((place) =>
        place.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      )
    );
  }, [data, filter]);

  if (isError) {
    return <ErrorFS error={error} />;
  }

  if (isLoading && !data) {
    return <LoaderFS />;
  }

  return (
    <Box px="1rem" mb="2rem">
      <Grid container px={{ xs: 0, lg: 15 }} pt={{ xs: 2, lg: 4 }} spacing={5}>
        {filteredData?.map((place, index) => (
          <Grid item xs={12} lg={4} key={index}>
            <PlaceCard {...place} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Places;
