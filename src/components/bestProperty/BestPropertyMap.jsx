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

export default function BestPropertyMap({ locationData, loading }) {
  const firstLocation = locationData[0]?.index?.location;

  return (
    <div className="md:px-44 px-2">
      <div className="py-20">
        <p className="font-montserrat font-bold text-xl lg:text-4xl leading-10 tracking-[0.2em] text-[#0071BC] text-center">
          PROPERTIES LOCATION
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
        </div>
      ) : (
        <div className="dark:bg-gray-800 shadow-lg sm:rounded-lg">
          <MapContainer
            center={[
              firstLocation?.latitude ?? "33.738045",
              firstLocation?.longitude ?? "73.0363",
            ]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {locationData.map((location, index) => (
              <Marker
                key={index}
                position={[
                  location?.index?.location?.latitude ?? "33.738045",
                  location?.index?.location?.longitude ?? "73.0363",
                ]}
              >
                <Popup>
                  <h2>{location?.index?.location?.title_long}</h2>
                  <p>{location?.index?.type?.title}</p>
                  <p>{location?.index?.purpose?.alternate_title}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
}

BestPropertyMap.propTypes = {
  locationData: PropTypes.array.isRequired,
  loading: PropTypes.array.isRequired,
};
