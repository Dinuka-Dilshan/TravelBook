import NavigationIcon from "@mui/icons-material/Navigation";
import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";
import { MdHomeFilled, MdPlaylistAdd } from "react-icons/md";
import { RiHotelFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { logout, selectUser } from "../../store/slices/authSlice";
import AvatarLink from "../Avatar";
import Confirm from "../Confirm";
import { HiLogout } from "react-icons/hi";
import { TbBrandBooking } from "react-icons/tb";

const AppBar = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const activeStyles = {
    textDecoration: "none",
    fontFamily: "Poppins, sans-seri",
    color: "black",
    fontSize: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const inActiveStyles = {
    textDecoration: "none",
    fontFamily: "Poppins, sans-seri",
    fontSize: "1rem",
    color: "#808080",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
      display={"flex"}
      justifyContent="space-between"
      alignItems={"center"}
      px={{ xs: "1rem", lg: "5rem" }}
      py={{ xs: "1rem", lg: "2rem" }}
      pt={{ xs: "1rem", lg: "2.5rem" }}
      boxSizing={"border-box"}
    >
      {isConfirmOpen && (
        <Confirm onConfirmOk={okHandler} onConfirmNotOk={notOkHandler} />
      )}
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <NavigationIcon />
        <Typography
          fontSize={"1.7rem"}
          fontWeight={"bold"}
          color="#333333"
          letterSpacing={2}
          fontFamily={"Poor Story, cursive"}
          onClick={() => {
            navigate("/places");
          }}
          sx={{ cursor: "pointer" }}
        >
          TravelMate
        </Typography>
      </Box>
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
          <MdHomeFilled size={25} />
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyles : inActiveStyles)}
          to={"/hotels"}
        >
          <RiHotelFill size={25} />
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyles : inActiveStyles)}
          to={"/search"}
        >
          <BiSearch size={25} />
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyles : inActiveStyles)}
          to={"/bookings"}
        >
          <TbBrandBooking size={25} />
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyles : inActiveStyles)}
          to={"/trending"}
        >
          <FiTrendingUp size={25} />
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyles : inActiveStyles)}
          to={"/addplace"}
        >
          <MdPlaylistAdd size={28} />
        </NavLink>
      </Box>
      <Box display="flex">
        <Box>
          {user._id && (
            <AvatarLink
              image={user.profilePicture || ""}
              userID={user._id || ""}
              name={""}
            />
          )}
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          {Boolean(user._id) && location.pathname === "/profile" && (
            <IconButton
              onClick={() => {
                setIsConfirmOpen(true);
              }}
            >
              <HiLogout />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AppBar;
