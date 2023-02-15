import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import BusinessAppBar from "../../components/AppBar/BusinessAppBar";

const Layout = () => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <BusinessAppBar />
      </Grid>
      <Grid item xs={10}>
        <Box sx={{ overflowY: "scroll" }} maxHeight='100vh'>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Layout;
