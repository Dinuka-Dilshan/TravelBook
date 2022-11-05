import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { logout, selectUser } from "../../store/slices/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import Confirm from "../Confirm";
import { useCallback, useState } from "react";
const AppBar = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
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

  const okHandler = useCallback(() => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login");
    setIsConfirmOpen(false);
  }, []);

  const notOkHandler = useCallback(() => {
    setIsConfirmOpen(false);
  }, []);

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
      {isConfirmOpen && (
        <Confirm onConfirmOk={okHandler} onConfirmNotOk={notOkHandler} />
      )}
      <Typography
        fontSize={"1.2rem"}
        color="white"
        fontWeight={"bold"}
        letterSpacing={2}
        onClick={() => {
          navigate("/places");
        }}
        sx={{ cursor: "pointer" }}
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
        {Boolean(user._id) ? (
          <Button
            onClick={() => {
              setIsConfirmOpen(true);
            }}
          >
            <LogoutIcon sx={{ color: "white" }} />
          </Button>
        ) : (
          <NavLink
            style={({ isActive }) => (isActive ? activeStyles : inActiveStyles)}
            to={"/login"}
          >
            Login
          </NavLink>
        )}
      </Box>
    </Box>
  );
};

export default AppBar;
