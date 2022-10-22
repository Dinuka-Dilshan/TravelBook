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
import { Box } from "@mui/system";
import { useState } from "react";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const handleClickShowPassword = () => {
    setIsPasswordShow((p) => !p);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

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
          <TextField fullWidth label="Username" />
          <FormControl sx={{ mt: "1rem" }} variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
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
          <Button fullWidth sx={{ mt: "4rem" }} variant="contained">
            Login
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
