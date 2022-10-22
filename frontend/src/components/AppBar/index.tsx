import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";

const AppBar = () => {
  const activeStyles = {
    textDecoration: "none",
    fontFamily: "Poppins, sans-seri",
    color: "#F5911E",
    fontSize: "1rem",
  };

  const inActiveStyles = {
    textDecoration: "none",
    fontFamily: "Poppins, sans-seri",
    color: "white",
    fontSize: "1rem",
  };

  return (
    <Box
      height={"8vh"}
      width="100%"
      border={0.2}
      borderLeft={0}
      borderRight={0}
      borderTop={0}
      borderColor="custom.gray"
      display={"flex"}
      justifyContent="space-between"
      alignItems={"center"}
      px={{ xs: "1rem", lg: "5rem" }}
      boxSizing={"border-box"}
      bgcolor="primary.main"
    >
      <Typography
        fontSize={"1.2rem"}
        color="white"
        fontWeight={"bold"}
        letterSpacing={2}
      >
        TravelMate
      </Typography>
      <Box
        display={{ xs: "none", lg: "flex" }}
        justifyContent="space-between"
        alignItems={"center"}
        gap={"2rem"}
      >
        <NavLink
          style={({ isActive }) => (isActive ? activeStyles : inActiveStyles)}
          to={"/places"}
        >
          Places
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyles : inActiveStyles)}
          to={"/hotels"}
        >
          Hotels
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyles : inActiveStyles)}
          to={"/trending"}
        >
          Trending
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyles : inActiveStyles)}
          to={"/login"}
        >
          Login
        </NavLink>
      </Box>
    </Box>
  );
};

export default AppBar;
