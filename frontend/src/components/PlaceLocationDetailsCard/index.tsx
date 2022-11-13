import ApartmentIcon from "@mui/icons-material/Apartment";
import PublicIcon from "@mui/icons-material/Public";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ImLocation } from "react-icons/im";
import { BiCurrentLocation } from "react-icons/bi";

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
      py={"1rem"}
      mb="1rem"
      px={0}
      gap={2}
      border={"0.1rem solid #EFEFEF"}
      
      borderLeft={0}
      borderRight={0}
      boxSizing={"border-box"}
    >
      <Grid xs={12} item display="flex" alignItems="center" gap={1}>
        <ImLocation />
        <Typography letterSpacing={1.2}>
          Located in {state} state of {country}
        </Typography>
      </Grid>
      <Grid xs={12} item display="flex" alignItems="center" gap={1}>
        <BiCurrentLocation />
        <Typography letterSpacing={1.2}>Latitude : {latitude}</Typography>
        <Typography letterSpacing={1.2}>Longitude : {longitude}</Typography>
      </Grid>
    </Grid>
  );
};

export default PlaceLocationDetailsCard;
