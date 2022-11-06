import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import countries from "../../assets/country.json";

interface Props {
  country: string;
  state: string;
  setState: (state: string) => void;
  setCountry: (country: string) => void;
  countryError?: string;
  stateError?: string;
  onStateBlur: () => void;
  onCountryBlur: () => void;
  gap?: string;
}

const CountryInput: React.FC<Props> = ({
  setCountry,
  setState,
  state,
  country,
  countryError,
  stateError,
  onStateBlur,
  onCountryBlur,
  gap,
}) => {
  const [availableStates, setAvailableStates] = useState<string[]>();

  const handleCountryChange = (e: SelectChangeEvent<string>) => {
    setCountry(e.target.value);
  };
  const handleStateChange = (e: SelectChangeEvent<string>) => {
    setState(e.target.value);
  };

  useEffect(() => {
    const state = countries.filter((c) => c.country === country)[0]?.states;
    setAvailableStates(state);
  }, [country]);

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>Country</InputLabel>
        <Select
          onBlur={onCountryBlur}
          value={country}
          label="Country"
          onChange={handleCountryChange}
          size="small"
        >
          <MenuItem value={""} sx={{ width: "100%" }}>
            {" "}
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
      {countryError && (
        <Typography pt="0.5rem" color={"custom.red"}>
          {countryError}
        </Typography>
      )}
      <FormControl fullWidth sx={{ mt: gap ? gap : "1rem" }}>
        <InputLabel>State</InputLabel>
        <Select
          onBlur={onStateBlur}
          value={state}
          label="State"
          onChange={handleStateChange}
          fullWidth
          size="small"
          placeholder="State"
        >
          {availableStates?.map((state, index) => (
            <MenuItem key={index} value={state} sx={{ width: "100%" }}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {stateError && (
        <Typography pt="0.5rem" color={"custom.red"}>
          {stateError}
        </Typography>
      )}
    </Box>
  );
};

export default CountryInput;
