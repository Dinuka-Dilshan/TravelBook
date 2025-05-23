import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import countries from "@/assets/country.json";
import InsightResultCard from "@/components/ADMIN/InsightResultCard";
import useFetch from "@/hooks/useFetch";
import { InsightSearchResponse } from "@/models/Admin";

const InsightCompare = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [type, setType] = useState("Business");
  const { data, error, fetchData, isLoading } =
    useFetch<InsightSearchResponse>();
  const navigate = useNavigate();

  const handleSearch = () => {
    fetchData("admin/search", {
      method: "POST",
      type: "authenticated",
      body: { name, country, type },
    });
  };
  return (
    <Box p="2rem">
      <Typography fontSize="1rem" fontWeight="bold">
        Search and Select two places to compare
      </Typography>
      <Grid
        container
        border={"1px solid #EAE9EE"}
        borderRadius={3}
        mt="2rem"
        p="2rem"
        gap={1.2}
        justifyContent="space-between"
      >
        <Grid item xs={3.66}>
          <TextField
            size="small"
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={3.66}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              label="Country"
              size="small"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <MenuItem value={""} sx={{ width: "100%", height: "2rem" }}>
                {"   "}
              </MenuItem>
              {countries.map((country, index) => (
                <MenuItem
                  key={index}
                  value={country.country}
                  sx={{ width: "100%" }}
                >
                  {country.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3.66}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              size="small"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={"Business"} sx={{ width: "100%" }}>
                Business
              </MenuItem>
              <MenuItem value={"Normal"} sx={{ width: "100%" }}>
                Normal
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="space-between">
          <Grid item xs={3.66}></Grid>
          <Grid item xs={3.66}>
            <Button
              fullWidth
              variant="contained"
              disabled={selectedPlaces.length < 2}
              onClick={() =>
                navigate(
                  `/admin/insight/compareresult?type=${type}&id1=${selectedPlaces[0]}&id2=${selectedPlaces[1]}`
                )
              }
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
            >
              Compare
            </Button>
          </Grid>
          <Grid item xs={3.66}>
            <Button
              fullWidth
              disabled={isLoading}
              onClick={handleSearch}
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
            >
              Search
              {isLoading && (
                <CircularProgress
                  color="inherit"
                  size={"1.3rem"}
                  sx={{ ml: "1rem" }}
                />
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {data?.places.map((place) => (
        <InsightResultCard
          onClick={() =>
            setSelectedPlaces((prev) => {
              const ids = [...prev, place._id];
              if (ids.length > 2) {
                return ids.slice(1);
              } else {
                return ids;
              }
            })
          }
          place={place}
          key={place._id}
          isSelected={selectedPlaces.includes(place._id)}
        />
      ))}
    </Box>
  );
};

export default InsightCompare;
