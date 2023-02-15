import { Grid } from "@mui/material";
import Details from "./Details";
import Picture from "./Picture";

const BusinessProfile = () => {
    console.log('hi')
  return (
    <Grid container pt="1rem">
      <Grid item xs={6}>
        <Details />
      </Grid>
      <Grid item xs={6}>
        <Picture />
      </Grid>
    </Grid>
  );
};

export default BusinessProfile;
