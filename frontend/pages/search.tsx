import {
  Button,
  FormControlLabel,
  Grid,
  LinearProgress,
  Switch,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import BusinessPlaceCard from "@/components/Business/PlaceCard/PlaceCard";
import CountryInput from "@/components/CountryInput";
import PlaceCard from "@/components/Placecard/PlaceCard";
import useFetch from "@/hooks/useFetch";
import useHelmet from "@/hooks/useHelmet";
import { BusinessPlace } from "@/models/BusinessPlace";
import { Place } from "@/models/Place";

const Search = () => {
  const [country, setCountry] = useState("Sri Lanka");
  const [state, setState] = useState("");
  const [isHotel, setIsHotel] = useState(true);
  const [isSearchPanelShown, setIsSearchPanelShown] = useState(true);

  const { data, error, fetchData, isError, isLoading } = useFetch<
    Place[] | BusinessPlace[]
  >();

  useHelmet((title) => `${title} | Search`);

  const searchHandler = () => {
    fetchData(`${isHotel ? "business" : "place"}/search`, {
      method: "POST",
      type: "authenticated",
      body: {
        state,
        country,
      },
    });
  };

  useEffect(() => {
    if (data && !isError) {
      setIsSearchPanelShown(false);
    }
  }, [data, isError]);

  return (
    <>
      {isLoading && (
        <LinearProgress
          sx={{
            background: "linear-gradient(to right, red, purple)",
            height: "0.1rem",
          }}
        />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: "2rem",
        }}
      >
        <Button onClick={() => setIsSearchPanelShown((p) => !p)}>
          {isSearchPanelShown ? "Hide" : "Show"} Search
        </Button>
      </Box>
      {data?.length === 0 && !isSearchPanelShown && (
        <Box
          sx={{
            p: { lg: "5rem", xs: "1rem" },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              {data?.length === 0 && (
                <Typography
                  sx={{ fontSize: "1.8rem", fontWeight: 500 }}
                  align="center"
                >
                  No Results Found !
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
      {isSearchPanelShown && (
        <Box
          sx={{
            p: { lg: "1rem", xs: "1rem" },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid container width={600}>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: "1.8rem", fontWeight: 500 }}>
                Location
              </Typography>
            </Grid>
            <Grid item xs={12} mt={"1.5rem"}>
              <CountryInput
                country={country}
                onCountryBlur={() => {}}
                onStateBlur={() => {}}
                setCountry={(country) => setCountry(country)}
                setState={(state) => setState(state)}
                state={state}
              />
            </Grid>
            <Grid item xs={12} mt={"1.5rem"}>
              <Typography sx={{ fontSize: "1.8rem", fontWeight: 500 }}>
                Place Type
              </Typography>
              <FormControlLabel
                control={
                  <Switch onChange={(e, checked) => setIsHotel(checked)} />
                }
                checked={isHotel}
                label={isHotel ? "Hotels" : "Places"}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={searchHandler}
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
                disabled={isLoading}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {data && !isHotel && (
        <Box px="1rem" mb="2rem">
          <Grid
            container
            px={{ xs: 0, lg: 15 }}
            pt={{ xs: 2, lg: 4 }}
            spacing={5}
          >
            {data?.map((place, index) => (
              <Grid item xs={12} lg={4} key={index}>
                <PlaceCard {...place} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {data && isHotel && (
        <Box px="1rem" mb="2rem">
          <Grid
            container
            px={{ xs: 0, lg: 15 }}
            pt={{ xs: 2, lg: 4 }}
            spacing={5}
          >
            {data
              ?.filter((place: BusinessPlace) => {
                //do not list hotels that haven't got any packages
                return place?.packages && place.packages.length > 0;
              })
              ?.map((place, index) => (
                <Grid item xs={12} lg={4} key={index}>
                  <BusinessPlaceCard {...place} />
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Search;
