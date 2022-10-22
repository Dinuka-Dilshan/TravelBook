import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useLocation } from "react-router-dom";

const AppBar = () => {
  const location = useLocation().pathname;

  return location !== "/" ? (
    <Box
      width="100%"
      height="10vh"
      bgcolor="primary.main"
      px={{ lg: "4rem", xs: "1rem" }}
      boxSizing="border-box"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link to={"/places"} style={{ textDecoration: "none" }}>
        <Typography color="white">TravelMate</Typography>
      </Link>
      <Box
        display={{ xs: "none", lg: "flex" }}
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
      >
        <Link to={"/places"} style={{ textDecoration: "none" }}>
          <Typography color="white" mx="1rem">
            Places
          </Typography>
        </Link>

        <Link to={"/hotels"} style={{ textDecoration: "none" }}>
          <Typography color="white" mx="1rem">
            Hotels
          </Typography>
        </Link>
        <Link to={"/trending"} style={{ textDecoration: "none" }}>
          <Typography color="white" mx="1rem">
            Trending
          </Typography>
        </Link>
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <Typography color="white" mx="1rem">
            Login
          </Typography>
        </Link>
      </Box>
    </Box>
  ) : null;
};

export default AppBar;
