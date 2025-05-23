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

const Insight = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("Business");
  const navigate = useNavigate();

  const { data, error, fetchData, isLoading } =
    useFetch<InsightSearchResponse>();

  const handleSearch = () => {
    fetchData("admin/search", {
      method: "POST",
      type: "authenticated",
      body: { name, country, type },
    });
  };

  return (
    <Box p="2rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontSize="1rem" fontWeight="bold">
          Select a place to get the Insight Report
        </Typography>
        <Button onClick={() => navigate("/admin/insight/compare")}>
          Compare
        </Button>
      </Box>
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
        <Grid item xs={12} display="flex" justifyContent="flex-end">
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
            navigate(`/admin/insight/result?type=${type}&id=${place._id}`)
          }
          place={place}
          key={place._id}
        />
      ))}
      {data?.places.length === 0 && !!data.type && (
        <Typography
          p="2rem"
          textAlign="center"
          fontSize="1rem"
          fontWeight="500"
        >
          No Results Found (:
        </Typography>
      )}
    </Box>
  );
};

export default Insight;
