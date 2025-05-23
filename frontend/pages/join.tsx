import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { differenceInYears } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import CountryInput from "@/components/CountryInput";
import FilePicker from "@/components/FilePicker";
import useFetch from "@/hooks/useFetch";
import useForm from "@/hooks/useForm";
import { User } from "@/models/User";

const SignUp = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const { field, inputHandler, resetHandler, state, touchHandler } = useForm({
    isValid: false,
    fields: {
      name: {
        value: "",
        errorMessage: "Invalid Name",
        isValid: false,
        validators: [
          {
            validator: (val) => val.length > 1,
            errorMessage: "name cannot be empty ",
          },
        ],
        isTouched: false,
      },
      email: {
        value: "",
        errorMessage: "Invalid Email",
        isValid: false,
        validators: [
          { validator: (val) => isEmail(val), errorMessage: "Invalid Email" },
        ],
        isTouched: false,
      },
      birthday: {
        value: "",
        errorMessage: "Age should be 14+",
        isValid: false,
        validators: [
          {
            validator: (val) => {
              return differenceInYears(new Date(), new Date(val)) > 13;
            },
            errorMessage: "Age should be 14+",
          },
        ],
        isTouched: false,
      },
      password: {
        value: "",
        errorMessage: "Password should be 8 - 12  charactors",
        isValid: false,
        validators: [
          {
            validator: (val) => isLength(val, { max: 12, min: 8 }),
            errorMessage: "Password should be 8 - 12  charactors",
          },
        ],
        isTouched: false,
      },
      gender: {
        value: "male",
        errorMessage: "Gender cannot be empty",
        isValid: true,
        validators: [
          {
            validator: (val) => true,
            errorMessage: "Gender cannot be empty",
          },
        ],
        isTouched: false,
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
      bio: {
        value: "",
        errorMessage: "Bio should be more than 30 charactors",
        isValid: false,
        validators: [
          {
            validator: (val) => val.length > 30,
            errorMessage: "Bio should be more than 30 charactors ",
          },
        ],
        isTouched: false,
      },
    },
  });

  const { data, error, fetchData, isError, isLoading } = useFetch<User>();
  const [image, setImage] = useState<File>();
  const navigate = useNavigate();
  const handleReset = () => {
    setImage(undefined);
    resetHandler();
  };

  const handleJoin = () => {
    if (state.isValid) {
      const formData = new FormData();
      formData.set("name", field("name").value);
      formData.set("email", field("email").value);
      formData.set("password", field("password").value);
      formData.set("birthDate", field("birthday").value);
      formData.set("gender", field("gender").value);
      formData.set("state", field("state").value);
      formData.append("country", field("country").value);
      formData.append("bio", field("bio").value);
      formData.append("profilePicture", image as Blob);
      fetchData("user/signup", {
        method: "POST",
        body: formData,
        type: "file",
        autoErrorNotify: true,
      });
    }
  };

  useEffect(() => {
    if (data && !error) {
      navigate("/places");
    }
  }, [data]);

  const handleClickShowPassword = () => {
    setIsPasswordShow((p) => !p);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };
  return (
    <Container>
      <Grid
        container
        width={"100%"}
        justifyContent="center"
        height={"100vh"}
        alignItems="center"
      >
        <Grid
          xs={12}
          lg={6}
          item
          display={"flex"}
          flexDirection="column"
          gap={"1rem"}
          p="2rem"
          bgcolor="#F6F6F6"
          borderRadius="0.8rem"
        >
          <Typography
            fontSize={"1.8rem"}
            fontWeight="bold"
            fontFamily={"Poor Story, cursive"}
          >
            Join TravelMate
          </Typography>
          {isLoading && (
            <LinearProgress
              sx={{
                background: "linear-gradient(to right, red, purple)",
                height: "0.1rem",
              }}
            />
          )}
          <TextField
            size="small"
            fullWidth
            onBlur={() => {
              touchHandler("name");
            }}
            label="Name"
            value={field("name").value}
            onChange={(e) => {
              inputHandler("name", e.target.value);
            }}
          />
          {!field("name").isValid && field("name").isTouched && (
            <Typography pt="0.5rem" color={"custom.red"}>
              {field("name").errorMessage}
            </Typography>
          )}
          <TextField
            size="small"
            fullWidth
            onBlur={() => {
              touchHandler("email");
            }}
            label="Email"
            value={field("email").value}
            onChange={(e) => {
              inputHandler("email", e.target.value);
            }}
          />
          {!field("email").isValid && field("email").isTouched && (
            <Typography pt="0.5rem" color={"custom.red"}>
              {field("email").errorMessage}
            </Typography>
          )}
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              value={field("password").value}
              onChange={(e) => {
                inputHandler("password", e.target.value);
              }}
              onBlur={() => {
                touchHandler("password");
              }}
              fullWidth
              id="outlined-adornment-password"
              type={isPasswordShow ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {isPasswordShow ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {!field("password").isValid && field("password").isTouched && (
            <Typography pt="0.5rem" color={"custom.red"}>
              {field("password").errorMessage}
            </Typography>
          )}
          <TextField
            type="date"
            size="small"
            fullWidth
            onBlur={() => {
              touchHandler("birthday");
            }}
            value={field("birthday").value}
            onChange={(e) => {
              inputHandler("birthday", e.target.value);
            }}
          />
          {!field("birthday").isValid && field("birthday").isTouched && (
            <Typography pt="0.5rem" color={"custom.red"}>
              {field("birthday").errorMessage}
            </Typography>
          )}
          <Select
            size="small"
            fullWidth
            value={field("gender").value}
            onChange={(e) => {
              inputHandler("gender", e.target.value);
            }}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>FeMale</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
          <CountryInput
            gap="1rem"
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
          <FilePicker
            gap="0"
            title="Select Profile Pictire"
            onSelect={(file) => {
              setImage(file);
            }}
            file={image}
          />
          <TextField
            size="small"
            fullWidth
            onBlur={() => {
              touchHandler("bio");
            }}
            label="Bio"
            value={field("bio").value}
            onChange={(e) => {
              inputHandler("bio", e.target.value);
            }}
          />
          {!field("bio").isValid && field("bio").isTouched && (
            <Typography pt="0.5rem" color={"custom.red"}>
              {field("bio").errorMessage}
            </Typography>
          )}
          <Grid container width={"100%"} justifyContent="space-between" gap={1}>
            <Grid item xs={5.5}>
              <Button
                fullWidth
                sx={{ fontSize: "1rem" }}
                variant="contained"
                onClick={handleReset}
              >
                Clear
              </Button>
            </Grid>
            <Grid item xs={5.5}>
              <Button
                fullWidth
                disabled={!state.isValid || isLoading}
                onClick={handleJoin}
                sx={{ fontSize: "1rem" }}
                color={"success"}
                variant="contained"
              >
                Join
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
      </Grid>
    </Container>
  );
};

export default SignUp;
