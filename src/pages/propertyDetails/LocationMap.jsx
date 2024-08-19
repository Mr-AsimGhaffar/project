import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
});

export default function LocationMap({ locationData }) {
  if (Object.keys(locationData.index ?? {}).length === 0) {
    return <></>;
  }
  return (
    <div>
      <div className="bg-gray-50">
        <hr />
        <p className="font-montserrat text-[#0071BC] text-2xl font-bold p-2">
          Location & Nearby
        </p>
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
