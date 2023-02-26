import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminAppBar from "../../components/AppBar/AdminAppBar";

const AdminLayout = () => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <AdminAppBar />
      </Grid>
      <Grid item xs={10}>
        <Box sx={{ overflowY: "scroll" }} maxHeight="100vh">
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
