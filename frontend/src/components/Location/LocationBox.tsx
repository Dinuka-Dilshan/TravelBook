import Modal from "../Modal/Modal";
import { MarkerF, useLoadScript, GoogleMap } from "@react-google-maps/api";
import { Box } from "@mui/system";

interface Props {
  height: string;
  width: string;
  location: { lat: number; lng: number };
}

const LocationBox: React.FC<Props> = ({ height, width, location }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY as string,
  });

  return (
    <Box width={width} height={height}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={12}
          center={{ lat: location.lat, lng: location.lng }}
        >
          <MarkerF position={location} />
        </GoogleMap>
      ) : (
        "Loading"
      )}
    </Box>
  );
};

export default LocationBox;
