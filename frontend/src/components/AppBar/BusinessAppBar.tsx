import NavigationIcon from "@mui/icons-material/Navigation";
import { Avatar, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { MdOutlineDashboard, MdOutlinePlace } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { RiBroadcastFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { logout, selectUser } from "../../store/slices/authSlice";
import { HiLogout } from "react-icons/hi";
import Confirm from "../Confirm";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, title, to }) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  return (
    <Box
      onClick={() => navigate(to)}
      my="0.5rem"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      color="#6D7983"
      px="1rem"
      borderRadius="1rem"
      sx={{
        "&:hover": {
          backgroundColor: "#EBF5FF",
          color: "#2598FF",
        },
        backgroundColor: location === to ? "#EBF5FF" : "",
        color: location === to ? "#2598FF" : "",
      }}
    >
      {icon}
      <Typography fontSize={"1rem"} p="1rem">
        {title}
      </Typography>
    </Box>
  );
};

const BusinessAppBar = () => {
  const user = useAppSelector(selectUser);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <>
      <Box
        height={"100vh"}
        boxSizing="border-box"
        p="1rem"
        border={4}
        borderLeft={0}
        borderRight={1}
        borderBottom={0}
        borderTop={0}
        borderColor="#EAE9EE"
        position="relative"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          my="1rem"
        >
          <NavigationIcon />
          <Typography
            fontSize={"1.5rem"}
            fontWeight={"bold"}
            color="#333333"
            textAlign="center"
            letterSpacing={2}
            fontFamily={"Poor Story, cursive"}
            sx={{ cursor: "pointer" }}
          >
            TravelMate
          </Typography>
        </Box>
        <NavItem
          icon={<MdOutlineDashboard size="1.5rem" />}
          title="DashBoard"
          to={"/business/dashboard"}
        />
        <NavItem
          icon={<MdOutlinePlace size="1.5rem" />}
          title="My Place"
          to={"/business/myplace"}
        />
        <NavItem
          icon={<TbBrandBooking size="1.5rem" />}
          title="Bookings"
          to={"/business/bookings"}
        />
        <NavItem
          icon={<RiBroadcastFill size="1.5rem" />}
          title="Advertising"
          to={"/business/advertising"}
        />
        <NavItem
          icon={<CgProfile size="1.5rem" />}
          title="Profile"
          to={"/business/profile"}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        position="absolute"
        bottom={20}
        left={20}
      >
        {isConfirmOpen && (
          <Confirm onConfirmOk={okHandler} onConfirmNotOk={notOkHandler} />
        )}
        <Avatar src={user.profilePicture || ""} />
        <Typography color="#6D7983">{user.email}</Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton
            onClick={() => {
              setIsConfirmOpen(true);
            }}
          >
            <HiLogout />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default BusinessAppBar;
