import {
  Button,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountryInput from "../components/CountryInput";
import FilePicker from "../components/FilePicker";
import LocationPicker from "../components/Location/LocationPicker";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";
import useHelmet from "../hooks/useHelmet";
import { Place } from "../models/Place";

const AddPlace = () => {
  const { field, inputHandler, touchHandler, resetHandler, state } = useForm({
    isValid: false,
    fields: {
      name: {
        value: "",
        isValid: false,
        validators: [
          {
            validator: (val) => val.length > 0,
            errorMessage: "Name cannot be empty",
          },
        ],
        errorMessage: "Name cannot be empty",
        isTouched: false,
      },
      description: {
        value: "",
        isValid: false,
        validators: [
          {
            validator: (val) => val.length > 0,
            errorMessage: "Descripton cannot be empty",
          },
        ],
        isTouched: false,
        errorMessage: "Descripton cannot be empty",
      },
      state: {
        value: "",
        isValid: false,
        validators: [
          {
            validator: (val) => val.length > 0,
            errorMessage: "State cannot be empty",
          },
        ],
        isTouched: false,
        errorMessage: "State cannot be empty",
      },
      country: {
        value: "",
        isValid: false,
        validators: [
          {
            validator: (val) => val.length > 0,
            errorMessage: "Country cannot be empty",
          },
        ],
        isTouched: false,
        errorMessage: "Country cannot be empty",
      },
    },
  });
  useHelmet("Add place");
  const { data, error, fetchData, isError, isLoading } = useFetch<Place>();
  const [image, setImage] = useState<File>();
  const [location, setLocation] = useState({ lat: 6.9271, lng: 79.8612 });
  const [isLocationSet, setIsLocationSet] = useState({
    isSet: false,
    isBlur: false,
  });

  const navigate = useNavigate();
  const handleReset = () => {
    setImage(undefined);
    resetHandler();
  };

  const handleAddPlace = () => {
    if (state.isValid && isLocationSet.isSet) {
      const formData = new FormData();
      formData.set("name", field("name").value);
      formData.set("description", field("description").value);
      formData.set("country", field("country").value);
      formData.set("state", field("state").value);
      formData.set("latitude", String(location.lat));
      formData.set("longitude", String(location.lng));
      formData.append("placeImage", image as Blob);
      fetchData("place", {
        method: "POST",
        body: formData,
        type: "file",
        autoErrorNotify: true,
      });
    }
  };

  useEffect(() => {
    if (data && !error) {
      navigate(`/places/${data._id}`, { replace: true });
    }
  }, [data]);

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
      <Grid container justifyContent={"center"}>
        <Grid item xs={5}>
          <Typography
            pt="4rem"
            fontSize={"1.5rem"}
            fontWeight={"bold"}
            fontFamily={"Poor Story, cursive"}
            sx={{ fontSize: { lg: "1.5rem", xs: "1.3rem" } }}
          >
            Add New Place
          </Typography>
          <TextField
            value={field("name").value}
            onChange={(e) => {
              inputHandler("name", e.target.value);
            }}
            onBlur={() => {
              touchHandler("name");
            }}
            size="small"
            fullWidth
            sx={{ my: "1rem" }}
            placeholder="Name"
            label="Name"
          />
          {!field("name").isValid && field("name").isTouched && (
            <Typography pt="0.5rem" color={"custom.red"}>
              {field("name").errorMessage}
            </Typography>
          )}
          <CountryInput
            country={field("country").value}
            state={field("state").value}
            setState={(state) => {
              inputHandler("state", state);
            }}
            setCountry={(country) => {
              inputHandler("country", country);
            }}
            countryError={
              !field("country").isValid && field("country").isTouched
                ? field("country").errorMessage
                : ""
            }
            stateError={
              !field("state").isValid && field("state").isTouched
                ? field("state").errorMessage
                : ""
            }
            onStateBlur={() => {
              touchHandler("state");
            }}
            onCountryBlur={() => {
              touchHandler("country");
            }}
          />
          <TextField
            value={field("description").value}
            onChange={(e) => {
              inputHandler("description", e.target.value);
            }}
            onBlur={() => {
              touchHandler("description");
            }}
            size="small"
            fullWidth
            sx={{ mt: "1rem" }}
            placeholder="Description"
            label="Description"
          />
          {!field("description").isValid && field("description").isTouched && (
            <Typography pt="0.5rem" color={"custom.red"}>
              {field("description").errorMessage}
            </Typography>
          )}
          <LocationPicker
            onSelect={() =>
              setIsLocationSet((prev) => ({ ...prev, isSet: true }))
            }
            onBlur={() =>
              setIsLocationSet((prev) => ({ ...prev, isBlur: true }))
            }
            onClick={(coods) => {
              setLocation((prev) => {
                if (coods?.lat && coods?.lng) {
                  return { lat: coods.lat, lng: coods.lng };
                }
                return prev;
              });
            }}
            location={location}
          />
          {!isLocationSet.isSet && isLocationSet.isBlur && (
            <Typography pt="0.5rem" color={"custom.red"}>
              Please select the location - click to select
            </Typography>
          )}
          <FilePicker
            onSelect={(file) => {
              setImage(file);
            }}
            file={image}
          />

          <Button
            sx={{ mt: "2rem", mr: "1rem", width: "25%" }}
            variant="contained"
            onClick={handleReset}
          >
            Clear
          </Button>
          <Button
            disabled={!state.isValid || isLoading || !isLocationSet.isSet}
            onClick={handleAddPlace}
            sx={{ mt: "2rem", width: "25%" }}
            color={"success"}
            variant="contained"
          >
            Save
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
    </>
  );
};

export default AddPlace;
