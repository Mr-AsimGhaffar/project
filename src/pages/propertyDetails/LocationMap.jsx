import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";

export default function LocationMap({ locationData }) {
  if (Object.keys(locationData.index ?? {}).length === 0) {
    return <></>;
  }
  return (
    <div>
      <div className="bg-gray-50">
        <hr />
        <p className="text-2xl text-black p-2">Location & Nearby</p>
      </div>
      <MapContainer
        center={[
          locationData.index.location.latitude,
          locationData.index.location.longitude,
        ]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker
          position={[
            locationData.index.location.latitude,
            locationData.index.location.longitude,
          ]}
        >
          <Popup>
            <h2>{locationData.index.location.title_long}</h2>
            <p>{locationData.index.type.title}</p>
            <p>{locationData.index.purpose.alternate_title}</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

LocationMap.propTypes = {
  locationData: PropTypes.array.isRequired,
};
