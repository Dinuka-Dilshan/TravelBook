import { TextField } from "@mui/material";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import Modal from "../Modal/Modal";

interface Props {
  onClick: (coordnates: { lat?: number; lng?: number }) => void;
  height?: string;
  width?: string;
  location: { lat: number; lng: number };
  onSelect?: () => void;
  onBlur?: () => void;
}

const LocationPicker: React.FC<Props> = ({
  height,
  width,
  onClick,
  location,
  onSelect = () => {},
  onBlur = () => {},
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY as string,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => {
    setIsModalOpen((p) => !p);
    onBlur();
  };

  return (
    <>
      {isModalOpen ? (
        <Modal
          onClose={handleClick}
          width={width ? width : "70vw"}
          height={height ? height : "60vh"}
        >
          {isLoaded ? (
            <GoogleMap
              onClick={(e) => {
                onClick({ lat: e.latLng?.lat(), lng: e.latLng?.lng() });
                handleClick();
                onSelect();
              }}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              zoom={12}
              center={location}
            >
              <MarkerF position={location} />
            </GoogleMap>
          ) : (
            "Loading"
          )}
        </Modal>
      ) : (
        <TextField
          onClick={handleClick}
          disabled
          value={`latitude : ${location.lat} - longitude : ${location.lng}`}
          size="small"
          fullWidth
          sx={{ mt: "1rem" }}
          placeholder="Location"
          label="Location"
        />
      )}
    </>
  );
};

export default LocationPicker;
