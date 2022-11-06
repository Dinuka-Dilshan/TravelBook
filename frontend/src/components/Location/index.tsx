import Modal from "../Modal/Modal";
import { MarkerF, useLoadScript, GoogleMap } from "@react-google-maps/api";


interface Props {
  onClose: () => void;
  height?: string;
  width?: string;
  location: { lat: number; lng: number };
}

const ViewLocation: React.FC<Props> = ({
  onClose,
  height,
  width,
  location,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY as string,
  });

  return (
    <Modal
      onClose={onClose}
      width={width ? width : "70vw"}
      height={height ? height : "60vh"}
    >
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
    </Modal>
  );
};

export default ViewLocation;
