import Modal from "../Modal/Modal";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const ViewLocation = ({ onClose }) => {
  const defaultProps = {
    center: {
      lat: 6.9271,
      lng: 79.8612,
    },
    zoom: 11,
  };
  return (
    <Modal onClose={onClose} width="70vw">
      <div style={{ height: "80vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_MAPS_API_KEY,
            language: "en",
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <Marker lat={defaultProps.center.lat} lng={defaultProps.center.lng} />
        </GoogleMapReact>
      </div>
    </Modal>
  );
};

export default ViewLocation;
