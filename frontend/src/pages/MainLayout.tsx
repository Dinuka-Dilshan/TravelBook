import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar";

const MainLayout = () => {
  return (
    <Box>
      <AppBar />
      <Outlet />
    </Box>
  );
};

export default MainLayout;
