import NavigationIcon from "@mui/icons-material/Navigation";
import { Avatar, Chip, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { HiLogout } from "react-icons/hi";
import { MdInsights, MdOutlineDashboard, MdPlace } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { logout, selectUser } from "../../store/slices/authSlice";
import Confirm from "../Confirm";

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
        backgroundColor: location.includes(to) ? "#EBF5FF" : "",
        color: location.includes(to) ? "#2598FF" : "",
      }}
    >
      {icon}
      <Typography fontSize={"1rem"} p="1rem">
        {title}
      </Typography>
    </Box>
  );
};

const AdminAppBar = () => {
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
            fontSize={"1.4rem"}
            fontWeight={"bold"}
            color="#333333"
            textAlign="center"
            letterSpacing={2}
            fontFamily={"Poor Story, cursive"}
            sx={{ cursor: "pointer", px: 0.1 }}
          >
            TravelMate
          </Typography>
          <Chip label="Admin" variant="outlined" sx={{ padding: 0.1, ml: 1 }} />
        </Box>
        <NavItem
          icon={<MdOutlineDashboard size="1.5rem" />}
          title="DashBoard"
          to={"/admin/dashboard"}
        />
        <NavItem
          icon={<GrTransaction size="1.5rem" />}
          title="Transactions"
          to={"/admin/transactions"}
        />
        <NavItem
          icon={<FaUserFriends size="1.5rem" />}
          title="Users"
          to={"/admin/users"}
        />
        <NavItem
          icon={<MdPlace size="1.5rem" />}
          title="Places"
          to={"/admin/places"}
        />
        <NavItem
          icon={<RiHotelLine size="1.5rem" />}
          title="Business Places"
          to={"/admin/business"}
        />
        <NavItem
          icon={<MdInsights size="1.5rem" />}
          title="Insight"
          to={"/admin/insight"}
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

export default AdminAppBar;
