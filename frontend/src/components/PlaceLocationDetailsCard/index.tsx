import ApartmentIcon from "@mui/icons-material/Apartment";
import PublicIcon from "@mui/icons-material/Public";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  country: string;
  state: string;
  longitude: number;
  latitude: number;
}

const PlaceLocationDetailsCard: React.FC<Props> = ({
  country,
  state,
  latitude,
  longitude,
}) => {
  return (
    <Grid
      container
      display="flex"
      p={"1rem"}
      mb="1rem"
      bgcolor="#DEEFFF"
      borderRadius={"0.2rem"}
      gap={1}
    >
      <Grid xs={12} item display="flex" alignItems="center" gap={1}>
        <PublicIcon />
        <Typography>Located in {state} state of {country}</Typography>
      </Grid>
      <Grid xs={12} item display="flex" alignItems="center" gap={1}>
        <LocationOnIcon />
        <Typography>Latitude : {latitude}</Typography>
        <Typography>Longitude : {longitude}</Typography>
      </Grid>
    </Grid>
  );
};

export default PlaceLocationDetailsCard;
