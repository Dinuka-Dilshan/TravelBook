import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import PlaceCard from "../components/Placecard/PlaceCard";
import { places } from "../dummyData";

const Places = () => {
  return (
    <Box px='1rem'>
      <Grid container px={{xs:2,lg:15}} pt={5} spacing={5}>
        {places.map((place, index) => (
          <Grid item xs={12} lg={4} key={index}>
            <PlaceCard
              title={place.title}
              description={`${place.description.slice(0,100)}...`}
              rating={place.rating}
            />
          </Grid>
        ))}
        
      </Grid>
    </Box>
  );
};

export default Places;
