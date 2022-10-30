import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/es/lib/isEmail";
import isEmpty from "validator/es/lib/isEmpty";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";
import { useAppDispatch } from "../store/hooks";
import type { AuthState } from "../store/slices/authSlice";
import { login } from "../store/slices/authSlice";

const Login = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const dispatch = useAppDispatch();
  const { fetchData, isLoading, isError, error, data } = useFetch<AuthState>();
  const navigate = useNavigate();

  const { state, inputHandler, field, touchHandler } = useForm({
    isValid: false,
    fields: {
      email: {
        value: "",
        isValid: false,
        validators: [
          { validator: (val) => isEmail(val), errorMessage: "Invalid Email" },
        ],
        isTouched: false,
      },
      password: {
        value: "",
        isValid: false,
        validators: [
          {
            validator: (val) => !isEmpty(val),
            errorMessage: "Password cannot be empty",
          },
        ],
        isTouched: false,
      },
    },
  });
  const handleClickShowPassword = () => {
    setIsPasswordShow((p) => !p);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    if (state.isValid) {
      fetchData("user/login", {
        body: {
          email: field("email").value,
          password: field("password").value,
        },
        useToken: false,
        method: "POST",
      });
    }
  };
  useEffect(() => {
    if (data?.token) {
      dispatch(login(data));
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/places", { replace: true });
    }
  }, [data]);

  return (
    <Grid container justifyContent="center" alignItems="center" height={"92vh"}>
      <Grid
        item
        xs={12}
        lg={4}
        p="3rem"
        bgcolor="#F6F6F6"
        borderRadius="0.8rem"
      >
        <Typography color="custom.fontGray" fontSize="1.5rem">
          Login
        </Typography>
        <Box mt="1rem">
          <TextField
            fullWidth
            onBlur={() => {
              touchHandler("email");
            }}
            label="Username"
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
          <FormControl sx={{ mt: "1rem" }} variant="outlined" fullWidth>
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

          <Button
            fullWidth
            disabled={!state.isValid || isLoading}
            sx={{ mt: "4rem" }}
            variant="contained"
            onClick={handleLogin}
          >
            Login
            {isLoading && (
              <CircularProgress
                color="inherit"
                size={"1.3rem"}
                sx={{ ml: "1rem" }}
              />
            )}
          </Button>
          <Typography
            textAlign="center"
            fontSize="0.7rem"
            color="custom.fontGray"
            fontStyle="italic"
            mt="0.5rem"
            sx={{ cursor: "pointer" }}
          >
            Forgot password?
          </Typography>
        </Box>

        <hr
          style={{
            backgroundColor: "#296AE2",
            height: "0.05rem",
            border: "none",
            marginTop: "3rem",
          }}
        />
        <Typography
          textAlign="center"
          fontSize="0.7rem"
          color="custom.fontGray"
          mt="2rem"
          sx={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Don’t have an account? Sign up
        </Typography>
        <Grid container mt="4rem">
          <Grid
            item
            xs={5}
            bgcolor="custom.darkBlue"
            p="0.4rem"
            justifyContent="center"
            display="flex"
            alignItems="center"
            sx={{
              borderTopLeftRadius: "100vw",
              borderBottomLeftRadius: "100vw",
            }}
          >
            <Typography fontSize="0.7rem" color="white">
              TravelMateBusiness
            </Typography>
          </Grid>
          <Grid
            justifyContent="center"
            display="flex"
            alignItems="center"
            sx={{
              borderTopRightRadius: "100vw",
              borderBottomRightRadius: "100vw",
            }}
            item
            xs={7}
            bgcolor="#FFFFFF"
          >
            <Typography
              fontSize="0.7rem"
              color="primary"
              sx={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Need a business account? register here
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
