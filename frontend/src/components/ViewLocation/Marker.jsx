import { Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const Marker = ({ text }) => {
  return (
    <Box justifyContent='center' display='flex' flexDirection='column'>
      <LocationOnIcon  sx={{color:'red',fontSize:'2.5rem'}}/>
    </Box>
  );
};

export default Marker;
