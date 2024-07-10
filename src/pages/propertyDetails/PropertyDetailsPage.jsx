import { useLocation } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BiSolidDirections } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import PriceIndexGraph from "./PriceIndexGraph";
import PopularityTrendGraph from "./PopularityTrendGraph";
import SimilarProperty from "./SimilarProperty";
import { formatTimeFromNow } from "@/utlils/UnixEpochTimeConverter";
import LocationMap from "./LocationMap";
import SkeletonCard from "../../components/skeleton/Skeleton";
import { fetchPropertyDetails } from "../../utlils/fetchApi";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const PropertyDetailsPage = ({ conversionFunction, propertyCategory }) => {
  const [activeButton, setActiveButton] = useState("Overview");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllRows, setShowAllRows] = useState(false);
  const initialRowCount = 2;
  const location = useLocation();
  const { id } = location.state || {};
  const overviewRef = useRef(null);
  const locationRef = useRef(null);
  const similarPropertyRef = useRef(null);
  const priceIndexRef = useRef(null);
  const trendsRef = useRef(null);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const propertyDetails = await fetchPropertyDetails(id);
      setData(propertyDetails);
    } catch (error) {
      const errorMessage =
        error.message || "Failed to fetch featured properties.";
      console.error("Error fetching featured properties:", errorMessage);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 10000,
      });
      throw error;
    }
  }, [id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const property = data[0];
  if (data.length === 0) {
    return <SkeletonCard />;
  }

  const scrollToSection = (ref, buttonName) => {
    setActiveButton(buttonName);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const toggleShowRows = () => setShowAllRows(!showAllRows);
  function capitalizeFirstLetter(str) {
    if (typeof str !== "string" || str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div>
      {/* <h1>{property.header}</h1> */}
      <div>
        <hr />
        <div>
          <p className="text-xl font-bold">
            {property.area}, Brand New House For Sale in {property.location}
          </p>
          <p>{property.location}</p>
        </div>
        <div className="relative w-[100%]">
          <img
            src={property.cover_photo_url}
            alt="property"
            className="w-[100%] h-[800px]"
          />
          <div className="absolute right-5 bottom-5">
            <CiHeart className="w-[30px] h-[30px] bg-gray-400 rounded-3xl text-white" />
          </div>
        </div>
        <br />
        <div className="flex gap-10">
          {property.bedroom && (
            <div className="flex flex-row items-center gap-1">
              <FaBed />
              <p>{property.bedroom}</p>
            </div>
          )}
          {property.bath && (
            <div className="flex flex-row items-center gap-1">
              <FaBath />
              <p>{property.bath}</p>
            </div>
          )}
          {property.area && (
            <div className="flex flex-row items-center gap-1">
              <BiSolidDirections />
              <p>{property.area}</p>
            </div>
          )}
        </div>
        <br />
      </div>
      <div>
        <div className="w-[100%] overflow-x-auto">
          <div className="flex justify-between gap-4 bg-black p-2">
            <Button
              variant="ghost"
              className={`w-full${
                activeButton === "Overview"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-black text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(overviewRef, "Overview")}
            >
              <span>Overview</span>
            </Button>
            <Button
              variant="ghost"
              className={`  w-full${
                activeButton === "Location"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-inherit text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(locationRef, "Location")}
            >
              <span>Location & Nearby</span>
            </Button>
            <Button
              variant="ghost"
              className={`w-full${
                activeButton === "PriceIndex"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-transparent text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(priceIndexRef, "PriceIndex")}
            >
              <span>Price Index</span>
            </Button>
            <Button
              variant="ghost"
              className={`w-full${
                activeButton === "Trends"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-transparent text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(trendsRef, "Trends")}
            >
              <span>Trends</span>
            </Button>
            <Button
              variant="ghost"
              className={`w-full${
                activeButton === "Finance"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-transparent text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(similarPropertyRef, "Similar")}
            >
              <span>Similar Properties</span>
            </Button>
          </div>
        </div>
        <div ref={overviewRef} className="w-[100%]">
          <div className="bg-gray-50">
            <p className="text-2xl p-2">Overview</p>
          </div>
          <div className="p-2">
            <p className="font-bold">Details</p>
            <div>
              <Table>
                <div className="flex justify-start gap-10">
                  <div>
                    <TableBody>
                      {Object.keys(property)
                        .filter((key) =>
                          ["type", "price", "location", "bath"].includes(key)
                        )
                        .map((item, rowIndex) => (
                          <TableRow key={item} className="border-none">
                            <TableCell
                              className={`${
                                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }`}
                            >
                              {capitalizeFirstLetter(item)}
                            </TableCell>
                            <TableCell
                              className={`${
                                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }`}
                            >
                              {property[item]
                                ? item === "price"
                                  ? conversionFunction(property[item])
                                  : property[item]
                                : "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </div>
                  <div>
                    <TableBody>
                      {Object.keys(property)
                        .filter((key) =>
                          ["area", "purpose", "bedroom", "added"].includes(key)
                        )
                        .map((item, rowIndex) => (
                          <TableRow key={item} className="border-none">
                            <TableCell
                              className={`${
                                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }`}
                            >
                              {capitalizeFirstLetter(item)}
                            </TableCell>
                            <TableCell
                              className={`${
                                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }`}
                            >
                              {property[item]
                                ? item === "added"
                                  ? formatTimeFromNow(property[item])
                                  : property[item]
                                : "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </div>
                </div>
              </Table>
            </div>
          </div>
          <hr />
          <br />
          <div className="p-2">
            <p className="font-bold">Description</p>
            <br />
            <p className={`${isExpanded ? "" : "line-clamp-2"}`}>
              {property.desc}
            </p>
            <br />
            <div className="text-right">
              <button onClick={toggleExpanded} className="text-green-500">
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
          <hr />
          {property.features && property.features.length > 0 && (
            <div className="p-2">
              <p className="font-bold">Amenities</p>
              <br />
              <div className="p-2">
                <Table>
                  <TableBody>
                    {property.features
                      .slice(
                        0,
                        showAllRows ? property.features.length : initialRowCount
                      )
                      .map((item, index) => (
                        <TableRow
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } "border-none"`}
                        >
                          <TableCell>{item.category}</TableCell>
                          {item.features.map((text, index) => (
                            <TableCell key={index}>{text}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                {property.features.length > initialRowCount && (
                  <div className="mt-2 text-right">
                    <button className="text-green-500" onClick={toggleShowRows}>
                      {showAllRows ? "View Less" : "View More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <br />
        <div ref={locationRef} className="p-4">
          <LocationMap locationData={property.area_trends || []} />
        </div>

        <div ref={priceIndexRef} className="p-4">
          <PriceIndexGraph areaTrendData={property.area_trends || []} />
        </div>
        <div ref={trendsRef} className="p-4">
          <PopularityTrendGraph
            popularityTrendData={property.popularity_trends || []}
            location={property.location}
          />
        </div>
        <div ref={similarPropertyRef} className="p-4">
          <SimilarProperty
            similarPropertyId={property.id}
            location={property.location}
            conversionFunction={conversionFunction}
            propertyCategory={propertyCategory}
          />
        </div>
      </div>
    </div>
  );
};
PropertyDetailsPage.propTypes = {
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string.isRequired,
};
export default PropertyDetailsPage;
