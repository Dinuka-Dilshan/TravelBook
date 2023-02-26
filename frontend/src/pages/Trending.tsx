import { FormControlLabel, Grid, Switch } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import TrendingCard from "../components/TrendingCard";
import useFetch from "../hooks/useFetch";
import useHelmet from "../hooks/useHelmet";
import { BusinessPlace } from "../models/BusinessPlace";
import { Place } from "../models/Place";

const Trending = () => {
  const { data, error, fetchData, isError, isLoading } = useFetch<Place[]>();
  const {
    data: businessData,
    error: businessError,
    fetchData: fetchBusinessData,
    isError: isBusinessError,
    isLoading: isBusinessLoading,
  } = useFetch<BusinessPlace[]>();
  const [isBusinessPlacesShown, setIsBusinessPlacesShown] = useState(false);
  useEffect(() => {
    fetchData("place/trending", { method: "GET", type: "authenticated" });
  }, []);
  useEffect(() => {
    fetchBusinessData("business/trending", {
      method: "GET",
      type: "authenticated",
    });
  }, []);
  useHelmet((title)=>`${title} | Trending 🔥`);

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

  return (
    <Box px="1rem">
      <Box display="flex" justifyContent="flex-end" px="2rem">
        <FormControlLabel
          control={
            <Switch
              onChange={(e, checked) => setIsBusinessPlacesShown(checked)}
            />
          }
          label={isBusinessPlacesShown ? "Hotels" : "Places"}
        />
      </Box>
      <Grid container justifyContent="center" mt="1rem">
        {isBusinessPlacesShown ? (
          <Grid item xs={8}>
            {businessData?.map((place, index) => (
              <TrendingCard
                key={place._id}
                place={place}
                index={index + 1}
                type="Business"
              />
            ))}
          </Grid>
        ) : (
          <Grid item xs={8}>
            {data?.map((place, index) => (
              <TrendingCard
                key={place._id}
                place={place}
                index={index + 1}
                type="Place"
              />
            ))}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Trending;
